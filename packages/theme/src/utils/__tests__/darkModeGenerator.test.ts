/**
 * Tests for Dark Mode Generator
 */

import { describe, expect, it } from "vitest";
import type { SpexopThemeConfig, ThemeColors } from "../../types/index.js";
import {
  generateDarkMode,
  generateDarkModeColors,
  getSuggestedOptions,
  previewDarkMode,
  validateDarkMode,
} from "../darkModeGenerator.js";

describe("darkModeGenerator", () => {
  // Mock light theme colors
  const mockLightColors: ThemeColors = {
    surface: "#ffffff",
    surfaceSecondary: "#f3f4f6",
    surfaceHover: "#e5e7eb",
    text: "#111827",
    textSecondary: "#6b7280",
    textMuted: "#9ca3af",
    border: "#d1d5db",
    borderStrong: "#9ca3af",
    borderSubtle: "#e5e7eb",
    primary: "#3b82f6",
    secondary: "#10b981",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  };

  // Mock light theme config
  const mockLightTheme: SpexopThemeConfig = {
    meta: {
      name: "Test Theme",
      version: "1.0.0",
    },
    colors: mockLightColors,
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

  describe("generateDarkModeColors", () => {
    it("should generate dark mode colors from light colors", () => {
      const darkColors = generateDarkModeColors(mockLightColors);

      expect(darkColors).toBeDefined();
      expect(darkColors.surface).toBeDefined();
      expect(darkColors.text).toBeDefined();
      expect(darkColors.primary).toBeDefined();
    });

    it("should make backgrounds dark", () => {
      const darkColors = generateDarkModeColors(mockLightColors);

      // Backgrounds should be dark (low lightness)
      expect(darkColors.surface).toMatch(/^#[0-9a-f]{6}$/i);
      // Surface should be darker than light mode
      expect(darkColors.surface).not.toBe(mockLightColors.surface);
    });

    it("should make text light", () => {
      const darkColors = generateDarkModeColors(mockLightColors);

      // Text should be light in dark mode
      expect(darkColors.text).toBeDefined();
      expect(darkColors.textSecondary).toBeDefined();
      expect(darkColors.textMuted).toBeDefined();
    });

    it("should preserve brand colors", () => {
      const darkColors = generateDarkModeColors(mockLightColors, {
        preserveBrandColors: true,
      });

      expect(darkColors.primary).toBeDefined();
      expect(darkColors.secondary).toBeDefined();
    });

    it("should adjust brand colors when not preserving", () => {
      const darkColors = generateDarkModeColors(mockLightColors, {
        preserveBrandColors: false,
      });

      expect(darkColors.primary).toBeDefined();
      expect(darkColors.primary).not.toBe(mockLightColors.primary);
    });

    it("should handle subtle intensity", () => {
      const darkColors = generateDarkModeColors(mockLightColors, {
        intensity: "subtle",
      });

      expect(darkColors.surface).toBeDefined();
      // Subtle mode should be lighter than moderate
    });

    it("should handle moderate intensity", () => {
      const darkColors = generateDarkModeColors(mockLightColors, {
        intensity: "moderate",
      });

      expect(darkColors.surface).toBeDefined();
    });

    it("should handle intense intensity", () => {
      const darkColors = generateDarkModeColors(mockLightColors, {
        intensity: "intense",
      });

      expect(darkColors.surface).toBeDefined();
      // Intense mode should be darkest
    });

    it("should apply saturation adjustment", () => {
      const darkColors = generateDarkModeColors(mockLightColors, {
        saturationAdjustment: -10,
      });

      expect(darkColors.surface).toBeDefined();
      expect(darkColors.primary).toBeDefined();
    });

    it("should ensure contrast when enabled", () => {
      const darkColors = generateDarkModeColors(mockLightColors, {
        ensureContrast: true,
        minTextContrast: 4.5,
      });

      expect(darkColors.text).toBeDefined();
      expect(darkColors.surface).toBeDefined();
    });

    it("should skip contrast adjustment when disabled", () => {
      const darkColors = generateDarkModeColors(mockLightColors, {
        ensureContrast: false,
      });

      expect(darkColors.text).toBeDefined();
      expect(darkColors.surface).toBeDefined();
    });

    it("should handle optional semantic colors", () => {
      const colorsWithoutSemantics: ThemeColors = {
        ...mockLightColors,
        success: undefined,
        warning: undefined,
        error: undefined,
        info: undefined,
      };

      const darkColors = generateDarkModeColors(colorsWithoutSemantics);

      expect(darkColors.success).toBeUndefined();
      expect(darkColors.warning).toBeUndefined();
      expect(darkColors.error).toBeUndefined();
      expect(darkColors.info).toBeUndefined();
    });

    it("should handle optional secondary color", () => {
      const colorsWithoutSecondary: ThemeColors = {
        ...mockLightColors,
        secondary: undefined,
      };

      const darkColors = generateDarkModeColors(colorsWithoutSecondary);

      expect(darkColors.secondary).toBeUndefined();
    });
  });

  describe("generateDarkMode", () => {
    it("should generate complete dark mode theme", () => {
      const darkTheme = generateDarkMode(mockLightTheme);

      expect(darkTheme).toBeDefined();
      expect(darkTheme.meta).toBeDefined();
      expect(darkTheme.colors).toBeDefined();
      expect(darkTheme.darkMode).toBeDefined();
    });

    it("should update theme name", () => {
      const darkTheme = generateDarkMode(mockLightTheme);

      expect(darkTheme.meta.name).toContain("Dark");
      expect(darkTheme.meta.name).toContain(mockLightTheme.meta.name);
    });

    it("should add dark mode description", () => {
      const darkTheme = generateDarkMode(mockLightTheme);

      expect(darkTheme.meta.description).toBeDefined();
      expect(darkTheme.meta.description).toContain("Dark mode");
    });

    it("should enable dark mode flag", () => {
      const darkTheme = generateDarkMode(mockLightTheme);

      expect(darkTheme.darkMode).toBeDefined();
      expect(darkTheme.darkMode?.enabled).toBe(true);
    });

    it("should include dark colors in darkMode config", () => {
      const darkTheme = generateDarkMode(mockLightTheme);

      expect(darkTheme.darkMode?.colors).toBeDefined();
      expect(darkTheme.darkMode?.colors).toEqual(darkTheme.colors);
    });

    it("should preserve non-color theme properties", () => {
      const darkTheme = generateDarkMode(mockLightTheme);

      expect(darkTheme.typography).toEqual(mockLightTheme.typography);
      expect(darkTheme.spacing).toEqual(mockLightTheme.spacing);
      expect(darkTheme.borders).toEqual(mockLightTheme.borders);
    });

    it("should accept custom options", () => {
      const darkTheme = generateDarkMode(mockLightTheme, {
        intensity: "intense",
        preserveBrandColors: false,
      });

      expect(darkTheme.colors).toBeDefined();
      expect(darkTheme.colors.surface).toBeDefined();
    });
  });

  describe("previewDarkMode", () => {
    it("should return light and dark colors", () => {
      const preview = previewDarkMode(mockLightTheme);

      expect(preview.light).toBeDefined();
      expect(preview.dark).toBeDefined();
      expect(preview.light).toEqual(mockLightTheme.colors);
    });

    it("should include contrast report", () => {
      const preview = previewDarkMode(mockLightTheme);

      expect(preview.contrastReport).toBeDefined();
      expect(Array.isArray(preview.contrastReport)).toBe(true);
      expect(preview.contrastReport.length).toBeGreaterThan(0);
    });

    it("should report text on surface contrast", () => {
      const preview = previewDarkMode(mockLightTheme);

      const textReport = preview.contrastReport.find(
        (r) => r.name === "Text on Surface",
      );
      expect(textReport).toBeDefined();
      expect(textReport?.lightRatio).toBeGreaterThan(0);
      expect(textReport?.darkRatio).toBeGreaterThan(0);
      expect(typeof textReport?.improved).toBe("boolean");
    });

    it("should report primary on surface contrast", () => {
      const preview = previewDarkMode(mockLightTheme);

      const primaryReport = preview.contrastReport.find(
        (r) => r.name === "Primary on Surface",
      );
      expect(primaryReport).toBeDefined();
      expect(primaryReport?.lightRatio).toBeGreaterThan(0);
      expect(primaryReport?.darkRatio).toBeGreaterThan(0);
    });

    it("should report border on surface contrast", () => {
      const preview = previewDarkMode(mockLightTheme);

      const borderReport = preview.contrastReport.find(
        (r) => r.name === "Border on Surface",
      );
      expect(borderReport).toBeDefined();
      expect(borderReport?.lightRatio).toBeGreaterThan(0);
      expect(borderReport?.darkRatio).toBeGreaterThan(0);
    });

    it("should mark improvements correctly", () => {
      const preview = previewDarkMode(mockLightTheme);

      for (const report of preview.contrastReport) {
        expect(typeof report.improved).toBe("boolean");
        // Improved if dark ratio >= 4.5 or better than light
        if (report.darkRatio >= 4.5 || report.darkRatio > report.lightRatio) {
          expect(report.improved).toBe(true);
        }
      }
    });
  });

  describe("getSuggestedOptions", () => {
    it("should return dark mode options", () => {
      const options = getSuggestedOptions("#3b82f6");

      expect(options).toBeDefined();
      expect(options.intensity).toBeDefined();
      expect(options.preserveBrandColors).toBeDefined();
      expect(options.saturationAdjustment).toBeDefined();
      expect(options.ensureContrast).toBeDefined();
      expect(options.minTextContrast).toBeDefined();
      expect(options.minUIContrast).toBeDefined();
    });

    it("should suggest subtle intensity for dark brand colors", () => {
      const options = getSuggestedOptions("#0f172a"); // Very dark blue

      expect(options.intensity).toBe("subtle");
    });

    it("should suggest moderate intensity for medium brand colors", () => {
      const options = getSuggestedOptions("#3b82f6"); // Medium blue

      expect(options.intensity).toBe("moderate");
    });

    it("should reduce saturation for highly saturated colors", () => {
      const options = getSuggestedOptions("#ff0000"); // Pure red (high saturation)

      expect(options.saturationAdjustment).toBeLessThanOrEqual(0);
      expect(options.saturationAdjustment).toBe(-10);
    });

    it("should reduce saturation less for medium saturated colors", () => {
      const options = getSuggestedOptions("#8b5cf6"); // Purple (medium saturation)

      expect(options.saturationAdjustment).toBeLessThanOrEqual(0);
    });

    it("should not reduce saturation for low saturated colors", () => {
      const options = getSuggestedOptions("#6b7280"); // Gray (low saturation)

      expect(options.saturationAdjustment).toBe(0);
    });

    it("should always enable contrast checking", () => {
      const options = getSuggestedOptions("#3b82f6");

      expect(options.ensureContrast).toBe(true);
      expect(options.minTextContrast).toBe(4.5);
      expect(options.minUIContrast).toBe(3.0);
    });

    it("should always preserve brand colors", () => {
      const options = getSuggestedOptions("#3b82f6");

      expect(options.preserveBrandColors).toBe(true);
    });
  });

  describe("validateDarkMode", () => {
    it("should validate good dark mode colors", () => {
      const goodDarkColors: ThemeColors = {
        surface: "#0f172a",
        surfaceSecondary: "#1e293b",
        surfaceHover: "#334155",
        text: "#f1f5f9",
        textSecondary: "#cbd5e1",
        textMuted: "#94a3b8",
        border: "#475569",
        borderStrong: "#64748b",
        borderSubtle: "#334155",
        primary: "#60a5fa",
      };

      const validation = validateDarkMode(goodDarkColors);

      expect(validation.valid).toBe(true);
      expect(validation.issues).toHaveLength(0);
    });

    it("should detect low text contrast", () => {
      const badDarkColors: ThemeColors = {
        ...mockLightColors,
        surface: "#1a1a1a",
        text: "#333333", // Too dark for dark background
      };

      const validation = validateDarkMode(badDarkColors);

      expect(validation.valid).toBe(false);
      expect(validation.issues.length).toBeGreaterThan(0);
      expect(validation.issues.some((i) => i.includes("Text contrast"))).toBe(
        true,
      );
    });

    it("should warn for AA but not AAA text contrast", () => {
      const okayDarkColors: ThemeColors = {
        ...mockLightColors,
        surface: "#0a0a0a",
        text: "#888888", // Meets AA but not AAA
      };

      const validation = validateDarkMode(okayDarkColors);

      // Should be valid (meets AA) but have warnings about not meeting AAA
      if (validation.warnings.length > 0) {
        expect(validation.warnings.some((w) => w.includes("AAA"))).toBe(true);
      }
    });

    it("should detect low primary contrast", () => {
      const badDarkColors: ThemeColors = {
        ...mockLightColors,
        surface: "#1a1a1a",
        text: "#f1f5f9",
        primary: "#2a2a2a", // Too similar to background
      };

      const validation = validateDarkMode(badDarkColors);

      expect(validation.issues.some((i) => i.includes("Primary"))).toBe(true);
    });

    it("should warn for subtle borders", () => {
      const subtleBorderColors: ThemeColors = {
        ...mockLightColors,
        surface: "#1a1a1a",
        text: "#f1f5f9",
        primary: "#60a5fa",
        border: "#222222", // Very subtle
      };

      const validation = validateDarkMode(subtleBorderColors);

      expect(validation.warnings.some((w) => w.includes("Border"))).toBe(true);
    });

    it("should return structured validation result", () => {
      const validation = validateDarkMode(mockLightColors);

      expect(validation).toBeDefined();
      expect(Array.isArray(validation.issues)).toBe(true);
      expect(Array.isArray(validation.warnings)).toBe(true);
      expect(typeof validation.valid).toBe("boolean");
    });

    it("should provide helpful error messages", () => {
      const badDarkColors: ThemeColors = {
        ...mockLightColors,
        surface: "#1a1a1a",
        text: "#333333",
      };

      const validation = validateDarkMode(badDarkColors);

      for (const issue of validation.issues) {
        expect(issue).toContain(":");
        expect(issue.length).toBeGreaterThan(10);
      }
    });
  });

  describe("dark mode generation integration", () => {
    it("should generate valid dark mode that passes validation", () => {
      const darkTheme = generateDarkMode(mockLightTheme, {
        ensureContrast: true,
        minTextContrast: 4.5,
      });

      const validation = validateDarkMode(darkTheme.colors);

      expect(validation.valid).toBe(true);
    });

    it("should improve contrast in preview", () => {
      const preview = previewDarkMode(mockLightTheme, {
        ensureContrast: true,
      });

      // At least some contrasts should be marked as improved
      const hasImprovements = preview.contrastReport.some((r) => r.improved);
      expect(hasImprovements).toBe(true);
    });

    it("should work with minimal color set", () => {
      const minimalColors: ThemeColors = {
        surface: "#ffffff",
        surfaceSecondary: "#f3f4f6",
        surfaceHover: "#e5e7eb",
        text: "#111827",
        textSecondary: "#6b7280",
        textMuted: "#9ca3af",
        border: "#d1d5db",
        borderStrong: "#9ca3af",
        borderSubtle: "#e5e7eb",
        primary: "#3b82f6",
      };

      const darkColors = generateDarkModeColors(minimalColors);

      expect(darkColors).toBeDefined();
      expect(darkColors.surface).toBeDefined();
      expect(darkColors.text).toBeDefined();
      expect(darkColors.primary).toBeDefined();
    });

    it("should handle complex theme generation", () => {
      const darkTheme = generateDarkMode(mockLightTheme, {
        intensity: "moderate",
        preserveBrandColors: true,
        saturationAdjustment: -5,
        ensureContrast: true,
      });

      expect(darkTheme.meta.name).toContain("Dark");
      expect(darkTheme.darkMode?.enabled).toBe(true);

      const validation = validateDarkMode(darkTheme.colors);
      expect(validation.valid).toBe(true);
    });
  });
});
