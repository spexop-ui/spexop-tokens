/**
 * Generic JSON Importer
 * Import themes from generic JSON format with flexible schema detection
 */

import type { SpexopThemeConfig } from "../types/index.js";

/**
 * Import theme from generic JSON
 */
export function importFromJSON(jsonString: string): Partial<SpexopThemeConfig> {
  try {
    const data = JSON.parse(jsonString);
    return mapGenericJSON(data);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return {};
  }
}

/**
 * Map generic JSON structure to Spexop theme config
 */
function mapGenericJSON(
  data: Record<string, unknown>,
): Partial<SpexopThemeConfig> {
  const theme: Partial<SpexopThemeConfig> = {
    meta: {
      name:
        extractString(data, ["name", "themeName", "title"]) || "Imported Theme",
      version: extractString(data, ["version"]) || "1.0.0",
      description:
        extractString(data, ["description", "desc"]) || "Imported from JSON",
      author: extractString(data, ["author", "creator"]) || "Imported",
    },
  };

  // Try to extract colors from various structures
  const colorsData = extractObject(data, ["colors", "palette", "colour"]);
  if (colorsData) {
    theme.colors = mapColors(colorsData);
  }

  // Try to extract typography
  const typographyData = extractObject(data, ["typography", "fonts", "type"]);
  if (typographyData) {
    theme.typography = mapTypography(typographyData);
  }

  // Try to extract spacing
  const spacingData = extractObject(data, ["spacing", "space", "gaps"]);
  if (spacingData) {
    theme.spacing = mapSpacing(spacingData);
  }

  // Try to extract borders
  const bordersData = extractObject(data, ["borders", "border", "radius"]);
  if (bordersData) {
    theme.borders = mapBorders(bordersData);
  }

  // Try to extract breakpoints
  const breakpointsData = extractObject(data, [
    "breakpoints",
    "screens",
    "mediaQueries",
  ]);
  if (breakpointsData) {
    theme.breakpoints = mapBreakpoints(breakpointsData);
  }

  return theme;
}

/**
 * Map colors from generic structure
 */
function mapColors(data: Record<string, unknown>): SpexopThemeConfig["colors"] {
  const getColor = (keys: string[]): string => {
    for (const key of keys) {
      const value = data[key];
      if (typeof value === "string" && isColorValue(value)) {
        return value;
      }
      if (typeof value === "object" && value !== null) {
        // Try nested structure (e.g., { primary: { main: '#xxx' } })
        const nested = value as Record<string, unknown>;
        for (const subKey of ["main", "default", "500", "base"]) {
          if (
            typeof nested[subKey] === "string" &&
            isColorValue(nested[subKey])
          ) {
            return nested[subKey] as string;
          }
        }
      }
    }
    return "#000000";
  };

  return {
    primary: getColor(["primary", "primaryColor", "brand", "main"]),
    primaryHover: getColor(["primaryHover", "primaryDark", "primary-hover"]),
    primaryActive: getColor([
      "primaryActive",
      "primaryDarker",
      "primary-active",
    ]),
    secondary: getColor(["secondary", "secondaryColor", "accent"]),
    secondaryHover: getColor([
      "secondaryHover",
      "secondaryDark",
      "secondary-hover",
    ]),
    secondaryActive: getColor([
      "secondaryActive",
      "secondaryDarker",
      "secondary-active",
    ]),
    surface: getColor(["surface", "background", "bg", "white"]),
    surfaceSecondary: getColor([
      "surfaceSecondary",
      "backgroundSecondary",
      "surface-secondary",
    ]),
    surfaceHover: getColor([
      "surfaceHover",
      "backgroundHover",
      "surface-hover",
    ]),
    text: getColor(["text", "textColor", "foreground", "fg"]),
    textSecondary: getColor(["textSecondary", "textMuted", "text-secondary"]),
    textMuted: getColor(["textMuted", "textSubtle", "text-muted"]),
    border: getColor(["border", "borderColor", "border-color"]),
    borderStrong: getColor(["borderStrong", "borderDark", "border-strong"]),
    borderSubtle: getColor(["borderSubtle", "borderLight", "border-subtle"]),
    success: getColor(["success", "green", "positive"]),
    warning: getColor(["warning", "yellow", "caution"]),
    error: getColor(["error", "red", "danger", "negative"]),
    info: getColor(["info", "blue", "information"]),
  };
}

/**
 * Map typography from generic structure
 */
