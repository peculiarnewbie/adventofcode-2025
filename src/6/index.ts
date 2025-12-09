import * as R from "remeda";
const input = await Bun.file(`./input.txt`).text();
// const input = await Bun.file(`./t.txt`).text();
// const input = await Bun.file(`./test.txt`).text();

const splits = () => {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const ops = lines
    .pop()
    ?.split("")
    .filter((op) => op !== " ");

  const numbers = lines.map((line) =>
    line
      .split(" ")
      .map((num) => {
        console.log(num);
        return parseInt(num.trim(), 10);
      })
      .filter((num) => !isNaN(num)),
  );

  const transposed = numbers[0]?.map((_, i) => numbers.map((row) => row[i]));

  console.log(numbers, ops, transposed);
  return [transposed, ops] as [number[][], string[]];
};

const part1 = () => {
  const [numbers, ops] = splits();
  let total = 0;
  ops.forEach((op, i) => {
    let res = 0;
    if (op === "+") {
      res = numbers[i]?.reduce((acc, num) => acc + num, 0) ?? 0;
    } else if (op === "*") {
      res = numbers[i]?.reduce((acc, num) => acc * num, 1) ?? 1;
    }
    total += res;
  });
  console.log(total);
};

const part2 = () => {
  const lines = input.split("\n").map((line) => line.replaceAll("\r", ""));

  const ops = lines
    .pop()!
    .split("")
    .filter((op) => op !== " ");

  const elems = lines.map((line) => line.split(""));

  elems.forEach((el) => console.log(el.length));

  const transposed = elems[0]!.map((_, i) => elems.map((row) => row[i]!));

  const columns = [];
  let currentCol = [];

  for (const col of transposed!) {
    if (col.some((x) => x !== " ")) currentCol.push(col);
    else {
      columns.push([...currentCol]);
      currentCol = [];
    }
  }
  columns.push([...currentCol]);

  let total = 0n;
  columns.forEach((col, i) => {
    const joined = col.map((c) => c.join("").replaceAll(" ", ""));
    const numbers = joined.map((c) => BigInt(c));

    let res = 0n;
    if (ops[i] == "+") {
      res = numbers.reduce((acc, num) => acc + num, 0n);
    } else if (ops[i] == "*") {
      res = numbers.reduce((acc, num) => acc * num, 1n);
    }
    total += res;
  });

  console.log(total);
};

part2();
// 11159825701663 not right
// 11159825701663
