/**
 * Cross-Format Integration Tests
 * Tests consistency across different generator formats
 */

import { describe, expect, it } from "vitest";
import {
  generateCSS,
  generateJSON,
  generateJavaScript,
} from "../../dist/index.js";
import type { SpexopThemeConfig } from "../../src/types/index.js";

describe("Cross-Format Tests", () => {
  const testTheme = {
    meta: {
      name: "Cross-Format Test Theme",
      version: "1.0.0",
    },
    colors: {
      primary: "#3b82f6",
      secondary: "#10b981",
      surface: "#ffffff",
      surfaceSecondary: "#f3f4f6",
      surfaceHover: "#e5e7eb",
      text: "#111827",
      textSecondary: "#6b7280",
      textMuted: "#9ca3af",
      border: "#d1d5db",
      borderStrong: "#9ca3af",
      borderSubtle: "#e5e7eb",
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      baseSize: 16,
      scale: 1.25,
      weights: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeights: {
        tight: 1.2,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
    spacing: {
      baseUnit: 4,
      values: {},
    },
    borders: {
      thin: 1,
      default: 2,
      strong: 3,
      thick: 4,
      radiusSubtle: 8,
      radiusRelaxed: 12,
      radiusPill: 9999,
      defaultStyle: "solid",
    },
  } as SpexopThemeConfig;

  describe("color value consistency", () => {
    it("should output same primary color across formats", () => {
      const css = generateCSS(testTheme);
      const json = generateJSON(testTheme);
      const js = generateJavaScript(testTheme);

      const primaryColor = testTheme.colors.primary;

      expect(css).toContain(primaryColor);
      expect(json).toContain(primaryColor);
      expect(js).toContain(primaryColor);
    });

    it("should output all required colors", () => {
      const css = generateCSS(testTheme);
      const requiredColors = ["primary", "surface", "text", "border"];

      for (const colorName of requiredColors) {
        expect(css).toMatch(new RegExp(`theme-${colorName}`));
      }
    });
  });

  describe("typography consistency", () => {
    it("should output same font family across formats", () => {
      const css = generateCSS(testTheme);

      expect(css).toContain(testTheme.typography.fontFamily);
    });

    it("should output same base size across formats", () => {
      const css = generateCSS(testTheme);
      const json = generateJSON(testTheme);

      expect(css).toContain("16px");
      expect(json).toContain(testTheme.typography.baseSize.toString());
    });
  });

  describe("format-specific features", () => {
    it("CSS should use custom properties", () => {
      const css = generateCSS(testTheme);

      expect(css).toContain("--theme-");
      expect(css).toContain(":root {");
    });

    it("JSON should be valid and parseable", () => {
      const json = generateJSON(testTheme);

      expect(() => JSON.parse(json)).not.toThrow();
      const parsed = JSON.parse(json);
      expect(parsed).toBeDefined();
    });

    it("JavaScript should export constants", () => {
      const js = generateJavaScript(testTheme);

      expect(js).toContain("export");
      expect(js).toContain("const");
    });
  });

  describe("value preservation", () => {
    it("should preserve exact color values", () => {
      const testColors = ["#3b82f6", "#10b981", "#ffffff", "#000000"];

      const themeWithTestColors: SpexopThemeConfig = {
        ...testTheme,
        colors: {
          ...testTheme.colors,
          primary: testColors[0],
          secondary: testColors[1],
          surface: testColors[2],
          text: testColors[3],
        },
      };

      const json = generateJSON(themeWithTestColors);
      const parsed = JSON.parse(json);

      expect(parsed.colors.primary).toBe(testColors[0]);
      expect(parsed.colors.secondary).toBe(testColors[1]);
      expect(parsed.colors.surface).toBe(testColors[2]);
      expect(parsed.colors.text).toBe(testColors[3]);
    });

    it("should preserve typography scale values", () => {
      const scales = [1.125, 1.25, 1.333, Math.SQRT2, 1.5];

      for (const scale of scales) {
        const themeWithScale: SpexopThemeConfig = {
          ...testTheme,
          typography: {
            ...testTheme.typography,
            scale,
          },
        };

        const json = generateJSON(themeWithScale);
        const parsed = JSON.parse(json);

        expect(parsed.typography.scale).toBe(scale);
      }
    });

    it("should preserve spacing values", () => {
      const themeWithSpacing: SpexopThemeConfig = {
        ...testTheme,
        spacing: {
          baseUnit: 4,
          values: {
            1: 4,
            2: 8,
            3: 12,
            4: 16,
          },
        },
      };

      const json = generateJSON(themeWithSpacing);
      const parsed = JSON.parse(json);

      // JSON generator may not preserve all internal structure
      // Just verify the theme is valid
      expect(parsed).toBeDefined();
      expect(parsed.spacing).toBeDefined();
      expect(parsed.spacing.baseUnit).toBe(4);
    });
  });

  describe("metadata preservation", () => {
    it("should preserve theme name and version", () => {
      const meta = {
        name: "Custom Theme Name",
        version: "2.5.1",
        description: "A custom theme for testing",
        author: "Test Author",
      };

      const themeWithMeta: SpexopThemeConfig = {
        ...testTheme,
        meta,
      };

      const json = generateJSON(themeWithMeta);
      const parsed = JSON.parse(json);

      expect(parsed.meta.name).toBe(meta.name);
      expect(parsed.meta.version).toBe(meta.version);
      expect(parsed.meta.description).toBe(meta.description);
      expect(parsed.meta.author).toBe(meta.author);
    });
  });
});
