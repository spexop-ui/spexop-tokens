/**
 * FeatureCard Types
 * @module @spexop/react/cards
 */

import type { CardVariant } from "../Card/Card.types.js";

/**
 * Props for FeatureCard component
 */
export interface FeatureCardProps {
  /** Icon or illustration to display at the top */
  icon?: React.ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Card visual variant */
  variant?: CardVariant;
  /** Custom color for icon container */
  iconColor?: string;
  /** Click handler for interactive cards */
  onClick?: () => void;
  /** Additional CSS class names */
  className?: string;
}
