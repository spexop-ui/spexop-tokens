/**
 * Grid Component - Fluid-first grid system
 *
 * A flexible grid system with container query support, multiple layout modes,
 * and seamless integration with spacing tokens.
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * // 12-column layout grid
 * <Grid columns={12} gap={6}>
 *   <GridItem span={{ xs: 12, lg: 3 }}>Sidebar</GridItem>
 *   <GridItem span={{ xs: 12, lg: 9 }}>Content</GridItem>
 * </Grid>
 *
 * // Auto-responsive component grid
 * <Grid columns="auto-fit" minColumnWidth="300px" gap={4}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 * </Grid>
 *
 * // Named grid areas
 * <Grid areas={["header header", "sidebar content"]} gap={4}>
 *   <GridItem area="header">Header</GridItem>
 *   <GridItem area="sidebar">Sidebar</GridItem>
 *   <GridItem area="content">Content</GridItem>
 * </Grid>
 * ```
 */

import React, { type CSSProperties, createElement, useMemo } from "react";
import { useDebug, useResponsiveValue } from "../../../hooks/index.js";
import {
  validateResponsiveKeys,
  validateSpacing,
} from "../../../utils/validation.js";
import styles from "./Grid.module.css";
import type { GridProps } from "./Grid.types.js";

export function Grid({
  children,
  columns = 12,
  gap = 4,
  rowGap,
  columnGap,
  areas,
  fluid = false,
  minColumnWidth = "250px",
  maxColumnWidth = "400px",
  align = "stretch",
  justify = "start",
  container = false,
  subgrid = false,
  className = "",
  style = {},
  as = "div",
}: GridProps) {
  // Debug mode
  const { enabled: debugEnabled, showBoundaries, showTokens } = useDebug();

  // Validate props (development only)
  if (process.env.NODE_ENV === "development") {
    // Validate spacing values
    validateSpacing("Grid", "gap", gap);
    validateSpacing("Grid", "rowGap", rowGap);
    validateSpacing("Grid", "columnGap", columnGap);

    // Check for responsive objects
    if (typeof gap === "object" && gap !== null) {
      validateResponsiveKeys("Grid", "gap", gap as Record<string, unknown>);
    }
    if (typeof rowGap === "object" && rowGap !== null) {
      validateResponsiveKeys(
        "Grid",
        "rowGap",
        rowGap as Record<string, unknown>,
      );
    }
    if (typeof columnGap === "object" && columnGap !== null) {
      validateResponsiveKeys(
        "Grid",
        "columnGap",
        columnGap as Record<string, unknown>,
      );
    }
    if (typeof columns === "object" && columns !== null) {
      validateResponsiveKeys(
        "Grid",
        "columns",
        columns as Record<string, unknown>,
      );
    }
  }

  // Resolve responsive values
  const currentColumns = useResponsiveValue(columns);
  const currentGap = useResponsiveValue(gap);
  const currentRowGap = useResponsiveValue(rowGap);
  const currentColumnGap = useResponsiveValue(columnGap);
  const currentAlign = useResponsiveValue(align);
  const currentJustify = useResponsiveValue(justify);
  const currentMinColumnWidth = useResponsiveValue(minColumnWidth);
  const currentMaxColumnWidth = useResponsiveValue(maxColumnWidth);

  // Build CSS class names
  const classes = useMemo(() => {
    const classList: string[] = [styles.grid];

    // Subgrid mode
    if (subgrid) {
      classList.push(styles.subgrid);
      return classList.join(" ");
    }

    // Container query support
    if (container) {
      classList.push(styles.containerQuery);
    }

    // Column configuration
    if (currentColumns === "auto-fit") {
      classList.push(styles.autoFit);
      if (fluid) classList.push(styles.fluid);
    } else if (currentColumns === "auto-fill") {
      classList.push(styles.autoFill);
      if (fluid) classList.push(styles.fluid);
    } else if (typeof currentColumns === "number") {
      if (currentColumns >= 1 && currentColumns <= 24) {
        classList.push(styles[`cols${currentColumns}` as keyof typeof styles]);
      }
    }

    // Gap configuration
    if (currentGap !== undefined) {
      classList.push(styles[`gap${currentGap}` as keyof typeof styles]);
    }

    if (currentRowGap !== undefined) {
      classList.push(styles[`rowGap${currentRowGap}` as keyof typeof styles]);
    }

    if (currentColumnGap !== undefined) {
      classList.push(
        styles[`columnGap${currentColumnGap}` as keyof typeof styles],
      );
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

    return classList.join(" ");
  }, [
    subgrid,
    container,
    currentColumns,
    fluid,
    currentGap,
    currentRowGap,
    currentColumnGap,
    currentAlign,
    currentJustify,
  ]);

  // Build inline styles
  const inlineStyles = useMemo((): CSSProperties => {
    const customStyles: Record<string, unknown> = { ...style };

    // Set CSS variables for auto-fit/auto-fill grids
    if (currentColumns === "auto-fit" || currentColumns === "auto-fill") {
      customStyles["--grid-min-col-width"] = currentMinColumnWidth;
      if (currentMaxColumnWidth) {
        customStyles["--grid-max-col-width"] = currentMaxColumnWidth;
      }
    }

    // Named grid areas
    if (areas && areas.length > 0) {
      customStyles.gridTemplateAreas = areas
        .map((area) => `"${area}"`)
        .join(" ");
    }

    return customStyles as CSSProperties;
  }, [
    style,
    currentColumns,
    currentMinColumnWidth,
    currentMaxColumnWidth,
    areas,
  ]);

  // Debug attributes
  const debugProps =
    debugEnabled && showBoundaries
      ? {
          "data-debug": "grid",
          "data-debug-label": showTokens
            ? `Grid: columns=${currentColumns}, gap=${currentGap} (sSpacing${currentGap})`
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
  GridAlign,
  GridColumns,
  GridJustify,
  GridProps,
} from "./Grid.types.js";
