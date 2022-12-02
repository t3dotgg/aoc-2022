export const x = "";

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const parsed = lines.map((line) => line.split(" ") as [string, string]);

let score = 0;

const translate = {
  X: "A",
  Y: "B",
  Z: "C",
};

parsed.forEach((item) => {
  console.log("item", item);
  let c = 0;

  let [them, me] = item;

  if (me === "X") c += 1;
  if (me === "Y") c += 2;
  if (me === "Z") c += 3;

  me = translate[me as "X" | "Y" | "Z"];

  if (them === me) c += 3;
  if (them === "A" && me === "B") c += 6;
  if (them === "B" && me === "C") c += 6;
  if (them === "C" && me === "A") c += 6;

  score += c;
});

console.log(score);
