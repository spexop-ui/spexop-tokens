/**
 * Theme Validator
 * Validates theme configuration for correctness
 *
 * @module @spexop/theme/validators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";
import {
  type ColorValidationOptions,
  validateColor,
} from "../utils/colorValidation.js";

/**
 * Validation error with enhanced information
 */
export interface ValidationError {
  field: string;
  message: string;
  severity: "error" | "warning";
  hint?: string;
  example?: string;
  docsUrl?: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validation options for theme validation
 */
export interface ValidationOptions {
  /** Color validation options */
  colorOptions?: ColorValidationOptions;
  /** Validate accessibility (contrast ratios) */
  validateAccessibility?: boolean;
  /** Minimum contrast ratio for accessibility */
  minContrastRatio?: number;
  /** Allow warnings to be treated as errors */
  strictMode?: boolean;
}

/**
 * Enhanced error message templates
 */
const ERROR_TEMPLATES: Record<
  string,
  Omit<ValidationError, "field" | "severity">
> = {
  "meta.name": {
    message: "Theme name is required",
    hint: "Provide a descriptive name for your theme that identifies your brand or project",
    example: `meta: {\n  name: "My Brand Theme",\n  version: "1.0.0"\n}`,
    docsUrl: "https://spexop.com/docs/theme-configuration#meta",
  },
  "meta.version": {
    message: "Theme version is required",
    hint: "Use semantic versioning (e.g., 1.0.0) to track theme changes",
    example: `meta: {\n  name: "My Theme",\n  version: "1.0.0"\n}`,
    docsUrl: "https://spexop.com/docs/theme-configuration#meta",
  },
  "colors.primary": {
    message: "Primary color is required",
    hint: "The primary color is your brand's main color used for primary actions, links, and emphasis",
    example: `colors: {\n  primary: "#3b82f6"\n}`,
    docsUrl: "https://spexop.com/docs/colors#primary",
  },
  "typography.fontFamily": {
    message: "Font family is required",
    hint: "Specify the primary font family for your theme. Use web-safe fonts or ensure custom fonts are loaded",
    example: `typography: {\n  fontFamily: "Inter, system-ui, sans-serif"\n}`,
    docsUrl: "https://spexop.com/docs/typography#font-family",
  },
};

/**
 * Create enhanced error with template
 */
function createError(
  field: string,
  severity: "error" | "warning",
  customMessage?: string,
): ValidationError {
  const template = ERROR_TEMPLATES[field];

  if (template) {
    return {
      field,
      severity,
      ...template,
      ...(customMessage && { message: customMessage }),
    };
  }

  return {
    field,
    message: customMessage || `Validation failed for ${field}`,
    severity,
  };
}

/**
 * Validate theme configuration
 *
 * @param config - Theme configuration to validate
 * @param options - Validation options
 * @returns Validation result with any errors
 *
 * @example
 * ```typescript
 * const result = validateTheme(myTheme);
 * if (!result.valid) {
 *   for (const error of result.errors) {
 *     console.error(error.message);
 *     if (error.hint) console.log('Hint:', error.hint);
 *     if (error.example) console.log('Example:', error.example);
 *   }
 * }
 * ```
 */
export function validateTheme(
  config: SpexopThemeConfig,
  options: ValidationOptions = {},
): ValidationResult {
  const errors: ValidationError[] = [];
  const { colorOptions = {}, strictMode = false } = options;

  // Validate meta
  if (!config.meta.name || config.meta.name.trim() === "") {
    errors.push(createError("meta.name", "error"));
  }

  if (!config.meta.version || config.meta.version.trim() === "") {
    errors.push(createError("meta.version", "error"));
  }

  // Validate required colors
  const requiredColors = [
    "primary",
    "surface",
    "surfaceSecondary",
    "surfaceHover",
    "text",
    "textSecondary",
    "textMuted",
    "border",
    "borderStrong",
    "borderSubtle",
  ] as const;

  for (const colorKey of requiredColors) {
    const color = config.colors[colorKey];
    if (!color) {
      errors.push(
        createError(
          `colors.${colorKey}`,
          "error",
          `Color '${colorKey}' is required`,
        ),
      );
    } else {
      // Validate color format using enhanced validator
      const validation = validateColor(color, colorOptions);
      if (!validation.valid) {
        errors.push({
          field: `colors.${colorKey}`,
          message: `Invalid color format for '${colorKey}': ${color}`,
          severity: "error",
          hint: validation.reason,
          example: `colors: {\n  ${colorKey}: "#3b82f6"  // hex format\n  // or\n  ${colorKey}: "rgb(59, 130, 246)"  // RGB format\n  // or\n  ${colorKey}: "hsl(217, 91%, 60%)"  // HSL format\n}`,
          docsUrl: `https://spexop.com/docs/colors#${colorKey}`,
        });
      }
    }
  }

  // Validate typography
  if (!config.typography.fontFamily) {
    errors.push(createError("typography.fontFamily", "error"));
  }

  if (config.typography.baseSize < 12 || config.typography.baseSize > 24) {
    errors.push({
      field: "typography.baseSize",
      message: `Base size should be between 12px and 24px (current: ${config.typography.baseSize}px)`,
      severity: strictMode ? "error" : "warning",
      hint: "A base size between 14-16px is recommended for optimal readability",
      example: "typography: {\n  baseSize: 16\n}",
      docsUrl: "https://spexop.com/docs/typography#base-size",
    });
  }

  if (config.typography.scale < 1.1 || config.typography.scale > 1.5) {
    errors.push({
      field: "typography.scale",
      message: `Scale ratio should be between 1.1 and 1.5 (current: ${config.typography.scale})`,
      severity: strictMode ? "error" : "warning",
      hint: "Common scales: 1.125 (major second), 1.25 (major third), 1.333 (perfect fourth), 1.414 (augmented fourth)",
      example: "typography: {\n  scale: 1.25  // Major third scale\n}",
      docsUrl: "https://spexop.com/docs/typography#scale",
    });
  }

  // Validate spacing
  if (config.spacing.baseUnit < 2 || config.spacing.baseUnit > 8) {
    errors.push({
      field: "spacing.baseUnit",
      message: `Base unit should be between 2px and 8px (current: ${config.spacing.baseUnit}px)`,
      severity: strictMode ? "error" : "warning",
      hint: "A base unit of 4px or 8px is recommended for consistent spacing scales",
      example: "spacing: {\n  baseUnit: 4  // Common choice\n}",
      docsUrl: "https://spexop.com/docs/spacing#base-unit",
    });
  }

  // Validate borders
  if (config.borders.default < 1 || config.borders.default > 8) {
    errors.push({
      field: "borders.default",
      message: `Border width should be between 1px and 8px (current: ${config.borders.default}px)`,
      severity: strictMode ? "error" : "warning",
      hint: "Most designs use 1-2px for default borders. Spexop design system recommends 2px for strong visual boundaries",
      example: "borders: {\n  default: 2  // Spexop recommendation\n}",
      docsUrl: "https://spexop.com/docs/borders",
    });
  }

  return {
    valid: errors.filter((e) => e.severity === "error").length === 0,
    errors,
  };
}
