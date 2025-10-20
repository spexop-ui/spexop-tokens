/**
 * Providers - Context providers for Spexop Design System
 */

// ============================================================================
// DEBUG PROVIDER
// ============================================================================
export type {
  DebugContextValue,
  DebugProviderProps,
  DebugState,
} from "./DebugProvider/index.js";
export {
  DebugContext,
  DebugProvider,
  useDebug,
} from "./DebugProvider/index.js";

// ============================================================================
// UNIFIED THEME PROVIDER (Main Theme System)
// ============================================================================
export type {
  ResolvedTheme,
  ResolvedThemeMode,
  Theme,
  ThemeMode,
  UnifiedThemeContextValue,
  UnifiedThemeProviderProps,
} from "./UnifiedThemeProvider/index.js";
export {
  UnifiedThemeContext,
  UnifiedThemeProvider,
  // Convenient aliases for shorter API
  UnifiedThemeProvider as ThemeProvider,
  useUnifiedTheme,
  useUnifiedTheme as useTheme,
} from "./UnifiedThemeProvider/index.js";
