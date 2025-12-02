const input = await Bun.file(`./input.txt`).text();

const lines = input.split(`\n`);
lines.pop();
const withDir = lines.map((line) => {
    const num = parseInt(line.slice(1));
    if (line.startsWith("R")) {
        return { right: true, num };
    } else {
        return { right: false, num };
    }
});

const part1 = () => {
    let count = 0;
    let value = 50;

    withDir.forEach((dir) => {
        if (dir.right) {
            value += dir.num;
        } else {
            value -= dir.num;
        }
        if (value % 100 === 0) {
            count += 1;
        }
    });

    console.log(count);
};

const part2 = () => {
    let count = 0;
    let value = 50;

    withDir.forEach((dir, i) => {
        if (dir.right) {
            value += dir.num;
        } else {
            if (value === 0) value = 100;
            value -= dir.num;
        }
        const val = Math.floor(value / 100);
        if (value < 0 && value % 100 == 0) count++;
        if (value === 0) count++;
        count += Math.abs(val);
        value = ((value % 100) + 100) % 100;
    });

    console.log(count);
};

console.log("part 1");
part1(); //1195
part2(); // 6770

export {};
