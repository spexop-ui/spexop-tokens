/**
 * Overlay Components
 *
 * Modal dialogs and overlay interfaces.
 * Includes drawers, search interfaces, and notifications.
 */

export * from "./CommandPalette/index.js";
export * from "./Drawer/index.js";
export type {
  QuickLink,
  SearchModalProps,
  SearchResult as SearchModalResult,
} from "./SearchModal/index.js";
export { SearchModal } from "./SearchModal/index.js";
export * from "./Snackbar/index.js";
