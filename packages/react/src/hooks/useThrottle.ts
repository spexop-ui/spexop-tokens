/**
 * useThrottle Hook
 *
 * Returns a throttled callback that only executes at most once per delay period.
 * Essential for rate-limiting frequent events like scroll, resize, and mousemove.
 *
 * @example
 * ```tsx
 * function ScrollTracker() {
 *   const [scrollPos, setScrollPos] = useState(0);
 *
 *   const handleScroll = useThrottle(() => {
 *     setScrollPos(window.scrollY);
 *   }, 100);
 *
 *   useEffect(() => {
 *     window.addEventListener('scroll', handleScroll);
 *     return () => window.removeEventListener('scroll', handleScroll);
 *   }, [handleScroll]);
 *
 *   return <div>Scroll position: {scrollPos}px</div>;
 * }
 *
 * // With resize handler
 * function ResponsiveComponent() {
 *   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 *
 *   const handleResize = useThrottle(() => {
 *     setWindowWidth(window.innerWidth);
 *   }, 200);
 *
 *   useEffect(() => {
 *     window.addEventListener('resize', handleResize);
 *     return () => window.removeEventListener('resize', handleResize);
 *   }, [handleResize]);
 *
 *   return <div>Width: {windowWidth}px</div>;
 * }
 * ```
 *
 * Features:
 * - Rate-limits function execution
 * - Guarantees execution at regular intervals
 * - Trailing execution option
 * - Automatic cleanup
 * - Type-safe with generics
 * - Memoized return value
 *
 * @param callback - Function to throttle
 * @param delay - Minimum time between executions in milliseconds (default: 300)
 * @returns Throttled callback function
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useRef } from "react";

export function useThrottle<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay = 300,
): T {
  const lastRan = useRef(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  // Store callback in ref to always use latest version
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const throttled = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRan.current;

      if (timeSinceLastRun >= delay) {
        // Enough time has passed, execute immediately
        callbackRef.current(...args);
        lastRan.current = now;
      } else {
        // Not enough time has passed, schedule for later (trailing execution)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          callbackRef.current(...args);
          lastRan.current = Date.now();
        }, delay - timeSinceLastRun);
      }
    },
    [delay],
  ) as T;

  return throttled;
}
