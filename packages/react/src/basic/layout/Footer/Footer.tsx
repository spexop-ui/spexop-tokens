/**
 * Footer Component
 * Versatile footer component for page layouts
 *
 * Use for:
 * - Site-wide footers with links and copyright
 * - Section footers within page layouts
 * - Layout composition with Grid/Stack primitives
 *
 * @component Footer
 * @packageName @spexop/react
 * @description Primitives-first footer component
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-14
 *
 * @example
 * ```tsx
 * <Footer padding={6}>
 *   <p>© 2025 Company Name</p>
 * </Footer>
 * ```
 *
 * @example
 * ```tsx
 * <Footer variant="minimal" padding={4}>
 *   <Container maxWidth="xl">
 *     <p>© 2025 Company Name. All rights reserved.</p>
 *   </Container>
 * </Footer>
 * ```
 */

import { useDebug, useResponsiveValue } from "../../../hooks/index.js";
import { cn } from "../../../utils/index.js";
import {
  validateNoConflict,
  validateResponsiveKeys,
  validateSpacing,
} from "../../../utils/validation.js";
import styles from "./Footer.module.css";
import type { FooterProps } from "./Footer.types.js";

export function Footer({
  as: Component = "footer",
  variant = "default",
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  withBorder = false,
  withBackground = true,
  children,
  className,
  style,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...rest
}: FooterProps) {
  // Debug mode
  const { enabled: debugEnabled, showBoundaries } = useDebug();

  // Validate props (development only)
  if (process.env.NODE_ENV === "development") {
    // Validate spacing values
    validateSpacing("Footer", "padding", padding);
    validateSpacing("Footer", "paddingTop", paddingTop);
    validateSpacing("Footer", "paddingBottom", paddingBottom);
    validateSpacing("Footer", "paddingLeft", paddingLeft);
    validateSpacing("Footer", "paddingRight", paddingRight);

    // Check for responsive objects
    if (typeof padding === "object" && padding !== null) {
      validateResponsiveKeys(
        "Footer",
        "padding",
        padding as Record<string, unknown>,
      );
    }
    if (typeof paddingTop === "object" && paddingTop !== null) {
      validateResponsiveKeys(
        "Footer",
        "paddingTop",
        paddingTop as Record<string, unknown>,
      );
    }
    if (typeof paddingBottom === "object" && paddingBottom !== null) {
      validateResponsiveKeys(
        "Footer",
        "paddingBottom",
        paddingBottom as Record<string, unknown>,
      );
    }
    if (typeof paddingLeft === "object" && paddingLeft !== null) {
      validateResponsiveKeys(
        "Footer",
        "paddingLeft",
        paddingLeft as Record<string, unknown>,
      );
    }
    if (typeof paddingRight === "object" && paddingRight !== null) {
      validateResponsiveKeys(
        "Footer",
        "paddingRight",
        paddingRight as Record<string, unknown>,
      );
    }

    // Check for conflicting props
    validateNoConflict(
      "Footer",
      variant === "minimal" && withBorder,
      'variant="minimal" is intended for no borders, but withBorder=true was provided. Consider using variant="bordered" instead.',
    );

    validateNoConflict(
      "Footer",
      variant === "minimal" && withBackground,
      'variant="minimal" is intended for transparent backgrounds, but withBackground=true was provided. Consider using variant="default" instead.',
    );
  }

  // Resolve responsive values
  const currentPadding = useResponsiveValue(padding);
  const currentPaddingTop = useResponsiveValue(paddingTop);
  const currentPaddingBottom = useResponsiveValue(paddingBottom);
  const currentPaddingLeft = useResponsiveValue(paddingLeft);
  const currentPaddingRight = useResponsiveValue(paddingRight);

  return (
    <Component
      className={cn(
        styles.footer,
        styles[`footer--${variant}`],
        // Padding classes
        currentPadding !== undefined && styles[`padding${currentPadding}`],
        currentPaddingTop !== undefined &&
          styles[`paddingTop${currentPaddingTop}`],
        currentPaddingBottom !== undefined &&
          styles[`paddingBottom${currentPaddingBottom}`],
        currentPaddingLeft !== undefined &&
          styles[`paddingLeft${currentPaddingLeft}`],
        currentPaddingRight !== undefined &&
          styles[`paddingRight${currentPaddingRight}`],
        // Visual modifiers
        withBorder && styles.withBorder,
        !withBackground && styles.noBackground,
        // Debug mode
        debugEnabled && showBoundaries && styles.debugBoundaries,
        className,
      )}
      style={style}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      data-debug={debugEnabled ? "true" : undefined}
      data-component="Footer"
      data-variant={debugEnabled ? variant : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}

Footer.displayName = "Footer";
