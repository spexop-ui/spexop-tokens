/**
 * React/TSX Template Renderer
 * Generates clean React code using @spexop/react components
 */

import type { SpexopThemeConfig } from "@spexop/theme";
import type { Template, TemplateNode } from "../types.js";

interface RenderContext {
  theme: SpexopThemeConfig;
  indentLevel: number;
  imports: Set<string>;
}

/**
 * Render a template to React/TSX code
 */
export function renderTemplateToReact(
  template: Template,
  theme: SpexopThemeConfig,
  customProps: Record<string, unknown> = {},
): string {
  const context: RenderContext = {
    theme,
    indentLevel: 0,
    imports: new Set<string>(),
  };

  // Apply custom props to root structure
  const customizedStructure = {
    ...template.structure,
    props: {
      ...template.structure.props,
      ...customProps,
    },
  };

  // Render the template structure
  const componentCode = renderNode(customizedStructure, context);

  // Generate imports
  const importsCode = generateImports(context.imports);

  // Generate complete component
  return generateCompleteComponent(
    template.meta.name,
    importsCode,
    componentCode,
    template.meta.description,
  );
}

/**
 * Render a single node to React code
 */
function renderNode(node: TemplateNode, context: RenderContext): string {
  const { type, props = {}, children, content, id } = node;
  const indent = "  ".repeat(context.indentLevel);

  // Track component imports
  if (isSpexopComponent(type)) {
    context.imports.add(type);
  }

  // Handle ARIA attributes
  const ariaProps: Record<string, unknown> = {};
  if (node.ariaLabel) ariaProps["aria-label"] = node.ariaLabel;
  if (node.ariaDescribedBy)
    ariaProps["aria-describedby"] = node.ariaDescribedBy;
  if (node.ariaCurrent) ariaProps["aria-current"] = node.ariaCurrent;
  if (node.role) ariaProps.role = node.role;

  const combinedProps = { ...props, ...ariaProps };

  // Handle different node types
  switch (type) {
    case "Container":
    case "Grid":
    case "GridItem":
    case "Stack":
    case "Spacer":
    case "Button":
    case "Card":
    case "Icon":
      return renderSpexopComponent(
        type,
        combinedProps,
        children,
        content,
        context,
        indent,
      );

    case "Link":
      return renderLink(combinedProps, children, content, context, indent);

    case "Input":
      return renderInput(id, combinedProps, indent);

    case "Label":
      return renderLabel(combinedProps, content, indent);

    case "Checkbox":
      return renderCheckbox(id, combinedProps, indent);

    case "Badge":
      return renderBadge(combinedProps, content, indent);

    case "Form":
      return renderForm(combinedProps, children, context, indent);

    case "Heading":
      return renderHeading(combinedProps, content, context, indent);

    case "Text":
      return renderText(combinedProps, content, indent);

    case "Nav":
    case "Footer":
    case "Header":
    case "Main":
    case "Aside":
    case "Article":
    case "Section":
      return renderSemanticElement(
        type.toLowerCase(),
        combinedProps,
        children,
        content,
        context,
        indent,
        id,
      );

    case "div":
      return renderDiv(combinedProps, children, content, context, indent, id);

    default:
      // Unknown type - render as div with comment
      return `${indent}<div /* Unknown type: ${type} */>\n${renderChildren(
        children,
        context,
      )}${indent}</div>`;
  }
}

/**
 * Render a Spexop component
 */
function renderSpexopComponent(
  type: string,
  props: Record<string, unknown>,
  children: TemplateNode[] | undefined,
  content: string | undefined,
  context: RenderContext,
  indent: string,
): string {
  const propsString = formatProps(props, context);
  const hasChildren = children && children.length > 0;
  const hasContent = !!content;

  if (!hasChildren && !hasContent && type === "Spacer") {
    // Self-closing for Spacer
    return `${indent}<${type}${propsString} />`;
  }

  if (!hasChildren && !hasContent) {
    return `${indent}<${type}${propsString} />`;
  }

  // Component with children or content
  const opening = `${indent}<${type}${propsString}>`;
  const closing = `${indent}</${type}>`;

  if (hasContent && !hasChildren) {
    // Inline content
    return `${opening}\n${indent}  {${JSON.stringify(content)}}\n${closing}`;
  }

  // Children
  context.indentLevel++;
  const childrenCode = renderChildren(children, context);
  context.indentLevel--;

  return `${opening}\n${childrenCode}${closing}`;
}

