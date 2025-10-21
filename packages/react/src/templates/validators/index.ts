/**
 * Template Validators
 * Validation utilities for templates
 */

export {
  hasSemanticNavigation,
  validateAccessibility,
  validateHeadingHierarchy,
  type AccessibilityIssue,
  type AccessibilityReport,
} from "./accessibility.js";

export {
  getComponentStats,
  validateStructure,
  type StructureIssue,
  type StructureReport,
} from "./structure.js";

export {
  findMagicNumbers,
  getTokenStats,
  hasConsistentTokenUsage,
  validateTokens,
  type TokenIssue,
  type TokenReport,
} from "./tokens.js";

import type { Template } from "../types.js";
import { validateAccessibility } from "./accessibility.js";
import { validateStructure } from "./structure.js";
import { validateTokens } from "./tokens.js";

/**
 * Combined validation report
 */
export interface ValidationReport {
  passed: boolean;
  accessibility: ReturnType<typeof validateAccessibility>;
  structure: ReturnType<typeof validateStructure>;
  tokens: ReturnType<typeof validateTokens>;
  summary: {
    totalIssues: number;
    errors: number;
    warnings: number;
    score: number;
  };
}

/**
 * Validate template comprehensively
 * Runs all validators and returns combined report
 */
export function validateTemplate(template: Template): ValidationReport {
  const accessibility = validateAccessibility(template);
  const structure = validateStructure(template);
  const tokens = validateTokens(template);

  const allIssues = [
    ...accessibility.issues,
    ...structure.issues,
    ...tokens.issues,
  ];

  const errors = allIssues.filter((i) => i.severity === "error").length;
  const warnings = allIssues.filter((i) => i.severity === "warning").length;

  // Calculate overall score (weighted average)
  const score = Math.round(
    accessibility.score * 0.4 +
      tokens.stats.compliance * 0.4 +
      (structure.valid ? 100 : 50) * 0.2,
  );

  return {
    passed: errors === 0,
    accessibility,
    structure,
    tokens,
    summary: {
      totalIssues: allIssues.length,
      errors,
      warnings,
      score,
    },
  };
}
