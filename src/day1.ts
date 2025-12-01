import { readInputData } from "./utils";

type Direction = "L" | "R";

const MATH = {
	L: (x: number, y: number) => x - y,
	R: (x: number, y: number) => x + y,
	mod: (v: number, m: number) => ((v % m) + m) % m,
} as const;

function rotate(dial: number, rotation: number, direction: Direction) {
	let value = MATH[direction](dial, rotation);
	let tripper = dial;
	let trips = 0;
	const sign = direction === "L" ? -1 : 1;

	if (value < 0 || value > 99) {
		value = MATH.mod(value, 100);
	}

	// part 2
	for (let i = 0; i < rotation; i++) {
		tripper = (tripper + sign + 100) % 100;
		if (tripper === 0) trips++;
	}

	return {
		value,
		trips,
	};
}

function getRotation(input: string) {
	const [direction, value] = [
		input[0] as Direction,
		parseInt(input.slice(1), 10),
	];
	return {
		direction,
		value,
	};
}

function main() {
	let dial = 50;
	let secret1 = 0;
	let secret2 = 0;
	for (const input of readInputData("day1/input.txt")) {
		const rotation = getRotation(input);
		const result = rotate(dial, rotation.value, rotation.direction);
		dial = result.value;
		secret2 += result.trips;
		if (dial === 0) secret1++;
	}
	console.log("Password  :", secret1);
	console.log("Password 2:", secret2);
}

main();
