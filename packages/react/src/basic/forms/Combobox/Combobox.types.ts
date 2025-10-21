import type { ReactNode } from "react";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface ComboboxProps {
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
  options: ComboboxOption[];

  /**
   * Label for the combobox
   */
  label?: string;

  /**
   * Whether the combobox is disabled
   */
  disabled?: boolean;

  /**
   * Placeholder text when no value selected
   */
  placeholder?: string;

  /**
   * Whether the combobox is required
   */
  required?: boolean;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Help text to display below the combobox
   */
  helpText?: string;

  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";

  /**
   * Custom className
   */
  className?: string;

  /**
   * ID for the combobox element
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
   * Custom filter function
   */
  filterFn?: (option: ComboboxOption, query: string) => boolean;

  /**
   * Maximum height for dropdown
   */
  maxHeight?: string;

  /**
   * Icon to display on the left side
   */
  leftIcon?: ReactNode;
}
