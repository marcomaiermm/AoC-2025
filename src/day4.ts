import { readInputData } from "./utils";

type Item = "." | "@";
type Column = Array<Item>;
type Grid = Array<Column>;

/**
 * get the 8 neighbours in a single array
 */
function neighbours(arr: Grid, xPos: number, yPos: number) {
	const item = arr[xPos]?.[yPos];
	if (!item)
		throw Error(`item does not exist in grid at pos x:${xPos}/y:${yPos}`);

	/**
	 * @example
	 * 1.1 1.2 1.3
	 * 2.1 2.2 2.3
	 * 3.1 3.2 3.3
	 */
	return [
		arr[xPos - 1]?.[yPos - 1],
		arr[xPos]?.[yPos - 1],
		arr[xPos + 1]?.[yPos - 1],

		arr[xPos - 1]?.[yPos],
		arr[xPos + 1]?.[yPos],

		arr[xPos - 1]?.[yPos + 1],
		arr[xPos]?.[yPos + 1],
		arr[xPos + 1]?.[yPos + 1],
	];
}

function compute(grid: Grid): [number, Grid] {
	let n = 0;
	const g = structuredClone(grid);

	for (const [i, row] of grid.entries()) {
		for (const [j, col] of row.entries()) {
			if (col !== "@") continue;
			const positions = neighbours(grid, i, j)
				.filter(Boolean)
				.map<number>((p) => (p === "@" ? 1 : 0))
				.reduce((acc, curr) => acc + curr, 0);
			if (positions < 4) {
				n++;
				if (g[i]?.[j]) {
					g[i][j] = ".";
				}
			}
		}
	}
	return [n, g];
}

function recursiveCompute(gr: Grid, prev: number, removed?: number): number {
	if (!removed) {
		return prev;
	}
	const [result, grid] = compute(gr);
	return recursiveCompute(grid, prev + result, result);
}

function main() {
	const grid = readInputData("day4/input.txt")
		.trim()
		.split("\n")
		.filter(Boolean)
		.map((line) => line.split("")) as Grid;

	const [result1] = compute(grid);
	const result2 = recursiveCompute(grid, 0, result1);

	console.log({ result1, result2 });
}

main();
