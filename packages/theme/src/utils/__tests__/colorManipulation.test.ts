/**
 * Tests for Color Manipulation Utilities
 */

import { describe, expect, it } from "vitest";
import {
  type HSL,
  type RGB,
  adjustHue,
  adjustLightness,
  adjustSaturation,
  complementary,
  darken,
  desaturate,
  generatePalette,
  grayscale,
  hexToHsl,
  hexToRgb,
  hslToHex,
  hslToRgb,
  invert,
  isDark,
  isLight,
  lighten,
  mix,
  rgbToHex,
  rgbToHsl,
  saturate,
} from "../colorManipulation.js";

describe("colorManipulation", () => {
  describe("hexToRgb", () => {
    it("should convert valid hex colors to RGB", () => {
      expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb("#00ff00")).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb("#0000ff")).toEqual({ r: 0, g: 0, b: 255 });
      expect(hexToRgb("#3b82f6")).toEqual({ r: 59, g: 130, b: 246 });
    });

    it("should handle hex colors without # prefix", () => {
      expect(hexToRgb("ffffff")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("3b82f6")).toEqual({ r: 59, g: 130, b: 246 });
    });

    it("should handle uppercase hex colors", () => {
      expect(hexToRgb("#FFFFFF")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("#3B82F6")).toEqual({ r: 59, g: 130, b: 246 });
    });

    it("should throw error for invalid hex colors", () => {
      expect(() => hexToRgb("invalid")).toThrow("Invalid hex color");
      expect(() => hexToRgb("#fff")).toThrow("Invalid hex color");
      expect(() => hexToRgb("#gggggg")).toThrow("Invalid hex color");
    });
  });

  describe("rgbToHex", () => {
    it("should convert RGB to hex", () => {
      expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
      expect(rgbToHex(0, 0, 0)).toBe("#000000");
      expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
      expect(rgbToHex(0, 255, 0)).toBe("#00ff00");
      expect(rgbToHex(0, 0, 255)).toBe("#0000ff");
      expect(rgbToHex(59, 130, 246)).toBe("#3b82f6");
    });

    it("should handle decimal values by rounding", () => {
      expect(rgbToHex(59.4, 130.4, 246.2)).toBe("#3b82f6");
      expect(rgbToHex(255.4, 0.1, 0.4)).toBe("#ff0000");
    });

    it("should pad single digit hex values", () => {
      expect(rgbToHex(1, 2, 3)).toBe("#010203");
      expect(rgbToHex(15, 15, 15)).toBe("#0f0f0f");
    });
  });

  describe("rgbToHsl", () => {
    it("should convert RGB to HSL", () => {
      // White
      expect(rgbToHsl(255, 255, 255)).toEqual({ h: 0, s: 0, l: 100 });

      // Black
      expect(rgbToHsl(0, 0, 0)).toEqual({ h: 0, s: 0, l: 0 });

      // Pure red
      expect(rgbToHsl(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 });

      // Pure green
      const green = rgbToHsl(0, 255, 0);
      expect(green.h).toBeCloseTo(120, 0);
      expect(green.s).toBe(100);
      expect(green.l).toBe(50);

      // Pure blue
      const blue = rgbToHsl(0, 0, 255);
      expect(blue.h).toBeCloseTo(240, 0);
      expect(blue.s).toBe(100);
      expect(blue.l).toBe(50);
    });

    it("should handle gray colors", () => {
      const gray = rgbToHsl(128, 128, 128);
      expect(gray.h).toBe(0);
      expect(gray.s).toBe(0);
      expect(gray.l).toBeCloseTo(50, 0);
    });

    it("should handle various color values", () => {
      const color = rgbToHsl(59, 130, 246);
      expect(color.h).toBeGreaterThan(200);
      expect(color.h).toBeLessThan(230);
      expect(color.s).toBeGreaterThan(80);
      expect(color.l).toBeGreaterThan(50);
      expect(color.l).toBeLessThan(70);
    });
  });

  describe("hslToRgb", () => {
    it("should convert HSL to RGB", () => {
      // White
      expect(hslToRgb(0, 0, 100)).toEqual({ r: 255, g: 255, b: 255 });

      // Black
      expect(hslToRgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 });

      // Pure red
      expect(hslToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 });

      // Pure green
      expect(hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 });

      // Pure blue
      expect(hslToRgb(240, 100, 50)).toEqual({ r: 0, g: 0, b: 255 });
    });

    it("should handle gray colors", () => {
      const gray = hslToRgb(0, 0, 50);
      expect(gray.r).toBeCloseTo(128, 1);
      expect(gray.g).toBeCloseTo(128, 1);
      expect(gray.b).toBeCloseTo(128, 1);
    });

    it("should round trip with rgbToHsl", () => {
      const originalRgb = { r: 59, g: 130, b: 246 };
      const hsl = rgbToHsl(originalRgb.r, originalRgb.g, originalRgb.b);
      const convertedRgb = hslToRgb(hsl.h, hsl.s, hsl.l);

      // Allow rounding differences of up to 1 unit
      expect(Math.abs(convertedRgb.r - originalRgb.r)).toBeLessThanOrEqual(1);
      expect(Math.abs(convertedRgb.g - originalRgb.g)).toBeLessThanOrEqual(1);
      expect(Math.abs(convertedRgb.b - originalRgb.b)).toBeLessThanOrEqual(1);
    });
  });

  describe("hexToHsl", () => {
    it("should convert hex to HSL", () => {
      const white = hexToHsl("#ffffff");
      expect(white.l).toBe(100);

      const black = hexToHsl("#000000");
      expect(black.l).toBe(0);

      const red = hexToHsl("#ff0000");
      expect(red.h).toBe(0);
      expect(red.s).toBe(100);
      expect(red.l).toBe(50);
    });

    it("should handle various colors", () => {
      const blue = hexToHsl("#3b82f6");
      expect(blue.h).toBeGreaterThan(200);
      expect(blue.h).toBeLessThan(230);
      expect(blue.s).toBeGreaterThan(80);
      expect(blue.l).toBeGreaterThan(50);
    });
  });

  describe("hslToHex", () => {
    it("should convert HSL to hex", () => {
      expect(hslToHex(0, 0, 100)).toBe("#ffffff");
      expect(hslToHex(0, 0, 0)).toBe("#000000");
      expect(hslToHex(0, 100, 50)).toBe("#ff0000");
      expect(hslToHex(120, 100, 50)).toBe("#00ff00");
      expect(hslToHex(240, 100, 50)).toBe("#0000ff");
    });

    it("should round trip with hexToHsl", () => {
      const original = "#3b82f6";
      const hsl = hexToHsl(original);
      const converted = hslToHex(hsl.h, hsl.s, hsl.l);

      // Compare RGB values as HSL conversion may have slight differences
      const originalRgb = hexToRgb(original);
      const convertedRgb = hexToRgb(converted);

      // Allow rounding differences of up to 1 unit
      expect(Math.abs(convertedRgb.r - originalRgb.r)).toBeLessThanOrEqual(1);
      expect(Math.abs(convertedRgb.g - originalRgb.g)).toBeLessThanOrEqual(1);
      expect(Math.abs(convertedRgb.b - originalRgb.b)).toBeLessThanOrEqual(1);
    });
  });

  describe("adjustLightness", () => {
    it("should lighten colors", () => {
      const darkBlue = "#1e40af";
      const lightened = adjustLightness(darkBlue, 20);
      const hsl = hexToHsl(lightened);
      const originalHsl = hexToHsl(darkBlue);

      expect(hsl.l).toBeGreaterThan(originalHsl.l);
      expect(hsl.l).toBeCloseTo(originalHsl.l + 20, 0);
    });

    it("should darken colors", () => {
      const lightBlue = "#93c5fd";
      const darkened = adjustLightness(lightBlue, -20);
      const hsl = hexToHsl(darkened);
      const originalHsl = hexToHsl(lightBlue);

      expect(hsl.l).toBeLessThan(originalHsl.l);
      expect(hsl.l).toBeCloseTo(originalHsl.l - 20, 0);
    });

    it("should clamp lightness to 0-100", () => {
      expect(hexToHsl(adjustLightness("#000000", -50)).l).toBe(0);
      expect(hexToHsl(adjustLightness("#ffffff", 50)).l).toBe(100);
    });
  });

  describe("adjustSaturation", () => {
    it("should increase saturation", () => {
      const color = "#808080"; // Gray
      const saturated = adjustSaturation(color, 50);
      const hsl = hexToHsl(saturated);

      expect(hsl.s).toBe(50);
    });

    it("should decrease saturation", () => {
      const color = "#ff0000"; // Pure red
      const desaturated = adjustSaturation(color, -50);
      const hsl = hexToHsl(desaturated);

      expect(hsl.s).toBe(50);
    });

    it("should clamp saturation to 0-100", () => {
      expect(hexToHsl(adjustSaturation("#808080", -50)).s).toBe(0);
      expect(hexToHsl(adjustSaturation("#ff0000", 50)).s).toBe(100);
    });
  });

  describe("adjustHue", () => {
    it("should adjust hue", () => {
      const red = "#ff0000";
      const green = adjustHue(red, 120);
      const blue = adjustHue(red, 240);

      expect(hexToHsl(green).h).toBeCloseTo(120, 0);
      expect(hexToHsl(blue).h).toBeCloseTo(240, 0);
    });

    it("should wrap hue around 360", () => {
      const red = "#ff0000";
      const wrapped = adjustHue(red, 370);
      const expectedHue = (0 + 370) % 360;

      expect(hexToHsl(wrapped).h).toBeCloseTo(expectedHue, 0);
    });

    it("should handle negative hue adjustments", () => {
      const red = "#ff0000";
      const adjusted = adjustHue(red, -60);

      // -60 from 0 wraps to 300
      expect(hexToHsl(adjusted).h).toBeCloseTo(300, 0);
    });
  });

  describe("lighten and darken", () => {
    it("lighten should make color lighter", () => {
      const color = "#3b82f6";
      const lightened = lighten(color, 20);

      expect(hexToHsl(lightened).l).toBeGreaterThan(hexToHsl(color).l);
    });

    it("darken should make color darker", () => {
      const color = "#3b82f6";
      const darkened = darken(color, 20);

      expect(hexToHsl(darkened).l).toBeLessThan(hexToHsl(color).l);
    });
  });

  describe("saturate and desaturate", () => {
    it("saturate should increase saturation", () => {
      const color = "#808080";
      const saturated = saturate(color, 50);

      expect(hexToHsl(saturated).s).toBeGreaterThan(hexToHsl(color).s);
    });

    it("desaturate should decrease saturation", () => {
      const color = "#ff0000";
      const desaturated = desaturate(color, 50);

      expect(hexToHsl(desaturated).s).toBeLessThan(hexToHsl(color).s);
    });
  });

  describe("grayscale", () => {
    it("should convert color to grayscale", () => {
      const color = "#3b82f6";
      const gray = grayscale(color);
      const hsl = hexToHsl(gray);

      expect(hsl.s).toBe(0);
    });

    it("should preserve lightness", () => {
      const color = "#3b82f6";
      const gray = grayscale(color);

      expect(hexToHsl(gray).l).toBeCloseTo(hexToHsl(color).l, 0);
    });

    it("should convert already gray colors unchanged", () => {
      const gray = "#808080";
      const result = grayscale(gray);

      expect(hexToHsl(result).s).toBe(0);
    });
  });

  describe("invert", () => {
    it("should invert colors", () => {
      expect(invert("#ffffff")).toBe("#000000");
      expect(invert("#000000")).toBe("#ffffff");
      expect(invert("#ff0000")).toBe("#00ffff");
      expect(invert("#00ff00")).toBe("#ff00ff");
      expect(invert("#0000ff")).toBe("#ffff00");
    });

    it("should be reversible", () => {
      const color = "#3b82f6";
      const inverted = invert(color);
      const doubleInverted = invert(inverted);

      expect(doubleInverted).toBe(color);
    });
  });

  describe("isLight and isDark", () => {
    it("should identify light colors", () => {
      expect(isLight("#ffffff")).toBe(true);
      expect(isLight("#e5e7eb")).toBe(true);
      expect(isLight("#93c5fd")).toBe(true);
    });

    it("should identify dark colors", () => {
      expect(isDark("#000000")).toBe(true);
      expect(isDark("#111827")).toBe(true);
      expect(isDark("#1e40af")).toBe(true);
    });

    it("should be opposites", () => {
      const colors = ["#ffffff", "#000000", "#3b82f6", "#808080"];

      for (const color of colors) {
        expect(isLight(color)).not.toBe(isDark(color));
      }
    });

    it("should handle colors at 50% lightness boundary", () => {
      // Create a color at exactly 50% lightness
      const mediumColor = hslToHex(0, 100, 50);

      // At 50% lightness, should be considered dark (not light)
      expect(isDark(mediumColor)).toBe(true);
      expect(isLight(mediumColor)).toBe(false);
    });
  });

  describe("mix", () => {
    it("should mix two colors equally", () => {
      const white = "#ffffff";
      const black = "#000000";
      const mixed = mix(white, black, 50);
      const rgb = hexToRgb(mixed);

      // Should be gray
      expect(rgb.r).toBeCloseTo(128, 1);
      expect(rgb.g).toBeCloseTo(128, 1);
      expect(rgb.b).toBeCloseTo(128, 1);
    });

    it("should mix with weight towards first color", () => {
      const red = "#ff0000";
      const blue = "#0000ff";
      const mixed = mix(red, blue, 75); // 75% red, 25% blue
      const rgb = hexToRgb(mixed);

      expect(rgb.r).toBeGreaterThan(rgb.b);
    });

    it("should mix with weight towards second color", () => {
      const red = "#ff0000";
      const blue = "#0000ff";
      const mixed = mix(red, blue, 25); // 25% red, 75% blue
      const rgb = hexToRgb(mixed);

      expect(rgb.b).toBeGreaterThan(rgb.r);
    });

    it("should handle 0% weight (return second color)", () => {
      const red = "#ff0000";
      const blue = "#0000ff";
      const mixed = mix(red, blue, 0);

      expect(mixed).toBe(blue);
    });

    it("should handle 100% weight (return first color)", () => {
      const red = "#ff0000";
      const blue = "#0000ff";
      const mixed = mix(red, blue, 100);

      expect(mixed).toBe(red);
    });

    it("should use 50% weight by default", () => {
      const white = "#ffffff";
      const black = "#000000";
      const mixed = mix(white, black);
      const rgb = hexToRgb(mixed);

      expect(rgb.r).toBeCloseTo(128, 1);
    });
  });

  describe("complementary", () => {
    it("should return complementary color", () => {
      const red = "#ff0000";
      const cyan = complementary(red);

      // Complementary of red (hue 0) is cyan (hue 180)
      expect(hexToHsl(cyan).h).toBeCloseTo(180, 0);
    });

    it("should preserve saturation and lightness", () => {
      const color = "#3b82f6";
      const comp = complementary(color);

      const originalHsl = hexToHsl(color);
      const compHsl = hexToHsl(comp);

      expect(compHsl.s).toBeCloseTo(originalHsl.s, 0);
      expect(compHsl.l).toBeCloseTo(originalHsl.l, 0);
    });

    it("should be reversible", () => {
      const color = "#3b82f6";
      const comp = complementary(color);
      const doubleComp = complementary(comp);

      // Double complementary should return approximately original
      const originalHsl = hexToHsl(color);
      const doubleCompHsl = hexToHsl(doubleComp);

      expect(doubleCompHsl.h).toBeCloseTo(originalHsl.h, 0);
    });
  });

  describe("generatePalette", () => {
    it("should generate default 10-step palette", () => {
      const palette = generatePalette("#3b82f6");

      expect(palette).toHaveLength(10);
    });

    it("should generate custom step palette", () => {
      const palette = generatePalette("#3b82f6", 5);

      expect(palette).toHaveLength(5);
    });

    it("should generate shades from light to dark", () => {
      const palette = generatePalette("#3b82f6");

      // First color should be lighter than last
      expect(hexToHsl(palette[0].color).l).toBeGreaterThan(
        hexToHsl(palette[palette.length - 1].color).l,
      );
    });

    it("should maintain hue and saturation", () => {
      const baseColor = "#3b82f6";
      const palette = generatePalette(baseColor);
      const baseHsl = hexToHsl(baseColor);

      for (const { color } of palette) {
        const hsl = hexToHsl(color);
        // Allow 1 unit difference for rounding
        expect(Math.abs(hsl.h - baseHsl.h)).toBeLessThanOrEqual(1);
        expect(Math.abs(hsl.s - baseHsl.s)).toBeLessThanOrEqual(1);
      }
    });

    it("should generate proper shade numbers", () => {
      const palette = generatePalette("#3b82f6", 9);

      // Should be 50, 100, 200, ... 900
      expect(palette[0].shade).toBe(100);
      expect(palette[palette.length - 1].shade).toBe(900);
    });

    it("should generate descending lightness values", () => {
      const palette = generatePalette("#3b82f6");

      for (let i = 0; i < palette.length - 1; i++) {
        const currentL = hexToHsl(palette[i].color).l;
        const nextL = hexToHsl(palette[i + 1].color).l;
        expect(currentL).toBeGreaterThan(nextL);
      }
    });
  });

  describe("color conversion consistency", () => {
    it("should maintain color through hex -> RGB -> hex", () => {
      const original = "#3b82f6";
      const rgb = hexToRgb(original);
      const converted = rgbToHex(rgb.r, rgb.g, rgb.b);

      expect(converted).toBe(original);
    });

    it("should maintain color through hex -> HSL -> hex", () => {
      const original = "#3b82f6";
      const hsl = hexToHsl(original);
      const converted = hslToHex(hsl.h, hsl.s, hsl.l);

      // Allow rounding differences of up to 1 unit
      const originalRgb = hexToRgb(original);
      const convertedRgb = hexToRgb(converted);

      expect(Math.abs(convertedRgb.r - originalRgb.r)).toBeLessThanOrEqual(1);
      expect(Math.abs(convertedRgb.g - originalRgb.g)).toBeLessThanOrEqual(1);
      expect(Math.abs(convertedRgb.b - originalRgb.b)).toBeLessThanOrEqual(1);
    });

    it("should handle edge case colors", () => {
      const edgeCases = ["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff"];

      for (const color of edgeCases) {
        const rgb = hexToRgb(color);
        const hsl = hexToHsl(color);
        const fromRgb = rgbToHex(rgb.r, rgb.g, rgb.b);
        const fromHsl = hslToHex(hsl.h, hsl.s, hsl.l);

        expect(fromRgb).toBe(color);

        // HSL conversion might have slight rounding differences
        const originalRgb = hexToRgb(color);
        const hslRgb = hexToRgb(fromHsl);

        expect(Math.abs(hslRgb.r - originalRgb.r)).toBeLessThanOrEqual(1);
        expect(Math.abs(hslRgb.g - originalRgb.g)).toBeLessThanOrEqual(1);
        expect(Math.abs(hslRgb.b - originalRgb.b)).toBeLessThanOrEqual(1);
      }
    });
  });
});
