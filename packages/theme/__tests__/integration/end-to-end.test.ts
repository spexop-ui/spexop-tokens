/**
 * End-to-End Integration Tests
 * Tests complete workflow from theme creation to generation
 */

import { describe, expect, it } from "vitest";
import { generateCSS, generateJSON } from "../../dist/index.js";
import {
  generateDarkMode,
  sanitizeTheme,
  validateTheme,
} from "../../dist/index.js";
import type { SpexopThemeConfig } from "../../src/types/index.js";

describe("End-to-End Integration", () => {
  describe("complete theme workflow", () => {
    it("should create, sanitize, validate, and generate theme", () => {
      // Step 1: Create theme (with potentially unsafe input)
      const userInput = {
        meta: {
          name: "  E-Commerce Theme  ", // Has extra spaces
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
          fontFamily: "Inter, sans-serif",
          baseSize: 16,
          scale: 1.25,
          weights: {
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
          },
        },
        spacing: {
          baseUnit: 4,
          values: {},
        },
        borders: {
          default: 2,
          strong: 3,
        },
      };

      // Step 2: Sanitize
      const sanitized = sanitizeTheme(userInput);
      expect(sanitized.meta.name).toBe("E-Commerce Theme"); // Trimmed

      // Step 3: Validate
      const validation = validateTheme(sanitized);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);

      // Step 4: Generate outputs
      const css = generateCSS(sanitized);
      expect(css).toContain(":root {");
      expect(css).toContain("--theme-primary: #3b82f6");

      const json = generateJSON(sanitized);
      const parsed = JSON.parse(json);
      expect(parsed.colors.primary).toBe("#3b82f6");
    });

    it("should handle theme with token references", () => {
      const themeWithRefs = {
        meta: {
          name: "Referenced Theme",
          version: "1.0.0",
        },
        colors: {
          primary: "#3b82f6",
          secondary: "#10b981",
          accent: "colors.primary", // Token reference
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
          fontFamily: "Inter, sans-serif",
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

      // Validate
      const validation = validateTheme(themeWithRefs);
      expect(validation.valid).toBe(true);

      // Generate CSS (should resolve tokens)
      const css = generateCSS(themeWithRefs);
      expect(css).toContain("--theme-accent: #3b82f6"); // Resolved
      expect(css).not.toContain("colors.primary"); // Not the reference
    });
  });

  describe("error handling workflow", () => {
    it("should catch invalid color formats", () => {
      const invalidTheme = {
        meta: {
          name: "Invalid Theme",
          version: "1.0.0",
        },
        colors: {
          primary: "not-a-color",
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
          fontFamily: "Inter, sans-serif",
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

      const validation = validateTheme(invalidTheme);

      expect(validation.valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
      expect(validation.errors.some((e) => e.field === "colors.primary")).toBe(
        true,
      );
    });
  });

  describe("cross-format generation", () => {
    it("should generate consistent output across formats", () => {
      const theme = {
        meta: {
          name: "Minimal Theme",
          version: "1.0.0",
        },
        colors: {
          primary: "#3b82f6",
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
          fontFamily: "Inter, sans-serif",
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

      const css = generateCSS(theme);
      const json = generateJSON(theme);

      // All should reference the same primary color
      expect(css).toContain(theme.colors.primary);
      expect(json).toContain(theme.colors.primary);
    });

    it("should preserve color values across formats", () => {
      const theme = {
        meta: {
          name: "Test",
          version: "1.0.0",
        },
        colors: {
          primary: "#3b82f6",
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
          fontFamily: "Inter, sans-serif",
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

      const json = generateJSON(theme);
      const parsed = JSON.parse(json);

      expect(parsed.colors.primary).toBe("#3b82f6");
    });
  });

  describe("preset themes", () => {
    it("should validate minimal preset", () => {
      const minimalTheme = {
        meta: {
          name: "Minimal Theme",
          version: "1.0.0",
        },
        colors: {
          primary: "#3b82f6",
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
          fontFamily: "Inter, sans-serif",
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

      const validation = validateTheme(minimalTheme);

      expect(validation.valid).toBe(true);
    });

    it("should generate CSS from minimal preset", () => {
      const minimalTheme = {
        meta: {
          name: "Minimal Theme",
          version: "1.0.0",
        },
        colors: {
          primary: "#3b82f6",
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
          fontFamily: "Inter, sans-serif",
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

      const css = generateCSS(minimalTheme);

      expect(css).toBeTruthy();
      expect(css).toContain(":root {");
      expect(css).toContain("--theme-primary:");
    });
  });
});
