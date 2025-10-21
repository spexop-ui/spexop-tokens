/**
 * useAccordion Hook
 *
 * Manages accordion state with support for both single-open and multi-open modes.
 * Includes ARIA helper functions for proper accessibility markup.
 *
 * @example
 * ```tsx
 * // Single-open mode (default)
 * function Sidebar() {
 *   const { toggle, isOpen, getButtonProps, getPanelProps } = useAccordion({
 *     defaultOpen: 'components',
 *   });
 *
 *   return (
 *     <nav>
 *       <button {...getButtonProps('foundation')}>
 *         Foundation
 *       </button>
 *       <div {...getPanelProps('foundation')}>
 *         Foundation items...
 *       </div>
 *
 *       <button {...getButtonProps('components')}>
 *         Components
 *       </button>
 *       <div {...getPanelProps('components')}>
 *         Component items...
 *       </div>
 *     </nav>
 *   );
 * }
 *
 * // Multi-open mode
 * function FilterPanel() {
 *   const { toggle, isOpen, openAll, closeAll } = useAccordion({
 *     mode: 'multiple',
 *     defaultOpen: ['colors', 'sizes'],
 *   });
 *
 *   return (
 *     <div>
 *       <button onClick={openAll}>Expand All</button>
 *       <button onClick={closeAll}>Collapse All</button>
 *
 *       <Section isOpen={isOpen('colors')} onToggle={() => toggle('colors')} />
 *       <Section isOpen={isOpen('sizes')} onToggle={() => toggle('sizes')} />
 *     </div>
 *   );
 * }
 *
 * // Controlled mode
 * function ControlledAccordion() {
 *   const [value, setValue] = useState('section-1');
 *   const accordion = useAccordion({
 *     value,
 *     onValueChange: setValue,
 *   });
 *
 *   return <div>...</div>;
 * }
 * ```
 *
 * Features:
 * - Single-open or multi-open modes
 * - Controlled and uncontrolled state
 * - ARIA helper functions for accessibility
 * - Optional default open sections
 * - Type-safe return values
 *
 * @param options - Configuration options
 * @returns Accordion state and control functions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useMemo, useState } from "react";

export interface UseAccordionOptions {
  /** Initial open section(s) */
  defaultOpen?: string | string[];
  /** Single-open (only one at a time) or multiple-open mode */
  mode?: "single" | "multiple";
  /** Controlled state value */
  value?: string | string[];
  /** Controlled state change handler */
  onValueChange?: (value: string | string[]) => void;
}

export interface UseAccordionReturn {
  /** Currently open section ID(s) */
  openSections: string | string[] | null;
  /** Toggle a section (opens if closed, closes if open) */
  toggle: (sectionId: string) => void;
  /** Close specific section or all sections */
  close: (sectionId?: string) => void;
  /** Open a specific section */
  open: (sectionId: string) => void;
  /** Check if a section is open */
  isOpen: (sectionId: string) => boolean;
  /** Open all sections (multiple mode only) */
  openAll?: (sectionIds: string[]) => void;
  /** Close all sections */
  closeAll: () => void;
  /** Get ARIA props for accordion button */
  getButtonProps: (sectionId: string) => {
    "aria-expanded": boolean;
    "aria-controls": string;
    id: string;
  };
  /** Get ARIA props for accordion panel */
  getPanelProps: (sectionId: string) => {
    "aria-labelledby": string;
    id: string;
    hidden: boolean;
  };
}

// Backward compatible overload
export function useAccordion(defaultOpen?: string): UseAccordionReturn;
export function useAccordion(options: UseAccordionOptions): UseAccordionReturn;

export function useAccordion(
  optionsOrDefault?: string | UseAccordionOptions,
): UseAccordionReturn {
  // Normalize options for backward compatibility
  const options: UseAccordionOptions = useMemo(() => {
    if (typeof optionsOrDefault === "string") {
      return { defaultOpen: optionsOrDefault, mode: "single" };
    }
    return optionsOrDefault || { mode: "single" };
  }, [optionsOrDefault]);

  const { defaultOpen, mode = "single", value, onValueChange } = options;

  // Normalize default open to internal format
  const normalizedDefaultOpen = useMemo(() => {
    if (defaultOpen === undefined) return mode === "single" ? null : [];
    if (mode === "single") {
      return Array.isArray(defaultOpen) ? defaultOpen[0] || null : defaultOpen;
    }
    return Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen];
  }, [defaultOpen, mode]);

  // Internal state
  const [internalValue, setInternalValue] = useState<string | string[] | null>(
    normalizedDefaultOpen,
  );

  // Use controlled value if provided
  const currentValue = value !== undefined ? value : internalValue;

  // Update function that respects controlled/uncontrolled mode
  const updateValue = useCallback(
    (newValue: string | string[] | null) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue as string | string[]);
    },
    [value, onValueChange],
  );

  // Toggle function
  const toggle = useCallback(
    (sectionId: string) => {
      if (mode === "single") {
        const newValue = currentValue === sectionId ? null : sectionId;
        updateValue(newValue);
      } else {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        const newValue = currentArray.includes(sectionId)
          ? currentArray.filter((id) => id !== sectionId)
          : [...currentArray, sectionId];
        updateValue(newValue);
      }
    },
    [mode, currentValue, updateValue],
  );

  // Close function
  const close = useCallback(
    (sectionId?: string) => {
      if (sectionId === undefined) {
        updateValue(mode === "single" ? null : []);
      } else if (mode === "multiple" && Array.isArray(currentValue)) {
        updateValue(currentValue.filter((id) => id !== sectionId));
      } else if (mode === "single" && currentValue === sectionId) {
        updateValue(null);
      }
    },
    [mode, currentValue, updateValue],
  );

  // Open function
  const open = useCallback(
    (sectionId: string) => {
      if (mode === "single") {
        updateValue(sectionId);
      } else {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        if (!currentArray.includes(sectionId)) {
          updateValue([...currentArray, sectionId]);
        }
      }
    },
    [mode, currentValue, updateValue],
  );

  // Close all function
  const closeAll = useCallback(() => {
    updateValue(mode === "single" ? null : []);
  }, [mode, updateValue]);

  // Open all function (multiple mode only)
  const openAll = useCallback(
    (sectionIds: string[]) => {
      if (mode === "multiple") {
        updateValue(sectionIds);
      }
    },
    [mode, updateValue],
  );

  // Check if section is open
  const isOpen = useCallback(
    (sectionId: string): boolean => {
      if (mode === "single") {
        return currentValue === sectionId;
      }
      return Array.isArray(currentValue) && currentValue.includes(sectionId);
    },
    [mode, currentValue],
  );

  // ARIA helper for button props
  const getButtonProps = useCallback(
    (sectionId: string) => ({
      "aria-expanded": isOpen(sectionId),
      "aria-controls": `accordion-panel-${sectionId}`,
      id: `accordion-button-${sectionId}`,
    }),
    [isOpen],
  );

  // ARIA helper for panel props
  const getPanelProps = useCallback(
    (sectionId: string) => ({
      "aria-labelledby": `accordion-button-${sectionId}`,
      id: `accordion-panel-${sectionId}`,
      hidden: !isOpen(sectionId),
    }),
    [isOpen],
  );

  return {
    openSections: currentValue,
    toggle,
    close,
    open,
    isOpen,
    ...(mode === "multiple" ? { openAll } : {}),
    closeAll,
    getButtonProps,
    getPanelProps,
  };
}
