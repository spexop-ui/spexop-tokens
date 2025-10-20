import React, { useId } from "react";
import styles from "./Snackbar.module.css";

export interface SnackbarProps {
  /**
   * Message text to display
   */
  message: string;

  /**
   * Action button text
   */
  actionLabel?: string;

  /**
   * Action button click handler
   */
  onAction?: () => void;

  /**
   * Whether the snackbar is visible
   */
  isVisible?: boolean;

  /**
   * Auto-hide duration in milliseconds (0 = no auto-hide)
   */
  autoHideDuration?: number;

  /**
   * Position of the snackbar
   */
  position?: "bottom" | "top";

  /**
   * Custom className
   */
  className?: string;

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;
}

/**
 * Snackbar - Brief message with optional action
 *
 * A minimal snackbar component for displaying brief messages with optional actions.
 * Matches Sidebar/AppBar design system with clean typography and subtle interactions.
 *
 * Features:
 * - Clean, minimal design
 * - Optional action button
 * - Auto-hide functionality
 * - Position variants (top/bottom)
 * - Hover effects matching Sidebar
 * - Full accessibility support
 * - Theme-aware styling
 *
 * @example
 * ```tsx
 * <Snackbar
 *   message="Settings saved successfully"
 *   actionLabel="Undo"
 *   onAction={() => undoAction()}
 *   isVisible={showSnackbar}
 *   position="bottom"
 * />
 * ```
 */
export function Snackbar({
  message,
  actionLabel,
  onAction,
  isVisible = true,
  autoHideDuration = 4000,
  position = "bottom",
  className,
  "aria-label": ariaLabel,
}: SnackbarProps) {
  const id = useId();

  // Auto-hide functionality
  React.useEffect(() => {
    if (autoHideDuration > 0 && isVisible && onAction) {
      const timer = setTimeout(() => {
        onAction();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, isVisible, onAction]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-label={ariaLabel}
      className={`${styles.snackbar} ${styles[position]} ${className || ""}`}
      data-position={position}
      data-visible={isVisible}
    >
      <div className={styles.content}>
        <span id={`${id}-message`} className={styles.message}>
          {message}
        </span>
        {actionLabel && onAction && (
          <button
            type="button"
            className={styles.action}
            onClick={onAction}
            aria-describedby={`${id}-message`}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
