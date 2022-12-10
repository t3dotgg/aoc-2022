export const awerawer = "";

const input = await Deno.readTextFile("./input.txt");
// const input = await Deno.readTextFile("./test.txt");

const lines = input.split("\n");

let x = 1;
const instructions: number[] = [];

for (let i = 0; i < lines.length; i++) {
  instructions.push(0);

  const [ins, amount] = lines[i].split(" ");
  if (ins === "addx") {
    instructions.push(parseInt(amount));
  }
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
  const [dx, dy] = [index % 40, Math.floor(index / 40)];

  const shouldPaint = dx === x || dx === x - 1 || dx === x + 1;
  vertical[dy][dx] = shouldPaint ? "X" : " ";
  x += ins;
});

vertical.forEach((row) => {
  console.log(row.join(""));
});
