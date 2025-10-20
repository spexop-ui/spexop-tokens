/**
 * ThemeToggle - Theme switcher component
 *
 * A button that cycles through light, dark, and auto themes.
 * Shows appropriate icon based on current theme.
 *
 * @example
 * ```tsx
 * import { ThemeToggle } from '@spexop/react';
 *
 * <ThemeToggle
 *   currentTheme="light"
 *   onThemeChange={(theme) => setTheme(theme)}
 *   variant="icon"
 * />
 * ```
 */

import { Monitor, Moon, Sun } from "@spexop/icons";
import { IconButton } from "../../display/IconButton/index.js";

export interface ThemeToggleProps {
  /** Current theme */
  currentTheme: "light" | "dark" | "auto";
  /** Theme change callback */
  onThemeChange: (theme: "light" | "dark" | "auto") => void;
  /** Visual variant */
  variant?: "icon" | "button";
  /** Size */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class */
  className?: string;
}

/**
 * ThemeToggle Component
 * Cycles through light → dark → auto themes
 */
export function ThemeToggle({
  currentTheme,
  onThemeChange,
  variant = "icon",
  size = "md",
  className = "",
}: ThemeToggleProps) {
  // Select the appropriate theme icon
  const ThemeIcon =
    currentTheme === "light" ? Sun : currentTheme === "dark" ? Moon : Monitor;

  const themeLabel = `Theme: ${currentTheme}`;

  // Cycle to next theme
  const cycleTheme = () => {
    const themes: Array<"light" | "dark" | "auto"> = ["light", "dark", "auto"];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    if (nextTheme) {
      onThemeChange(nextTheme);
    }
  };

  if (variant === "icon") {
    return (
      <IconButton
        icon={ThemeIcon}
        label={themeLabel}
        onClick={cycleTheme}
        size={size}
        strokeWidth={1}
        className={className}
      />
    );
  }

  // Button variant could be expanded in the future
  return (
    <IconButton
      icon={ThemeIcon}
      label={themeLabel}
      onClick={cycleTheme}
      size={size}
      strokeWidth={1}
      variant="outline"
      className={className}
    />
  );
}
