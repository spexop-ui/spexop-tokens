/**
 * ProfileCard Types
 * @module @spexop/react/cards
 */

import type { CardVariant } from "../Card/Card.types.js";

/**
 * Social media link
 */
export interface SocialLink {
  /** Platform name (e.g., "twitter", "linkedin", "github") */
  platform: string;
  /** Profile URL */
  url: string;
}

/**
 * Props for ProfileCard component
 */
export interface ProfileCardProps {
  /** Person's name */
  name: string;
  /** Job title or role */
  role: string;
  /** Short bio or description */
  bio?: string;
  /** Avatar image URL */
  avatar: string;
  /** Social media links */
  socialLinks?: SocialLink[];
  /** Card visual variant */
  variant?: CardVariant;
  /** Contact button click handler */
  onContactClick?: () => void;
  /** Additional CSS class names */
  className?: string;
}
