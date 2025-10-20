/**
 * CTACard Types
 * @module @spexop/react/cards
 */

import type { CardVariant } from "../Card/Card.types.js";

/**
 * Action button configuration
 */
export interface CTAAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
}

/**
 * Props for CTACard component
 */
export interface CTACardProps {
  /** Main headline */
  headline: string;
  /** Supporting description */
  description: string;
  /** Primary action button */
  primaryAction: CTAAction;
  /** Optional secondary action button */
  secondaryAction?: CTAAction;
  /** Optional icon or illustration */
  icon?: React.ReactNode;
  /** Card visual variant */
  variant?: CardVariant;
  /** Center align content */
  centered?: boolean;
  /** Additional CSS class names */
  className?: string;
}
