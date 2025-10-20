/**
 * Combines class names, filtering out falsy values
 * @internal
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
