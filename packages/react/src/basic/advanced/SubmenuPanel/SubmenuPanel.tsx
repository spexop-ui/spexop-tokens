/**
 * SubmenuPanel - Floating submenu panel for Sidebar
 *
 * A floating panel that displays submenu items next to the sidebar.
 * Supports animations, keyboard navigation, and accessibility.
 *
 * @example
 * ```tsx
 * import { SubmenuPanel } from '@spexop/react';
 *
 * <SubmenuPanel
 *   title="Components"
 *   items={[
 *     { label: "Button", href: "/button", icon: ButtonIconW1 },
 *     { label: "Card", href: "/card", icon: CardIconW1 },
 *   ]}
 *   top={100}
 *   isClosing={false}
 *   onClose={() => setActiveSubmenu(null)}
 * />
 * ```
 */

import { X } from "@spexop/icons";
import type React from "react";
import { type ForwardedRef, forwardRef, useEffect, useState } from "react";
import styles from "./SubmenuPanel.module.css";

// Icon type - React component that accepts icon props
type IconComponent = React.ComponentType<{
  size?: number;
  strokeWidth?: number;
  color?: string;
}>;

export interface SubmenuItem {
  label: string;
  href: string;
  icon?: IconComponent;
}

export interface SubmenuPanelProps {
  /** Submenu title */
  title: string;
  /** Submenu items */
  items: SubmenuItem[];
  /** Top position (from parent item) */
  top?: number;
  /** Closing animation state */
  isClosing?: boolean;
  /** Close callback */
  onClose?: () => void;
  /** Callback when item is clicked */
  onItemClick?: () => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * SubmenuPanel Component
 * Floating submenu panel with animations and keyboard support
 */
export const SubmenuPanel = forwardRef<HTMLDivElement, SubmenuPanelProps>(
  function SubmenuPanel(
    {
      title,
      items,
      top,
      isClosing = false,
      onClose,
      onItemClick,
      className = "",
    },
    ref: ForwardedRef<HTMLDivElement>,
  ) {
    // Detect mobile screen size
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
      <div
        ref={ref}
        className={`${styles.submenuPanel} ${isClosing ? styles.submenuClosing : ""} ${className}`}
        style={{ top: top ? `${top}px` : undefined }}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <button
            className={styles.mobileClose}
            onClick={onClose}
            aria-label="Close submenu"
            type="button"
          >
            <X size={24} strokeWidth={2} />
          </button>
        )}

        {/* Header */}
        <div className={styles.submenuHeader}>
          <span className={styles.submenuTitle}>{title}</span>
        </div>

        {/* Navigation */}
        <nav className={styles.submenuNav}>
          <ul className={styles.submenuList}>
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <li
                  key={`${item.href}-${index}`}
                  className={styles.submenuItem}
                >
                  <a
                    href={item.href}
                    className={styles.submenuLink}
                    onClick={onItemClick}
                  >
                    {Icon && (
                      <span className={styles.submenuIcon}>
                        <Icon size={20} strokeWidth={1} color="currentColor" />
                      </span>
                    )}
                    <span className={styles.submenuLabel}>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  },
);
