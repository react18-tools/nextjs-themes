import { defineConfig } from "tsup";
import react18Plugin from "esbuild-plugin-react18";

// eslint-disable-next-line import/no-default-export -- export default is required for config files
export default defineConfig(options => ({
  format: ["cjs", "esm"],
  target: "es2019",
  sourcemap: false,
  clean: true,
  minify: !options.watch,
  esbuildPlugins: [react18Plugin()],
  legacyOutput: true,
}));
