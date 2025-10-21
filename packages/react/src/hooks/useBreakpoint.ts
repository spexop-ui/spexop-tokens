import { createContext, useContext } from "react";
import { useMediaQuery } from "./useMediaQuery.js";

export type BreakpointName = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

// Breakpoint values matching theme system
const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// Media query strings
const sMediaMinXs = `(min-width: ${breakpoints.xs}px)`;
const sMediaMinSm = `(min-width: ${breakpoints.sm}px)`;
const sMediaMinMd = `(min-width: ${breakpoints.md}px)`;
const sMediaMinLg = `(min-width: ${breakpoints.lg}px)`;
const sMediaMinXl = `(min-width: ${breakpoints.xl}px)`;
const sMediaMin2xl = `(min-width: ${breakpoints["2xl"]}px)`;

const sMediaMaxXs = `(max-width: ${breakpoints.sm - 1}px)`;
const sMediaMaxSm = `(max-width: ${breakpoints.md - 1}px)`;
const sMediaMaxMd = `(max-width: ${breakpoints.lg - 1}px)`;
const sMediaMaxLg = `(max-width: ${breakpoints.xl - 1}px)`;
const sMediaMaxXl = `(max-width: ${breakpoints["2xl"] - 1}px)`;

const sMediaOnlyXs = `(min-width: ${breakpoints.xs}px) and (max-width: ${breakpoints.sm - 1}px)`;
const sMediaOnlySm = `(min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`;
const sMediaOnlyMd = `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`;
const sMediaOnlyLg = `(min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`;
const sMediaOnlyXl = `(min-width: ${breakpoints.xl}px) and (max-width: ${breakpoints["2xl"] - 1}px)`;

const sMediaMobile = `(max-width: ${breakpoints.md - 1}px)`;
const sMediaTabletDesktop = `(min-width: ${breakpoints.md}px)`;

// Breakpoint Context for preview frames
interface BreakpointContextType {
  breakpoint: BreakpointName | null;
}

const BreakpointContext = createContext<BreakpointContextType>({
  breakpoint: null,
});

export { BreakpointContext };

/**
 * Hook for responsive breakpoint matching using design tokens
 *
 * @example
 * ```tsx
 * const { isDesktop, isMobile, isTablet } = useBreakpoint();
 * const isLargeScreen = useBreakpoint('min', 'lg');
 * const isMediumOnly = useBreakpoint('only', 'md');
 * ```
 */
export function useBreakpoint(): {
  current: BreakpointName;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTabletDesktop: boolean;
};

/**
 * Hook for specific breakpoint matching
 *
 * @param type - Type of media query (min, max, only)
 * @param breakpoint - Breakpoint name
 */
export function useBreakpoint(
  type: "min" | "max" | "only",
  breakpoint: BreakpointName,
): boolean;

export function useBreakpoint(
  type?: "min" | "max" | "only",
  breakpoint?: BreakpointName,
) {
  // Check for breakpoint context first (for preview frames)
  const context = useContext(BreakpointContext);
  const contextBreakpoint = context.breakpoint;

  // Individual breakpoint queries
  const isXsUp = useMediaQuery(sMediaMinXs);
  const isSmUp = useMediaQuery(sMediaMinSm);
  const isMdUp = useMediaQuery(sMediaMinMd);
  const isLgUp = useMediaQuery(sMediaMinLg);
  const isXlUp = useMediaQuery(sMediaMinXl);
  const is2xlUp = useMediaQuery(sMediaMin2xl);

  // Only queries
  const isXsOnly = useMediaQuery(sMediaOnlyXs);
  const isSmOnly = useMediaQuery(sMediaOnlySm);
  const isMdOnly = useMediaQuery(sMediaOnlyMd);
  const isLgOnly = useMediaQuery(sMediaOnlyLg);
  const isXlOnly = useMediaQuery(sMediaOnlyXl);

  // Max queries
  const isXsDown = useMediaQuery(sMediaMaxXs);
  const isSmDown = useMediaQuery(sMediaMaxSm);
  const isMdDown = useMediaQuery(sMediaMaxMd);
  const isLgDown = useMediaQuery(sMediaMaxLg);
  const isXlDown = useMediaQuery(sMediaMaxXl);

  // Range queries
  const isMobile = useMediaQuery(sMediaMobile);
  const isTabletDesktop = useMediaQuery(sMediaTabletDesktop);

  // If specific type/breakpoint requested
  if (type && breakpoint) {
    const queries = {
      min: {
        xs: isXsUp,
        sm: isSmUp,
        md: isMdUp,
        lg: isLgUp,
        xl: isXlUp,
        "2xl": is2xlUp,
      },
      max: {
        xs: isXsDown,
        sm: isSmDown,
        md: isMdDown,
        lg: isLgDown,
        xl: isXlDown,
        "2xl": false, // No max-2xl equivalent
      },
      only: {
        xs: isXsOnly,
        sm: isSmOnly,
        md: isMdOnly,
        lg: isLgOnly,
        xl: isXlOnly,
        "2xl": is2xlUp, // 2xl+ is effectively "only" 2xl
      },
    };

    return queries[type][breakpoint];
  }

  // Determine current breakpoint
  const getCurrentBreakpoint = (): BreakpointName => {
    // Use context if available (for preview frames)
    if (contextBreakpoint) {
      return contextBreakpoint;
    }

    // Otherwise use media queries
    if (is2xlUp) return "2xl";
    if (isXlUp) return "xl";
    if (isLgUp) return "lg";
    if (isMdUp) return "md";
    if (isSmUp) return "sm";
    return "xs";
  };

  // Return full breakpoint object
  return {
    current: getCurrentBreakpoint(),
    isXs: isXsOnly,
    isSm: isSmOnly,
    isMd: isMdOnly,
    isLg: isLgOnly,
    isXl: isXlOnly,
    is2xl: is2xlUp,
    isMobile,
    isTablet: isMdOnly,
    isDesktop: isLgUp,
    isTabletDesktop,
  };
}
