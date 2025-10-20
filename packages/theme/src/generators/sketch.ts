/**
 * Sketch Document Generator
 * Generates Sketch-compatible color palette JSON
 *
 * @module @spexop/theme/generators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

/**
 * Generate Sketch document format
 *
 * @param config - Spexop theme configuration
 * @returns Sketch palette JSON string
 */
export function generateSketch(config: SpexopThemeConfig): string {
  const { colors } = config;

  const palette = {
    compatibilityVersion: 1,
    colors: [
      { name: "Primary", value: colors.primary },
      ...(colors.primaryHover
        ? [{ name: "Primary Hover", value: colors.primaryHover }]
        : []),
      ...(colors.primaryActive
        ? [{ name: "Primary Active", value: colors.primaryActive }]
        : []),
      ...(colors.secondary
        ? [{ name: "Secondary", value: colors.secondary }]
        : []),
      { name: "Surface", value: colors.surface },
      { name: "Surface Secondary", value: colors.surfaceSecondary },
      { name: "Surface Hover", value: colors.surfaceHover },
      { name: "Text", value: colors.text },
      { name: "Text Secondary", value: colors.textSecondary },
      { name: "Text Muted", value: colors.textMuted },
      { name: "Border", value: colors.border },
      { name: "Border Strong", value: colors.borderStrong },
      { name: "Border Subtle", value: colors.borderSubtle },
      ...(colors.success ? [{ name: "Success", value: colors.success }] : []),
      ...(colors.warning ? [{ name: "Warning", value: colors.warning }] : []),
      ...(colors.error ? [{ name: "Error", value: colors.error }] : []),
      ...(colors.info ? [{ name: "Info", value: colors.info }] : []),
    ],
  };

  return JSON.stringify(palette, null, 2);
}
