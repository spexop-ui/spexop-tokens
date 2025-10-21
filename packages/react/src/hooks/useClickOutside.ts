/**
 * useClickOutside Hook
 *
 * Triggers a callback when clicking outside the referenced element.
 * Essential for closing modals, dropdowns, popovers, and other overlays.
 *
 * @example
 * ```tsx
 * function Dropdown({ isOpen, onClose }) {
 *   const dropdownRef = useRef<HTMLDivElement>(null);
 *   useClickOutside(dropdownRef, onClose, isOpen);
 *
 *   return (
 *     <div ref={dropdownRef}>
 *       Dropdown content
 *     </div>
 *   );
 * }
 * ```
 *
 * Features:
 * - Detects clicks outside the element
 * - Supports both mouse and touch events
 * - Optional activation toggle
 * - Stable callback with ref pattern
 * - Cleans up event listeners on unmount
 * - SSR-safe
 *
 * @param ref - Reference to the element to monitor
 * @param callback - Function to call when clicking outside
 * @param isActive - Whether the hook is active (default: true)
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { type RefObject, useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: (event: MouseEvent | TouchEvent) => void,
  isActive = true,
): void {
  // Store callback in ref to prevent listener churn
  const callbackRef = useRef(callback);

  // Update ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    // Only run when active
    if (!isActive) return;

    // Only run in browser
    if (typeof window === "undefined") return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Check if the click was outside the element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackRef.current(event);
      }
    };

    // Add listeners for both mouse and touch events
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, isActive]);
}
