/**
 * Spinner - Accessible loading spinner component
 *
 * A loading spinner component for indicating processing states,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - circular border animation
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - screen reader accessible
 *
 * Features:
 * - Multiple size variants
 * - Color variants
 * - Configurable thickness
 * - Screen reader accessible with aria-label
 * - Smooth animation
 * - Semantic HTML
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" color="primary" label="Loading content..." />
 * ```
 */

import { cn } from "../../../utils/index.js";
import styles from "./Spinner.module.css";
import type { SpinnerProps } from "./Spinner.types.js";

export function Spinner({
  size = "md",
  color = "primary",
  label = "Loading...",
  className,
  thickness = 3,
}: SpinnerProps) {
  const spinnerClassName = cn(
    styles.spinner,
    styles[`size-${size}`],
    styles[`color-${color}`],
    className,
  );

  return (
    <div
      className={spinnerClassName}
      role="status"
      aria-label={label}
      aria-live="polite"
      style={{ "--spinner-thickness": `${thickness}px` } as React.CSSProperties}
    >
      <div className={styles.circle} />
      <span className={styles["sr-only"]}>{label}</span>
    </div>
  );
}
