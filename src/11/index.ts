import * as R from "remeda";

const processInput = async (part: 1 | 2 = 1) => {
  const text = await Bun.file("./input.txt").text();
  // const text = await Bun.file("./test.txt").text();
  const lines = text.split("\n").map((line) => line.trim());
  lines.pop();
  const split = lines.map((line) => {
    const [first, rest] = line.split(":");
    const [empty, ...paths] = rest!.split(" ").map((path) => path.trim());
    return [first, paths] as [string, string[]];
  });
  return Object.fromEntries(split);
};

type Input = Awaited<ReturnType<typeof processInput>>;

// const traceBack = (input: Input, res = 0) => {
//   const [outs, rest] = R.partition(input, ({ paths }) => paths[0] === "out");
//   const outHeads = outs.map(({ head }) => head);
//   const newInput = rest.map(({ head, paths }) => {
//     if (paths.some((path) => outHeads.includes(path))) {
//       return { head, paths: ["out"] };
//     }
//     return { head, paths };
//   });
//   return newInput;
// };

const trace = (input: Input, start: string, result = 0) => {
  console.log(start, result);
  let res = result;
  const paths = input[start];
  if (!paths) return res;
  if (paths.includes("out")) return res + 1;
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (!path) continue;
    res = trace(input, path, res);
  }
  return res;
};

const part1 = (input: Input) => {
  // console.log(1, input);
  // const trace = traceBack(input);
  // console.log(2, trace);
  // const trace2 = traceBack(trace);
  // console.log(3, trace2);
  const res = trace(input, "you");
  console.log(res);
};

const part2 = (input: Input) => {};

const main = async (part: 1 | 2) => {
  const input = await processInput(part);
  part1(input);
  // part2(input)
};

main(1);
