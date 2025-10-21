/**
 * Spexop Template System
 * Page templates and utilities
 */

// Export template registry
export * from "./registry/index.js";

// Export renderers
export { renderTemplateToReact } from "./renderers/react-renderer.js";
export { renderTemplateToHTML } from "./renderers/html-renderer.js";

// Export validators
export * from "./validators/index.js";

// Export types
export type {
  AccessibilityMetadata,
  CustomizationOptions,
  Template,
  TemplateCustomization,
  TemplateNode,
} from "./types.js";
