export interface TextAreaProps {
  /**
   * The label for the textarea field
   */
  label: string;

  /**
   * The id of the textarea element
   */
  id?: string;

  /**
   * The name of the textarea element
   */
  name?: string;

  /**
   * The value of the textarea
   */
  value?: string;

  /**
   * The default value of the textarea
   */
  defaultValue?: string;

  /**
   * The placeholder text
   */
  placeholder?: string;

  /**
   * Whether the textarea is required
   */
  required?: boolean;

  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean;

  /**
   * Whether the textarea is read-only
   */
  readOnly?: boolean;

  /**
   * The size of the textarea
   */
  size?: "sm" | "md" | "lg";

  /**
   * The variant of the textarea
   */
  variant?: "default" | "error" | "success";

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Help text to display below the textarea
   */
  helpText?: string;

  /**
   * Number of rows
   */
  rows?: number;

  /**
   * Minimum number of rows
   */
  minRows?: number;

  /**
   * Maximum number of rows
   */
  maxRows?: number;

  /**
   * Whether to auto-resize based on content
   */
  autoResize?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Change handler
   */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Blur handler
   */
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;

  /**
   * Focus handler
   */
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}
