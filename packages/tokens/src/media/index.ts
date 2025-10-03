/**
 * Media Query Utilities
 *
 * Comprehensive set of media query utilities built on top of the
 * Spexop Design System breakpoint tokens.
 */

// Max-width utilities (desktop-first)
export {
  sMediaMax2xl,
  sMediaMaxLg,
  sMediaMaxMd,
  sMediaMaxSm,
  sMediaMaxXl,
  sMediaMaxXs,
} from "./maxWidth.js";
// Min-width utilities (mobile-first)
export {
  sMediaMin2xl,
  sMediaMinLg,
  sMediaMinMd,
  sMediaMinSm,
  sMediaMinXl,
  sMediaMinXs,
} from "./minWidth.js";

// Range utilities (target specific breakpoint ranges)
export {
  sMediaMobile,
  sMediaOnlyLg,
  sMediaOnlyMd,
  sMediaOnlySm,
  sMediaOnlyXl,
  sMediaOnlyXs,
  sMediaTabletDesktop,
} from "./rangeWidth.js";

// Utility functions and device/preference queries
export {
  createMaxWidth,
  createMediaQuery,
  createMinWidth,
  createRange,
  sMediaCoarsePointer,
  sMediaDarkScheme,
  sMediaFinePointer,
  sMediaHighContrast,
  sMediaHover,
  sMediaLandscape,
  sMediaLightScheme,
  sMediaMotion,
  sMediaNoHover,
  sMediaPortrait,
  sMediaReducedMotion,
  sMediaReducedTransparency,
} from "./utilities.js";
