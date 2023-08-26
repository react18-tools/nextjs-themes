"use strict";

const fs = require("fs");
const path = require("path");

const packageJsonPath = path.resolve(__dirname, "dist", "package.json");
const packageJson = require(packageJsonPath);
packageJson.name = packageJson.name.replace("nextjs", "react18");
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

const readMePath = path.resolve(__dirname, "dist", "README.md");
let readMe = fs.readFileSync(readMePath, { encoding: "utf8" });
readMe = readMe.replace(/nextjs-themes/g, "react18-themes");
readMe = readMe.replace(/Nextjs-themes/g, "React18-themes");
readMe = readMe.replace(/Nextjs-Themes/g, "React18-Themes");
readMe = readMe.replace(/mayank1513\/react18[^/\)]*/g, "mayank1513/nextjs-themes"); //codecov and action badge
fs.writeFileSync(readMePath, readMe);
