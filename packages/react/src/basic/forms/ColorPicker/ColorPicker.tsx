/**
 * ColorPicker - Color selection component with presets
 *
 * Following "The Spexop Way":
 * - Principle 1: Primitives before patterns - Built on native color input
 * - Principle 2: Borders before shadows - Clean 2px borders
 * - Principle 3: Typography before decoration - Font weight for hierarchy
 * - Principle 4: Tokens before magic numbers - All spacing from design tokens
 * - Principle 5: Composition before complexity - Simple color input with presets
 * - Principle 6: Standards before frameworks - Native color input API
 * - Principle 7: Accessibility before aesthetics - Full keyboard navigation
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   value={color}
 *   onChange={setColor}
 *   label="Select color"
 * />
 * ```
 */

import type React from "react";
import { useId, useRef, useState } from "react";
import styles from "./ColorPicker.module.css";
import type { ColorPickerProps } from "./ColorPicker.types.js";

const DEFAULT_PRESETS = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#ff8800",
  "#8800ff",
  "#00ff88",
  "#ff0088",
  "#888888",
  "#444444",
  "#cccccc",
  "#aaaaaa",
];

export function ColorPicker({
  value,
  onChange,
  label,
  disabled = false,
  required = false,
  error,
  helpText,
  size = "md",
  className,
  id: providedId,
  showPresets = true,
  presets = DEFAULT_PRESETS,
  showAlpha = false,
  showInput = true,
  format = "hex",
  icon,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hexInput, setHexInput] = useState(value);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const inputId = providedId || autoId;

  // Normalize hex color
  const normalizeHex = (hex: string): string => {
    // Remove # if present
    let normalized = hex.replace("#", "");

    // Expand shorthand (e.g., "fff" to "ffffff")
    if (normalized.length === 3) {
      normalized = normalized
        .split("")
        .map((char) => char + char)
        .join("");
    }

    // Ensure # prefix
    return `#${normalized}`.toLowerCase();
  };

  // Validate hex color
  const isValidHex = (hex: string): boolean => {
    const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    return hexRegex.test(hex);
  };

  // Handle color change from native input
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setHexInput(newColor);
    onChange(newColor);
  };

  // Handle hex input change
  const handleHexInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setHexInput(newValue);

    if (isValidHex(newValue)) {
      const normalized = normalizeHex(newValue);
      onChange(normalized);
    }
  };

  // Handle hex input blur
  const handleHexInputBlur = () => {
    if (!isValidHex(hexInput)) {
      setHexInput(value);
    } else {
      const normalized = normalizeHex(hexInput);
      setHexInput(normalized);
      onChange(normalized);
    }
  };

  // Handle preset color selection
  const handlePresetClick = (color: string) => {
    setHexInput(color);
    onChange(color);
  };

  // Open color picker
  const handleColorSwatchClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleColorSwatchClick();
    }
  };

  const inputVariant = error ? "error" : "default";

  return (
    <div className={`${styles.colorPicker} ${className || ""}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      <div
        ref={colorPickerRef}
        className={`${styles.colorPickerContainer} ${styles[`size-${size}`]} ${
          disabled ? styles.disabled : ""
        } ${inputVariant === "error" ? styles.hasError : ""}`}
      >
        <input
          ref={inputRef}
          type="color"
          id={inputId}
          className={styles.hiddenInput}
          value={value}
          onChange={handleColorChange}
          disabled={disabled}
          required={required}
          aria-label={label}
          aria-invalid={error ? "true" : undefined}
        />

        <div
          className={styles.colorDisplay}
          onClick={handleColorSwatchClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={`Selected color: ${value}`}
        >
          {icon && <div className={styles.icon}>{icon}</div>}
          <div
            className={styles.colorSwatch}
            style={{ backgroundColor: value }}
          />
          {showInput && (
            <input
              type="text"
              className={styles.hexInput}
              value={hexInput}
              onChange={handleHexInputChange}
              onBlur={handleHexInputBlur}
              disabled={disabled}
              placeholder="#000000"
              maxLength={7}
              aria-label="Hex color value"
            />
          )}
        </div>

        {showPresets && presets.length > 0 && (
          <div className={styles.presets}>
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                className={`${styles.presetSwatch} ${
                  preset === value ? styles.presetSelected : ""
                }`}
                style={{ backgroundColor: preset }}
                onClick={() => handlePresetClick(preset)}
                disabled={disabled}
                aria-label={`Preset color: ${preset}`}
                title={preset}
              />
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}

      {helpText && !error && <div className={styles.helpText}>{helpText}</div>}
    </div>
  );
}
