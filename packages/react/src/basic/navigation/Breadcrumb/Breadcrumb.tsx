/**
 * Breadcrumb - Accessible breadcrumb navigation component
 *
 * A breadcrumb component for showing navigation hierarchy,
 * following "The Spexop Way":
 * - Principle 3: Typography before decoration - clear hierarchy with font weight
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Keyboard accessible navigation
 * - Screen reader accessible with ARIA
 * - Multiple size variants
 * - Custom separator support
 * - Icons support
 * - Collapsible for long paths
 * - Semantic HTML
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * const items = [
 *   { label: 'Home', href: '/' },
 *   { label: 'Products', href: '/products' },
 *   { label: 'Category', href: '/products/category' },
 *   { label: 'Current Page' },
 * ];
 *
 * <Breadcrumb items={items} />
 * ```
 */

import { ChevronRight } from "@spexop/icons";
import { cn } from "../../../utils/index.js";
import styles from "./Breadcrumb.module.css";
import type { BreadcrumbItem, BreadcrumbProps } from "./Breadcrumb.types.js";

const defaultSeparator = (
  <ChevronRight size={16} strokeWidth={2} color="currentColor" />
);

export function Breadcrumb({
  items,
  separator = defaultSeparator,
  size = "md",
  maxItems,
  className,
  "aria-label": ariaLabel = "Breadcrumb",
}: BreadcrumbProps) {
  let displayItems = items;

  // Collapse items if maxItems is specified
  if (maxItems && items.length > maxItems) {
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));
    displayItems = [
      firstItem,
      {
        label: "...",
        disabled: true,
      },
      ...lastItems,
    ];
  }

  const breadcrumbClassName = cn(
    styles.breadcrumb,
    styles[`size-${size}`],
    className,
  );

  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const itemClassName = cn(
      styles.item,
      item.disabled && styles.disabled,
      isLast && styles.current,
    );

    const content = (
      <>
        {item.icon && <span className={styles.icon}>{item.icon}</span>}
        <span className={styles.label}>{item.label}</span>
      </>
    );

    if (isLast || item.disabled) {
      return (
        <span
          className={itemClassName}
          aria-current={isLast ? "page" : undefined}
        >
          {content}
        </span>
      );
    }

    if (item.href) {
      return (
        <a href={item.href} className={itemClassName} onClick={item.onClick}>
          {content}
        </a>
      );
    }

    if (item.onClick) {
      return (
        <button type="button" className={itemClassName} onClick={item.onClick}>
          {content}
        </button>
      );
    }

    return <span className={itemClassName}>{content}</span>;
  };

  return (
    <nav aria-label={ariaLabel} className={breadcrumbClassName}>
      <ol className={styles.list}>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const key = item.href || `${item.label}-${index}`;
          return (
            <li key={key} className={styles["list-item"]}>
              {renderItem(item, index, isLast)}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
