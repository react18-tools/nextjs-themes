/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  tsconfig: "tsconfig.docs.json",
  name: "Nextjs Themes",
  entryPoints: ["./lib/src"],
  exclude: ["**/*.test.tsx", "**/index.ts", "**/declaration.d.ts"],
  entryPointStrategy: "Expand",
  out: "./docs",
  commentStyle: "all",
  searchInComments: true,
  searchInDocuments: true,
  cleanOutputDir: true,
  excludePrivate: true,
  excludeExternals: true,
  projectDocuments: ["guides/*.md"],
  plugin: [
    "typedoc-plugin-mdn-links",
    "typedoc-plugin-rename-defaults",
    "typedoc-plugin-missing-exports",
    "typedoc-plugin-zod",
    "typedoc-plugin-inline-sources",
    // "typedoc-plugin-extras",
  ],
};
