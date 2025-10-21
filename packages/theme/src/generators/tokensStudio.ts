/**
 * Tokens Studio Generator
 * Generates Tokens Studio (Figma plugin) format
 *
 * @module @spexop/theme/generators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

/**
 * Generate Tokens Studio format
 *
 * @param config - Spexop theme configuration
 * @returns Tokens Studio JSON string
 */
export function generateTokensStudio(config: SpexopThemeConfig): string {
  const { colors, spacing, typography, borders } = config;

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
    global: {
      colors: {
        primary: { value: colors.primary, type: "color" },
        "primary-hover": {
          value: colors.primaryHover || colors.primary,
          type: "color",
        },
        "primary-active": {
          value: colors.primaryActive || colors.primary,
          type: "color",
        },
        ...(colors.secondary
          ? { secondary: { value: colors.secondary, type: "color" } }
          : {}),
        surface: { value: colors.surface, type: "color" },
        "surface-secondary": { value: colors.surfaceSecondary, type: "color" },
        "surface-hover": { value: colors.surfaceHover, type: "color" },
        text: { value: colors.text, type: "color" },
        "text-secondary": { value: colors.textSecondary, type: "color" },
        "text-muted": { value: colors.textMuted, type: "color" },
        border: { value: colors.border, type: "color" },
        "border-strong": { value: colors.borderStrong, type: "color" },
        "border-subtle": { value: colors.borderSubtle, type: "color" },
        ...(colors.success
          ? { success: { value: colors.success, type: "color" } }
          : {}),
        ...(colors.warning
          ? { warning: { value: colors.warning, type: "color" } }
          : {}),
        ...(colors.error
          ? { error: { value: colors.error, type: "color" } }
          : {}),
        ...(colors.info ? { info: { value: colors.info, type: "color" } } : {}),
      },
      spacing: Object.entries(spacingValues).reduce(
        (acc, [key, value]) => {
          acc[key] = { value: value, type: "spacing" };
          return acc;
        },
        {} as Record<string, unknown>,
      ),
      typography: {
        "font-family": { value: typography.fontFamily, type: "fontFamilies" },
        "font-family-heading": {
          value: typography.fontFamilyHeading || typography.fontFamily,
          type: "fontFamilies",
        },
        ...(typography.fontFamilyMono
          ? {
              "font-family-mono": {
                value: typography.fontFamilyMono,
                type: "fontFamilies",
              },
            }
          : {}),
        "font-size-base": { value: typography.baseSize, type: "fontSizes" },
        "font-weight-regular": {
          value: typography.weights.regular,
          type: "fontWeights",
        },
        "font-weight-semibold": {
          value: typography.weights.semibold,
          type: "fontWeights",
        },
        "font-weight-bold": {
          value: typography.weights.bold,
          type: "fontWeights",
        },
        "line-height-tight": {
          value: typography.lineHeights.tight,
          type: "lineHeights",
        },
        "line-height-normal": {
          value: typography.lineHeights.normal,
          type: "lineHeights",
        },
        "line-height-relaxed": {
          value: typography.lineHeights.relaxed,
          type: "lineHeights",
        },
      },
      border: {
        width: {
          thin: { value: borders.thin, type: "borderWidth" },
          default: { value: borders.default, type: "borderWidth" },
          thick: { value: borders.thick, type: "borderWidth" },
        },
        radius: {
          subtle: { value: borders.radiusSubtle, type: "borderRadius" },
          relaxed: { value: borders.radiusRelaxed, type: "borderRadius" },
          pill: { value: borders.radiusPill, type: "borderRadius" },
        },
      },
    },
  };

  return JSON.stringify(tokens, null, 2);
}
