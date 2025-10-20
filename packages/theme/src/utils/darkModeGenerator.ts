/**
 * Dark Mode Generator
 * Automatically generate dark mode color schemes from light themes
 */

import type { SpexopThemeConfig, ThemeColors } from "../types/index.js";
import {
  adjustLightness,
  hexToHsl,
  hslToHex,
  isLight,
} from "./colorManipulation.js";
import { calculateContrastRatio } from "./contrastChecker.js";

/**
 * Dark mode generation options
 */
export interface DarkModeOptions {
  /**
   * Intensity of the dark mode transformation
   * - subtle: Light dark mode (background ~30% lightness)
   * - moderate: Standard dark mode (background ~15% lightness)
   * - intense: Very dark mode (background ~8% lightness)
   */
  intensity?: "subtle" | "moderate" | "intense";

  /**
   * Preserve hue shifts in brand colors
   */
  preserveBrandColors?: boolean;

  /**
   * Adjust saturation in dark mode
   * Typically reduced slightly for better readability
   */
  saturationAdjustment?: number; // -20 to +20

  /**
   * Ensure minimum WCAG contrast ratios
   */
  ensureContrast?: boolean;

  /**
   * Minimum contrast ratio for text
   */
  minTextContrast?: number; // Default: 4.5

  /**
   * Minimum contrast ratio for UI elements
   */
  minUIContrast?: number; // Default: 3.0
}

/**
 * Default dark mode generation options
 */
const defaultOptions: Required<DarkModeOptions> = {
  intensity: "moderate",
  preserveBrandColors: true,
  saturationAdjustment: -5,
  ensureContrast: true,
  minTextContrast: 4.5,
  minUIContrast: 3.0,
};

/**
 * Transform a light color to its dark mode equivalent
 */
function transformColor(
  color: string,
  role: "background" | "surface" | "text" | "border" | "accent",
  options: Required<DarkModeOptions>,
): string {
  const hsl = hexToHsl(color);
  const isLightColor = isLight(color);

  let newL = hsl.l;
  let newS = hsl.s;

  switch (role) {
    case "background":
      // Background: Make very dark
      newL =
        options.intensity === "subtle"
          ? 10
          : options.intensity === "moderate"
            ? 7
            : 5;
      newS = Math.max(0, hsl.s - 10); // Reduce saturation
      break;

    case "surface":
      // Surface: Slightly lighter than background
      newL =
        options.intensity === "subtle"
          ? 15
          : options.intensity === "moderate"
            ? 12
            : 8;
      newS = Math.max(0, hsl.s - 8);
      break;

    case "text":
      // Text: Invert lightness (dark → light)
      if (isLightColor) {
        newL = Math.max(5, hsl.l - 10); // Keep light colors light
      } else {
        newL = Math.min(95, 95 - (100 - hsl.l) * 0.2); // Dark → very light
      }
      newS = Math.max(0, hsl.s - 5);
      break;

    case "border":
      // Border: Medium dark, visible but subtle
      newL =
        options.intensity === "subtle"
          ? 30
          : options.intensity === "moderate"
            ? 25
            : 20;
      newS = Math.max(0, hsl.s - 10);
      break;

    case "accent":
      // Accent: Preserve brand colors with slight adjustments
      if (options.preserveBrandColors) {
        // Keep hue, adjust lightness to ensure visibility
        if (hsl.l < 40) {
          newL = 60; // Lighten dark accent colors
        } else if (hsl.l > 70) {
          newL = 65; // Slightly darken light accent colors
        }
        newS = Math.max(50, hsl.s); // Maintain vibrant saturation
      } else {
        newL = 60;
      }
      break;
  }

  // Apply global saturation adjustment
  newS = Math.max(0, Math.min(100, newS + options.saturationAdjustment));

  return hslToHex(hsl.h, newS, newL);
}

/**
 * Ensure color combination meets contrast requirements
 */
