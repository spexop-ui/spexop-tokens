/**
 * W3C Design Tokens Generator
 * Generates W3C Design Tokens Community Group format
 *
 * @module @spexop/theme/generators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

/**
 * Generate W3C Design Tokens format
 *
 * @param config - Spexop theme configuration
 * @returns W3C Design Tokens JSON string
 */
export function generateW3C(config: SpexopThemeConfig): string {
  const { colors, spacing, typography, borders } = config;

  // Generate spacing values
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
    // Colors
    color: {
      primary: {
        $value: colors.primary,
        $type: "color",
        $description: "Primary brand color",
      },
      "primary-hover": {
        $value: colors.primaryHover || colors.primary,
        $type: "color",
        $description: "Primary color hover state",
      },
      "primary-active": {
        $value: colors.primaryActive || colors.primary,
        $type: "color",
        $description: "Primary color active state",
      },
      ...(colors.secondary
        ? {
            secondary: {
              $value: colors.secondary,
              $type: "color",
              $description: "Secondary brand color",
            },
          }
        : {}),
      surface: {
        $value: colors.surface,
        $type: "color",
        $description: "Main surface/background color",
      },
      "surface-secondary": {
        $value: colors.surfaceSecondary,
        $type: "color",
        $description: "Secondary surface color",
      },
      "surface-hover": {
        $value: colors.surfaceHover,
        $type: "color",
        $description: "Surface hover state",
      },
      text: {
        $value: colors.text,
        $type: "color",
        $description: "Primary text color",
      },
      "text-secondary": {
        $value: colors.textSecondary,
        $type: "color",
        $description: "Secondary text color",
      },
      "text-muted": {
        $value: colors.textMuted,
        $type: "color",
        $description: "Muted text color",
      },
      border: {
        $value: colors.border,
        $type: "color",
        $description: "Border color",
      },
      "border-strong": {
        $value: colors.borderStrong,
        $type: "color",
        $description: "Strong border color",
      },
      "border-subtle": {
        $value: colors.borderSubtle,
        $type: "color",
        $description: "Subtle border color",
      },
    },

    // Spacing
    spacing: Object.entries(spacingValues).reduce(
      (acc, [key, value]) => {
        acc[key] = {
          $value: `${value}px`,
          $type: "dimension",
          $description: `Spacing value ${key}`,
        };
        return acc;
      },
      {} as Record<string, any>,
    ),

    // Typography
    typography: {
      "font-family": {
        $value: typography.fontFamily,
        $type: "fontFamily",
        $description: "Base font family",
      },
      "font-family-heading": {
        $value: typography.fontFamilyHeading || typography.fontFamily,
        $type: "fontFamily",
        $description: "Heading font family",
      },
      ...(typography.fontFamilyMono
        ? {
            "font-family-mono": {
              $value: typography.fontFamilyMono,
              $type: "fontFamily",
              $description: "Monospace font family",
            },
          }
        : {}),
      "font-size-base": {
        $value: `${typography.baseSize}px`,
        $type: "dimension",
        $description: "Base font size",
      },
      "font-weight-regular": {
        $value: typography.weights.regular,
        $type: "fontWeight",
        $description: "Regular font weight",
      },
      "font-weight-semibold": {
        $value: typography.weights.semibold,
        $type: "fontWeight",
        $description: "Semibold font weight",
      },
      "font-weight-bold": {
        $value: typography.weights.bold,
        $type: "fontWeight",
        $description: "Bold font weight",
      },
    },

    // Borders
    border: {
      width: {
        thin: {
          $value: `${borders.thin}px`,
          $type: "dimension",
          $description: "Thin border width",
        },
        default: {
          $value: `${borders.default}px`,
          $type: "dimension",
          $description: "Default border width",
        },
        thick: {
          $value: `${borders.thick}px`,
          $type: "dimension",
          $description: "Thick border width",
        },
      },
      radius: {
        subtle: {
          $value: `${borders.radiusSubtle}px`,
          $type: "dimension",
          $description: "Subtle border radius",
        },
        relaxed: {
          $value: `${borders.radiusRelaxed}px`,
          $type: "dimension",
          $description: "Relaxed border radius",
        },
        pill: {
          $value: `${borders.radiusPill}px`,
          $type: "dimension",
          $description: "Pill border radius",
        },
      },
    },
  };

  return JSON.stringify(tokens, null, 2);
}
