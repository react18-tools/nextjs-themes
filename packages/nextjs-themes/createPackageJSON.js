"use strict";

const fs = require("fs");
const path = require("path");
const packageJson = require(path.resolve(__dirname, "package.json"));

delete packageJson.devDependencies;
delete packageJson.scripts;

packageJson.main = "index.js";
packageJson.types = "index.d.ts";

fs.writeFileSync(path.resolve(__dirname, "dist", "package.json"), JSON.stringify(packageJson, null, 2));

const readMePath = path.resolve(__dirname, "dist", "README.md");
let readMe = fs.readFileSync(readMePath, { encoding: "utf8" });
readMe.replace(
  "[![Publish to npm and GitHub](https://github.com/mayank1513/nextjs-themes/actions/workflows/publish-to-npm-on-new-release.yml/badge.svg)](https://github.com/mayank1513/nextjs-themes/actions/workflows/publish-to-npm-on-new-release.yml)",
  "",
);
fs.writeFileSync(readMePath, readMe);
