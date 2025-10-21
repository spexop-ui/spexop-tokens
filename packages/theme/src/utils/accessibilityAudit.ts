/**
 * Accessibility Audit Utilities
 * Comprehensive WCAG 2.1 compliance auditing for themes
 *
 * @module @spexop/theme/utils
 */

import type { SpexopThemeConfig, ThemeColors } from "../types/index.js";
import { calculateContrastRatio, checkContrast } from "./contrastChecker.js";

/**
 * WCAG compliance level
 */
export type WCAGLevel = "AA" | "AAA";

/**
 * Accessibility issue severity
 */
export type IssueSeverity = "error" | "warning" | "info";

/**
 * Accessibility issue
 */
export interface AccessibilityIssue {
  /** Issue category */
  category: "contrast" | "color-blindness" | "structure" | "semantics";
  /** Severity level */
  severity: IssueSeverity;
  /** Issue description */
  message: string;
  /** Affected element/field */
  field: string;
  /** Current value */
  currentValue?: string | number;
  /** Recommended fix */
  recommendation?: string;
  /** WCAG criterion reference */
  wcagCriterion?: string;
}

/**
 * Accessibility audit result
 */
export interface AccessibilityAuditResult {
  /** Overall pass/fail */
  passed: boolean;
  /** WCAG level tested */
  level: WCAGLevel;
  /** All issues found */
  issues: AccessibilityIssue[];
  /** Pass rate percentage */
  passRate: number;
  /** Summary statistics */
  summary: {
    totalChecks: number;
    passed: number;
    failed: number;
    warnings: number;
  };
}

/**
 * Audit theme accessibility
 *
 * @param theme - Theme to audit
 * @param level - WCAG level to test against (AA or AAA)
 * @returns Comprehensive audit result
 *
 * @example
 * ```typescript
 * const result = auditThemeAccessibility(theme, "AA");
 *
 * if (!result.passed) {
 *   console.error(`Failed ${result.issues.length} accessibility checks`);
 *   for (const issue of result.issues) {
 *     console.log(`${issue.severity}: ${issue.message}`);
 *     console.log(`Fix: ${issue.recommendation}`);
 *   }
 * }
 * ```
 */
