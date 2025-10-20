/**
 * Spexop React Components
 *
 * @packageName @spexop/react
 * @description Production-ready React components for modern web apps
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-15
 * @license MIT
 */

// Re-export all basic components (60+ components organized by category)
// This includes animations, so we don't need to re-export them separately
export * from "./basic/index.js";

// Re-export all hooks
export * from "./hooks/index.js";

// Re-export all providers (includes UnifiedThemeProvider)
export * from "./providers/index.js";
export type {
  UnifiedThemeContextValue as ThemeContextValue,
  UnifiedThemeProviderProps as ThemeProviderProps,
} from "./providers/UnifiedThemeProvider/index.js";
// ============================================================================
// MAIN THEME PROVIDER EXPORTS
// ============================================================================
// Export UnifiedThemeProvider as the main ThemeProvider for convenience
export {
  UnifiedThemeContext as ThemeContext,
  UnifiedThemeProvider as ThemeProvider,
  useUnifiedTheme as useTheme,
} from "./providers/UnifiedThemeProvider/index.js";
// Re-export templates (for builder app)
// Note: These are not typically used directly in consumer apps
// but are provided for the builder and template system
export * as templates from "./templates/index.js";

// Package version
export const version = "0.1.0";
