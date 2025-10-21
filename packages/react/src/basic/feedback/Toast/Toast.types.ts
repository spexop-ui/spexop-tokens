/**
 * Toast Types
 *
 * Type definitions for the Toast component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface ToastProps {
  /** Toast message */
  message: React.ReactNode;

  /** Toast variant */
  variant?: "info" | "success" | "warning" | "error";

  /** Duration in ms (0 = no auto dismiss) */
  duration?: number;

  /** Whether toast is visible */
  isOpen: boolean;

  /** Callback when toast closes */
  onClose: () => void;

  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };

  /** Position */
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

  /** Additional CSS class */
  className?: string;
}
