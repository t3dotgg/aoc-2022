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

const getFirstHalfOfString = (str: string) => {
  return str.slice(0, str.length / 2);
};

const getSecondHalfOfString = (str: string) => {
  return str.slice(str.length / 2);
};

for (const line of lines) {
  const firstHalf = getFirstHalfOfString(line)
    .split("")
    .map((l) => letterToNumber(l));
  const secondHalf = getSecondHalfOfString(line)
    .split("")
    .map((l) => letterToNumber(l));

  let c = 0;

  firstHalf.forEach((v) => {
    if (secondHalf.includes(v)) {
      c = v;
    }
  });

  console.log(line, " ", c);
  sum += c;
}

console.log(sum);
