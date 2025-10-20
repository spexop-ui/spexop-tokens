/**
 * useBodyScrollLock Hook
 *
 * Locks body scroll when activated, with scrollbar width compensation
 * to prevent layout shift when scrollbar disappears.
 *
 * @example
 * ```tsx
 * function MobileOverlay({ isOpen }) {
 *   useBodyScrollLock(isOpen);
 *
 *   return <div>Overlay content</div>;
 * }
 * ```
 *
 * Features:
 * - Locks body scroll when isLocked is true
 * - Compensates for scrollbar width (prevents layout shift)
 * - Cleans up on unmount
 * - SSR-safe (checks for browser environment)
 *
 * @param isLocked - Whether to lock body scroll
 */

import { useEffect } from "react";

export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    if (isLocked) {
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Lock scroll
      document.body.style.overflow = "hidden";

      // Compensate for scrollbar disappearing
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      // Unlock scroll
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isLocked]);
}
