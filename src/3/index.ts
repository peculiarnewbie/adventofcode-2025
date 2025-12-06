import * as R from "remeda";

const getLines = async () => {
    // const input = await Bun.file(`./test.txt`).text();
    const input = await Bun.file(`./input.txt`).text();
    const trimmed = input.trim();
    return trimmed.split("\n");
};

const part1 = (lines: string[]) => {
    const results: number[] = [];
    lines.forEach((line) => {
        const length = line.length;
        let first = { value: 0, index: 0 };
        for (let i = 0; i < length - 2; i++) {
            if (Number(line[i]) > first.value) {
                first.value = Number(line[i]);
                first.index = i;
            }
        }

        // console.log(first);
        let second = { value: 0, index: 0 };
        for (let i = first.index + 1; i < length; i++) {
            if (Number(line[i]) > second.value) {
                second.value = Number(line[i]);
                second.index = i;
            }
        }
        const val = first.value * 10 + second.value;
        // console.log(val);
        results.push(val);
    });

    const res = results.reduce((a, b) => a + b, 0);
    console.log(res);
};

export const part2 = (lines: string[]) => {
    const findSmallest = (arr: number[], index: number) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]! === 0) continue;
            let j = i + 1;
            while (j !== arr.length && arr[j]! === 0) j++;
            if (!arr[j]) return i;
            if (arr[i]! < arr[j]!) return i;
        }
        return arr.length - 1;
    };
    const results: number[] = [];
    lines.forEach((line) => {
        const nums = line
            .trim()
            .split("")
            .map((n) => Number(n));
        for (let i = nums.length - 13; i >= 0; i--) {
            const current = nums[i]!;
            const spliced = nums.toSpliced(0, i);
            let bigger = spliced.findIndex((n) => n > current);
            const smolSpliced = bigger === -1 ? spliced : spliced.toSpliced(bigger);
            const smol = findSmallest(smolSpliced, 0);
            nums[smol + i] = 0;
        }
        const filtered = nums.filter((n) => n !== 0);
        const reduced = filtered.reduce((a, b) => String(a) + String(b), "");
        results.push(Number(reduced));
    });
    const res = results.reduce((a, b) => a + b, 0);
    console.log(res);
};

async function main() {
    const lines = await getLines();
    part1(lines);
    part2(lines);
    // 125763774310650 too low
    // 169288448817586 too low
    // 169347417057382
}

if (import.meta.main) {
    main();
}
