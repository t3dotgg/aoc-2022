export const awerawer = "";

const input = await Deno.readTextFile("./input.txt");
// const input = await Deno.readTextFile("./test.txt");

const lines = input.split("\n");

console.log(lines);

let x = 1;

let instructions: number[] = [];

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];

  const [ins, amount] = l.split(" ");

  if (ins === "noop") instructions.push(0);
  if (ins === "addx") {
    instructions.push(0);
    instructions.push(parseInt(amount));
  }

  // if ([20, 60, 100, 140, 180, 220].includes(i)) {
  //   totals.push(x * (i + 1));
  // }

  // x += nextChange;
  // nextChange = nextNextChange;
  // nextNextChange = 0;
}

let rowOfFourtySpaces = "                                        ".split("");
let vertical = [
  [...rowOfFourtySpaces],
  [...rowOfFourtySpaces],
  [...rowOfFourtySpaces],
  [...rowOfFourtySpaces],
  [...rowOfFourtySpaces],
  [...rowOfFourtySpaces],
];

instructions.forEach((ins, index) => {
  console.log("signal at", index, "is", x);
  const [dx, dy] = [index % 40, Math.floor(index / 40)];

  console.log(dy, dx);

  const shouldPaint = dx === x || dx === x - 1 || dx === x + 1;
  vertical[dy][dx] = shouldPaint ? "X" : " ";
  x += ins;
});

// print vertical as grid
vertical.forEach((row) => {
  console.log(row.join(""));
});
