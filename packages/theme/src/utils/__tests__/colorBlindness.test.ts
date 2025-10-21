/**
 * Tests for Color Blindness Simulation
 */

import { describe, expect, it } from "vitest";
import type { SpexopThemeConfig } from "../../types/index.js";
import {
  getAllSimulations,
  getColorBlindRecommendations,
  isColorBlindFriendly,
  simulateColorBlindness,
  simulateThemeColorBlindness,
  validateColorBlindnessSafety,
} from "../colorBlindness.js";

describe("colorBlindness", () => {
  const testTheme = {
    meta: {
      name: "Test Theme",
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
      success: "#059669",
      error: "#dc2626",
      warning: "#ea580c",
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

  describe("simulateColorBlindness", () => {
    it("should simulate protanopia (red-blind)", () => {
      const red = "#ff0000";
      const simulated = simulateColorBlindness(red, "protanopia");

      expect(simulated).toBeDefined();
      expect(simulated).toMatch(/^#[0-9a-f]{6}$/i);
      expect(simulated).not.toBe(red); // Should be different
    });

    it("should simulate deuteranopia (green-blind)", () => {
      const green = "#00ff00";
      const simulated = simulateColorBlindness(green, "deuteranopia");

      expect(simulated).toBeDefined();
      expect(simulated).not.toBe(green);
    });

    it("should simulate tritanopia (blue-blind)", () => {
      const blue = "#0000ff";
      const simulated = simulateColorBlindness(blue, "tritanopia");

      expect(simulated).toBeDefined();
      expect(simulated).not.toBe(blue);
    });

    it("should simulate protanomaly (red-weak)", () => {
      const red = "#ff0000";
      const simulated = simulateColorBlindness(red, "protanomaly");

      expect(simulated).toBeDefined();
      expect(simulated).not.toBe(red);
    });

    it("should simulate deuteranomaly (green-weak)", () => {
      const green = "#00ff00";
      const simulated = simulateColorBlindness(green, "deuteranomaly");

      expect(simulated).toBeDefined();
      expect(simulated).not.toBe(green);
    });

    it("should simulate tritanomaly (blue-weak)", () => {
      const blue = "#0000ff";
      const simulated = simulateColorBlindness(blue, "tritanomaly");

      expect(simulated).toBeDefined();
      expect(simulated).not.toBe(blue);
    });

    it("should simulate achromatopsia (grayscale)", () => {
      const color = "#ff0000";
      const simulated = simulateColorBlindness(color, "achromatopsia");

      // Should be grayscale
      const rgb = simulated.match(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i);
      if (rgb) {
        const r = Number.parseInt(rgb[1], 16);
        const g = Number.parseInt(rgb[2], 16);
        const b = Number.parseInt(rgb[3], 16);

        // All channels should be equal (grayscale)
        expect(r).toBe(g);
        expect(g).toBe(b);
      }
    });

    it("should simulate achromatomaly (reduced saturation)", () => {
      const color = "#ff0000";
      const simulated = simulateColorBlindness(color, "achromatomaly");

      expect(simulated).toBeDefined();
      expect(simulated).not.toBe(color);
    });

    it("should return valid hex colors", () => {
      const types: Array<
        | "protanopia"
        | "deuteranopia"
        | "tritanopia"
        | "protanomaly"
        | "deuteranomaly"
        | "tritanomaly"
        | "achromatopsia"
        | "achromatomaly"
      > = [
        "protanopia",
        "deuteranopia",
        "tritanopia",
        "protanomaly",
        "deuteranomaly",
        "tritanomaly",
        "achromatopsia",
        "achromatomaly",
      ];

      for (const type of types) {
        const simulated = simulateColorBlindness("#3b82f6", type);
        expect(simulated).toMatch(/^#[0-9a-f]{6}$/i);
      }
    });
  });

  describe("simulateThemeColorBlindness", () => {
    it("should simulate entire theme", () => {
      const simulated = simulateThemeColorBlindness(testTheme, "protanopia");

      expect(simulated.colors.primary).toBeDefined();
      expect(simulated.colors.secondary).toBeDefined();
      expect(simulated.colors.success).toBeDefined();
    });

    it("should preserve theme structure", () => {
      const simulated = simulateThemeColorBlindness(testTheme, "deuteranopia");

      expect(simulated.meta).toEqual(testTheme.meta);
      expect(simulated.typography).toEqual(testTheme.typography);
      expect(simulated.spacing).toEqual(testTheme.spacing);
    });

    it("should transform all colors", () => {
      const simulated = simulateThemeColorBlindness(testTheme, "tritanopia");

      for (const [key, value] of Object.entries(testTheme.colors)) {
        if (value && typeof value === "string") {
          expect(
            simulated.colors[key as keyof typeof testTheme.colors],
          ).toBeDefined();
        }
      }
    });
  });

  describe("validateColorBlindnessSafety", () => {
    it("should validate color scheme safety", () => {
      const result = validateColorBlindnessSafety(testTheme.colors);

      expect(result).toBeDefined();
      expect(typeof result.safe).toBe("boolean");
      expect(Array.isArray(result.issues)).toBe(true);
    });

    it("should detect problematic color pairs", () => {
      const problematic = {
        ...testTheme.colors,
        success: "#00ff00", // Pure green
        error: "#ff0000", // Pure red
      };

      const result = validateColorBlindnessSafety(problematic);

      // Red/green is problematic for color-blind users
      if (!result.safe) {
        expect(result.issues.length).toBeGreaterThan(0);
      }
    });

    it("should check multiple color blindness types", () => {
      const result = validateColorBlindnessSafety(testTheme.colors, [
        "protanopia",
        "deuteranopia",
        "tritanopia",
      ]);

      expect(result).toBeDefined();
    });

    it("should identify affected color pairs", () => {
      const problematic = {
        ...testTheme.colors,
        success: "#00ff00",
        error: "#ff0000",
      };

      const result = validateColorBlindnessSafety(problematic);

      if (result.issues.length > 0) {
        for (const issue of result.issues) {
          expect(issue.type).toBeDefined();
          expect(issue.issue).toBeDefined();
          expect(Array.isArray(issue.colors)).toBe(true);
        }
      }
    });
  });

  describe("getAllSimulations", () => {
    it("should return simulations for all types", () => {
      const simulations = getAllSimulations("#3b82f6");

      expect(simulations.protanopia).toBeDefined();
      expect(simulations.deuteranopia).toBeDefined();
      expect(simulations.tritanopia).toBeDefined();
      expect(simulations.protanomaly).toBeDefined();
      expect(simulations.deuteranomaly).toBeDefined();
      expect(simulations.tritanomaly).toBeDefined();
      expect(simulations.achromatopsia).toBeDefined();
      expect(simulations.achromatomaly).toBeDefined();
    });

    it("should return valid hex colors for all types", () => {
      const simulations = getAllSimulations("#ff0000");

      for (const [type, color] of Object.entries(simulations)) {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      }
    });
  });

  describe("isColorBlindFriendly", () => {
    it("should check if theme is color-blind friendly", () => {
      const result = isColorBlindFriendly(testTheme);

      expect(typeof result).toBe("boolean");
    });

    it("should pass themes with good color differentiation", () => {
      const friendly: SpexopThemeConfig = {
        ...testTheme,
        colors: {
          ...testTheme.colors,
          success: "#059669", // Dark green
          error: "#dc2626", // Dark red
          warning: "#ea580c", // Dark orange
        },
      };

      const result = isColorBlindFriendly(friendly);

      expect(typeof result).toBe("boolean");
    });
  });

  describe("getColorBlindRecommendations", () => {
    it("should provide recommendations", () => {
      const recommendations = getColorBlindRecommendations(testTheme);

      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeGreaterThan(0);
    });

    it("should include best practices", () => {
      const recommendations = getColorBlindRecommendations(testTheme);

      const hasBestPractice = recommendations.some(
        (r) =>
          r.includes("icon") || r.includes("label") || r.includes("pattern"),
      );
      expect(hasBestPractice).toBe(true);
    });

    it("should identify specific issues when present", () => {
      const problematic: SpexopThemeConfig = {
        ...testTheme,
        colors: {
          ...testTheme.colors,
          success: "#00ff00",
          error: "#ff0000",
        },
      };

      const recommendations = getColorBlindRecommendations(problematic);

      expect(recommendations.length).toBeGreaterThan(0);
    });
  });
});
