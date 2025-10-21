/**
 * useEscapeKey Hook
 *
 * Triggers a callback when Escape key is pressed.
 * Commonly used to close modals, drawers, overlays, and sidebars.
 *
 * @example
 * ```tsx
 * function Modal({ onClose }) {
 *   useEscapeKey(onClose);
 *
 *   return <div>Modal content</div>;
 * }
 *
 * // With conditional activation
 * function Sidebar({ isOpen, onClose }) {
 *   useEscapeKey(onClose, isOpen); // Only active when open
 *
 *   return <aside>Sidebar content</aside>;
 * }
 * ```
 *
 * Features:
 * - Triggers callback on Escape key press
 * - Optional activation toggle
 * - Cleans up event listener on unmount
 * - SSR-safe
 *
 * @param onEscape - Callback to trigger when Escape is pressed
 * @param isActive - Whether the hook is active (default: true)
 */

import { useEffect, useRef } from "react";

export function useEscapeKey(onEscape: () => void, isActive = true): void {
  // Store callback in ref to prevent listener churn
  const callbackRef = useRef(onEscape);

  // Update ref when callback changes
  useEffect(() => {
    callbackRef.current = onEscape;
  });

  useEffect(() => {
    // Only run when active
    if (!isActive) return;

    // Only run in browser
    if (typeof window === "undefined") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callbackRef.current();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive]); // Only depends on isActive now
}
