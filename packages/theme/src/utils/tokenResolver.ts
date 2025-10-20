/**
 * Token Reference Resolver
 * Resolves token references (e.g., "colors.primary") to actual values
 *
 * @module @spexop/theme/utils/tokenResolver
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

/**
 * Check if a value is a token reference
 * Token references follow the pattern: "colors.primary", "typography.baseSize", etc.
 */
export function isTokenReference(value: string | number): boolean {
  if (typeof value !== "string") return false;

  // Token references don't start with # (hex), rgb, hsl, or numbers
  if (
    value.startsWith("#") ||
    value.startsWith("rgb") ||
    value.startsWith("hsl")
  ) {
    return false;
  }

  // Must contain a dot (e.g., colors.primary)
  return value.includes(".");
}

/**
 * Resolve a token reference to its actual value
 *
 * @param reference - Token reference (e.g., "colors.primary", "typography.baseSize")
 * @param config - Theme configuration
 * @returns Resolved value or the original reference if not found
 *
 * @example
 * ```typescript
 * const value = resolveToken("colors.primary", config);
 * // Returns: "#ef4444"
 *
 * const literal = resolveToken("#ff0000", config);
 * // Returns: "#ff0000" (unchanged)
 *
 * const transparent = resolveToken("transparent", config);
 * // Returns: "transparent" (unchanged)
 * ```
 */
export function resolveToken(
  reference: string | number,
  config: SpexopThemeConfig,
): string | number {
  // If not a string or not a reference, return as-is
  if (typeof reference !== "string" || !isTokenReference(reference)) {
    return reference;
  }

  // Split the reference path (e.g., "colors.primary" → ["colors", "primary"])
  const parts = reference.split(".");

  // Navigate through the config object
  let value: unknown = config;

  for (const part of parts) {
    if (value && typeof value === "object" && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      // Token not found, return original reference
      return reference;
    }
  }

  // If the resolved value is also a token reference, resolve recursively
  if (typeof value === "string" && isTokenReference(value)) {
    return resolveToken(value, config);
  }

  return (value as string | number) ?? reference;
}

/**
 * Find which token a value matches in the theme
 * Useful for reverse lookup (value → token path)
 *
 * @param value - Color value to find
 * @param config - Theme configuration
 * @returns Token path if found, or null
 *
 * @example
 * ```typescript
 * const token = findTokenForValue("#ef4444", config);
 * // Returns: "colors.primary"
 * ```
 */
export function findTokenForValue(
  value: string | number,
  config: SpexopThemeConfig,
): string | null {
  // Check special cases first
  if (value === "transparent" || value === "#ffffff") {
    return null; // Don't map common literals
  }

  // Search in colors
  for (const [key, colorValue] of Object.entries(config.colors)) {
    if (colorValue === value) {
      return `colors.${key}`;
    }
  }

  // Search in spacing values if it's a number
  if (typeof value === "number" && config.spacing.values) {
    for (const [key, spacingValue] of Object.entries(config.spacing.values)) {
      if (spacingValue === value) {
        return `spacing.values.${key}`;
      }
    }
  }

  return null;
}

/**
 * Resolve all token references in button configuration
 *
 * @param buttons - Button configuration (may contain token references)
 * @param config - Theme configuration
 * @returns Button configuration with all references resolved to actual values
 */
export function resolveButtonTokens(
  buttons: SpexopThemeConfig["buttons"],
  config: SpexopThemeConfig,
): SpexopThemeConfig["buttons"] {
  if (!buttons) return buttons;

  const resolved: Record<string, Record<string, string | number>> = {};

  for (const [variant, styles] of Object.entries(buttons)) {
    if (!styles) continue;

    resolved[variant] = {};

    for (const [property, value] of Object.entries(styles)) {
      resolved[variant][property] = resolveToken(value as string, config);
    }
  }

  return resolved as SpexopThemeConfig["buttons"];
}
