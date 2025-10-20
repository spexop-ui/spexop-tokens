import type React from "react";
import { useCallback, useId, useRef } from "react";
import styles from "./Slider.module.css";

/**
 * Slider density variants for different contexts
 */
export type SliderDensity = "compact" | "normal" | "spacious";

export interface SliderProps {
  /**
   * Current value of the slider
   */
  value: number;

  /**
   * Minimum value
   */
  min?: number;

  /**
   * Maximum value
   */
  max?: number;

  /**
   * Step size for value changes
   */
  step?: number;

  /**
   * Change handler
   */
  onChange: (value: number) => void;

  /**
   * Whether the slider is disabled
   */
  disabled?: boolean;

  /**
   * Density variant for different contexts
   * - compact: Dashboard context (smaller track/thumb)
   * - normal: Default (balanced sizing)
   * - spacious: Blog/Content context (larger track/thumb)
   * @default "normal"
   */
  density?: SliderDensity;

  /**
   * Custom className
   */
  className?: string;

  /**
   * ID for the slider
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

  /**
   * Show value indicator
   */
  showValue?: boolean;

  /**
   * Custom value formatter
   */
  formatValue?: (value: number) => string;

  /**
   * Show tick marks for steps
   */
  showTicks?: boolean;
}

/**
 * Slider - Range input with custom styling
 *
 * A clean, accessible slider component for selecting numeric values.
 * Features smooth interactions and visual feedback.
 *
 * Features:
 * - Clean, minimal design
 * - Smooth dragging and keyboard navigation
 * - Visual value indicator
 * - Tick marks for steps
 * - Full accessibility (ARIA, focus management)
 * - Theme-aware styling
 * - Matches Sidebar/AppBar design system
 *
 * @example
 * ```tsx
 * <Slider
 *   value={textZoom}
 *   min={100}
 *   max={200}
 *   step={10}
 *   onChange={setTextZoom}
 *   showValue={true}
 *   formatValue={(value) => `${value}%`}
 *   aria-label="Text zoom"
 * />
 * ```
 */
export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  density = "normal",
  className,
  id: providedId,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  showValue = false,
  formatValue = (value) => value.toString(),
  showTicks = false,
}: SliderProps) {
  const autoId = useId();
  const id = providedId || autoId;
  const sliderRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate percentage for visual positioning
  const percentage = ((value - min) / (max - min)) * 100;

  // Handle value change
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(event.target.value);
      onChange(newValue);
    },
    [onChange],
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      const currentValue = parseFloat(event.currentTarget.value);
      let newValue = currentValue;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          event.preventDefault();
          newValue = Math.min(currentValue + step, max);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          event.preventDefault();
          newValue = Math.max(currentValue - step, min);
          break;
        case "Home":
          event.preventDefault();
          newValue = min;
          break;
        case "End":
          event.preventDefault();
          newValue = max;
          break;
        case "PageUp":
          event.preventDefault();
          newValue = Math.min(currentValue + step * 5, max);
          break;
        case "PageDown":
          event.preventDefault();
          newValue = Math.max(currentValue - step * 5, min);
          break;
      }

      if (newValue !== currentValue) {
        onChange(newValue);
      }
    },
    [disabled, min, max, step, onChange],
  );

  // Generate tick marks if enabled
  const generateTicks = () => {
    if (!showTicks) return null;

    const ticks = [];
    const tickCount = Math.floor((max - min) / step) + 1;

    for (let i = 0; i < tickCount; i++) {
      const tickValue = min + i * step;
      const tickPercentage = ((tickValue - min) / (max - min)) * 100;

      ticks.push(
        <div
          key={tickValue}
          className={styles.tick}
          style={{ left: `${tickPercentage}%` }}
        />,
      );
    }

    return ticks;
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${styles[`density${density.charAt(0).toUpperCase()}${density.slice(1)}`] || ""} ${disabled ? styles.disabled : ""} ${className || ""}`}
      data-disabled={disabled || undefined}
    >
      {/* Track */}
      <div className={styles.track}>
        {/* Ticks */}
        {showTicks && (
          <div className={styles.tickContainer}>{generateTicks()}</div>
        )}

        {/* Progress */}
        <div className={styles.progress} style={{ width: `${percentage}%` }} />

        {/* Native Range Input */}
        <input
          ref={sliderRef}
          type="range"
          id={id}
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={styles.slider}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />

        {/* Thumb */}
        <div className={styles.thumb} style={{ left: `${percentage}%` }} />
      </div>

      {/* Value Display */}
      {showValue && <div className={styles.value}>{formatValue(value)}</div>}
    </div>
  );
}
