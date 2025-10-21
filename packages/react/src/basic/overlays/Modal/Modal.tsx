/**
 * Modal - Accessible modal dialog component
 *
 * A modal dialog component that overlays content with focus management,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - strong borders with subtle shadow
 * - Principle 3: Typography before decoration - clear hierarchy
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Focus trap (keyboard navigation stays within modal)
 * - Body scroll lock when open
 * - Escape key to close
 * - Click outside to close
 * - Screen reader accessible
 * - Smooth animations
 * - Multiple size variants
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="My Modal">
 *   <p>Modal content here</p>
 * </Modal>
 * ```
 */

import { X } from "@spexop/icons";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "../../../hooks/useBodyScrollLock.js";
import { useEscapeKey } from "../../../hooks/useEscapeKey.js";
import { useFocusTrap } from "../../../hooks/useFocusTrap.js";
import { cn } from "../../../utils/index.js";
import styles from "./Modal.module.css";
import type { ModalProps } from "./Modal.types.js";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  backdropClassName,
  id,
  initialFocusRef,
  preventBodyScroll = true,
}: ModalProps) {
  const [modalId] = useState(
    () => id || `modal-${Math.random().toString(36).substr(2, 9)}`,
  );
  const [titleId] = useState(() => `${modalId}-title`);
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Focus trap
  useFocusTrap(modalRef as React.RefObject<HTMLElement>, isOpen);

  // Body scroll lock
  useBodyScrollLock(isOpen && preventBodyScroll);

  // Escape key handler
  useEscapeKey(() => {
    if (closeOnEscape && isOpen) {
      onClose();
    }
  }, isOpen);

  // Set initial focus
  useEffect(() => {
    if (isOpen && initialFocusRef?.current) {
      initialFocusRef.current.focus();
    }
  }, [isOpen, initialFocusRef]);

  // Portal mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  const modalClassName = cn(styles.modal, styles[`size-${size}`], className);

  const backdropClass = cn(
    styles.backdrop,
    isOpen && styles["backdrop-visible"],
    backdropClassName,
  );

  if (!mounted || !isOpen) {
    return null;
  }

  return createPortal(
    // biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop click is intentionally mouse-only, keyboard users use Escape key to close
    <div className={backdropClass} onClick={handleBackdropClick}>
      <div
        ref={modalRef}
        id={modalId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={modalClassName}
        tabIndex={-1}
      >
        {(title || showCloseButton) && (
          <div className={styles.header}>
            {title && (
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={handleCloseClick}
                className={styles["close-button"]}
                aria-label="Close modal"
              >
                <X size={24} strokeWidth={2} />
              </button>
            )}
          </div>
        )}

        <div className={styles.body}>{children}</div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
