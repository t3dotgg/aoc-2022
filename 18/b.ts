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

let minX = Math.min(...cubes.map((c) => c.x));
let maxX = Math.max(...cubes.map((c) => c.x));
let minY = Math.min(...cubes.map((c) => c.y));
let maxY = Math.max(...cubes.map((c) => c.y));
let minZ = Math.min(...cubes.map((c) => c.z));
let maxZ = Math.max(...cubes.map((c) => c.z));

console.log(cubes);

const maxMax = Math.max(maxX, maxY, maxZ) + 100;

const getAllAdjacencies = (a: Cube) => {
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
  const allAdjacencies = getAllAdjacencies(a);

  const notInSet = allAdjacencies.filter(([x, y, z]) => {
    return !cubesAsSet.has(`${x},${y},${z}`);
  });

  return notInSet;
};

const floodFill = () => {
  let outsidePoints = new Set<string>();

  let newPoints = [`${maxMax},${maxMax},${maxMax}`];

  while (newPoints.length > 0) {
    const parsePoints = [...newPoints];
    newPoints = [];
    parsePoints.forEach((nextPoint) => {
      if (outsidePoints.has(nextPoint)) return;

      outsidePoints.add(nextPoint);

      const [x, y, z] = nextPoint.split(",").map((i) => parseInt(i));

      const neighbors = getAllAdjacencies({ x, y, z });

      for (const neighbor of neighbors) {
        const [x, y, z] = neighbor;
        if (x > maxMax || y > maxMax || z > maxMax) continue;
        if (x < -maxMax || y < -maxMax || z < -maxMax) continue;
        const asStr = `${x},${y},${z}`;
        if (outsidePoints.has(asStr)) continue;
        if (cubesAsSet.has(asStr)) continue;
        newPoints.push(`${x},${y},${z}`);
      }
    });
  }

  return outsidePoints;
};
console.log("flood start");
const outsidePoints = floodFill();
console.log("flood end");

const getNeighborsWithoutPockets = (a: Cube) => {
  const allAdjacencies = getAllAdjacencies(a);

  const notInSet = allAdjacencies.filter(([x, y, z]) => {
    if (cubesAsSet.has(`${x},${y},${z}`)) return false;

    return outsidePoints.has(`${x},${y},${z}`);
  });

  return notInSet.length;
};

let bareSides = 0;

for (const cube of cubes) {
  const neighbors = getNeighborsWithoutPockets(cube);

  bareSides += neighbors;
}

console.log(bareSides);
