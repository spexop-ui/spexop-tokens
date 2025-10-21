/**
 * Accessibility Validator
 * Validates templates for WCAG compliance, ARIA attributes, and semantic HTML
 */

import type { Template, TemplateNode } from "../types.js";

export interface AccessibilityIssue {
  severity: "error" | "warning" | "info";
  type: string;
  message: string;
  nodeId?: string;
  nodeType?: string;
}

export interface AccessibilityReport {
  passed: boolean;
  score: number;
  issues: AccessibilityIssue[];
  recommendations: string[];
}

/**
 * Validate template for accessibility compliance
 */
export function validateAccessibility(template: Template): AccessibilityReport {
  const issues: AccessibilityIssue[] = [];
  const recommendations: string[] = [];

  // Check template structure
  validateTemplateStructure(template, issues, recommendations);

  // Check nodes recursively
  validateNode(template.structure, issues, recommendations);

  // Calculate score
  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  const score = Math.max(0, 100 - errorCount * 10 - warningCount * 5);

  return {
    passed: errorCount === 0,
    score,
    issues,
    recommendations,
  };
}

/**
 * Validate template-level structure
 */
function validateTemplateStructure(
  template: Template,
  issues: AccessibilityIssue[],
  recommendations: string[],
): void {
  // Check for accessibility metadata
  if (!template.meta.accessibility) {
    recommendations.push(
      "Consider adding accessibility metadata (landmarks, skip links, focus management)",
    );
  }

  // Check for accessibility-first tag
  if (!template.meta.tags.includes("accessibility-first")) {
    recommendations.push(
      'Add "accessibility-first" tag to indicate WCAG compliance',
    );
  }

  // Validate accessibility metadata if present
  if (template.meta.accessibility) {
    const { landmarks, skipLinks } = template.meta.accessibility;

    if (landmarks.length === 0) {
      issues.push({
        severity: "warning",
        type: "missing-landmarks",
        message: "Template has accessibility metadata but no landmarks defined",
      });
    }

    // Check for skip links in complex layouts
    if (landmarks.length > 2 && skipLinks.length === 0) {
      recommendations.push(
        "Consider adding skip navigation links for complex multi-section layouts",
      );
    }
  }
}

/**
 * Validate individual node for accessibility
 */
function validateNode(
  node: TemplateNode,
  issues: AccessibilityIssue[],
  recommendations: string[],
  parent?: TemplateNode,
): void {
  // Check semantic landmarks
  validateSemanticLandmarks(node, issues, recommendations);

  // Check ARIA attributes
  validateAriaAttributes(node, issues);

  // Check interactive elements
  validateInteractiveElements(node, issues, recommendations);

  // Check form accessibility
  validateFormAccessibility(node, issues, parent);

  // Validate children recursively
  if (node.children) {
    for (const child of node.children) {
      validateNode(child, issues, recommendations, node);
    }
  }
}

/**
 * Validate semantic landmarks
 */
function validateSemanticLandmarks(
  node: TemplateNode,
  issues: AccessibilityIssue[],
  recommendations: string[],
): void {
  const semanticElements = [
    "Main",
    "Nav",
    "Header",
    "Footer",
    "Aside",
    "Article",
  ];

  if (semanticElements.includes(node.type)) {
    // Check for ARIA label on landmark
    if (!node.ariaLabel && !node.props?.["aria-label"]) {
      issues.push({
        severity: "warning",
        type: "missing-aria-label",
        message: `Semantic landmark "${node.type}" should have an aria-label`,
        nodeId: node.id,
        nodeType: node.type,
      });
    }

    // Check for role attribute
    if (!node.role) {
      recommendations.push(
        `Consider adding explicit role attribute to "${node.type}" landmark`,
      );
    }
  }
}

/**
 * Validate ARIA attributes
 */
function validateAriaAttributes(
  node: TemplateNode,
  issues: AccessibilityIssue[],
): void {
  // Check for aria-describedby without corresponding element
  if (node.ariaDescribedBy && !node.id) {
    issues.push({
      severity: "error",
      type: "invalid-aria-describedby",
      message: "aria-describedby references should have an id",
      nodeType: node.type,
    });
  }

  // Check for aria-current on non-link elements
  if (node.ariaCurrent && node.type !== "Link") {
    issues.push({
      severity: "warning",
      type: "misplaced-aria-current",
      message:
        'aria-current is typically used on Link elements for "page" state',
      nodeId: node.id,
      nodeType: node.type,
    });
  }
}

