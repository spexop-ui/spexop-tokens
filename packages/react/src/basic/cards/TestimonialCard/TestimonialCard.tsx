/**
 * TestimonialCard Component
 * Specialized card for customer testimonials and reviews
 *
 * @module @spexop/react/cards
 */

import { Star } from "@spexop/icons";
import { forwardRef } from "react";
import { cn } from "../../../utils/cn.js";
import { Card } from "../Card/Card.js";
import styles from "./TestimonialCard.module.css";
import type { TestimonialCardProps } from "./TestimonialCard.types.js";

/**
 * TestimonialCard - Displays customer testimonials with ratings
 *
 * Perfect for social proof sections, customer reviews, and case studies.
 * Includes optional star rating and avatar display.
 *
 * @example
 * ```tsx
 * import { TestimonialCard } from '@spexop/react';
 *
 * <TestimonialCard
 *   quote="This product transformed our workflow completely!"
 *   author="Jane Smith"
 *   role="Product Manager"
 *   company="Tech Corp"
 *   avatar="/avatars/jane.jpg"
 *   rating={5}
 * />
 * ```
 */
export const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  (
    {
      quote,
      author,
      role,
      company,
      avatar,
      rating,
      variant = "basic",
      className,
      ...props
    },
    ref,
  ) => {
    // Generate author initials for fallback avatar
    const initials = author
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return (
      <Card
        ref={ref}
        variant={variant}
        density="spacious"
        className={cn(styles.testimonialCard, className)}
        {...props}
      >
        <blockquote className={styles.quote}>{quote}</blockquote>

        {rating && (
          <div className={styles.rating}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={`star-${i}-${rating}`}
                className={cn(styles.star, i >= rating && styles.empty)}
                size={16}
                fill={i < rating ? "currentColor" : "none"}
              />
            ))}
          </div>
        )}

        <div className={styles.author}>
          {avatar ? (
            <img src={avatar} alt={author} className={styles.avatar} />
          ) : (
            <div className={styles.avatarFallback}>{initials}</div>
          )}
          <div className={styles.authorInfo}>
            <p className={styles.authorName}>{author}</p>
            {(role || company) && (
              <p className={styles.authorMeta}>
                {role}
                {role && company && " · "}
                {company}
              </p>
            )}
          </div>
        </div>
      </Card>
    );
  },
);

TestimonialCard.displayName = "TestimonialCard";
