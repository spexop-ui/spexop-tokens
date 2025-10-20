/**
 * DebugProvider Types
 * Types for debug mode and visualization
 */

export interface DebugState {
  /**
   * Whether debug mode is enabled
   */
  enabled: boolean;

  /**
   * Show breakpoint indicator
   */
  showBreakpoint: boolean;

  /**
   * Show token values in labels
   */
  showTokens: boolean;

  /**
   * Show component boundaries with borders
   */
  showBoundaries: boolean;

  /**
   * Show composition hierarchy depth
   */
  showHierarchy: boolean;
}

export interface DebugContextValue extends DebugState {
  /**
   * Toggle debug mode on/off
   */
  toggle: () => void;

  /**
   * Set debug mode state
   */
  setEnabled: (enabled: boolean) => void;

  /**
   * Update debug options
   */
  updateOptions: (options: Partial<Omit<DebugState, "enabled">>) => void;
}

export interface DebugProviderProps {
  /**
   * Child components
   */
  children: React.ReactNode;

  /**
   * Initial debug state (default: false)
   */
  initialEnabled?: boolean;

  /**
   * Default debug options
   */
  defaultOptions?: Partial<Omit<DebugState, "enabled">>;
}
