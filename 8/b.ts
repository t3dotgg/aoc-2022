export const x = "";

const input = await Deno.readTextFile("./input.txt");
// const input = await Deno.readTextFile("./test.txt");

const lines = input.split("\n");

const numGrid = lines.map((line) => line.split("").map((num) => parseInt(num)));

let bestScore = 0;

const treeIsVisible = (x: number, y: number) => {
  const tree = numGrid[x][y];
  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;

  for (let j = x - 1; j >= 0; j--) {
    a++;
    if (numGrid[j][y] >= tree) break;
  }
  for (let j = x + 1; j < numGrid.length; j++) {
    b++;
    if (numGrid[j][y] >= tree) break;
  }
  for (let k = y - 1; k >= 0; k--) {
    c++;
    if (numGrid[x][k] >= tree) break;
  }
  for (let k = y + 1; k < numGrid[x].length; k++) {
    d++;
    if (numGrid[x][k] >= tree) break;
  }
  const scenicScore = a * b * c * d;
  if (scenicScore > bestScore) bestScore = scenicScore;
};

for (let x = 0; x < numGrid.length; x++) {
  for (let y = 0; y < numGrid[x].length; y++) {
    treeIsVisible(x, y);
  }
}

console.log(bestScore);
