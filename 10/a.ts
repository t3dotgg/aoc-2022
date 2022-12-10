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

const totals: number[] = [];

instructions.forEach((ins, index) => {
  console.log("signal at", index, "is", x);
  if ([20, 60, 100, 140, 180, 220].includes(index + 1)) {
    totals.push(x * (index + 1));
  }
  x += ins;
});

const sum = totals.reduce((a, b) => a + b, 0);

console.log(totals);

console.log(sum);
