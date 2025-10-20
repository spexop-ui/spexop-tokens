/**
 * Semantic Color Tokens
 *
 * Purpose-driven colors that reference base tokens.
 * These provide meaning and context rather than just values.
 *
 * Benefits:
 * - Easy theme switching (change one reference)
 * - Clear intent in component code
 * - Reduced token count (no duplication)
 * - Consistent color usage
 *
 * @example
 * ```tsx
 * // Instead of:
 * <Button style={{ background: sColorBlue600 }} />
 *
 * // Use semantic:
 * <Button style={{ background: sColorPrimary }} />
 * ```
 */

import { sColorBlue600 } from "../color/sColorBlue600.js";
import { sColorNeutral50 } from "../color/sColorNeutral50.js";
import { sColorNeutral100 } from "../color/sColorNeutral100.js";
import { sColorNeutral200 } from "../color/sColorNeutral200.js";
import { sColorNeutral300 } from "../color/sColorNeutral300.js";
import { sColorNeutral500 } from "../color/sColorNeutral500.js";
import { sColorNeutral700 } from "../color/sColorNeutral700.js";
import { sColorNeutral800 } from "../color/sColorNeutral800.js";
import { sColorNeutral900 } from "../color/sColorNeutral900.js";
import { sColorWhite } from "../color/sColorWhite.js";

// ============================================
// SEMANTIC COLOR TOKENS
// ============================================

/**
 * Primary Brand Colors
 * Used for main actions, links, and brand elements
 */
export const sColorPrimary = sColorBlue600;
export const sColorPrimaryHover = sColorNeutral700;
export const sColorPrimaryActive = sColorNeutral800;

/**
 * Text Colors
 * For body text, headings, and labels
 */
export const sColorTextPrimary = sColorNeutral900;
export const sColorTextSecondary = sColorNeutral700;
export const sColorTextMuted = sColorNeutral500;
export const sColorTextDisabled = sColorNeutral300;
export const sColorTextInverted = sColorWhite;

/**
 * Background Colors
 * For surfaces, cards, and containers
 */
export const sColorBackgroundPrimary = sColorWhite;
export const sColorBackgroundSecondary = sColorNeutral50;
export const sColorBackgroundTertiary = sColorNeutral100;
export const sColorBackgroundHover = sColorNeutral50;

/**
 * Border Colors
 * For dividers, outlines, and separators
 */
export const sColorBorder = sColorNeutral200;
export const sColorBorderHover = sColorNeutral300;
export const sColorBorderFocus = sColorPrimary;
export const sColorBorderSubtle = sColorNeutral200;

/**
 * Interactive States
 * For hover, active, and focus states
 */
export const sColorInteractiveFocus = sColorBlue600;
export const sColorInteractiveHover = sColorNeutral100;
export const sColorInteractiveActive = sColorNeutral200;

/**
 * Surface Colors
 * For elevated elements like cards, modals, dropdowns
 */
export const sColorSurface = sColorWhite;
export const sColorSurfaceHover = sColorNeutral50;
export const sColorSurfaceRaised = sColorWhite;

/**
 * Overlay Colors
 * For modals, drawers, and backdrop
 */
export const sColorOverlay = "rgba(0, 0, 0, 0.5)";
export const sColorOverlayLight = "rgba(0, 0, 0, 0.3)";
export const sColorOverlayHeavy = "rgba(0, 0, 0, 0.7)";

/**
 * Example: How to use semantic tokens
 *
 * @example
 * ```tsx
 * // In your component:
 * const buttonStyles = {
 *   background: sColorPrimary,
 *   color: sColorTextInverted,
 *   border: `1px solid ${sColorBorder}`,
 * };
 *
 * // On hover:
 * '&:hover': {
 *   background: sColorPrimaryHover,
 *   border: `1px solid ${sColorBorderHover}`,
 * }
 * ```
 */

/**
 * Benefits of Semantic Tokens:
 *
 * 1. **Clarity**: "sColorPrimary" is clearer than "sColorBlue600"
 * 2. **Flexibility**: Change theme by changing one reference
 * 3. **Consistency**: All buttons use same primary color
 * 4. **Maintenance**: Update once, applies everywhere
 * 5. **Reduced count**: Reference base, don't duplicate
 */

/**
 * Semantic Token Mapping for Different Themes
 *
 * Minimal Theme:
 * - sColorPrimary = sColorNeutral900 (black)
 * - sColorTextPrimary = sColorNeutral900
 *
 * Professional Theme:
 * - sColorPrimary = sColorBlue600 (blue)
 * - sColorTextPrimary = sColorNeutral900
 *
 * Bold Theme:
 * - sColorPrimary = sColorRed500 (red)
 * - sColorTextPrimary = sColorNeutral900
 */
