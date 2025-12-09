import * as R from "remeda";

const processInput = async (part: 1 | 2 = 1) => {
  const text = await Bun.file("./test.txt").text();
  const lines = text.split("\n").map((line) => line.trim());
  return lines;
};

type Input = Awaited<ReturnType<typeof processInput>>;

const part1 = (input: Input) => {};

const part2 = (input: Input) => {};

const main = async (part: 1 | 2) => {
  const input = await processInput(part);
  part1(input);
  // part2(input)
};
