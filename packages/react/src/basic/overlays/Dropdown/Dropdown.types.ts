/**
 * Dropdown Types
 *
 * Type definitions for the Dropdown component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface DropdownMenuItem {
  /** Unique identifier */
  id: string;
  /** Menu item label */
  label: React.ReactNode;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Item variant */
  variant?: "default" | "danger";
  /** Click handler */
  onClick?: () => void;
  /** Divider after item */
  divider?: boolean;
}

export interface DropdownProps {
  /** Menu items */
  items: DropdownMenuItem[];

  /** Trigger element */
  trigger: React.ReactElement;

  /** Dropdown placement */
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";

  /** Whether dropdown is open (controlled) */
  isOpen?: boolean;

  /** Callback when open state changes */
  onOpenChange?: (isOpen: boolean) => void;

  /** Additional CSS class for dropdown */
  className?: string;

  /** Additional CSS class for trigger */
  triggerClassName?: string;

  /** Whether to close on item click */
  closeOnItemClick?: boolean;
}
