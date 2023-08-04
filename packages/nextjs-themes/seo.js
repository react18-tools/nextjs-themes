"use strict";

const fs = require("fs");
const path = require("path");
const packageJson = require(path.resolve(__dirname, "dist", "package.json"));

packageJson.name = packageJson.name.replace("nextjs", "react18");

fs.writeFileSync(path.resolve(__dirname, "dist", "package.json"), JSON.stringify(packageJson, null, 2));

const readMePath = path.resolve(__dirname, "dist", "README.md");
let readMe = fs.readFileSync(readMePath, { encoding: "utf8" });
readMe = readMe.replace(/nextjs-themes/g, "react18-themes");
readMe = readMe.replace(/Nextjs-themes/g, "React18-themes");
readMe = readMe.replace(/Nextjs-Themes/g, "React18-Themes");
console.log(readMePath, readMe);
fs.writeFileSync(readMePath, readMe);
