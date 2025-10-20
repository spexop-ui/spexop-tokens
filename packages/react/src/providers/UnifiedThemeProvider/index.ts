/**
 * Unified ThemeProvider - Combines light/dark mode AND full theme configuration
 */

// Default export
export {
  type ResolvedThemeMode,
  type ResolvedThemeMode as ResolvedTheme,
  type ThemeMode,
  // Re-export with cleaner names
  type ThemeMode as Theme,
  UnifiedThemeContext,
  type UnifiedThemeContextValue,
  UnifiedThemeProvider,
  UnifiedThemeProvider as default,
  type UnifiedThemeProviderProps,
  useUnifiedTheme,
} from "./UnifiedThemeProvider.js";
