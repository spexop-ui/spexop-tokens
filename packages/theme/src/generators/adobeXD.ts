/**
 * Adobe XD Tokens Generator
 * Generates Adobe XD compatible token format
 *
 * @module @spexop/theme/generators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

/**
 * Generate Adobe XD tokens
 *
 * @param config - Spexop theme configuration
 * @returns Adobe XD tokens JSON string
 */
export function generateAdobeXD(config: SpexopThemeConfig): string {
  const { spacing, typography } = config;

  const spacingValues = spacing.values || {
    0: 0,
    1: spacing.scale?.[1] || spacing.baseUnit,
    2: spacing.scale?.[2] || spacing.baseUnit * 2,
    3: spacing.scale?.[3] || spacing.baseUnit * 3,
    4: spacing.scale?.[4] || spacing.baseUnit * 4,
    5: spacing.scale?.[5] || spacing.baseUnit * 5,
    6: spacing.scale?.[6] || spacing.baseUnit * 6,
    7: spacing.scale?.[7] || spacing.baseUnit * 7,
    8: spacing.scale?.[8] || spacing.baseUnit * 8,
    9: spacing.scale?.[9] || spacing.baseUnit * 9,
    10: spacing.scale?.[10] || spacing.baseUnit * 10,
  };

  const tokens = {
    version: "1.0",
    name: config.meta.name,
    colors: [
      {
        name: "Primary",
        value: { r: 0, g: 0, b: 0, a: 1 },
        swatchName: "Primary",
        mode: "RGB",
      },
      {
        name: "Surface",
        value: { r: 255, g: 255, b: 255, a: 1 },
        swatchName: "Surface",
        mode: "RGB",
      },
      {
        name: "Text",
        value: { r: 23, g: 23, b: 23, a: 1 },
        swatchName: "Text",
        mode: "RGB",
      },
      {
        name: "Border",
        value: { r: 229, g: 229, b: 229, a: 1 },
        swatchName: "Border",
        mode: "RGB",
      },
    ],
    characterStyles: [
      {
        name: "Body",
        fontFamily: typography.fontFamily
          .split(",")[0]
          .trim()
          .replace(/['"]/g, ""),
        fontSize: typography.baseSize,
        fontWeight: typography.weights.regular,
        lineHeight: typography.lineHeights.normal * typography.baseSize,
      },
      {
        name: "Heading",
        fontFamily: (typography.fontFamilyHeading || typography.fontFamily)
          .split(",")[0]
          .trim()
          .replace(/['"]/g, ""),
        fontSize: Math.round(typography.baseSize * typography.scale ** 2),
        fontWeight: typography.weights.bold,
        lineHeight:
          typography.lineHeights.tight *
          Math.round(typography.baseSize * typography.scale ** 2),
      },
    ],
    spacing: Object.entries(spacingValues).map(([k, v]) => ({
      name: `Spacing ${k}`,
      value: v,
    })),
  };

  return JSON.stringify(tokens, null, 2);
}
