/**
 * useCopyToClipboard Hook
 *
 * Copies text to clipboard with success tracking.
 * Essential for share buttons, code snippets, and text copying features.
 *
 * @example
 * ```tsx
 * function ShareButton() {
 *   const [copiedText, copy] = useCopyToClipboard();
 *
 *   return (
 *     <button onClick={() => copy(window.location.href)}>
 *       {copiedText ? 'Copied!' : 'Copy Link'}
 *     </button>
 *   );
 * }
 *
 * // Code snippet
 * function CodeBlock({ code }: { code: string }) {
 *   const [copiedText, copy] = useCopyToClipboard();
 *
 *   return (
 *     <div>
 *       <pre>{code}</pre>
 *       <button onClick={() => copy(code)}>
 *         {copiedText === code ? 'Copied!' : 'Copy'}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * Features:
 * - Modern Clipboard API
 * - Fallback for older browsers
 * - Success state tracking
 * - Error handling
 * - Type-safe
 *
 * @returns Tuple of [copiedText, copy]
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useState } from "react";

export function useCopyToClipboard(): [
  string | null,
  (text: string) => Promise<boolean>,
] {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (typeof navigator === "undefined") {
      console.warn("Clipboard API not available");
      return false;
    }

    try {
      // Try modern Clipboard API
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        return true;
      }

      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        setCopiedText(text);
        return true;
      }

      return false;
    } catch (error) {
      console.warn("Failed to copy text:", error);
      setCopiedText(null);
      return false;
    }
  }, []);

  return [copiedText, copy];
}
