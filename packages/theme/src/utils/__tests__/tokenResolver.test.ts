/**
 * Tests for Token Resolver
 */

import { describe, expect, it } from "vitest";
import type { SpexopThemeConfig } from "../../types/SpexopThemeConfig.js";
import {
  findTokenForValue,
  isTokenReference,
  resolveButtonTokens,
  resolveToken,
} from "../tokenResolver.js";

describe("tokenResolver", () => {
  describe("isTokenReference", () => {
    it("should identify valid token references", () => {
      expect(isTokenReference("colors.primary")).toBe(true);
      expect(isTokenReference("typography.baseSize")).toBe(true);
      expect(isTokenReference("spacing.values.4")).toBe(true);
    });

    it("should reject non-reference values", () => {
      expect(isTokenReference("#3b82f6")).toBe(false);
      expect(isTokenReference("rgb(59, 130, 246)")).toBe(false);
      expect(isTokenReference("hsl(217, 91%, 60%)")).toBe(false);
      expect(isTokenReference("transparent")).toBe(false);
      expect(isTokenReference(123)).toBe(false);
    });

    it("should reject values without dots", () => {
      expect(isTokenReference("primary")).toBe(false);
      expect(isTokenReference("red")).toBe(false);
    });
  });

  describe("resolveToken", () => {
    const mockConfig: SpexopThemeConfig = {
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
        // Reference to another color
        accent: "colors.primary",
        // Nested reference
        highlight: "colors.accent",
      },
      typography: {
        fontFamily: "Inter, sans-serif",
        baseSize: 16,
        scale: 1.25,
      },
      spacing: {
        baseUnit: 4,
        values: {
          1: 4,
          2: 8,
          3: 12,
          4: 16,
        },
      },
      borders: {
        default: 2,
        strong: 3,
        radius: {
          sm: 4,
          md: 8,
          lg: 12,
        },
      },
    } as SpexopThemeConfig;

    it("should resolve direct token references", () => {
      expect(resolveToken("colors.primary", mockConfig)).toBe("#3b82f6");
      expect(resolveToken("colors.secondary", mockConfig)).toBe("#10b981");
      expect(resolveToken("typography.baseSize", mockConfig)).toBe(16);
    });

    it("should resolve nested token references", () => {
      expect(resolveToken("colors.accent", mockConfig)).toBe("#3b82f6");
      expect(resolveToken("colors.highlight", mockConfig)).toBe("#3b82f6");
    });

    it("should return literal values unchanged", () => {
      expect(resolveToken("#ff0000", mockConfig)).toBe("#ff0000");
      expect(resolveToken("rgb(255, 0, 0)", mockConfig)).toBe("rgb(255, 0, 0)");
      expect(resolveToken("transparent", mockConfig)).toBe("transparent");
      expect(resolveToken(100, mockConfig)).toBe(100);
    });

    it("should return original reference if token not found", () => {
      expect(resolveToken("colors.nonexistent", mockConfig)).toBe(
        "colors.nonexistent",
      );
      expect(resolveToken("invalid.path", mockConfig)).toBe("invalid.path");
    });

    it("should detect circular references", () => {
      const circularConfig = {
        ...mockConfig,
        colors: {
          ...mockConfig.colors,
          a: "colors.b",
          b: "colors.c",
          c: "colors.a", // Circular!
        },
      } as SpexopThemeConfig;

      expect(() => resolveToken("colors.a", circularConfig)).toThrow(
        /Circular reference detected/,
      );
      expect(() => resolveToken("colors.a", circularConfig)).toThrow(
        /colors\.a → colors\.b → colors\.c → colors\.a/,
      );
    });

    it("should detect direct circular references", () => {
      const directCircular = {
        ...mockConfig,
        colors: {
          ...mockConfig.colors,
          self: "colors.self",
        },
      } as SpexopThemeConfig;

      expect(() => resolveToken("colors.self", directCircular)).toThrow(
        /Circular reference detected/,
      );
    });

    it("should provide helpful error message for circular references", () => {
      const circularConfig = {
        ...mockConfig,
        colors: {
          ...mockConfig.colors,
          x: "colors.y",
          y: "colors.x",
        },
      } as SpexopThemeConfig;

      expect(() => resolveToken("colors.x", circularConfig)).toThrow(
        /tokens that reference each other in a loop/,
      );
      expect(() => resolveToken("colors.x", circularConfig)).toThrow(
        /Example of circular reference/,
      );
    });

    it("should handle deep nested paths", () => {
      expect(resolveToken("spacing.values.4", mockConfig)).toBe(16);
      expect(resolveToken("borders.radius.md", mockConfig)).toBe(8);
    });
  });

  describe("findTokenForValue", () => {
    const mockConfig: SpexopThemeConfig = {
      meta: { name: "Test", version: "1.0.0" },
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
        fontFamily: "Inter",
        baseSize: 16,
        scale: 1.25,
      },
      spacing: {
        baseUnit: 4,
        values: {
          1: 4,
          2: 8,
          3: 12,
        },
      },
      borders: {
        default: 2,
        strong: 3,
        radius: { sm: 4, md: 8, lg: 12 },
      },
    } as SpexopThemeConfig;

    it("should find color tokens", () => {
      expect(findTokenForValue("#3b82f6", mockConfig)).toBe("colors.primary");
      expect(findTokenForValue("#10b981", mockConfig)).toBe("colors.secondary");
    });

    it("should find spacing tokens", () => {
      expect(findTokenForValue(8, mockConfig)).toBe("spacing.values.2");
      expect(findTokenForValue(12, mockConfig)).toBe("spacing.values.3");
    });

    it("should return null for common literals", () => {
      expect(findTokenForValue("transparent", mockConfig)).toBe(null);
      expect(findTokenForValue("#ffffff", mockConfig)).toBe(null);
    });

    it("should return null for values not in theme", () => {
      expect(findTokenForValue("#ff0000", mockConfig)).toBe(null);
      expect(findTokenForValue(999, mockConfig)).toBe(null);
    });
  });

  describe("resolveButtonTokens", () => {
    const mockConfig: SpexopThemeConfig = {
      meta: { name: "Test", version: "1.0.0" },
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
        fontFamily: "Inter",
        baseSize: 16,
        scale: 1.25,
      },
      spacing: {
        baseUnit: 4,
        values: {},
      },
      borders: {
        default: 2,
        strong: 3,
        radius: { sm: 4, md: 8, lg: 12 },
      },
      buttons: {
        primary: {
          background: "colors.primary",
          color: "colors.surface",
          border: "colors.primary",
        },
        secondary: {
          background: "colors.secondary",
          color: "#ffffff",
          border: "colors.secondary",
        },
      },
    } as SpexopThemeConfig;

    it("should resolve button token references", () => {
      const resolved = resolveButtonTokens(mockConfig.buttons, mockConfig);

      expect(resolved?.primary?.background).toBe("#3b82f6");
      expect(resolved?.primary?.color).toBe("#ffffff");
      expect(resolved?.primary?.border).toBe("#3b82f6");
    });

    it("should preserve literal values", () => {
      const resolved = resolveButtonTokens(mockConfig.buttons, mockConfig);

      expect(resolved?.secondary?.color).toBe("#ffffff");
    });

    it("should handle undefined buttons", () => {
      const resolved = resolveButtonTokens(undefined, mockConfig);
      expect(resolved).toBeUndefined();
    });

    it("should handle empty button config", () => {
      const resolved = resolveButtonTokens({}, mockConfig);
      expect(resolved).toEqual({});
    });
  });
});
