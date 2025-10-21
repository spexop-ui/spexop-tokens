/**
 * Combobox - Searchable select with autocomplete
 *
 * Following "The Spexop Way":
 * - Principle 1: Primitives before patterns - Built on native input and button
 * - Principle 2: Borders before shadows - Clean 2px borders
 * - Principle 3: Typography before decoration - Font weight for hierarchy
 * - Principle 4: Tokens before magic numbers - All spacing from design tokens
 * - Principle 5: Composition before complexity - Simple searchable dropdown
 * - Principle 6: Standards before frameworks - Native HTML with ARIA
 * - Principle 7: Accessibility before aesthetics - Full keyboard navigation
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <Combobox
 *   value={selected}
 *   onChange={setSelected}
 *   options={[
 *     { value: 'react', label: 'React' },
 *     { value: 'vue', label: 'Vue' },
 *     { value: 'angular', label: 'Angular' },
 *   ]}
 *   placeholder="Select a framework..."
 * />
 * ```
 */

import { Check, ChevronDown } from "@spexop/icons";
import type React from "react";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./Combobox.module.css";
import type { ComboboxOption, ComboboxProps } from "./Combobox.types.js";

export function Combobox({
  value,
  onChange,
  options,
  label,
  disabled = false,
  placeholder = "Search...",
  required = false,
  error,
  helpText,
  size = "md",
  className,
  id: providedId,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  filterFn,
  maxHeight = "300px",
  leftIcon,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const autoId = useId();
  const inputId = providedId || autoId;
  const dropdownId = `${inputId}-dropdown`;

  // Find selected option
  const selectedOption = options.find((opt) => opt.value === value);

  // Default filter function
  const defaultFilter = (option: ComboboxOption, searchQuery: string) => {
    const normalizedQuery = searchQuery.toLowerCase();
    return (
      option.label.toLowerCase().includes(normalizedQuery) ||
      option.value.toLowerCase().includes(normalizedQuery) ||
      option.description?.toLowerCase().includes(normalizedQuery) ||
      false
    );
  };

  const filter = filterFn || defaultFilter;

  // Filter options based on query
  const filteredOptions = query
    ? options.filter((opt) => !opt.disabled && filter(opt, query))
    : options.filter((opt) => !opt.disabled);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setIsOpen(true);
    setFocusedIndex(0);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
        event.preventDefault();
        if (isOpen && focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          onChange(filteredOptions[focusedIndex].value);
          setQuery("");
          setIsOpen(false);
          setFocusedIndex(-1);
          inputRef.current?.blur();
        }
        break;

      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        setQuery("");
        inputRef.current?.blur();
        break;

      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev,
          );
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        }
        break;

      case "Home":
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex(0);
        }
        break;

      case "End":
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex(filteredOptions.length - 1);
        }
        break;

      case "Tab":
        setIsOpen(false);
        setFocusedIndex(-1);
        setQuery("");
        break;
    }
  };

  // Select option
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setQuery("");
    setIsOpen(false);
    setFocusedIndex(-1);
    inputRef.current?.blur();
  };

  // Handle input focus
  const handleFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && dropdownRef.current) {
      const focusedElement = dropdownRef.current.children[
        focusedIndex
      ] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [focusedIndex, isOpen]);

  // Get display value
  const displayValue = query || selectedOption?.label || "";

  // Determine variant based on error state
  const inputVariant = error ? "error" : "default";

  return (
    <div className={`${styles.combobox} ${className || ""}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      <div
        ref={comboboxRef}
        className={`${styles.comboboxContainer} ${styles[`size-${size}`]} ${
          isOpen ? styles.open : ""
        } ${disabled ? styles.disabled : ""} ${
          inputVariant === "error" ? styles.hasError : ""
        }`}
        data-disabled={disabled || undefined}
      >
        {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}

        <input
          ref={inputRef}
          type="text"
          id={inputId}
          className={`${styles.input} ${leftIcon ? styles.inputWithIcon : ""}`}
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          disabled={disabled}
          placeholder={placeholder}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={dropdownId}
          aria-activedescendant={
            focusedIndex >= 0 ? `${inputId}-option-${focusedIndex}` : undefined
          }
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-invalid={error ? "true" : undefined}
          aria-required={required}
        />

        <ChevronDown
          className={styles.chevron}
          size={16}
          strokeWidth={2}
          color="currentColor"
        />

        {isOpen && filteredOptions.length > 0 && (
          <div
            ref={dropdownRef}
            id={dropdownId}
            className={styles.dropdown}
            role="listbox"
            aria-label="Suggestions"
            style={{ maxHeight }}
            tabIndex={-1}
          >
            {filteredOptions.map((option, index) => {
              const isFocused = index === focusedIndex;
              const isSelected = option.value === value;

              return (
                <div
                  key={option.value}
                  id={`${inputId}-option-${index}`}
                  className={`${styles.option} ${isSelected ? styles.selected : ""} ${
                    isFocused ? styles.focused : ""
                  }`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(option.value);
                    }
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                  tabIndex={-1}
                >
                  <div className={styles.optionContent}>
                    <div className={styles.optionLabel}>{option.label}</div>
                    {option.description && (
                      <div className={styles.optionDescription}>
                        {option.description}
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <Check
                      className={styles.checkmark}
                      size={16}
                      strokeWidth={2}
                      color="currentColor"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {isOpen && filteredOptions.length === 0 && (
          <div
            className={styles.dropdown}
            style={{ maxHeight }}
            role="listbox"
            tabIndex={-1}
          >
            <div className={styles.noResults}>No results found</div>
          </div>
        )}
      </div>

      {error && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}

      {helpText && !error && <div className={styles.helpText}>{helpText}</div>}
    </div>
  );
}
