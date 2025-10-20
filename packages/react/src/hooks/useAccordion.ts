/**
 * useAccordion Hook
 *
 * Manages accordion state where only one section can be open at a time.
 * When opening a section, automatically closes any other open section.
 *
 * @example
 * ```tsx
 * function Sidebar() {
 *   const { openSection, toggle, isOpen } = useAccordion('components');
 *
 *   return (
 *     <nav>
 *       <NavSection
 *         isOpen={isOpen('foundation')}
 *         onToggle={() => toggle('foundation')}
 *       >
 *         Foundation items...
 *       </NavSection>
 *
 *       <NavSection
 *         isOpen={isOpen('components')}
 *         onToggle={() => toggle('components')}
 *       >
 *         Component items...
 *       </NavSection>
 *     </nav>
 *   );
 * }
 * ```
 *
 * Features:
 * - Only one section open at a time (accordion pattern)
 * - Toggle function (opens/closes, auto-closes others)
 * - Helper functions (open, close, isOpen)
 * - Optional default open section
 *
 * @param defaultOpen - ID of section to open by default
 * @returns Accordion state and control functions
 */

import { useState } from "react";

export interface UseAccordionReturn {
  /** Currently open section ID (null if none open) */
  openSection: string | null;
  /** Toggle a section (opens if closed, closes if open, auto-closes others) */
  toggle: (sectionId: string) => void;
  /** Close all sections */
  close: () => void;
  /** Open a specific section (closes others) */
  open: (sectionId: string) => void;
  /** Check if a section is open */
  isOpen: (sectionId: string) => boolean;
}

export function useAccordion(defaultOpen?: string): UseAccordionReturn {
  const [openSection, setOpenSection] = useState<string | null>(
    defaultOpen || null,
  );

  const toggle = (sectionId: string) => {
    setOpenSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const close = () => {
    setOpenSection(null);
  };

  const open = (sectionId: string) => {
    setOpenSection(sectionId);
  };

  const isOpen = (sectionId: string): boolean => {
    return openSection === sectionId;
  };

  return {
    openSection,
    toggle,
    close,
    open,
    isOpen,
  };
}
