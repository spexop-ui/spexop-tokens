/**
 * Tests for Contrast Checker Utilities
 */

import { describe, expect, it } from "vitest";
import {
  ContrastLevel,
  calculateContrastRatio,
  checkContrast,
  checkMultipleContrasts,
  generateContrastMatrix,
  getAccessibleTextColor,
  getContrastDescription,
  meetsMinimumContrast,
  suggestContrastFix,
} from "../contrastChecker.js";

describe("contrastChecker", () => {
  describe("calculateContrastRatio", () => {
    it("should calculate ratio for black on white", () => {
      const ratio = calculateContrastRatio("#000000", "#ffffff");
      expect(ratio).toBeCloseTo(21, 1);
    });

    it("should calculate ratio for white on black", () => {
      const ratio = calculateContrastRatio("#ffffff", "#000000");
      expect(ratio).toBeCloseTo(21, 1);
    });

    it("should calculate ratio for same colors", () => {
      const ratio = calculateContrastRatio("#3b82f6", "#3b82f6");
      expect(ratio).toBe(1);
    });

    it("should handle various color combinations", () => {
      // Blue on white
      const blueOnWhite = calculateContrastRatio("#3b82f6", "#ffffff");
      expect(blueOnWhite).toBeGreaterThan(3);
      expect(blueOnWhite).toBeLessThan(10);

      // Dark text on light background
      const darkOnLight = calculateContrastRatio("#111827", "#f3f4f6");
      expect(darkOnLight).toBeGreaterThan(10);
    });

    it("should be symmetric", () => {
      const ratio1 = calculateContrastRatio("#3b82f6", "#ffffff");
      const ratio2 = calculateContrastRatio("#ffffff", "#3b82f6");
      expect(ratio1).toBeCloseTo(ratio2, 2);
    });
  });

  describe("meetsMinimumContrast", () => {
    it("should check AAA level for normal text", () => {
      expect(
        meetsMinimumContrast("#000000", "#ffffff", ContrastLevel.AAA, false),
      ).toBe(true);
      expect(
        meetsMinimumContrast("#777777", "#ffffff", ContrastLevel.AAA, false),
      ).toBe(false);
    });

    it("should check AA level for normal text", () => {
      expect(
        meetsMinimumContrast("#000000", "#ffffff", ContrastLevel.AA, false),
      ).toBe(true);
      expect(
        meetsMinimumContrast("#595959", "#ffffff", ContrastLevel.AA, false),
      ).toBe(true);
    });

    it("should have lower requirements for large text", () => {
      // This combination might fail for normal text but pass for large
      expect(
        meetsMinimumContrast("#777777", "#ffffff", ContrastLevel.AA, false),
      ).toBe(false);
      expect(
        meetsMinimumContrast("#777777", "#ffffff", ContrastLevel.AA, true),
      ).toBe(true);
    });

    it("should check enhanced level", () => {
      expect(
        meetsMinimumContrast(
          "#000000",
          "#ffffff",
          ContrastLevel.ENHANCED,
          false,
        ),
      ).toBe(true);
      expect(
        meetsMinimumContrast(
          "#555555",
          "#ffffff",
          ContrastLevel.ENHANCED,
          false,
        ),
      ).toBe(false);
    });
  });

  describe("checkContrast", () => {
    it("should return full contrast result", () => {
      const result = checkContrast("#000000", "#ffffff");

      expect(result.ratio).toBeCloseTo(21, 1);
      expect(result.AAA).toBe(true);
      expect(result.AA).toBe(true);
      expect(result.AAALarge).toBe(true);
      expect(result.AALarge).toBe(true);
    });

    it("should fail all levels for same color", () => {
      const result = checkContrast("#3b82f6", "#3b82f6");

      expect(result.ratio).toBe(1);
      expect(result.AAA).toBe(false);
      expect(result.AA).toBe(false);
      expect(result.AAALarge).toBe(false);
      expect(result.AALarge).toBe(false);
    });

    it("should check medium contrast", () => {
      const result = checkContrast("#767676", "#ffffff");

      expect(result.AA).toBe(true);
      expect(result.AAA).toBe(false);
      expect(result.AALarge).toBe(true);
      expect(result.AAALarge).toBe(true);
    });
  });

  describe("getContrastDescription", () => {
    it("should describe excellent contrast", () => {
      const description = getContrastDescription(21);
      expect(description.toLowerCase()).toContain("excellent");
    });

    it("should describe good contrast", () => {
      const description = getContrastDescription(7);
      expect(description.toLowerCase()).toContain("good");
    });

    it("should describe acceptable contrast", () => {
      const description = getContrastDescription(4.5);
      expect(description.toLowerCase()).toContain("acceptable");
    });

    it("should describe poor contrast", () => {
      const description = getContrastDescription(3);
      expect(description.toLowerCase()).toContain("poor");
    });

    it("should describe failing contrast", () => {
      const description = getContrastDescription(2);
      expect(description.toLowerCase()).toContain("fail");
    });
  });

  describe("getAccessibleTextColor", () => {
    it("should return white for dark backgrounds", () => {
      expect(getAccessibleTextColor("#000000")).toBe("#ffffff");
      expect(getAccessibleTextColor("#111827")).toBe("#ffffff");
      expect(getAccessibleTextColor("#1e40af")).toBe("#ffffff");
    });

    it("should return black for light backgrounds", () => {
      expect(getAccessibleTextColor("#ffffff")).toBe("#000000");
      expect(getAccessibleTextColor("#f3f4f6")).toBe("#000000");
      expect(getAccessibleTextColor("#dbeafe")).toBe("#000000");
    });

    it("should handle custom text colors", () => {
      const darkText = "#1a1a1a";
      const lightText = "#f5f5f5";

      expect(getAccessibleTextColor("#ffffff", darkText, lightText)).toBe(
        darkText,
      );
      expect(getAccessibleTextColor("#000000", darkText, lightText)).toBe(
        lightText,
      );
    });

    it("should respect minimum ratio", () => {
      const result = getAccessibleTextColor("#1e40af", "#000000", "#ffffff", 7);
      expect(result).toBe("#ffffff");

      const ratio = calculateContrastRatio(result, "#1e40af");
      expect(ratio).toBeGreaterThanOrEqual(7);
    });
  });

  describe("suggestContrastFix", () => {
    it("should suggest lightening dark text on dark background", () => {
      const suggestion = suggestContrastFix("#333333", "#000000");
      expect(suggestion).toBeDefined();
      expect(suggestion).toContain("Lighten");
    });

    it("should suggest darkening light text on light background", () => {
      const suggestion = suggestContrastFix("#cccccc", "#ffffff");
      expect(suggestion).toBeDefined();
      expect(suggestion).toContain("Darken");
    });

    it("should return null for accessible combinations", () => {
      const suggestion = suggestContrastFix("#000000", "#ffffff");
      expect(suggestion).toBeNull();
    });

    it("should suggest using white on dark backgrounds", () => {
      const suggestion = suggestContrastFix("#595959", "#111827");
      expect(suggestion).toBeDefined();
      expect(suggestion?.toLowerCase()).toContain("white");
    });

    it("should suggest using black on light backgrounds", () => {
      const suggestion = suggestContrastFix("#999999", "#f3f4f6");
      expect(suggestion).toBeDefined();
      expect(suggestion?.toLowerCase()).toContain("black");
    });
  });

  describe("checkMultipleContrasts", () => {
    it("should check multiple color combinations", () => {
      const results = checkMultipleContrasts([
        { foreground: "#000000", background: "#ffffff" },
        { foreground: "#ffffff", background: "#000000" },
        { foreground: "#1e40af", background: "#ffffff" },
      ]);

      expect(results).toHaveLength(3);
      expect(results[0].combination.foreground).toBe("#000000");
      expect(results[0].result.AAA).toBe(true);
      expect(results[1].result.AAA).toBe(true);
      expect(results[2].result.AA).toBe(true);
    });

    it("should handle empty array", () => {
      const results = checkMultipleContrasts([]);
      expect(results).toHaveLength(0);
    });
  });

  describe("generateContrastMatrix", () => {
    it("should generate full matrix", () => {
      const colors = ["#000000", "#ffffff", "#3b82f6"];
      const matrix = generateContrastMatrix(colors);

      // Should have n x n entries
      expect(Object.keys(matrix)).toHaveLength(3);
      for (const key of Object.keys(matrix)) {
        expect(Object.keys(matrix[key])).toHaveLength(3);
      }
    });

    it("should have symmetric ratios", () => {
      const colors = ["#000000", "#ffffff"];
      const matrix = generateContrastMatrix(colors);

      expect(matrix["#000000"]["#ffffff"].ratio).toBeCloseTo(
        matrix["#ffffff"]["#000000"].ratio,
        2,
      );
    });

    it("should calculate all combinations", () => {
      const colors = ["#000000", "#ffffff", "#3b82f6", "#10b981"];
      const matrix = generateContrastMatrix(colors);

      // Verify a few combinations
      expect(matrix["#000000"]["#ffffff"].AAA).toBe(true);
      expect(matrix["#000000"]["#000000"].ratio).toBe(1);
      expect(matrix["#3b82f6"]["#ffffff"].ratio).toBeGreaterThan(1);
    });

    it("should handle single color", () => {
      const matrix = generateContrastMatrix(["#000000"]);
      expect(Object.keys(matrix)).toHaveLength(1);
      expect(matrix["#000000"]["#000000"].ratio).toBe(1);
    });
  });
});
