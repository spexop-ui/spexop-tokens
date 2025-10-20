import type React from "react";
import styles from "./Badge.module.css";

/**
 * Badge density variants for different contexts
 */
export type BadgeDensity = "compact" | "normal" | "spacious";

export interface BadgeProps {
  /**
   * The content to display inside the badge
   */
  children: React.ReactNode;
  /**
   * The visual variant of the badge
   * @default "default"
   */
  variant?: "default" | "success" | "warning" | "error" | "info" | "subtle";
  /**
   * The size of the badge
   * @default "sm"
   */
  size?: "xs" | "sm" | "md";
  /**
   * Density variant for different contexts
   * @default "normal"
   */
  density?: BadgeDensity;
  /**
   * Whether the badge should have a pill shape
   * @default true
   */
  pill?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Badge component for displaying small pieces of information like status, counts, or labels.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="md">Error</Badge>
 * <Badge pill={false}>Version 1.0</Badge>
 * ```
 */
export function Badge({
  children,
  variant = "default",
  size = "sm",
  density = "normal",
  pill = true,
  className = "",
  style,
  ...props
}: BadgeProps) {
  const badgeClasses = [
    styles.badge,
    styles[`badge--${variant}`],
    styles[`badge--${size}`],
    styles[`density--${density}`],
    pill ? styles.badgePill : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={badgeClasses} style={style} {...props}>
      {children}
    </span>
  );
}

export default Badge;
