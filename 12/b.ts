export const awerawer = "";

const input = await Deno.readTextFile("./input.txt");
// const input = await Deno.readTextFile("./test.txt");

const grid = input.split("\n").map((r) => r.split(""));

console.log(grid);
type Point = { x: number; y: number };

let start = { x: 0, y: 0 };
let end = { x: 0, y: 0 };

//iterate through grid
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const tile = grid[y][x];
    if (tile === "S") start = { x, y };
    if (tile === "E") end = { x, y };
  }
}

const letterToNumber = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,

  S: 1,
  E: 26,
};

const numberGrid = grid.map((row) =>
  row.map((tile) => letterToNumber[tile as keyof typeof letterToNumber])
);

const allValidMoves = (point: Point) => {
  const { x, y } = point;

  const elevation = numberGrid[y][x];

  const allMoves = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },
  ];

  return allMoves.filter((move) => {
    const { x: x2, y: y2 } = move;

    if (x2 < 0 || y2 < 0) return false;
    if (x2 >= numberGrid[0].length || y2 >= numberGrid.length) return false;

    const elevation2 = numberGrid[y2][x2];

    return elevation2 >= elevation - 1;
  });
};

let allVisitedPoints: Set<string> = new Set([`${start.x},${start.y}`]);

const pointToString = (point: Point) => `${point.x},${point.y}`;
const stringToPoint = (str: string) => ({
  x: parseInt(str.split(",")[0]),
  y: parseInt(str.split(",")[1]),
});

let incompletePaths: Point[][] = [[end]];

while (incompletePaths.length > 0) {
  const newIncompletePaths: Point[][] = [];

  for (const incompletePath of incompletePaths) {
    const lastPoint = incompletePath[incompletePath.length - 1];
    const validMoves = allValidMoves(lastPoint);

    for (const move of validMoves) {
      if (allVisitedPoints.has(pointToString(move))) continue;

      allVisitedPoints.add(pointToString(move));

      const newIncompletePath = [...incompletePath];
      newIncompletePath.push(move);

      const valAtPoint = numberGrid[move.y][move.x];

      if (valAtPoint === 1) {
        console.log("ANSWER FOUND", newIncompletePath.length - 1);
        Deno.exit();
      } else {
        newIncompletePaths.push(newIncompletePath);
      }
    }
  }

  console.log("before", incompletePaths.length);
  console.log("after", newIncompletePaths.length);

  incompletePaths = newIncompletePaths;
}
