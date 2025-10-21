/**
 * Tooltip Types
 *
 * Type definitions for the Tooltip component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface TooltipProps {
  /** Content to wrap with tooltip */
  children: React.ReactElement;

  /** Tooltip content */
  content: React.ReactNode;

  /** Placement of the tooltip */
  placement?: "top" | "right" | "bottom" | "left";

  /** Delay before showing tooltip (ms) */
  delay?: number;

  /** Whether tooltip is disabled */
  disabled?: boolean;

  /** Additional CSS class for the tooltip */
  className?: string;

  /** Additional CSS class for the trigger element */
  triggerClassName?: string;

  /** ID for accessibility */
  id?: string;

  /** Whether to show arrow pointer */
  showArrow?: boolean;
}
