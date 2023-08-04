"use strict";

const fs = require("fs");
const path = require("path");
const packageJson = require(path.resolve(__dirname, "package.json"));

packageJson.name = "react18-themes";

fs.writeFileSync(path.resolve(__dirname, "dist", "package.json"), JSON.stringify(packageJson, null, 2));

const readMePath = path.resolve(__dirname, "dist", "README.md");
const readMe = fs.readFileSync(readMePath, { encoding: "utf8" });
readMe.replace(/nextjs-themes/g, "react18-themes");
readMe.replace(/Nextjs-themes/g, "React18-themes");
readMe.replace(/Nextjs-Themes/g, "React18-Themes");
fs.writeFileSync(readMePath, readMe);
