/**
 * Theme Composition Utilities
 * Merge, extend, and compose themes
 *
 * @module @spexop/theme/utils
 */

import type { SpexopThemeConfig, ThemeColors } from "../types/index.js";
import { generateDarkModeColors } from "./darkModeGenerator.js";

/**
 * Merge options
 */
export interface MergeOptions {
  /**
   * How to handle conflicts
   * - override: Use the last theme's value
   * - first: Use the first theme's value
   * - merge: Deep merge objects
   */
  strategy?: "override" | "first" | "merge";

  /**
   * Preserve meta from first theme
   */
  preserveMeta?: boolean;
}

/**
 * Deep merge two objects
 */
function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target } as T;

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (
        sourceValue &&
        typeof sourceValue === "object" &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === "object" &&
        !Array.isArray(targetValue)
      ) {
        (result as Record<string, unknown>)[key as string] = deepMerge(
          targetValue,
          sourceValue,
        );
      } else if (sourceValue !== undefined) {
        (result as Record<string, unknown>)[key as string] = sourceValue;
      }
    }
  }

  return result;
}

/**
 * Merge multiple themes together
 *
 * @param themes - Array of themes to merge (later themes override earlier ones)
 * @param options - Merge options
 * @returns Merged theme
 *
 * @example
 * ```typescript
 * const baseTheme = { ... };
 * const brandTheme = { colors: { primary: "#custom" } };
 * const typographyOverrides = { typography: { fontFamily: "Custom Font" } };
 *
 * const merged = mergeThemes([baseTheme, brandTheme, typographyOverrides]);
 * // Result: baseTheme with brand colors and custom typography
 * ```
 */
export function mergeThemes(
  themes: SpexopThemeConfig[],
  options: MergeOptions = {},
): SpexopThemeConfig {
  const { strategy = "merge", preserveMeta = false } = options;

  if (themes.length === 0) {
    throw new Error("Must provide at least one theme to merge");
  }

  if (themes.length === 1) {
    return themes[0];
  }

  let result = themes[0];

  for (let i = 1; i < themes.length; i++) {
    const current = themes[i];

    if (strategy === "override") {
      // Simple override - last theme wins
      result = {
        ...result,
        ...current,
        meta: preserveMeta ? result.meta : current.meta,
      };
    } else if (strategy === "first") {
      // First wins - only add missing properties
      result = {
        ...current,
        ...result,
        meta: preserveMeta ? result.meta : current.meta,
      };
    } else {
      // Deep merge
      result = deepMerge(result, current);
      if (preserveMeta) {
        result.meta = themes[0].meta;
      }
    }
  }

  return result;
}

/**
 * Extend a base theme with partial overrides
 *
 * @param baseTheme - Base theme to extend
 * @param overrides - Partial theme overrides
 * @returns Extended theme
 *
 * @example
 * ```typescript
 * const customTheme = extendTheme(defaultTheme, {
 *   colors: {
 *     primary: "#ff0000",
 *     secondary: "#00ff00",
 *   },
 *   typography: {
 *     fontFamily: "Custom Font, sans-serif",
 *   },
 * });
 * ```
 */
export function extendTheme(
  baseTheme: SpexopThemeConfig,
  overrides: Partial<SpexopThemeConfig>,
): SpexopThemeConfig {
  return deepMerge(baseTheme, overrides);
}

/**
 * Create a theme variant
 */
export type ThemeVariant = "light" | "dark" | "high-contrast" | "low-contrast";

/**
 * Create a theme variant from a base theme
 *
 * @param baseTheme - Base theme
 * @param variant - Variant type to create
 * @param options - Variant-specific options
 * @returns Theme variant
 *
 * @example
 * ```typescript
 * const lightTheme = { ... };
 * const darkTheme = createThemeVariant(lightTheme, "dark");
 * const highContrastTheme = createThemeVariant(lightTheme, "high-contrast");
 * ```
 */
