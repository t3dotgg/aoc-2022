export const x = "";

const input = await Deno.readTextFile("./input.txt");
// const input = await Deno.readTextFile("./test.txt");

const lines = input.split("\n");

const letterToNumber = (letter: string) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.indexOf(letter) + 1;
};

console.log("lines", lines);

let sum = 0;

for (let i = 0; i < lines.length; i += 3) {
  const first = lines[i].split("").map((l) => letterToNumber(l));
  const second = lines[i + 1].split("").map((l) => letterToNumber(l));
  const third = lines[i + 2].split("").map((l) => letterToNumber(l));

  let c = 0;

  first.forEach((v) => {
    if (second.includes(v) && third.includes(v)) {
      c = v;
    }
  });

  sum += c;
}

console.log(sum);
