export const x = "";

const input = await Deno.readTextFile("./input.txt");
// const input = await Deno.readTextFile("./test.txt");
console.log(input);

const chars = input.split("");

for (let i = 13; i < chars.length; i++) {
  const char = chars[i];

  const lastFourAreUnique = chars.slice(i - 14, i);

  const asSet = new Set(lastFourAreUnique);

  if (asSet.size === 14) {
    console.log(char, i);
    break;
  }
}
