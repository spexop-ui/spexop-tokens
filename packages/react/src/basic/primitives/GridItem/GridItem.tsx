/**
 * GridItem Component - Grid item with positioning and spanning
 *
 * Use with Grid component to control item placement and sizing.
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * // Responsive span
 * <GridItem span={{ xs: 12, lg: 6 }}>
 *   Content
 * </GridItem>
 *
 * // Named grid area
 * <GridItem area="header">
 *   Header Content
 * </GridItem>
 *
 * // Precise positioning
 * <GridItem start={1} end={4} row={2}>
 *   Positioned Content
 * </GridItem>
 * ```
 */

import React, { type CSSProperties, createElement, useMemo } from "react";
import { useDebug, useResponsiveValue } from "../../../hooks/index.js";
import {
  validateGridSpan,
  validateResponsiveKeys,
  validateRowSpan,
} from "../../../utils/validation.js";
import styles from "./GridItem.module.css";
import type { GridItemProps } from "./GridItem.types.js";

export function GridItem({
  children,
  span,
  start,
  end,
  row,
  rowSpan,
  rowStart,
  rowEnd,
  area,
  align,
  justify,
  className = "",
  style = {},
  as = "div",
}: GridItemProps) {
  // Debug mode
  const { enabled: debugEnabled, showBoundaries, showTokens } = useDebug();

  // Validate props (development only)
  if (process.env.NODE_ENV === "development") {
    // Validate span and rowSpan values
    validateGridSpan("GridItem", span);
    validateRowSpan("GridItem", rowSpan);

    // Check for responsive objects
    if (typeof span === "object" && span !== null) {
      validateResponsiveKeys(
        "GridItem",
        "span",
        span as Record<string, unknown>,
      );
    }
    if (typeof rowSpan === "object" && rowSpan !== null) {
      validateResponsiveKeys(
        "GridItem",
        "rowSpan",
        rowSpan as Record<string, unknown>,
      );
    }
    if (typeof align === "object" && align !== null) {
      validateResponsiveKeys(
        "GridItem",
        "align",
        align as Record<string, unknown>,
      );
    }
    if (typeof justify === "object" && justify !== null) {
      validateResponsiveKeys(
        "GridItem",
        "justify",
        justify as Record<string, unknown>,
      );
    }
  }

  // Resolve responsive values
  const currentSpan = useResponsiveValue(span);
  const currentStart = useResponsiveValue(start);
  const currentEnd = useResponsiveValue(end);
  const currentRow = useResponsiveValue(row);
  const currentRowSpan = useResponsiveValue(rowSpan);
  const currentRowStart = useResponsiveValue(rowStart);
  const currentRowEnd = useResponsiveValue(rowEnd);
  const currentAlign = useResponsiveValue(align);
  const currentJustify = useResponsiveValue(justify);

  // Build CSS class names
  const classes = useMemo(() => {
    const classList: string[] = [styles.gridItem];

    // Column span
    if (currentSpan && currentSpan >= 1 && currentSpan <= 24) {
      classList.push(styles[`span${currentSpan}` as keyof typeof styles]);
    }

    // Row span
    if (currentRowSpan && currentRowSpan >= 1 && currentRowSpan <= 12) {
      classList.push(styles[`rowSpan${currentRowSpan}` as keyof typeof styles]);
    }

    // Alignment
    if (currentAlign) {
      const alignClass = `align${currentAlign.charAt(0).toUpperCase() + currentAlign.slice(1)}`;
      if (styles[alignClass as keyof typeof styles]) {
        classList.push(styles[alignClass as keyof typeof styles]);
      }
    }

    // Justification
    if (currentJustify) {
      const justifyClass = `justify${currentJustify.charAt(0).toUpperCase() + currentJustify.slice(1)}`;
      if (styles[justifyClass as keyof typeof styles]) {
        classList.push(styles[justifyClass as keyof typeof styles]);
      }
    }

    return classList.join(" ");
  }, [currentSpan, currentRowSpan, currentAlign, currentJustify]);

  // Build inline styles for precise positioning
  const inlineStyles = useMemo((): CSSProperties => {
    const customStyles: CSSProperties = { ...style };

    // Grid area (named)
    if (area) {
      customStyles.gridArea = area;
    }

    // Column positioning
    if (currentStart !== undefined) {
      customStyles.gridColumnStart = currentStart;
    }
    if (currentEnd !== undefined) {
      customStyles.gridColumnEnd = currentEnd;
    }

    // Row positioning
    if (currentRow !== undefined) {
      customStyles.gridRow = currentRow;
    }
    if (currentRowStart !== undefined) {
      customStyles.gridRowStart = currentRowStart;
    }
    if (currentRowEnd !== undefined) {
      customStyles.gridRowEnd = currentRowEnd;
    }

    return customStyles;
  }, [
    style,
    area,
    currentStart,
    currentEnd,
    currentRow,
    currentRowStart,
    currentRowEnd,
  ]);

  // Debug attributes
  const debugProps =
    debugEnabled && showBoundaries
      ? {
          "data-debug": "griditem",
          "data-debug-label": showTokens
            ? `GridItem: span=${currentSpan || "auto"}${currentRowSpan ? `, rowSpan=${currentRowSpan}` : ""}`
            : undefined,
        }
      : {};

  return createElement(
    as,
    {
      ...debugProps,
      className: `${classes} ${className}`.trim(),
      style: inlineStyles,
    } as React.HTMLAttributes<HTMLElement>,
    children,
  );
}

// Re-export types
export type {
  GridItemAlign,
  GridItemJustify,
  GridItemProps,
} from "./GridItem.types.js";
