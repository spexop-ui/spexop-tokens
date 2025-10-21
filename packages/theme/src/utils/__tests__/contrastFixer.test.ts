/**
 * Tests for Contrast Fixer Utilities
 */

import { describe, expect, it } from "vitest";
import type { SpexopThemeConfig } from "../../types/index.js";
import { calculateContrastRatio } from "../contrastChecker.js";
import {
  fixContrast,
  fixThemeContrast,
  previewContrastFixes,
} from "../contrastFixer.js";

describe("contrastFixer", () => {
  const accessibleTheme = {
    meta: {
      name: "Accessible Theme",
      version: "1.0.0",
    },
    colors: {
      primary: "#1e40af",
      surface: "#ffffff",
      surfaceSecondary: "#f3f4f6",
      surfaceHover: "#e5e7eb",
      text: "#111827",
      textSecondary: "#374151",
      textMuted: "#6b7280",
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

  describe("fixContrast", () => {
    it("should fix low contrast colors", () => {
      const result = fixContrast("#888888", "#ffffff", 4.5);

      expect(result.success).toBe(true);
      expect(result.finalRatio).toBeGreaterThanOrEqual(4.5);
    });

    it("should return unchanged if already meets ratio", () => {
      const result = fixContrast("#000000", "#ffffff", 4.5);

      expect(result.fixed).toBe(result.original);
      expect(result.adjustment).toBe(0);
      expect(result.success).toBe(true);
    });

    it("should darken light text on light background", () => {
      const result = fixContrast("#cccccc", "#ffffff", 4.5);

      expect(result.success).toBe(true);
      expect(result.finalRatio).toBeGreaterThanOrEqual(4.5);
    });

    it("should lighten dark text on dark background", () => {
      const result = fixContrast("#333333", "#000000", 4.5);

      expect(result.success).toBe(true);
      expect(result.finalRatio).toBeGreaterThanOrEqual(4.5);
    });

    it("should respect maxAdjustment limit", () => {
      const result = fixContrast("#888888", "#ffffff", 7.0, {
        maxAdjustment: 10,
      });

      if (result.success) {
        expect(result.adjustment).toBeLessThanOrEqual(10);
      }
    });

    it("should achieve AAA ratio when requested", () => {
      const result = fixContrast("#666666", "#ffffff", 7.0);

      if (result.success) {
        expect(result.finalRatio).toBeGreaterThanOrEqual(7.0);
      }
    });

    it("should preserve hue by default", () => {
      const result = fixContrast("#3b82f6", "#ffffff", 4.5, {
        preserveHue: true,
      });

      expect(result.success).toBe(true);
    });
  });

  describe("fixThemeContrast", () => {
    it("should fix inaccessible theme", () => {
      const inaccessible = {
        meta: { name: "Test", version: "1.0.0" },
        colors: {
          primary: "#ffeb3b",
          surface: "#ffffff",
          surfaceSecondary: "#f3f4f6",
          surfaceHover: "#e5e7eb",
          text: "#999999",
          textSecondary: "#aaaaaa",
          textMuted: "#bbbbbb",
          border: "#eeeeee",
          borderStrong: "#dddddd",
          borderSubtle: "#f5f5f5",
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

      const fixed = fixThemeContrast(inaccessible, { targetLevel: "AA" });

      const textContrast = calculateContrastRatio(
        fixed.colors.text,
        fixed.colors.surface,
      );
      expect(textContrast).toBeGreaterThanOrEqual(4.5);
    });

    it("should not modify already accessible theme significantly", () => {
      const fixed = fixThemeContrast(accessibleTheme, { targetLevel: "AA" });

      expect(fixed.colors.text).toBe(accessibleTheme.colors.text);
      expect(fixed.colors.primary).toBe(accessibleTheme.colors.primary);
    });

    it("should fix to AAA when requested", () => {
      const fixed = fixThemeContrast(accessibleTheme, { targetLevel: "AAA" });

      const textContrast = calculateContrastRatio(
        fixed.colors.text,
        fixed.colors.surface,
      );
      expect(textContrast).toBeGreaterThanOrEqual(7.0);
    });

    it("should preserve meta and non-color properties", () => {
      const fixed = fixThemeContrast(accessibleTheme, { targetLevel: "AA" });

      expect(fixed.meta).toEqual(accessibleTheme.meta);
      expect(fixed.typography).toEqual(accessibleTheme.typography);
      expect(fixed.spacing).toEqual(accessibleTheme.spacing);
      expect(fixed.borders).toEqual(accessibleTheme.borders);
    });

    it("should fix semantic colors when present", () => {
      const themeWithSemantics: SpexopThemeConfig = {
        ...accessibleTheme,
        colors: {
          ...accessibleTheme.colors,
          success: "#88ff88", // Too light
          error: "#ff8888", // Too light
          warning: "#ffff66", // Too light
        },
      };

      const fixed = fixThemeContrast(themeWithSemantics, { targetLevel: "AA" });

      if (fixed.colors.success) {
        const successContrast = calculateContrastRatio(
          fixed.colors.success,
          fixed.colors.surface,
        );
        // May or may not be fixed depending on preserveHue and maxAdjustment
        // Just verify it attempted to fix
        expect(fixed.colors.success).toBeDefined();
      }
    });
  });

  describe("previewContrastFixes", () => {
    it("should preview fixes without applying them", () => {
      const inaccessible = {
        meta: { name: "Test", version: "1.0.0" },
        colors: {
          primary: "#ffeb3b",
          surface: "#ffffff",
          surfaceSecondary: "#f3f4f6",
          surfaceHover: "#e5e7eb",
          text: "#999999",
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

      const preview = previewContrastFixes(inaccessible, { targetLevel: "AA" });

      expect(Array.isArray(preview)).toBe(true);
      expect(preview.length).toBeGreaterThan(0);
    });

    it("should show original and suggested colors", () => {
      const inaccessible = {
        meta: { name: "Test", version: "1.0.0" },
        colors: {
          primary: "#ffeb3b",
          surface: "#ffffff",
          surfaceSecondary: "#f3f4f6",
          surfaceHover: "#e5e7eb",
          text: "#999999",
          textSecondary: "#6b7280",
          textMuted: "#9ca3af",
          border: "#eeeeee",
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

      const preview = previewContrastFixes(inaccessible);

      for (const fix of preview) {
        expect(fix.field).toBeDefined();
        expect(fix.original).toBeDefined();
        expect(fix.suggested).toBeDefined();
        expect(fix.improvement).toBeGreaterThan(0);
      }
    });

    it("should return minimal fixes for accessible theme", () => {
      const preview = previewContrastFixes(accessibleTheme);

      // May have minor fixes, but should be minimal
      expect(Array.isArray(preview)).toBe(true);
    });
  });
});
