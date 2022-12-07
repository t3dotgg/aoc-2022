export const x = "";

const input = (await Deno.readTextFile("./input.txt")).split("\n");
// const input = (await Deno.readTextFile("./test.txt")).split("\n");
console.log(input);

type Dir = {
  parent?: Dir;
  files: { [name: string]: number };
  dirs: { [name: string]: Dir };
};

const fs: Dir = { files: {}, dirs: {} };

let current = fs;

for (const command of input) {
  const [cmd, ...rest] = command.split(" ");

  if (cmd === "$") {
    if (rest[0] === "cd") {
      const dir = rest[1];
      if (dir === "..") {
        current = current.parent!;
      } else if (dir === "/") {
        current = fs;
      } else {
        if (!current.dirs[dir]) {
          current.dirs[dir] = { parent: current, files: {}, dirs: {} };
        }
        current = current.dirs[dir];
      }
    }
  } else if (cmd !== "dir") {
    current.files[rest[0]] = parseInt(cmd);
  }
}

const dirSizes: number[] = [];

const computeFileSize = (curr: Dir): number => {
  let size = 0;

  for (const file in curr.files) {
    size += curr.files[file];
  }

  for (const dir in curr.dirs) {
    const dirSize = computeFileSize(curr.dirs[dir]);
    size += dirSize;

    dirSizes.push(dirSize);
  }

  return size;
};

const rootSize = computeFileSize(fs);

const smallestThatFixesSpace = Math.min(
  ...dirSizes.filter((x) => x >= 30000000 - (70000000 - rootSize))
);
console.log("part 2:", smallestThatFixesSpace);
