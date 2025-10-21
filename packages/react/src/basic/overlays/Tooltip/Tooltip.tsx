/**
 * Tooltip - Accessible tooltip component
 *
 * A tooltip component that provides contextual information on hover or focus,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - subtle border with minimal shadow
 * - Principle 3: Typography before decoration - clear, readable text
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Keyboard accessible (shows on focus)
 * - Screen reader accessible with aria-describedby
 * - Configurable placement (top, right, bottom, left)
 * - Delay before showing
 * - Optional arrow pointer
 * - Touch device support
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <Tooltip content="This is helpful information">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 */

import { cloneElement, useEffect, useRef, useState } from "react";
import { cn } from "../../../utils/index.js";
import styles from "./Tooltip.module.css";
import type { TooltipProps } from "./Tooltip.types.js";

export function Tooltip({
  children,
  content,
  placement = "top",
  delay = 300,
  disabled = false,
  className,
  triggerClassName,
  id,
  showArrow = true,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipId] = useState(
    () => id || `tooltip-${Math.random().toString(36).substr(2, 9)}`,
  );
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showTooltip = () => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      hideTooltip();
    }
  };

  // Clone the child element to add event handlers and aria attributes
  const childProps = children.props as {
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    className?: string;
  };

  const trigger = cloneElement(children, {
    onMouseEnter: (e: React.MouseEvent) => {
      showTooltip();
      childProps.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hideTooltip();
      childProps.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      showTooltip();
      childProps.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hideTooltip();
      childProps.onBlur?.(e);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      handleKeyDown(e);
      childProps.onKeyDown?.(e);
    },
    "aria-describedby": isVisible ? tooltipId : undefined,
    className: cn(childProps.className, triggerClassName),
  } as React.HTMLAttributes<HTMLElement>);

  const tooltipClassName = cn(
    styles.tooltip,
    styles[`placement-${placement}`],
    isVisible && styles.visible,
    showArrow && styles["with-arrow"],
    className,
  );

  return (
    <>
      {trigger}
      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={tooltipClassName}
          aria-hidden={!isVisible}
        >
          {content}
          {showArrow && <div className={styles.arrow} />}
        </div>
      )}
    </>
  );
}
