/**
 * DatePicker - Calendar-based date selection component
 *
 * Following "The Spexop Way":
 * - Principle 1: Primitives before patterns - Built on native input with calendar overlay
 * - Principle 2: Borders before shadows - Clean 2px borders
 * - Principle 3: Typography before decoration - Font weight for hierarchy
 * - Principle 4: Tokens before magic numbers - All spacing from design tokens
 * - Principle 5: Composition before complexity - Simple date input with calendar
 * - Principle 6: Standards before frameworks - Native date handling
 * - Principle 7: Accessibility before aesthetics - Full keyboard navigation
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   label="Select date"
 *   placeholder="MM/DD/YYYY"
 * />
 * ```
 */

import { ChevronLeft, ChevronRight, FileText } from "@spexop/icons";
import type React from "react";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./DatePicker.module.css";
import type { DatePickerProps } from "./DatePicker.types.js";

export function DatePicker({
  value,
  onChange,
  label,
  disabled = false,
  placeholder = "Select date...",
  required = false,
  error,
  helpText,
  size = "md",
  min,
  max,
  className,
  id: providedId,
  format = "MM/DD/YYYY",
  leftIcon,
  showWeekNumbers = false,
  firstDayOfWeek = 0,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const inputId = providedId || autoId;

  // Parse date string to Date object
  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  // Format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    if (format === "DD/MM/YYYY") {
      return `${day}/${month}/${year}`;
    }
    if (format === "YYYY-MM-DD") {
      return `${year}-${month}-${day}`;
    }
    return `${month}/${day}/${year}`;
  };

  const selectedDate = parseDate(value);
  const displayValue = formatDate(selectedDate);

  // Get calendar days for current month
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Adjust for first day of week preference
    const adjustedStartDay = (startingDayOfWeek - firstDayOfWeek + 7) % 7;

    const days: (Date | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < adjustedStartDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const calendarDays = getCalendarDays();

  // Close calendar when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle date selection
  const handleSelectDate = (date: Date) => {
    const isoString = date.toISOString();
    onChange(isoString);
    setIsOpen(false);
  };

  // Navigate months
  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      setIsOpen(false);
    } else if (event.key === "Enter" && !isOpen) {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  // Check if date is in valid range
  const isDateInRange = (date: Date): boolean => {
    const minDate = min ? parseDate(min) : null;
    const maxDate = max ? parseDate(max) : null;

    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;

    return true;
  };

  // Check if date is selected
  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Get weekday names
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const adjustedWeekdays = [
    ...weekdays.slice(firstDayOfWeek),
    ...weekdays.slice(0, firstDayOfWeek),
  ];

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const inputVariant = error ? "error" : "default";

  return (
    <div className={`${styles.datePicker} ${className || ""}`}>
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
        ref={datePickerRef}
        className={`${styles.datePickerContainer} ${styles[`size-${size}`]} ${
          isOpen ? styles.open : ""
        } ${disabled ? styles.disabled : ""} ${
          inputVariant === "error" ? styles.hasError : ""
        }`}
      >
        {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}

        <input
          ref={inputRef}
          type="text"
          id={inputId}
          className={`${styles.input} ${leftIcon ? styles.inputWithIcon : ""}`}
          value={displayValue}
          onChange={() => {}}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          readOnly
          aria-label={label}
          aria-required={required}
          aria-invalid={error ? "true" : undefined}
        />

        <FileText
          className={styles.calendarIcon}
          size={16}
          strokeWidth={2}
          color="currentColor"
        />

        {isOpen && (
          <div className={styles.calendar}>
            <div className={styles.calendarHeader}>
              <button
                type="button"
                className={styles.navButton}
                onClick={handlePreviousMonth}
                aria-label="Previous month"
              >
                <ChevronLeft size={16} strokeWidth={2} color="currentColor" />
              </button>

              <div className={styles.monthYear}>
                {monthNames[currentMonth.getMonth()]}{" "}
                {currentMonth.getFullYear()}
              </div>

              <button
                type="button"
                className={styles.navButton}
                onClick={handleNextMonth}
                aria-label="Next month"
              >
                <ChevronRight size={16} strokeWidth={2} color="currentColor" />
              </button>
            </div>

            <div className={styles.calendarGrid}>
              {adjustedWeekdays.map((day) => (
                <div key={day} className={styles.weekday}>
                  {day}
                </div>
              ))}

              {calendarDays.map((date, index) => {
                const dateKey = date
                  ? `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                  : `empty-${index}`;

                if (!date) {
                  return <div key={dateKey} className={styles.emptyDay} />;
                }

                const inRange = isDateInRange(date);
                const selected = isDateSelected(date);
                const today = isToday(date);

                return (
                  <button
                    key={dateKey}
                    type="button"
                    className={`${styles.day} ${selected ? styles.selected : ""} ${
                      today ? styles.today : ""
                    } ${!inRange ? styles.disabled : ""}`}
                    onClick={() => inRange && handleSelectDate(date)}
                    disabled={!inRange}
                    aria-label={formatDate(date)}
                    aria-selected={selected}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
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
