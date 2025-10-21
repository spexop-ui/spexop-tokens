/**
 * Round-Trip Integration Tests
 * Tests that theme data is preserved through conversions
 */

import { describe, expect, it } from "vitest";
import { generateJSON } from "../../dist/index.js";
import { sanitizeThemeFromJSON } from "../../dist/index.js";
import type { SpexopThemeConfig } from "../../src/types/index.js";

describe("Round-Trip Tests", () => {
  describe("JSON round-trip", () => {
    it("should preserve theme through JSON stringify/parse", () => {
      const original = {
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

      // Convert to JSON and back
      const jsonString = JSON.stringify(original);
      const parsed = JSON.parse(jsonString);

      expect(parsed.meta.name).toBe(original.meta.name);
      expect(parsed.colors.primary).toBe(original.colors.primary);
      expect(parsed.typography.baseSize).toBe(original.typography.baseSize);
    });

    it("should preserve theme through generateJSON/parse", () => {
      const original = {
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

      // Generate JSON using generator
      const jsonString = generateJSON(original);
      const parsed = JSON.parse(jsonString);

      expect(parsed.colors.primary).toBe(original.colors.primary);
      expect(parsed.typography.baseSize).toBe(original.typography.baseSize);
      expect(parsed.spacing.baseUnit).toBe(original.spacing.baseUnit);
    });

    it("should preserve theme through sanitizeThemeFromJSON round-trip", () => {
      const original: SpexopThemeConfig = {
        meta: {
          name: "Test Theme",
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
          thick: 4,
          radiusSubtle: 8,
          radiusRelaxed: 12,
          radiusPill: 9999,
          defaultStyle: "solid",
        },
      };

      // Convert to JSON and sanitize back
      const jsonString = JSON.stringify(original);
      const restored = sanitizeThemeFromJSON(jsonString);

      expect(restored.meta.name).toBe(original.meta.name);
      expect(restored.colors.primary).toBe(original.colors.primary);
      expect(restored.typography.baseSize).toBe(original.typography.baseSize);
      expect(restored.spacing.baseUnit).toBe(original.spacing.baseUnit);
      expect(restored.borders.default).toBe(original.borders.default);
    });

    it("should preserve optional properties", () => {
      const themeWithOptionals: SpexopThemeConfig = {
        meta: {
          name: "Full Theme",
          version: "1.0.0",
          description: "A theme with all properties",
          author: "Test Author",
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
          success: "#059669",
          warning: "#f59e0b",
          error: "#ef4444",
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
          thick: 4,
          radiusSubtle: 8,
          radiusRelaxed: 12,
          radiusPill: 9999,
          defaultStyle: "solid",
        },
      };

      const jsonString = JSON.stringify(themeWithOptionals);
      const restored = sanitizeThemeFromJSON(jsonString);

      expect(restored.meta.description).toBe(
        themeWithOptionals.meta.description,
      );
      expect(restored.meta.author).toBe(themeWithOptionals.meta.author);
      expect(restored.colors.secondary).toBe(
        themeWithOptionals.colors.secondary,
      );
      expect(restored.colors.success).toBe(themeWithOptionals.colors.success);
    });
  });

  describe("data integrity", () => {
    it("should not lose data in sanitization", () => {
      const original = {
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

      const jsonString = JSON.stringify(original);
      const sanitized = sanitizeThemeFromJSON(jsonString);

      // Check all required properties are preserved
      expect(sanitized.meta.name).toBeTruthy();
      expect(sanitized.meta.version).toBeTruthy();
      expect(sanitized.colors.primary).toBeTruthy();
      expect(sanitized.typography.fontFamily).toBeTruthy();
      expect(sanitized.typography.baseSize).toBeGreaterThan(0);
      expect(sanitized.spacing.baseUnit).toBeGreaterThan(0);
      expect(sanitized.borders.default).toBeGreaterThan(0);
    });

    it("should preserve number precision", () => {
      const theme: SpexopThemeConfig = {
        meta: {
          name: "Precision Test",
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
          baseSize: 16.5,
          scale: Math.SQRT2, // Augmented fourth
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
          thick: 4,
          radiusSubtle: 8,
          radiusRelaxed: 12,
          radiusPill: 9999,
          defaultStyle: "solid",
        },
      };

      const jsonString = JSON.stringify(theme);
      const restored = sanitizeThemeFromJSON(jsonString);

      expect(restored.typography.baseSize).toBe(16.5);
      expect(restored.typography.scale).toBe(Math.SQRT2);
    });
  });
});
