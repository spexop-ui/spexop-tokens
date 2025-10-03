/**
 * Semantic Tokens - Purpose-Driven Design Tokens
 *
 * Semantic tokens provide meaning and context by referencing base tokens.
 * This reduces duplication and makes intent clear in component code.
 *
 * Three-Tier Token System:
 * 1. **Base Tokens**: Raw values (sColorBlue600, sSpacing4)
 * 2. **Semantic Tokens**: Purpose-driven (sColorPrimary, sColorTextMuted)
 * 3. **Component Tokens**: Usage-specific (composed in components)
 *
 * @packageDocumentation
 */

// Color semantic tokens
export {
  sColorBackgroundHover,
  sColorBackgroundPrimary,
  sColorBackgroundSecondary,
  sColorBackgroundTertiary,
  sColorBorder,
  sColorBorderFocus,
  sColorBorderHover,
  sColorBorderSubtle,
  sColorInteractiveActive,
  sColorInteractiveFocus,
  sColorInteractiveHover,
  sColorOverlay,
  sColorOverlayHeavy,
  sColorOverlayLight,
  sColorPrimary,
  sColorPrimaryActive,
  sColorPrimaryHover,
  sColorSurface,
  sColorSurfaceHover,
  sColorSurfaceRaised,
  sColorTextDisabled,
  sColorTextInverted,
  sColorTextMuted,
  sColorTextPrimary,
  sColorTextSecondary,
} from "./colors.js";

// Glass semantic tokens (consolidated - shorter names)
export {
  sGlassDark10,
  sGlassDark20,
  sGlassDark30,
  sGlassDark50,
  sGlassHero,
  sGlassLight10,
  sGlassLight20,
  sGlassLight30,
  sGlassLight50,
  sGlassNav,
  sGlassOverlay,
  sGlassSurface,
} from "./glass.js";
