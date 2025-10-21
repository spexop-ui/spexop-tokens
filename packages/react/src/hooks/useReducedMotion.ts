/**
 * useReducedMotion Hook
 *
 * Detects if the user has requested reduced motion through their system preferences.
 * Essential for WCAG 2.1 compliance (2.3.3 Animation from Interactions).
 *
 * @example
 * ```tsx
 * function AnimatedComponent() {
 *   const prefersReducedMotion = useReducedMotion();
 *
 *   return (
 *     <div
 *       style={{
 *         transition: prefersReducedMotion ? 'none' : 'all 0.3s ease',
 *       }}
 *     >
 *       Content
 *     </div>
 *   );
 * }
 *
 * // With animation library
 * function Component() {
 *   const shouldReduceMotion = useReducedMotion();
 *
 *   return (
 *     <motion.div
 *       animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
 *     >
 *       Content
 *     </motion.div>
 *   );
 * }
 * ```
 *
 * Features:
 * - Respects prefers-reduced-motion media query
 * - Updates dynamically when system preference changes
 * - SSR-safe (returns false on server)
 * - WCAG 2.1 Level AA compliant
 * - Essential for accessible animations
 *
 * @returns Boolean indicating if user prefers reduced motion
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useMediaQuery } from "./useMediaQuery.js";

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
