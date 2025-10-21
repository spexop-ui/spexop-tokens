/**
 * Pagination Types
 *
 * Type definitions for the Pagination component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface PaginationProps {
  /** Current page (1-indexed) */
  currentPage: number;

  /** Total number of pages */
  totalPages: number;

  /** Callback when page changes */
  onPageChange: (page: number) => void;

  /** Number of page buttons to show */
  siblingCount?: number;

  /** Size variant */
  size?: "sm" | "md" | "lg";

  /** Whether to show first/last buttons */
  showFirstLast?: boolean;

  /** Whether to show previous/next buttons */
  showPrevNext?: boolean;

  /** Whether to show page numbers */
  showPageNumbers?: boolean;

  /** Additional CSS class */
  className?: string;

  /** Custom labels */
  labels?: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
    page?: (page: number) => string;
  };
}
