import { readInputData } from "./utils";

function sum(arr: Array<number>) {
	return arr.reduce((acc, curr) => acc + curr, 0);
}
function getMaxJoltage(bank: string, length: number): string {
	if (length === 0) {
		return "";
	}

	const num = String(
		Math.max(
			...bank
				.slice(0, bank.length - length + 1)
				.split("")
				.map(Number),
		),
	);
	const pos = bank.indexOf(num);
	return num + getMaxJoltage(bank.slice(pos + 1), length - 1);
}

function main() {
	const inputData = readInputData("day3/input.txt")
		.trim()
		.split("\n")
		.filter(Boolean);

	const p1 = sum(inputData.map((s) => parseInt(getMaxJoltage(s, 2), 10)));
	const p2 = sum(inputData.map((s) => parseInt(getMaxJoltage(s, 12), 10)));

	console.log(p1);
	console.log(p2);
}

main();
