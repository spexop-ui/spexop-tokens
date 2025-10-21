/**
 * usePrevious Hook
 *
 * Returns the previous value of a variable across renders.
 * Useful for comparing current and previous values, animations, and transitions.
 *
 * @example
 * ```tsx
 * function Counter() {
 *   const [count, setCount] = useState(0);
 *   const previousCount = usePrevious(count);
 *
 *   return (
 *     <div>
 *       <p>Current: {count}</p>
 *       <p>Previous: {previousCount}</p>
 *       <button onClick={() => setCount(count + 1)}>Increment</button>
 *     </div>
 *   );
 * }
 *
 * // With comparison
 * function AnimatedValue({ value }) {
 *   const previousValue = usePrevious(value);
 *   const isIncreasing = value > (previousValue ?? 0);
 *
 *   return (
 *     <div className={isIncreasing ? 'increasing' : 'decreasing'}>
 *       {value}
 *     </div>
 *   );
 * }
 *
 * // With object comparison
 * function UserProfile({ user }) {
 *   const previousUser = usePrevious(user);
 *
 *   useEffect(() => {
 *     if (previousUser && previousUser.id !== user.id) {
 *       console.log('User changed:', previousUser.id, '->', user.id);
 *     }
 *   }, [user, previousUser]);
 *
 *   return <div>{user.name}</div>;
 * }
 * ```
 *
 * Features:
 * - Returns previous value from last render
 * - Returns undefined on first render
 * - Works with any type (generic)
 * - Minimal re-render overhead
 * - Type-safe
 *
 * @param value - Current value to track
 * @returns Previous value (undefined on first render)
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T | undefined {
  // Store current value in ref
  const ref = useRef<T | undefined>(undefined as T | undefined);

  // Update ref after render
  useEffect(() => {
    ref.current = value;
  });

  // Return previous value (happens before update in useEffect)
  return ref.current;
}
