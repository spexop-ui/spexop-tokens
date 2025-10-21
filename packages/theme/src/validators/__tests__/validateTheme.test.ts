/**
 * Tests for Theme Validator
 */

import { describe, expect, it } from "vitest";
import type { SpexopThemeConfig } from "../../types/SpexopThemeConfig.js";
import { validateTheme } from "../validateTheme.js";

describe("validateTheme", () => {
  const validTheme: SpexopThemeConfig = {
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
      thick: 4,
      radiusSubtle: 8,
      radiusRelaxed: 12,
      radiusPill: 9999,
      defaultStyle: "solid",
    },
  };

  describe("meta validation", () => {
    it("should validate valid theme", () => {
      const result = validateTheme(validTheme);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should require theme name", () => {
      const invalidTheme = {
        ...validTheme,
        meta: {
          ...validTheme.meta,
          name: "",
        },
      };

      const result = validateTheme(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: "meta.name",
          severity: "error",
        }),
      );
    });

    it("should require theme version", () => {
      const invalidTheme = {
        ...validTheme,
        meta: {
          ...validTheme.meta,
          version: "",
        },
      };

      const result = validateTheme(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: "meta.version",
          severity: "error",
        }),
      );
    });

    it("should provide enhanced error messages", () => {
      const invalidTheme = {
        ...validTheme,
        meta: {
          name: "",
          version: "",
        },
      };

      const result = validateTheme(invalidTheme);
      const nameError = result.errors.find((e) => e.field === "meta.name");
      expect(nameError?.hint).toBeDefined();
      expect(nameError?.example).toBeDefined();
      expect(nameError?.docsUrl).toBeDefined();
    });
  });

  describe("color validation", () => {
    it("should require all required colors", () => {
      const invalidTheme = {
        ...validTheme,
        colors: {
          primary: "#3b82f6",
          // Missing other required colors
        },
      } as unknown as SpexopThemeConfig;

      const result = validateTheme(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);

      const colorErrors = result.errors.filter((e) =>
        e.field.startsWith("colors."),
      );
      expect(colorErrors.length).toBeGreaterThan(0);
    });

    it("should validate hex color format", () => {
      const result = validateTheme(validTheme);
      expect(result.valid).toBe(true);
    });

    it("should accept RGB color format", () => {
      const rgbTheme = {
        ...validTheme,
        colors: {
          ...validTheme.colors,
          primary: "rgb(59, 130, 246)",
        },
      };

      const result = validateTheme(rgbTheme);
      expect(result.valid).toBe(true);
    });

    it("should accept HSL color format", () => {
      const hslTheme = {
        ...validTheme,
        colors: {
          ...validTheme.colors,
          primary: "hsl(217, 91%, 60%)",
        },
      };

      const result = validateTheme(hslTheme);
      expect(result.valid).toBe(true);
    });

    it("should reject invalid color formats", () => {
      const invalidTheme = {
        ...validTheme,
        colors: {
          ...validTheme.colors,
          primary: "not-a-color",
        },
      };

      const result = validateTheme(invalidTheme);
      expect(result.valid).toBe(false);

      const primaryError = result.errors.find(
        (e) => e.field === "colors.primary",
      );
      expect(primaryError).toBeDefined();
      expect(primaryError?.severity).toBe("error");
      expect(primaryError?.hint).toBeDefined();
      expect(primaryError?.example).toBeDefined();
    });

    it("should provide helpful error for invalid colors", () => {
      const invalidTheme = {
        ...validTheme,
        colors: {
          ...validTheme.colors,
          primary: "invalid",
        },
      };

      const result = validateTheme(invalidTheme);
      const error = result.errors.find((e) => e.field === "colors.primary");
      expect(error?.hint).toContain("Invalid color format");
      expect(error?.example).toContain("hex format");
      expect(error?.example).toContain("RGB format");
      expect(error?.example).toContain("HSL format");
    });
  });

  describe("typography validation", () => {
    it("should require font family", () => {
      const invalidTheme = {
        ...validTheme,
        typography: {
          ...validTheme.typography,
          fontFamily: "",
        },
      };

      const result = validateTheme(invalidTheme);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: "typography.fontFamily",
          severity: "error",
        }),
      );
    });

    it("should warn on base size out of range", () => {
      const smallSize = {
        ...validTheme,
        typography: {
          ...validTheme.typography,
          baseSize: 10,
        },
      };

      const result = validateTheme(smallSize);
      const warning = result.errors.find(
        (e) => e.field === "typography.baseSize",
      );
      expect(warning).toBeDefined();
      expect(warning?.severity).toBe("warning");
      expect(warning?.hint).toBeDefined();
    });

    it("should warn on scale out of range", () => {
      const invalidScale = {
        ...validTheme,
        typography: {
          ...validTheme.typography,
          scale: 1.6,
        },
      };

      const result = validateTheme(invalidScale);
      const warning = result.errors.find((e) => e.field === "typography.scale");
      expect(warning).toBeDefined();
      expect(warning?.severity).toBe("warning");
      expect(warning?.message).toContain("1.6");
    });

    it("should accept valid base size", () => {
      const validSizes = [14, 16, 18];

      for (const size of validSizes) {
        const theme = {
          ...validTheme,
          typography: {
            ...validTheme.typography,
            baseSize: size,
          },
        };

        const result = validateTheme(theme);
        const baseError = result.errors.find(
          (e) => e.field === "typography.baseSize",
        );
        expect(baseError).toBeUndefined();
      }
    });

    it("should accept valid scale", () => {
      const validScales = [1.125, 1.25, 1.333, Math.SQRT2];

      for (const scale of validScales) {
        const theme = {
          ...validTheme,
          typography: {
            ...validTheme.typography,
            scale,
          },
        };

        const result = validateTheme(theme);
        const scaleError = result.errors.find(
          (e) => e.field === "typography.scale",
        );
        expect(scaleError).toBeUndefined();
      }
    });
  });

  describe("spacing validation", () => {
    it("should warn on base unit out of range", () => {
      const invalidUnit = {
        ...validTheme,
        spacing: {
          ...validTheme.spacing,
          baseUnit: 1,
        },
      };

      const result = validateTheme(invalidUnit);
      const warning = result.errors.find((e) => e.field === "spacing.baseUnit");
      expect(warning).toBeDefined();
      expect(warning?.severity).toBe("warning");
      expect(warning?.hint).toBeDefined();
    });

    it("should accept valid base units", () => {
      const validUnits = [4, 8];

      for (const unit of validUnits) {
        const theme = {
          ...validTheme,
          spacing: {
            ...validTheme.spacing,
            baseUnit: unit,
          },
        };

        const result = validateTheme(theme);
        const unitError = result.errors.find(
          (e) => e.field === "spacing.baseUnit",
        );
        expect(unitError).toBeUndefined();
      }
    });
  });

  describe("borders validation", () => {
    it("should warn on border width out of range", () => {
      const invalidBorder = {
        ...validTheme,
        borders: {
          ...validTheme.borders,
          default: 10,
        },
      };

      const result = validateTheme(invalidBorder);
      const warning = result.errors.find((e) => e.field === "borders.default");
      expect(warning).toBeDefined();
      expect(warning?.severity).toBe("warning");
      expect(warning?.hint).toContain("Spexop");
    });

    it("should accept valid border widths", () => {
      const validWidths = [1, 2, 3];

      for (const width of validWidths) {
        const theme = {
          ...validTheme,
          borders: {
            ...validTheme.borders,
            default: width,
          },
        };

        const result = validateTheme(theme);
        const borderError = result.errors.find(
          (e) => e.field === "borders.default",
        );
        expect(borderError).toBeUndefined();
      }
    });
  });

  describe("validation options", () => {
    it("should respect color validation options", () => {
      const rgbTheme = {
        ...validTheme,
        colors: {
          ...validTheme.colors,
          primary: "rgb(59, 130, 246)",
        },
      };

      // Allow RGB
      const allowResult = validateTheme(rgbTheme, {
        colorOptions: { allowRgb: true },
      });
      expect(allowResult.valid).toBe(true);

      // Disallow RGB
      const disallowResult = validateTheme(rgbTheme, {
        colorOptions: { allowRgb: false },
      });
      expect(disallowResult.valid).toBe(false);
    });

    it("should treat warnings as errors in strict mode", () => {
      const warningTheme = {
        ...validTheme,
        typography: {
          ...validTheme.typography,
          baseSize: 10, // Should produce warning
        },
      };

      // Normal mode: warnings don't affect validity
      const normalResult = validateTheme(warningTheme);
      expect(normalResult.valid).toBe(true);
      expect(normalResult.errors.some((e) => e.severity === "warning")).toBe(
        true,
      );

      // Strict mode: warnings become errors
      const strictResult = validateTheme(warningTheme, { strictMode: true });
      expect(strictResult.valid).toBe(false); // Invalid because warnings become errors
      const baseError = strictResult.errors.find(
        (e) => e.field === "typography.baseSize",
      );
      expect(baseError?.severity).toBe("error");
    });
  });

  describe("error message quality", () => {
    it("should provide hints for all errors", () => {
      const invalidTheme = {
        ...validTheme,
        meta: { name: "", version: "" },
        colors: { ...validTheme.colors, primary: "invalid" },
        typography: { ...validTheme.typography, fontFamily: "" },
      } as unknown as SpexopThemeConfig;

      const result = validateTheme(invalidTheme);

      for (const error of result.errors) {
        if (error.severity === "error") {
          expect(error.message).toBeTruthy();
          // Either hint or example should be provided
          expect(error.hint || error.example).toBeTruthy();
        }
      }
    });

    it("should include current values in warning messages", () => {
      const theme = {
        ...validTheme,
        typography: {
          ...validTheme.typography,
          baseSize: 10,
        },
      };

      const result = validateTheme(theme);
      const warning = result.errors.find(
        (e) => e.field === "typography.baseSize",
      );
      expect(warning?.message).toContain("10");
    });

    it("should include documentation URLs", () => {
      const invalidTheme = {
        ...validTheme,
        meta: { ...validTheme.meta, name: "" },
      };

      const result = validateTheme(invalidTheme);
      const metaError = result.errors.find((e) => e.field === "meta.name");
      expect(metaError?.docsUrl).toMatch(/https?:\/\//);
    });
  });

  describe("comprehensive validation", () => {
    it("should collect multiple errors", () => {
      const multipleErrors = {
        meta: { name: "", version: "" },
        colors: {
          primary: "invalid",
          // Missing other colors
        },
        typography: { fontFamily: "", baseSize: 16, scale: 1.25 },
        spacing: { baseUnit: 4, values: {} },
        borders: { default: 2, strong: 3, radius: { sm: 4, md: 8, lg: 12 } },
      } as unknown as SpexopThemeConfig;

      const result = validateTheme(multipleErrors);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(3);
    });

    it("should validate all required fields", () => {
      const result = validateTheme(validTheme);

      // Should not have errors for any required fields
      const requiredFields = [
        "meta.name",
        "meta.version",
        "colors.primary",
        "typography.fontFamily",
      ];

      for (const field of requiredFields) {
        const error = result.errors.find((e) => e.field === field);
        expect(error).toBeUndefined();
      }
    });
  });
});
