import { readInputData } from "./utils";

type BigIntRange = [start: bigint, end: bigint];

function merge(ranges: Array<BigIntRange>) {
	if (!ranges.length) return [];

	const sorted = [...ranges].sort(([aStart, aEnd], [bStart, bEnd]) => {
		if (aStart !== bStart) {
			return aStart < bStart ? -1 : 1;
		}
		return aEnd < bEnd ? -1 : aEnd > bEnd ? 1 : 0;
	});

	const merged: Array<BigIntRange> = [];

	let current = sorted[0] as BigIntRange;
	for (let i = 1; i < sorted.length; i++) {
		const [currentStart, currentEnd] = current;
		const [nextStart, nextEnd] = sorted[i] as BigIntRange;

		if (currentEnd + 1n >= nextStart) {
			current = [currentStart, currentEnd > nextEnd ? currentEnd : nextEnd];
		} else {
			merged.push(current);
			current = sorted[i] as BigIntRange;
		}
	}

	merged.push(current);
	return merged;
}

function main() {
	const [idRangesString, ingredientIdsString] = readInputData("day5/input.txt")
		.trim()
		.split("\n\n")
		.map((d) => d.split("\n"));

	if (!(idRangesString && ingredientIdsString))
		throw Error("range or ids are empty");

	const ranges: Array<BigIntRange> = idRangesString.map((l) => {
		const [start, end] = l.split("-").map(BigInt);
		if (!(start && end)) throw Error(`invalid start and end: ${start}:${end}`);
		return [start, end];
	});

	const ids = new Map<string, number>();
	let freshIds: bigint = 0n;
	const merged = merge(ranges);

	for (const ingredientId of ingredientIdsString) {
		const target = BigInt(ingredientId);
		for (const [start, end] of merged) {
			if (target >= start && target <= end) {
				ids.set(ingredientId, 1);
				break;
			}
		}
	}

	for (const [start, end] of merged) {
		freshIds += end - start + 1n;
	}

	console.log(`Part 1: ${ids.size}`);
	console.log(`Part 2: ${String(freshIds)}`);
}

main();
