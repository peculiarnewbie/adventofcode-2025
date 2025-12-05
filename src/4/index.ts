import * as R from "remeda";
const input = await Bun.file(`./input.txt`).text();
// const input = await Bun.file(`./test.txt`).text();

const split = input.split("\n");

const idx = split.findIndex((x) => x === "");

const [rangesRaw, num] = R.splitAt(split, idx);
const ingredients = num.filter((x) => x !== "").map((x) => Number(x));
const ranges = rangesRaw.map((x) => x.split("-").map((y) => Number(y)) as [number, number]);
// console.log(ranges, ingredients);

const part1 = () => {
    let count = 0;

    for (const ingredient of ingredients) {
        for (const [start, end] of ranges) {
            if (ingredient >= start && ingredient <= end) {
                count++;
                break;
            }
        }
    }

    console.log(count);
};

const part2 = (range: [number, number][]) => {
    const sortedRange = range.toSorted(([x, _a], [y, _b]) => x - y);
    console.log(sortedRange);

    let newRanges: [number, number][] = [];

    for (const [start, end] of sortedRange) {
        let push = true;
        for (let i = 0; i < newRanges.length; i++) {
            const [s, e] = newRanges[i]!;
            if (start <= e) {
                if (end > e) {
                    newRanges[i] = [s, end];
                    push = false;
                    break;
                }
                push = false;
            }
        }
        if (push) newRanges.push([start, end]);
    }

    if (newRanges.length < range.length) {
        console.log("here", newRanges, range);
        return part2(newRanges);
    } else {
        console.log("final", newRanges);
        let count = 0;
        newRanges.forEach(([start, end]) => {
            count += end - start + 1;
        });
        console.log(count);
    }
};

part2(ranges);
// 422445408405043 not right
// 422445408405031 not right

export {};
