/**
 * Tests for Color Validation Utilities
 */

import { describe, expect, it } from "vitest";
import {
  isCssKeyword,
  isNamedColor,
  isValidHexColor,
  isValidHslColor,
  isValidRgbColor,
  normalizeColorToHex,
  validateColor,
} from "../colorValidation.js";

describe("colorValidation", () => {
  describe("isValidHexColor", () => {
    it("should validate 6-digit hex colors", () => {
      expect(isValidHexColor("#3b82f6")).toBe(true);
      expect(isValidHexColor("#000000")).toBe(true);
      expect(isValidHexColor("#FFFFFF")).toBe(true);
      expect(isValidHexColor("#abc123")).toBe(true);
    });

    it("should validate 3-digit hex colors", () => {
      expect(isValidHexColor("#fff")).toBe(true);
      expect(isValidHexColor("#000")).toBe(true);
      expect(isValidHexColor("#a1b")).toBe(true);
    });

    it("should reject invalid hex colors", () => {
      expect(isValidHexColor("3b82f6")).toBe(false); // Missing #
      expect(isValidHexColor("#3b82f")).toBe(false); // 5 digits
      expect(isValidHexColor("#gg0000")).toBe(false); // Invalid chars
      expect(isValidHexColor("#3b82f600")).toBe(false); // 8 digits
      expect(isValidHexColor("")).toBe(false);
    });
  });

  describe("isValidRgbColor", () => {
    it("should validate RGB colors", () => {
      expect(isValidRgbColor("rgb(59, 130, 246)")).toBe(true);
      expect(isValidRgbColor("rgb(0, 0, 0)")).toBe(true);
      expect(isValidRgbColor("rgb(255, 255, 255)")).toBe(true);
    });

    it("should validate RGBA colors", () => {
      expect(isValidRgbColor("rgba(59, 130, 246, 0.5)")).toBe(true);
      expect(isValidRgbColor("rgba(0, 0, 0, 1)")).toBe(true);
      expect(isValidRgbColor("rgba(255, 255, 255, 0)")).toBe(true);
    });

    it("should validate modern RGB syntax without commas", () => {
      expect(isValidRgbColor("rgb(59 130 246)")).toBe(true);
      expect(isValidRgbColor("rgb(59 130 246 / 0.5)")).toBe(true);
    });

    it("should reject invalid RGB values", () => {
      expect(isValidRgbColor("rgb(256, 0, 0)")).toBe(false); // > 255
      expect(isValidRgbColor("rgb(-1, 0, 0)")).toBe(false); // < 0
      expect(isValidRgbColor("rgba(0, 0, 0, 1.5)")).toBe(false); // alpha > 1
      expect(isValidRgbColor("rgba(0, 0, 0, -0.1)")).toBe(false); // alpha < 0
      expect(isValidRgbColor("rgb(a, b, c)")).toBe(false); // Non-numeric
    });

    it("should reject malformed RGB strings", () => {
      expect(isValidRgbColor("rgb(59, 130)")).toBe(false); // Missing value
      expect(isValidRgbColor("rgb 59 130 246")).toBe(false); // Missing parens
      expect(isValidRgbColor("")).toBe(false);
    });
  });

  describe("isValidHslColor", () => {
    it("should validate HSL colors", () => {
      expect(isValidHslColor("hsl(217, 91%, 60%)")).toBe(true);
      expect(isValidHslColor("hsl(0, 0%, 0%)")).toBe(true);
      expect(isValidHslColor("hsl(360, 100%, 100%)")).toBe(true);
    });

    it("should validate HSLA colors", () => {
      expect(isValidHslColor("hsla(217, 91%, 60%, 0.5)")).toBe(true);
      expect(isValidHslColor("hsla(0, 0%, 0%, 1)")).toBe(true);
      expect(isValidHslColor("hsla(360, 100%, 100%, 0)")).toBe(true);
    });

    it("should validate modern HSL syntax without commas", () => {
      expect(isValidHslColor("hsl(217 91% 60%)")).toBe(true);
      expect(isValidHslColor("hsl(217 91% 60% / 0.5)")).toBe(true);
    });

    it("should validate decimal values", () => {
      expect(isValidHslColor("hsl(217.5, 91.2%, 60.8%)")).toBe(true);
    });

    it("should reject invalid HSL values", () => {
      expect(isValidHslColor("hsl(361, 0%, 0%)")).toBe(false); // hue > 360
      expect(isValidHslColor("hsl(-1, 0%, 0%)")).toBe(false); // hue < 0
      expect(isValidHslColor("hsl(0, 101%, 0%)")).toBe(false); // saturation > 100
      expect(isValidHslColor("hsl(0, 0%, 101%)")).toBe(false); // lightness > 100
      expect(isValidHslColor("hsla(0, 0%, 0%, 1.5)")).toBe(false); // alpha > 1
    });

    it("should reject missing percent signs", () => {
      expect(isValidHslColor("hsl(217, 91, 60)")).toBe(false);
    });

    it("should reject malformed HSL strings", () => {
      expect(isValidHslColor("hsl(217, 91%)")).toBe(false); // Missing value
      expect(isValidHslColor("hsl 217 91% 60%")).toBe(false); // Missing parens
      expect(isValidHslColor("")).toBe(false);
    });
  });

  describe("isNamedColor", () => {
    it("should recognize common named colors", () => {
      expect(isNamedColor("red")).toBe(true);
      expect(isNamedColor("blue")).toBe(true);
      expect(isNamedColor("green")).toBe(true);
      expect(isNamedColor("white")).toBe(true);
      expect(isNamedColor("black")).toBe(true);
      expect(isNamedColor("transparent")).toBe(true);
    });

    it("should be case-insensitive", () => {
      expect(isNamedColor("RED")).toBe(true);
      expect(isNamedColor("Blue")).toBe(true);
      expect(isNamedColor("GREEN")).toBe(true);
    });

    it("should recognize CSS extended colors", () => {
      expect(isNamedColor("rebeccapurple")).toBe(true);
      expect(isNamedColor("cornflowerblue")).toBe(true);
      expect(isNamedColor("darkslategray")).toBe(true);
    });

    it("should reject invalid color names", () => {
      expect(isNamedColor("notacolor")).toBe(false);
      expect(isNamedColor("ultraviolet")).toBe(false);
      expect(isNamedColor("")).toBe(false);
    });
  });

  describe("isCssKeyword", () => {
    it("should recognize CSS keywords", () => {
      expect(isCssKeyword("transparent")).toBe(true);
      expect(isCssKeyword("currentColor")).toBe(true);
      expect(isCssKeyword("inherit")).toBe(true);
      expect(isCssKeyword("initial")).toBe(true);
      expect(isCssKeyword("unset")).toBe(true);
    });

    it("should be case-insensitive", () => {
      expect(isCssKeyword("TRANSPARENT")).toBe(true);
      expect(isCssKeyword("CurrentColor")).toBe(true);
      expect(isCssKeyword("INHERIT")).toBe(true);
    });

    it("should reject non-keywords", () => {
      expect(isCssKeyword("red")).toBe(false);
      expect(isCssKeyword("#ffffff")).toBe(false);
      expect(isCssKeyword("")).toBe(false);
    });
  });

  describe("validateColor", () => {
    describe("default options (all formats allowed)", () => {
      it("should validate hex colors", () => {
        const result = validateColor("#3b82f6");
        expect(result.valid).toBe(true);
        expect(result.format).toBe("hex");
      });

      it("should validate short hex colors", () => {
        const result = validateColor("#fff");
        expect(result.valid).toBe(true);
        expect(result.format).toBe("hex-short");
      });

      it("should validate RGB colors", () => {
        const result = validateColor("rgb(59, 130, 246)");
        expect(result.valid).toBe(true);
        expect(result.format).toBe("rgb");
      });

      it("should validate RGBA colors", () => {
        const result = validateColor("rgba(59, 130, 246, 0.5)");
        expect(result.valid).toBe(true);
        expect(result.format).toBe("rgba");
      });

      it("should validate HSL colors", () => {
        const result = validateColor("hsl(217, 91%, 60%)");
        expect(result.valid).toBe(true);
        expect(result.format).toBe("hsl");
      });

      it("should validate HSLA colors", () => {
        const result = validateColor("hsla(217, 91%, 60%, 0.5)");
        expect(result.valid).toBe(true);
        expect(result.format).toBe("hsla");
      });

      it("should validate named colors", () => {
        const result = validateColor("blue");
        expect(result.valid).toBe(true);
        expect(result.format).toBe("named");
      });

      it("should validate CSS keywords", () => {
        const result = validateColor("transparent");
        expect(result.valid).toBe(true);
        expect(result.format).toBe("keyword");
      });

      it("should reject invalid colors", () => {
        const result = validateColor("notacolor");
        expect(result.valid).toBe(false);
        expect(result.reason).toBeDefined();
      });

      it("should handle whitespace", () => {
        const result = validateColor("  #3b82f6  ");
        expect(result.valid).toBe(true);
        expect(result.format).toBe("hex");
      });
    });

    describe("with requireFormat option", () => {
      it("should enforce hex format", () => {
        const hexOnly = validateColor("rgb(59, 130, 246)", {
          requireFormat: "hex",
        });
        expect(hexOnly.valid).toBe(false);
        expect(hexOnly.reason).toContain("hex is required");

        const hexValid = validateColor("#3b82f6", { requireFormat: "hex" });
        expect(hexValid.valid).toBe(true);
      });

      it("should enforce RGB format", () => {
        const rgbOnly = validateColor("#3b82f6", { requireFormat: "rgb" });
        expect(rgbOnly.valid).toBe(false);

        const rgbValid = validateColor("rgb(59, 130, 246)", {
          requireFormat: "rgb",
        });
        expect(rgbValid.valid).toBe(true);
      });

      it("should enforce HSL format", () => {
        const hslOnly = validateColor("#3b82f6", { requireFormat: "hsl" });
        expect(hslOnly.valid).toBe(false);

        const hslValid = validateColor("hsl(217, 91%, 60%)", {
          requireFormat: "hsl",
        });
        expect(hslValid.valid).toBe(true);
      });
    });

    describe("with format restrictions", () => {
      it("should reject hex when not allowed", () => {
        const result = validateColor("#3b82f6", { allowHex: false });
        expect(result.valid).toBe(false);
        expect(result.reason).toContain("Hex colors are not allowed");
      });

      it("should reject RGB when not allowed", () => {
        const result = validateColor("rgb(59, 130, 246)", { allowRgb: false });
        expect(result.valid).toBe(false);
        expect(result.reason).toContain("RGB colors are not allowed");
      });

      it("should reject HSL when not allowed", () => {
        const result = validateColor("hsl(217, 91%, 60%)", { allowHsl: false });
        expect(result.valid).toBe(false);
        expect(result.reason).toContain("HSL colors are not allowed");
      });

      it("should reject named colors when not allowed", () => {
        const result = validateColor("blue", { allowNamedColors: false });
        expect(result.valid).toBe(false);
        expect(result.reason).toContain("Named colors are not allowed");
      });

      it("should reject CSS keywords when not allowed", () => {
        const result = validateColor("transparent", {
          allowCssKeywords: false,
        });
        expect(result.valid).toBe(false);
        expect(result.reason).toContain("CSS keywords are not allowed");
      });
    });

    describe("error handling", () => {
      it("should handle empty strings", () => {
        const result = validateColor("");
        expect(result.valid).toBe(false);
        expect(result.reason).toContain("non-empty string");
      });

      it("should handle non-string values", () => {
        // @ts-expect-error Testing invalid input
        const result = validateColor(null);
        expect(result.valid).toBe(false);
      });

      it("should provide helpful error messages", () => {
        const result = validateColor("invalid-color");
        expect(result.valid).toBe(false);
        expect(result.reason).toContain("Invalid color format");
        expect(result.reason).toContain("Expected hex");
      });
    });
  });

  describe("normalizeColorToHex", () => {
    it("should preserve hex colors", () => {
      expect(normalizeColorToHex("#3b82f6")).toBe("#3B82F6");
      expect(normalizeColorToHex("#000000")).toBe("#000000");
    });

    it("should expand short hex colors", () => {
      expect(normalizeColorToHex("#fff")).toBe("#FFFFFF");
      expect(normalizeColorToHex("#abc")).toBe("#AABBCC");
      expect(normalizeColorToHex("#123")).toBe("#112233");
    });

    it("should convert RGB to hex", () => {
      expect(normalizeColorToHex("rgb(59, 130, 246)")).toBe("#3B82F6");
      expect(normalizeColorToHex("rgb(255, 255, 255)")).toBe("#FFFFFF");
      expect(normalizeColorToHex("rgb(0, 0, 0)")).toBe("#000000");
    });

    it("should handle RGBA (ignore alpha)", () => {
      expect(normalizeColorToHex("rgba(59, 130, 246, 0.5)")).toBe("#3B82F6");
    });

    it("should preserve non-convertible formats", () => {
      expect(normalizeColorToHex("hsl(217, 91%, 60%)")).toBe(
        "hsl(217, 91%, 60%)",
      );
      expect(normalizeColorToHex("transparent")).toBe("transparent");
      expect(normalizeColorToHex("blue")).toBe("blue");
    });

    it("should handle modern RGB syntax", () => {
      expect(normalizeColorToHex("rgb(59 130 246)")).toBe("#3B82F6");
    });

    it("should handle whitespace", () => {
      expect(normalizeColorToHex("  #3b82f6  ")).toBe("#3B82F6");
      expect(normalizeColorToHex("  rgb(59, 130, 246)  ")).toBe("#3B82F6");
    });
  });
});
