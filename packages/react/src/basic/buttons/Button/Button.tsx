/**
 * Button Component
 * Primitives-first button with comprehensive variants and accessibility
 *
 * @component Button
 * @packageName @spexop/react
 * @description Primitives-first button system with comprehensive variants
 * @author @spexop-ui | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types.js";

/**
 * Button component
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click Me</Button>
 * <Button variant="secondary" compact="sm" iconOnly aria-label="Add">
 *   <Plus size={16} />
 * </Button>
 * ```
 */

export function Button({
  as: Component = "button",
  variant = "primary",
  textColor = "auto",
  borderWeight = "normal",
  borderStyle = "solid",
  size = "md",
  compact = false,
  iconOnly = false,
  disabled = false,
  fullWidth = false,
  loading = false,
  type = "button",
  onClick,
  children,
  className = "",
  "aria-label": ariaLabel,
  "aria-pressed": ariaPressed,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
  "aria-describedby": ariaDescribedby,
  "aria-haspopup": ariaHaspopup,
  ...rest
}: ButtonProps) {
  // Validation: iconOnly requires aria-label
  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "Button: iconOnly={true} requires an aria-label for accessibility.",
    );
  }

  // Compose className
  const buttonClassName = [
    styles.button,
    styles[variant],
    textColor !== "auto" &&
      styles[
        `textColor${textColor.charAt(0).toUpperCase()}${textColor.slice(1)}`
      ],
    borderWeight !== "normal" &&
      styles[
        `borderWeight${borderWeight.charAt(0).toUpperCase()}${borderWeight.slice(1)}`
      ],
    borderStyle !== "solid" &&
      styles[
        `borderStyle${borderStyle.charAt(0).toUpperCase()}${borderStyle.slice(1)}`
      ],
    styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
    compact &&
      styles[`compact${compact.charAt(0).toUpperCase()}${compact.slice(1)}`],
    iconOnly && styles.iconOnly,
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      type={Component === "button" ? type : undefined}
      className={buttonClassName}
      disabled={Component === "button" ? disabled || loading : undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-describedby={ariaDescribedby}
      aria-haspopup={ariaHaspopup}
      {...rest}
    >
      {children}
    </Component>
  );
}
