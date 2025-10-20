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

import { useEffect } from "react";

export function useEscapeKey(
  onEscape: () => void,
  isActive: boolean = true,
): void {
  useEffect(() => {
    // Only run when active
    if (!isActive) return;

    // Only run in browser
    if (typeof window === "undefined") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onEscape, isActive]);
}
