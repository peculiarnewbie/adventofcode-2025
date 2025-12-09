import * as R from "remeda";
// const input = await Bun.file(`./test.txt`).text();
const input = await Bun.file(`./input.txt`).text();

const part1 = () => {
  const splits = input
    .split("\n")
    .map((line) => line.trim())
    .map((line) => line.split(""));
  splits.pop();

  let tachyonIndexes: number[] = [];
  let currentLine: string[] = [];
  let count = 0;
  splits.forEach((split, i) => {
    let newTachyon: number[] = [];
    currentLine = [...splits[i]!];
    split.forEach((char, index) => {
      if (char === "S") {
        newTachyon.push(index);
      }
      if (tachyonIndexes.includes(index)) {
        if (currentLine[index] === "^") {
          currentLine[index - 1] = "S";
          currentLine[index + 1] = "S";
          newTachyon.push(index - 1);
          newTachyon.push(index + 1);
          count++;
        } else {
          newTachyon.push(index);
          currentLine[index] = "S";
        }
      }
    });
    tachyonIndexes = [...newTachyon];
  });
  console.log(count);
};

const part2 = () => {
  const splits = input
    .split("\n")
    .map((line) => line.trim())
    .map((line) => line.split(""));
  splits.pop();

  const width = splits[0]!.length;
  let counts = new Array(width).fill(0);
  for (let i = 0; i < splits.length; i++) {
    const split = splits[i]!;
    const newCounts = new Array(width).fill(0);
    split.forEach((char, index) => {
      if (char === "S") {
        newCounts[index] = 1;
      }
      if (counts[index] > 0) {
        if (split[index] === "^") {
          const count = counts[index];
          newCounts[index - 1] += count;
          newCounts[index + 1] += count;
        } else {
          newCounts[index] += counts[index];
        }
      }
    });
    counts = [...newCounts];
  }

  console.log(counts.reduce((a, b) => a + b, 0));
};

part1();
part2();
// 3374 too low
// 3908764271422177 too high
// 390684413472683 too low
