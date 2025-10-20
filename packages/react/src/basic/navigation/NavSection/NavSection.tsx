/**
 * NavSection Component
 * Accordion-style navigation section for sidebar
 *
 * Features:
 * - Expand/collapse behavior
 * - Smooth max-height animation
 * - + icon rotation to × when expanded
 * - ARIA expanded state
 * - Auto-close other sections (when used with useAccordion)
 * - Keyboard accessible
 *
 * @component NavSection
 * @packageName @spexop/react
 * @description Accordion-style navigation section for sidebar with expand/collapse
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 */

import { useId, useState } from "react";
import styles from "./NavSection.module.css";
import type { NavSectionProps } from "./NavSection.types.js";

export function NavSection({
  label,
  defaultOpen = false,
  children,
  onToggle,
  className = "",
}: NavSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();
  const buttonId = useId();

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  return (
    <div className={`${styles.navSection} ${className}`}>
      <button
        id={buttonId}
        type="button"
        className={styles.navSectionButton}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className={styles.navSectionLabel}>{label}</span>
        <span
          className={`${styles.navSectionIcon} ${isOpen ? styles.open : ""}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <section
        id={contentId}
        aria-labelledby={buttonId}
        className={`${styles.navSectionContent} ${isOpen ? styles.open : ""}`}
      >
        <div className={styles.navSectionInner}>{children}</div>
      </section>
    </div>
  );
}
