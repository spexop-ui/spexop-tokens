/**
 * Tests for JSON Schema Validation
 */

import { describe, expect, it } from "vitest";
import type { SpexopThemeConfig } from "../../types/SpexopThemeConfig.js";
import {
  getThemeSchema,
  validateAgainstSchema,
  validateThemeSchema,
} from "../schema.js";

describe("schema validation", () => {
  const validTheme = {
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

  describe("validateThemeSchema", () => {
    it("should validate valid theme", () => {
      const result = validateThemeSchema(validTheme);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject non-object input", () => {
      const result = validateThemeSchema(null);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].message).toContain("must be an object");
    });

    it("should detect missing required properties", () => {
      const incomplete = {
        meta: { name: "Test", version: "1.0.0" },
        colors: {},
        // Missing typography, spacing, borders
      };

      const result = validateThemeSchema(incomplete);

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.path.includes("typography"))).toBe(
        true,
      );
      expect(result.errors.some((e) => e.path.includes("spacing"))).toBe(true);
      expect(result.errors.some((e) => e.path.includes("borders"))).toBe(true);
    });

    it("should detect missing meta.name", () => {
      const noName = {
        ...validTheme,
        meta: { version: "1.0.0" },
      };

      const result = validateThemeSchema(noName);

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.path === "$.meta.name")).toBe(true);
    });

    it("should detect missing meta.version", () => {
      const noVersion = {
        ...validTheme,
        meta: { name: "Test" },
      };

      const result = validateThemeSchema(noVersion);

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.path === "$.meta.version")).toBe(true);
    });

    it("should detect empty meta.name", () => {
      const emptyName = {
        ...validTheme,
        meta: { name: "", version: "1.0.0" },
      };

      const result = validateThemeSchema(emptyName);

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.path === "$.meta.name")).toBe(true);
    });

    it("should detect missing required colors", () => {
      const missingColors = {
        ...validTheme,
        colors: {
          primary: "#3b82f6",
          // Missing other required colors
        },
      };

      const result = validateThemeSchema(missingColors);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("should detect invalid color types", () => {
      const invalidType = {
        ...validTheme,
        colors: {
          ...validTheme.colors,
          primary: 123, // Should be string
        },
      };

      const result = validateThemeSchema(invalidType);

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.path === "$.colors.primary")).toBe(
        true,
      );
    });

    it("should detect missing typography.fontFamily", () => {
      const noFontFamily = {
        ...validTheme,
        typography: {
          ...validTheme.typography,
          fontFamily: undefined,
        },
      };

      const result = validateThemeSchema(noFontFamily);

      expect(result.valid).toBe(false);
      expect(
        result.errors.some((e) => e.path === "$.typography.fontFamily"),
      ).toBe(true);
    });

    it("should detect invalid typography.baseSize", () => {
      const invalidBaseSize = {
        ...validTheme,
        typography: {
          ...validTheme.typography,
          baseSize: "not a number" as unknown as number,
        },
      };

      const result = validateThemeSchema(invalidBaseSize);

      expect(result.valid).toBe(false);
      expect(
        result.errors.some((e) => e.path === "$.typography.baseSize"),
      ).toBe(true);
    });

    it("should detect out of range typography.baseSize", () => {
      const outOfRange = {
        ...validTheme,
        typography: {
          ...validTheme.typography,
          baseSize: 100, // Too large
        },
      };

      const result = validateThemeSchema(outOfRange);

      expect(result.valid).toBe(false);
      expect(
        result.errors.some((e) => e.path === "$.typography.baseSize"),
      ).toBe(true);
    });

    it("should detect invalid typography.scale", () => {
      const invalidScale = {
        ...validTheme,
        typography: {
          ...validTheme.typography,
          scale: "not a number" as unknown as number,
        },
      };

      const result = validateThemeSchema(invalidScale);

      expect(result.valid).toBe(false);
    });

    it("should detect out of range typography.scale", () => {
      const outOfRange = {
        ...validTheme,
        typography: {
          ...validTheme.typography,
          scale: 2.0, // Too large
        },
      };

      const result = validateThemeSchema(outOfRange);

      expect(result.valid).toBe(false);
    });

    it("should detect missing typography.weights", () => {
      const noWeights = {
        ...validTheme,
        typography: {
          ...validTheme.typography,
          weights: undefined,
        },
      };

      const result = validateThemeSchema(noWeights);

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.path === "$.typography.weights")).toBe(
        true,
      );
    });

    it("should detect invalid spacing.baseUnit", () => {
      const invalidBaseUnit = {
        ...validTheme,
        spacing: {
          ...validTheme.spacing,
          baseUnit: "not a number" as unknown as number,
        },
      };

      const result = validateThemeSchema(invalidBaseUnit);

      expect(result.valid).toBe(false);
    });

    it("should detect out of range spacing.baseUnit", () => {
      const outOfRange = {
        ...validTheme,
        spacing: {
          ...validTheme.spacing,
          baseUnit: 20, // Too large
        },
      };

      const result = validateThemeSchema(outOfRange);

      expect(result.valid).toBe(false);
    });

    it("should detect missing spacing.values", () => {
      const noValues = {
        ...validTheme,
        spacing: {
          baseUnit: 4,
          // Missing values
        },
      };

      const result = validateThemeSchema(noValues);

      expect(result.valid).toBe(false);
    });

    it("should detect invalid borders.default", () => {
      const invalidDefault = {
        ...validTheme,
        borders: {
          ...validTheme.borders,
          default: "not a number" as unknown as number,
        },
      };

      const result = validateThemeSchema(invalidDefault);

      expect(result.valid).toBe(false);
    });

    it("should detect out of range borders.default", () => {
      const outOfRange = {
        ...validTheme,
        borders: {
          ...validTheme.borders,
          default: 20, // Too large
        },
      };

      const result = validateThemeSchema(outOfRange);

      expect(result.valid).toBe(false);
    });

    it("should provide detailed error messages", () => {
      const invalid = {
        meta: { name: "", version: "" },
        colors: {},
        typography: {},
        spacing: {},
        borders: {},
      };

      const result = validateThemeSchema(invalid);

      expect(result.errors.length).toBeGreaterThan(0);

      for (const error of result.errors) {
        expect(error.path).toBeTruthy();
        expect(error.message).toBeTruthy();
      }
    });

    it("should provide expected and received types", () => {
      const invalid = {
        ...validTheme,
        meta: "not an object",
      };

      const result = validateThemeSchema(invalid);

      const metaError = result.errors.find((e) => e.path === "$");
      if (metaError) {
        expect(metaError.expected).toBeTruthy();
        expect(metaError.received).toBeTruthy();
      }
    });
  });

  describe("validateAgainstSchema", () => {
    it("should validate valid theme", () => {
      const result = validateAgainstSchema(validTheme);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should detect schema violations", () => {
      const invalid = {
        ...validTheme,
        typography: {
          ...validTheme.typography,
          baseSize: 100,
        },
      };

      const result = validateAgainstSchema(invalid);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe("getThemeSchema", () => {
    it("should return schema object", () => {
      const schema = getThemeSchema();

      expect(schema).toBeDefined();
      expect(typeof schema).toBe("object");
    });

    it("should include required schema properties", () => {
      const schema = getThemeSchema();

      expect(schema.$schema).toBeDefined();
      expect(schema.title).toBeDefined();
      expect(schema.type).toBe("object");
    });
  });
});
