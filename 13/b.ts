export const awerawer = "";

const input = await Deno.readTextFile("./input.txt");
// const input = await Deno.readTextFile("./test.txt");

const groups = input.split("\n\n");

type Base = number | number[];
type Node = Base | Base[];

const makeArray = (n: Node) => {
  return typeof n === "number" ? [n] : n;
};

const parsed = groups.map((group) => {
  const lines = group.split("\n");
  const nodes = lines.map((line) => {
    return JSON.parse(line);
  });
  return nodes as [Node[], Node[]];
});

function diff(left: Node, right: Node): boolean | undefined {
  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length && i < right.length; i++) {
      const c = diff(left[i], right[i]);
      if (c !== undefined) {
        return c;
      }
    }

    if (left.length > right.length) return false;
    if (left.length < right.length) return true;
    return undefined;
  } else if (typeof left === "number" && typeof right === "number") {
    if (left > right) return false;
    if (left < right) return true;
    return undefined;
  } else {
    return diff(makeArray(left), makeArray(right));
  }
}
const injection = [[[2]], [[6]]];

const dumpParsed = [...parsed.flatMap((p) => p), ...injection];

const sortedParsed = dumpParsed.sort((a, b) => {
  const c = diff(a as Node, b as Node);
  if (c === undefined) {
    return 0;
  }
  return c ? -1 : 1;
});

let first = -1;

let second = -1;

sortedParsed.forEach((p, index) => {
  if (JSON.stringify(p) === JSON.stringify(injection[0])) {
    first = index + 1;
  }
  if (JSON.stringify(p) === JSON.stringify(injection[1])) {
    second = index + 1;
  }
});
console.log(first * second);
