/**
 * Color Blindness Simulation
 * Simulate color blindness and validate color schemes
 *
 * @module @spexop/theme/utils
 */

import type { SpexopThemeConfig, ThemeColors } from "../types/index.js";
import { type RGB, hexToRgb, rgbToHex } from "./colorManipulation.js";
import { calculateContrastRatio } from "./contrastChecker.js";

/**
 * Types of color blindness
 */
export type ColorBlindnessType =
  | "protanopia" // Red-blind (1% of males)
  | "deuteranopia" // Green-blind (1% of males)
  | "tritanopia" // Blue-blind (rare)
  | "protanomaly" // Red-weak (1% of males)
  | "deuteranomaly" // Green-weak (5% of males)
  | "tritanomaly" // Blue-weak (rare)
  | "achromatopsia" // Complete color blindness (very rare)
  | "achromatomaly"; // Partial color blindness (rare)

/**
 * Simulate color blindness on a color
 *
 * @param color - Color to simulate
 * @param type - Type of color blindness
 * @returns Simulated color as perceived by someone with the condition
 *
 * @example
 * ```typescript
 * const red = "#ff0000";
 * const asSeenByProtanopia = simulateColorBlindness(red, "protanopia");
 * // Returns brownish color (how red appears to protanopes)
 * ```
 */
export function simulateColorBlindness(
  color: string,
  type: ColorBlindnessType,
): string {
  const rgb = hexToRgb(color);

  // Conversion matrices based on Brettel, Viénot and Mollon JPEG algorithm
  let transformed: RGB;

  switch (type) {
    case "protanopia": // Red-blind
      transformed = {
        r: Math.round(0.567 * rgb.r + 0.433 * rgb.g + 0.0 * rgb.b),
        g: Math.round(0.558 * rgb.r + 0.442 * rgb.g + 0.0 * rgb.b),
        b: Math.round(0.0 * rgb.r + 0.242 * rgb.g + 0.758 * rgb.b),
      };
      break;

    case "deuteranopia": // Green-blind
      transformed = {
        r: Math.round(0.625 * rgb.r + 0.375 * rgb.g + 0.0 * rgb.b),
        g: Math.round(0.7 * rgb.r + 0.3 * rgb.g + 0.0 * rgb.b),
        b: Math.round(0.0 * rgb.r + 0.3 * rgb.g + 0.7 * rgb.b),
      };
      break;

    case "tritanopia": // Blue-blind
      transformed = {
        r: Math.round(0.95 * rgb.r + 0.05 * rgb.g + 0.0 * rgb.b),
        g: Math.round(0.0 * rgb.r + 0.433 * rgb.g + 0.567 * rgb.b),
        b: Math.round(0.0 * rgb.r + 0.475 * rgb.g + 0.525 * rgb.b),
      };
      break;

    case "protanomaly": // Red-weak (partial)
      transformed = {
        r: Math.round(0.817 * rgb.r + 0.183 * rgb.g + 0.0 * rgb.b),
        g: Math.round(0.333 * rgb.r + 0.667 * rgb.g + 0.0 * rgb.b),
        b: Math.round(0.0 * rgb.r + 0.125 * rgb.g + 0.875 * rgb.b),
      };
      break;

    case "deuteranomaly": // Green-weak (partial)
      transformed = {
        r: Math.round(0.8 * rgb.r + 0.2 * rgb.g + 0.0 * rgb.b),
        g: Math.round(0.258 * rgb.r + 0.742 * rgb.g + 0.0 * rgb.b),
        b: Math.round(0.0 * rgb.r + 0.142 * rgb.g + 0.858 * rgb.b),
      };
      break;

    case "tritanomaly": // Blue-weak (partial)
      transformed = {
        r: Math.round(0.967 * rgb.r + 0.033 * rgb.g + 0.0 * rgb.b),
        g: Math.round(0.0 * rgb.r + 0.733 * rgb.g + 0.267 * rgb.b),
        b: Math.round(0.0 * rgb.r + 0.183 * rgb.g + 0.817 * rgb.b),
      };
      break;

    case "achromatopsia": // Complete color blindness (grayscale)
      {
        const gray = Math.round(0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b);
        transformed = { r: gray, g: gray, b: gray };
      }
      break;

    case "achromatomaly": // Partial color blindness (reduced saturation)
      {
        const gray = Math.round(0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b);
        transformed = {
          r: Math.round(rgb.r * 0.4 + gray * 0.6),
          g: Math.round(rgb.g * 0.4 + gray * 0.6),
          b: Math.round(rgb.b * 0.4 + gray * 0.6),
        };
      }
      break;

    default:
      transformed = rgb;
  }

  return rgbToHex(transformed.r, transformed.g, transformed.b);
}