export function createThemeVariant(
  baseTheme: SpexopThemeConfig,
  variant: ThemeVariant,
  options: Record<string, unknown> = {},
): SpexopThemeConfig {
  switch (variant) {
    case "dark":
      return {
        ...baseTheme,
        meta: {
          ...baseTheme.meta,
          name: `${baseTheme.meta.name} (Dark)`,
          description: `Dark mode variant of ${baseTheme.meta.name}`,
        },
        colors: generateDarkModeColors(baseTheme.colors, options),
        darkMode: {
          enabled: true,
          colors: generateDarkModeColors(baseTheme.colors, options),
        },
      };

    case "light":
      // For light variant, return base theme or remove dark mode
      return {
        ...baseTheme,
        meta: {
          ...baseTheme.meta,
          name: baseTheme.meta.name.replace(" (Dark)", ""),
        },
        darkMode: undefined,
      };

    case "high-contrast": {
      // Increase contrast for better accessibility
      const highContrastColors: ThemeColors = {
        ...baseTheme.colors,
        text: "#000000",
        textSecondary: "#1a1a1a",
        textMuted: "#333333",
        surface: "#ffffff",
        surfaceSecondary: "#f5f5f5",
        surfaceHover: "#eeeeee",
        border: "#000000",
        borderStrong: "#000000",
        borderSubtle: "#666666",
      };

      return {
        ...baseTheme,
        meta: {
          ...baseTheme.meta,
          name: `${baseTheme.meta.name} (High Contrast)`,
          description: `High contrast variant of ${baseTheme.meta.name}`,
        },
        colors: highContrastColors,
      };
    }

    case "low-contrast": {
      // Reduce contrast for softer appearance
      const lowContrastColors: ThemeColors = {
        ...baseTheme.colors,
        text: "#404040",
        textSecondary: "#666666",
        textMuted: "#999999",
        surface: "#fafafa",
        surfaceSecondary: "#f5f5f5",
        surfaceHover: "#eeeeee",
        border: "#e0e0e0",
        borderStrong: "#cccccc",
        borderSubtle: "#f0f0f0",
      };

      return {
        ...baseTheme,
        meta: {
          ...baseTheme.meta,
          name: `${baseTheme.meta.name} (Low Contrast)`,
          description: `Low contrast variant of ${baseTheme.meta.name}`,
        },
        colors: lowContrastColors,
      };
    }

    default:
      return baseTheme;
  }
}

/**
 * Compose multiple themes with advanced patterns
 *
 * @param config - Composition configuration
 * @returns Composed theme
 *
 * @example
 * ```typescript
 * const theme = composeThemes({
 *   base: corporateTheme,
 *   overrides: [
 *     { colors: { primary: "#custom" } },
 *     { typography: { fontFamily: "Custom Font" } },
 *   ],
 *   variants: {
 *     dark: true,
 *     highContrast: true,
 *   },
 * });
 * ```
 */
export function composeThemes(config: {
  base: SpexopThemeConfig;
  overrides?: Partial<SpexopThemeConfig>[];
  variants?: {
    dark?: boolean;
    light?: boolean;
    highContrast?: boolean;
    lowContrast?: boolean;
  };
}): SpexopThemeConfig | Record<string, SpexopThemeConfig> {
  const { base, overrides = [], variants = {} } = config;

  // Apply overrides
  let composed = base;
  for (const override of overrides) {
    composed = extendTheme(composed, override);
  }

  // If no variants requested, return composed theme
  if (Object.keys(variants).length === 0) {
    return composed;
  }

  // Create variants
  const result: Record<string, SpexopThemeConfig> = {
    base: composed,
  };

  if (variants.dark) {
    result.dark = createThemeVariant(composed, "dark");
  }

  if (variants.light) {
    result.light = createThemeVariant(composed, "light");
  }

  if (variants.highContrast) {
    result.highContrast = createThemeVariant(composed, "high-contrast");
  }

  if (variants.lowContrast) {
    result.lowContrast = createThemeVariant(composed, "low-contrast");
  }

  return result;
}

