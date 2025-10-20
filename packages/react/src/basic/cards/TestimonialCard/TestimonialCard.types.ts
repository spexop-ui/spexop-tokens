/**
 * TestimonialCard Types
 * @module @spexop/react/cards
 */

import type { CardVariant } from "../Card/Card.types.js";

/**
 * Props for TestimonialCard component
 */
export interface TestimonialCardProps {
  /** Testimonial quote text */
  quote: string;
  /** Author name */
  author: string;
  /** Author role/position */
  role?: string;
  /** Author company/organization */
  company?: string;
  /** Author avatar image URL */
  avatar?: string;
  /** Star rating (1-5) */
  rating?: number;
  /** Card visual variant */
  variant?: CardVariant;
  /** Additional CSS class names */
  className?: string;
}