export function auditThemeAccessibility(
  theme: SpexopThemeConfig,
  level: WCAGLevel = "AA",
): AccessibilityAuditResult {
  const issues: AccessibilityIssue[] = [];
  const minRatio = level === "AAA" ? 7.0 : 4.5;
  const minUIRatio = level === "AAA" ? 4.5 : 3.0;

  let totalChecks = 0;
  let passedChecks = 0;

  // Check text on surface contrast
  const textContrast = checkContrast(theme.colors.text, theme.colors.surface);
  totalChecks++;

  if (!textContrast.AAA && level === "AAA") {
    issues.push({
      category: "contrast",
      severity: "error",
      message: `Text on surface fails WCAG AAA (${textContrast.ratio}:1, need 7:1)`,
      field: "colors.text / colors.surface",
      currentValue: textContrast.ratio,
      recommendation: `Increase contrast between text (#${theme.colors.text}) and surface (#${theme.colors.surface}) to at least 7:1`,
      wcagCriterion: "1.4.6 Contrast (Enhanced)",
    });
  } else if (!textContrast.AA) {
    issues.push({
      category: "contrast",
      severity: "error",
      message: `Text on surface fails WCAG AA (${textContrast.ratio}:1, need 4.5:1)`,
      field: "colors.text / colors.surface",
      currentValue: textContrast.ratio,
      recommendation:
        "Increase contrast between text and surface to at least 4.5:1",
      wcagCriterion: "1.4.3 Contrast (Minimum)",
    });
  } else {
    passedChecks++;
  }

  // Check secondary text contrast
  const secondaryTextContrast = checkContrast(
    theme.colors.textSecondary,
    theme.colors.surface,
  );
  totalChecks++;

  if (secondaryTextContrast.ratio < minRatio) {
    issues.push({
      category: "contrast",
      severity: level === "AAA" ? "error" : "warning",
      message: `Secondary text contrast is ${secondaryTextContrast.ratio.toFixed(2)}:1 (need ${minRatio}:1)`,
      field: "colors.textSecondary / colors.surface",
      currentValue: secondaryTextContrast.ratio,
      recommendation: "Darken secondary text color or lighten surface",
      wcagCriterion: level === "AAA" ? "1.4.6" : "1.4.3",
    });
  } else {
    passedChecks++;
  }

  // Check muted text contrast
  const mutedTextContrast = checkContrast(
    theme.colors.textMuted,
    theme.colors.surface,
  );
  totalChecks++;

  if (mutedTextContrast.ratio < minRatio) {
    issues.push({
      category: "contrast",
      severity: "warning",
      message: `Muted text contrast is ${mutedTextContrast.ratio.toFixed(2)}:1 (need ${minRatio}:1)`,
      field: "colors.textMuted / colors.surface",
      currentValue: mutedTextContrast.ratio,
      recommendation: "Consider darkening muted text for better accessibility",
      wcagCriterion: level === "AAA" ? "1.4.6" : "1.4.3",
    });
  } else {
    passedChecks++;
  }

  // Check primary on surface contrast
  const primaryContrast = checkContrast(
    theme.colors.primary,
    theme.colors.surface,
  );
  totalChecks++;

  if (primaryContrast.ratio < minUIRatio) {
    issues.push({
      category: "contrast",
      severity: "error",
      message: `Primary color contrast is ${primaryContrast.ratio.toFixed(2)}:1 (need ${minUIRatio}:1 for UI elements)`,
      field: "colors.primary / colors.surface",
      currentValue: primaryContrast.ratio,
      recommendation:
        "Adjust primary color lightness to meet minimum UI contrast",
      wcagCriterion: "1.4.11 Non-text Contrast",
    });
  } else {
    passedChecks++;
  }

  // Check border contrast
  const borderContrast = checkContrast(
    theme.colors.border,
    theme.colors.surface,
  );
  totalChecks++;

  if (borderContrast.ratio < minUIRatio) {
    issues.push({
      category: "contrast",
      severity: "warning",
      message: `Border contrast is ${borderContrast.ratio.toFixed(2)}:1 (need ${minUIRatio}:1)`,
      field: "colors.border / colors.surface",
      currentValue: borderContrast.ratio,
      recommendation:
        "Increase border visibility for better UI element definition",
      wcagCriterion: "1.4.11 Non-text Contrast",
    });
  } else {
    passedChecks++;
  }

  // Check semantic colors if present
  if (theme.colors.success) {
    const successContrast = checkContrast(
      theme.colors.success,
      theme.colors.surface,
    );
    totalChecks++;

    if (successContrast.ratio < minUIRatio) {
      issues.push({
        category: "contrast",
        severity: "warning",
        message: `Success color contrast is ${successContrast.ratio.toFixed(2)}:1`,
        field: "colors.success / colors.surface",
        currentValue: successContrast.ratio,
        recommendation: "Ensure success indicators are clearly visible",
        wcagCriterion: "1.4.11 Non-text Contrast",
      });
    } else {
      passedChecks++;
    }
  }

  if (theme.colors.error) {
    const errorContrast = checkContrast(
      theme.colors.error,
      theme.colors.surface,
    );
    totalChecks++;

    if (errorContrast.ratio < minUIRatio) {
      issues.push({
        category: "contrast",
        severity: "error",
        message: `Error color contrast is ${errorContrast.ratio.toFixed(2)}:1 (critical for users)`,
        field: "colors.error / colors.surface",
        currentValue: errorContrast.ratio,
        recommendation:
          "Error indicators must be clearly visible for accessibility",
        wcagCriterion: "1.4.11 Non-text Contrast",
      });
    } else {
      passedChecks++;
    }
  }

  if (theme.colors.warning) {
    const warningContrast = checkContrast(
      theme.colors.warning,
      theme.colors.surface,
    );
    totalChecks++;

    if (warningContrast.ratio < minUIRatio) {
      issues.push({
        category: "contrast",
        severity: "warning",
        message: `Warning color contrast is ${warningContrast.ratio.toFixed(2)}:1`,
        field: "colors.warning / colors.surface",
        currentValue: warningContrast.ratio,
        recommendation: "Warning indicators should be clearly visible",
        wcagCriterion: "1.4.11 Non-text Contrast",
      });
    } else {
      passedChecks++;
    }
  }

  // Check typography settings
  if (theme.typography.baseSize < 14) {
    totalChecks++;
    issues.push({
      category: "structure",
      severity: "warning",
      message: `Base font size is ${theme.typography.baseSize}px (recommended: 14-16px)`,
      field: "typography.baseSize",
      currentValue: theme.typography.baseSize,
      recommendation: "Increase base font size for better readability",
      wcagCriterion: "1.4.12 Text Spacing",
    });
  } else {
    totalChecks++;
    passedChecks++;
  }

  // Calculate summary
  const failedChecks = totalChecks - passedChecks;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  const passRate = Math.round((passedChecks / totalChecks) * 100);

  return {
    passed: issues.filter((i) => i.severity === "error").length === 0,
    level,
    issues,
    passRate,
    summary: {
      totalChecks,
      passed: passedChecks,
      failed: failedChecks,
      warnings: warningCount,
    },
  };
}