function ensureContrast(
  foreground: string,
  background: string,
  minRatio: number,
): string {
  const currentRatio = calculateContrastRatio(foreground, background);

  if (currentRatio >= minRatio) {
    return foreground;
  }

  // Adjust foreground lightness until contrast is met
  const hsl = hexToHsl(foreground);
  const bgHsl = hexToHsl(background);
  const shouldLighten = hsl.l < bgHsl.l;

  let adjustedL = hsl.l;
  let adjustedColor = foreground;
  let iterations = 0;

  while (iterations < 100) {
    adjustedL += shouldLighten ? 1 : -1;

    if (adjustedL < 0 || adjustedL > 100) {
      break;
    }

    adjustedColor = hslToHex(hsl.h, hsl.s, adjustedL);
    const ratio = calculateContrastRatio(adjustedColor, background);

    if (ratio >= minRatio) {
      return adjustedColor;
    }

    iterations++;
  }

  // If we can't meet the ratio by adjusting foreground, return best attempt
  return adjustedColor;
}

/**
 * Generate dark mode colors from light theme colors
 */
export function generateDarkModeColors(
  lightColors: ThemeColors,
  options: DarkModeOptions = {},
): ThemeColors {
  const opts = { ...defaultOptions, ...options };

  // Transform each color based on its semantic role
  const darkColors: ThemeColors = {
    // Surface colors (backgrounds)
    surface: transformColor(lightColors.surface, "background", opts),
    surfaceSecondary: transformColor(
      lightColors.surfaceSecondary,
      "surface",
      opts,
    ),
    surfaceHover: transformColor(lightColors.surfaceHover, "surface", opts),

    // Text colors
    text: transformColor(lightColors.text, "text", opts),
    textSecondary: transformColor(lightColors.textSecondary, "text", opts),
    textMuted: transformColor(lightColors.textMuted, "text", opts),

    // Border colors
    border: transformColor(lightColors.border, "border", opts),
    borderStrong: transformColor(lightColors.borderStrong, "border", opts),
    borderSubtle: transformColor(lightColors.borderSubtle, "border", opts),

    // Brand colors (preserved with adjustments)
    primary: transformColor(lightColors.primary, "accent", opts),
    secondary: lightColors.secondary
      ? transformColor(lightColors.secondary, "accent", opts)
      : undefined,

    // Semantic colors (special handling)
    success: lightColors.success
      ? adjustLightness(lightColors.success, 10)
      : undefined,
    warning: lightColors.warning
      ? adjustLightness(lightColors.warning, 5)
      : undefined,
    error: lightColors.error
      ? adjustLightness(lightColors.error, 10)
      : undefined,
    info: lightColors.info ? adjustLightness(lightColors.info, 10) : undefined,
  };

  // Ensure contrast requirements if enabled
  if (opts.ensureContrast) {
    // Text on surface
    darkColors.text = ensureContrast(
      darkColors.text,
      darkColors.surface,
      opts.minTextContrast,
    );

    darkColors.textSecondary = ensureContrast(
      darkColors.textSecondary,
      darkColors.surface,
      opts.minTextContrast,
    );

    // Border on surface
    darkColors.border = ensureContrast(
      darkColors.border,
      darkColors.surface,
      opts.minUIContrast,
    );

    // Primary on surface
    darkColors.primary = ensureContrast(
      darkColors.primary,
      darkColors.surface,
      opts.minUIContrast,
    );
  }

  return darkColors;
}

/**
 * Generate a complete dark mode theme from a light theme
 */
export function generateDarkMode(
  lightTheme: SpexopThemeConfig,
  options: DarkModeOptions = {},
): SpexopThemeConfig {
  const darkColors = generateDarkModeColors(lightTheme.colors, options);

  // Create dark mode config
  const darkTheme: SpexopThemeConfig = {
    ...lightTheme,
    meta: {
      ...lightTheme.meta,
      name: `${lightTheme.meta.name} (Dark)`,
      description: `Dark mode variant of ${lightTheme.meta.name}`,
    },
    colors: darkColors,
    darkMode: {
      enabled: true,
      colors: darkColors,
    },
  };

  return darkTheme;
}

