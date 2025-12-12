import * as R from "remeda";

const processInput = async (part: 1 | 2 = 1) => {
  // const text = await Bun.file("./test.txt").text();
  const text = await Bun.file("./input.txt").text();
  const lines = text.split("\n").map((line) => line.trim());
  lines.pop();
  console.log(lines);
  const parsed = lines.map((line) => {
    const [l, rest] = line.split("]");
    const diagram = l!
      .replace("[", "")
      .split("")
      .map((char) => (char === "#" ? true : false));
    const [rest2, jolt] = rest!.split("{");
    const joltage = jolt!
      .replace("}", "")
      .split(",")
      .map((char) => parseInt(char));
    const buttons = rest2!
      .trim()
      .split(" ")
      .map((button) => {
        console.log(button);
        const clean = button.replace("(", "").replace(")", "");
        console.log(clean);
        return clean.split(",").map((char) => parseInt(char));
      });
    return { diagram, joltage, buttons };
  });
  return parsed;
};

type Input = Awaited<ReturnType<typeof processInput>>;

function getCombinations<T>(array: T[], k: number): T[][] {
  const result: T[][] = [];

  function backtrack(combination: T[], start: number) {
    if (combination.length === k) {
      result.push([...combination]);
      return;
    }

    for (let i = start; i < array.length; i++) {
      combination.push(array[i]!);
      backtrack(combination, i + 1);
      combination.pop();
    }
  }

  backtrack([], 0);
  return result;
}

function pressButtons(buttons: number[][], target: boolean[]) {
  const init = Array.from({ length: target.length }, (_, i) => false);
  buttons.forEach((button) => {
    button.forEach((i) => {
      init[i] = !init[i];
    });
  });
  return JSON.stringify(init) === JSON.stringify(target);
}

const part1 = (input: Input) => {
  let total = 0;
  input.forEach(({ diagram, joltage, buttons }, line) => {
    console.log(line);
    for (let i = 1; i < buttons.length; i++) {
      const combination = getCombinations(buttons, i);
      // console.log(combination);
      let found = false;
      combination.forEach((combo) => {
        if (found) return;
        if (pressButtons(combo, diagram)) {
          total += i;
          found = true;
        }
      });
      if (found) break;
    }
  });

  console.log(total);
};

const part2 = (input: Input) => {};

const main = async (part: 1 | 2) => {
  const input = await processInput(part);
  part1(input);
  // part2(input)
};
main(1);
