/**
 * Grid Primitives - Foundation Components
 *
 * The core building blocks for layouts in the Spexop Design System.
 * Master these primitives before building complex components.
 */

export type { ContainerMaxWidth, ContainerProps } from "./Container/index.js";
export { Container } from "./Container/index.js";
export type {
  GridAlign,
  GridColumns,
  GridJustify,
  GridProps,
} from "./Grid/index.js";
// Export all component types and implementations
// Note: Individual components may have internal SpacingScale definitions
// Use the shared SpacingScale type from this module for consistency
export { Grid } from "./Grid/index.js";
export type {
  GridItemAlign,
  GridItemJustify,
  GridItemProps,
} from "./GridItem/index.js";
export { GridItem } from "./GridItem/index.js";
export type { SpacerDirection, SpacerProps } from "./Spacer/index.js";
export { Spacer } from "./Spacer/index.js";
export type {
  StackAlign,
  StackDirection,
  StackJustify,
  StackProps,
} from "./Stack/index.js";
export { Stack } from "./Stack/index.js";
// Export shared types first
export type { SpacingScale } from "./types.js";
