import { useEffect, useRef } from "react";
import { type BreakpointName, useBreakpoint } from "./useBreakpoint.js";

/**
 * Responsive value object for different breakpoints
 */
export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}

/**
 * Performance tracking for useResponsiveValue (development only)
 */
interface PerformanceMetrics {
  callCount: number;
  totalTime: number;
  maxTime: number;
  rerenders: number;
  lastValue: unknown;
  warningShown: boolean; // Track if warning already shown
}

// Global performance tracking (development only)
const performanceMetrics = new Map<string, PerformanceMetrics>();

// Global flag to enable/disable performance warnings (opt-in)
let performanceWarningsEnabled = false;

/**
 * Enable performance warnings (development only)
 */
export function enablePerformanceWarnings(): void {
  if (process.env.NODE_ENV === "development") {
    performanceWarningsEnabled = true;
    console.log("[Spexop Performance] Performance warnings enabled");
  }
}

/**
 * Disable performance warnings (development only)
 */
export function disablePerformanceWarnings(): void {
  if (process.env.NODE_ENV === "development") {
    performanceWarningsEnabled = false;
    console.log("[Spexop Performance] Performance warnings disabled");
  }
}

function trackPerformance(
  key: string,
  executionTime: number,
  value: unknown,
): void {
  if (process.env.NODE_ENV !== "development") return;

  const metrics = performanceMetrics.get(key) || {
    callCount: 0,
    totalTime: 0,
    maxTime: 0,
    rerenders: 0,
    lastValue: undefined,
    warningShown: false,
  };

  metrics.callCount++;
  metrics.totalTime += executionTime;
  metrics.maxTime = Math.max(metrics.maxTime, executionTime);

  // Check if value changed (unnecessary re-render if same)
  if (metrics.callCount > 1 && metrics.lastValue === value) {
    metrics.rerenders++;
  }

  metrics.lastValue = value;

  // Only show warnings if explicitly enabled
  if (performanceWarningsEnabled && !metrics.warningShown) {
    // Warn about excessive re-renders (only once per instance)
    if (metrics.rerenders >= 100) {
      console.warn(
        `[Spexop Performance] useResponsiveValue has ${metrics.rerenders} re-renders with unchanged value. Consider memoization.`,
      );
      metrics.warningShown = true;
    }

    // Warn if execution is slow (only first time)
    if (executionTime > 100 && metrics.maxTime <= 100) {
      console.warn(
        `[Spexop Performance] useResponsiveValue took ${executionTime.toFixed(2)}ms (threshold: 100ms)`,
      );
    }
  }

  performanceMetrics.set(key, metrics);
}

/**
 * Get performance report (development only)
 */
export function getResponsiveValuePerformance(): Map<
  string,
  PerformanceMetrics
> | null {
  if (process.env.NODE_ENV !== "development") return null;
  return new Map(performanceMetrics);
}

/**
 * Hook to get a responsive value based on current breakpoint
 * Uses mobile-first approach (values cascade up)
 *
 * @param value - Single value or responsive object
 * @returns The value for the current breakpoint
 *
 * @example
 * ```tsx
 * const padding = useResponsiveValue({
 *   xs: '16px',
 *   md: '24px',
 *   lg: '32px'
 * });
 *
 * const columns = useResponsiveValue({
 *   xs: 1,
 *   sm: 2,
 *   lg: 3
 * });
 * ```
 */
export function useResponsiveValue<T>(value: T | ResponsiveValue<T>): T {
  const { current } = useBreakpoint();
  const keyRef = useRef<string>("");

  // Performance tracking (development only) - only initialize once
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !keyRef.current) {
      // Generate a unique key for this hook instance (once)
      keyRef.current = `responsive-${Math.random().toString(36).substr(2, 9)}`;
    }
  }, []); // Empty dependency array - only run once on mount

  // Start performance timer (development only)
  const perfStart =
    process.env.NODE_ENV === "development" ? performance.now() : 0;

  // If not a responsive object, return as-is
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    if (process.env.NODE_ENV === "development") {
      const perfEnd = performance.now();
      trackPerformance(keyRef.current, perfEnd - perfStart, value);
    }
    return value as T;
  }

  const responsiveValue = value as ResponsiveValue<T>;

  // Define breakpoint hierarchy (mobile-first)
  const breakpointOrder: BreakpointName[] = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
  ];
  const currentIndex = breakpointOrder.indexOf(current);

  // Look for value at current breakpoint and cascade down
  for (let i = currentIndex; i >= 0; i--) {
    const breakpoint = breakpointOrder[i];
    if (responsiveValue[breakpoint] !== undefined) {
      const result = responsiveValue[breakpoint] as T;
      if (process.env.NODE_ENV === "development") {
        const perfEnd = performance.now();
        trackPerformance(keyRef.current, perfEnd - perfStart, result);
      }
      return result;
    }
  }

  // Fallback: return the first available value
  for (const breakpoint of breakpointOrder) {
    if (responsiveValue[breakpoint] !== undefined) {
      const result = responsiveValue[breakpoint] as T;
      if (process.env.NODE_ENV === "development") {
        const perfEnd = performance.now();
        trackPerformance(keyRef.current, perfEnd - perfStart, result);
      }
      return result;
    }
  }

  // This should never happen if the object has any values
  const result = undefined as unknown as T;
  if (process.env.NODE_ENV === "development") {
    const perfEnd = performance.now();
    trackPerformance(keyRef.current, perfEnd - perfStart, result);
  }
  return result;
}

/**
 * Utility type for making component props responsive
 *
 * @example
 * ```tsx
 * interface MyComponentProps {
 *   size: ResponsiveProp<"small" | "medium" | "large">;
 *   padding: ResponsiveProp<string>;
 * }
 * ```
 */
export type ResponsiveProp<T> = T | ResponsiveValue<T>;
