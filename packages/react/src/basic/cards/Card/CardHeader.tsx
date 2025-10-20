import { cn } from "../../../utils/cn.js";
import styles from "./Card.module.css";
import type { CardHeaderProps } from "./Card.types.js";

/**
 * CardHeader - Title area with optional subtitle and badge
 *
 * @example
 * ```tsx
 * <CardHeader title="Card Title" subtitle="Subtitle text" />
 * ```
 *
 * @example
 * ```tsx
 * <CardHeader title="Featured" badge={<Badge>New</Badge>} />
 * ```
 */
export function CardHeader({
  title,
  subtitle,
  badge,
  noBorder = false,
  children,
  className,
}: CardHeaderProps) {
  // Custom children mode
  if (children && !title) {
    return (
      <div
        className={cn(
          styles.card__header,
          noBorder && styles["card__header--no-border"],
          className,
        )}
      >
        {children}
      </div>
    );
  }

  // Structured mode
  return (
    <div
      className={cn(
        styles.card__header,
        noBorder && styles["card__header--no-border"],
        className,
      )}
    >
      <div className={styles.card__header__content}>
        {title && <h3 className={styles.card__title}>{title}</h3>}
        {subtitle && <p className={styles.card__subtitle}>{subtitle}</p>}
      </div>
      {badge && <div className={styles.card__header__badge}>{badge}</div>}
      {children}
    </div>
  );
}

CardHeader.displayName = "CardHeader";
