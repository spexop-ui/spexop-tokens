/**
 * useIdle Hook
 *
 * Detects when the user has been inactive for a specified duration.
 * Essential for auto-logout, pause features, and activity monitoring.
 *
 * @example
 * ```tsx
 * function AutoLogout() {
 *   const isIdle = useIdle(5 * 60 * 1000); // 5 minutes
 *
 *   useEffect(() => {
 *     if (isIdle) {
 *       showWarning();
 *     }
 *   }, [isIdle]);
 * }
 *
 * // Pause video when idle
 * function VideoPlayer() {
 *   const isIdle = useIdle(30000); // 30 seconds
 *
 *   useEffect(() => {
 *     if (isIdle) {
 *       pauseVideo();
 *     } else {
 *       resumeVideo();
 *     }
 *   }, [isIdle]);
 * }
 * ```
 *
 * Features:
 * - Configurable idle timeout
 * - Tracks mouse, keyboard, touch, and scroll events
 * - Debounced for performance
 * - Automatic cleanup
 * - SSR-safe
 *
 * @param timeout - Idle timeout in milliseconds (default: 60000 = 1 minute)
 * @returns Boolean indicating if user is idle
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useEffect, useState } from "react";

export function useIdle(timeout = 60000): boolean {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsIdle(true);
      }, timeout);
    };

    // Initialize timeout
    handleActivity();

    // Activity events
    const events = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
    ];

    for (const event of events) {
      window.addEventListener(event, handleActivity);
    }

    return () => {
      clearTimeout(timeoutId);
      for (const event of events) {
        window.removeEventListener(event, handleActivity);
      }
    };
  }, [timeout]);

  return isIdle;
}
