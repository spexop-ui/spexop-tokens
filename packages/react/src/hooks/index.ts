/**
 * Responsive & Media Query Hooks
 */

export {
  BreakpointContext,
  type BreakpointName,
  useBreakpoint,
} from "./useBreakpoint.js";
export { useMediaQuery } from "./useMediaQuery.js";
export {
  disablePerformanceWarnings,
  enablePerformanceWarnings,
  getResponsiveValuePerformance,
  type ResponsiveProp,
  type ResponsiveValue,
  useResponsiveValue,
} from "./useResponsiveValue.js";

/**
 * Scroll & Navigation Hooks
 */

export { type UseScrollSpyOptions, useScrollSpy } from "./useScrollSpy.js";

/**
 * Debug Hooks
 */

export { type DebugContextValue, useDebug } from "./useDebug.js";

/**
 * Overlay & Interaction Hooks
 */

export {
  type UseAccordionReturn,
  useAccordion,
} from "./useAccordion.js";
export { useBodyScrollLock } from "./useBodyScrollLock.js";
export { useEscapeKey } from "./useEscapeKey.js";
export { useFocusTrap } from "./useFocusTrap.js";
