/**
 * Tailwind Config Importer
 * Import themes from Tailwind CSS configuration files
 */

import type { SpexopThemeConfig } from "../types/index.js";

/**
 * Tailwind config structure (simplified)
 */
export interface TailwindConfig {
  theme?: {
    colors?: Record<string, string | Record<string, string>>;
    fontFamily?: Record<string, string | string[]>;
    fontSize?: Record<string, string | [string, string]>;
    spacing?: Record<string, string>;
    borderRadius?: Record<string, string>;
    borderWidth?: Record<string, string>;
    screens?: Record<string, string>;
  };
}

/**
 * Import theme from Tailwind config
 */
export function importFromTailwind(
  tailwindConfig: TailwindConfig,
): Partial<SpexopThemeConfig> {
  const theme: Partial<SpexopThemeConfig> = {
    meta: {
      name: "Imported from Tailwind",
      version: "1.0.0",
      description: "Theme imported from Tailwind CSS configuration",
      author: "Imported",
    },
  };

  // Import colors
  if (tailwindConfig.theme?.colors) {
    const colors = extractColors(tailwindConfig.theme.colors);
    if (colors) {
      theme.colors = colors;
    }
  }

  // Import typography
  if (tailwindConfig.theme?.fontFamily || tailwindConfig.theme?.fontSize) {
    theme.typography = {
      fontFamily: extractFontFamily(tailwindConfig.theme?.fontFamily?.sans),
      fontFamilyHeading: extractFontFamily(
        tailwindConfig.theme?.fontFamily?.sans,
      ),
      fontFamilyMono: extractFontFamily(tailwindConfig.theme?.fontFamily?.mono),
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

  // Import spacing
  if (tailwindConfig.theme?.spacing) {
    theme.spacing = extractSpacing(tailwindConfig.theme.spacing);
  }

  // Import borders
  if (tailwindConfig.theme?.borderRadius || tailwindConfig.theme?.borderWidth) {
    theme.borders = extractBorders(
      tailwindConfig.theme?.borderRadius,
      tailwindConfig.theme?.borderWidth,
    );
  }

  // Import breakpoints
  if (tailwindConfig.theme?.screens) {
    theme.breakpoints = extractBreakpoints(tailwindConfig.theme.screens);
  }

  return theme;
}

/**
 * Extract colors from Tailwind config
 */
function extractColors(
  tailwindColors: Record<string, string | Record<string, string>>,
): SpexopThemeConfig["colors"] | undefined {
  // Try to find common color keys
  const getPrimaryColor = (): string => {
    // Check for common primary color names
    for (const key of ["primary", "blue", "indigo", "purple"]) {
      const color = tailwindColors[key];
      if (typeof color === "string") return color;
      if (typeof color === "object" && color["500"]) return color["500"];
    }
    return "#3b82f6"; // Default blue
  };

  const getSecondaryColor = (): string => {
    for (const key of ["secondary", "purple", "pink"]) {
      const color = tailwindColors[key];
      if (typeof color === "string") return color;
      if (typeof color === "object" && color["500"]) return color["500"];
    }
    return "#8b5cf6"; // Default purple
  };

  const getNeutralColor = (shade: string): string => {
    for (const key of ["neutral", "gray", "slate"]) {
      const color = tailwindColors[key];
      if (typeof color === "object" && color[shade]) return color[shade];
    }
    return "#000000"; // Fallback
  };

  const primary = getPrimaryColor();
  const secondary = getSecondaryColor();

  return {
    primary,
    primaryHover: adjustShade(primary, -10),
    primaryActive: adjustShade(primary, -20),
    secondary,
    secondaryHover: adjustShade(secondary, -10),
    secondaryActive: adjustShade(secondary, -20),
    surface: "#ffffff",
    surfaceSecondary: getNeutralColor("50"),
    surfaceHover: getNeutralColor("100"),
    text: getNeutralColor("900"),
    textSecondary: getNeutralColor("700"),
    textMuted: getNeutralColor("500"),
    border: getNeutralColor("200"),
    borderStrong: getNeutralColor("300"),
    borderSubtle: getNeutralColor("100"),
    success:
      (typeof tailwindColors.green === "object" &&
        tailwindColors.green?.["500"]) ||
      "#10b981",
    warning:
      (typeof tailwindColors.yellow === "object" &&
        tailwindColors.yellow?.["500"]) ||
      "#f59e0b",
    error:
      (typeof tailwindColors.red === "object" && tailwindColors.red?.["500"]) ||
      "#ef4444",
    info:
      (typeof tailwindColors.blue === "object" &&
        tailwindColors.blue?.["500"]) ||
      "#3b82f6",
  };
}

/**
 * Extract font family
 */
function extractFontFamily(font: string | string[] | undefined): string {
  if (!font) return "system-ui, sans-serif";
  if (typeof font === "string") return font;
  return font.join(", ");
}

/**
 * Extract spacing scale
 */
function extractSpacing(
  tailwindSpacing: Record<string, string>,
): SpexopThemeConfig["spacing"] {
  const scale: number[] = [];

  // Extract numeric spacing values
  for (const [key, value] of Object.entries(tailwindSpacing)) {
    const num = Number.parseInt(key, 10);
    if (!Number.isNaN(num)) {
      const px = Number.parseFloat(value);
      if (!Number.isNaN(px)) {
        scale.push(px);
      }
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
 * Extract border configuration
 */
function extractBorders(
  borderRadius?: Record<string, string>,
  borderWidth?: Record<string, string>,
): SpexopThemeConfig["borders"] {
  const parsePx = (value: string): number => {
    const num = Number.parseFloat(value);
    return Number.isNaN(num) ? 0 : num;
  };

  return {
    thin: borderWidth?.DEFAULT ? parsePx(borderWidth.DEFAULT) : 1,
    default: borderWidth?.["2"] ? parsePx(borderWidth["2"]) : 2,
    thick: borderWidth?.["4"] ? parsePx(borderWidth["4"]) : 4,
    radiusSubtle: borderRadius?.DEFAULT ? parsePx(borderRadius.DEFAULT) : 8,
    radiusRelaxed: borderRadius?.lg ? parsePx(borderRadius.lg) : 12,
    radiusPill: 9999,
    defaultStyle: "solid",
  };
}

/**
 * Extract breakpoints
 */
function extractBreakpoints(
  screens: Record<string, string>,
): SpexopThemeConfig["breakpoints"] {
  const parsePx = (value: string): number => {
    const num = Number.parseFloat(value);
    return Number.isNaN(num) ? 0 : num;
  };

  return {
    xs: screens.xs ? parsePx(screens.xs) : 320,
    sm: screens.sm ? parsePx(screens.sm) : 640,
    md: screens.md ? parsePx(screens.md) : 768,
    lg: screens.lg ? parsePx(screens.lg) : 1024,
    xl: screens.xl ? parsePx(screens.xl) : 1280,
    "2xl": screens["2xl"] ? parsePx(screens["2xl"]) : 1536,
  };
}

/**
 * Simple shade adjustment (placeholder)
 */
function adjustShade(color: string, _amount: number): string {
  // This is a simplified version
  // In production, would use full color manipulation library
  return color;
}

/**
 * Parse Tailwind config from JavaScript string
 */
export function parseTailwindConfig(configString: string): TailwindConfig {
  try {
    // Remove module.exports or export default
    const cleaned = configString
      .replace(/module\.exports\s*=\s*/, "")
      .replace(/export\s+default\s+/, "");

    // Try to eval as JSON-like object
    // In production, would use a proper JS parser
    const config = JSON.parse(cleaned);
    return config as TailwindConfig;
  } catch (error) {
    console.error("Failed to parse Tailwind config:", error);
    return {};
  }
}
