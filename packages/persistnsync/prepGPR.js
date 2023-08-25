"use strict";

const fs = require("fs");
const path = require("path");

const packageJsonPath = path.resolve(__dirname, "dist", "package.json");
const packageJson = require(packageJsonPath);
packageJson.name = `@mayank1513/${packageJson.name}`;
packageJson.publishConfig = {
  "@mayank1513:registry": "https://npm.pkg.github.com",
};
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
