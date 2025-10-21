/**
 * Progress Types
 *
 * Type definitions for the Progress component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface ProgressProps {
  /** Current progress value (0-100) */
  value: number;

  /** Maximum value */
  max?: number;

  /** Size variant */
  size?: "sm" | "md" | "lg";

  /** Color variant */
  color?: "primary" | "secondary" | "success" | "warning" | "error";

  /** Whether to show percentage label */
  showLabel?: boolean;

  /** Custom label text */
  label?: string;

  /** Visual variant */
  variant?: "default" | "striped" | "animated";

  /** Additional CSS class */
  className?: string;

  /** Whether progress is indeterminate */
  indeterminate?: boolean;
}
