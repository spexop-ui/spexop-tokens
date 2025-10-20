/**
 * Style Dictionary Generator
 * Generates Style Dictionary compatible token format
 *
 * @module @spexop/theme/generators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

/**
 * Generate Style Dictionary tokens
 *
 * @param config - Spexop theme configuration
 * @returns Style Dictionary JSON string
 */
export function generateStyleDictionary(config: SpexopThemeConfig): string {
  const { colors, spacing, typography, borders, breakpoints } = config;

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
    color: {
      primary: { value: colors.primary },
      "primary-hover": { value: colors.primaryHover || colors.primary },
      "primary-active": { value: colors.primaryActive || colors.primary },
      ...(colors.secondary ? { secondary: { value: colors.secondary } } : {}),
      ...(colors.secondaryHover
        ? { "secondary-hover": { value: colors.secondaryHover } }
        : {}),
      ...(colors.secondaryActive
        ? { "secondary-active": { value: colors.secondaryActive } }
        : {}),
      surface: { value: colors.surface },
      "surface-secondary": { value: colors.surfaceSecondary },
      "surface-hover": { value: colors.surfaceHover },
      text: { value: colors.text },
      "text-secondary": { value: colors.textSecondary },
      "text-muted": { value: colors.textMuted },
      border: { value: colors.border },
      "border-strong": { value: colors.borderStrong },
      "border-subtle": { value: colors.borderSubtle },
      ...(colors.success ? { success: { value: colors.success } } : {}),
      ...(colors.warning ? { warning: { value: colors.warning } } : {}),
      ...(colors.error ? { error: { value: colors.error } } : {}),
      ...(colors.info ? { info: { value: colors.info } } : {}),
    },
    spacing: Object.entries(spacingValues).reduce(
      (acc, [key, value]) => {
        acc[key] = { value };
        return acc;
      },
      {} as Record<string, any>,
    ),
    font: {
      family: {
        base: { value: typography.fontFamily },
        heading: {
          value: typography.fontFamilyHeading || typography.fontFamily,
        },
        ...(typography.fontFamilyMono
          ? { mono: { value: typography.fontFamilyMono } }
          : {}),
      },
      size: {
        xs: {
          value: Math.round(
            typography.baseSize / (typography.scale * typography.scale),
          ),
        },
        sm: { value: Math.round(typography.baseSize / typography.scale) },
        base: { value: typography.baseSize },
        lg: { value: Math.round(typography.baseSize * typography.scale) },
        xl: {
          value: Math.round(
            typography.baseSize * typography.scale * typography.scale,
          ),
        },
        "2xl": {
          value: Math.round(typography.baseSize * typography.scale ** 3),
        },
      },
      weight: {
        regular: { value: typography.weights.regular },
        semibold: { value: typography.weights.semibold },
        bold: { value: typography.weights.bold },
      },
      lineHeight: {
        tight: { value: typography.lineHeights.tight },
        normal: { value: typography.lineHeights.normal },
        relaxed: { value: typography.lineHeights.relaxed },
      },
    },
    border: {
      width: {
        thin: { value: borders.thin },
        default: { value: borders.default },
        thick: { value: borders.thick },
      },
      radius: {
        subtle: { value: borders.radiusSubtle },
        relaxed: { value: borders.radiusRelaxed },
        pill: { value: borders.radiusPill },
      },
    },
    breakpoint: {
      xs: { value: breakpoints?.xs || 320 },
      sm: { value: breakpoints?.sm || 640 },
      md: { value: breakpoints?.md || 768 },
      lg: { value: breakpoints?.lg || 1024 },
      xl: { value: breakpoints?.xl || 1280 },
      "2xl": { value: breakpoints?.["2xl"] || 1536 },
    },
  };

  return JSON.stringify(tokens, null, 2);
}
