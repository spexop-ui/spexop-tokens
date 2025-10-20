/**
 * ServiceCard - Specialized card for service/feature showcases
 *
 * Features:
 * - Numbered badge with hover animation
 * - Left accent bar on hover
 * - Meta tag with relationship indicators
 * - Featured variant for emphasis
 * - Full color palette integration
 *
 * @example
 * ```tsx
 * <ServiceCard
 *   number="01"
 *   title="Primitives First"
 *   description="Master five grid primitives before building complex layouts."
 *   meta="Foundation → Features"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ServiceCard
 *   variant="featured"
 *   number="05"
 *   title="Composition Before Complexity"
 *   description="Build complex interfaces by composing simple, well-tested primitives."
 *   meta="Simplicity → Power"
 * />
 * ```
 *
 * @packageName @spexop/react
 * @component ServiceCard
 * @version 1.0.0
 * @since 2025-10-14
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 */

import { useId } from "react";
import { Card } from "../Card/Card.js";
import styles from "./ServiceCard.module.css";
import type { ServiceCardProps } from "./ServiceCard.types.js";

export function ServiceCard({
  variant = "default",
  number,
  title,
  description,
  meta,
  density = "spacious",
  onClick,
  className,
  id,
  children,
}: ServiceCardProps) {
  const titleId = useId();
  const descId = useId();

  // Combine custom className with ServiceCard styles
  const cardClassName = [
    styles.serviceCard,
    variant === "featured" ? styles.featured : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Card
      id={id}
      variant={onClick ? "interactive" : "basic"}
      density={density}
      className={cardClassName}
      onClick={onClick}
      clickable={!!onClick}
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      {number && <div className={styles.number}>{number}</div>}

      <h3 id={titleId} className={styles.title}>
        {title}
      </h3>

      <p id={descId} className={styles.description}>
        {description}
      </p>

      {meta && <div className={styles.meta}>{meta}</div>}

      {children}
    </Card>
  );
}
