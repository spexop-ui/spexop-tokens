/**
 * Link Component
 * General-purpose link with variants, accessibility, and icon support
 *
 * Follows "The Spexop Way":
 * - Principle 2: Borders before shadows
 * - Principle 3: Typography before decoration
 * - Principle 4: Tokens before magic numbers
 * - Principle 7: Accessibility before aesthetics
 *
 * @component Link
 * @packageName @spexop/react
 * @description General-purpose link component with variants and accessibility
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-21
 *
 * @example
 * ```tsx
 * <Link href="/docs" variant="text">
 *   Documentation
 * </Link>
 * ```
 */

import { cn } from "../../../utils/index.js";
import styles from "./Link.module.css";
import type { LinkProps } from "./Link.types.js";

export function Link({
  href,
  children,
  variant = "text",
  size = "md",
  active = false,
  fullWidth = false,
  external = false,
  disabled = false,
  className,
  onClick,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
  "aria-describedby": ariaDescribedBy,
  ...props
}: LinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  const linkClassName = cn(
    styles.link,
    styles[variant],
    styles[`size-${size}`],
    active && styles.active,
    fullWidth && styles["full-width"],
    external && styles.external,
    className,
  );

  // Determine aria-current
  const currentAria = ariaCurrent || (active ? "page" : undefined);

  // External link security attributes
  const externalProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <a
      href={href}
      className={linkClassName}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-current={currentAria}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled ? "true" : undefined}
      tabIndex={disabled ? -1 : 0}
      {...externalProps}
      {...props}
    >
      {children}
    </a>
  );
}