/**
 * Simulate color blindness on entire theme
 *
 * @param theme - Theme to simulate
 * @param type - Type of color blindness
 * @returns Theme as perceived by someone with the condition
 */
export function simulateThemeColorBlindness(
  theme: SpexopThemeConfig,
  type: ColorBlindnessType,
): SpexopThemeConfig {
  const simulatedColors: ThemeColors = {} as ThemeColors;

  for (const [key, value] of Object.entries(theme.colors)) {
    if (value && typeof value === "string") {
      simulatedColors[key as keyof ThemeColors] = simulateColorBlindness(
        value,
        type,
      ) as string;
    }
  }

  return {
    ...theme,
    colors: simulatedColors,
  };
}

/**
 * Validate color blindness safety
 *
 * @param colors - Theme colors
 * @param types - Types of color blindness to check
 * @returns Validation result with issues
 */
export function validateColorBlindnessSafety(
  colors: ThemeColors,
  types: ColorBlindnessType[] = ["protanopia", "deuteranopia", "tritanopia"],
): {
  safe: boolean;
  issues: Array<{
    type: ColorBlindnessType;
    issue: string;
    colors: string[];
  }>;
} {
  const issues: Array<{
    type: ColorBlindnessType;
    issue: string;
    colors: string[];
  }> = [];

  for (const type of types) {
    // Simulate theme for this type
    const simulated: Record<string, string> = {};

    for (const [key, value] of Object.entries(colors)) {
      if (value && typeof value === "string") {
        simulated[key] = simulateColorBlindness(value, type);
      }
    }

    // Check if important color distinctions are lost
    const criticalPairs = [
      ["primary", "secondary"],
      ["success", "error"],
      ["success", "warning"],
      ["error", "warning"],
    ];

    for (const [color1Key, color2Key] of criticalPairs) {
      const color1 = colors[color1Key as keyof ThemeColors];
      const color2 = colors[color2Key as keyof ThemeColors];

      if (
        color1 &&
        color2 &&
        typeof color1 === "string" &&
        typeof color2 === "string"
      ) {
        const simColor1 = simulated[color1Key];
        const simColor2 = simulated[color2Key];

        // Check if colors become too similar after simulation
        const originalDifference = calculateContrastRatio(color1, color2);
        const simulatedDifference = calculateContrastRatio(
          simColor1,
          simColor2,
        );

        // If contrast drops significantly, there's an issue
        if (simulatedDifference < 1.5 && originalDifference > 2.0) {
          issues.push({
            type,
            issue: `${color1Key} and ${color2Key} become indistinguishable`,
            colors: [color1Key, color2Key],
          });
        }
      }
    }
  }

  return {
    safe: issues.length === 0,
    issues,
  };
}

/**
 * Get color blindness simulation for all types
 *
 * @param color - Color to simulate
 * @returns Object with all simulation types
 */
export function getAllSimulations(
  color: string,
): Record<ColorBlindnessType, string> {
  const types: ColorBlindnessType[] = [
    "protanopia",
    "deuteranopia",
    "tritanopia",
    "protanomaly",
    "deuteranomaly",
    "tritanomaly",
    "achromatopsia",
    "achromatomaly",
  ];

  const simulations: Record<ColorBlindnessType, string> = {} as Record<
    ColorBlindnessType,
    string
  >;

  for (const type of types) {
    simulations[type] = simulateColorBlindness(color, type);
  }

  return simulations;
}

/**
 * Check if theme is color-blind friendly
 *
 * @param theme - Theme to check
 * @returns True if theme doesn't rely solely on color for differentiation
 */
export function isColorBlindFriendly(theme: SpexopThemeConfig): boolean {
  const validation = validateColorBlindnessSafety(theme.colors);
  return validation.safe;
}

/**
 * Get recommendations for color-blind accessibility
 *
 * @param theme - Theme to analyze
 * @returns Array of recommendations
 */
export function getColorBlindRecommendations(
  theme: SpexopThemeConfig,
): string[] {
  const validation = validateColorBlindnessSafety(theme.colors);
  const recommendations: string[] = [];

  if (!validation.safe) {
    recommendations.push(
      "⚠️ Theme may be difficult for color-blind users to use",
    );

    for (const issue of validation.issues) {
      recommendations.push(
        `  - For ${issue.type}: ${issue.issue}. Add non-color indicators (icons, patterns, text labels).`,
      );
    }

    recommendations.push(
      "✅ Best practice: Never rely on color alone to convey information",
    );
  } else {
    recommendations.push(
      "✅ Theme appears safe for common color blindness types",
    );
    recommendations.push(
      "💡 Consider adding icons or labels for critical actions anyway",
    );
  }

  return recommendations;
}
