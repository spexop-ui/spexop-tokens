import { useEffect, useState } from "react";

/**
 * Custom hook for media query matching
 *
 * @param query - Media query string (without @media wrapper)
 * @returns Boolean indicating if the media query matches
 *
 * @example
 * ```tsx
 * import { sMediaMinMd } from '@spexop/tokens';
 *
 * const isTablet = useMediaQuery(sMediaMinMd);
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Handle server-side rendering
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener with fallback for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}
