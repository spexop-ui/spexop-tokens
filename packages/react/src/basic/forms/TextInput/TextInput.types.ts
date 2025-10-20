import type { ReactNode } from "react";

export interface TextInputProps {
  /**
   * The label for the input field
   */
  label: string;

  /**
   * The id of the input element
   */
  id?: string;

  /**
   * The name of the input element
   */
  name?: string;

  /**
   * The type of input
   */
  type?: "text" | "email" | "password" | "tel" | "url" | "search";

  /**
   * The value of the input
   */
  value?: string;

  /**
   * The default value of the input
   */
  defaultValue?: string;

  /**
   * The placeholder text
   */
  placeholder?: string;

  /**
   * Whether the input is required
   */
  required?: boolean;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;

  /**
   * Whether the input is read-only
   */
  readOnly?: boolean;

  /**
   * The size of the input
   */
  size?: "sm" | "md" | "lg";

  /**
   * The variant of the input
   */
  variant?: "default" | "error" | "success";

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Help text to display below the input
   */
  helpText?: string;

  /**
   * Icon to display on the left side
   */
  leftIcon?: ReactNode;

  /**
   * Icon to display on the right side
   */
  rightIcon?: ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Change handler
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Blur handler
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Focus handler
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
