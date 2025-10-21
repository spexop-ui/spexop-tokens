/**
 * ModalProvider - Centralized modal/dialog management system
 *
 * Features:
 * - Modal stack management with z-index
 * - Focus trap with return focus
 * - Scroll lock on body
 * - Backdrop click handling
 * - ESC key handling
 * - ARIA attributes for accessibility
 * - Nested modal support
 * - Animation with prefers-reduced-motion support
 * - Size variants (sm, md, lg, xl, full)
 *
 * @example
 * ```tsx
 * <ModalProvider>
 *   <App />
 * </ModalProvider>
 *
 * function Component() {
 *   const { openModal, closeModal } = useModal();
 *
 *   const handleOpen = () => {
 *     openModal(
 *       <DeleteConfirmation />,
 *       {
 *         title: 'Confirm Delete',
 *         onClose: () => console.log('closed')
 *       }
 *     );
 *   };
 *
 *   return <button onClick={handleOpen}>Delete</button>;
 * }
 * ```
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./ModalProvider.module.css";
import type {
  Modal,
  ModalContextValue,
  ModalOptions,
  ModalProviderProps,
} from "./ModalProvider.types.js";

// ============================================================================
// CONTEXT
// ============================================================================

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULTS = {
  MAX_MODALS: 3,
  ENABLE_ANIMATIONS: true,
  ENABLE_SCROLL_LOCK: true,
  BASE_Z_INDEX: 10000,
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate unique modal ID
 */
function generateModalId(): string {
  return `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Lock body scroll
 */
function lockScroll(): void {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
}

/**
 * Unlock body scroll
 */
function unlockScroll(): void {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

// ============================================================================
// MODAL COMPONENT
// ============================================================================

interface ModalItemProps {
  modal: Modal;
  onClose: (id: string) => void;
  enableAnimations: boolean;
  index: number;
}

function ModalItem({
  modal,
  onClose,
  enableAnimations,
  index,
}: ModalItemProps) {
  const [isExiting, setIsExiting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store previous focus
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    modal.onOpen?.();

    return () => {
      // Restore focus on unmount
      previousFocusRef.current?.focus();
    };
  }, [modal]);

  // Focus trap
  useEffect(() => {
    if (!modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    firstElement?.focus();

    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  // ESC key handler
  useEffect(() => {
    if (!modal.closeOnEsc) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [modal.closeOnEsc]);

  const handleClose = () => {
    if (enableAnimations) {
      setIsExiting(true);
      setTimeout(() => {
        onClose(modal.id);
        modal.onClose?.();
      }, 200);
    } else {
      onClose(modal.id);
      modal.onClose?.();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && modal.closeOnBackdrop !== false) {
      handleClose();
    }
  };

  const zIndex = modal.zIndex || DEFAULTS.BASE_Z_INDEX + index * 10;

  return (
    <div
      className={`${styles.backdrop} ${isExiting ? styles.exiting : ""}`}
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === "Escape" && modal.closeOnBackdrop !== false) {
          handleClose();
        }
      }}
      style={{ zIndex }}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={`${styles.modal} ${styles[`size-${modal.size || "md"}`]} ${modal.className || ""} ${isExiting ? styles.exiting : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modal.title ? `${modal.id}-title` : undefined}
      >
        {(modal.title || modal.showClose !== false) && (
          <div className={styles.header}>
            {modal.title && (
              <h2 id={`${modal.id}-title`} className={styles.title}>
                {modal.title}
              </h2>
            )}
            {modal.showClose !== false && (
              <button
                type="button"
                className={styles.close}
                onClick={handleClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className={styles.content}>{modal.content}</div>

        {modal.footer && <div className={styles.footer}>{modal.footer}</div>}
      </div>
    </div>
  );
}

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

/**
 * ModalProvider Component
 * Provides centralized modal management system
 */
export function ModalProvider({
  children,
  maxModals = DEFAULTS.MAX_MODALS,
  enableAnimations = DEFAULTS.ENABLE_ANIMATIONS,
  enableScrollLock = DEFAULTS.ENABLE_SCROLL_LOCK,
}: ModalProviderProps) {
  const [modals, setModals] = useState<Modal[]>([]);

  // Respect prefers-reduced-motion
  const shouldAnimate =
    enableAnimations &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll lock management
  useEffect(() => {
    if (enableScrollLock && modals.length > 0) {
      lockScroll();
      return () => unlockScroll();
    }
  }, [enableScrollLock, modals.length]);

  // Open a new modal
  const openModal = useCallback(
    (content: React.ReactNode, options?: ModalOptions): string => {
      const id = generateModalId();

      const newModal: Modal = {
        id,
        content,
        title: options?.title,
        size: options?.size || "md",
        closeOnBackdrop: options?.closeOnBackdrop ?? true,
        closeOnEsc: options?.closeOnEsc ?? true,
        showClose: options?.showClose ?? true,
        footer: options?.footer,
        onClose: options?.onClose,
        onOpen: options?.onOpen,
        className: options?.className,
        zIndex: DEFAULTS.BASE_Z_INDEX + modals.length * 10,
      };

      setModals((prev) => {
        // Respect max modals limit
        if (prev.length >= maxModals) {
          console.warn(
            `ModalProvider: Maximum modal limit (${maxModals}) reached`,
          );
          return prev;
        }
        return [...prev, newModal];
      });

      return id;
    },
    [maxModals, modals.length],
  );

  // Close a modal
  const closeModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  // Close all modals
  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  // Get active (top) modal
  const activeModal = modals[modals.length - 1];

  // Context value with proper memoization
  const value: ModalContextValue = useMemo(
    () => ({
      modals,
      openModal,
      closeModal,
      closeAllModals,
      activeModal,
    }),
    [modals, openModal, closeModal, closeAllModals, activeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}

      {/* Modal stack */}
      {modals.map((modal, index) => (
        <ModalItem
          key={modal.id}
          modal={modal}
          onClose={closeModal}
          enableAnimations={shouldAnimate}
          index={index}
        />
      ))}
    </ModalContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * useModal Hook
 * Access modal management system
 *
 * @throws Error if used outside ModalProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { openModal, closeModal } = useModal();
 *
 *   return (
 *     <button onClick={() => openModal(<Content />, { title: 'Hello' })}>
 *       Open Modal
 *     </button>
 *   );
 * }
 * ```
 */
export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error(
      "useModal must be used within a ModalProvider. " +
        "Wrap your app with <ModalProvider> to use modal functionality.",
    );
  }

  return context;
}

// Export context for advanced use cases
export { ModalContext };
