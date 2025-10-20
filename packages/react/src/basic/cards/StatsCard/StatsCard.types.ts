/**
 * StatsCard Types
 * @module @spexop/react/cards
 */

import type { CardVariant } from "../Card/Card.types.js";

/**
 * Trend direction for statistics
 */
export type TrendDirection = "up" | "down" | "neutral";

/**
 * Value format type
 */
export type ValueFormat = "number" | "percentage" | "currency";

/**
 * Trend data
 */
export interface Trend {
  /** Trend value (e.g., 12.5 for +12.5%) */
  value: number;
  /** Trend direction */
  direction: TrendDirection;
}

/**
 * Props for StatsCard component
 */
export interface StatsCardProps {
  /** Metric label */
  label: string;
  /** Metric value */
  value: string | number;
  /** Optional trend indicator */
  trend?: Trend;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Card visual variant */
  variant?: CardVariant;
  /** Value format (affects display) */
  format?: ValueFormat;
  /** Additional CSS class names */
  className?: string;
}
