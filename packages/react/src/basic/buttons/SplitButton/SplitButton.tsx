/**
 * SplitButton Component
 * Button with primary action + dropdown menu
 *
 * @component SplitButton
 * @packageName @spexop/react
 * @description Split button with main action and dropdown options
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SplitButton.module.css";
import type { SplitButtonProps } from "./SplitButton.types.js";

/**
 * SplitButton component
 *
 * @example
 * ```tsx
 * <SplitButton
 *   label="Save Document"
 *   onClick={handleSave}
 *   options={[
 *     { label: 'Save as Draft', value: 'draft', onClick: handleDraft },
 *     { label: 'Save as Template', value: 'template', onClick: handleTemplate }
 *   ]}
 * />
 * ```
 */
export function SplitButton({
  label,
  onClick,
  options,
  variant = "primary",
  disabled = false,
  className = "",
  icon,
  "aria-label": ariaLabel,
  "aria-label-toggle": ariaLabelToggle = "Show more options",
}: SplitButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Handle main button click
  const handleMainClick = useCallback(() => {
    if (!disabled) {
      requestAnimationFrame(() => {
        onClick();
      });
    }
  }, [onClick, disabled]);

  // Handle dropdown toggle
  const handleToggle = useCallback(() => {
    if (!disabled) {
      requestAnimationFrame(() => {
        setIsOpen((prev) => !prev);
      });
    }
  }, [disabled]);

  // Handle option click
  const handleOptionClick = useCallback((option: (typeof options)[number]) => {
    if (!option.disabled) {
      requestAnimationFrame(() => {
        option.onClick();
        setIsOpen(false);
      });
    }
  }, []);

  // Close menu on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        requestAnimationFrame(() => {
          setIsOpen(false);
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestAnimationFrame(() => {
          setIsOpen(false);
          toggleButtonRef.current?.focus();
        });
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Handle keyboard navigation in menu (Arrow Up/Down)
  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) return;

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const menuItems = menuRef.current?.querySelectorAll(
          'button[role="menuitem"]:not(:disabled)',
        );
        if (!menuItems || menuItems.length === 0) return;

        // Use findIndex to properly handle Element | null type from document.activeElement
        // biome-ignore lint: required for type safety
        const currentIndex = Array.from(menuItems).findIndex(
          (item) => item === document.activeElement,
        );

        let nextIndex: number;
        if (event.key === "ArrowDown") {
          nextIndex =
            currentIndex === -1 ? 0 : (currentIndex + 1) % menuItems.length;
        } else {
          nextIndex =
            currentIndex === -1
              ? menuItems.length - 1
              : currentIndex === 0
                ? menuItems.length - 1
                : currentIndex - 1;
        }

        (menuItems[nextIndex] as HTMLElement).focus();
      }
    },
    [isOpen],
  );

  // Compose classNames
  const containerClassName = [
    styles.splitButton,
    styles[`variant-${variant}`],
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const mainButtonClassName = [
    styles.mainButton,
    disabled ? styles.buttonDisabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  const toggleButtonClassName = [
    styles.toggleButton,
    disabled ? styles.buttonDisabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  const menuClassName = [styles.menu, isOpen ? styles.menuOpen : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className={containerClassName}>
      {/* Main Action Button */}
      <button
        type="button"
        className={mainButtonClassName}
        onClick={handleMainClick}
        disabled={disabled}
        aria-label={ariaLabel || label}
      >
        {icon && <span className={styles.buttonIcon}>{icon}</span>}
        <span className={styles.buttonLabel}>{label}</span>
      </button>

      {/* Dropdown Toggle Button */}
      <button
        ref={toggleButtonRef}
        type="button"
        className={toggleButtonClassName}
        onClick={handleToggle}
        disabled={disabled}
        aria-label={ariaLabelToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg
          className={styles.toggleIcon}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className={menuClassName}
          role="menu"
          onKeyDown={handleMenuKeyDown}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitem"
              className={`${styles.menuItem} ${
                option.disabled ? styles.menuItemDisabled : ""
              }`}
              onClick={() => handleOptionClick(option)}
              disabled={option.disabled}
              aria-label={option["aria-label"] || option.label}
            >
              {option.icon && (
                <span className={styles.menuItemIcon}>{option.icon}</span>
              )}
              <span className={styles.menuItemLabel}>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
