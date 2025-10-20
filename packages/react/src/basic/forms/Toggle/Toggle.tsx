import type React from "react";
import { useId } from "react";
import styles from "./Toggle.module.css";

/**
 * Toggle density variants for different contexts
 */
export type ToggleDensity = "compact" | "normal" | "spacious";

export interface ToggleProps {
  /**
   * Whether the toggle is checked
   */
  checked: boolean;

  /**
   * Change handler
   */
  onChange: (checked: boolean) => void;

  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;

  /**
   * Density variant for different contexts
   * - compact: Dashboard context (smaller toggle)
   * - normal: Default (balanced sizing)
   * - spacious: Blog/Content context (larger toggle)
   * @default "normal"
   */
  density?: ToggleDensity;

  /**
   * Optional label
   */
  label?: string;

  /**
   * Custom className
   */
  className?: string;

  /**
   * ID for the toggle element
   */
  id?: string;

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;

  /**
   * ARIA labelledby for accessibility
   */
  "aria-labelledby"?: string;
}

/**
 * Toggle - Modern toggle/switch component
 *
 * Features:
 * - Smooth animations
 * - Keyboard accessible (Space, Enter)
 * - Theme-aware styling
 * - Disabled state
 * - Optional label
 * - WCAG 2.2 AA compliant
 *
 * @example
 * ```tsx
 * <Toggle
 *   checked={enabled}
 *   onChange={setEnabled}
 *   label="Enable feature"
 * />
 * ```
 */
export function Toggle({
  checked,
  onChange,
  disabled = false,
  density = "normal",
  label,
  className,
  id: providedId,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: ToggleProps) {
  const autoId = useId();
  const id = providedId || autoId;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      onChange(!checked);
    }
  };

  const handleClick = () => {
    if (disabled) return;
    onChange(!checked);
  };

  return (
    <div
      className={`${styles.toggleContainer} ${styles[`density${density.charAt(0).toUpperCase()}${density.slice(1)}`] || ""} ${disabled ? styles.disabled : ""} ${className || ""}`}
    >
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        aria-label={ariaLabel || label}
        aria-labelledby={ariaLabelledby}
        className={`${styles.toggle} ${checked ? styles.checked : ""}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        data-checked={checked || undefined}
      >
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
      </button>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
}
