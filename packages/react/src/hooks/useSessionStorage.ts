/**
 * useSessionStorage Hook
 *
 * Syncs state with sessionStorage with automatic JSON serialization.
 * Provides persistent state within the current browser session (tab).
 *
 * @example
 * ```tsx
 * function FormWizard() {
 *   const [formData, setFormData, clearFormData] = useSessionStorage('wizard-form', {
 *     step: 1,
 *     data: {}
 *   });
 *
 *   return (
 *     <div>
 *       <p>Step: {formData.step}</p>
 *       <button onClick={() => setFormData({ ...formData, step: formData.step + 1 })}>
 *         Next
 *       </button>
 *       <button onClick={clearFormData}>Start Over</button>
 *     </div>
 *   );
 * }
 *
 * // Temporary filter state
 * function ProductList() {
 *   const [filters, setFilters] = useSessionStorage('product-filters', {
 *     category: 'all',
 *     priceRange: [0, 1000]
 *   });
 *
 *   return (
 *     <div>
 *       <select
 *         value={filters.category}
 *         onChange={(e) => setFilters({ ...filters, category: e.target.value })}
 *       >
 *         <option value="all">All</option>
 *         <option value="electronics">Electronics</option>
 *       </select>
 *     </div>
 *   );
 * }
 *
 * // Shopping cart (session only)
 * function ShoppingCart() {
 *   const [cart, setCart] = useSessionStorage<CartItem[]>('cart', []);
 *
 *   const addItem = (item: CartItem) => {
 *     setCart([...cart, item]);
 *   };
 *
 *   return <div>{cart.length} items in cart</div>;
 * }
 * ```
 *
 * Features:
 * - Automatic JSON serialization/deserialization
 * - Session-only persistence (cleared on tab close)
 * - Type-safe with generics
 * - SSR-safe
 * - Error handling for quota exceeded
 * - Remove function to clear storage
 * - Function updater support
 *
 * @param key - sessionStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns Tuple of [value, setValue, removeValue]
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useState } from "react";

export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // SSR-safe initialization
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Set value to sessionStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      if (typeof window === "undefined") {
        console.warn(
          `Tried setting sessionStorage key "${key}" during server-side rendering`,
        );
        return;
      }

      try {
        // Allow value to be a function for same API as useState
        const newValue = value instanceof Function ? value(storedValue) : value;

        // Save to sessionStorage
        window.sessionStorage.setItem(key, JSON.stringify(newValue));

        // Save state
        setStoredValue(newValue);
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  // Remove value from sessionStorage
  const removeValue = useCallback(() => {
    if (typeof window === "undefined") {
      console.warn(
        `Tried removing sessionStorage key "${key}" during server-side rendering`,
      );
      return;
    }

    try {
      window.sessionStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
