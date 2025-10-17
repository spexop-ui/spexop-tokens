/**
 * Spexop Theme System
 *
 * Flexible theming system with multiple color schemes
 * Users can choose between different themes for their applications
 */

import { sColorBlack } from "../color/sColorBlack.js";
import { sColorBlue600 } from "../color/sColorBlue600.js";
import { sColorBlue700 } from "../color/sColorBlue700.js";
import { sColorBlue800 } from "../color/sColorBlue800.js";
import { sColorNeutral50 } from "../color/sColorNeutral50.js";
import { sColorNeutral500 } from "../color/sColorNeutral500.js";
import { sColorNeutral600 } from "../color/sColorNeutral600.js";
import { sColorNeutral700 } from "../color/sColorNeutral700.js";
import { sColorNeutral800 } from "../color/sColorNeutral800.js";
import { sColorNeutral900 } from "../color/sColorNeutral900.js";
import { sColorRed500 } from "../color/sColorRed500.js";
import { sColorRed600 } from "../color/sColorRed600.js";
import { sColorRed700 } from "../color/sColorRed700.js";
import { sColorWhite } from "../color/sColorWhite.js";

/**
 * Theme Configuration
 */
export interface ThemeColors {
  /** Primary brand color */
  primary: string;
  /** Primary hover state */
  primaryHover: string;
  /** Primary active/pressed state */
  primaryActive: string;
  /** Primary text color (for use on primary background) */
  primaryText: string;

  /** Secondary/accent color */
  secondary: string;
  secondaryHover: string;
  secondaryActive: string;
  secondaryText: string;

  /** Surface/background colors */
  surface: string;
  surfaceHover: string;

  /** Text colors */
  text: string;
  textMuted: string;
  textInverted: string;
}

/**
 * Minimal Theme - Clean, sophisticated, black-based
 * Default theme for professional applications
 */
export const minimalTheme: ThemeColors = {
  primary: sColorNeutral900, // #1a1a1a - Near black
  primaryHover: sColorNeutral800, // Slightly lighter on hover
  primaryActive: sColorBlack, // Pure black when pressed
  primaryText: sColorWhite,

  secondary: sColorNeutral600, // Cool gray accent
  secondaryHover: sColorNeutral700,
  secondaryActive: sColorNeutral800,
  secondaryText: sColorWhite,

  surface: sColorWhite,
  surfaceHover: sColorNeutral50,

  text: sColorNeutral900,
  textMuted: sColorNeutral500,
  textInverted: sColorWhite,
};

/**
 * Professional Theme - Modern, professional blue
 * For SaaS, productivity, and business applications
 */
export const professionalTheme: ThemeColors = {
  primary: sColorBlue600, // #2563eb - Professional blue
  primaryHover: sColorBlue700,
  primaryActive: sColorBlue800,
  primaryText: sColorWhite,

  secondary: sColorNeutral600,
  secondaryHover: sColorNeutral700,
  secondaryActive: sColorNeutral800,
  secondaryText: sColorWhite,

  surface: sColorWhite,
  surfaceHover: sColorNeutral50,

  text: sColorNeutral900,
  textMuted: sColorNeutral500,
  textInverted: sColorWhite,
};

/**
 * Bold Theme - Vibrant, energetic, attention-grabbing
 * For brands that want to make a strong statement
 */
export const boldTheme: ThemeColors = {
  primary: sColorRed500, // #f44336 - Bold red
  primaryHover: sColorRed600,
  primaryActive: sColorRed700,
  primaryText: sColorWhite,

  secondary: sColorNeutral900,
  secondaryHover: sColorNeutral800,
  secondaryActive: sColorBlack,
  secondaryText: sColorWhite,

  surface: sColorWhite,
  surfaceHover: sColorNeutral50,

  text: sColorNeutral900,
  textMuted: sColorNeutral500,
  textInverted: sColorWhite,
};

/**
 * Default theme - Minimal, clean aesthetic
 */
export const defaultTheme = minimalTheme;

/**
 * All available themes
 */
export const themes = {
  minimal: minimalTheme,
  professional: professionalTheme,
  bold: boldTheme,
} as const;

export type ThemeName = keyof typeof themes;
