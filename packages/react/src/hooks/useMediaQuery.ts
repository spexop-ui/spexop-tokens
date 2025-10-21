import { useEffect, useState } from "react";

/**
 * Custom hook for media query matching
 *
 * @param query - Media query string (without @media wrapper)
 * @returns Boolean indicating if the media query matches
 *
 * @example
 * ```tsx
 * // Use with breakpoint constants
 * const isTablet = useMediaQuery('(min-width: 768px)');
 *
 * // Dark mode
 * const isDark = useMediaQuery('(prefers-color-scheme: dark)');
 *
 * // Reduced motion (accessibility)
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 * ```
 */
export function useMediaQuery(query: string): boolean {
  // SSR-safe initial value - prevents hydration mismatch
  const getInitialMatches = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getInitialMatches);

  useEffect(() => {
    // Handle server-side rendering
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);

    // Update state with current value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers only (no deprecated API support)
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
