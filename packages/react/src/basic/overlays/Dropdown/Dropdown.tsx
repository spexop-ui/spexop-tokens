/**
 * Dropdown - Accessible dropdown menu component
 *
 * A dropdown menu component for displaying a list of actions,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - strong borders with subtle shadow
 * - Principle 3: Typography before decoration - clear hierarchy
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Keyboard accessible (Arrow keys, Enter, Escape)
 * - Screen reader accessible with ARIA
 * - Click outside to close
 * - Configurable placement
 * - Icons support
 * - Disabled items
 * - Danger variant for destructive actions
 * - Dividers between items
 * - Controlled and uncontrolled modes
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: '1', label: 'Edit', onClick: handleEdit },
 *   { id: '2', label: 'Delete', variant: 'danger', onClick: handleDelete },
 * ];
 *
 * <Dropdown items={items} trigger={<button>Actions</button>} />
 * ```
 */

import { cloneElement, useEffect, useRef, useState } from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey.js";
import { cn } from "../../../utils/index.js";
import styles from "./Dropdown.module.css";
import type { DropdownProps } from "./Dropdown.types.js";

export function Dropdown({
  items,
  trigger,
  placement = "bottom-start",
  isOpen: controlledIsOpen,
  onOpenChange,
  className,
  triggerClassName,
  closeOnItemClick = true,
}: DropdownProps) {
  const isControlled = controlledIsOpen !== undefined;
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const triggerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

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
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
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
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: (typeof items)[0]) => {
    if (item.disabled) return;

    item.onClick?.();

    if (closeOnItemClick) {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const enabledItems = items.filter((item) => !item.disabled);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev < enabledItems.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev > 0 ? prev - 1 : enabledItems.length - 1,
        );
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (focusedIndex >= 0) {
          handleItemClick(enabledItems[focusedIndex]);
        }
        break;
      case "Home":
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        event.preventDefault();
        setFocusedIndex(enabledItems.length - 1);
        break;
    }
  };

  const triggerProps = trigger.props as {
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
  };

  const triggerElement = cloneElement(trigger, {
    onClick: handleTriggerClick,
    "aria-expanded": isOpen,
    "aria-haspopup": "menu",
    className: cn(triggerProps.className, triggerClassName),
  } as React.HTMLAttributes<HTMLElement>);

  const dropdownClassName = cn(
    styles.dropdown,
    styles[`placement-${placement}`],
    isOpen && styles.open,
    className,
  );

  return (
    <div className={styles.container}>
      {triggerElement}

      {isOpen && (
        <div
          ref={dropdownRef}
          role="menu"
          className={dropdownClassName}
          onKeyDown={handleKeyDown}
        >
          {items.map((item, index) => {
            const enabledItems = items.filter((i) => !i.disabled);
            const enabledIndex = enabledItems.indexOf(item);
            const isFocused = enabledIndex === focusedIndex;

            const itemClassName = cn(
              styles.item,
              item.disabled && styles.disabled,
              item.variant === "danger" && styles.danger,
              isFocused && styles.focused,
            );

            return (
              <div key={item.id}>
                <button
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  className={itemClassName}
                  onClick={() => handleItemClick(item)}
                  tabIndex={isFocused ? 0 : -1}
                >
                  {item.icon && (
                    <span className={styles.icon}>{item.icon}</span>
                  )}
                  <span className={styles.label}>{item.label}</span>
                </button>
                {item.divider && (
                  // biome-ignore lint/a11y/useFocusableInteractive: Separators are non-interactive visual dividers per WAI-ARIA
                  <div className={styles.divider} role="separator" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
