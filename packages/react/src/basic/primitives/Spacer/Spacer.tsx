/**
 * Spacer Component - Utility for spacing between elements
 *
 * A simple component for adding space between elements using design tokens.
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * // Vertical spacing
 * <div>
 *   <h1>Title</h1>
 *   <Spacer size={4} direction="vertical" />
 *   <p>Content</p>
 * </div>
 *
 * // Horizontal spacing
 * <div style={{ display: 'flex' }}>
 *   <Button>Left</Button>
 *   <Spacer size={2} direction="horizontal" />
 *   <Button>Right</Button>
 * </div>
 *
 * // Responsive spacing
 * <Spacer size={{ xs: 2, md: 4, lg: 6 }} direction="vertical" />
 * ```
 */

import { useMemo } from "react";
import { useResponsiveValue } from "../../../hooks/index.js";
import styles from "./Spacer.module.css";
import type { SpacerProps } from "./Spacer.types.js";

export function Spacer({
  size = 4,
  direction = "vertical",
  className = "",
  ariaHidden = true,
}: SpacerProps) {
  // Resolve responsive values
  const currentSize = useResponsiveValue(size);

  // Build CSS class names
  const classes = useMemo(() => {
    const classList: string[] = [styles.spacer];

    if (currentSize !== undefined) {
      const spacerClass = `${direction}${currentSize}`;
      if (styles[spacerClass as keyof typeof styles]) {
        classList.push(styles[spacerClass as keyof typeof styles]);
      }
    }

    return classList.join(" ");
  }, [direction, currentSize]);

  return (
    <div
      className={`${classes} ${className}`.trim()}
      aria-hidden={ariaHidden}
    />
  );
}
