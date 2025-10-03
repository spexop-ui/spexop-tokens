/**
 * Semantic Glass Tokens - Consolidated
 *
 * Instead of 36 individual glass tokens, we provide 8 core variants
 * that cover 90% of use cases. For custom opacities, compose on demand.
 *
 * OLD APPROACH (36 tokens):
 * - sColorGlassDark4, 6, 8, 10, 12, 15, 20, 25, 40, 50, 60, 85, 95
 * - sColorGlassLight8, 12, 15, 20, 25, 30, 35, 40, 50, 75
 * - + 15 more variants in glass/ folder
 *
 * NEW APPROACH (8 core tokens + composition):
 * - Keep most common opacities as tokens
 * - Compose others on demand
 */

/**
 * Core Glass Colors - Light Variants
 * For glassmorphism on dark backgrounds
 */

/** Glass Light 10% - Subtle overlay (semantic) */
export const sGlassLight10 = "rgba(255, 255, 255, 0.10)";

/** Glass Light 20% - Standard glassmorphism (semantic) */
export const sGlassLight20 = "rgba(255, 255, 255, 0.20)";

/** Glass Light 30% - More opaque glass (semantic) */
export const sGlassLight30 = "rgba(255, 255, 255, 0.30)";

/** Glass Light 50% - Semi-transparent (semantic) */
export const sGlassLight50 = "rgba(255, 255, 255, 0.50)";

/**
 * Core Glass Colors - Dark Variants
 * For glassmorphism on light backgrounds
 */

/** Glass Dark 10% - Subtle shadow (semantic) */
export const sGlassDark10 = "rgba(0, 0, 0, 0.10)";

/** Glass Dark 20% - Standard dark glass (semantic) */
export const sGlassDark20 = "rgba(0, 0, 0, 0.20)";

/** Glass Dark 30% - More opaque dark glass (semantic) */
export const sGlassDark30 = "rgba(0, 0, 0, 0.30)";

/** Glass Dark 50% - Semi-transparent dark (semantic) */
export const sGlassDark50 = "rgba(0, 0, 0, 0.50)";

/**
 * Semantic Glass Tokens
 * Purpose-driven names for common use cases
 */

/** Glass for cards and surfaces */
export const sGlassSurface = sGlassLight10;

/** Glass for modals and overlays */
export const sGlassOverlay = sGlassDark50;

/** Glass for hero sections */
export const sGlassHero = sGlassLight20;

/** Glass for navigation bars */
export const sGlassNav = sGlassLight10;

/**
 * Utility: Create custom glass color on demand
 *
 * Instead of creating 28 more tokens, compose when needed:
 *
 * @example
 * ```tsx
 * // Need 15% opacity? Calculate it:
 * const glass15 = `rgba(255, 255, 255, 0.15)`;
 *
 * // Or create a utility function:
 * const createGlassColor = (isLight: boolean, opacity: number) => {
 *   const rgb = isLight ? '255, 255, 255' : '0, 0, 0';
 *   return `rgba(${rgb}, ${opacity})`;
 * };
 *
 * // Usage:
 * background: createGlassColor(true, 0.15);
 * ```
 */

/**
 * Migration Guide from Old Tokens:
 *
 * Old Token → New Token
 * - sColorGlassDark4  → sColorGlassDark10 (or compose: rgba(0,0,0,0.04))
 * - sColorGlassDark6  → sColorGlassDark10 (or compose)
 * - sColorGlassDark8  → sColorGlassDark10 (or compose)
 * - sColorGlassDark10 → sColorGlassDark10 ✅
 * - sColorGlassDark12 → sColorGlassDark10 (or compose)
 * - sColorGlassDark15 → sColorGlassDark20 (or compose)
 * - sColorGlassDark20 → sColorGlassDark20 ✅
 * - sColorGlassDark25 → sColorGlassDark30 (or compose)
 * - sColorGlassDark30 → sColorGlassDark30 ✅
 * - sColorGlassDark40 → sColorGlassDark30 (or compose)
 * - sColorGlassDark50 → sColorGlassDark50 ✅
 *
 * Similar mapping for Light variants.
 */

/**
 * Best Practices:
 *
 * 1. **Use semantic tokens** for common patterns:
 *    - sColorGlassSurface for cards
 *    - sColorGlassOverlay for modals
 *    - sColorGlassHero for hero sections
 *
 * 2. **Use core tokens** (10, 20, 30, 50) for most cases
 *
 * 3. **Compose custom values** for edge cases:
 *    - Don't create new tokens for one-off opacities
 *    - Calculate inline or use utility function
 *
 * 4. **Use backdrop-filter** with glass colors:
 *    ```tsx
 *    {
 *      background: sColorGlassLight20,
 *      backdropFilter: 'blur(30px) saturate(180%)',
 *    }
 *    ```
 */

/**
 * Why This Approach?
 *
 * ✅ Reduces 36 tokens → 8 core + 4 semantic = 12 total
 * ✅ Covers 90% of use cases
 * ✅ Easy to understand (10, 20, 30, 50)
 * ✅ Flexible (compose custom when needed)
 * ✅ Maintainable (fewer tokens to update)
 * ✅ Performant (no bloat)
 */
