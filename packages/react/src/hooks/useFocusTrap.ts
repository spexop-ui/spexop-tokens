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

// Comprehensive selector for focusable elements with ARIA compliance
const FOCUSABLE_SELECTOR = [
  'button:not([disabled]):not([aria-hidden="true"])',
  '[href]:not([aria-hidden="true"])',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden="true"])',
  'select:not([disabled]):not([aria-hidden="true"])',
  'textarea:not([disabled]):not([aria-hidden="true"])',
  '[tabindex]:not([tabindex="-1"]):not([aria-hidden="true"])',
  'audio[controls]:not([aria-hidden="true"])',
  'video[controls]:not([aria-hidden="true"])',
  'details:not([aria-hidden="true"])',
  'summary:not([aria-hidden="true"])',
  '[contenteditable]:not([contenteditable="false"]):not([aria-hidden="true"])',
].join(",");

/**
 * Get all focusable elements within a container
 * Respects ARIA hidden, inert attribute, and visibility
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );

  // Filter out hidden elements and respect inert
  return elements.filter((el) => {
    const style = window.getComputedStyle(el);
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      !el.hasAttribute("inert") &&
      !el.closest("[inert]")
    );
  });
}

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
      const focusableElements = getFocusableElements(container);

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
    // Use requestAnimationFrame for better timing
    const focusFirstElement = () => {
      const focusableElements = getFocusableElements(container);
      if (focusableElements.length > 0) {
        focusableElements[0]?.focus();
      }
    };

    const rafId = requestAnimationFrame(focusFirstElement);

    // Add listener
    document.addEventListener("keydown", handleTab);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("keydown", handleTab);
    };
  }, [isActive, containerRef]);
}
