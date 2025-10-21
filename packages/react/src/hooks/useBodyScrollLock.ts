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
 * - Supports nested overlays with lock stacking
 * - Cleans up on unmount
 * - SSR-safe (checks for browser environment)
 *
 * @param isLocked - Whether to lock body scroll
 */

import { useEffect } from "react";

// Global lock counter for nested overlays
let lockCount = 0;

export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    if (isLocked) {
      // Increment lock counter
      lockCount += 1;

      // Only apply lock on first lock
      if (lockCount === 1) {
        // Calculate scrollbar width to prevent layout shift
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;

        // Lock scroll
        document.body.style.overflow = "hidden";

        // Compensate for scrollbar disappearing
        if (scrollbarWidth > 0) {
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
      }
    }

    // Cleanup function
    return () => {
      if (isLocked) {
        // Decrement lock counter
        lockCount -= 1;

        // Only unlock when all locks are removed
        if (lockCount === 0) {
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        }
      }
    };
  }, [isLocked]);
}
