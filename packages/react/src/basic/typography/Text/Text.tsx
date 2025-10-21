/**
 * Text Component
 * Paragraph and body text with typography control
 *
 * Follows "The Spexop Way":
 * - Principle 3: Typography before decoration
 * - Principle 4: Tokens before magic numbers
 * - Principle 7: Accessibility before aesthetics
 *
 * @component Text
 * @packageName @spexop/react
 * @description Paragraph and body text component
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-21
 *
 * @example
 * ```tsx
 * <Text size="lg" weight="regular" align="center">
 *   Body text content
 * </Text>
 * ```
 */

import { cn } from "../../../utils/index.js";
import styles from "./Text.module.css";
import type { TextProps } from "./Text.types.js";

export function Text({
  children,
  size = "base",
  weight = "regular",
  align = "left",
  variant = "default",
  as: Component = "p",
  noMargin = false,
  truncate = false,
  clamp,
  className,
  id,
  "aria-label": ariaLabel,
  "aria-live": ariaLive,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextProps) {
  const textClassName = cn(
    styles.text,
    styles[`size-${size}`],
    styles[`weight-${weight}`],
    styles[`align-${align}`],
    styles[`variant-${variant}`],
    truncate && styles.truncate,
    clamp != null && styles[`clamp-${clamp}`],
    noMargin && styles["no-margin"],
    className,
  );

  return (
    <Component
      id={id}
      className={textClassName}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      aria-describedby={ariaDescribedBy}
      {...props}
    >
      {children}
    </Component>
  );
}
