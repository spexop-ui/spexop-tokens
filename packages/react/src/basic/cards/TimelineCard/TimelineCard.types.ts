/**
 * TimelineCard Types
 * @module @spexop/react/cards
 */

import type { CardVariant } from "../Card/Card.types.js";

/**
 * Event status type
 */
export type EventStatus = "upcoming" | "ongoing" | "completed";

/**
 * Props for TimelineCard component
 */
export interface TimelineCardProps {
  /** Event title */
  title: string;
  /** Event description */
  description: string;
  /** Event date */
  date: string | Date;
  /** Event time */
  time?: string;
  /** Event location */
  location?: string;
  /** Event status */
  status?: EventStatus;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Card visual variant */
  variant?: CardVariant;
  /** Additional CSS class names */
  className?: string;
}
