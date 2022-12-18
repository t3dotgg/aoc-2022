export {};

const input = await Deno.readTextFile("./input.txt");
// const input = await Deno.readTextFile("./test.txt");

const lines = input.split("\n");

const cubesAsSet = new Set<string>(lines);

type Cube = {
  x: number;
  y: number;
  z: number;
};

const cubes: Cube[] = lines.map((line) => {
  const [x, y, z] = line.split(",").map((i) => parseInt(i));

  return { x, y, z };
});

console.log(cubes);

const allAdjacencies = (a: Cube) => {
  return [
    [a.x + 1, a.y, a.z],
    [a.x - 1, a.y, a.z],
    [a.x, a.y + 1, a.z],
    [a.x, a.y - 1, a.z],
    [a.x, a.y, a.z + 1],
    [a.x, a.y, a.z - 1],
  ];
};

const getNeighbors = (a: Cube) => {
  const allAdjacencies = [
    [a.x + 1, a.y, a.z],
    [a.x - 1, a.y, a.z],
    [a.x, a.y + 1, a.z],
    [a.x, a.y - 1, a.z],
    [a.x, a.y, a.z + 1],
    [a.x, a.y, a.z - 1],
  ];

  const notInSet = allAdjacencies.filter(
    ([x, y, z]) => !cubesAsSet.has(`${x},${y},${z}`)
  );

  return notInSet.length;
};

let bareSides = 0;

for (const cube of cubes) {
  const neighbors = getNeighbors(cube);

  bareSides += neighbors;
}

console.log(bareSides);
