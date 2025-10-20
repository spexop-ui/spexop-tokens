import type React from "react";
import { useId } from "react";
import styles from "./RadioGroup.module.css";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

/**
 * RadioGroup density variants for different contexts
 */
export type RadioGroupDensity = "compact" | "normal" | "spacious";

export interface RadioGroupProps {
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
  options: RadioOption[];

  /**
   * Whether the group is disabled
   */
  disabled?: boolean;

  /**
   * Density variant for different contexts
   * - compact: Dashboard context (tighter spacing)
   * - normal: Default (balanced spacing)
   * - spacious: Blog/Content context (generous spacing)
   * @default "normal"
   */
  density?: RadioGroupDensity;

  /**
   * Custom className
   */
  className?: string;

  /**
   * ID for the radio group
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
 * RadioGroup - Radio button group for selecting options
 *
 * A clean radio button group for selecting between multiple options.
 * Great for settings with descriptive labels.
 *
 * Features:
 * - Clean radio button design
 * - Optional descriptions
 * - Keyboard navigation (Arrow keys, Home, End, Space)
 * - Full accessibility (ARIA, focus management)
 * - Theme-aware styling
 * - Matches Sidebar/AppBar design system
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   value={spacing}
 *   onChange={setSpacing}
 *   options={[
 *     { value: 'compact', label: 'Compact', description: 'Less padding' },
 *     { value: 'normal', label: 'Normal', description: 'Balanced spacing' },
 *     { value: 'spacious', label: 'Spacious', description: 'More padding' },
 *   ]}
 *   aria-label="Spacing selection"
 * />
 * ```
 */
export function RadioGroup({
  value,
  onChange,
  options,
  disabled = false,
  density = "normal",
  className,
  id: providedId,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: RadioGroupProps) {
  const autoId = useId();
  const id = providedId || autoId;

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, currentValue: string) => {
    const enabledOptions = options.filter((opt) => !opt.disabled);
    const currentIndex = enabledOptions.findIndex(
      (opt) => opt.value === currentValue,
    );

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < enabledOptions.length - 1) {
          onChange(enabledOptions[currentIndex + 1].value);
        }
        break;

      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          onChange(enabledOptions[currentIndex - 1].value);
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

      case " ":
      case "Enter":
        event.preventDefault();
        onChange(currentValue);
        break;
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={`${styles.group} ${styles[`density${density.charAt(0).toUpperCase()}${density.slice(1)}`] || ""} ${disabled ? styles.disabled : ""} ${className || ""}`}
      data-disabled={disabled || undefined}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        const isDisabled = disabled || option.disabled;
        const optionId = `${id}-${option.value}`;

        return (
          <label
            key={option.value}
            htmlFor={optionId}
            className={`${styles.option} ${isSelected ? styles.selected : ""} ${
              isDisabled ? styles.optionDisabled : ""
            }`}
          >
            <input
              type="radio"
              id={optionId}
              name={id}
              value={option.value}
              checked={isSelected}
              disabled={isDisabled}
              onChange={(e) => !isDisabled && onChange(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, option.value)}
              className={styles.input}
              aria-describedby={
                option.description ? `${optionId}-desc` : undefined
              }
            />
            <span className={styles.radio}>
              <span className={styles.radioInner} />
            </span>
            <span className={styles.content}>
              <span className={styles.label}>{option.label}</span>
              {option.description && (
                <span id={`${optionId}-desc`} className={styles.description}>
                  {option.description}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
