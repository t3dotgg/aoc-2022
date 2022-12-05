export const x = "";

const input = await Deno.readTextFile("./input.txt");
// const input = await Deno.readTextFile("./test.txt");

const [topHalf, rest] = input.split("\n\n");

const stacks: string[][] = [];

const toStack = topHalf.split("\n").reverse().slice(1);

for (let i = 0; i < (toStack[0].length + 1) / 4; i++) {
  stacks.push(toStack.map((x) => x.slice(i * 4, i * 4 + 3)));
}

const clearEmptyStrings = () => {
  stacks.forEach((stack) => {
    while (stack[stack.length - 1] === "   ") {
      stack.pop();
    }
  });
};

clearEmptyStrings();

console.log(stacks);

const ins = rest.split("\n");

const printStacks = () => {
  for (let i = 0; i < 10; i++) {
    let row = "";
    for (let j = 0; j < stacks.length; j++) {
      row += stacks[j][i] ?? "   ";
    }
    console.log(row);
  }
};

for (const in_ of ins) {
  const [count, rest] = in_.replace("move ", "").split(" from ");
  const [from, to] = rest.split(" to ");

  const from_ = parseInt(from) - 1;
  const to_ = parseInt(to) - 1;
  const count_ = parseInt(count);

  console.log("from", from_, "to", to_, "amount", count_);
  printStacks();
  console.log("\n\n");

  const b = stacks[from_].splice(stacks[from_].length - count_);
  console.log("spliced", b);
  stacks[to_] = stacks[to_].concat(b);
}

stacks.forEach((x) => console.log(x[x.length - 1]));
