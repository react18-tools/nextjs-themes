"use strict";

const fs = require("fs");
const path = require("path");
const packageJson = require(path.resolve(__dirname, "dist", "package.json"));

packageJson.name = `@mayank1513/${packageJson.name}`;
packageJson.publishConfig = {
  "@mayank1513:registry": "https://npm.pkg.github.com",
};

fs.writeFileSync(path.resolve(__dirname, "dist", "package.json"), JSON.stringify(packageJson, null, 2));
