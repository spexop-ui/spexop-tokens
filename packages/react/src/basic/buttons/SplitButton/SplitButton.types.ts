/**
 * SplitButton Component Types
 * Button with primary action + dropdown menu
 *
 * @component SplitButton
 * @packageName @spexop/react
 * @description Split button with main action and dropdown options
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import type { ReactNode } from "react";

/**
 * Split button dropdown option
 */
export interface SplitButtonOption {
  /**
   * Display label for the menu item
   */
  label: string;

  /**
   * Unique value identifier
   */
  value: string;

  /**
   * Click handler for this option
   */
  onClick: () => void;

  /**
   * Optional icon before label
   */
  icon?: ReactNode;

  /**
   * Disabled state for this option
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional ARIA label
   */
  "aria-label"?: string;
}

/**
 * Button variant for styling
 */
export type SplitButtonVariant = "primary" | "secondary";

/**
 * SplitButton component props
 */
export interface SplitButtonProps {
  /**
   * Main button label (primary action)
   */
  label: string;

  /**
   * Main button click handler
   */
  onClick: () => void;

  /**
   * Array of dropdown menu options
   */
  options: SplitButtonOption[];

  /**
   * Button variant
   * @default 'primary'
   */
  variant?: SplitButtonVariant;

  /**
   * Disabled state (affects both main button and dropdown)
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Optional icon for main button
   */
  icon?: ReactNode;

  // Accessibility props

  /**
   * ARIA label for main button (overrides label)
   */
  "aria-label"?: string;

  /**
   * ARIA label for dropdown toggle button
   * @default "Show more options"
   */
  "aria-label-toggle"?: string;
}
