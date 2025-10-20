/**
 * Validation Types
 * Type definitions for prop validation utilities
 */

export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface ResponsiveValidationResult {
  isValid: boolean;
  invalidKeys?: string[];
  message?: string;
}
