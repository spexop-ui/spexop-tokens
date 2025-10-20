/**
 * ProductCard Types
 * @module @spexop/react/cards
 */

import type { CardVariant } from "../Card/Card.types.js";

/**
 * Props for ProductCard component
 */
export interface ProductCardProps {
  /** Product name */
  name: string;
  /** Product price */
  price: number;
  /** Product image URL */
  image: string;
  /** Star rating (0-5) */
  rating?: number;
  /** Number of reviews */
  reviews?: number;
  /** Badge text (e.g., "Sale", "New", "20% Off") */
  badge?: string;
  /** Add to cart handler */
  onAddToCart?: () => void;
  /** View details handler */
  onViewDetails?: () => void;
  /** Whether product is in stock */
  inStock?: boolean;
  /** Currency symbol (default: "$") */
  currency?: string;
  /** Card visual variant */
  variant?: CardVariant;
  /** Additional CSS class names */
  className?: string;
}
