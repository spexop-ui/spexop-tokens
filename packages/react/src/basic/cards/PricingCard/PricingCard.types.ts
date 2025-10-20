/**
 * PricingCard Types
 * @module @spexop/react/cards
 */

import type { CardVariant } from "../Card/Card.types.js";

/**
 * Props for PricingCard component
 */
export interface PricingCardProps {
  /** Plan name (e.g., "Basic", "Pro", "Enterprise") */
  name: string;
  /** Price amount */
  price: number | string;
  /** Billing period (e.g., "month", "year", "one-time") */
  period?: string;
  /** Currency symbol (default: "$") */
  currency?: string;
  /** Optional badge (e.g., "Popular", "Best Value") */
  badge?: string;
  /** List of features included in this plan */
  features: string[];
  /** CTA button label (default: "Get Started") */
  ctaLabel?: string;
  /** CTA button click handler */
  onCtaClick?: () => void;
  /** Highlight this card as featured plan */
  highlighted?: boolean;
  /** Card visual variant */
  variant?: CardVariant;
  /** Additional CSS class names */
  className?: string;
}
