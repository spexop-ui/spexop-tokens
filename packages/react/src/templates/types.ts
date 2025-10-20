/**
 * Template System Types
 * Core type definitions for the Spexop template system
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
      | "ecommerce";
    tier: "free" | "premium";
    thumbnail: string;
    tags: string[];
    author: string;
    version: string;
  };
  structure: TemplateNode;
  customization: CustomizationOptions;
}

export interface TemplateNode {
  type:
    | "Container"
    | "Grid"
    | "Stack"
    | "GridItem"
    | "Spacer"
    | "Button"
    | "Card"
    | "Typography"
    | "Text"
    | "Heading"
    | "Section"
    | string;
  props: Record<string, any>;
  children?: TemplateNode[];
  content?: string;
  slot?: string;
  id?: string; // For referencing in customization
}

export interface CustomizationOptions {
  layout: {
    adjustableProps: string[]; // e.g., ['maxWidth', 'padding', 'gap']
    breakpoints: boolean;
  };
  content: {
    editableText: string[]; // IDs of text nodes
    editableImages: string[]; // IDs of image slots
  };
}

export interface TemplateCustomization {
  props: Record<string, any>;
  content: Record<string, string>;
}
