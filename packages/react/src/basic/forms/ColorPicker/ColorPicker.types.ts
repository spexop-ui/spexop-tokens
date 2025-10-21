import type { ReactNode } from "react";

export interface ColorPickerProps {
  /**
   * Current selected color (hex format)
   */
  value: string;

  /**
   * Change handler
   */
  onChange: (color: string) => void;

  /**
   * Label for the color picker
   */
  label?: string;

  /**
   * Whether the color picker is disabled
   */
  disabled?: boolean;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Help text to display below the color picker
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
   * ID for the color picker element
   */
  id?: string;

  /**
   * Show preset colors
   */
  showPresets?: boolean;

  /**
   * Preset color palette
   */
  presets?: string[];

  /**
   * Show alpha channel slider
   */
  showAlpha?: boolean;

  /**
   * Show hex input field
   */
  showInput?: boolean;

  /**
   * Format for color value
   */
  format?: "hex" | "rgb" | "hsl";

  /**
   * Custom icon
   */
  icon?: ReactNode;
}
