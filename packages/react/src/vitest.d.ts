/**
 * Vitest Type Declarations
 *
 * Extends Vitest's Assertion interface with @testing-library/jest-dom matchers
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import type * as matchers from "@testing-library/jest-dom/matchers";
import "vitest";

type CustomMatchers<R = unknown> = {
  toBeInTheDocument(): R;
  toHaveClass(...classNames: string[]): R;
  toHaveAttribute(attr: string, value?: string | RegExp): R;
  toHaveStyle(css: Record<string, unknown> | string): R;
  toBeDisabled(): R;
  toBeEnabled(): R;
  toHaveFocus(): R;
  toBeVisible(): R;
  toBeEmptyDOMElement(): R;
  toContainElement(element: HTMLElement | null): R;
  toContainHTML(html: string): R;
  toHaveAccessibleDescription(description?: string | RegExp): R;
  toHaveAccessibleName(name?: string | RegExp): R;
  toHaveDisplayValue(value: string | string[] | RegExp | RegExp[]): R;
  toHaveFormValues(values: Record<string, unknown>): R;
  toHaveTextContent(
    text: string | RegExp,
    options?: { normalizeWhitespace: boolean },
  ): R;
  toHaveValue(value?: string | string[] | number | null): R;
  toBeChecked(): R;
  toBePartiallyChecked(): R;
  toHaveErrorMessage(message?: string | RegExp): R;
  toBeInvalid(): R;
  toBeRequired(): R;
  toBeValid(): R;
};

declare module "vitest" {
  interface Assertion<T = unknown> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
