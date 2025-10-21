/**
 * Automatic Contrast Correction
 * Fix contrast issues automatically to meet WCAG standards
 *
 * @module @spexop/theme/utils
 */

import type { SpexopThemeConfig, ThemeColors } from "../types/index.js";
import {
  adjustLightness,
  hexToHsl,
  hslToHex,
  isDark,
} from "./colorManipulation.js";
import { calculateContrastRatio } from "./contrastChecker.js";

/**
 * Contrast fix options
 */
export interface ContrastFixOptions {
  /** Target WCAG level */
  targetLevel?: "AA" | "AAA";
  /** Prefer adjusting foreground or background */
  adjustPreference?: "foreground" | "background" | "auto";
  /** Maximum lightness adjustment allowed */
  maxAdjustment?: number;
  /** Preserve hue and saturation */
  preserveHue?: boolean;
}

/**
 * Fix result
 */
export interface FixResult {
  /** Original color */
  original: string;
  /** Fixed color */
  fixed: string;
  /** Whether fix was successful */
  success: boolean;
  /** Adjustment amount */
  adjustment: number;
  /** Final contrast ratio */
  finalRatio: number;
}

/**
 * Fix contrast between two colors
 *
 * @param foreground - Foreground color
 * @param background - Background color
 * @param targetRatio - Target contrast ratio (default: 4.5 for AA)
 * @param options - Fix options
 * @returns Fixed foreground color
 *
 * @example
 * ```typescript
 * const fixed = fixContrast("#888888", "#ffffff", 4.5);
 * // Returns darker foreground color that meets 4.5:1 ratio
 * ```
 */
export function fixContrast(
  foreground: string,
  background: string,
  targetRatio = 4.5,
  options: ContrastFixOptions = {},
): FixResult {
  const { maxAdjustment = 50, preserveHue = true } = options;

  const currentRatio = calculateContrastRatio(foreground, background);

  if (currentRatio >= targetRatio) {
    return {
      original: foreground,
      fixed: foreground,
      success: true,
      adjustment: 0,
      finalRatio: currentRatio,
    };
  }

  const fgHsl = hexToHsl(foreground);
  const bgIsDark = isDark(background);

  // Determine direction to adjust
  const shouldLighten = bgIsDark;
  let adjustmentAmount = 0;
  let adjustedColor = foreground;

  // Binary search for the right lightness
  let minL = 0;
  let maxL = 100;
  let iterations = 0;

  while (iterations < 20 && maxL - minL > 1) {
    const midL = Math.round((minL + maxL) / 2);
    const testColor = hslToHex(
      preserveHue ? fgHsl.h : fgHsl.h,
      preserveHue ? fgHsl.s : Math.max(0, fgHsl.s - 10),
      midL,
    );
    const testRatio = calculateContrastRatio(testColor, background);

    if (testRatio >= targetRatio) {
      // We've found a working color
      adjustedColor = testColor;
      adjustmentAmount = Math.abs(midL - fgHsl.l);

      // Try to find closer match
      if (shouldLighten) {
        maxL = midL;
      } else {
        minL = midL;
      }
    } else {
      // Need more adjustment
      if (shouldLighten) {
        minL = midL;
      } else {
        maxL = midL;
      }
    }

    iterations++;
  }

  const finalRatio = calculateContrastRatio(adjustedColor, background);
  const success =
    finalRatio >= targetRatio && adjustmentAmount <= maxAdjustment;

  return {
    original: foreground,
    fixed: adjustedColor,
    success,
    adjustment: adjustmentAmount,
    finalRatio,
  };
}

/**
 * Fix all contrast issues in theme colors
 *
 * @param theme - Theme to fix
 * @param options - Fix options
 * @returns Fixed theme with corrected contrast
 *
 * @example
 * ```typescript
 * const fixed = fixThemeContrast(theme, { targetLevel: "AA" });
 * const audit = auditThemeAccessibility(fixed, "AA");
 * console.log(audit.passed); // true
 * ```
 */
