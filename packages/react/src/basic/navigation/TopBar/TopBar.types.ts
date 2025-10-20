/**
 * TopBar Component Types
 *
 * @packageName @spexop/react
 * @description TopBar Component Types
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

export interface TopBarProps {
  /**
   * Logo text to display (e.g., "Spexop Design System")
   * @default "Spexop"
   */
  logoText?: string;

  /**
   * Callback when logo is clicked (navigate to home)
   */
  onLogoClick?: () => void;

  /**
   * Callback when search button is clicked
   */
  onSearchClick?: () => void;

  /**
   * Callback when theme toggle button is clicked
   */
  onThemeToggle?: () => void;

  /**
   * Callback when GitHub button is clicked
   */
  onGitHubClick?: () => void;

  /**
   * Callback when settings button is clicked
   */
  onSettingsClick?: () => void;

  /**
   * Callback when mobile menu button is clicked (< 768px only)
   */
  onMobileMenuClick?: () => void;

  /**
   * Current theme to display appropriate icon
   * @default "auto"
   */
  currentTheme?: "light" | "dark" | "auto";

  /**
   * Whether to show mobile menu button (< 768px)
   * Set to false if you handle mobile menu differently
   * @default true
   */
  showMobileMenu?: boolean;

  /**
   * GitHub repository URL
   * @default "https://github.com/spexop-ui"
   */
  gitHubUrl?: string;

  /**
   * Additional CSS class
   */
  className?: string;
}
