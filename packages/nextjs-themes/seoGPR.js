"use strict";

const fs = require("fs");
const path = require("path");
const packageJson = require(path.resolve(__dirname, "package.json"));

packageJson.name = "@mayank1513/nextjs-themes";

fs.writeFileSync(path.resolve(__dirname, "dist", "package.json"), JSON.stringify(packageJson, null, 2));

const readMePath = path.resolve(__dirname, "dist", "README.md");
const readMe = fs.readFileSync(readMePath, { encoding: "utf8" });
readMe.replace(/react18-themes/g, "next-themes");
readMe.replace(/React18-themes/g, "Next-themes");
readMe.replace(/React18-Themes/g, "Next-Themes");
fs.writeFileSync(readMePath, readMe);