/**
 * Validate interactive elements
 */
function validateInteractiveElements(
  node: TemplateNode,
  issues: AccessibilityIssue[],
  recommendations: string[],
): void {
  const interactiveElements = ["Button", "Link", "Input", "Checkbox"];

  if (interactiveElements.includes(node.type)) {
    // Check for accessible name
    if (
      !node.ariaLabel &&
      !node.content &&
      !node.children &&
      !node.props?.["aria-label"]
    ) {
      issues.push({
        severity: "error",
        type: "missing-accessible-name",
        message: `Interactive element "${node.type}" must have an accessible name (content, children, or aria-label)`,
        nodeId: node.id,
        nodeType: node.type,
      });
    }

    // Recommend ARIA labels for icon-only buttons
    if (node.type === "Button" && !node.content && node.children) {
      const hasOnlyIcons = node.children.every(
        (child) => child.type === "Icon",
      );
      if (hasOnlyIcons && !node.ariaLabel) {
        issues.push({
          severity: "warning",
          type: "icon-button-missing-label",
          message: "Icon-only buttons should have aria-label",
          nodeId: node.id,
          nodeType: node.type,
        });
      }
    }
  }

  // Check Icon accessibility
  if (node.type === "Icon") {
    recommendations.push(
      "Ensure decorative icons use aria-hidden and meaningful icons have labels",
    );
  }
}

/**
 * Validate form accessibility
 */
function validateFormAccessibility(
  node: TemplateNode,
  issues: AccessibilityIssue[],
  parent?: TemplateNode,
): void {
  // Check inputs have labels
  if (node.type === "Input") {
    if (!node.ariaLabel && !node.props?.["aria-label"]) {
      // Check if there's a Label sibling
      const hasLabel = parent?.children?.some(
        (child) => child.type === "Label" && child.props?.htmlFor === node.id,
      );

      if (!hasLabel) {
        issues.push({
          severity: "error",
          type: "input-missing-label",
          message: "Input must have associated Label or aria-label",
          nodeId: node.id,
          nodeType: node.type,
        });
      }
    }

    // Check for aria-describedby for error messages
    if (!node.ariaDescribedBy) {
      issues.push({
        severity: "info",
        type: "input-missing-error-association",
        message: "Consider adding aria-describedby to associate error messages",
        nodeId: node.id,
        nodeType: node.type,
      });
    }
  }

  // Check Label has htmlFor
  if (node.type === "Label" && !node.props?.htmlFor) {
    issues.push({
      severity: "warning",
      type: "label-missing-htmlfor",
      message: "Label should have htmlFor attribute to associate with input",
      nodeId: node.id,
      nodeType: node.type,
    });
  }
}

/**
 * Check if template uses semantic navigation
 */
export function hasSemanticNavigation(template: Template): boolean {
  return hasNodeType(template.structure, "Nav");
}

/**
 * Check if template has proper heading hierarchy
 */
export function validateHeadingHierarchy(template: Template): boolean {
  const headings: number[] = [];
  collectHeadings(template.structure, headings);

  // Check if headings start at 1
  if (headings.length > 0 && headings[0] !== 1) {
    return false;
  }

  // Check if headings don't skip levels
  for (let i = 1; i < headings.length; i++) {
    if (headings[i] > headings[i - 1] + 1) {
      return false;
    }
  }

  return true;
}

/**
 * Helper: Check if node type exists in tree
 */
function hasNodeType(node: TemplateNode, type: string): boolean {
  if (node.type === type) {
    return true;
  }

  if (node.children) {
    return node.children.some((child) => hasNodeType(child, type));
  }

  return false;
}

/**
 * Helper: Collect heading levels
 */
function collectHeadings(node: TemplateNode, levels: number[]): void {
  if (node.type === "Heading" && typeof node.props?.level === "number") {
    levels.push(node.props.level as number);
  }

  if (node.children) {
    for (const child of node.children) {
      collectHeadings(child, levels);
    }
  }
}
