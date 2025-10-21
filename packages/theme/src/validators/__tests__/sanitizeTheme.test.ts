/**
 * Tests for Theme Sanitization Utilities
 */

import { describe, expect, it } from "vitest";
import type { SpexopThemeConfig } from "../../types/SpexopThemeConfig.js";
import {
  deepCloneSanitize,
  escapeForDisplay,
  isThemeLike,
  removeDangerousChars,
  sanitizeAndValidate,
  sanitizeTheme,
  sanitizeThemeFromJSON,
} from "../sanitizeTheme.js";

describe("sanitizeTheme", () => {
  const validInput = {
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
      strong: 3,
      thick: 4,
      radiusSubtle: 8,
      radiusRelaxed: 12,
      radiusPill: 9999,
      defaultStyle: "solid" as const,
    },
  };

  describe("sanitizeTheme", () => {
    it("should sanitize valid theme input", () => {
      const result = sanitizeTheme(validInput);

      expect(result).toBeDefined();
      expect(result.meta.name).toBe("Test Theme");
      expect(result.colors.primary).toBe("#3b82f6");
    });

    it("should trim string values", () => {
      const inputWithSpaces = {
        ...validInput,
        meta: {
          name: "  Test Theme  ",
          version: "  1.0.0  ",
        },
        colors: {
          ...validInput.colors,
          primary: "  #3b82f6  ",
        },
      };

      const result = sanitizeTheme(inputWithSpaces);

      expect(result.meta.name).toBe("Test Theme");
      expect(result.meta.version).toBe("1.0.0");
      expect(result.colors.primary).toBe("#3b82f6");
    });

    it("should parse numeric strings", () => {
      const inputWithStrings = {
        ...validInput,
        typography: {
          ...validInput.typography,
          baseSize: "16" as unknown as number,
          scale: "1.25" as unknown as number,
        },
      };

      const result = sanitizeTheme(inputWithStrings);

      expect(result.typography.baseSize).toBe(16);
      expect(result.typography.scale).toBe(1.25);
    });

    it("should remove null values", () => {
      const inputWithNull = {
        ...validInput,
        colors: {
          ...validInput.colors,
          secondary: null as unknown as string,
        },
      };

      const result = sanitizeTheme(inputWithNull);

      expect(result.colors.secondary).toBeUndefined();
    });

    it("should throw on missing required properties", () => {
      expect(() => sanitizeTheme({})).toThrow("meta");
      expect(() =>
        sanitizeTheme({ meta: { name: "Test", version: "1.0.0" } }),
      ).toThrow("colors");
    });

    it("should throw on invalid input type", () => {
      expect(() => sanitizeTheme(null)).toThrow("must be an object");
      expect(() => sanitizeTheme("string")).toThrow("must be an object");
      expect(() => sanitizeTheme(123)).toThrow("must be an object");
    });

    it("should handle optional properties", () => {
      const withOptional = {
        ...validInput,
        meta: {
          ...validInput.meta,
          description: "A test theme",
          author: "Test Author",
        },
      };

      const result = sanitizeTheme(withOptional);

      expect(result.meta.description).toBe("A test theme");
      expect(result.meta.author).toBe("Test Author");
    });

    it("should preserve optional color properties", () => {
      const withOptionalColors = {
        ...validInput,
        colors: {
          ...validInput.colors,
          secondary: "#10b981",
          success: "#059669",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      };

      const result = sanitizeTheme(withOptionalColors);

      expect(result.colors.secondary).toBe("#10b981");
      expect(result.colors.success).toBe("#059669");
      expect(result.colors.warning).toBe("#f59e0b");
      expect(result.colors.error).toBe("#ef4444");
    });

    it("should enforce max string length", () => {
      const longString = "a".repeat(2000);
      const inputWithLongString = {
        ...validInput,
        meta: {
          ...validInput.meta,
          name: longString,
        },
      };

      const result = sanitizeTheme(inputWithLongString, {
        maxStringLength: 100,
      });

      expect(result.meta.name.length).toBe(100);
    });

    it("should reject infinite numbers", () => {
      const inputWithInfinity = {
        ...validInput,
        typography: {
          ...validInput.typography,
          baseSize: Number.POSITIVE_INFINITY,
        },
      };

      expect(() => sanitizeTheme(inputWithInfinity)).toThrow("finite");
    });

    it("should reject NaN numbers", () => {
      const inputWithNaN = {
        ...validInput,
        typography: {
          ...validInput.typography,
          baseSize: Number.NaN,
        },
      };

      expect(() => sanitizeTheme(inputWithNaN)).toThrow("finite");
    });
  });

  describe("sanitizeThemeFromJSON", () => {
    it("should parse and sanitize JSON string", () => {
      const jsonString = JSON.stringify(validInput);
      const result = sanitizeThemeFromJSON(jsonString);

      expect(result).toBeDefined();
      expect(result.meta.name).toBe("Test Theme");
    });

    it("should throw on invalid JSON", () => {
      expect(() => sanitizeThemeFromJSON("not json")).toThrow("Invalid JSON");
      expect(() => sanitizeThemeFromJSON("{invalid}")).toThrow("Invalid JSON");
    });

    it("should handle JSON with whitespace", () => {
      const jsonString = JSON.stringify(validInput, null, 2);
      const result = sanitizeThemeFromJSON(jsonString);

      expect(result).toBeDefined();
    });

    it("should sanitize after parsing", () => {
      const inputWithSpaces = {
        ...validInput,
        meta: {
          name: "  Test  ",
          version: "1.0.0",
        },
      };

      const jsonString = JSON.stringify(inputWithSpaces);
      const result = sanitizeThemeFromJSON(jsonString);

      expect(result.meta.name).toBe("Test");
    });
  });

  describe("deepCloneSanitize", () => {
    it("should create a deep clone", () => {
      const theme = validInput as SpexopThemeConfig;
      const cloned = deepCloneSanitize(theme);

      expect(cloned).toEqual(theme);
      expect(cloned).not.toBe(theme);
      expect(cloned.meta).not.toBe(theme.meta);
      expect(cloned.colors).not.toBe(theme.colors);
    });

    it("should remove prototype pollution", () => {
      const theme = validInput as SpexopThemeConfig;
      const cloned = deepCloneSanitize(theme);

      expect(Object.getPrototypeOf(cloned)).toBe(Object.prototype);
    });

    it("should preserve all theme data", () => {
      const theme = validInput as SpexopThemeConfig;
      const cloned = deepCloneSanitize(theme);

      expect(cloned.meta.name).toBe(theme.meta.name);
      expect(cloned.colors.primary).toBe(theme.colors.primary);
      expect(cloned.typography.baseSize).toBe(theme.typography.baseSize);
    });
  });

  describe("isThemeLike", () => {
    it("should return true for valid theme structure", () => {
      expect(isThemeLike(validInput)).toBe(true);
    });

    it("should return false for non-objects", () => {
      expect(isThemeLike(null)).toBe(false);
      expect(isThemeLike(undefined)).toBe(false);
      expect(isThemeLike("string")).toBe(false);
      expect(isThemeLike(123)).toBe(false);
    });

    it("should return false for objects missing required properties", () => {
      expect(isThemeLike({})).toBe(false);
      expect(isThemeLike({ meta: { name: "Test", version: "1.0.0" } })).toBe(
        false,
      );
      expect(
        isThemeLike({
          meta: { name: "Test", version: "1.0.0" },
          colors: {},
        }),
      ).toBe(false);
    });

    it("should return false for invalid meta structure", () => {
      const invalidMeta = {
        ...validInput,
        meta: {},
      };

      expect(isThemeLike(invalidMeta)).toBe(false);
    });

    it("should return false for invalid colors structure", () => {
      const invalidColors = {
        ...validInput,
        colors: "not an object",
      };

      expect(isThemeLike(invalidColors)).toBe(false);
    });

    it("should return true for theme with optional properties", () => {
      const withOptional = {
        ...validInput,
        radii: {},
        shadows: {},
        darkMode: {},
      };

      expect(isThemeLike(withOptional)).toBe(true);
    });
  });

  describe("sanitizeAndValidate", () => {
    it("should return success for valid input", () => {
      const result = sanitizeAndValidate(validInput);

      expect(result.success).toBe(true);
      expect(result.theme).toBeDefined();
      expect(result.errors).toHaveLength(0);
    });

    it("should return errors for invalid input", () => {
      const result = sanitizeAndValidate({});

      expect(result.success).toBe(false);
      expect(result.theme).toBeUndefined();
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("should include error messages", () => {
      const result = sanitizeAndValidate({ invalid: "data" });

      expect(result.errors.length).toBeGreaterThan(0);
      for (const error of result.errors) {
        expect(typeof error).toBe("string");
        expect(error.length).toBeGreaterThan(0);
      }
    });

    it("should sanitize on success", () => {
      const inputWithSpaces = {
        ...validInput,
        meta: {
          name: "  Test  ",
          version: "1.0.0",
        },
      };

      const result = sanitizeAndValidate(inputWithSpaces);

      expect(result.success).toBe(true);
      expect(result.theme?.meta.name).toBe("Test");
    });
  });

  describe("removeDangerousChars", () => {
    it("should remove control characters", () => {
      const input = "Normal\x00text\x01with\x1Fcontrols";
      const result = removeDangerousChars(input);

      expect(result).toBe("Normaltextwithcontrols");
    });

    it("should preserve safe characters", () => {
      const input = "Normal text with spaces and symbols: @#$%";
      const result = removeDangerousChars(input);

      expect(result).toBe(input);
    });

    it("should preserve newlines and tabs", () => {
      const input = "Line 1\nLine 2\tTabbed";
      const result = removeDangerousChars(input);

      expect(result).toBe(input);
    });
  });

  describe("escapeForDisplay", () => {
    it("should escape HTML special characters", () => {
      expect(escapeForDisplay("<script>")).toBe("&lt;script&gt;");
      expect(escapeForDisplay("a & b")).toBe("a &amp; b");
      expect(escapeForDisplay('"quoted"')).toBe("&quot;quoted&quot;");
      expect(escapeForDisplay("'quoted'")).toBe("&#x27;quoted&#x27;");
    });

    it("should escape forward slashes", () => {
      expect(escapeForDisplay("path/to/file")).toBe("path&#x2F;to&#x2F;file");
    });

    it("should handle multiple special characters", () => {
      const input =
        "<div class=\"test\" data-value='value'>Content & more</div>";
      const result = escapeForDisplay(input);

      expect(result).toContain("&lt;");
      expect(result).toContain("&gt;");
      expect(result).toContain("&amp;");
      expect(result).toContain("&quot;");
      expect(result).toContain("&#x27;");
      expect(result).toContain("&#x2F;");
      // Should not contain raw special characters
      expect(result).not.toMatch(/[<>]/);
      expect(result).not.toMatch(/(?<!&)(?:&(?![a-z]+;|#x[0-9a-f]+;))/i);
    });

    it("should preserve safe text", () => {
      const input = "Normal text 123";
      const result = escapeForDisplay(input);

      expect(result).toBe(input);
    });
  });

  describe("sanitization options", () => {
    it("should respect trimStrings option", () => {
      const inputWithSpaces = {
        ...validInput,
        meta: {
          name: "  Test  ",
          version: "1.0.0",
        },
      };

      const withTrim = sanitizeTheme(inputWithSpaces, { trimStrings: true });
      expect(withTrim.meta.name).toBe("Test");

      const withoutTrim = sanitizeTheme(inputWithSpaces, {
        trimStrings: false,
      });
      expect(withoutTrim.meta.name).toBe("  Test  ");
    });

    it("should respect parseNumbers option", () => {
      const inputWithStringNumbers = {
        ...validInput,
        typography: {
          ...validInput.typography,
          baseSize: "16" as unknown as number,
        },
      };

      const withParse = sanitizeTheme(inputWithStringNumbers, {
        parseNumbers: true,
      });
      expect(withParse.typography.baseSize).toBe(16);

      expect(() =>
        sanitizeTheme(inputWithStringNumbers, { parseNumbers: false }),
      ).toThrow("Expected number");
    });

    it("should respect maxStringLength option", () => {
      const inputWithLongString = {
        ...validInput,
        meta: {
          ...validInput.meta,
          name: "a".repeat(500),
        },
      };

      const result = sanitizeTheme(inputWithLongString, {
        maxStringLength: 50,
      });

      expect(result.meta.name.length).toBe(50);
    });

    it("should respect removeNullish option", () => {
      const inputWithNull = {
        ...validInput,
        colors: {
          ...validInput.colors,
          secondary: null as unknown as string,
        },
      };

      const withRemove = sanitizeTheme(inputWithNull, { removeNullish: true });
      expect(withRemove.colors.secondary).toBeUndefined();
    });
  });

  describe("error handling", () => {
    it("should throw on invalid colors structure", () => {
      const invalidColors = {
        ...validInput,
        colors: "not an object",
      };

      expect(() => sanitizeTheme(invalidColors)).toThrow("Colors must be");
    });

    it("should throw on invalid typography structure", () => {
      const invalidTypography = {
        ...validInput,
        typography: "not an object",
      };

      expect(() => sanitizeTheme(invalidTypography)).toThrow(
        "Typography must be",
      );
    });

    it("should throw on invalid spacing structure", () => {
      const invalidSpacing = {
        ...validInput,
        spacing: "not an object",
      };

      expect(() => sanitizeTheme(invalidSpacing)).toThrow("Spacing must be");
    });

    it("should throw on invalid borders structure", () => {
      const invalidBorders = {
        ...validInput,
        borders: "not an object",
      };

      expect(() => sanitizeTheme(invalidBorders)).toThrow("Borders must be");
    });

    it("should provide helpful error messages", () => {
      try {
        sanitizeTheme({ meta: "invalid" });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBeTruthy();
      }
    });
  });

  describe("complex scenarios", () => {
    it("should handle theme with all optional properties", () => {
      const fullTheme = {
        ...validInput,
        radii: { sm: 4, md: 8, lg: 12 },
        shadows: { sm: "0 1px 2px", md: "0 2px 4px" },
        zIndex: { modal: 1000, tooltip: 2000 },
        buttons: { primary: { background: "#3b82f6" } },
        cards: { default: { background: "#ffffff" } },
        darkMode: { enabled: true },
      };

      const result = sanitizeTheme(fullTheme);

      expect(result.radii).toBeDefined();
      expect(result.shadows).toBeDefined();
      expect(result.zIndex).toBeDefined();
      expect(result.buttons).toBeDefined();
      expect(result.cards).toBeDefined();
      expect(result.darkMode).toBeDefined();
    });

    it("should handle minimal theme", () => {
      const result = sanitizeTheme(validInput);

      expect(result.meta).toBeDefined();
      expect(result.colors).toBeDefined();
      expect(result.typography).toBeDefined();
      expect(result.spacing).toBeDefined();
      expect(result.borders).toBeDefined();
    });

    it("should handle theme with extra spacing values", () => {
      const withSpacing = {
        ...validInput,
        spacing: {
          baseUnit: 4,
          values: {
            1: 4,
            2: 8,
            3: 12,
            4: 16,
          },
        },
      };

      const result = sanitizeTheme(withSpacing);

      expect(result.spacing.values).toBeDefined();
      expect(result.spacing.values).toEqual(withSpacing.spacing.values);
    });
  });
});
