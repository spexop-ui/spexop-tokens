/**
 * DebugProvider - Debug mode context for visual component debugging
 * Uses border-based visualization (Refined Minimalism - "Borders before shadows")
 *
 * Features:
 * - Visual breakpoint indicator
 * - Component boundary visualization
 * - Token value display
 * - Performance metrics
 * - Accessibility highlighting
 * - LocalStorage persistence
 * - Screen reader announcements
 * - Keyboard shortcut (Ctrl+Shift+D / Cmd+Shift+D)
 *
 * @example
 * ```tsx
 * <DebugProvider initialEnabled={false} storageKey="my-debug-mode">
 *   <App />
 * </DebugProvider>
 * ```
 */

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useBreakpoint } from "../../hooks/index.js";
import styles from "./DebugProvider.module.css";
import type {
  DebugContextValue,
  DebugProviderProps,
  DebugState,
} from "./DebugProvider.types.js";

// Create context
const DebugContext = createContext<DebugContextValue | undefined>(undefined);

// Constants
const DEFAULT_STORAGE_KEY = "spexop-debug-mode";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get stored debug state from localStorage
 */
function getStoredDebugState(storageKey: string): boolean | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(storageKey);
    return stored === "true";
  } catch (error) {
    console.warn("Failed to read debug state from localStorage:", error);
    return null;
  }
}

/**
 * Save debug state to localStorage
 */
function setStoredDebugState(storageKey: string, enabled: boolean): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(storageKey, String(enabled));
  } catch (error) {
    console.warn("Failed to save debug state to localStorage:", error);
  }
}

/**
 * DebugProvider Component
 * Provides debug mode state and controls for visual debugging
 */
export function DebugProvider({
  children,
  initialEnabled = false,
  defaultOptions = {},
  storageKey = DEFAULT_STORAGE_KEY,
  disableStorage = false,
}: DebugProviderProps) {
  const { current } = useBreakpoint();

  // Initialize debug state with localStorage persistence
  const [enabled, setEnabledState] = useState<boolean>(() => {
    if (!disableStorage && typeof window !== "undefined") {
      const stored = getStoredDebugState(storageKey);
      if (stored !== null) return stored;
    }
    return initialEnabled;
  });

  const [options, setOptions] = useState<Omit<DebugState, "enabled">>({
    showBreakpoint: true,
    showTokens: true,
    showBoundaries: true,
    showHierarchy: true,
    showSpacing: false,
    showAccessibility: false,
    showPerformance: false,
    ...defaultOptions,
  });

  // Track previous breakpoint for announcements
  const [prevBreakpoint, setPrevBreakpoint] = useState(current);

  // Set enabled with persistence
  const setEnabled = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      setEnabledState((prev) => {
        const newState = typeof value === "function" ? value(prev) : value;

        // Persist to localStorage
        if (!disableStorage) {
          setStoredDebugState(storageKey, newState);
        }

        if (process.env.NODE_ENV === "development") {
          console.log(
            `[Spexop Debug] Debug mode ${newState ? "enabled" : "disabled"}`,
          );
        }

        return newState;
      });
    },
    [disableStorage, storageKey],
  );

  // Toggle debug mode
  const toggle = useCallback(() => {
    setEnabled((prev) => !prev);
  }, [setEnabled]);

  // Update debug options
  const updateOptions = useCallback(
    (newOptions: Partial<Omit<DebugState, "enabled">>) => {
      setOptions((prev) => ({ ...prev, ...newOptions }));
    },
    [],
  );

  // Keyboard shortcut: Ctrl+Shift+D (or Cmd+Shift+D on Mac)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.key === "D") {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  // Track breakpoint changes for announcements
  useEffect(() => {
    if (current !== prevBreakpoint) {
      setPrevBreakpoint(current);
    }
  }, [current, prevBreakpoint]);

  // Context value with proper memoization
  const value: DebugContextValue = useMemo(
    () => ({
      enabled,
      ...options,
      toggle,
      setEnabled,
      updateOptions,
    }),
    [enabled, options, toggle, setEnabled, updateOptions],
  );

  return (
    <DebugContext.Provider value={value}>
      {enabled && options.showBreakpoint && (
        <>
          <div
            className={styles.breakpointIndicator}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            aria-label={`Debug mode active. Current breakpoint: ${current}`}
          >
            <div className={styles.indicatorContent}>
              <span className={styles.indicatorLabel}>Breakpoint:</span>
              <span className={styles.indicatorValue}>{current}</span>
              <span
                className={styles.indicatorDot}
                data-breakpoint={current}
                aria-hidden="true"
              />
            </div>
          </div>
          {/* Screen reader announcement for debug mode state changes */}
          <div
            className={styles.srOnly}
            aria-live="assertive"
            aria-atomic="true"
          >
            {enabled
              ? `Debug mode enabled. Current breakpoint: ${current}.`
              : "Debug mode disabled."}
          </div>
        </>
      )}
      {children}
    </DebugContext.Provider>
  );
}

/**
 * useDebug Hook
 * Access debug mode state and controls
 *
 * @returns {DebugContextValue} Debug context value with state and controls
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { enabled, toggle, updateOptions } = useDebug();
 *
 *   return (
 *     <button onClick={toggle}>
 *       Debug: {enabled ? 'ON' : 'OFF'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useDebug(): DebugContextValue {
  const context = React.useContext(DebugContext);
  if (context === undefined) {
    // Return default values if not in DebugProvider
    return {
      enabled: false,
      showBreakpoint: false,
      showTokens: false,
      showBoundaries: false,
      showHierarchy: false,
      showSpacing: false,
      showAccessibility: false,
      showPerformance: false,
      toggle: () => {},
      setEnabled: () => {},
      updateOptions: () => {},
    };
  }
  return context;
}

// Export DebugContext for advanced use cases
export { DebugContext };