/**
 * Preview dark mode transformation
 * Returns both light and dark variants for comparison
 */
export function previewDarkMode(
  lightTheme: SpexopThemeConfig,
  options: DarkModeOptions = {},
): {
  light: ThemeColors;
  dark: ThemeColors;
  contrastReport: Array<{
    name: string;
    lightRatio: number;
    darkRatio: number;
    improved: boolean;
  }>;
} {
  const dark = generateDarkModeColors(lightTheme.colors, options);

  // Compare key contrast ratios
  const contrastReport = [
    {
      name: "Text on Surface",
      lightRatio: calculateContrastRatio(
        lightTheme.colors.text,
        lightTheme.colors.surface,
      ),
      darkRatio: calculateContrastRatio(dark.text, dark.surface),
    },
    {
      name: "Primary on Surface",
      lightRatio: calculateContrastRatio(
        lightTheme.colors.primary,
        lightTheme.colors.surface,
      ),
      darkRatio: calculateContrastRatio(dark.primary, dark.surface),
    },
    {
      name: "Border on Surface",
      lightRatio: calculateContrastRatio(
        lightTheme.colors.border,
        lightTheme.colors.surface,
      ),
      darkRatio: calculateContrastRatio(dark.border, dark.surface),
    },
  ].map((item) => ({
    ...item,
    improved: item.darkRatio >= 4.5 || item.darkRatio > item.lightRatio,
  }));

  return {
    light: lightTheme.colors,
    dark,
    contrastReport,
  };
}

/**
 * Get suggested dark mode options based on brand color
 */
export function getSuggestedOptions(primaryColor: string): DarkModeOptions {
  const hsl = hexToHsl(primaryColor);

  // For very saturated brand colors, reduce saturation more in dark mode
  const saturationAdjustment = hsl.s > 80 ? -10 : hsl.s > 60 ? -5 : 0;

  // For very dark brand colors, use subtle intensity
  const intensity = hsl.l < 30 ? "subtle" : "moderate";

  return {
    intensity,
    preserveBrandColors: true,
    saturationAdjustment,
    ensureContrast: true,
    minTextContrast: 4.5,
    minUIContrast: 3.0,
  };
}

/**
 * Check if a theme already has good dark mode contrast
 */
export function validateDarkMode(darkColors: ThemeColors): {
  valid: boolean;
  issues: string[];
  warnings: string[];
} {
  const issues: string[] = [];
  const warnings: string[] = [];

  // Check text contrast
  const textContrast = calculateContrastRatio(
    darkColors.text,
    darkColors.surface,
  );
  if (textContrast < 4.5) {
    issues.push(
      `Text contrast is too low: ${textContrast.toFixed(2)}:1 (minimum: 4.5:1)`,
    );
  } else if (textContrast < 7) {
    warnings.push(
      `Text contrast meets AA but not AAA: ${textContrast.toFixed(2)}:1`,
    );
  }

  // Check primary contrast
  const primaryContrast = calculateContrastRatio(
    darkColors.primary,
    darkColors.surface,
  );
  if (primaryContrast < 3) {
    issues.push(
      `Primary color contrast is too low: ${primaryContrast.toFixed(2)}:1 (minimum: 3:1)`,
    );
  }

  // Check border visibility
  const borderContrast = calculateContrastRatio(
    darkColors.border,
    darkColors.surface,
  );
  if (borderContrast < 1.5) {
    warnings.push(`Border may be too subtle: ${borderContrast.toFixed(2)}:1`);
  }

  return {
    valid: issues.length === 0,
    issues,
    warnings,
  };
}
