/**
 * Dark Mode Theme Colors
 *
 * Dark theme variants with inverted color schemes
 */

import { sColorBlue500 } from "../color/sColorBlue500.js";
import { sColorBlue600 } from "../color/sColorBlue600.js";
import { sColorBlue700 } from "../color/sColorBlue700.js";
import { sColorNeutral200 } from "../color/sColorNeutral200.js";
import { sColorNeutral400 } from "../color/sColorNeutral400.js";
import { sColorNeutral700 } from "../color/sColorNeutral700.js";
import { sColorNeutral800 } from "../color/sColorNeutral800.js";
import { sColorNeutral900 } from "../color/sColorNeutral900.js";
import { sColorRed500 } from "../color/sColorRed500.js";
import { sColorRed600 } from "../color/sColorRed600.js";
import { sColorRed700 } from "../color/sColorRed700.js";
import { sColorSlate700 } from "../color/sColorSlate700.js";
import { sColorSlate800 } from "../color/sColorSlate800.js";
import { sColorSlate900 } from "../color/sColorSlate900.js";
import { sColorWhite } from "../color/sColorWhite.js";
import type { ThemeColors } from "./colors.js";

/**
 * Minimal Dark Theme
 * Neutral, sophisticated dark mode with white accents
 */
export const minimalDarkTheme: ThemeColors = {
  primary: sColorWhite,
  primaryHover: sColorNeutral200,
  primaryActive: sColorNeutral400,
  primaryText: sColorNeutral900,

  secondary: sColorNeutral700,
  secondaryHover: sColorNeutral800,
  secondaryActive: sColorNeutral900,
  secondaryText: sColorWhite,

  surface: sColorNeutral800,
  surfaceHover: sColorNeutral700,

  text: sColorWhite,
  textMuted: sColorNeutral400,
  textInverted: sColorNeutral900,
};

/**
 * Professional Dark Theme
 * Modern dark theme with blue accents
 */
export const professionalDarkTheme: ThemeColors = {
  primary: sColorBlue500,
  primaryHover: sColorBlue600,
  primaryActive: sColorBlue700,
  primaryText: sColorWhite,

  secondary: sColorSlate700,
  secondaryHover: sColorSlate800,
  secondaryActive: sColorSlate900,
  secondaryText: sColorWhite,

  surface: sColorSlate800,
  surfaceHover: sColorSlate700,

  text: sColorWhite,
  textMuted: sColorNeutral400,
  textInverted: sColorSlate900,
};

/**
 * Bold Dark Theme
 * Vibrant dark theme with red accents
 */
export const boldDarkTheme: ThemeColors = {
  primary: sColorRed500,
  primaryHover: sColorRed600,
  primaryActive: sColorRed700,
  primaryText: sColorWhite,

  secondary: sColorNeutral700,
  secondaryHover: sColorNeutral800,
  secondaryActive: sColorNeutral900,
  secondaryText: sColorWhite,

  surface: sColorNeutral800,
  surfaceHover: sColorNeutral700,

  text: sColorWhite,
  textMuted: sColorNeutral400,
  textInverted: sColorNeutral900,
};
