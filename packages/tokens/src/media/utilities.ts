/**
 * Media query utility functions
 * Programmatic helpers for creating custom media queries
 */

/**
 * Creates a min-width media query for a custom breakpoint
 * @param breakpoint - The breakpoint value (e.g., "768px", "50rem")
 * @returns Media query string
 * @example
 * ```typescript
 * const query = createMinWidth("900px");
 * // Returns: "(min-width: 900px)"
 * ```
 */
export function createMinWidth(breakpoint: string): string {
  return `(min-width: ${breakpoint})`;
}

/**
 * Creates a max-width media query for a custom breakpoint
 * @param breakpoint - The breakpoint value (e.g., "768px", "50rem")
 * @returns Media query string
 * @example
 * ```typescript
 * const query = createMaxWidth("900px");
 * // Returns: "(max-width: calc(900px - 0.02px))"
 * ```
 */
export function createMaxWidth(breakpoint: string): string {
  return `(max-width: calc(${breakpoint} - 0.02px))`;
}

/**
 * Creates a range media query between two breakpoints
 * @param minBreakpoint - The minimum breakpoint value
 * @param maxBreakpoint - The maximum breakpoint value
 * @returns Media query string
 * @example
 * ```typescript
 * const query = createRange("768px", "1024px");
 * // Returns: "(min-width: 768px) and (max-width: calc(1024px - 0.02px))"
 * ```
 */
export function createRange(
  minBreakpoint: string,
  maxBreakpoint: string,
): string {
  return `(min-width: ${minBreakpoint}) and (max-width: calc(${maxBreakpoint} - 0.02px))`;
}

/**
 * Creates a full media query with screen prefix
 * @param query - The media query conditions
 * @returns Complete media query string
 * @example
 * ```typescript
 * const fullQuery = createMediaQuery("(min-width: 768px)");
 * // Returns: "@media screen and (min-width: 768px)"
 * ```
 */
export function createMediaQuery(query: string): string {
  return `@media screen and ${query}`;
}

/**
 * Device orientation media queries
 */
export const sMediaPortrait = "(orientation: portrait)";
export const sMediaLandscape = "(orientation: landscape)";

/**
 * Hover capability media queries
 */
export const sMediaHover = "(hover: hover)";
export const sMediaNoHover = "(hover: none)";

/**
 * Pointer capability media queries
 */
export const sMediaFinePointer = "(pointer: fine)";
export const sMediaCoarsePointer = "(pointer: coarse)";

/**
 * Reduced motion preference media query
 */
export const sMediaReducedMotion = "(prefers-reduced-motion: reduce)";
export const sMediaMotion = "(prefers-reduced-motion: no-preference)";

/**
 * Color scheme preference media queries
 */
export const sMediaDarkScheme = "(prefers-color-scheme: dark)";
export const sMediaLightScheme = "(prefers-color-scheme: light)";

/**
 * High contrast preference media query
 */
export const sMediaHighContrast = "(prefers-contrast: high)";

/**
 * Reduced transparency preference media query
 */
export const sMediaReducedTransparency =
  "(prefers-reduced-transparency: reduce)";
