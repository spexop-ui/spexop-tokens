/**
 * BlogCard Types
 * @module @spexop/react/cards
 */

import type { CardVariant } from "../Card/Card.types.js";

/**
 * Props for BlogCard component
 * Omits onClick since navigation is handled via href
 */
export interface BlogCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick" | "children"> {
  /** Blog post title */
  title: string;
  /** Post excerpt/summary */
  excerpt: string;
  /** Cover image URL */
  coverImage?: string;
  /** Author name */
  author?: string;
  /** Publication date */
  date: string | Date;
  /** Estimated read time */
  readTime?: string;
  /** Post tags/categories */
  tags?: string[];
  /** Link to full post */
  href: string;
  /** Card visual variant */
  variant?: CardVariant;
  /** Additional CSS class names */
  className?: string;
}
