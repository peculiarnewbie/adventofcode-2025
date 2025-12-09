import * as R from "remeda";
// const input = await Bun.file(`./input.txt`).text();
const input = await Bun.file(`./test.txt`).text();

const lines = input.split("\n").map((line) => line.trim());
lines.pop();

type Coord = {
  x: number;
  y: number;
  z: number;
};

const coords = lines
  .map((line) => line.split(",").map((num) => parseInt(num, 10)))
  .map(
    (coord) =>
      ({
        x: coord[0]!,
        y: coord[1]!,
        z: coord[2]!,
      }) as Coord,
  );

const getRanges = (coords: Coord[]) => {
  const pairs: {
    a: { index: number; coord: Coord };
    b: { index: number; coord: Coord };
  }[] = [];
  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      pairs.push({
        a: { index: i, coord: coords[i]! },
        b: { index: j, coord: coords[j]! },
      });
    }
  }

  console.log("pairs", pairs.length);

  return pairs
    .map(({ a, b }) => {
      const range = Math.sqrt(
        Math.pow(a.coord.x - b.coord.x, 2) +
          Math.pow(a.coord.y - b.coord.y, 2) +
          Math.pow(a.coord.z - b.coord.z, 2),
      );
      return { a, b, range };
    })
    .toSorted((a, b) => a.range - b.range);
};

const part1 = (pairs: number) => {
  console.log(coords.length);

  const ranges = getRanges(coords).slice(0, pairs);
  console.log(ranges);

  const circuits: Record<number, number[]> = {};
  const circuitsMap = new Array(coords.length).fill(-1);
  ranges.forEach(({ a, b }, i) => {
    if (circuitsMap[a.index] === -1 && circuitsMap[b.index] === -1) {
      circuitsMap[a.index] = i;
      circuitsMap[b.index] = i;
      circuits[i] = [a.index, b.index];
    } else if (circuitsMap[a.index] === -1) {
      {
        circuitsMap[a.index] = circuitsMap[b.index];
        circuits[circuitsMap[b.index]]?.push(a.index);
      }
    } else if (circuitsMap[b.index] === -1) {
      circuitsMap[b.index] = circuitsMap[a.index];
      circuits[circuitsMap[a.index]]?.push(b.index);
    } else if (circuitsMap[a.index] !== circuitsMap[b.index]) {
      const circA = circuits[circuitsMap[a.index]]!;
      const circB = circuits[circuitsMap[b.index]]!;
      circuits[circuitsMap[a.index]] = [...circA, ...circB];
      delete circuits[circuitsMap[b.index]];
      circB.forEach((el) => {
        circuitsMap[el] = circuitsMap[a.index];
      });
    }
  });

  const largest = Object.values(circuits)
    .toSorted((a, b) => b.length - a.length)
    .slice(0, 3);

  const res = largest.reduce((acc, cur) => acc * cur.length, 1);

  // console.log(largest, res);
};

const part2 = () => {
  console.log(coords.length);

  const ranges = getRanges(coords);

  const circuits: Record<number, number[]> = {};
  const circuitsMap = new Array(coords.length).fill(-1);
  let done = false;
  ranges.forEach(({ a, b }, i) => {
    if (done) return;
    if (circuitsMap[a.index] === -1 && circuitsMap[b.index] === -1) {
      circuitsMap[a.index] = i;
      circuitsMap[b.index] = i;
      circuits[i] = [a.index, b.index];
    } else if (circuitsMap[a.index] === -1) {
      {
        circuitsMap[a.index] = circuitsMap[b.index];
        circuits[circuitsMap[b.index]]?.push(a.index);
      }
    } else if (circuitsMap[b.index] === -1) {
      circuitsMap[b.index] = circuitsMap[a.index];
      circuits[circuitsMap[a.index]]?.push(b.index);
    } else if (circuitsMap[a.index] !== circuitsMap[b.index]) {
      const circA = circuits[circuitsMap[a.index]]!;
      const circB = circuits[circuitsMap[b.index]]!;
      circuits[circuitsMap[a.index]] = [...circA, ...circB];
      delete circuits[circuitsMap[b.index]];
      circB.forEach((el) => {
        circuitsMap[el] = circuitsMap[a.index];
      });
    }

    if (i < 5) return;

    if (Object.keys(circuits).length > 1) return;

    if (Object.values(circuitsMap).some((el) => el === -1)) {
      return;
    }

    done = true;
    console.log("done", i, a, b);
    console.log(a.coord.x * b.coord.x);
  });
};

// part 1
// 24786 too low

part1(10);
// part2();
