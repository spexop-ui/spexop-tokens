/**
 * useLongPress Hook
 *
 * Detects long press gestures on elements.
 * Essential for mobile interactions and context menus.
 *
 * @example
 * ```tsx
 * function ContextMenuButton() {
 *   const longPressProps = useLongPress(() => {
 *     showContextMenu();
 *   }, { delay: 500 });
 *
 *   return <button {...longPressProps}>Long press me</button>;
 * }
 *
 * // With both click and long press
 * function MultiActionButton() {
 *   const longPressProps = useLongPress(
 *     () => showAdvancedOptions(),
 *     {
 *       delay: 800,
 *       onCancel: () => console.log('Long press cancelled'),
 *     }
 *   );
 *
 *   return (
 *     <button
 *       {...longPressProps}
 *       onClick={() => performQuickAction()}
 *     >
 *       Press or long press
 *     </button>
 *   );
 * }
 * ```
 *
 * Features:
 * - Configurable delay
 * - Mouse and touch support
 * - Cancel callback
 * - Prevents accidental long press
 * - Type-safe props
 *
 * @param callback - Function to call on long press
 * @param options - Configuration options
 * @returns Event handler props for element
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useRef } from "react";

export interface UseLongPressOptions {
  delay?: number;
  onCancel?: () => void;
}

export function useLongPress(
  callback: () => void,
  options: UseLongPressOptions = {},
) {
  const { delay = 500, onCancel } = options;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const isLongPress = useRef(false);

  const start = useCallback(() => {
    isLongPress.current = false;

    timeoutRef.current = setTimeout(() => {
      isLongPress.current = true;
      callback();
    }, delay);
  }, [callback, delay]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      if (!isLongPress.current && onCancel) {
        onCancel();
      }
    }
  }, [onCancel]);

  return {
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
  };
}