/**
 * Get accessibility score (0-100)
 *
 * @param theme - Theme to score
 * @returns Score from 0 (poor) to 100 (excellent)
 */
export function getAccessibilityScore(theme: SpexopThemeConfig): number {
  const auditAA = auditThemeAccessibility(theme, "AA");
  const auditAAA = auditThemeAccessibility(theme, "AAA");

  // Base score from AA compliance
  let score = auditAA.passRate;

  // Bonus points for AAA compliance
  const aaaBonus = (auditAAA.passRate / 100) * 20;
  score = Math.min(100, score + aaaBonus);

  return Math.round(score);
}

/**
 * Generate accessibility report
 *
 * @param theme - Theme to audit
 * @returns Detailed accessibility report
 *
 * @example
 * ```typescript
 * const report = generateAccessibilityReport(theme);
 * console.log(report.title);
 * console.log(report.summary);
 * for (const section of report.sections) {
 *   console.log(`\n${section.title}`);
 *   for (const item of section.items) {
 *     console.log(`  ${item.status} ${item.description}`);
 *   }
 * }
 * ```
 */
export function generateAccessibilityReport(theme: SpexopThemeConfig): {
  title: string;
  summary: string;
  score: number;
  level: WCAGLevel;
  sections: Array<{
    title: string;
    items: Array<{
      status: "pass" | "fail" | "warning";
      description: string;
      details?: string;
    }>;
  }>;
} {
  const auditAA = auditThemeAccessibility(theme, "AA");
  const auditAAA = auditThemeAccessibility(theme, "AAA");
  const score = getAccessibilityScore(theme);

  const sections = [
    {
      title: "Text Contrast (WCAG AA)",
      items: auditAA.issues
        .filter((i) => i.category === "contrast" && i.field.includes("text"))
        .map((issue) => ({
          status: (issue.severity === "error"
            ? "fail"
            : issue.severity === "warning"
              ? "warning"
              : "pass") as "pass" | "fail" | "warning",
          description: issue.message,
          details: issue.recommendation,
        })),
    },
    {
      title: "UI Element Contrast (WCAG 1.4.11)",
      items: auditAA.issues
        .filter(
          (i) =>
            i.category === "contrast" &&
            (i.field.includes("primary") || i.field.includes("border")),
        )
        .map((issue) => ({
          status: (issue.severity === "error" ? "fail" : "warning") as
            | "pass"
            | "fail"
            | "warning",
          description: issue.message,
          details: issue.recommendation,
        })),
    },
    {
      title: "Typography & Structure",
      items: auditAA.issues
        .filter((i) => i.category === "structure")
        .map((issue) => ({
          status: (issue.severity === "error" ? "fail" : "warning") as
            | "pass"
            | "fail"
            | "warning",
          description: issue.message,
          details: issue.recommendation,
        })),
    },
  ];

  // Add passing items
  if (auditAA.summary.passed > 0) {
    sections.unshift({
      title: "Passed Checks",
      items: [
        {
          status: "pass",
          description: `${auditAA.summary.passed} out of ${auditAA.summary.totalChecks} checks passed`,
          details: `WCAG ${auditAA.level} compliance: ${auditAA.passRate}%`,
        },
      ],
    });
  }

  return {
    title: `Accessibility Audit: ${theme.meta.name}`,
    summary: auditAA.passed
      ? `✅ Theme meets WCAG ${auditAA.level} standards (Score: ${score}/100)`
      : `❌ Theme has ${auditAA.issues.filter((i) => i.severity === "error").length} critical accessibility issues`,
    score,
    level: auditAA.level,
    sections,
  };
}

