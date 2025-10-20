import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/**/*"],
      outDir: "dist",
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        templates: resolve(__dirname, "src/templates/index.ts"),
        "templates/types": resolve(__dirname, "src/templates/types.ts"),
        "templates/registry": resolve(
          __dirname,
          "src/templates/registry/index.ts",
        ),
        "templates/renderers": resolve(
          __dirname,
          "src/templates/renderers/index.ts",
        ),
      },
      formats: ["es"],
      fileName: (format, entryName) => {
        if (entryName === "index") {
          return "src/index.js";
        }
        return `src/${entryName}.js`;
      },
    },
    rollupOptions: {
      external: ["react", "react-dom", "@spexop/theme"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@spexop/theme": "SpexopTheme",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "index.css";
          }
          return assetInfo.name;
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: false,
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
      localsConvention: "camelCase",
    },
  },
});
