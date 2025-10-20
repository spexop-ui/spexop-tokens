/**
 * StatsCard Component
 * Specialized card for displaying metrics and KPIs
 *
 * @module @spexop/react/cards
 */

import { Minus, TrendingDown, TrendingUp } from "@spexop/icons";
import { forwardRef } from "react";
import { cn } from "../../../utils/cn.js";
import { Card } from "../Card/Card.js";
import styles from "./StatsCard.module.css";
import type { StatsCardProps } from "./StatsCard.types.js";

/**
 * StatsCard - Displays key metrics and statistics
 *
 * Perfect for dashboards, analytics displays, and KPI showcases.
 * Supports trend indicators with directional arrows and color coding.
 *
 * @example
 * ```tsx
 * import { StatsCard } from '@spexop/react';
 * import { Users } from '@spexop/icons';
 *
 * <StatsCard
 *   label="Active Users"
 *   value="12,543"
 *   trend={{ value: 12.5, direction: 'up' }}
 *   icon={<Users />}
 * />
 * ```
 */
export const StatsCard = forwardRef<HTMLDivElement, StatsCardProps>(
  (
    {
      label,
      value,
      trend,
      icon,
      variant = "basic",
      format = "number",
      className,
      ...props
    },
    ref,
  ) => {
    // Format value based on format prop
    const formatValue = (val: string | number): string => {
      if (typeof val === "string") return val;

      switch (format) {
        case "currency":
          return `$${val.toLocaleString()}`;
        case "percentage":
          return `${val}%`;
        default:
          return val.toLocaleString();
      }
    };

    // Get trend icon based on direction
    const getTrendIcon = () => {
      if (!trend) return null;

      switch (trend.direction) {
        case "up":
          return <TrendingUp className={styles.trendIcon} />;
        case "down":
          return <TrendingDown className={styles.trendIcon} />;
        case "neutral":
          return <Minus className={styles.trendIcon} />;
      }
    };

    return (
      <Card
        ref={ref}
        variant={variant}
        density="normal"
        className={cn(styles.statsCard, className)}
        {...props}
      >
        <div className={styles.header}>
          {icon && <div className={styles.iconContainer}>{icon}</div>}
        </div>

        <div className={styles.valueContainer}>
          <p className={styles.value}>{formatValue(value)}</p>
        </div>

        <p className={styles.label}>{label}</p>

        {trend && (
          <div className={cn(styles.trend, styles[trend.direction])}>
            {getTrendIcon()}
            <span>
              {trend.direction === "down" ? "" : "+"}
              {trend.value}%
            </span>
          </div>
        )}
      </Card>
    );
  },
);

StatsCard.displayName = "StatsCard";
