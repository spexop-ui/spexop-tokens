/**
 * Tabs Types
 *
 * Type definitions for the Tabs component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface Tab {
  /** Unique identifier for the tab */
  id: string;
  /** Tab label */
  label: React.ReactNode;
  /** Tab panel content */
  content: React.ReactNode;
  /** Whether tab is disabled */
  disabled?: boolean;
  /** Icon to display before label */
  icon?: React.ReactNode;
}

export interface TabsProps {
  /** Array of tabs */
  tabs: Tab[];

  /** Currently active tab ID */
  activeTab?: string;

  /** Callback when tab changes */
  onChange?: (tabId: string) => void;

  /** Default active tab ID (uncontrolled) */
  defaultActiveTab?: string;

  /** Visual variant */
  variant?: "default" | "pills" | "underline";

  /** Size variant */
  size?: "sm" | "md" | "lg";

  /** Whether tabs should fill container width */
  fullWidth?: boolean;

  /** Additional CSS class for tabs container */
  className?: string;

  /** Additional CSS class for tab list */
  tabListClassName?: string;

  /** Additional CSS class for tab panels */
  tabPanelClassName?: string;
}
