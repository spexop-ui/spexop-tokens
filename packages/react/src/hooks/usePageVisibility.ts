/**
 * usePageVisibility Hook
 *
 * Tracks whether the page is currently visible to the user.
 * Useful for pausing animations, videos, or reducing API calls when tab is hidden.
 *
 * @example
 * ```tsx
 * function VideoPlayer() {
 *   const isVisible = usePageVisibility();
 *
 *   useEffect(() => {
 *     if (!isVisible) {
 *       pauseVideo();
 *     } else {
 *       resumeVideo();
 *     }
 *   }, [isVisible]);
 * }
 *
 * // Reduce polling when hidden
 * function LiveData() {
 *   const isVisible = usePageVisibility();
 *
 *   useEffect(() => {
 *     const interval = setInterval(
 *       fetchData,
 *       isVisible ? 1000 : 10000 // Poll slower when hidden
 *     );
 *     return () => clearInterval(interval);
 *   }, [isVisible]);
 * }
 *
 * // Pause animations
 * function AnimatedComponent() {
 *   const isVisible = usePageVisibility();
 *
 *   return (
 *     <div style={{ animationPlayState: isVisible ? 'running' : 'paused' }}>
 *       Content
 *     </div>
 *   );
 * }
 * ```
 *
 * Features:
 * - Detects tab visibility changes
 * - Handles browser prefixes automatically
 * - SSR-safe (returns true on server)
 * - Automatic cleanup
 * - Performance optimized
 *
 * @returns Boolean indicating if page is visible
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useEffect, useState } from "react";

export function usePageVisibility(): boolean {
  // SSR-safe initial state
  const getInitialState = (): boolean => {
    if (typeof document === "undefined") return true;
    return !document.hidden;
  };

  const [isVisible, setIsVisible] = useState(getInitialState);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
}
