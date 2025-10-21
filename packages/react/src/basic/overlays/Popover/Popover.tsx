/**
 * Popover - Accessible popover component
 *
 * A popover component for displaying rich content in an overlay,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - strong borders with subtle shadow
 * - Principle 3: Typography before decoration - clear hierarchy
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Click or hover trigger
 * - Keyboard accessible (Escape to close)
 * - Screen reader accessible with ARIA
 * - Click outside to close
 * - Configurable placement
 * - Optional arrow pointer
 * - Controlled and uncontrolled modes
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <Popover trigger={<button>Click me</button>}>
 *   <div>Popover content here</div>
 * </Popover>
 * ```
 */

import { cloneElement, useEffect, useRef, useState } from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey.js";
import { cn } from "../../../utils/index.js";
import styles from "./Popover.module.css";
import type { PopoverProps } from "./Popover.types.js";

export function Popover({
  trigger,
  children,
  title,
  placement = "bottom",
  isOpen: controlledIsOpen,
  onOpenChange,
  triggerType = "click",
  showArrow = true,
  className,
  triggerClassName,
}: PopoverProps) {
  const isControlled = controlledIsOpen !== undefined;
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const setIsOpen = (open: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(open);
    }
    onOpenChange?.(open);
  };

  useEscapeKey(() => {
    if (isOpen) {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  }, isOpen);

  // Click outside to close
  // biome-ignore lint/correctness/useExhaustiveDependencies: setIsOpen is a stable useState setter and doesn't need to be in dependencies
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleTriggerClick = () => {
    if (triggerType === "click") {
      setIsOpen(!isOpen);
    }
  };

  const handleTriggerMouseEnter = () => {
    if (triggerType === "hover") {
      setIsOpen(true);
    }
  };

  const handleTriggerMouseLeave = () => {
    if (triggerType === "hover") {
      setIsOpen(false);
    }
  };

  const triggerProps = trigger.props as {
    onClick?: (e: React.MouseEvent) => void;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    className?: string;
  };

  const triggerElement = cloneElement(trigger, {
    onClick: (e: React.MouseEvent) => {
      handleTriggerClick();
      triggerProps.onClick?.(e);
    },
    onMouseEnter: (e: React.MouseEvent) => {
      handleTriggerMouseEnter();
      triggerProps.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleTriggerMouseLeave();
      triggerProps.onMouseLeave?.(e);
    },
    "aria-expanded": isOpen,
    "aria-haspopup": "dialog",
    className: cn(triggerProps.className, triggerClassName),
  } as React.HTMLAttributes<HTMLElement>);

  const popoverClassName = cn(
    styles.popover,
    styles[`placement-${placement}`],
    isOpen && styles.open,
    showArrow && styles["with-arrow"],
    className,
  );

  return (
    <div className={styles.container}>
      {triggerElement}

      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="false"
          className={popoverClassName}
          onMouseEnter={
            triggerType === "hover" ? () => setIsOpen(true) : undefined
          }
          onMouseLeave={
            triggerType === "hover" ? () => setIsOpen(false) : undefined
          }
        >
          {title && <div className={styles.title}>{title}</div>}

          <div className={styles.content}>{children}</div>

          {showArrow && <div className={styles.arrow} />}
        </div>
      )}
    </div>
  );
}