/**
 * Quick accessibility check
 *
 * @param colors - Theme colors to check
 * @returns True if basic accessibility requirements are met
 */
export function isAccessible(colors: ThemeColors): boolean {
  const textContrast = calculateContrastRatio(colors.text, colors.surface);
  const primaryContrast = calculateContrastRatio(
    colors.primary,
    colors.surface,
  );

  return textContrast >= 4.5 && primaryContrast >= 3.0;
}

/**
 * Get accessibility recommendations for a theme
 *
 * @param theme - Theme to analyze
 * @returns Array of actionable recommendations
 */
export function getAccessibilityRecommendations(
  theme: SpexopThemeConfig,
): string[] {
  const audit = auditThemeAccessibility(theme, "AA");
  const recommendations: string[] = [];

  // Group by severity
  const errors = audit.issues.filter((i) => i.severity === "error");
  const warnings = audit.issues.filter((i) => i.severity === "warning");

  if (errors.length > 0) {
    recommendations.push(`Fix ${errors.length} critical accessibility errors`);
    for (const error of errors.slice(0, 3)) {
      if (error.recommendation) {
        recommendations.push(`  - ${error.recommendation}`);
      }
    }
  }

  if (warnings.length > 0 && errors.length === 0) {
    recommendations.push(
      `Address ${warnings.length} accessibility warnings for enhanced compliance`,
    );
  }

  if (audit.passed) {
    const aaaAudit = auditThemeAccessibility(theme, "AAA");
    if (!aaaAudit.passed) {
      recommendations.push(
        "Consider improving to WCAG AAA standards for enhanced accessibility",
      );
    }
  }

  return recommendations;
}

/**
 * Batch audit multiple themes
 *
 * @param themes - Themes to audit
 * @param level - WCAG level
 * @returns Audit results for each theme
 */
export function batchAudit(
  themes: SpexopThemeConfig[],
  level: WCAGLevel = "AA",
): Array<{
  theme: string;
  result: AccessibilityAuditResult;
}> {
  return themes.map((theme) => ({
    theme: theme.meta.name,
    result: auditThemeAccessibility(theme, level),
  }));
}

/**
 * Compare accessibility between themes
 *
 * @param themes - Themes to compare
 * @returns Comparison report
 */
export function compareAccessibility(themes: SpexopThemeConfig[]): {
  themes: string[];
  scores: number[];
  best: string;
  worst: string;
  average: number;
} {
  const scores = themes.map((theme) => ({
    name: theme.meta.name,
    score: getAccessibilityScore(theme),
  }));

  const scoreValues = scores.map((s) => s.score);
  const best = scores.reduce((a, b) => (a.score > b.score ? a : b)).name;
  const worst = scores.reduce((a, b) => (a.score < b.score ? a : b)).name;
  const average = Math.round(
    scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length,
  );

  return {
    themes: scores.map((s) => s.name),
    scores: scoreValues,
    best,
    worst,
    average,
  };
}
