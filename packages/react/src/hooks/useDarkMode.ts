/**
 * useDarkMode Hook
 *
 * Manages dark mode with system preference detection and manual override.
 * Automatically syncs with system preference and persists user choice.
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const [isDark, toggleDark] = useDarkMode();
 *
 *   return (
 *     <button onClick={toggleDark}>
 *       {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
 *     </button>
 *   );
 * }
 *
 * // With custom storage key
 * function App() {
 *   const [isDark] = useDarkMode('app-theme');
 *
 *   return (
 *     <div className={isDark ? 'dark' : 'light'}>
 *       <Content />
 *     </div>
 *   );
 * }
 * ```
 *
 * Features:
 * - System preference detection
 * - Manual toggle with persistence
 * - localStorage sync
 * - SSR-safe
 * - Respects prefers-color-scheme
 *
 * @param key - localStorage key (default: 'dark-mode')
 * @returns Tuple of [isDark, toggleDark, setDark]
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import { useMediaQuery } from "./useMediaQuery.js";

export function useDarkMode(
  key = "dark-mode",
): [boolean, () => void, (value: boolean) => void] {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDark, setIsDark, removeIsDark] = useLocalStorage<boolean | null>(
    key,
    null,
  );

  // Use system preference if no manual override
  const effectiveIsDark = isDark !== null ? isDark : prefersDark;

  const toggleDark = () => {
    setIsDark(!effectiveIsDark);
  };

  useEffect(() => {
    if (typeof document === "undefined") return;

    // Apply to document element
    if (effectiveIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [effectiveIsDark]);

  return [effectiveIsDark, toggleDark, setIsDark];
}
