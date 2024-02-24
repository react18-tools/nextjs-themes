"use strict";

const fs = require("node:fs");
const path = require("node:path");

const packageJson = require(path.resolve(__dirname, "package.json"));

const ref = packageJson.name;
packageJson.peerDependencies.r18gs = "^0";
packageJson.name = `${packageJson.name}-lite`;

fs.writeFileSync(path.resolve(__dirname, "package.json"), JSON.stringify(packageJson, null, 2));

const readMePath = path.resolve(__dirname, "..", "..", "README.md");
let readMe = fs.readFileSync(readMePath, { encoding: "utf8" });
const tmp = "!--|--!";
const owner = process.env.OWNER;
readMe = readMe.replace(new RegExp(`$${owner}/${ref}`, "g"), tmp);
readMe = readMe.replace(new RegExp(ref, "g"), packageJson.name);
readMe = readMe.replace(new RegExp(tmp, "g"), `$${owner}/${ref}`);
fs.writeFileSync(readMePath, readMe);
