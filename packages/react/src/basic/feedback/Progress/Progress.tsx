/**
 * Progress - Accessible progress indicator component
 *
 * A progress bar component for showing completion status,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - clear borders
 * - Principle 3: Typography before decoration - clear labels
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Multiple size variants
 * - Color variants
 * - Optional percentage label
 * - Visual variants (default, striped, animated)
 * - Indeterminate mode
 * - Screen reader accessible with ARIA
 * - Smooth transitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <Progress value={75} />
 * <Progress value={50} showLabel color="success" />
 * ```
 */

import { cn } from "../../../utils/index.js";
import styles from "./Progress.module.css";
import type { ProgressProps } from "./Progress.types.js";

export function Progress({
  value,
  max = 100,
  size = "md",
  color = "primary",
  showLabel = false,
  label,
  variant = "default",
  className,
  indeterminate = false,
}: ProgressProps) {
  const percentage = indeterminate
    ? 0
    : Math.min(Math.max((value / max) * 100, 0), 100);
  const displayLabel =
    label || (showLabel ? `${Math.round(percentage)}%` : undefined);

  const progressClassName = cn(
    styles.progress,
    styles[`size-${size}`],
    styles[`color-${color}`],
    styles[`variant-${variant}`],
    indeterminate && styles.indeterminate,
    className,
  );

  return (
    <div className={styles.container}>
      {displayLabel && (
        <div className={styles["label-container"]}>
          <span className={styles.label}>{displayLabel}</span>
        </div>
      )}
      {/* biome-ignore lint/a11y/useFocusableInteractive: Progress bars are status indicators, not interactive elements, per WAI-ARIA */}
      <div
        className={progressClassName}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-label={label}
        aria-busy={indeterminate}
      >
        <div
          className={styles.bar}
          style={{ width: indeterminate ? "100%" : `${percentage}%` }}
        />
      </div>
    </div>
  );
}
