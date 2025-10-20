import type { ReactNode } from "react";
import styles from "./Icon.module.css";
import { ICON_MAP } from "./iconMaps.js";

export interface IconProps {
  /**
   * Icon name from @spexop/icons or custom ReactNode
   */
  name?: string;
  /**
   * Custom ReactNode icon (takes precedence over name)
   */
  children?: ReactNode;
  /**
   * Size of the icon
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Icon component that supports @spexop/icons by name or custom icons
 *
 * Features:
 * - Support for @spexop/icons icon names
 * - Custom icon support via children
 * - Multiple sizes using design tokens
 * - Theme-aware styling
 */
export function Icon({ name, children, size = "md", className }: IconProps) {
  const iconClasses = [styles.icon, styles[size], className]
    .filter(Boolean)
    .join(" ");

  // Size mapping for icon components
  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  // If children are provided, render them directly
  if (children) {
    return <span className={iconClasses}>{children}</span>;
  }

  // If name is provided, look it up in the icon map
  if (name && ICON_MAP[name]) {
    const IconComponent = ICON_MAP[name];

    return (
      <span className={iconClasses} role="img" aria-label={`${name} icon`}>
        <IconComponent
          size={sizeMap[size]}
          strokeWidth={1.5}
          color="currentColor"
        />
      </span>
    );
  }

  // Fallback for unknown icon names
  return (
    <span className={iconClasses} title={`Unknown icon: ${name}`}>
      ?
    </span>
  );
}