function mapTypography(
  data: Record<string, unknown>,
): SpexopThemeConfig["typography"] {
  const getString = (keys: string[]): string | undefined => {
    for (const key of keys) {
      const value = data[key];
      if (typeof value === "string") return value;
    }
    return undefined;
  };

  const getNumber = (keys: string[], defaultValue: number): number => {
    for (const key of keys) {
      const value = data[key];
      if (typeof value === "number") return value;
      if (typeof value === "string") {
        const num = Number.parseFloat(value);
        if (!Number.isNaN(num)) return num;
      }
    }
    return defaultValue;
  };

  return {
    fontFamily:
      getString(["fontFamily", "font-family", "sans", "family"]) ||
      "system-ui, sans-serif",
    fontFamilyHeading:
      getString(["fontFamilyHeading", "headingFont", "font-family-heading"]) ||
      "system-ui, sans-serif",
    fontFamilyMono:
      getString(["fontFamilyMono", "monoFont", "font-family-mono"]) ||
      "monospace",
    baseSize: getNumber(["baseSize", "fontSize", "base-size"], 16),
    scale: getNumber(["scale", "typeScale", "scale-ratio"], 1.25),
    weights: {
      regular: getNumber(["regular", "normal", "weight-regular"], 400),
      medium: getNumber(["medium", "weight-medium"], 500),
      semibold: getNumber(["semibold", "weight-semibold"], 600),
      bold: getNumber(["bold", "weight-bold"], 700),
    },
    lineHeights: {
      tight: getNumber(["lineHeight-tight", "tight"], 1.2),
      snug: getNumber(["lineHeight-snug", "snug"], 1.375),
      normal: getNumber(["lineHeight", "normal"], 1.5),
      relaxed: getNumber(["lineHeight-relaxed", "relaxed"], 1.75),
    },
  };
}

/**
 * Map spacing from generic structure
 */
function mapSpacing(
  data: Record<string, unknown>,
): SpexopThemeConfig["spacing"] {
  const scale: number[] = [];

  // Try to extract spacing values
  for (const [_key, value] of Object.entries(data)) {
    if (typeof value === "number") {
      scale.push(value);
    } else if (typeof value === "string") {
      const num = Number.parseFloat(value);
      if (!Number.isNaN(num)) {
        scale.push(num);
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
 * Map borders from generic structure
 */
function mapBorders(
  data: Record<string, unknown>,
): SpexopThemeConfig["borders"] {
  const getNumber = (keys: string[], defaultValue: number): number => {
    for (const key of keys) {
      const value = data[key];
      if (typeof value === "number") return value;
      if (typeof value === "string") {
        const num = Number.parseFloat(value);
        if (!Number.isNaN(num)) return num;
      }
    }
    return defaultValue;
  };

  return {
    thin: getNumber(["thin", "borderThin", "width-thin"], 1),
    default: getNumber(["default", "borderDefault", "width"], 2),
    thick: getNumber(["thick", "borderThick", "width-thick"], 4),
    radiusSubtle: getNumber(["radiusSubtle", "radius", "borderRadius"], 8),
    radiusRelaxed: getNumber(["radiusRelaxed", "radiusLg", "radius-lg"], 12),
    radiusPill: 9999,
    defaultStyle: "solid",
  };
}

/**
 * Map breakpoints from generic structure
 */
function mapBreakpoints(
  data: Record<string, unknown>,
): SpexopThemeConfig["breakpoints"] {
  const getBreakpoint = (keys: string[], defaultValue: number): number => {
    for (const key of keys) {
      const value = data[key];
      if (typeof value === "number") return value;
      if (typeof value === "string") {
        const num = Number.parseFloat(value);
        if (!Number.isNaN(num)) return num;
      }
    }
    return defaultValue;
  };

  return {
    xs: getBreakpoint(["xs", "mobile"], 320),
    sm: getBreakpoint(["sm", "small"], 640),
    md: getBreakpoint(["md", "medium", "tablet"], 768),
    lg: getBreakpoint(["lg", "large", "desktop"], 1024),
    xl: getBreakpoint(["xl", "xlarge"], 1280),
    "2xl": getBreakpoint(["2xl", "xxl", "wide"], 1536),
  };
}

/**
 * Extract string value from various possible keys
 */
function extractString(
  data: Record<string, unknown>,
  keys: string[],
): string | undefined {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string") return value;
  }
  return undefined;
}

/**
 * Extract object value from various possible keys
 */
function extractObject(
  data: Record<string, unknown>,
  keys: string[],
): Record<string, unknown> | undefined {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return value as Record<string, unknown>;
    }
  }
  return undefined;
}

/**
 * Check if a string value is a color
 */
function isColorValue(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return (
    value.startsWith("#") ||
    value.startsWith("rgb") ||
    value.startsWith("hsl") ||
    /^[a-z]+$/i.test(value)
  );
}
