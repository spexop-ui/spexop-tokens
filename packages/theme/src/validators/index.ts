/**
 * Theme validators
 * @module @spexop/theme/validators
 */

export type {
  ValidationError,
  ValidationOptions,
  ValidationResult,
} from "./validateTheme.js";
export { validateTheme } from "./validateTheme.js";

export type { SanitizationOptions } from "./sanitizeTheme.js";
export {
  deepCloneSanitize,
  escapeForDisplay,
  isThemeLike,
  removeDangerousChars,
  sanitizeAndValidate,
  sanitizeTheme,
  sanitizeThemeFromJSON,
} from "./sanitizeTheme.js";

export type {
  SchemaValidationError,
  SchemaValidationResult,
} from "./schema.js";
export {
  getThemeSchema,
  validateAgainstSchema,
  validateThemeSchema,
} from "./schema.js";
