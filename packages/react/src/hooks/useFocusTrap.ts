/**
 * useFocusTrap Hook
 *
 * Traps focus within a container element (for modals, drawers, sidebars).
 * When Tab is pressed, cycles focus between focusable elements within the container.
 *
 * @example
 * ```tsx
 * function Modal({ isOpen }) {
 *   const modalRef = useRef<HTMLDivElement>(null);
 *   useFocusTrap(modalRef, isOpen);
 *
 *   return <div ref={modalRef}>Modal content</div>;
 * }
 * ```
 *
 * Features:
 * - Traps Tab/Shift+Tab within container
 * - Auto-focuses first focusable element when activated
 * - Wraps from last to first element (and vice versa)
 * - Cleans up on deactivation
 * - WCAG 2.2 AA compliant
 *
 * @param containerRef - Ref to container element
 * @param isActive - Whether focus trap is active
 */

import { type RefObject, useEffect } from "react";

export function useFocusTrap(
  containerRef: RefObject<HTMLElement>,
  isActive: boolean,
): void {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    // Focus trap handler
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      // Get all focusable elements
      const focusableElements = container.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if at first element, wrap to last
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab: if at last element, wrap to first
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Auto-focus first element when activated
    const firstFocusable = container.querySelector<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    // Small delay to ensure element is visible
    const focusTimeout = setTimeout(() => {
      firstFocusable?.focus();
    }, 100);

    // Add listener
    document.addEventListener("keydown", handleTab);

    // Cleanup
    return () => {
      clearTimeout(focusTimeout);
      document.removeEventListener("keydown", handleTab);
    };
  }, [isActive, containerRef]);
}
