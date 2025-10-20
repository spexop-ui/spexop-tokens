import {
  sMediaMaxLg,
  sMediaMaxMd,
  sMediaMaxSm,
  sMediaMaxXl,
  sMediaMaxXs,
  sMediaMin2xl,
  sMediaMinLg,
  sMediaMinMd,
  sMediaMinSm,
  sMediaMinXl,
  sMediaMinXs,
  sMediaMobile,
  sMediaOnlyLg,
  sMediaOnlyMd,
  sMediaOnlySm,
  sMediaOnlyXl,
  sMediaOnlyXs,
  sMediaTabletDesktop,
} from "@spexop/tokens";
import { createContext, useContext } from "react";
import { useMediaQuery } from "./useMediaQuery.js";

export type BreakpointName = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

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
