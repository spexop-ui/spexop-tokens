/**
 * WCAG Contrast Checker
 * Calculate contrast ratios and validate WCAG 2.1 compliance
 */

import { type RGB, hexToRgb } from "./colorManipulation.js";

/**
 * WCAG contrast levels
 */
export enum ContrastLevel {
  AAA = "AAA", // 7:1 for normal text, 4.5:1 for large text
  AA = "AA", // 4.5:1 for normal text, 3:1 for large text
  AA_LARGE = "AA_LARGE", // 3:1 for large text only
  FAIL = "FAIL", // Below minimum standards
}

/**
 * Contrast check result
 */
export interface ContrastResult {
  ratio: number;
  level: ContrastLevel;
  passAA: boolean;
  passAAA: boolean;
  passAALarge: boolean;
  passAAALarge: boolean;
  score: number; // 0-100 accessibility score
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 formula
 */
function calculateLuminance(rgb: RGB): number {
  const { r, g, b } = rgb;

  // Normalize RGB values
  const normalize = (channel: number): number => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  const rLum = normalize(r);
  const gLum = normalize(g);
  const bLum = normalize(b);

  // Calculate luminance using WCAG formula
  return 0.2126 * rLum + 0.7152 * gLum + 0.0722 * bLum;
}

/**
 * Calculate contrast ratio between two colors
 * Returns ratio from 1:1 (no contrast) to 21:1 (maximum contrast)
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const lum1 = calculateLuminance(rgb1);
  const lum2 = calculateLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG requirements
 */
export function checkContrast(
  foreground: string,
  background: string,
  isLargeText = false,
): ContrastResult {
  const ratio = calculateContrastRatio(foreground, background);

  // WCAG 2.1 Level AA requirements
  const minNormalAA = 4.5;
  const minLargeAA = 3.0;

  // WCAG 2.1 Level AAA requirements
  const minNormalAAA = 7.0;
  const minLargeAAA = 4.5;

  // Determine pass/fail for each level
  const passAA = ratio >= (isLargeText ? minLargeAA : minNormalAA);
  const passAAA = ratio >= (isLargeText ? minLargeAAA : minNormalAAA);
  const passAALarge = ratio >= minLargeAA;
  const passAAALarge = ratio >= minLargeAAA;

  // Determine overall level
  let level: ContrastLevel;
  if (passAAA) {
    level = ContrastLevel.AAA;
  } else if (passAA) {
    level = ContrastLevel.AA;
  } else if (passAALarge) {
    level = ContrastLevel.AA_LARGE;
  } else {
    level = ContrastLevel.FAIL;
  }

  // Calculate accessibility score (0-100)
  const maxRatio = 21; // Theoretical maximum
  const score = Math.min(100, Math.round((ratio / maxRatio) * 100));

  return {
    ratio: Math.round(ratio * 100) / 100, // Round to 2 decimals
    level,
    passAA,
    passAAA,
    passAALarge,
    passAAALarge,
    score,
  };
}

/**
 * Get a description of the contrast result
 */
export function getContrastDescription(result: ContrastResult): string {
  if (result.passAAA) {
    return "Excellent contrast - WCAG AAA compliant";
  }
  if (result.passAA) {
    return "Good contrast - WCAG AA compliant";
  }
  if (result.passAALarge) {
    return "Acceptable for large text only - WCAG AA Large";
  }
  return "Poor contrast - Does not meet WCAG standards";
}

/**
 * Get color representation for contrast level
 */
export function getContrastLevelColor(level: ContrastLevel): string {
  switch (level) {
    case ContrastLevel.AAA:
      return "#10b981"; // Green
    case ContrastLevel.AA:
      return "#3b82f6"; // Blue
    case ContrastLevel.AA_LARGE:
      return "#f59e0b"; // Amber
    case ContrastLevel.FAIL:
      return "#ef4444"; // Red
  }
}

/**
 * Suggest a color adjustment to meet minimum contrast
 */
export function suggestContrastFix(
  foreground: string,
  background: string,
  targetRatio = 4.5,
): {
  suggestedForeground?: string;
  suggestedBackground?: string;
  method: "lighten" | "darken" | "none";
} {
  const currentRatio = calculateContrastRatio(foreground, background);

  if (currentRatio >= targetRatio) {
    return { method: "none" };
  }

  // Try adjusting foreground
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);

  const fgLum = calculateLuminance(fgRgb);
  const bgLum = calculateLuminance(bgRgb);

  // Determine if we should lighten or darken
  const shouldLightenFg = fgLum < bgLum;
  const method = shouldLightenFg ? "lighten" : "darken";

  // Binary search for the right adjustment
  // This is a placeholder - actual implementation would adjust color
  // and check if it meets target ratio
  // TODO: Implement actual color adjustment algorithm

  // For now, return a simple suggestion
  // A full implementation would calculate the exact color needed
  return {
    method,
    suggestedForeground: foreground, // Placeholder
    suggestedBackground: background, // Placeholder
  };
}

/**
 * Check multiple color combinations
 */
export interface ColorCombination {
  name: string;
  foreground: string;
  background: string;
  isLargeText?: boolean;
}

export interface ContrastReport {
  combinations: Array<ColorCombination & { result: ContrastResult }>;
  passRate: number;
  overallPass: boolean;
}

export function checkMultipleContrasts(
  combinations: ColorCombination[],
): ContrastReport {
  const results = combinations.map((combo) => ({
    ...combo,
    result: checkContrast(
      combo.foreground,
      combo.background,
      combo.isLargeText,
    ),
  }));

  const passCount = results.filter((r) => r.result.passAA).length;
  const passRate = (passCount / results.length) * 100;
  const overallPass = passCount === results.length;

  return {
    combinations: results,
    passRate: Math.round(passRate),
    overallPass,
  };
}

/**
 * Generate a contrast matrix for a color palette
 */
export function generateContrastMatrix(colors: {
  [key: string]: string;
}): Array<{
  foreground: string;
  background: string;
  ratio: number;
  passAA: boolean;
}> {
  const matrix: Array<{
    foreground: string;
    background: string;
    ratio: number;
    passAA: boolean;
  }> = [];

  const colorKeys = Object.keys(colors);

  for (const fgKey of colorKeys) {
    for (const bgKey of colorKeys) {
      if (fgKey !== bgKey) {
        const result = checkContrast(colors[fgKey], colors[bgKey]);
        matrix.push({
          foreground: fgKey,
          background: bgKey,
          ratio: result.ratio,
          passAA: result.passAA,
        });
      }
    }
  }

  return matrix;
}

/**
 * Find the best text color (black or white) for a background
 */
export function getAccessibleTextColor(
  backgroundColor: string,
): "#000000" | "#ffffff" {
  const blackContrast = calculateContrastRatio("#000000", backgroundColor);
  const whiteContrast = calculateContrastRatio("#ffffff", backgroundColor);

  return blackContrast > whiteContrast ? "#000000" : "#ffffff";
}

/**
 * Check if a color meets minimum contrast requirements
 */
export function meetsMinimumContrast(
  foreground: string,
  background: string,
  level: "AA" | "AAA" = "AA",
  isLargeText = false,
): boolean {
  const result = checkContrast(foreground, background, isLargeText);

  if (level === "AAA") {
    return result.passAAA;
  }

  return result.passAA;
}
