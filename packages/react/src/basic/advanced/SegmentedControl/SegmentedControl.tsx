import type React from "react";
import { useId } from "react";
import styles from "./SegmentedControl.module.css";

export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /**
   * Current selected value
   */
  value: string;

  /**
   * Change handler
   */
  onChange: (value: string) => void;

  /**
   * Available options
   */
  options: SegmentedControlOption[];

  /**
   * Whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * ID for the control group
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
 * SegmentedControl - Visual button group for selecting options
 *
 * A modern segmented control for selecting between multiple options.
 * Great for visual choices like theme selection.
 *
 * Features:
 * - Visual button group design
 * - Optional icons
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Full accessibility (ARIA, focus management)
 * - Theme-aware styling
 * - Matches Sidebar/AppBar design system
 *
 * @example
 * ```tsx
 * <SegmentedControl
 *   value={theme}
 *   onChange={setTheme}
 *   options={[
 *     { value: 'light', label: 'Light', icon: <SunIcon /> },
 *     { value: 'dark', label: 'Dark', icon: <MoonIcon /> },
 *     { value: 'auto', label: 'Auto', icon: <AutoIcon /> },
 *   ]}
 *   aria-label="Theme selection"
 * />
 * ```
 */
export function SegmentedControl({
  value,
  onChange,
  options,
  disabled = false,
  className,
  id: providedId,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: SegmentedControlProps) {
  const autoId = useId();
  const _id = providedId || autoId;

  // Handle keyboard navigation
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    _currentIndex: number,
  ) => {
    const enabledOptions = options.filter((opt) => !opt.disabled);
    const currentOptionIndex = enabledOptions.findIndex(
      (opt) => opt.value === value,
    );

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        if (currentOptionIndex > 0) {
          onChange(enabledOptions[currentOptionIndex - 1].value);
        }
        break;

      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        if (currentOptionIndex < enabledOptions.length - 1) {
          onChange(enabledOptions[currentOptionIndex + 1].value);
        }
        break;

      case "Home":
        event.preventDefault();
        onChange(enabledOptions[0].value);
        break;

      case "End":
        event.preventDefault();
        onChange(enabledOptions[enabledOptions.length - 1].value);
        break;
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={`${styles.control} ${disabled ? styles.disabled : ""} ${className || ""}`}
      data-disabled={disabled || undefined}
    >
      {options.map((option, index) => {
        const isSelected = option.value === value;
        const isDisabled = disabled || option.disabled;

        return (
          // biome-ignore lint/a11y/useSemanticElements: button with role="radio" is the standard accessible pattern for segmented controls
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={isDisabled}
            className={`${styles.option} ${isSelected ? styles.selected : ""} ${
              isDisabled ? styles.optionDisabled : ""
            }`}
            onClick={() => !isDisabled && onChange(option.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={isSelected ? 0 : -1}
          >
            {option.icon && (
              <span className={styles.icon} aria-hidden="true">
                {option.icon}
              </span>
            )}
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
