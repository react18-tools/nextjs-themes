import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export -- export default is required for config files
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["vitest.setup.ts"],
    isolate: false,
    coverage: {
      reporter: ["text", "json", "clover", "html"],
      exclude: ["__mocks__", "**/index.ts"],
      include: ["src/**/*"],
    },
  },
});
