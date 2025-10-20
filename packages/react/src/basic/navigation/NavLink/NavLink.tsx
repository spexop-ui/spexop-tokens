/**
 * NavLink Component
 * Navigation link for sidebar with active state support
 *
 * Follows "Refined Minimalism":
 * - Borders for active state (not shadows)
 * - High contrast text
 * - Token-based spacing
 * - Touch-optimized (48px min height)
 * - WCAG AA compliant
 *
 * @component NavLink
 * @packageName @spexop/react
 * @description Navigation link for sidebar with active state support
 * @author @spexop-ui | github.com/spexop-ui |  @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 */

import styles from "./NavLink.module.css";
import type { NavLinkProps } from "./NavLink.types.js";

export function NavLink({
  href,
  children,
  active = false,
  onClick,
  className = "",
}: NavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${styles.navLink} ${active ? styles.active : ""} ${className}`}
      aria-current={active ? "page" : undefined}
      tabIndex={0}
    >
      {children}
    </a>
  );
}
