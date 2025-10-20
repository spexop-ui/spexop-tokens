/**
 * Figma Tokens Importer
 * Import themes from Figma Tokens Studio JSON format
 */

import type { SpexopThemeConfig } from "../types/index.js";

/**
 * Figma Tokens structure (simplified)
 */
export interface FigmaTokens {
  colors?: Record<string, { value: string; type?: string }>;
  spacing?: Record<string, { value: string; type?: string }>;
  typography?: Record<
    string,
    { value: string | Record<string, string>; type?: string }
  >;
  borderRadius?: Record<string, { value: string; type?: string }>;
  borderWidth?: Record<string, { value: string; type?: string }>;
  [key: string]: unknown;
}

/**
 * Import theme from Figma Tokens
 */
export function importFromFigma(
  figmaTokens: FigmaTokens,
): Partial<SpexopThemeConfig> {
  const theme: Partial<SpexopThemeConfig> = {
    meta: {
      name: "Imported from Figma",
      version: "1.0.0",
      description: "Theme imported from Figma Tokens Studio",
      author: "Imported",
    },
  };

  // Import colors
  if (figmaTokens.colors) {
    theme.colors = extractFigmaColors(figmaTokens.colors);
  }

  // Import spacing
  if (figmaTokens.spacing) {
    theme.spacing = extractFigmaSpacing(figmaTokens.spacing);
  }

  // Import typography
  if (figmaTokens.typography) {
    theme.typography = extractFigmaTypography(figmaTokens.typography);
  }

  // Import borders
  if (figmaTokens.borderRadius || figmaTokens.borderWidth) {
    theme.borders = extractFigmaBorders(
      figmaTokens.borderRadius,
      figmaTokens.borderWidth,
    );
  }

  return theme;
}

/**
 * Extract colors from Figma tokens
 */
function extractFigmaColors(
  colors: Record<string, { value: string; type?: string }>,
): SpexopThemeConfig["colors"] {
  const getValue = (key: string): string => {
    return colors[key]?.value || colors[key.toLowerCase()]?.value || "#000000";
  };

  // Try common Figma token naming patterns
  const getPrimary = (): string => {
    for (const key of ["primary", "brand", "accent", "blue"]) {
      if (colors[key]) return getValue(key);
    }
    return "#3b82f6";
  };

  const getSecondary = (): string => {
    for (const key of ["secondary", "purple", "violet"]) {
      if (colors[key]) return getValue(key);
    }
    return "#8b5cf6";
  };

  const getNeutral = (suffix: string): string => {
    for (const prefix of ["neutral", "gray", "grey", "surface"]) {
      const key = `${prefix}-${suffix}`;
      if (colors[key]) return getValue(key);
    }
    return "#000000";
  };

  return {
    primary: getPrimary(),
    primaryHover: colors["primary-hover"]?.value || getPrimary(),
    primaryActive: colors["primary-active"]?.value || getPrimary(),
    secondary: getSecondary(),
    secondaryHover: colors["secondary-hover"]?.value || getSecondary(),
    secondaryActive: colors["secondary-active"]?.value || getSecondary(),
    surface: getValue("surface") || "#ffffff",
    surfaceSecondary: getValue("surface-secondary") || getNeutral("50"),
    surfaceHover: getValue("surface-hover") || getNeutral("100"),
    text: getValue("text") || getNeutral("900"),
    textSecondary: getValue("text-secondary") || getNeutral("700"),
    textMuted: getValue("text-muted") || getNeutral("500"),
    border: getValue("border") || getNeutral("200"),
    borderStrong: getValue("border-strong") || getNeutral("300"),
    borderSubtle: getValue("border-subtle") || getNeutral("100"),
    success: getValue("success") || "#10b981",
    warning: getValue("warning") || "#f59e0b",
    error: getValue("error") || "#ef4444",
    info: getValue("info") || "#3b82f6",
  };
}

/**
 * Extract spacing from Figma tokens
 */
function extractFigmaSpacing(
  spacing: Record<string, { value: string; type?: string }>,
): SpexopThemeConfig["spacing"] {
  const scale: number[] = [];

  for (const [_key, token] of Object.entries(spacing)) {
    const value = Number.parseFloat(token.value);
    if (!Number.isNaN(value)) {
      scale.push(value);
    }
  }

  return {
    baseUnit: 4,
    scale:
      scale.length > 0
        ? scale.sort((a, b) => a - b)
        : [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
  };
}

/**
 * Extract typography from Figma tokens
 */
function extractFigmaTypography(
  typography: Record<
    string,
    { value: string | Record<string, string>; type?: string }
  >,
): SpexopThemeConfig["typography"] {
  const getValue = (key: string): string => {
    const token = typography[key];
    if (!token) return "";
    if (typeof token.value === "string") return token.value;
    return "";
  };

  return {
    fontFamily: getValue("font-family") || "system-ui, sans-serif",
    fontFamilyHeading:
      getValue("font-family-heading") ||
      getValue("font-family") ||
      "system-ui, sans-serif",
    fontFamilyMono: getValue("font-family-mono") || "monospace",
    baseSize: 16,
    scale: 1.25,
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.75,
    },
  };
}

/**
 * Extract borders from Figma tokens
 */
function extractFigmaBorders(
  borderRadius?: Record<string, { value: string; type?: string }>,
  borderWidth?: Record<string, { value: string; type?: string }>,
): SpexopThemeConfig["borders"] {
  const parsePx = (value: string): number => {
    const num = Number.parseFloat(value);
    return Number.isNaN(num) ? 0 : num;
  };

  return {
    thin: borderWidth?.thin ? parsePx(borderWidth.thin.value) : 1,
    default: borderWidth?.default ? parsePx(borderWidth.default.value) : 2,
    thick: borderWidth?.thick ? parsePx(borderWidth.thick.value) : 4,
    radiusSubtle: borderRadius?.subtle ? parsePx(borderRadius.subtle.value) : 8,
    radiusRelaxed: borderRadius?.relaxed
      ? parsePx(borderRadius.relaxed.value)
      : 12,
    radiusPill: 9999,
    defaultStyle: "solid",
  };
}

/**
 * Parse Figma Tokens from JSON string
 */
export function parseFigmaTokens(jsonString: string): FigmaTokens {
  try {
    return JSON.parse(jsonString) as FigmaTokens;
  } catch (error) {
    console.error("Failed to parse Figma tokens:", error);
    return {};
  }
}
