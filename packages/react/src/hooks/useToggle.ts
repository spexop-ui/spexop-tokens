/**
 * useToggle Hook
 *
 * Manages boolean state with convenient toggle and set functions.
 * Common pattern for managing open/closed, visible/hidden states.
 *
 * @example
 * ```tsx
 * function Modal() {
 *   const [isOpen, toggle, setIsOpen] = useToggle(false);
 *
 *   return (
 *     <>
 *       <button onClick={toggle}>Toggle Modal</button>
 *       <button onClick={() => setIsOpen(true)}>Open Modal</button>
 *       <button onClick={() => setIsOpen(false)}>Close Modal</button>
 *
 *       {isOpen && <div>Modal content</div>}
 *     </>
 *   );
 * }
 *
 * // With default open state
 * function Sidebar() {
 *   const [isOpen, toggle] = useToggle(true);
 *
 *   return (
 *     <>
 *       <button onClick={toggle}>Toggle Sidebar</button>
 *       <aside style={{ display: isOpen ? 'block' : 'none' }}>
 *         Sidebar content
 *       </aside>
 *     </>
 *   );
 * }
 * ```
 *
 * Features:
 * - Simple boolean state management
 * - Memoized toggle function (no re-render on function reference)
 * - Direct set function for explicit control
 * - Type-safe return tuple
 *
 * @param initialValue - Initial boolean state (default: false)
 * @returns Tuple of [value, toggle, setValue]
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useState } from "react";

export function useToggle(
  initialValue = false,
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  // Memoized toggle function
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle, setValue];
}
