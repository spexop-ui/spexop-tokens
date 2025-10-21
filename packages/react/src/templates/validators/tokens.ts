/**
 * Token Validator
 * Validates templates for proper design token usage (no magic numbers)
 */

import type { Template, TemplateNode } from "../types.js";

export interface TokenIssue {
  severity: "error" | "warning" | "info";
  type: string;
  message: string;
  nodeId?: string;
  nodeType?: string;
  property?: string;
  value?: unknown;
}

export interface TokenReport {
  passed: boolean;
  issues: TokenIssue[];
  stats: {
    totalProperties: number;
    semanticTokens: number;
    magicNumbers: number;
    compliance: number;
  };
}

/**
 * Valid semantic spacing tokens
 */
const SEMANTIC_TOKENS = {
  spacing: ["xs", "sm", "md", "lg", "xl", "2xl"],
  size: ["xs", "sm", "base", "md", "lg", "xl", "2xl", "3xl", "4xl"],
  weight: ["regular", "semibold", "bold"],
  maxWidth: ["sm", "md", "lg", "xl", "2xl", "full"],
};

/**
 * Properties that should use semantic tokens
 */
const TOKEN_PROPERTIES = {
  spacing: ["padding", "margin", "gap"],
  size: ["size"],
  weight: ["weight"],
  maxWidth: ["maxWidth"],
};

/**
 * Validate template for token usage
 */
export function validateTokens(template: Template): TokenReport {
  const issues: TokenIssue[] = [];
  const stats = {
    totalProperties: 0,
    semanticTokens: 0,
    magicNumbers: 0,
    compliance: 0,
  };

  // Validate nodes recursively
  validateNodeTokens(template.structure, issues, stats);

  // Calculate compliance percentage
  stats.compliance =
    stats.totalProperties > 0
      ? Math.round((stats.semanticTokens / stats.totalProperties) * 100)
      : 100;

  return {
    passed: stats.magicNumbers === 0,
    issues,
    stats,
  };
}

/**
 * Validate node token usage
 */
function validateNodeTokens(
  node: TemplateNode,
  issues: TokenIssue[],
  stats: TokenReport["stats"],
): void {
  // Check props
  if (node.props) {
    for (const [key, value] of Object.entries(node.props)) {
      validateProperty(key, value, node, issues, stats);
    }
  }

  // Recurse to children
  if (node.children) {
    for (const child of node.children) {
      validateNodeTokens(child, issues, stats);
    }
  }
}

/**
 * Validate individual property
 */
function validateProperty(
  property: string,
  value: unknown,
  node: TemplateNode,
  issues: TokenIssue[],
  stats: TokenReport["stats"],
): void {
  // Check if property should use tokens
  let tokenCategory: keyof typeof SEMANTIC_TOKENS | null = null;

  for (const [category, properties] of Object.entries(TOKEN_PROPERTIES)) {
    if (properties.includes(property)) {
      tokenCategory = category as keyof typeof SEMANTIC_TOKENS;
      break;
    }
  }

  if (!tokenCategory) {
    return; // Property doesn't require token validation
  }

  stats.totalProperties++;

  // Check if value is a semantic token
  if (typeof value === "string") {
    if (SEMANTIC_TOKENS[tokenCategory].includes(value)) {
      stats.semanticTokens++;
    } else {
      // String value but not a semantic token
      issues.push({
        severity: "info",
        type: "non-semantic-token",
        message: `Property "${property}" uses "${value}" which is not a standard semantic token`,
        nodeId: node.id,
        nodeType: node.type,
        property,
        value,
      });
      stats.semanticTokens++; // Still a string token
    }
  } else if (typeof value === "number") {
    // Magic number detected
    stats.magicNumbers++;
    const suggestedToken = suggestSemanticToken(tokenCategory, value);

    issues.push({
      severity: "error",
      type: "magic-number",
      message: `Property "${property}" uses magic number ${value}. Use semantic token instead.${suggestedToken ? ` Suggestion: "${suggestedToken}"` : ""}`,
      nodeId: node.id,
      nodeType: node.type,
      property,
      value,
    });
  } else if (typeof value === "object" && value !== null) {
    // Responsive object - check each value
    for (const [breakpoint, breakpointValue] of Object.entries(value)) {
      if (typeof breakpointValue === "number") {
        stats.totalProperties++;
        stats.magicNumbers++;
        const suggestedToken = suggestSemanticToken(
          tokenCategory,
          breakpointValue,
        );

        issues.push({
          severity: "error",
          type: "magic-number-responsive",
          message: `Responsive property "${property}.${breakpoint}" uses magic number ${breakpointValue}. Use semantic token instead.${suggestedToken ? ` Suggestion: "${suggestedToken}"` : ""}`,
          nodeId: node.id,
          nodeType: node.type,
          property: `${property}.${breakpoint}`,
          value: breakpointValue,
        });
      } else if (typeof breakpointValue === "string") {
        stats.totalProperties++;
        stats.semanticTokens++;
      }
    }
  }
}

