"use strict";

const fs = require("fs");
const path = require("path");

const name = "zustand-sync-tabs";
const ref = "zustand-sync";

const packageJsonPath = path.resolve(__dirname, "dist", "package.json");
const packageJson = require(packageJsonPath);
packageJson.name = packageJson.name.replace(ref, name);
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

const readMePath = path.resolve(__dirname, "dist", "README.md");
let readMe = fs.readFileSync(readMePath, { encoding: "utf8" });
readMe = readMe.replace(new RegExp(ref, "g"), name);
fs.writeFileSync(readMePath, readMe);
