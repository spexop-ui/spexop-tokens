/**
 * FeatureCard Component
 * Specialized card for showcasing product features on landing pages
 *
 * @module @spexop/react/cards
 */

import { forwardRef } from "react";
import { cn } from "../../../utils/cn.js";
import { Card } from "../Card/Card.js";
import styles from "./FeatureCard.module.css";
import type { FeatureCardProps } from "./FeatureCard.types.js";

/**
 * FeatureCard - Displays product features with icon, title, and description
 *
 * Perfect for landing pages, feature comparison grids, and service showcases.
 * Provides a subtle hover lift effect for visual interest.
 *
 * @example
 * ```tsx
 * import { FeatureCard } from '@spexop/react';
 * import { Zap } from '@spexop/icons';
 *
 * <FeatureCard
 *   icon={<Zap />}
 *   title="Lightning Fast"
 *   description="Built for performance with optimized rendering"
 *   variant="highlighted"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Clickable feature card
 * <FeatureCard
 *   icon={<Shield />}
 *   title="Secure by Default"
 *   description="Enterprise-grade security built in"
 *   onClick={() => router.push('/security')}
 * />
 * ```
 */
export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      icon,
      title,
      description,
      variant = "basic",
      iconColor,
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    const isClickable = !!onClick;

    return (
      <Card
        ref={ref}
        variant={variant}
        className={cn(
          styles.featureCard,
          isClickable && styles.clickable,
          className,
        )}
        {...props}
      >
        {icon && (
          <div
            className={styles.iconContainer}
            style={iconColor ? { backgroundColor: iconColor } : undefined}
          >
            {icon}
          </div>
        )}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </Card>
    );
  },
);

FeatureCard.displayName = "FeatureCard";
