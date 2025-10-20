/**
 * ServiceCard Component Types
 * Specialized card for service/feature showcases
 *
 * @packageName @spexop/react
 * @version 1.0.0
 * @since 2025-10-14
 */

import type { ReactNode } from "react";

/**
 * ServiceCard - Specialized card for service/feature showcases
 *
 * Features:
 * - Numbered badge with hover animation
 * - Left accent bar on hover
 * - Meta tag with relationship indicators
 * - Featured variant for emphasis
 * - Full color palette integration
 */
export interface ServiceCardProps {
  /**
   * Card variant
   * - "default": Standard service card with interactive hover
   * - "featured": Full-width emphasis with gradient background and 3px border
   */
  variant?: "default" | "featured";

  /**
   * Sequential number badge (e.g., "01", "02", "03")
   * Displays in top-left with hover animation
   */
  number?: string;

  /**
   * Service title (rendered as h3)
   * Required for proper accessibility
   */
  title: string;

  /**
   * Service description (rendered as p)
   * Should be concise (2-3 sentences max)
   */
  description: string;

  /**
   * Meta tag text showing relationships or outcomes
   * Example: "Foundation → Features", "Structure → Clarity"
   */
  meta?: string;

  /**
   * Density/spacing
   * - "compact": 16px padding (dashboard context)
   * - "normal": 24px padding (default)
   * - "spacious": 32px padding (content/blog context)
   */
  density?: "compact" | "normal" | "spacious";

  /**
   * Click handler - makes entire card interactive
   * When provided, card becomes a button element
   */
  onClick?: () => void;

  /**
   * Custom className for additional styling
   */
  className?: string;

  /**
   * HTML id attribute for anchor links
   * Used for navigation and deep linking
   */
  id?: string;

  /**
   * Additional content (rendered after meta tag)
   * Use for custom elements or buttons
   */
  children?: ReactNode;
}
