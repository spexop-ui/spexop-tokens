/**
 * Container Component - Max-width content wrapper
 *
 * A content container with responsive max-width and padding options
 * using design tokens.
 *
 * @example
 * ```tsx
 * // Centered container with max-width
 * <Container maxWidth="lg" padding={6}>
 *   <h1>Page Content</h1>
 *   <p>This content is constrained to a max-width</p>
 * </Container>
 *
 * // Fluid container (no max-width)
 * <Container fluid padding={4}>
 *   <div>Full-width content</div>
 * </Container>
 *
 * // Responsive max-width
 * <Container maxWidth={{ xs: "full", md: "lg", xl: "xl" }} padding={6}>
 *   <div>Responsive container</div>
 * </Container>
 * ```
 */

import type React from "react";
import { createElement, useMemo } from "react";
import { useDebug, useResponsiveValue } from "../../../hooks/index.js";
import {
  validateMaxWidth,
  validateNoConflict,
  validateResponsiveKeys,
  validateSpacing,
} from "../../../utils/validation.js";
import styles from "./Container.module.css";
import type { ContainerProps } from "./Container.types.js";

export function Container({
  children,
  maxWidth = "xl",
  padding = 4,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  centered = true,
  fluid = false,
  className = "",
  style = {},
  as = "div",
}: ContainerProps) {
  // Debug mode
  const { enabled: debugEnabled, showBoundaries, showTokens } = useDebug();

  // Validate props (development only)
  if (process.env.NODE_ENV === "development") {
    // Validate padding values
    validateSpacing("Container", "padding", padding);
    validateSpacing("Container", "paddingLeft", paddingLeft);
    validateSpacing("Container", "paddingRight", paddingRight);
    validateSpacing("Container", "paddingTop", paddingTop);
    validateSpacing("Container", "paddingBottom", paddingBottom);

    // Validate maxWidth
    validateMaxWidth(maxWidth);

    // Check for responsive objects
    if (typeof padding === "object" && padding !== null) {
      validateResponsiveKeys(
        "Container",
        "padding",
        padding as Record<string, unknown>,
      );
    }
    if (typeof maxWidth === "object" && maxWidth !== null) {
      validateResponsiveKeys(
        "Container",
        "maxWidth",
        maxWidth as Record<string, unknown>,
      );
    }

    // Check for conflicting props
    validateNoConflict(
      "Container",
      fluid && typeof maxWidth === "string" && maxWidth !== "full",
      "fluid=true conflicts with maxWidth. Use maxWidth='full' instead or remove fluid prop",
    );
  }

  // Resolve responsive values
  const currentMaxWidth = useResponsiveValue(maxWidth);
  const currentPadding = useResponsiveValue(padding);
  const currentPaddingLeft = useResponsiveValue(paddingLeft);
  const currentPaddingRight = useResponsiveValue(paddingRight);
  const currentPaddingTop = useResponsiveValue(paddingTop);
  const currentPaddingBottom = useResponsiveValue(paddingBottom);

  // Build CSS class names
  const classes = useMemo(() => {
    const classList: string[] = [styles.container];

    // Centering
    if (centered) {
      classList.push(styles.centered);
    }

    // Max-width
    if (fluid) {
      classList.push(styles.fluid);
    } else if (currentMaxWidth) {
      const maxWidthClass = `maxWidth${currentMaxWidth.charAt(0).toUpperCase() + currentMaxWidth.slice(1)}`;
      if (styles[maxWidthClass as keyof typeof styles]) {
        classList.push(styles[maxWidthClass as keyof typeof styles]);
      }
    }

    // Padding
    if (currentPadding !== undefined) {
      classList.push(styles[`padding${currentPadding}` as keyof typeof styles]);
    }

    // Individual padding directions
    if (currentPaddingLeft !== undefined) {
      classList.push(
        styles[`paddingLeft${currentPaddingLeft}` as keyof typeof styles],
      );
    }
    if (currentPaddingRight !== undefined) {
      classList.push(
        styles[`paddingRight${currentPaddingRight}` as keyof typeof styles],
      );
    }
    if (currentPaddingTop !== undefined) {
      classList.push(
        styles[`paddingTop${currentPaddingTop}` as keyof typeof styles],
      );
    }
    if (currentPaddingBottom !== undefined) {
      classList.push(
        styles[`paddingBottom${currentPaddingBottom}` as keyof typeof styles],
      );
    }

    return classList.join(" ");
  }, [
    centered,
    fluid,
    currentMaxWidth,
    currentPadding,
    currentPaddingLeft,
    currentPaddingRight,
    currentPaddingTop,
    currentPaddingBottom,
  ]);

  // Debug attributes
  const debugProps =
    debugEnabled && showBoundaries
      ? {
          "data-debug": "container",
          "data-debug-label": showTokens
            ? `Container: maxWidth=${currentMaxWidth || "xl"}, padding=${currentPadding || 4} (sSpacing${currentPadding || 4})`
            : undefined,
        }
      : {};

  return createElement(
    as,
    {
      ...debugProps,
      className: `${classes} ${className}`.trim(),
      style,
    } as React.HTMLAttributes<HTMLElement>,
    children,
  );
}

// Re-export types
export type {
  ContainerMaxWidth,
  ContainerProps,
} from "./Container.types.js";
