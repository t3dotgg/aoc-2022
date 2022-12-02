export const x = "";

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const parsed = lines.map((line) => line.split(" ") as [string, string]);

let score = 0;

const vals = ["A", "B", "C"];

parsed.forEach((item) => {
  console.log("item", item);
  let c = 0;

  const [them, me] = item;

  if (me === "X") c += 0;
  if (me === "Y") c += 3;
  if (me === "Z") c += 6;

  let more = vals.findIndex((t) => t === them)! + 1;

  if (me === "X") more -= 1;
  if (me === "Z") more += 1;
  more = more % 3;
  c += more;

  if (more === 0) {
    c += 3;
  }

  score += c;
});

console.log(score);
