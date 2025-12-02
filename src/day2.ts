import { readInputData } from "./utils";

function range(start: number, end: number) {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function sum(arr: Array<number>) {
	return arr.reduce((acc, curr) => acc + curr, 0);
}

function filterRegex<T extends number | string>(r: RegExp) {
	return (item: T) => String(item).match(r);
}

function main() {
	const inputData = readInputData("day2/input.txt")
		.replaceAll("\n", "")
		.split(",")
		.filter(Boolean)
		.map((data) =>
			data
				.split("-")
				.filter((e) => !e.startsWith("0"))
				.map((e) => parseInt(e, 10)),
		)
		.flatMap((tuple) => range(tuple[0] as number, tuple[1] as number));

	console.log(inputData);

	const filter1 = inputData.filter(filterRegex(/^(?:(\d)\1|(.{2,})\2)$/g));
	const filter2 = inputData.filter(filterRegex(/^(?:(\d)\1+|(.{2,})\2+)$/g));

	const sum1 = sum(filter1);
	const sum2 = sum(filter2);

	console.log(sum1);
	console.log(sum2);
}

main();
