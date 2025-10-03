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
import { sColorNeutral800 } from "../color/sColorNeutral800.js";
import { sColorNeutral900 } from "../color/sColorNeutral900.js";
import { sColorRed500 } from "../color/sColorRed500.js";
import { sColorRed600 } from "../color/sColorRed600.js";
import { sColorRed700 } from "../color/sColorRed700.js";
import { sColorSlate50 } from "../color/sColorSlate50.js";
import { sColorSlate500 } from "../color/sColorSlate500.js";
import { sColorSlate600 } from "../color/sColorSlate600.js";
import { sColorSlate700 } from "../color/sColorSlate700.js";
import { sColorSlate800 } from "../color/sColorSlate800.js";
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
  primaryHover: sColorSlate800, // Slightly lighter on hover
  primaryActive: sColorBlack, // Pure black when pressed
  primaryText: sColorWhite,

  secondary: sColorSlate600, // Cool gray accent
  secondaryHover: sColorSlate700,
  secondaryActive: sColorSlate800,
  secondaryText: sColorWhite,

  surface: sColorWhite,
  surfaceHover: sColorSlate50,

  text: sColorNeutral900,
  textMuted: sColorSlate500,
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

  secondary: sColorSlate600,
  secondaryHover: sColorSlate700,
  secondaryActive: sColorSlate800,
  secondaryText: sColorWhite,

  surface: sColorWhite,
  surfaceHover: sColorSlate50,

  text: sColorNeutral900,
  textMuted: sColorSlate500,
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
  surfaceHover: sColorSlate50,

  text: sColorNeutral900,
  textMuted: sColorSlate500,
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
