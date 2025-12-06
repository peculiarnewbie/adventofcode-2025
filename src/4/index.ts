import * as R from "remeda";

const getLines = async () => {
  // const input = await Bun.file(`./test.txt`).text();
  const input = await Bun.file(`./input.txt`).text();
  const trimmed = input.trim();
  const split = trimmed.split("\n");
  return split.map((line) => line.trim());
};

const surround: [number, number][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const lookAround = (lines: string[][], pos: [number, number]) => {
  const [x, y] = pos;
  if (lines[y]![x] !== "@") return false;
  let count = 0;

  surround.forEach(([dx, dy]) => {
    const [nx, ny] = [x + dx, y + dy];
    if (!lines[ny]) return;
    if (!lines[ny][nx]) return;
    if (lines[ny][nx] === "@") count++;
  });

  return count < 4;
};

const part1 = (lines: string[]) => {
  const map = lines.map((line) => {
    return line.split("");
  });

  const copy: string[][] = JSON.parse(JSON.stringify(map));

  let count = 0;
  map.forEach((line, i) => {
    line.forEach((char, j) => {
      const res = lookAround(map, [j, i]);
      if (res) {
        count++;
        copy[i][j] = ".";
      }
    });
  });

  const asString = copy.map((line) => line.join(""));

  return [count, asString] as [number, string[]];
};

const part2 = (lines: string[]) => {
  let total = 0;
  let currentLines: string[] = JSON.parse(JSON.stringify(lines));
  while (true) {
    const [count, copy] = part1(currentLines);
    total += count;
    currentLines = copy;
    if (count === 0) break;
  }
  console.log(total);
};

// part1(await getLines());
part2(await getLines());
