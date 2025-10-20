/**
 * Figma Tokens Generator
 * Generates Figma Variables API compatible JSON
 *
 * @module @spexop/theme/generators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

/**
 * Figma Variable Type
 */
type FigmaVariableType = "COLOR" | "FLOAT" | "STRING";

/**
 * Figma Variable definition
 */
interface FigmaVariable {
  name: string;
  type: FigmaVariableType;
  valuesByMode: Record<string, string | number>;
}

/**
 * Figma Collection
 */
interface FigmaCollection {
  name: string;
  modes: Array<{ name: string; modeId: string }>;
  variables: FigmaVariable[];
}

/**
 * Convert hex color to Figma RGBA format
 * Note: Currently colors are stored as hex strings in Figma Variables API
 * This function is kept for future RGB format support
 */
// function hexToFigmaRGBA(hex: string): { r: number; g: number; b: number; a: number } {
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   if (!result) {
//     return { r: 0, g: 0, b: 0, a: 1 };
//   }
//   return {
//     r: Number.parseInt(result[1], 16) / 255,
//     g: Number.parseInt(result[2], 16) / 255,
//     b: Number.parseInt(result[3], 16) / 255,
//     a: 1,
//   };
// }

/**
 * Generate Figma tokens from theme configuration
 *
 * @param config - Spexop theme configuration
 * @returns Figma Variables API compatible JSON
 */
export function generateFigma(config: SpexopThemeConfig): string {
  const { colors, spacing, typography, borders, darkMode } = config;

  const collection: FigmaCollection = {
    name: config.meta.name,
    modes: [
      { name: "Light", modeId: "1" },
      ...(darkMode?.enabled ? [{ name: "Dark", modeId: "2" }] : []),
    ],
    variables: [],
  };

  // Color variables
  const colorEntries: Array<[string, string]> = [
    ["colors/primary", colors.primary],
    ["colors/surface", colors.surface],
    ["colors/surface-secondary", colors.surfaceSecondary],
    ["colors/surface-hover", colors.surfaceHover],
    ["colors/text", colors.text],
    ["colors/text-secondary", colors.textSecondary],
    ["colors/text-muted", colors.textMuted],
    ["colors/border", colors.border],
    ["colors/border-strong", colors.borderStrong],
    ["colors/border-subtle", colors.borderSubtle],
  ];

  if (colors.secondary)
    colorEntries.push(["colors/secondary", colors.secondary]);
  if (colors.success) colorEntries.push(["colors/success", colors.success]);
  if (colors.warning) colorEntries.push(["colors/warning", colors.warning]);
  if (colors.error) colorEntries.push(["colors/error", colors.error]);
  if (colors.info) colorEntries.push(["colors/info", colors.info]);

  for (const [name, lightValue] of colorEntries) {
    const darkValue =
      darkMode?.colors?.[name.split("/")[1] as keyof typeof colors] ||
      lightValue;

    collection.variables.push({
      name,
      type: "COLOR",
      valuesByMode: {
        "1": lightValue,
        ...(darkMode?.enabled ? { "2": darkValue } : {}),
      },
    });
  }

  // Spacing variables
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

  for (const [key, value] of Object.entries(spacingValues)) {
    collection.variables.push({
      name: `spacing/${key}`,
      type: "FLOAT",
      valuesByMode: {
        "1": value,
        ...(darkMode?.enabled ? { "2": value } : {}),
      },
    });
  }

  // Border radius variables
  collection.variables.push(
    {
      name: "radius/subtle",
      type: "FLOAT",
      valuesByMode: {
        "1": borders.radiusSubtle,
        ...(darkMode?.enabled ? { "2": borders.radiusSubtle } : {}),
      },
    },
    {
      name: "radius/relaxed",
      type: "FLOAT",
      valuesByMode: {
        "1": borders.radiusRelaxed,
        ...(darkMode?.enabled ? { "2": borders.radiusRelaxed } : {}),
      },
    },
  );

  // Typography variables
  collection.variables.push(
    {
      name: "typography/font-family",
      type: "STRING",
      valuesByMode: {
        "1": typography.fontFamily,
        ...(darkMode?.enabled ? { "2": typography.fontFamily } : {}),
      },
    },
    {
      name: "typography/base-size",
      type: "FLOAT",
      valuesByMode: {
        "1": typography.baseSize,
        ...(darkMode?.enabled ? { "2": typography.baseSize } : {}),
      },
    },
  );

  return JSON.stringify({ collections: [collection] }, null, 2);
}
