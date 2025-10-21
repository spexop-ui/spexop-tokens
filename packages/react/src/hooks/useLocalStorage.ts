/**
 * useLocalStorage Hook
 *
 * Syncs state with localStorage with automatic JSON serialization.
 * Provides persistent state across browser sessions with cross-tab sync.
 *
 * @example
 * ```tsx
 * function ThemeSelector() {
 *   const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
 *
 *   return (
 *     <div>
 *       <p>Current theme: {theme}</p>
 *       <button onClick={() => setTheme('dark')}>Dark Mode</button>
 *       <button onClick={() => setTheme('light')}>Light Mode</button>
 *       <button onClick={removeTheme}>Reset</button>
 *     </div>
 *   );
 * }
 *
 * // With object
 * function UserPreferences() {
 *   const [prefs, setPrefs] = useLocalStorage('user-prefs', {
 *     notifications: true,
 *     language: 'en'
 *   });
 *
 *   return (
 *     <div>
 *       <label>
 *         <input
 *           type="checkbox"
 *           checked={prefs.notifications}
 *           onChange={(e) => setPrefs({ ...prefs, notifications: e.target.checked })}
 *         />
 *         Enable notifications
 *       </label>
 *     </div>
 *   );
 * }
 *
 * // With array
 * function RecentItems() {
 *   const [items, setItems] = useLocalStorage<string[]>('recent-items', []);
 *
 *   const addItem = (item: string) => {
 *     setItems([item, ...items.slice(0, 9)]); // Keep last 10
 *   };
 *
 *   return <div>{items.map(item => <div key={item}>{item}</div>)}</div>;
 * }
 * ```
 *
 * Features:
 * - Automatic JSON serialization/deserialization
 * - Cross-tab synchronization
 * - Type-safe with generics
 * - SSR-safe
 * - Error handling for quota exceeded
 * - Remove function to clear storage
 * - Function updater support
 *
 * @param key - localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns Tuple of [value, setValue, removeValue]
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // SSR-safe initialization
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Set value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      if (typeof window === "undefined") {
        console.warn(
          `Tried setting localStorage key "${key}" during server-side rendering`,
        );
        return;
      }

      try {
        // Allow value to be a function for same API as useState
        const newValue = value instanceof Function ? value(storedValue) : value;

        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(newValue));

        // Save state
        setStoredValue(newValue);

        // Dispatch custom event for cross-tab sync
        window.dispatchEvent(
          new StorageEvent("storage", {
            key,
            newValue: JSON.stringify(newValue),
            storageArea: window.localStorage,
          }),
        );
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    if (typeof window === "undefined") {
      console.warn(
        `Tried removing localStorage key "${key}" during server-side rendering`,
      );
      return;
    }

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);

      // Dispatch custom event for cross-tab sync
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: null,
          storageArea: window.localStorage,
        }),
      );
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for storage changes (cross-tab sync)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== key || e.storageArea !== window.localStorage) return;

      try {
        if (e.newValue === null) {
          setStoredValue(initialValue);
        } else {
          setStoredValue(JSON.parse(e.newValue) as T);
        }
      } catch (error) {
        console.warn(`Error parsing localStorage key "${key}":`, error);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
