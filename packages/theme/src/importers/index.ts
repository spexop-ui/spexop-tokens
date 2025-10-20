/**
 * Theme Importers
 * Import themes from various sources and formats
 */

export { importFromCSS, parseCSSVariables } from "./cssImporter.js";
export {
  type FigmaTokens,
  importFromFigma,
  parseFigmaTokens,
} from "./figmaImporter.js";
export { importFromJSON } from "./jsonImporter.js";
export {
  importFromTailwind,
  parseTailwindConfig,
  type TailwindConfig,
} from "./tailwindImporter.js";

/**
 * Detect format and import automatically
 */
export function autoImport(
  input: string,
): Partial<import("../types/index.js").SpexopThemeConfig> {
  // Try to detect format
  const trimmed = input.trim();

  // Check if it's JSON
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);

      // Check for Figma Tokens structure
      if (hasProperty(parsed, "colors") || hasProperty(parsed, "spacing")) {
        const { importFromFigma } = require("./figmaImporter.js");
        return importFromFigma(parsed);
      }

      // Check for Tailwind config structure
      if (hasProperty(parsed, "theme")) {
        const { importFromTailwind } = require("./tailwindImporter.js");
        return importFromTailwind(parsed);
      }

      // Default to generic JSON importer
      const { importFromJSON } = require("./jsonImporter.js");
      return importFromJSON(trimmed);
    } catch {
      // Not valid JSON, continue to other formats
    }
  }

  // Check if it's CSS
  if (trimmed.includes("--") || trimmed.includes(":root")) {
    const { importFromCSS } = require("./cssImporter.js");
    return importFromCSS(trimmed);
  }

  // Default to JSON importer
  const { importFromJSON } = require("./jsonImporter.js");
  return importFromJSON(trimmed);
}

function hasProperty(obj: unknown, prop: string): boolean {
  return typeof obj === "object" && obj !== null && prop in obj;
}
