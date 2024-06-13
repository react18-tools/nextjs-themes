"use strict";

const fs = require("node:fs");
const path = require("node:path");

const packageJson = require(path.resolve(process.cwd(), "package.json"));
if (process.env.TOKEN) {
  const { Octokit } = import("octokit");
  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: process.env.TOKEN,
  });

  const octoOptions = {
    owner: process.env.OWNER,
    repo: process.env.REPO,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };
  const tagName = `v${packageJson.version}`;
  const name = `Release ${tagName}`;
  /** Create a release */
  octokit.request("POST /repos/{owner}/{repo}/releases", {
    ...octoOptions,
    tag_name: tagName,
    target_commitish: "main",
    name,
    draft: false,
    prerelease: false,
    generate_release_notes: true,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}
delete packageJson.scripts;

packageJson.main = "index.js";
packageJson.types = "index.d.ts";

fs.writeFileSync(path.resolve(process.cwd(), "dist", "package.json"), JSON.stringify(packageJson, null, 2));

fs.copyFileSync(path.resolve(process.cwd(), "..", "..", "README.md"), path.resolve(process.cwd(), "dist", "README.md"));

fs.copyFileSync(path.resolve(__dirname, "CHANGELOG.md"), path.resolve(__dirname, "dist", "CHANGELOG.md"));
