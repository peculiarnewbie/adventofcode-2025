import * as R from "remeda";
const input = await Bun.file(`./input.txt`).text();
// const input = await Bun.file(`./test.txt`).text();

const trimmed = input.trim();
const ranges = trimmed.split(`,`);

const checkRepeat = (text: string, splitAt: number) => {
    if (text.length % splitAt != 0) return false;
    let start = "";
    for (let i = 0; i < text.length; i += splitAt) {
        const slice = text.slice(i, i + splitAt);
        if (i === 0) start = slice;
        else if (start !== slice) {
            return false;
        }
    }

    return true;
};

const part1 = () => {
    const ids: number[] = [];
    const nums = ranges.map(
        (range) => range.split(`-`).map((num) => Number(num)) as [number, number],
    );
    nums.forEach(([num1, num2]) => {
        let start = num1;
        let end = num2;
        while (start <= end) {
            const text = String(start);
            if (checkRepeat(text, text.length / 2)) {
                ids.push(start);
            }
            start++;
        }
    });
    console.log(ids.length);
    console.log(ids.reduce((a, b) => a + b, 0));
};

const checkAllSplit = (text: string) => {
    const mid = Math.floor(text.length / 2);
    for (let i = 1; i <= mid; i++) {
        if (checkRepeat(text, i)) {
            return true;
        }
    }
    return false;
};

const part2 = () => {
    const ids: number[] = [];
    const nums = ranges.map(
        (range) => range.split(`-`).map((num) => Number(num)) as [number, number],
    );
    nums.forEach(([num1, num2]) => {
        let start = num1;
        let end = num2;
        while (start <= end) {
            const text = String(start);
            if (checkAllSplit(text)) {
                ids.push(start);
            }
            start++;
        }
    });
    console.log(ids.length);
    console.log(ids.reduce((a, b) => a + b, 0));
    // console.log(count);
};

part1(); // 19219508902
part2(); // 27180728081

export {};
