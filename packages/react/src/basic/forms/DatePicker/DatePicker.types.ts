import type { ReactNode } from "react";

export interface DatePickerProps {
  /**
   * Current selected date (ISO string format)
   */
  value: string;

  /**
   * Change handler
   */
  onChange: (date: string) => void;

  /**
   * Label for the date picker
   */
  label?: string;

  /**
   * Whether the date picker is disabled
   */
  disabled?: boolean;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Help text to display below the date picker
   */
  helpText?: string;

  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";

  /**
   * Minimum date (ISO string format)
   */
  min?: string;

  /**
   * Maximum date (ISO string format)
   */
  max?: string;

  /**
   * Custom className
   */
  className?: string;

  /**
   * ID for the date picker element
   */
  id?: string;

  /**
   * Date format for display
   * @default "MM/DD/YYYY"
   */
  format?: "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";

  /**
   * Icon to display on the left side
   */
  leftIcon?: ReactNode;

  /**
   * Show week numbers
   */
  showWeekNumbers?: boolean;

  /**
   * First day of week (0 = Sunday, 1 = Monday)
   */
  firstDayOfWeek?: 0 | 1;
}