/**
 * Suggest semantic token based on numeric value
 */
function suggestSemanticToken(
  category: keyof typeof SEMANTIC_TOKENS,
  value: number,
): string | null {
  if (category === "spacing") {
    // Map common numeric values to semantic tokens
    const spacingMap: Record<number, string> = {
      1: "xs",
      2: "xs",
      3: "sm",
      4: "sm",
      5: "md",
      6: "md",
      7: "md",
      8: "lg",
      9: "lg",
      10: "lg",
      11: "xl",
      12: "xl",
    };
    return spacingMap[value] || null;
  }

  return null;
}

/**
 * Find all magic numbers in template
 */
export function findMagicNumbers(template: Template): Array<{
  nodeId?: string;
  nodeType: string;
  property: string;
  value: number;
}> {
  const magicNumbers: Array<{
    nodeId?: string;
    nodeType: string;
    property: string;
    value: number;
  }> = [];

  findNodeMagicNumbers(template.structure, magicNumbers);

  return magicNumbers;
}

/**
 * Find magic numbers in node
 */
function findNodeMagicNumbers(
  node: TemplateNode,
  magicNumbers: Array<{
    nodeId?: string;
    nodeType: string;
    property: string;
    value: number;
  }>,
): void {
  if (node.props) {
    for (const [key, value] of Object.entries(node.props)) {
      if (typeof value === "number") {
        magicNumbers.push({
          nodeId: node.id,
          nodeType: node.type,
          property: key,
          value,
        });
      }
    }
  }

  if (node.children) {
    for (const child of node.children) {
      findNodeMagicNumbers(child, magicNumbers);
    }
  }
}

/**
 * Get token usage statistics
 */
export function getTokenStats(template: Template): {
  semanticTokensUsed: string[];
  categoryCoverage: Record<string, number>;
} {
  const tokensUsed = new Set<string>();
  const categoryCounts: Record<string, number> = {
    spacing: 0,
    size: 0,
    weight: 0,
    maxWidth: 0,
  };

  collectTokens(template.structure, tokensUsed, categoryCounts);

  return {
    semanticTokensUsed: Array.from(tokensUsed).sort(),
    categoryCoverage: categoryCounts,
  };
}

/**
 * Collect tokens from node
 */
function collectTokens(
  node: TemplateNode,
  tokensUsed: Set<string>,
  categoryCounts: Record<string, number>,
): void {
  if (node.props) {
    for (const [key, value] of Object.entries(node.props)) {
      if (typeof value === "string") {
        // Check which category this token belongs to
        for (const [category, tokens] of Object.entries(SEMANTIC_TOKENS)) {
          if (tokens.includes(value)) {
            tokensUsed.add(value);
            categoryCounts[category]++;
            break;
          }
        }
      }
    }
  }

  if (node.children) {
    for (const child of node.children) {
      collectTokens(child, tokensUsed, categoryCounts);
    }
  }
}

/**
 * Check if template uses semantic tokens consistently
 */
export function hasConsistentTokenUsage(template: Template): boolean {
  const report = validateTokens(template);
  return report.passed && report.stats.compliance === 100;
}