export function fixThemeContrast(
  theme: SpexopThemeConfig,
  options: ContrastFixOptions = {},
): SpexopThemeConfig {
  const { targetLevel = "AA" } = options;
  const targetRatio = targetLevel === "AAA" ? 7.0 : 4.5;
  const targetUIRatio = targetLevel === "AAA" ? 4.5 : 3.0;

  const fixedColors: ThemeColors = { ...theme.colors };

  // Fix text on surface
  const textFix = fixContrast(
    fixedColors.text,
    fixedColors.surface,
    targetRatio,
    options,
  );
  if (textFix.success) {
    fixedColors.text = textFix.fixed;
  }

  // Fix secondary text
  const secondaryTextFix = fixContrast(
    fixedColors.textSecondary,
    fixedColors.surface,
    targetRatio,
    options,
  );
  if (secondaryTextFix.success) {
    fixedColors.textSecondary = secondaryTextFix.fixed;
  }

  // Fix muted text
  const mutedTextFix = fixContrast(
    fixedColors.textMuted,
    fixedColors.surface,
    targetRatio,
    options,
  );
  if (mutedTextFix.success) {
    fixedColors.textMuted = mutedTextFix.fixed;
  }

  // Fix primary on surface
  const primaryFix = fixContrast(
    fixedColors.primary,
    fixedColors.surface,
    targetUIRatio,
    options,
  );
  if (primaryFix.success) {
    fixedColors.primary = primaryFix.fixed;
  }

  // Fix border
  const borderFix = fixContrast(
    fixedColors.border,
    fixedColors.surface,
    targetUIRatio,
    options,
  );
  if (borderFix.success) {
    fixedColors.border = borderFix.fixed;
  }

  // Fix semantic colors if present
  if (fixedColors.success) {
    const successFix = fixContrast(
      fixedColors.success,
      fixedColors.surface,
      targetUIRatio,
      options,
    );
    if (successFix.success) {
      fixedColors.success = successFix.fixed;
    }
  }

  if (fixedColors.error) {
    const errorFix = fixContrast(
      fixedColors.error,
      fixedColors.surface,
      targetUIRatio,
      options,
    );
    if (errorFix.success) {
      fixedColors.error = errorFix.fixed;
    }
  }

  if (fixedColors.warning) {
    const warningFix = fixContrast(
      fixedColors.warning,
      fixedColors.surface,
      targetUIRatio,
      options,
    );
    if (warningFix.success) {
      fixedColors.warning = warningFix.fixed;
    }
  }

  return {
    ...theme,
    colors: fixedColors,
  };
}

/**
 * Preview contrast fixes without applying them
 *
 * @param theme - Theme to preview fixes for
 * @param options - Fix options
 * @returns Preview of what would be fixed
 */
export function previewContrastFixes(
  theme: SpexopThemeConfig,
  options: ContrastFixOptions = {},
): Array<{
  field: string;
  original: string;
  suggested: string;
  improvement: number;
}> {
  const { targetLevel = "AA" } = options;
  const targetRatio = targetLevel === "AAA" ? 7.0 : 4.5;
  const targetUIRatio = targetLevel === "AAA" ? 4.5 : 3.0;

  const fixes: Array<{
    field: string;
    original: string;
    suggested: string;
    improvement: number;
  }> = [];

  // Check text
  const textFix = fixContrast(
    theme.colors.text,
    theme.colors.surface,
    targetRatio,
    options,
  );
  if (textFix.success && textFix.adjustment > 0) {
    fixes.push({
      field: "colors.text",
      original: textFix.original,
      suggested: textFix.fixed,
      improvement:
        textFix.finalRatio -
        calculateContrastRatio(textFix.original, theme.colors.surface),
    });
  }

  // Check primary
  const primaryFix = fixContrast(
    theme.colors.primary,
    theme.colors.surface,
    targetUIRatio,
    options,
  );
  if (primaryFix.success && primaryFix.adjustment > 0) {
    fixes.push({
      field: "colors.primary",
      original: primaryFix.original,
      suggested: primaryFix.fixed,
      improvement:
        primaryFix.finalRatio -
        calculateContrastRatio(primaryFix.original, theme.colors.surface),
    });
  }

  // Check border
  const borderFix = fixContrast(
    theme.colors.border,
    theme.colors.surface,
    targetUIRatio,
    options,
  );
  if (borderFix.success && borderFix.adjustment > 0) {
    fixes.push({
      field: "colors.border",
      original: borderFix.original,
      suggested: borderFix.fixed,
      improvement:
        borderFix.finalRatio -
        calculateContrastRatio(borderFix.original, theme.colors.surface),
    });
  }

  return fixes;
}
