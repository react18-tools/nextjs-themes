"use strict";

const fs = require("node:fs");
const path = require("node:path");

const owner = "mayank1513";
const wd = path.resolve(process.cwd(), "dist");
const packageJson = require(path.resolve(wd, "package.json"));
const ref = packageJson.name;
if (!ref.startsWith(`@${owner}`)) {
	packageJson.name = `@${owner}/${packageJson.name}`;
	fs.writeFileSync(path.resolve(wd, "package.json"), JSON.stringify(packageJson, null, 2));
	const readMePath = path.resolve(wd, "README.md");
	let readMe = fs.readFileSync(readMePath, { encoding: "utf8" });
	const tmp = "!--|--!";
	readMe = readMe.replace(new RegExp(`$${owner}/${ref}`, "g"), tmp);
	readMe = readMe.replace(new RegExp(ref, "g"), packageJson.name);
	readMe = readMe.replace(new RegExp(tmp, "g"), `$${owner}/${ref}`);
	fs.writeFileSync(readMePath, readMe);
}
