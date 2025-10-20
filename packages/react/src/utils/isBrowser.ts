/**
 * Check if code is running in browser environment (SSR-safe)
 * @internal
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
