/**
 * Form Component
 * Form wrapper with validation, loading states, and accessibility
 *
 * Follows "The Spexop Way":
 * - Principle 2: Borders before shadows
 * - Principle 4: Tokens before magic numbers
 * - Principle 6: Standards before frameworks
 * - Principle 7: Accessibility before aesthetics
 *
 * @component Form
 * @packageName @spexop/react
 * @description Form wrapper component with validation and loading states
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-21
 *
 * @example
 * ```tsx
 * <Form onSubmit={handleSubmit} loading={isLoading}>
 *   <TextInput label="Email" type="email" />
 *   <Button type="submit">Submit</Button>
 * </Form>
 * ```
 */

import { cn } from "../../../utils/index.js";
import styles from "./Form.module.css";
import type { FormProps } from "./Form.types.js";

export function Form({
  children,
  onSubmit,
  action,
  method = "post",
  loading = false,
  disabled = false,
  validation,
  showLoadingIndicator = true,
  variant = "default",
  className,
  id,
  noValidate = false,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-live": ariaLive,
  ...props
}: FormProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading || disabled) {
      return;
    }

    if (onSubmit) {
      const formData = new FormData(event.currentTarget);
      await onSubmit(event, formData);
    }
  };

  const formClassName = cn(
    styles.form,
    styles[`variant-${variant}`],
    disabled && styles.disabled,
    className,
  );

  const hasErrors =
    validation && !validation.isValid && validation.errors.length > 0;

  return (
    <form
      id={id}
      className={formClassName}
      onSubmit={handleSubmit}
      action={action}
      method={method}
      noValidate={noValidate}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-live={ariaLive}
      {...props}
    >
      {/* Form-level errors */}
      {hasErrors && (
        <div className={styles["form-errors"]} role="alert" aria-live="polite">
          <ul>
            {validation.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form content */}
      <fieldset
        disabled={disabled || loading}
        style={{ border: "none", padding: 0, margin: 0 }}
      >
        {children}
      </fieldset>

      {/* Loading overlay */}
      {loading && showLoadingIndicator && (
        <div
          className={styles["loading-overlay"]}
          aria-live="polite"
          aria-busy="true"
        >
          <div
            className={styles["loading-spinner"]}
            role="status"
            aria-label="Loading"
          />
        </div>
      )}
    </form>
  );
}
