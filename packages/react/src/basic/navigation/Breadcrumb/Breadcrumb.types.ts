/**
 * Breadcrumb Types
 *
 * Type definitions for the Breadcrumb component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface BreadcrumbItem {
  /** Item label */
  label: React.ReactNode;
  /** Item href (link) */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Icon to display */
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];

  /** Separator between items */
  separator?: React.ReactNode;

  /** Size variant */
  size?: "sm" | "md" | "lg";

  /** Maximum items to show before collapsing */
  maxItems?: number;

  /** Additional CSS class */
  className?: string;

  /** ARIA label */
  "aria-label"?: string;
}
