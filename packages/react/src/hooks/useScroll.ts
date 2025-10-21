/**
 * useScroll Hook
 *
 * Tracks scroll position with direction and velocity.
 * Perfect for scroll effects, back-to-top buttons, and headers.
 *
 * @example
 * ```tsx
 * function ScrollToTop() {
 *   const { y, direction } = useScroll();
 *
 *   return y > 300 ? (
 *     <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
 *       ↑ Back to Top
 *     </button>
 *   ) : null;
 * }
 *
 * // Hide header on scroll down
 * function Header() {
 *   const { direction } = useScroll();
 *
 *   return (
 *     <header style={{
 *       transform: direction === 'down' ? 'translateY(-100%)' : 'translateY(0)',
 *       transition: 'transform 0.3s'
 *     }}>
 *       Navigation
 *     </header>
 *   );
 * }
 * ```
 *
 * Features:
 * - X and Y scroll position
 * - Scroll direction (up/down/left/right)
 * - Debounced for performance
 * - SSR-safe
 * - Automatic cleanup
 *
 * @param throttleMs - Throttle delay in milliseconds (default: 100)
 * @returns Scroll state object
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useEffect, useState } from "react";

export interface ScrollState {
  x: number;
  y: number;
  direction: "up" | "down" | "left" | "right" | null;
}

export function useScroll(throttleMs = 100): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    x: typeof window !== "undefined" ? window.scrollX : 0,
    y: typeof window !== "undefined" ? window.scrollY : 0,
    direction: null,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastX = window.scrollX;
    let lastY = window.scrollY;
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const currentX = window.scrollX;
        const currentY = window.scrollY;

        let direction: ScrollState["direction"] = null;

        if (currentY > lastY) {
          direction = "down";
        } else if (currentY < lastY) {
          direction = "up";
        } else if (currentX > lastX) {
          direction = "right";
        } else if (currentX < lastX) {
          direction = "left";
        }

        setScrollState({
          x: currentX,
          y: currentY,
          direction,
        });

        lastX = currentX;
        lastY = currentY;
      }, throttleMs);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [throttleMs]);

  return scrollState;
}
