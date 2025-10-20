/**
 * Stack Component - Simple flexbox utility for stacking elements
 *
 * A straightforward flexbox wrapper for vertical or horizontal layouts
 * with consistent spacing using design tokens.
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * // Vertical stack
 * <Stack direction="vertical" gap={4}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Stack>
 *
 * // Horizontal stack with wrapping
 * <Stack direction="horizontal" gap={2} wrap>
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 *   <Button>Action 3</Button>
 * </Stack>
 *
 * // Responsive direction
 * <Stack direction={{ xs: "vertical", md: "horizontal" }} gap={4}>
 *   <div>Left</div>
 *   <div>Right</div>
 * </Stack>
 * ```
 */

import type React from "react";
import { createElement, useMemo } from "react";
import { useDebug, useResponsiveValue } from "../../../hooks/index.js";
import {
  validateResponsiveKeys,
  validateSpacing,
} from "../../../utils/validation.js";
import styles from "./Stack.module.css";
import type { StackProps } from "./Stack.types.js";

export function Stack({
  children,
  direction = "vertical",
  gap = 4,
  align = "stretch",
  justify = "start",
  wrap = false,
  className = "",
  style = {},
  as = "div",
}: StackProps) {
  // Debug mode
  const { enabled: debugEnabled, showBoundaries, showTokens } = useDebug();

  // Validate props (development only)
  if (process.env.NODE_ENV === "development") {
    // Validate gap value
    validateSpacing("Stack", "gap", gap);

    // Check for responsive objects
    if (typeof gap === "object" && gap !== null) {
      validateResponsiveKeys("Stack", "gap", gap as Record<string, unknown>);
    }
    if (typeof direction === "object" && direction !== null) {
      validateResponsiveKeys(
        "Stack",
        "direction",
        direction as Record<string, unknown>,
      );
    }
    if (typeof align === "object" && align !== null) {
      validateResponsiveKeys(
        "Stack",
        "align",
        align as Record<string, unknown>,
      );
    }
    if (typeof justify === "object" && justify !== null) {
      validateResponsiveKeys(
        "Stack",
        "justify",
        justify as Record<string, unknown>,
      );
    }
  }

  // Resolve responsive values
  const currentDirection = useResponsiveValue(direction);
  const currentGap = useResponsiveValue(gap);
  const currentAlign = useResponsiveValue(align);
  const currentJustify = useResponsiveValue(justify);

  // Build CSS class names
  const classes = useMemo(() => {
    const classList: string[] = [styles.stack];

    // Direction
    if (currentDirection === "vertical") {
      classList.push(styles.vertical);
    } else if (currentDirection === "horizontal") {
      classList.push(styles.horizontal);
    }

    // Gap
    if (currentGap !== undefined) {
      classList.push(styles[`gap${currentGap}` as keyof typeof styles]);
    }

    // Alignment
    const alignClass = `align${currentAlign.charAt(0).toUpperCase() + currentAlign.slice(1)}`;
    if (styles[alignClass as keyof typeof styles]) {
      classList.push(styles[alignClass as keyof typeof styles]);
    }

    // Justification
    const justifyMap: Record<string, string> = {
      start: "justifyStart",
      center: "justifyCenter",
      end: "justifyEnd",
      "space-between": "justifySpaceBetween",
      "space-around": "justifySpaceAround",
      "space-evenly": "justifySpaceEvenly",
    };
    const justifyClass = justifyMap[currentJustify];
    if (justifyClass && styles[justifyClass as keyof typeof styles]) {
      classList.push(styles[justifyClass as keyof typeof styles]);
    }

    // Wrapping
    if (wrap) {
      classList.push(styles.wrap);
    }

    return classList.join(" ");
  }, [currentDirection, currentGap, currentAlign, currentJustify, wrap]);

  // Debug attributes
  const debugProps =
    debugEnabled && showBoundaries
      ? {
          "data-debug": "stack",
          "data-debug-label": showTokens
            ? `Stack: direction=${currentDirection}, gap=${currentGap} (sSpacing${currentGap})`
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
  StackAlign,
  StackDirection,
  StackJustify,
  StackProps,
} from "./Stack.types.js";
