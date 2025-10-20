/**
 * Spacer component types
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import type { SpacingScale } from "../types.js";

/**
 * Spacer direction
 */
export type SpacerDirection = "vertical" | "horizontal";

/**
 * Spacer component props
 */
export interface SpacerProps {
  /**
   * Size of spacing (maps to --s-spacing-* tokens)
   * @default 4
   */
  size?:
    | SpacingScale
    | {
        xs?: SpacingScale;
        sm?: SpacingScale;
        md?: SpacingScale;
        lg?: SpacingScale;
        xl?: SpacingScale;
        "2xl"?: SpacingScale;
      };

  /**
   * Direction of spacing
   * @default "vertical"
   */
  direction?: SpacerDirection;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * ARIA hidden (spacer is typically decorative)
   * @default true
   */
  ariaHidden?: boolean;
}
