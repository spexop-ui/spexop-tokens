/**
 * ButtonGroup Component
 * Container for grouped buttons with shared borders
 *
 * @component ButtonGroup
 * @packageName @spexop/react
 * @description Primitives-first button grouping with horizontal/vertical direction
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import styles from "./ButtonGroup.module.css";
import type { ButtonGroupProps } from "./ButtonGroup.types.js";

/**
 * ButtonGroup component
 *
 * @example
 * ```tsx
 * <ButtonGroup direction="horizontal" aria-label="Text formatting">
 *   <Button iconOnly aria-label="Bold"><Bold /></Button>
 *   <Button iconOnly aria-label="Italic"><Italic /></Button>
 * </ButtonGroup>
 * ```
 */
export function ButtonGroup({
  children,
  direction = "horizontal",
  compact = false,
  className = "",
  role = "group",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: ButtonGroupProps) {
  // Compose className
  const groupClassName = [
    styles.buttonGroup,
    styles[direction],
    compact && styles.compact,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={groupClassName}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </div>
  );
}
