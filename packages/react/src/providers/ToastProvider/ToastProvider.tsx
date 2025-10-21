/**
 * ToastProvider - Centralized toast notification system
 *
 * Features:
 * - Global toast queue with auto-stacking
 * - Position management (6 positions)
 * - Auto-dismiss with configurable duration
 * - Action buttons support
 * - Variant support (success, error, warning, info, default)
 * - Animation with prefers-reduced-motion support
 * - Max toast limit with oldest removal
 * - Programmatic API: toast.success(), toast.error(), etc.
 * - Screen reader announcements
 * - WCAG AAA compliant
 *
 * @example
 * ```tsx
 * <ToastProvider maxToasts={5} position="top-right">
 *   <App />
 * </ToastProvider>
 *
 * function Component() {
 *   const { toast } = useToast();
 *   return <button onClick={() => toast.success('Saved!')}>Save</button>;
 * }
 * ```
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./ToastProvider.module.css";
import type {
  Toast,
  ToastContextValue,
  ToastOptions,
  ToastProviderProps,
} from "./ToastProvider.types.js";

// ============================================================================
// CONTEXT
// ============================================================================

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULTS = {
  MAX_TOASTS: 5,
  POSITION: "top-right" as const,
  DURATION: 4000,
  ENABLE_ANIMATIONS: true,
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate unique toast ID
 */
function generateToastId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get icon for toast variant
 */
function getVariantIcon(variant: Toast["variant"]): string {
  switch (variant) {
    case "success":
      return "✓";
    case "error":
      return "✕";
    case "warning":
      return "⚠";
    case "info":
      return "ℹ";
    default:
      return "";
  }
}

// ============================================================================
// TOAST COMPONENT
// ============================================================================

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
  enableAnimations: boolean;
}

function ToastItem({ toast, onRemove, enableAnimations }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);

  // Auto-dismiss timer
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleRemove();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast.duration]);

  const handleRemove = () => {
    if (enableAnimations) {
      setIsExiting(true);
      setTimeout(() => {
        onRemove(toast.id);
      }, 200); // Match CSS animation duration
    } else {
      onRemove(toast.id);
    }
  };

  const variantIcon = toast.icon || getVariantIcon(toast.variant);

  return (
    <div
      className={`${styles.toast} ${styles[`variant-${toast.variant || "default"}`]} ${isExiting ? styles.exiting : ""}`}
      role="alert"
      aria-live={toast.variant === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      data-toast-id={toast.id}
    >
      {variantIcon && (
        <div className={styles.icon} aria-hidden="true">
          {variantIcon}
        </div>
      )}

      <div className={styles.content}>
        {toast.title && <div className={styles.title}>{toast.title}</div>}
        <div className={styles.message}>{toast.message}</div>
      </div>

      <div className={styles.actions}>
        {toast.action && (
          <button
            type="button"
            className={styles.action}
            onClick={() => {
              toast.action?.onClick();
              handleRemove();
            }}
            aria-label={toast.action.label}
          >
            {toast.action.label}
          </button>
        )}

        {toast.closable !== false && (
          <button
            type="button"
            className={styles.close}
            onClick={handleRemove}
            aria-label="Close notification"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

/**
 * ToastProvider Component
 * Provides centralized toast notification system
 */
export function ToastProvider({
  children,
  maxToasts = DEFAULTS.MAX_TOASTS,
  position = DEFAULTS.POSITION,
  defaultDuration = DEFAULTS.DURATION,
  enableAnimations = DEFAULTS.ENABLE_ANIMATIONS,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Respect prefers-reduced-motion
  const shouldAnimate =
    enableAnimations &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Add a new toast
  const addToast = useCallback(
    (message: string, options?: ToastOptions): string => {
      const id = generateToastId();

      const newToast: Toast = {
        id,
        message,
        title: options?.title,
        variant: options?.variant || "default",
        duration: options?.duration ?? defaultDuration,
        action: options?.action,
        closable: options?.closable ?? true,
        icon: options?.icon,
        createdAt: Date.now(),
      };

      setToasts((prev) => {
        // Remove oldest toast if at max capacity
        const toastsToKeep = prev.length >= maxToasts ? prev.slice(1) : prev;
        return [...toastsToKeep, newToast];
      });

      return id;
    },
    [defaultDuration, maxToasts],
  );

  // Remove a toast
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Clear all toasts
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Programmatic API with convenience methods
  const toast = useMemo(() => {
    const baseToast = (message: string, options?: ToastOptions): string => {
      return addToast(message, options);
    };

    const toastWithMethods = Object.assign(baseToast, {
      success: (
        message: string,
        options?: Omit<ToastOptions, "variant">,
      ): string => {
        return addToast(message, { ...options, variant: "success" });
      },
      error: (
        message: string,
        options?: Omit<ToastOptions, "variant">,
      ): string => {
        return addToast(message, { ...options, variant: "error" });
      },
      warning: (
        message: string,
        options?: Omit<ToastOptions, "variant">,
      ): string => {
        return addToast(message, { ...options, variant: "warning" });
      },
      info: (
        message: string,
        options?: Omit<ToastOptions, "variant">,
      ): string => {
        return addToast(message, { ...options, variant: "info" });
      },
    });

    return toastWithMethods;
  }, [addToast]);

  // Context value with proper memoization
  const value: ToastContextValue = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      clearToasts,
      toast,
    }),
    [toasts, addToast, removeToast, clearToasts, toast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast container */}
      {toasts.length > 0 && (
        <div
          className={`${styles.container} ${styles[`position-${position}`]}`}
          role="region"
          aria-label="Notifications"
          aria-live="polite"
        >
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onRemove={removeToast}
              enableAnimations={shouldAnimate}
            />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * useToast Hook
 * Access toast notification system
 *
 * @throws Error if used outside ToastProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { toast } = useToast();
 *
 *   return (
 *     <button onClick={() => toast.success('Saved!')}>
 *       Save
 *     </button>
 *   );
 * }
 * ```
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error(
      "useToast must be used within a ToastProvider. " +
        "Wrap your app with <ToastProvider> to use toast notifications.",
    );
  }

  return context;
}

// Export context for advanced use cases
export { ToastContext };
