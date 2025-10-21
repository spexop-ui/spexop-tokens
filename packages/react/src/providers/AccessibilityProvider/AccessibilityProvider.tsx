/**
 * AccessibilityProvider - Centralized accessibility preferences management
 *
 * Features:
 * - Reduced motion detection
 * - High contrast mode detection
 * - Font size preference detection
 * - Keyboard-only navigation mode
 * - Focus visible preference
 * - Link underline preference
 * - SSR-safe implementation
 * - Automatic media query detection
 *
 * @example
 * ```tsx
 * <AccessibilityProvider>
 *   <App />
 * </AccessibilityProvider>
 *
 * function Component() {
 *   const { prefersReducedMotion, prefersHighContrast } = useAccessibility();
 *
 *   return (
 *     <motion.div
 *       animate={prefersReducedMotion ? {} : { scale: 1.1 }}
 *     >
 *       Content
 *     </motion.div>
 *   );
 * }
 * ```
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  AccessibilityContextValue,
  AccessibilityProviderProps,
  AccessibilityState,
} from "./AccessibilityProvider.types.js";

// ============================================================================
// CONTEXT
// ============================================================================

const AccessibilityContext = createContext<
  AccessibilityContextValue | undefined
>(undefined);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Detect if user prefers reduced motion
 */
function detectReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Detect if user prefers high contrast
 */
function detectHighContrast(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(prefers-contrast: more)").matches ||
    window.matchMedia("(prefers-contrast: high)").matches
  );
}

/**
 * Detect if user has increased font size
 */
function detectIncreasedFontSize(): boolean {
  if (typeof window === "undefined") return false;
  const fontSize = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("font-size");
  const baseFontSize = Number.parseFloat(fontSize);
  return baseFontSize > 16; // Assume base is 16px
}

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

/**
 * AccessibilityProvider Component
 * Provides centralized accessibility preferences
 */
export function AccessibilityProvider({
  children,
  initialKeyboardOnlyMode = false,
  initialShowFocusIndicators = true,
  initialPreferLinkUnderlines = false,
}: AccessibilityProviderProps) {
  // Media query based preferences
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(detectReducedMotion);
  const [prefersHighContrast, setPrefersHighContrast] =
    useState(detectHighContrast);
  const [increasedFontSize, setIncreasedFontSize] = useState(
    detectIncreasedFontSize,
  );

  // User-controlled preferences
  const [keyboardOnlyMode, setKeyboardOnlyMode] = useState(
    initialKeyboardOnlyMode,
  );
  const [showFocusIndicators, setShowFocusIndicators] = useState(
    initialShowFocusIndicators,
  );
  const [preferLinkUnderlines, setPreferLinkUnderlines] = useState(
    initialPreferLinkUnderlines,
  );

  // Listen for reduced motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      // Update CSS variable
      document.documentElement.style.setProperty(
        "--theme-transition-duration",
        e.matches ? "0ms" : "300ms",
      );
    };

    // Set initial value
    handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    // Legacy browser support
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // Listen for high contrast changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-contrast: more)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    // Legacy browser support
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // Detect keyboard-only navigation
  useEffect(() => {
    let isKeyboardNavigation = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        isKeyboardNavigation = true;
        document.body.classList.add("keyboard-navigation");
      }
    };

    const handleMouseDown = () => {
      isKeyboardNavigation = false;
      document.body.classList.remove("keyboard-navigation");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // Apply focus indicators preference
  useEffect(() => {
    if (showFocusIndicators) {
      document.documentElement.classList.add("show-focus-indicators");
    } else {
      document.documentElement.classList.remove("show-focus-indicators");
    }
  }, [showFocusIndicators]);

  // Apply link underlines preference
  useEffect(() => {
    if (preferLinkUnderlines) {
      document.documentElement.classList.add("prefer-link-underlines");
    } else {
      document.documentElement.classList.remove("prefer-link-underlines");
    }
  }, [preferLinkUnderlines]);

  // Memoized setters
  const handleSetKeyboardOnlyMode = useCallback((enabled: boolean) => {
    setKeyboardOnlyMode(enabled);
  }, []);

  const handleSetShowFocusIndicators = useCallback((enabled: boolean) => {
    setShowFocusIndicators(enabled);
  }, []);

  const handleSetPreferLinkUnderlines = useCallback((enabled: boolean) => {
    setPreferLinkUnderlines(enabled);
  }, []);

  // Context value with proper memoization
  const value: AccessibilityContextValue = useMemo(
    () => ({
      prefersReducedMotion,
      prefersHighContrast,
      increasedFontSize,
      keyboardOnlyMode,
      showFocusIndicators,
      preferLinkUnderlines,
      setKeyboardOnlyMode: handleSetKeyboardOnlyMode,
      setShowFocusIndicators: handleSetShowFocusIndicators,
      setPreferLinkUnderlines: handleSetPreferLinkUnderlines,
    }),
    [
      prefersReducedMotion,
      prefersHighContrast,
      increasedFontSize,
      keyboardOnlyMode,
      showFocusIndicators,
      preferLinkUnderlines,
      handleSetKeyboardOnlyMode,
      handleSetShowFocusIndicators,
      handleSetPreferLinkUnderlines,
    ],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * useAccessibility Hook
 * Access accessibility preferences
 *
 * @throws Error if used outside AccessibilityProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { prefersReducedMotion, prefersHighContrast } = useAccessibility();
 *
 *   return (
 *     <div className={prefersHighContrast ? 'high-contrast' : ''}>
 *       Content
 *     </div>
 *   );
 * }
 * ```
 */
export function useAccessibility(): AccessibilityContextValue {
  const context = useContext(AccessibilityContext);

  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider. " +
        "Wrap your app with <AccessibilityProvider> to use accessibility functionality.",
    );
  }

  return context;
}

// Export context for advanced use cases
export { AccessibilityContext };
