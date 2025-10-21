/**
 * SegmentedButton Component
 * Radio-style button group with exclusive selection
 *
 * @component SegmentedButton
 * @packageName @spexop/react
 * @description SegmentedButton component with keyboard navigation
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import { useCallback, useRef } from "react";
import styles from "./SegmentedButton.module.css";
import type { SegmentedButtonProps } from "./SegmentedButton.types.js";

/**
 * SegmentedButton component
 *
 * @example
 * ```tsx
 * const [view, setView] = useState('list');
 *
 * <SegmentedButton
 *   value={view}
 *   onChange={setView}
 *   options={[
 *     { value: 'list', label: 'List' },
 *     { value: 'grid', label: 'Grid' },
 *     { value: 'table', label: 'Table' }
 *   ]}
 *   aria-label="View mode"
 * />
 * ```
 */
export function SegmentedButton({
  value,
  onChange,
  options,
  className = "",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: SegmentedButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation (arrow keys)
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      event.preventDefault();

      const currentIndex = options.findIndex((opt) => opt.value === value);
      let nextIndex: number;

      if (event.key === "ArrowRight") {
        // Move to next option (wrap around)
        nextIndex = (currentIndex + 1) % options.length;
      } else {
        // Move to previous option (wrap around)
        nextIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
      }

      // Skip disabled options
      while (options[nextIndex]?.disabled && nextIndex !== currentIndex) {
        if (event.key === "ArrowRight") {
          nextIndex = (nextIndex + 1) % options.length;
        } else {
          nextIndex = nextIndex === 0 ? options.length - 1 : nextIndex - 1;
        }
      }

      if (!options[nextIndex]?.disabled) {
        onChange(options[nextIndex].value);
      }
    },
    [value, options, onChange],
  );

  // Compose className
  const containerClassName = [styles.segmentedButton, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      onKeyDown={handleKeyDown}
    >
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={option["aria-label"] || option.label}
            disabled={option.disabled}
            className={`${styles.option} ${isActive ? styles.optionActive : ""} ${
              option.disabled ? styles.optionDisabled : ""
            }`}
            onClick={() => !option.disabled && onChange(option.value)}
            tabIndex={isActive ? 0 : -1}
          >
            {option.icon && (
              <span className={styles.optionIcon}>{option.icon}</span>
            )}
            <span className={styles.optionLabel}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
