/**
 * Structure Validator
 * Validates template structure for consistency, completeness, and best practices
 */

import type { Template, TemplateNode } from "../types.js";

export interface StructureIssue {
  severity: "error" | "warning" | "info";
  type: string;
  message: string;
  nodeId?: string;
  nodeType?: string;
}

export interface StructureReport {
  valid: boolean;
  issues: StructureIssue[];
  stats: {
    totalNodes: number;
    depth: number;
    hasCustomization: boolean;
    editableTextCount: number;
    editableImagesCount: number;
  };
}

/**
 * Validate template structure
 */
export function validateStructure(template: Template): StructureReport {
  const issues: StructureIssue[] = [];

  // Validate metadata
  validateMetadata(template, issues);

  // Validate structure
  const stats = {
    totalNodes: 0,
    depth: 0,
    hasCustomization: !!template.customization,
    editableTextCount: template.customization?.content.editableText.length || 0,
    editableImagesCount:
      template.customization?.content.editableImages.length || 0,
  };

  validateNodeStructure(template.structure, issues, stats, 0);

  // Validate customization
  validateCustomization(template, issues);

  return {
    valid: issues.filter((i) => i.severity === "error").length === 0,
    issues,
    stats,
  };
}

/**
 * Validate template metadata
 */
function validateMetadata(template: Template, issues: StructureIssue[]): void {
  const { meta } = template;

  // Check required fields
  if (!meta.id || meta.id.trim() === "") {
    issues.push({
      severity: "error",
      type: "missing-id",
      message: "Template must have a non-empty id",
    });
  }

  if (!meta.name || meta.name.trim() === "") {
    issues.push({
      severity: "error",
      type: "missing-name",
      message: "Template must have a non-empty name",
    });
  }

  if (!meta.description || meta.description.trim() === "") {
    issues.push({
      severity: "error",
      type: "missing-description",
      message: "Template must have a non-empty description",
    });
  }

  // Check ID format (kebab-case)
  if (meta.id && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(meta.id)) {
    issues.push({
      severity: "warning",
      type: "invalid-id-format",
      message: 'Template ID should be kebab-case (e.g., "hero-centered")',
    });
  }

  // Check tags
  if (!meta.tags || meta.tags.length === 0) {
    issues.push({
      severity: "warning",
      type: "missing-tags",
      message: "Template should have at least one tag for discoverability",
    });
  }

  // Check version format
  if (meta.version && !/^\d+\.\d+\.\d+$/.test(meta.version)) {
    issues.push({
      severity: "warning",
      type: "invalid-version",
      message: 'Version should follow semver format (e.g., "1.0.0")',
    });
  }
}

/**
 * Validate node structure recursively
 */
function validateNodeStructure(
  node: TemplateNode,
  issues: StructureIssue[],
  stats: StructureReport["stats"],
  depth: number,
): void {
  stats.totalNodes++;
  stats.depth = Math.max(stats.depth, depth);

  // Check node type
  if (!node.type || node.type.trim() === "") {
    issues.push({
      severity: "error",
      type: "missing-node-type",
      message: "Node must have a type",
      nodeId: node.id,
    });
  }

  // Check for props object
  if (typeof node.props !== "object" || node.props === null) {
    issues.push({
      severity: "error",
      type: "invalid-props",
      message: "Node must have a props object (can be empty)",
      nodeId: node.id,
      nodeType: node.type,
    });
  }

  // Warn about excessive depth
  if (depth > 10) {
    issues.push({
      severity: "warning",
      type: "excessive-depth",
      message: `Node depth (${depth}) is very deep, consider simplifying structure`,
      nodeId: node.id,
      nodeType: node.type,
    });
  }

  // Check for id uniqueness in customizable nodes
  if (node.id && /\s/.test(node.id)) {
    issues.push({
      severity: "warning",
      type: "invalid-id-format",
      message: "Node IDs should not contain spaces (use kebab-case)",
      nodeId: node.id,
      nodeType: node.type,
    });
  }

  // Validate specific node types
  validateSpecificNodeType(node, issues);

  // Recurse to children
  if (node.children) {
    for (const child of node.children) {
      validateNodeStructure(child, issues, stats, depth + 1);
    }
  }
}

