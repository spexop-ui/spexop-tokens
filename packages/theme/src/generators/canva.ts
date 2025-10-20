/**
 * Canva Brand Kit Generator
 * Generates Canva Brand Kit JSON format
 *
 * @module @spexop/theme/generators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

/**
 * Generate Canva Brand Kit
 *
 * @param config - Spexop theme configuration
 * @returns Canva Brand Kit JSON string
 */
export function generateCanva(config: SpexopThemeConfig): string {
  const { colors, typography } = config;

  const brandKit = {
    name: config.meta.name,
    version: config.meta.version,
    colors: [
      {
        name: "Primary",
        hex: colors.primary,
        role: "primary",
      },
      ...(colors.secondary
        ? [
            {
              name: "Secondary",
              hex: colors.secondary,
              role: "secondary",
            },
          ]
        : []),
      {
        name: "Surface",
        hex: colors.surface,
        role: "background",
      },
      {
        name: "Text",
        hex: colors.text,
        role: "text",
      },
      ...(colors.success
        ? [
            {
              name: "Success",
              hex: colors.success,
              role: "success",
            },
          ]
        : []),
      ...(colors.warning
        ? [
            {
              name: "Warning",
              hex: colors.warning,
              role: "warning",
            },
          ]
        : []),
      ...(colors.error
        ? [
            {
              name: "Error",
              hex: colors.error,
              role: "error",
            },
          ]
        : []),
    ],
    fonts: [
      {
        name: typography.fontFamily.split(",")[0].trim().replace(/['"]/g, ""),
        role: "body",
      },
      {
        name: (typography.fontFamilyHeading || typography.fontFamily)
          .split(",")[0]
          .trim()
          .replace(/['"]/g, ""),
        role: "heading",
      },
    ],
  };

  return JSON.stringify(brandKit, null, 2);
}
