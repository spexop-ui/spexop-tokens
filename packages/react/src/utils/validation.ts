/**
 * Validation Utilities
 * Token-aware prop validation with helpful warnings
 */

import type {
  BreakpointKey,
  ResponsiveValidationResult,
  SpacingValue,
  ValidationResult,
} from "./validation.types.js";

const VALID_BREAKPOINTS: BreakpointKey[] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
];

const SPACING_TOKEN_MAP: Record<SpacingValue, string> = {
  0: "0px (sSpacing0)",
  1: "4px (sSpacing1)",
  2: "8px (sSpacing2)",
  3: "12px (sSpacing3)",
  4: "16px (sSpacing4)",
  5: "20px (sSpacing5)",
  6: "24px (sSpacing6)",
  7: "32px (sSpacing7)",
  8: "40px (sSpacing8)",
  9: "48px (sSpacing9)",
  10: "64px (sSpacing10)",
};

// Track shown warnings to prevent spam (development only)
const shownWarnings = new Set<string>();

/**
 * Check if running in development mode
 */
function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * Log warning message (development only, once per unique message)
 */
function warn(component: string, message: string): void {
  if (isDevelopment()) {
    const warningKey = `${component}:${message}`;
    if (!shownWarnings.has(warningKey)) {
      console.warn(`[Spexop] ${component}: ${message}`);
      shownWarnings.add(warningKey);
    }
  }
}

/**
 * Validate spacing value (0-10 scale)
 */
export function validateSpacing(
  component: string,
  propName: string,
  value: unknown,
): ValidationResult {
  if (typeof value !== "number") {
    return { isValid: true }; // Responsive object, skip
  }

  if (value < 0 || value > 10 || !Number.isInteger(value)) {
    warn(
      component,
      `${propName} must be 0-10 (spacing scale: sSpacing0-sSpacing10). You provided: ${value}`,
    );
    return {
      isValid: false,
      message: `${propName} must be an integer between 0-10`,
    };
  }

  return { isValid: true };
}

/**
 * Validate responsive object breakpoint keys
 */
export function validateResponsiveKeys(
  component: string,
  propName: string,
  value: Record<string, unknown>,
): ResponsiveValidationResult {
  const keys = Object.keys(value);
  const invalidKeys = keys.filter(
    (key) => !VALID_BREAKPOINTS.includes(key as BreakpointKey),
  );

  if (invalidKeys.length > 0) {
    warn(
      component,
      `${propName} has invalid breakpoint keys: ${invalidKeys.join(", ")}. Valid keys are: ${VALID_BREAKPOINTS.join(", ")} (from sBreakpoint* tokens)`,
    );
    return {
      isValid: false,
      invalidKeys,
      message: `Invalid breakpoint keys: ${invalidKeys.join(", ")}`,
    };
  }

  return { isValid: true };
}

/**
 * Validate Grid span value (1-24)
 */
export function validateGridSpan(
  component: string,
  value: unknown,
): ValidationResult {
  if (typeof value !== "number") {
    return { isValid: true }; // Responsive object, skip
  }

  if (value < 1 || value > 24 || !Number.isInteger(value)) {
    warn(
      component,
      `span must be 1-24 (max grid columns). You provided: ${value}`,
    );
    return {
      isValid: false,
      message: "span must be an integer between 1-24",
    };
  }

  return { isValid: true };
}

/**
 * Validate GridItem rowSpan value (1-12)
 */
export function validateRowSpan(
  component: string,
  value: unknown,
): ValidationResult {
  if (typeof value !== "number") {
    return { isValid: true }; // Responsive object, skip
  }

  if (value < 1 || value > 12 || !Number.isInteger(value)) {
    warn(component, `rowSpan must be 1-12. You provided: ${value}`);
    return {
      isValid: false,
      message: "rowSpan must be an integer between 1-12",
    };
  }

  return { isValid: true };
}

/**
 * Validate conflicting props
 */
export function validateNoConflict(
  component: string,
  condition: boolean,
  message: string,
): ValidationResult {
  if (condition) {
    warn(component, message);
    return { isValid: false, message };
  }

  return { isValid: true };
}

/**
 * Suggest correct spacing token usage
 */
export function suggestSpacingToken(value: number): string | undefined {
  // Common pixel values that map to tokens
  const pixelToToken: Record<number, SpacingValue> = {
    0: 0,
    4: 1,
    8: 2,
    12: 3,
    16: 4,
    20: 5,
    24: 6,
    32: 7,
    40: 8,
    48: 9,
    64: 10,
  };

  const tokenValue = pixelToToken[value];
  if (tokenValue !== undefined) {
    return `Did you mean gap={${tokenValue}} (${SPACING_TOKEN_MAP[tokenValue]})?`;
  }

  return undefined;
}

/**
 * Validate Container maxWidth value
 */
export function validateMaxWidth(value: unknown): ValidationResult {
  if (typeof value !== "string") {
    return { isValid: true }; // Responsive object, skip
  }

  const validValues = ["xs", "sm", "md", "lg", "xl", "2xl", "full"];
  if (!validValues.includes(value)) {
    warn(
      "Container",
      `maxWidth must be one of: ${validValues.join(", ")} (based on sBreakpoint* tokens). You provided: ${value}`,
    );
    return {
      isValid: false,
      message: `Invalid maxWidth value: ${value}`,
    };
  }

  return { isValid: true };
}

/**
 * Get spacing token information
 */
export function getSpacingTokenInfo(value: SpacingValue): string {
  return SPACING_TOKEN_MAP[value] || `${value} (unknown token)`;
}
