/**
 * Spinner Types
 *
 * Type definitions for the Spinner component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface SpinnerProps {
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl";

  /** Color variant */
  color?: "primary" | "secondary" | "neutral" | "white";

  /** Loading text for screen readers */
  label?: string;

  /** Additional CSS class */
  className?: string;

  /** Thickness of the spinner (1-10) */
  thickness?: number;
}