/**
 * Render heading element
 */
function renderHeading(
  props: Record<string, unknown>,
  content: string | undefined,
  context: RenderContext,
  indent: string,
): string {
  const level = props?.level || 2;
  const tag = `h${level}`;
  const { level: _, ...restProps } = props || {};
  const propsString = formatProps(restProps, context);

  return `${indent}<${tag}${propsString}>${content || ""}</${tag}>`;
}

/**
 * Render text paragraph
 */
function renderText(
  props: Record<string, unknown>,
  content: string | undefined,
  indent: string,
): string {
  const propsString =
    Object.keys(props).length > 0
      ? formatProps(props, {
          theme: {} as SpexopThemeConfig,
          indentLevel: 0,
          imports: new Set(),
        })
      : "";
  return `${indent}<p${propsString}>${content || ""}</p>`;
}

/**
 * Render div element
 */
function renderDiv(
  props: Record<string, unknown>,
  children: TemplateNode[] | undefined,
  content: string | undefined,
  context: RenderContext,
  indent: string,
  _id?: string,
): string {
  const propsString = formatProps(props, context);
  const opening = `${indent}<div${propsString}>`;
  const closing = `${indent}</div>`;

  if (content && !children) {
    return `${opening}\n${indent}  {${JSON.stringify(content)}}\n${closing}`;
  }

  if (children) {
    context.indentLevel++;
    const childrenCode = renderChildren(children, context);
    context.indentLevel--;
    return `${opening}\n${childrenCode}${closing}`;
  }

  return `${opening}${closing}`;
}

/**
 * Render children nodes
 */
function renderChildren(
  children: TemplateNode[] | undefined,
  context: RenderContext,
): string {
  if (!children || children.length === 0) return "";

  return children.map((child) => `${renderNode(child, context)}\n`).join("");
}

/**
 * Format props object to JSX attributes
 */
function formatProps(
  props: Record<string, unknown>,
  _context: RenderContext,
): string {
  if (!props || Object.keys(props).length === 0) return "";

  const formattedProps = Object.entries(props)
    .map(([key, value]) => {
      if (key === "style" && typeof value === "object") {
        return ` style={${JSON.stringify(value)}}`;
      }

      if (typeof value === "string") {
        return ` ${key}="${value}"`;
      }

      if (typeof value === "number" || typeof value === "boolean") {
        return ` ${key}={${value}}`;
      }

      if (typeof value === "object") {
        // Handle responsive props or complex objects
        return ` ${key}={${JSON.stringify(value)}}`;
      }

      return ` ${key}={${JSON.stringify(value)}}`;
    })
    .join("");

  return formattedProps;
}

/**
 * Generate import statements
 */
function generateImports(imports: Set<string>): string {
  if (imports.size === 0) return "";

  const sortedImports = Array.from(imports).sort();
  return `import { ${sortedImports.join(", ")} } from "@spexop/react";\n`;
}

/**
 * Generate complete React component
 */
function generateCompleteComponent(
  name: string,
  imports: string,
  componentCode: string,
  description: string,
): string {
  const componentName = toComponentName(name);

  return `/**
 * ${name}
 * ${description}
 * 
 * Generated by Spexop Builder
 * Uses @spexop/react components with your custom theme
 */

${imports}
export function ${componentName}() {
  return (
${componentCode}
  );
}
`;
}

/**
 * Convert template name to valid React component name
 */
function toComponentName(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("")
    .replace(/[^a-zA-Z0-9]/g, "");
}

/**
 * Render a link element
 */
