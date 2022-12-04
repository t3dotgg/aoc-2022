export const x = "";

const input = await Deno.readTextFile("./input.txt");
// const input = await Deno.readTextFile("./test.txt");

const pairs = input.split("\n").map((line) => line.split(","));

console.log(pairs);

let containedranges = 0;

for (const pair of pairs) {
  const [la, ra] = pair[0].split("-").map((x) => parseInt(x));
  const [lb, rb] = pair[1].split("-").map((x) => parseInt(x));

  if (la >= lb && ra <= rb) {
    containedranges++;
  } else if (la <= lb && ra >= rb) {
    containedranges++;
  }
}

console.log(containedranges);
