/**
 * Pagination - Accessible pagination component
 *
 * A pagination component for navigating through pages,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - strong borders for buttons
 * - Principle 3: Typography before decoration - bold for active page
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Keyboard accessible navigation
 * - Screen reader accessible with ARIA
 * - Multiple size variants
 * - Configurable number of visible pages
 * - First/Last page buttons
 * - Previous/Next page buttons
 * - Ellipsis for truncated pages
 * - Customizable labels
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * const [currentPage, setCurrentPage] = useState(1);
 *
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={10}
 *   onPageChange={setCurrentPage}
 * />
 * ```
 */

import { ChevronLeft, ChevronRight } from "@spexop/icons";
import { cn } from "../../../utils/index.js";
import styles from "./Pagination.module.css";
import type { PaginationProps } from "./Pagination.types.js";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  size = "md",
  showFirstLast = true,
  showPrevNext = true,
  showPageNumbers = true,
  className,
  labels = {},
}: PaginationProps) {
  const {
    first = "First",
    previous = "Previous",
    next = "Next",
    last = "Last",
    page = (p: number) => `Page ${p}`,
  } = labels;

  // Calculate page range
  const getPageRange = () => {
    const totalPageNumbers = siblingCount * 2 + 5; // siblings + first + last + current + 2 ellipsis

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, "ellipsis-right", totalPages];
    }

    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, "ellipsis-left", ...rightRange];
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, "ellipsis-left", ...middleRange, "ellipsis-right", totalPages];
  };

  const pageNumbers = showPageNumbers ? getPageRange() : [];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const containerClassName = cn(
    styles.pagination,
    styles[`size-${size}`],
    className,
  );

  const renderPageButton = (pageNum: number | string, index: number) => {
    if (pageNum === "ellipsis-left" || pageNum === "ellipsis-right") {
      return (
        <span
          key={`ellipsis-${index}`}
          className={styles.ellipsis}
          aria-hidden="true"
        >
          ...
        </span>
      );
    }

    const pageNumber = pageNum as number;
    const isActive = pageNumber === currentPage;
    const buttonClassName = cn(styles.button, isActive && styles.active);

    return (
      <button
        key={pageNumber}
        type="button"
        onClick={() => handlePageChange(pageNumber)}
        disabled={isActive}
        className={buttonClassName}
        aria-label={page(pageNumber)}
        aria-current={isActive ? "page" : undefined}
      >
        {pageNumber}
      </button>
    );
  };

  return (
    <nav className={containerClassName} aria-label="Pagination">
      <div className={styles.buttons}>
        {showFirstLast && (
          <button
            type="button"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={styles.button}
            aria-label={first}
          >
            <span style={{ display: "flex", marginLeft: "-4px" }}>
              <ChevronLeft size={16} strokeWidth={2} color="currentColor" />
              <ChevronLeft
                size={16}
                strokeWidth={2}
                color="currentColor"
                style={{ marginLeft: "-8px" }}
              />
            </span>
            <span className={styles["button-label"]}>{first}</span>
          </button>
        )}

        {showPrevNext && (
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.button}
            aria-label={previous}
          >
            <ChevronLeft size={16} strokeWidth={2} color="currentColor" />
            <span className={styles["button-label"]}>{previous}</span>
          </button>
        )}

        {pageNumbers.map((pageNum, index) => renderPageButton(pageNum, index))}

        {showPrevNext && (
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.button}
            aria-label={next}
          >
            <span className={styles["button-label"]}>{next}</span>
            <ChevronRight size={16} strokeWidth={2} color="currentColor" />
          </button>
        )}

        {showFirstLast && (
          <button
            type="button"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={styles.button}
            aria-label={last}
          >
            <span className={styles["button-label"]}>{last}</span>
            <span style={{ display: "flex", marginRight: "-4px" }}>
              <ChevronRight size={16} strokeWidth={2} color="currentColor" />
              <ChevronRight
                size={16}
                strokeWidth={2}
                color="currentColor"
                style={{ marginLeft: "-8px" }}
              />
            </span>
          </button>
        )}
      </div>
    </nav>
  );
}
