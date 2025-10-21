/**
 * Table Component
 * Border-first table system with comprehensive styling and accessibility
 *
 * @component Table
 * @packageName @spexop/react
 * @description Primitives-first table system following "The Spexop Way"
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.2.0
 * @since 2025-10-20
 *
 * Following "The Spexop Way":
 * - Principle 1: Primitives before patterns - Composable table parts
 * - Principle 2: Borders before shadows - Strong 2px borders for separation
 * - Principle 3: Typography before decoration - Font weight for hierarchy
 * - Principle 4: Tokens before magic numbers - Design tokens throughout
 * - Principle 5: Composition before complexity - Build tables from simple parts
 * - Principle 6: Standards before frameworks - Semantic HTML table elements
 * - Principle 7: Accessibility before aesthetics - ARIA attributes and keyboard support
 *
 * @example
 * ```tsx
 * <Table variant="bordered" size="md">
 *   <TableHeader>
 *     <TableRow>
 *       <TableCell header>Name</TableCell>
 *       <TableCell header>Email</TableCell>
 *       <TableCell header align="right">Actions</TableCell>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *       <TableCell align="right">
 *         <Button size="sm">Edit</Button>
 *       </TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */

import styles from "./Table.module.css";
import type {
  TableBodyProps,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
} from "./Table.types.js";

/**
 * Main Table component
 */
export function Table({
  children,
  variant = "default",
  size = "md",
  layout = "auto",
  fullWidth = true,
  responsive = false,
  stickyHeader = false,
  className = "",
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
}: TableProps) {
  const tableClassName = [
    styles.table,
    styles[`variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
    styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
    styles[`layout${layout.charAt(0).toUpperCase()}${layout.slice(1)}`],
    fullWidth && styles.fullWidth,
    stickyHeader && styles.stickyHeader,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperClassName = [styles.wrapper, responsive && styles.responsive]
    .filter(Boolean)
    .join(" ");

  const table = (
    <table
      className={tableClassName}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
    >
      {children}
    </table>
  );

  return responsive ? <div className={wrapperClassName}>{table}</div> : table;
}

/**
 * TableHeader component
 */
export function TableHeader({ children, className = "" }: TableHeaderProps) {
  const headerClassName = [styles.header, className].filter(Boolean).join(" ");

  return <thead className={headerClassName}>{children}</thead>;
}

/**
 * TableBody component
 */
export function TableBody({ children, className = "" }: TableBodyProps) {
  const bodyClassName = [styles.body, className].filter(Boolean).join(" ");

  return <tbody className={bodyClassName}>{children}</tbody>;
}

/**
 * TableFooter component
 */
export function TableFooter({ children, className = "" }: TableFooterProps) {
  const footerClassName = [styles.footer, className].filter(Boolean).join(" ");

  return <tfoot className={footerClassName}>{children}</tfoot>;
}

/**
 * TableRow component
 */
export function TableRow({
  children,
  selected = false,
  className = "",
  onClick,
}: TableRowProps) {
  const rowClassName = [
    styles.row,
    selected && styles.rowSelected,
    onClick && styles.rowClickable,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <tr
      className={rowClassName}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-selected={selected ? "true" : undefined}
    >
      {children}
    </tr>
  );
}

/**
 * TableCell component
 */
export function TableCell({
  children,
  header = false,
  align = "left",
  colSpan,
  rowSpan,
  width,
  className = "",
  "aria-sort": ariaSort,
}: TableCellProps) {
  const cellClassName = [
    styles.cell,
    header && styles.cellHeader,
    styles[`align${align.charAt(0).toUpperCase()}${align.slice(1)}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Component = header ? "th" : "td";

  return (
    <Component
      className={cellClassName}
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={width ? { width } : undefined}
      aria-sort={header && ariaSort ? ariaSort : undefined}
    >
      {children}
    </Component>
  );
}