function renderLink(
  props: Record<string, unknown>,
  children: TemplateNode[] | undefined,
  content: string | undefined,
  context: RenderContext,
  indent: string,
): string {
  const propsString = formatProps(props, context);
  const opening = `${indent}<a${propsString}>`;
  const closing = `${indent}</a>`;

  if (content && !children) {
    return `${opening}\n${indent}  {${JSON.stringify(content)}}\n${closing}`;
  }

  if (children) {
    context.indentLevel++;
    const childrenCode = renderChildren(children, context);
    context.indentLevel--;
    return `${opening}\n${childrenCode}${closing}`;
  }

  return `${opening}${closing}`;
}

/**
 * Render an input element
 */
function renderInput(
  id: string | undefined,
  props: Record<string, unknown>,
  indent: string,
): string {
  const propsString = formatProps(props, {
    theme: {} as SpexopThemeConfig,
    indentLevel: 0,
    imports: new Set(),
  });
  const idAttr = id ? ` id="${id}"` : "";
  return `${indent}<input${idAttr}${propsString} />`;
}

/**
 * Render a label element
 */
function renderLabel(
  props: Record<string, unknown>,
  content: string | undefined,
  indent: string,
): string {
  const propsString = formatProps(props, {
    theme: {} as SpexopThemeConfig,
    indentLevel: 0,
    imports: new Set(),
  });
  return `${indent}<label${propsString}>${content || ""}</label>`;
}

/**
 * Render a checkbox input
 */
function renderCheckbox(
  id: string | undefined,
  props: Record<string, unknown>,
  indent: string,
): string {
  const propsString = formatProps(
    { ...props, type: "checkbox" },
    {
      theme: {} as SpexopThemeConfig,
      indentLevel: 0,
      imports: new Set(),
    },
  );
  const idAttr = id ? ` id="${id}"` : "";
  return `${indent}<input${idAttr}${propsString} />`;
}

/**
 * Render a badge component
 */
function renderBadge(
  props: Record<string, unknown>,
  content: string | undefined,
  indent: string,
): string {
  const propsString = formatProps(props, {
    theme: {} as SpexopThemeConfig,
    indentLevel: 0,
    imports: new Set(),
  });
  return `${indent}<span className="badge"${propsString}>${content || ""}</span>`;
}

/**
 * Render a form element
 */
function renderForm(
  props: Record<string, unknown>,
  children: TemplateNode[] | undefined,
  context: RenderContext,
  indent: string,
): string {
  const propsString = formatProps(props, context);
  const opening = `${indent}<form${propsString}>`;
  const closing = `${indent}</form>`;

  if (children) {
    context.indentLevel++;
    const childrenCode = renderChildren(children, context);
    context.indentLevel--;
    return `${opening}\n${childrenCode}${closing}`;
  }

  return `${opening}${closing}`;
}

/**
 * Render a semantic HTML5 element
 */
function renderSemanticElement(
  tag: string,
  props: Record<string, unknown>,
  children: TemplateNode[] | undefined,
  content: string | undefined,
  context: RenderContext,
  indent: string,
  id?: string,
): string {
  const propsString = formatProps(props, context);
  const idAttr = id ? ` id="${id}"` : "";
  const opening = `${indent}<${tag}${idAttr}${propsString}>`;
  const closing = `${indent}</${tag}>`;

  if (content && !children) {
    return `${opening}\n${indent}  {${JSON.stringify(content)}}\n${closing}`;
  }

  if (children) {
    context.indentLevel++;
    const childrenCode = renderChildren(children, context);
    context.indentLevel--;
    return `${opening}\n${childrenCode}${closing}`;
  }

  return `${opening}${closing}`;
}

/**
 * Check if component type is a Spexop component
 */
function isSpexopComponent(type: string): boolean {
  const spexopComponents = [
    "Container",
    "Grid",
    "GridItem",
    "Stack",
    "Spacer",
    "Button",
    "Card",
    "Icon",
  ];
  return spexopComponents.includes(type);
}
