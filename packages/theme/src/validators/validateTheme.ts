/**
 * Theme Validator
 * Validates theme configuration for correctness
 *
 * @module @spexop/theme/validators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

/**
 * Validation error
 */
export interface ValidationError {
  field: string;
  message: string;
  severity: "error" | "warning";
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validate hex color format
 */
function isValidHexColor(color: string): boolean {
  return /^#[0-9A-F]{6}$/i.test(color);
}

/**
 * Validate theme configuration
 *
 * @param config - Theme configuration to validate
 * @returns Validation result with any errors
 */
export function validateTheme(config: SpexopThemeConfig): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate meta
  if (!config.meta.name || config.meta.name.trim() === "") {
    errors.push({
      field: "meta.name",
      message: "Theme name is required",
      severity: "error",
    });
  }

  if (!config.meta.version || config.meta.version.trim() === "") {
    errors.push({
      field: "meta.version",
      message: "Theme version is required",
      severity: "error",
    });
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
      errors.push({
        field: `colors.${colorKey}`,
        message: `Color ${colorKey} is required`,
        severity: "error",
      });
    } else if (!isValidHexColor(color)) {
      errors.push({
        field: `colors.${colorKey}`,
        message: `Invalid hex color format: ${color}`,
        severity: "error",
      });
    }
  }

  // Validate typography
  if (!config.typography.fontFamily) {
    errors.push({
      field: "typography.fontFamily",
      message: "Font family is required",
      severity: "error",
    });
  }

  if (config.typography.baseSize < 12 || config.typography.baseSize > 24) {
    errors.push({
      field: "typography.baseSize",
      message: "Base size should be between 12px and 24px",
      severity: "warning",
    });
  }

  if (config.typography.scale < 1.1 || config.typography.scale > 1.5) {
    errors.push({
      field: "typography.scale",
      message: "Scale ratio should be between 1.1 and 1.5",
      severity: "warning",
    });
  }

  // Validate spacing
  if (config.spacing.baseUnit < 2 || config.spacing.baseUnit > 8) {
    errors.push({
      field: "spacing.baseUnit",
      message: "Base unit should be between 2px and 8px",
      severity: "warning",
    });
  }

  // Validate borders
  if (config.borders.default < 1 || config.borders.default > 8) {
    errors.push({
      field: "borders.default",
      message: "Border width should be between 1px and 8px",
      severity: "warning",
    });
  }

  return {
    valid: errors.filter((e) => e.severity === "error").length === 0,
    errors,
  };
}
