/**
 * Tests for Theme Composition Utilities
 */

import { describe, expect, it } from "vitest";
import type {
  SpexopThemeConfig,
  ThemeColors,
  ThemeTypography,
} from "../../types/index.js";
import {
  areThemesCompatible,
  composeThemes,
  createThemeVariant,
  createThemeVariants,
  extendTheme,
  extractTheme,
  mergeThemes,
  omitColors,
  overrideTheme,
  pickColors,
} from "../themeComposition.js";

describe("themeComposition", () => {
  const baseTheme = {
    meta: {
      name: "Base Theme",
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

  describe("mergeThemes", () => {
    it("should merge two themes", () => {
      const theme2: Partial<SpexopThemeConfig> = {
        colors: {
          primary: "#ff0000",
        } as unknown as ThemeColors,
      };

      const merged = mergeThemes([baseTheme, theme2 as SpexopThemeConfig]);

      expect(merged.colors.primary).toBe("#ff0000");
      expect(merged.colors.secondary).toBe(baseTheme.colors.secondary);
    });

    it("should merge multiple themes", () => {
      const theme2: SpexopThemeConfig = {
        ...baseTheme,
        meta: { ...baseTheme.meta, name: "Theme 2" },
        colors: { ...baseTheme.colors, primary: "#ff0000" },
      };
      const theme3: SpexopThemeConfig = {
        ...baseTheme,
        meta: { ...baseTheme.meta, name: "Theme 3" },
        colors: { ...theme2.colors, secondary: "#00ff00" },
      };

      const merged = mergeThemes([baseTheme, theme2, theme3]);

      expect(merged.colors.primary).toBe("#ff0000");
      expect(merged.colors.secondary).toBe("#00ff00");
    });

    it("should handle override strategy", () => {
      const theme2 = {
        ...baseTheme,
        colors: { ...baseTheme.colors, primary: "#ff0000" },
      };

      const merged = mergeThemes([baseTheme, theme2], { strategy: "override" });

      expect(merged.colors.primary).toBe("#ff0000");
    });

    it("should handle first strategy", () => {
      const theme2 = {
        ...baseTheme,
        colors: { ...baseTheme.colors, primary: "#ff0000" },
      };

      const merged = mergeThemes([baseTheme, theme2], { strategy: "first" });

      expect(merged.colors.primary).toBe(baseTheme.colors.primary);
    });

    it("should preserve meta when requested", () => {
      const theme2 = {
        ...baseTheme,
        meta: { name: "Override", version: "2.0.0" },
      };

      const merged = mergeThemes([baseTheme, theme2], { preserveMeta: true });

      expect(merged.meta.name).toBe(baseTheme.meta.name);
      expect(merged.meta.version).toBe(baseTheme.meta.version);
    });

    it("should throw when merging empty array", () => {
      expect(() => mergeThemes([])).toThrow("at least one theme");
    });

    it("should return theme unchanged when merging single theme", () => {
      const merged = mergeThemes([baseTheme]);

      expect(merged).toBe(baseTheme);
    });

    it("should deep merge nested objects", () => {
      const theme2 = {
        ...baseTheme,
        typography: {
          ...baseTheme.typography,
          fontFamily: "Custom Font",
        },
      };

      const merged = mergeThemes([baseTheme, theme2], { strategy: "merge" });

      expect(merged.typography.fontFamily).toBe("Custom Font");
      expect(merged.typography.baseSize).toBe(baseTheme.typography.baseSize);
      expect(merged.typography.scale).toBe(baseTheme.typography.scale);
    });
  });

  describe("extendTheme", () => {
    it("should extend theme with partial overrides", () => {
      const extended = extendTheme(baseTheme, {
        colors: {
          primary: "#ff0000",
        } as unknown as ThemeColors,
      });

      expect(extended.colors.primary).toBe("#ff0000");
      expect(extended.colors.secondary).toBe(baseTheme.colors.secondary);
    });

    it("should preserve base theme properties", () => {
      const extended = extendTheme(baseTheme, {
        colors: {
          primary: "#ff0000",
        } as unknown as ThemeColors,
      });

      expect(extended.meta).toEqual(baseTheme.meta);
      expect(extended.typography).toEqual(baseTheme.typography);
      expect(extended.spacing).toEqual(baseTheme.spacing);
    });

    it("should handle nested overrides", () => {
      const extended = extendTheme(baseTheme, {
        typography: {
          fontFamily: "Custom Font",
          baseSize: 18,
        } as unknown as ThemeTypography,
      });

      expect(extended.typography.fontFamily).toBe("Custom Font");
      expect(extended.typography.baseSize).toBe(18);
      expect(extended.typography.scale).toBe(baseTheme.typography.scale);
    });

    it("should not mutate base theme", () => {
      const originalPrimary = baseTheme.colors.primary;

      extendTheme(baseTheme, {
        colors: {
          primary: "#ff0000",
        } as unknown as ThemeColors,
      });

      expect(baseTheme.colors.primary).toBe(originalPrimary);
    });
  });

  describe("createThemeVariant", () => {
    it("should create dark variant", () => {
      const dark = createThemeVariant(baseTheme, "dark");

      expect(dark.meta.name).toContain("Dark");
      expect(dark.darkMode?.enabled).toBe(true);
      expect(dark.colors.surface).not.toBe(baseTheme.colors.surface);
    });

    it("should create light variant", () => {
      const darkTheme = {
        ...baseTheme,
        meta: { ...baseTheme.meta, name: "Test (Dark)" },
        darkMode: { enabled: true },
      } as SpexopThemeConfig;

      const light = createThemeVariant(darkTheme, "light");

      expect(light.meta.name).not.toContain("Dark");
      expect(light.darkMode).toBeUndefined();
    });

    it("should create high-contrast variant", () => {
      const highContrast = createThemeVariant(baseTheme, "high-contrast");

      expect(highContrast.meta.name).toContain("High Contrast");
      expect(highContrast.colors.text).toBe("#000000");
      expect(highContrast.colors.surface).toBe("#ffffff");
    });

    it("should create low-contrast variant", () => {
      const lowContrast = createThemeVariant(baseTheme, "low-contrast");

      expect(lowContrast.meta.name).toContain("Low Contrast");
      expect(lowContrast.colors.text).not.toBe("#000000");
    });

    it("should accept custom options", () => {
      const dark = createThemeVariant(baseTheme, "dark", {
        intensity: "intense",
      });

      expect(dark.darkMode?.enabled).toBe(true);
    });
  });

  describe("createThemeVariants", () => {
    it("should create multiple variants", () => {
      const variants = createThemeVariants(baseTheme, [
        "dark",
        "high-contrast",
      ]);

      expect(variants.dark).toBeDefined();
      expect(variants.highcontrast).toBeDefined();
    });

    it("should return object with variant keys", () => {
      const variants = createThemeVariants(baseTheme, ["light", "dark"]);

      expect(Object.keys(variants)).toContain("light");
      expect(Object.keys(variants)).toContain("dark");
    });

    it("should handle single variant", () => {
      const variants = createThemeVariants(baseTheme, ["dark"]);

      expect(Object.keys(variants)).toHaveLength(1);
      expect(variants.dark).toBeDefined();
    });

    it("should handle empty array", () => {
      const variants = createThemeVariants(baseTheme, []);

      expect(Object.keys(variants)).toHaveLength(0);
    });
  });

  describe("composeThemes", () => {
    it("should compose theme with overrides", () => {
      const composed = composeThemes({
        base: baseTheme,
        overrides: [
          {
            colors: { primary: "#ff0000" } as unknown as ThemeColors,
          },
        ],
      });

      expect((composed as SpexopThemeConfig).colors.primary).toBe("#ff0000");
    });

    it("should apply multiple overrides in order", () => {
      const composed = composeThemes({
        base: baseTheme,
        overrides: [
          { colors: { primary: "#ff0000" } as unknown as ThemeColors },
          { colors: { primary: "#00ff00" } as unknown as ThemeColors },
        ],
      });

      expect((composed as SpexopThemeConfig).colors.primary).toBe("#00ff00");
    });

    it("should create variants when requested", () => {
      const composed = composeThemes({
        base: baseTheme,
        variants: {
          dark: true,
          highContrast: true,
        },
      });

      expect(
        (composed as Record<string, SpexopThemeConfig>).base,
      ).toBeDefined();
      expect(
        (composed as Record<string, SpexopThemeConfig>).dark,
      ).toBeDefined();
      expect(
        (composed as Record<string, SpexopThemeConfig>).highContrast,
      ).toBeDefined();
    });

    it("should return single theme when no variants", () => {
      const composed = composeThemes({
        base: baseTheme,
      });

      expect((composed as SpexopThemeConfig).meta).toEqual(baseTheme.meta);
    });

    it("should combine overrides and variants", () => {
      const composed = composeThemes({
        base: baseTheme,
        overrides: [
          { colors: { primary: "#ff0000" } as unknown as ThemeColors },
        ],
        variants: {
          dark: true,
        },
      });

      const result = composed as Record<string, SpexopThemeConfig>;
      expect(result.base.colors.primary).toBe("#ff0000");
      expect(result.dark).toBeDefined();
    });
  });

  describe("extractTheme", () => {
    it("should extract specific keys", () => {
      const extracted = extractTheme(baseTheme, ["colors", "typography"]);

      expect(extracted.colors).toBeDefined();
      expect(extracted.typography).toBeDefined();
      expect((extracted as Record<string, unknown>).spacing).toBeUndefined();
    });

    it("should extract single key", () => {
      const extracted = extractTheme(baseTheme, ["colors"]);

      expect(extracted.colors).toBeDefined();
      expect(Object.keys(extracted)).toHaveLength(1);
    });

    it("should handle all keys", () => {
      const extracted = extractTheme(baseTheme, [
        "meta",
        "colors",
        "typography",
        "spacing",
        "borders",
      ]);

      expect(Object.keys(extracted)).toHaveLength(5);
    });
  });

  describe("pickColors", () => {
    it("should pick specific colors", () => {
      const picked = pickColors(baseTheme.colors, ["primary", "secondary"]);

      expect(picked.primary).toBe(baseTheme.colors.primary);
      expect(picked.secondary).toBe(baseTheme.colors.secondary);
      expect((picked as Record<string, unknown>).surface).toBeUndefined();
    });

    it("should handle single color", () => {
      const picked = pickColors(baseTheme.colors, ["primary"]);

      expect(picked.primary).toBe(baseTheme.colors.primary);
      expect(Object.keys(picked)).toHaveLength(1);
    });

    it("should skip undefined colors", () => {
      const picked = pickColors(baseTheme.colors, [
        "primary",
        "accent" as unknown as keyof ThemeColors,
      ]);

      expect(picked.primary).toBe(baseTheme.colors.primary);
      expect((picked as Record<string, unknown>).accent).toBeUndefined();
    });
  });

  describe("omitColors", () => {
    it("should omit specific colors", () => {
      const omitted = omitColors(baseTheme.colors, ["primary", "secondary"]);

      expect((omitted as Record<string, unknown>).primary).toBeUndefined();
      expect((omitted as Record<string, unknown>).secondary).toBeUndefined();
      expect(omitted.surface).toBe(baseTheme.colors.surface);
    });

    it("should omit single color", () => {
      const omitted = omitColors(baseTheme.colors, ["primary"]);

      expect((omitted as Record<string, unknown>).primary).toBeUndefined();
      expect(omitted.secondary).toBe(baseTheme.colors.secondary);
    });

    it("should not mutate original", () => {
      const originalPrimary = baseTheme.colors.primary;

      omitColors(baseTheme.colors, ["primary"]);

      expect(baseTheme.colors.primary).toBe(originalPrimary);
    });
  });

  describe("overrideTheme", () => {
    it("should override nested properties", () => {
      const overridden = overrideTheme(baseTheme, {
        "colors.primary": "#ff0000",
      });

      expect(overridden.colors.primary).toBe("#ff0000");
    });

    it("should override multiple properties", () => {
      const overridden = overrideTheme(baseTheme, {
        "colors.primary": "#ff0000",
        "typography.baseSize": 18,
        "spacing.baseUnit": 8,
      });

      expect(overridden.colors.primary).toBe("#ff0000");
      expect(overridden.typography.baseSize).toBe(18);
      expect(overridden.spacing.baseUnit).toBe(8);
    });

    it("should handle deep nesting", () => {
      const overridden = overrideTheme(baseTheme, {
        "typography.weights.bold": 800,
      });

      expect(overridden.typography.weights.bold).toBe(800);
      expect(overridden.typography.weights.regular).toBe(
        baseTheme.typography.weights.regular,
      );
    });

    it("should not mutate original", () => {
      const originalPrimary = baseTheme.colors.primary;

      overrideTheme(baseTheme, {
        "colors.primary": "#ff0000",
      });

      expect(baseTheme.colors.primary).toBe(originalPrimary);
    });

    it("should create missing nested objects", () => {
      const overridden = overrideTheme(baseTheme, {
        "newProp.nested.value": "test",
      });

      expect(
        (overridden as unknown as Record<string, { nested: { value: string } }>)
          .newProp.nested.value,
      ).toBe("test");
    });
  });

  describe("areThemesCompatible", () => {
    it("should return true for compatible themes", () => {
      const theme2: SpexopThemeConfig = {
        ...baseTheme,
        meta: { name: "Other", version: "1.0.0" },
      };

      expect(areThemesCompatible(baseTheme, theme2)).toBe(true);
    });

    it("should return false for incomplete themes", () => {
      const incomplete = {
        meta: { name: "Test", version: "1.0.0" },
        colors: {},
      } as unknown as SpexopThemeConfig;

      expect(areThemesCompatible(baseTheme, incomplete)).toBe(false);
    });

    it("should require all essential properties", () => {
      const missingTypography = {
        ...baseTheme,
        typography: undefined,
      } as unknown as SpexopThemeConfig;

      expect(areThemesCompatible(baseTheme, missingTypography)).toBe(false);
    });
  });

  describe("integration tests", () => {
    it("should create complete theme system with variants", () => {
      const brandOverride = {
        colors: {
          primary: "#ff6600",
          secondary: "#0066ff",
        } as unknown as ThemeColors,
      };

      const composed = composeThemes({
        base: baseTheme,
        overrides: [brandOverride],
        variants: {
          dark: true,
          highContrast: true,
        },
      });

      const result = composed as Record<string, SpexopThemeConfig>;

      expect(result.base.colors.primary).toBe("#ff6600");
      expect(result.dark).toBeDefined();
      expect(result.highContrast).toBeDefined();
    });

    it("should create theme family from base", () => {
      const variants = createThemeVariants(baseTheme, [
        "light",
        "dark",
        "high-contrast",
        "low-contrast",
      ]);

      expect(Object.keys(variants)).toHaveLength(4);
      expect(variants.light).toBeDefined();
      expect(variants.dark).toBeDefined();
      expect(variants.highcontrast).toBeDefined();
      expect(variants.lowcontrast).toBeDefined();
    });
  });
});
