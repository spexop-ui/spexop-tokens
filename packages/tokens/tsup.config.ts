import { defineConfig } from "tsup";

export default defineConfig({
  splitting: false,
  clean: true,
  dts: true, // Re-enabled after fixing TypeScript config conflicts
  bundle: true,
  format: ["cjs", "esm"],
  skipNodeModulesBundle: true,
  target: "esnext",
  outDir: "dist",
  entry: ["src/index.ts"],
});
