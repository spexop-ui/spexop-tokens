import { cn } from "../../../utils/cn.js";
import styles from "./Card.module.css";
import type { CardFooterProps } from "./Card.types.js";

/**
 * CardFooter - Actions area with alignment options
 *
 * @example
 * ```tsx
 * <CardFooter align="right">
 *   <Button variant="ghost">Cancel</Button>
 *   <Button variant="primary">Submit</Button>
 * </CardFooter>
 * ```
 */
export function CardFooter({
  children,
  align = "right",
  noBorder = false,
  className,
}: CardFooterProps) {
  return (
    <div
      className={cn(
        styles.card__footer,
        styles[`card__footer--${align}`],
        noBorder && styles["card__footer--no-border"],
        className,
      )}
    >
      {children}
    </div>
  );
}

CardFooter.displayName = "CardFooter";
