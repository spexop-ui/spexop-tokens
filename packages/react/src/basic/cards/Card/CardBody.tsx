import { cn } from "../../../utils/cn.js";
import styles from "./Card.module.css";
import type { CardBodyProps } from "./Card.types.js";

/**
 * CardBody - Main content area with flex: 1 for layout flexibility
 *
 * @example
 * ```tsx
 * <CardBody>
 *   <p>Main content goes here.</p>
 * </CardBody>
 * ```
 */
export function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn(styles.card__body, className)}>{children}</div>;
}

CardBody.displayName = "CardBody";
