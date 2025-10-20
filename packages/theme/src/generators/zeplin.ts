/**
 * Zeplin/Penpot Tokens Generator
 * Generates Zeplin/Penpot compatible format
 *
 * @module @spexop/theme/generators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

/**
 * Generate Zeplin/Penpot tokens
 *
 * @param config - Spexop theme configuration
 * @returns Zeplin tokens JSON string
 */
export function generateZeplin(config: SpexopThemeConfig): string {
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
    _meta: {
      name: config.meta.name,
      version: config.meta.version,
      generator: "@spexop/theme",
    },
    colors: {
      primary: colors.primary,
      "primary-hover": colors.primaryHover || colors.primary,
      "primary-active": colors.primaryActive || colors.primary,
      ...(colors.secondary && { secondary: colors.secondary }),
      surface: colors.surface,
      "surface-secondary": colors.surfaceSecondary,
      "surface-hover": colors.surfaceHover,
      text: colors.text,
      "text-secondary": colors.textSecondary,
      "text-muted": colors.textMuted,
      border: colors.border,
      "border-strong": colors.borderStrong,
      "border-subtle": colors.borderSubtle,
      ...(colors.success && { success: colors.success }),
      ...(colors.warning && { warning: colors.warning }),
      ...(colors.error && { error: colors.error }),
      ...(colors.info && { info: colors.info }),
    },
    spacing: spacingValues,
    typography: {
      fontFamilies: {
        body: typography.fontFamily,
        heading: typography.fontFamilyHeading || typography.fontFamily,
        ...(typography.fontFamilyMono && { mono: typography.fontFamilyMono }),
      },
      fontSizes: {
        xs: Math.round(typography.baseSize / typography.scale ** 2),
        sm: Math.round(typography.baseSize / typography.scale),
        base: typography.baseSize,
        lg: Math.round(typography.baseSize * typography.scale),
        xl: Math.round(typography.baseSize * typography.scale ** 2),
        "2xl": Math.round(typography.baseSize * typography.scale ** 3),
      },
      fontWeights: typography.weights,
      lineHeights: typography.lineHeights,
    },
    borders: {
      widths: {
        thin: borders.thin,
        default: borders.default,
        thick: borders.thick,
      },
      radii: {
        subtle: borders.radiusSubtle,
        relaxed: borders.radiusRelaxed,
        pill: borders.radiusPill,
      },
    },
  };

  return JSON.stringify(tokens, null, 2);
}
