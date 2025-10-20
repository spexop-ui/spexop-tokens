/**
 * CTACard Component
 * Specialized card for call-to-action sections
 *
 * @module @spexop/react/cards
 */

import { forwardRef } from "react";
import { cn } from "../../../utils/cn.js";
import { Button } from "../../buttons/Button/Button.js";
import { Card } from "../Card/Card.js";
import styles from "./CTACard.module.css";
import type { CTACardProps } from "./CTACard.types.js";

/**
 * CTACard - Prominent call-to-action card
 *
 * Perfect for landing pages, conversion sections, and important prompts.
 * Supports primary and secondary actions with optional icon.
 *
 * @example
 * ```tsx
 * import { CTACard } from '@spexop/react';
 * import { Rocket } from '@spexop/icons';
 *
 * <CTACard
 *   headline="Ready to get started?"
 *   description="Join thousands of users building better products"
 *   icon={<Rocket />}
 *   primaryAction={{
 *     label: "Start Free Trial",
 *     onClick: () => router.push('/signup')
 *   }}
 *   secondaryAction={{
 *     label: "Learn More",
 *     onClick: () => router.push('/features')
 *   }}
 *   centered
 * />
 * ```
 */
export const CTACard = forwardRef<HTMLDivElement, CTACardProps>(
  (
    {
      headline,
      description,
      primaryAction,
      secondaryAction,
      icon,
      variant = "highlighted",
      centered = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Card
        ref={ref}
        variant={variant}
        density="spacious"
        className={cn(styles.ctaCard, centered && styles.centered, className)}
        {...props}
      >
        {icon && (
          <div
            className={cn(styles.iconContainer, !centered && styles.leftAlign)}
          >
            {icon}
          </div>
        )}

        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.description}>{description}</p>

        <div className={cn(styles.actions, centered && styles.centered)}>
          <Button variant="primary" onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
          {secondaryAction && (
            <Button variant="ghost" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </Card>
    );
  },
);

CTACard.displayName = "CTACard";
