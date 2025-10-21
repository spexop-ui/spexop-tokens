/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["../../tests/setup.ts"],
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/*.e2e.test.*",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "**/*.d.ts",
        "**/*.config.{js,ts}",
        "**/dist/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@spexop/utils": resolve(__dirname, "../utils/src"),
      "@spexop/icons": "@spexop/icons",
      "@spexop/react": resolve(__dirname, "./src"),
    },
  },
});
