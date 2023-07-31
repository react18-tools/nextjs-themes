import { defineConfig } from "tsup";

export default defineConfig(options => ({
  format: ["cjs", "esm"],
  target: "es2019",
  sourcemap: true,
  clean: true,
  minify: !options.watch,
  banner: {
    js: `"use client";`,
  },
}));
