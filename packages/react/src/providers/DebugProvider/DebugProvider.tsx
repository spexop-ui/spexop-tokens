/**
 * DebugProvider - Debug mode context for visual component debugging
 * Uses border-based visualization (Refined Minimalism - "Borders before shadows")
 */

import React, { createContext, useCallback, useEffect, useState } from "react";
import { useBreakpoint } from "../../hooks/index.js";
import styles from "./DebugProvider.module.css";
import type {
  DebugContextValue,
  DebugProviderProps,
  DebugState,
} from "./DebugProvider.types.js";

// Create context
const DebugContext = createContext<DebugContextValue | undefined>(undefined);

/**
 * DebugProvider Component
 * Provides debug mode state and controls for visual debugging
 */
export function DebugProvider({
  children,
  initialEnabled = false,
  defaultOptions = {},
}: DebugProviderProps) {
  const { current } = useBreakpoint();

  // Debug state
  const [enabled, setEnabled] = useState(initialEnabled);
  const [options, setOptions] = useState<Omit<DebugState, "enabled">>({
    showBreakpoint: true,
    showTokens: true,
    showBoundaries: true,
    showHierarchy: true,
    ...defaultOptions,
  });

  // Toggle debug mode
  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const newState = !prev;
      if (process.env.NODE_ENV === "development") {
        console.log(
          `[Spexop Debug] Debug mode ${newState ? "enabled" : "disabled"}`,
        );
      }
      return newState;
    });
  }, []);

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

  // Context value
  const value: DebugContextValue = {
    enabled,
    ...options,
    toggle,
    setEnabled,
    updateOptions,
  };

  return (
    <DebugContext.Provider value={value}>
      {enabled && options.showBreakpoint && (
        <div className={styles.breakpointIndicator}>
          <div className={styles.indicatorContent}>
            <span className={styles.indicatorLabel}>Breakpoint:</span>
            <span className={styles.indicatorValue}>{current}</span>
            <span className={styles.indicatorDot} data-breakpoint={current} />
          </div>
        </div>
      )}
      {children}
    </DebugContext.Provider>
  );
}

/**
 * useDebug Hook
 * Access debug mode state and controls
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
      toggle: () => {},
      setEnabled: () => {},
      updateOptions: () => {},
    };
  }
  return context;
}

// Export DebugContext for advanced use cases
export { DebugContext };
