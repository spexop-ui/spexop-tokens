import type { ReactNode } from "react";

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
