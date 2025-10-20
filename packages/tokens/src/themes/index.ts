/**
 * Theme System
 *
 * Export all theme-related utilities including light and dark modes
 */

export {
  boldTheme,
  minimalTheme,
  professionalTheme,
  type ThemeColors,
} from "./colors.js";

export {
  boldDarkTheme,
  minimalDarkTheme,
  professionalDarkTheme,
} from "./dark.js";

export type ThemeName = "minimal" | "professional" | "bold";
export type ColorMode = "light" | "dark";

import {
  type ThemeColors,
  boldTheme,
  minimalTheme,
  professionalTheme,
} from "./colors.js";
import {
  boldDarkTheme,
  minimalDarkTheme,
  professionalDarkTheme,
} from "./dark.js";

export const lightThemes: Record<ThemeName, ThemeColors> = {
  minimal: minimalTheme,
  professional: professionalTheme,
  bold: boldTheme,
};

export const darkThemes: Record<ThemeName, ThemeColors> = {
  minimal: minimalDarkTheme,
  professional: professionalDarkTheme,
  bold: boldDarkTheme,
};

export const defaultTheme = minimalTheme;
export const defaultDarkTheme = minimalDarkTheme;

// All available themes
export const themes = lightThemes;