/**
 * Extract a subset of theme tokens
 *
 * @param theme - Source theme
 * @param keys - Keys to extract
 * @returns Partial theme with only specified keys
 *
 * @example
 * ```typescript
 * const colorsOnly = extractTheme(theme, ["colors"]);
 * const designTokens = extractTheme(theme, ["colors", "typography", "spacing"]);
 * ```
 */
export function extractTheme<K extends keyof SpexopThemeConfig>(
  theme: SpexopThemeConfig,
  keys: K[],
): Pick<SpexopThemeConfig, K> {
  const result: Partial<SpexopThemeConfig> = {};

  for (const key of keys) {
    if (key in theme) {
      result[key] = theme[key];
    }
  }

  return result as Pick<SpexopThemeConfig, K>;
}

/**
 * Pick specific colors from a theme
 *
 * @param colors - Source colors
 * @param keys - Color keys to pick
 * @returns Partial colors object
 */
export function pickColors<K extends keyof ThemeColors>(
  colors: ThemeColors,
  keys: K[],
): Pick<ThemeColors, K> {
  const result: Partial<ThemeColors> = {};

  for (const key of keys) {
    if (key in colors && colors[key] !== undefined) {
      result[key] = colors[key];
    }
  }

  return result as Pick<ThemeColors, K>;
}

/**
 * Omit specific colors from a theme
 *
 * @param colors - Source colors
 * @param keys - Color keys to omit
 * @returns Colors without specified keys
 */
export function omitColors<K extends keyof ThemeColors>(
  colors: ThemeColors,
  keys: K[],
): Omit<ThemeColors, K> {
  const result: Record<string, unknown> = { ...colors };

  for (const key of keys) {
    delete result[key];
  }

  return result as Omit<ThemeColors, K>;
}

/**
 * Override specific theme properties
 *
 * @param theme - Base theme
 * @param overrides - Properties to override
 * @returns Theme with overrides applied
 *
 * @example
 * ```typescript
 * const customized = overrideTheme(baseTheme, {
 *   "colors.primary": "#ff0000",
 *   "typography.baseSize": 18,
 *   "spacing.baseUnit": 8,
 * });
 * ```
 */
export function overrideTheme(
  theme: SpexopThemeConfig,
  overrides: Record<string, unknown>,
): SpexopThemeConfig {
  const result = JSON.parse(JSON.stringify(theme)); // Deep clone

  for (const [path, value] of Object.entries(overrides)) {
    const keys = path.split(".");
    let current: Record<string, unknown> = result as Record<string, unknown>;

    // Navigate to the parent
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key] as Record<string, unknown>;
    }

    // Set the value
    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;
  }

  return result as SpexopThemeConfig;
}

/**
 * Create multiple variants from a base theme
 *
 * @param baseTheme - Base theme
 * @param variants - Variants to create
 * @returns Object with all variants
 *
 * @example
 * ```typescript
 * const variants = createThemeVariants(baseTheme, ["light", "dark", "high-contrast"]);
 * // Returns: { light: {...}, dark: {...}, highContrast: {...} }
 * ```
 */
export function createThemeVariants(
  baseTheme: SpexopThemeConfig,
  variants: ThemeVariant[],
): Record<string, SpexopThemeConfig> {
  const result: Record<string, SpexopThemeConfig> = {};

  for (const variant of variants) {
    const variantName = variant.replace("-", "");
    result[variantName] = createThemeVariant(baseTheme, variant);
  }

  return result;
}

/**
 * Check if two themes are compatible for merging
 *
 * @param theme1 - First theme
 * @param theme2 - Second theme
 * @returns True if themes are compatible
 */
export function areThemesCompatible(
  theme1: SpexopThemeConfig,
  theme2: SpexopThemeConfig,
): boolean {
  // Check if both have required properties
  const hasRequiredProps = (theme: SpexopThemeConfig) => {
    return !!(
      theme.meta &&
      theme.colors &&
      theme.typography &&
      theme.spacing &&
      theme.borders
    );
  };

  return hasRequiredProps(theme1) && hasRequiredProps(theme2);
}
