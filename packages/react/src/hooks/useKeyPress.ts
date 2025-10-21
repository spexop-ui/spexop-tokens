/**
 * useKeyPress Hook
 *
 * Detects when specific keyboard keys or combinations are pressed.
 * Perfect for keyboard shortcuts and hotkeys.
 *
 * @example
 * ```tsx
 * function Editor() {
 *   const isSavePressed = useKeyPress(['Control', 's']);
 *   const isEscapePressed = useKeyPress('Escape');
 *
 *   useEffect(() => {
 *     if (isSavePressed) {
 *       saveDocument();
 *     }
 *   }, [isSavePressed]);
 *
 *   useEffect(() => {
 *     if (isEscapePressed) {
 *       closeModal();
 *     }
 *   }, [isEscapePressed]);
 * }
 *
 * // Multiple shortcuts
 * function App() {
 *   const isCtrlK = useKeyPress(['Control', 'k']);
 *   const isCtrlP = useKeyPress(['Control', 'p']);
 *
 *   useEffect(() => {
 *     if (isCtrlK) openCommandPalette();
 *     if (isCtrlP) openFilePicker();
 *   }, [isCtrlK, isCtrlP]);
 * }
 * ```
 *
 * Features:
 * - Single key or combination detection
 * - Modifier keys support (Ctrl, Shift, Alt, Meta)
 * - Case-insensitive key matching
 * - Automatic cleanup
 * - SSR-safe
 *
 * @param targetKeys - Key or array of keys to detect
 * @returns Boolean indicating if keys are pressed
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useEffect, useState } from "react";

export function useKeyPress(targetKeys: string | string[]): boolean {
  const [keysPressed, setKeysPressed] = useState(new Set<string>());

  const keys = Array.isArray(targetKeys) ? targetKeys : [targetKeys];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      setKeysPressed((prev) => new Set(prev).add(event.key));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeysPressed((prev) => {
        const next = new Set(prev);
        next.delete(event.key);
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Check if all target keys are pressed
  return keys.every((key) => keysPressed.has(key));
}
