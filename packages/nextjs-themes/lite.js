"use strict";

const fs = require("fs");
const path = require("path");
const packageJson = require(path.resolve(__dirname, "package.json"));

delete packageJson.publishConfig;

packageJson.peerDependencies.zustand = "^3 || ^4";
packageJson.name = "nextjs-themes-lite";

fs.writeFileSync(path.resolve(__dirname, "package.json"), JSON.stringify(packageJson, null, 2));
