import * as R from "remeda";

const processInput = async (part: 1 | 2 = 1) => {
  const text = await Bun.file("./input.txt").text();
  // const text = await Bun.file("./test.txt").text();
  const lines = text.split("\n").map((line) => line.trim());
  lines.pop();
  const split = lines.map((line) => line.split(","));
  return split.map(([x, y]) => ({ x: parseInt(x!), y: parseInt(y!) }));
};

type Coord = { x: number; y: number };
type Input = Awaited<ReturnType<typeof processInput>>;

const getPairs = (input: Input) => {
  const pairs: {
    a: { index: number; coord: Coord };
    b: { index: number; coord: Coord };
  }[] = [];
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      pairs.push({
        a: { index: i, coord: input[i]! },
        b: { index: j, coord: input[j]! },
      });
    }
  }
  return pairs;
};

const part1 = (input: Input) => {
  console.log(input);
  const pairs = getPairs(input);

  const areas = pairs.map(({ a, b }) => {
    const area =
      (Math.abs(a.coord.x - b.coord.x) + 1) *
      (Math.abs(a.coord.y - b.coord.y) + 1);
    return { a, b, area };
  });

  console.log("areas", areas.sort((a, b) => a.area - b.area).pop());
};

const part2 = (input: Input) => {
  let edgeX = 0;
  let edgeY = 0;
  input.forEach(({ x, y }) => {
    if (edgeX < x) edgeX = x;
    if (edgeY < y) edgeY = y;
  });

  console.log(edgeX, edgeY);

  const coordMap = new Set(
    input.map(({ x, y }) => String(x) + "," + String(y)),
  );

  console.log("coordMap", coordMap.size);

  function create2DArray(rows: number, cols: number) {
    const array: string[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: string[] = [];
      for (let j = 0; j < cols; j++) {
        row.push(".");
      }
      array.push(row);
    }
    return array;
  }
  let map: string[][] = Array.from({ length: edgeY + 1 }, () =>
    Array.from({ length: edgeX + 1 }, () => "."),
  );

  console.log("map", map.length);

  for (let i = 0; i <= edgeY; i++) {
    for (let j = 0; j <= edgeX; j++) {
      if (coordMap.has(String(j) + "," + String(i))) {
        map[i]![j] = "#";
      }
    }
  }

  const neighbors = input.map((_, i) => {
    const first = input[i]!;
    const second = i === input.length - 1 ? input[0] : input[i + 1]!;
    return [first, second] as [Coord, Coord];
  });

  console.log("neigbors", neighbors.length);

  neighbors.forEach(([a, b]) => {
    // console.log(a, b);
    if (a.x === b.x) {
      const [start, end] = a.y < b.y ? [a, b] : [b, a];
      for (let i = start.y + 1; i < end.y; i++) {
        map[i]![a.x] = "X";
      }
    } else if (a.y === b.y) {
      const [start, end] = a.x < b.x ? [a, b] : [b, a];
      for (let i = start.x + 1; i < end.x; i++) {
        map[a.y]![i] = "X";
      }
    } else {
      console.log("panic");
    }
  });

  map.forEach((row) => {
    console.log(row);
  });

  const checked: boolean[][] = Array.from({ length: edgeY + 1 }, () =>
    Array.from({ length: edgeX + 1 }, () => false),
  );

  const fill = (start: Coord) => {
    if (checked[start.y]![start.x]) return;
    checked[start.y]![start.x] = true;
    const neighbors = [
      { x: start.x - 1, y: start.y },
      { x: start.x + 1, y: start.y },
      { x: start.x, y: start.y - 1 },
      { x: start.x, y: start.y + 1 },
    ];

    for (const { x, y } of neighbors) {
      if (map[y] && map[y][x] === ".") {
        map[y][x] = "X";
        fill({ x, y });
      }
    }
  };

  fill({ x: input[0]!.x + 1, y: input[0]!.y + 1 });

  const pairs = getPairs(input);

  let largest: { pair: { a: Coord; b: Coord }; area: number } = {
    pair: { a: { x: 0, y: 0 }, b: { x: 0, y: 0 } },
    area: 0,
  };

  pairs.forEach(({ a, b }, pairIdx) => {
    if (Math.abs(a.index - b.index) === 1) return;
    const area =
      (Math.abs(a.coord.x - b.coord.x) + 1) *
      (Math.abs(a.coord.y - b.coord.y) + 1);
    if (area < largest.area) return;
    const corners = [
      a.coord,
      { x: a.coord.x, y: b.coord.y },
      b.coord,
      { x: b.coord.x, y: a.coord.y },
    ];

    let eligible = true;
    corners.forEach((a, index) => {
      if (!eligible) return;
      const b = index === 3 ? corners[0]! : corners[index + 1]!;
      if (a.x === b.x) {
        const [start, end] = a.y < b.y ? [a, b] : [b, a];
        for (let i = start.y + 1; i < end.y; i++) {
          if (map[i]![a.x] === ".") {
            eligible = false;
            break;
          }
        }
      } else if (a.y === b.y) {
        const [start, end] = a.x < b.x ? [a, b] : [b, a];
        for (let i = start.x + 1; i < end.x; i++) {
          if (map[a.y]![i] === ".") {
            eligible = false;
            break;
          }
        }
      } else {
        throw new Error("panic");
      }
    });

    if (eligible && area > largest.area) {
      largest = { pair: { a: a.coord, b: b.coord }, area };
    }

    console.log(corners, pairIdx);
  });

  console.log(largest);
};

const main = async (part: 1 | 2) => {
  const input = await processInput(part);
  // part1(input);
  part2(input);
};

await main(2);