/**
 * Validate specific node types
 */
function validateSpecificNodeType(
  node: TemplateNode,
  issues: StructureIssue[],
): void {
  switch (node.type) {
    case "Heading":
      if (!node.props?.level) {
        issues.push({
          severity: "error",
          type: "missing-heading-level",
          message: "Heading must have a level property",
          nodeId: node.id,
          nodeType: node.type,
        });
      }
      if (!node.props?.weight) {
        issues.push({
          severity: "info",
          type: "missing-typography-weight",
          message: "Heading should have weight property for hierarchy",
          nodeId: node.id,
          nodeType: node.type,
        });
      }
      break;

    case "Text":
      if (!node.props?.weight) {
        issues.push({
          severity: "info",
          type: "missing-typography-weight",
          message: "Text should have weight property for hierarchy",
          nodeId: node.id,
          nodeType: node.type,
        });
      }
      break;

    case "Input":
      if (!node.id) {
        issues.push({
          severity: "error",
          type: "input-missing-id",
          message: "Input must have an id for label association",
          nodeType: node.type,
        });
      }
      break;

    case "Label":
      if (!node.props?.htmlFor) {
        issues.push({
          severity: "error",
          type: "label-missing-htmlfor",
          message: "Label must have htmlFor property",
          nodeId: node.id,
          nodeType: node.type,
        });
      }
      break;

    case "Link":
      if (!node.props?.href) {
        issues.push({
          severity: "error",
          type: "link-missing-href",
          message: "Link must have href property",
          nodeId: node.id,
          nodeType: node.type,
        });
      }
      break;

    case "Grid":
      if (!node.props?.columns && !node.props?.gap) {
        issues.push({
          severity: "warning",
          type: "grid-missing-props",
          message: "Grid should have columns or gap defined",
          nodeId: node.id,
          nodeType: node.type,
        });
      }
      break;

    case "Stack":
      if (!node.props?.direction) {
        issues.push({
          severity: "warning",
          type: "stack-missing-direction",
          message: 'Stack should have direction ("vertical" or "horizontal")',
          nodeId: node.id,
          nodeType: node.type,
        });
      }
      break;
  }
}

/**
 * Validate customization options
 */
function validateCustomization(
  template: Template,
  issues: StructureIssue[],
): void {
  if (!template.customization) {
    issues.push({
      severity: "warning",
      type: "missing-customization",
      message: "Template should have customization options",
    });
    return;
  }

  const { customization } = template;

  // Validate editable text IDs exist
  if (customization.content.editableText.length > 0) {
    const nodeIds = new Set<string>();
    collectNodeIds(template.structure, nodeIds);

    for (const textId of customization.content.editableText) {
      if (!nodeIds.has(textId)) {
        issues.push({
          severity: "error",
          type: "invalid-editable-text-id",
          message: `Editable text ID "${textId}" not found in template structure`,
        });
      }
    }
  }

  // Validate adjustable props
  if (customization.layout.adjustableProps.length === 0) {
    issues.push({
      severity: "info",
      type: "no-adjustable-props",
      message: "Consider adding adjustable layout properties",
    });
  }
}

/**
 * Helper: Collect all node IDs
 */
function collectNodeIds(node: TemplateNode, ids: Set<string>): void {
  if (node.id) {
    ids.add(node.id);
  }

  if (node.children) {
    for (const child of node.children) {
      collectNodeIds(child, ids);
    }
  }
}

/**
 * Get component type statistics
 */
export function getComponentStats(template: Template): Record<string, number> {
  const stats: Record<string, number> = {};
  countComponents(template.structure, stats);
  return stats;
}

/**
 * Helper: Count component types
 */
function countComponents(
  node: TemplateNode,
  stats: Record<string, number>,
): void {
  stats[node.type] = (stats[node.type] || 0) + 1;

  if (node.children) {
    for (const child of node.children) {
      countComponents(child, stats);
    }
  }
}
