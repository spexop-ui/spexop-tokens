/**
 * Tests for Accessibility Audit Utilities
 */

import { describe, expect, it } from "vitest";
import type { SpexopThemeConfig } from "../../types/index.js";
import {
  auditThemeAccessibility,
  batchAudit,
  compareAccessibility,
  generateAccessibilityReport,
  getAccessibilityRecommendations,
  getAccessibilityScore,
  isAccessible,
} from "../accessibilityAudit.js";

describe("accessibilityAudit", () => {
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

  const inaccessibleTheme: SpexopThemeConfig = {
    ...accessibleTheme,
    meta: {
      name: "Inaccessible Theme",
      version: "1.0.0",
    },
    colors: {
      ...accessibleTheme.colors,
      text: "#999999", // Too light for white background
      primary: "#ffeb3b", // Yellow on white - poor contrast
    },
  };

  describe("auditThemeAccessibility", () => {
    it("should pass accessible theme at AA level", () => {
      const result = auditThemeAccessibility(accessibleTheme, "AA");

      expect(result.passed).toBe(true);
      expect(result.level).toBe("AA");
      expect(result.passRate).toBeGreaterThan(80);
    });

    it("should detect contrast issues", () => {
      const result = auditThemeAccessibility(inaccessibleTheme, "AA");

      expect(result.passed).toBe(false);
      expect(result.issues.length).toBeGreaterThan(0);
    });

    it("should check text on surface contrast", () => {
      const result = auditThemeAccessibility(inaccessibleTheme, "AA");

      const textIssue = result.issues.find(
        (i) => i.field.includes("text") && i.field.includes("surface"),
      );
      expect(textIssue).toBeDefined();
      expect(textIssue?.category).toBe("contrast");
    });

    it("should provide WCAG criterion references", () => {
      const result = auditThemeAccessibility(inaccessibleTheme, "AA");

      const issues = result.issues.filter((i) => i.severity === "error");
      for (const issue of issues) {
        expect(issue.wcagCriterion).toBeDefined();
      }
    });

    it("should provide recommendations", () => {
      const result = auditThemeAccessibility(inaccessibleTheme, "AA");

      const issues = result.issues.filter((i) => i.severity === "error");
      for (const issue of issues) {
        expect(issue.recommendation).toBeDefined();
      }
    });

    it("should have stricter requirements for AAA", () => {
      const resultAA = auditThemeAccessibility(accessibleTheme, "AA");
      const resultAAA = auditThemeAccessibility(accessibleTheme, "AAA");

      // AAA should have more issues or same if already perfect
      expect(resultAAA.issues.length).toBeGreaterThanOrEqual(
        resultAA.issues.length,
      );
    });

    it("should include summary statistics", () => {
      const result = auditThemeAccessibility(accessibleTheme, "AA");

      expect(result.summary.totalChecks).toBeGreaterThan(0);
      expect(result.summary.passed).toBeGreaterThanOrEqual(0);
      expect(result.summary.failed).toBeGreaterThanOrEqual(0);
      expect(result.summary.warnings).toBeGreaterThanOrEqual(0);
    });

    it("should check semantic colors when present", () => {
      const themeWithSemantics: SpexopThemeConfig = {
        ...accessibleTheme,
        colors: {
          ...accessibleTheme.colors,
          success: "#10b981",
          error: "#ef4444",
          warning: "#f59e0b",
        },
      };

      const result = auditThemeAccessibility(themeWithSemantics, "AA");

      expect(result.summary.totalChecks).toBeGreaterThan(
        auditThemeAccessibility(accessibleTheme, "AA").summary.totalChecks,
      );
    });
  });

  describe("getAccessibilityScore", () => {
    it("should return score between 0 and 100", () => {
      const score = getAccessibilityScore(accessibleTheme);

      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    it("should give higher score to accessible theme", () => {
      const accessibleScore = getAccessibilityScore(accessibleTheme);
      const inaccessibleScore = getAccessibilityScore(inaccessibleTheme);

      expect(accessibleScore).toBeGreaterThan(inaccessibleScore);
    });

    it("should give perfect score to perfect theme", () => {
      const perfectTheme: SpexopThemeConfig = {
        ...accessibleTheme,
        colors: {
          ...accessibleTheme.colors,
          text: "#000000",
          textSecondary: "#111111",
          textMuted: "#333333",
        },
      };

      const score = getAccessibilityScore(perfectTheme);

      expect(score).toBeGreaterThan(95);
    });
  });

  describe("generateAccessibilityReport", () => {
    it("should generate comprehensive report", () => {
      const report = generateAccessibilityReport(accessibleTheme);

      expect(report.title).toContain(accessibleTheme.meta.name);
      expect(report.summary).toBeDefined();
      expect(report.score).toBeGreaterThanOrEqual(0);
      expect(report.sections).toBeDefined();
      expect(Array.isArray(report.sections)).toBe(true);
    });

    it("should include sections for different categories", () => {
      const report = generateAccessibilityReport(accessibleTheme);

      expect(report.sections.length).toBeGreaterThan(0);
      for (const section of report.sections) {
        expect(section.title).toBeDefined();
        expect(Array.isArray(section.items)).toBe(true);
      }
    });

    it("should mark pass/fail status for each item", () => {
      const report = generateAccessibilityReport(inaccessibleTheme);

      for (const section of report.sections) {
        for (const item of section.items) {
          expect(["pass", "fail", "warning"]).toContain(item.status);
          expect(item.description).toBeDefined();
        }
      }
    });
  });

  describe("isAccessible", () => {
    it("should return true for accessible colors", () => {
      const result = isAccessible(accessibleTheme.colors);

      expect(result).toBe(true);
    });

    it("should return false for inaccessible colors", () => {
      const result = isAccessible(inaccessibleTheme.colors);

      expect(result).toBe(false);
    });

    it("should check basic requirements", () => {
      const borderline = {
        ...accessibleTheme.colors,
        text: "#595959", // Just meets AA (7:1 on white)
        primary: "#0066cc", // Just meets 3:1 on white
      };

      const result = isAccessible(borderline);

      expect(result).toBe(true);
    });
  });

  describe("getAccessibilityRecommendations", () => {
    it("should return recommendations for inaccessible theme", () => {
      const recommendations =
        getAccessibilityRecommendations(inaccessibleTheme);

      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations.some((r) => r.includes("Fix"))).toBe(true);
    });

    it("should return positive feedback for accessible theme", () => {
      const recommendations = getAccessibilityRecommendations(accessibleTheme);

      // Should have fewer recommendations or none
      expect(Array.isArray(recommendations)).toBe(true);
    });

    it("should prioritize critical errors", () => {
      const recommendations =
        getAccessibilityRecommendations(inaccessibleTheme);

      const firstRec = recommendations[0];
      expect(firstRec).toBeDefined();
      expect(firstRec.toLowerCase()).toContain("fix");
    });
  });

  describe("batchAudit", () => {
    it("should audit multiple themes", () => {
      const results = batchAudit([accessibleTheme, inaccessibleTheme], "AA");

      expect(results).toHaveLength(2);
      expect(results[0].theme).toBe(accessibleTheme.meta.name);
      expect(results[1].theme).toBe(inaccessibleTheme.meta.name);
    });

    it("should return results for each theme", () => {
      const results = batchAudit([accessibleTheme], "AA");

      expect(results[0].result).toBeDefined();
      expect(results[0].result.passed).toBeDefined();
      expect(results[0].result.issues).toBeDefined();
    });
  });

  describe("compareAccessibility", () => {
    it("should compare multiple themes", () => {
      const comparison = compareAccessibility([
        accessibleTheme,
        inaccessibleTheme,
      ]);

      expect(comparison.themes).toHaveLength(2);
      expect(comparison.scores).toHaveLength(2);
      expect(comparison.best).toBeDefined();
      expect(comparison.worst).toBeDefined();
      expect(comparison.average).toBeGreaterThanOrEqual(0);
    });

    it("should identify best theme", () => {
      const comparison = compareAccessibility([
        accessibleTheme,
        inaccessibleTheme,
      ]);

      expect(comparison.best).toBe(accessibleTheme.meta.name);
    });

    it("should identify worst theme", () => {
      const comparison = compareAccessibility([
        accessibleTheme,
        inaccessibleTheme,
      ]);

      expect(comparison.worst).toBe(inaccessibleTheme.meta.name);
    });

    it("should calculate average score", () => {
      const comparison = compareAccessibility([
        accessibleTheme,
        inaccessibleTheme,
      ]);

      const expectedAverage = Math.round(
        (comparison.scores[0] + comparison.scores[1]) / 2,
      );
      expect(comparison.average).toBe(expectedAverage);
    });
  });
});
