import fs from "node:fs";
import path from "node:path";

const __dirname = import.meta.dirname;

export function readInputData(filename: string) {
	return fs.readFileSync(path.join(__dirname, "..", "data", filename), {
		encoding: "utf-8",
	});
}
