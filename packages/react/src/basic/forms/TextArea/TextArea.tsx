import { useEffect, useId, useRef } from "react";
import styles from "./TextArea.module.css";
import type { TextAreaProps } from "./TextArea.types.js";

export function TextArea({
  label,
  id: providedId,
  name,
  value,
  defaultValue,
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  size = "md",
  variant = "default",
  error,
  helpText,
  rows = 4,
  minRows = 2,
  maxRows = 10,
  autoResize = false,
  className,
  onChange,
  onBlur,
  onFocus,
  ...props
}: TextAreaProps) {
  const generatedId = useId();
  const textareaId = providedId || generatedId;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Determine variant based on error state
  const textareaVariant = error ? "error" : variant;

  // Auto-resize functionality
  useEffect(() => {
    if (!autoResize || !textareaRef.current) return;

    const textarea = textareaRef.current;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
      const minHeight = minRows * lineHeight;
      const maxHeight = maxRows * lineHeight;

      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    };

    // Initial adjustment
    adjustHeight();

    // Add event listener
    textarea.addEventListener("input", adjustHeight);

    return () => {
      textarea.removeEventListener("input", adjustHeight);
    };
  }, [autoResize, minRows, maxRows]);

  // Build CSS classes
  const textareaClassList = [
    styles.textarea,
    size === "sm" ? styles.textareaSizeSm : null,
    size === "lg" ? styles.textareaSizeLg : null,
    textareaVariant === "error" ? styles.textareaError : null,
    textareaVariant === "success" ? styles.textareaSuccess : null,
    autoResize ? styles.textareaAutoResize : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.textArea}>
      <label htmlFor={textareaId} className={styles.label}>
        {label}
        {required && (
          <span
            style={{
              color: "var(--s-color-red-500)",
              marginLeft: "var(--s-spacing-1)",
            }}
          >
            *
          </span>
        )}
      </label>

      <textarea
        ref={textareaRef}
        id={textareaId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        rows={autoResize ? minRows : rows}
        className={textareaClassList}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...props}
      />

      {error && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}

      {helpText && !error && <div className={styles.helpText}>{helpText}</div>}
    </div>
  );
}
