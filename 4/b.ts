export const x = "";

const input = await Deno.readTextFile("./input.txt");
// const input = await Deno.readTextFile("./test.txt");

const pairs = input.split("\n").map((line) => line.split(","));

console.log(pairs);

let containedranges = 0;

for (const pair of pairs) {
  const rangeA = pair[0].split("-").map((x) => parseInt(x));
  const rangeB = pair[1].split("-").map((x) => parseInt(x));

  const hasOverlap = rangeA[0] <= rangeB[1] && rangeB[0] <= rangeA[1];
  if (hasOverlap) containedranges++;
}

console.log(containedranges);
