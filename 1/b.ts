export const x = "";

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n\n");

const amounts = [0];

for (const line of lines) {
  const nums = line.split("\n").map((s) => parseInt(s, 10));
  const total = nums.reduce((a, b) => a + b, 0);

  amounts.push(total);
}

const topThree = amounts.sort((a, b) => b - a).slice(0, 3);

const total = topThree.reduce((a, b) => a + b, 0);

console.log("total", total);
