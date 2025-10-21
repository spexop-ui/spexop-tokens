/**
 * Template System Types
 * Core type definitions for the Spexop template system
 */

/**
 * Accessibility metadata for templates
 * Defines landmarks, skip links, and focus management
 */
export interface AccessibilityMetadata {
  landmarks: Array<{ type: string; label: string }>;
  skipLinks: Array<{ target: string; label: string }>;
  focusManagement: {
    initialFocus?: string;
    returnFocus?: boolean;
  };
}

/**
 * Template interface
 * Defines the structure and metadata for a page template
 */
export interface Template {
  meta: {
    id: string;
    name: string;
    description: string;
    category:
      | "hero"
      | "landing"
      | "dashboard"
      | "blog"
      | "docs"
      | "portfolio"
      | "ecommerce"
      | "auth"
      | "error"
      | "pricing"
      | "navigation"
      | "content"
      | "states";
    tier: "free" | "premium";
    thumbnail: string;
    tags: string[];
    author: string;
    version: string;
    accessibility?: AccessibilityMetadata;
  };
  structure: TemplateNode;
  customization: CustomizationOptions;
}

/**
 * Template node interface
 * Defines a single component or element in the template tree
 */
export interface TemplateNode {
  type:
    | "Container"
    | "Grid"
    | "Stack"
    | "GridItem"
    | "Spacer"
    | "Button"
    | "Card"
    | "Icon"
    | "Link"
    | "Input"
    | "Label"
    | "Form"
    | "Nav"
    | "Footer"
    | "Header"
    | "Main"
    | "Aside"
    | "Article"
    | "Section"
    | "Typography"
    | "Text"
    | "Heading"
    | "Checkbox"
    | "Badge"
    | string;
  props: Record<string, unknown>;
  children?: TemplateNode[];
  content?: string;
  slot?: string;
  id?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaCurrent?: string;
  ariaHidden?: boolean;
  ariaInvalid?: string | boolean;
  ariaLive?: "polite" | "assertive" | "off";
  ariaLabelledBy?: string;
  role?: string;
}

/**
 * Customization options for templates
 * Defines what can be adjusted in the template
 */
export interface CustomizationOptions {
  layout: {
    adjustableProps: string[];
    breakpoints: boolean;
  };
  content: {
    editableText: string[];
    editableImages: string[];
  };
}

/**
 * Template customization values
 * User-provided customizations to apply to a template
 */
export interface TemplateCustomization {
  props: Record<string, unknown>;
  content: Record<string, string>;
}
