/**
 * useHash Hook
 *
 * Tracks and updates the URL hash (e.g., #about).
 * Perfect for tab navigation, anchor links, and single-page routing.
 *
 * @example
 * ```tsx
 * function TabNavigation() {
 *   const [hash, setHash] = useHash();
 *
 *   return (
 *     <div>
 *       <button onClick={() => setHash('#home')}>Home</button>
 *       <button onClick={() => setHash('#about')}>About</button>
 *       <button onClick={() => setHash('#contact')}>Contact</button>
 *
 *       {hash === '#about' && <AboutSection />}
 *     </div>
 *   );
 * }
 *
 * // Anchor navigation
 * function TableOfContents() {
 *   const [activeSection] = useHash();
 *
 *   return (
 *     <nav>
 *       <a href="#intro" className={activeSection === '#intro' ? 'active' : ''}>
 *         Introduction
 *       </a>
 *     </nav>
 *   );
 * }
 * ```
 *
 * Features:
 * - Read and update URL hash
 * - Listens to hash changes (back/forward button)
 * - SSR-safe
 * - Includes # prefix automatically
 * - Type-safe
 *
 * @returns Tuple of [hash, setHash]
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useEffect, useState } from "react";

export function useHash(): [string, (hash: string) => void] {
  const getInitialHash = (): string => {
    if (typeof window === "undefined") return "";
    return window.location.hash;
  };

  const [hash, setHashState] = useState(getInitialHash);

  const setHash = useCallback((newHash: string) => {
    if (typeof window === "undefined") return;

    const hashWithPrefix = newHash.startsWith("#") ? newHash : `#${newHash}`;
    window.location.hash = hashWithPrefix;
    setHashState(hashWithPrefix);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      setHashState(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return [hash, setHash];
}
