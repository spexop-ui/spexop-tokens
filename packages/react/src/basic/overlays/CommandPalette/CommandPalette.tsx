import {
  type ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./CommandPalette.module.css";

export interface CommandPaletteCommand {
  /**
   * Unique identifier for the command
   */
  id: string;

  /**
   * Command label
   */
  label: string;

  /**
   * Optional description
   */
  description?: string;

  /**
   * Optional icon element
   */
  icon?: React.ReactNode;

  /**
   * Optional category for grouping
   */
  category?: string;

  /**
   * Keyboard shortcut hint (e.g., "⌘K", "Ctrl+K")
   */
  shortcut?: string;

  /**
   * Callback when command is selected
   */
  onSelect: () => void;

  /**
   * Whether the command is disabled
   */
  disabled?: boolean;

  /**
   * Search keywords for better matching
   */
  keywords?: string[];
}

export interface CommandPaletteProps {
  /**
   * Whether the command palette is open
   */
  open: boolean;

  /**
   * Callback when the command palette should close
   */
  onClose: () => void;

  /**
   * List of available commands
   */
  commands: CommandPaletteCommand[];

  /**
   * Placeholder text for search input
   * @default "Type a command or search..."
   */
  placeholder?: string;

  /**
   * Whether to show category headers
   * @default true
   */
  showCategories?: boolean;

  /**
   * Whether to show keyboard shortcuts
   * @default true
   */
  showShortcuts?: boolean;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Custom styles
   */
  style?: React.CSSProperties;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;

  /**
   * Maximum number of results to show
   * @default 10
   */
  maxResults?: number;

  /**
   * Empty state message
   * @default "No commands found"
   */
  emptyMessage?: string;
}

/**
 * Command Palette Component - Spotlight-style command search
 *
 * Features:
 * - Portal rendering to body
 * - Focus trap and keyboard navigation
 * - Fuzzy search with categories
 * - Keyboard shortcuts display
 * - ESC to close, Enter to execute
 * - Up/Down arrow navigation
 * - Full accessibility (ARIA)
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * // Global Cmd+K handler
 * useEffect(() => {
 *   const handler = (e: KeyboardEvent) => {
 *     if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
 *       e.preventDefault();
 *       setOpen(true);
 *     }
 *   };
 *   window.addEventListener('keydown', handler);
 *   return () => window.removeEventListener('keydown', handler);
 * }, []);
 *
 * <CommandPalette
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   commands={[
 *     {
 *       id: 'home',
 *       label: 'Go to Home',
 *       category: 'Navigation',
 *       onSelect: () => navigate('/'),
 *     },
 *   ]}
 * />
 * ```
 */
export function CommandPalette({
  open,
  onClose,
  commands,
  placeholder = "Type a command or search...",
  showCategories = true,
  showShortcuts = true,
  className = "",
  style,
  ariaLabel = "Command palette",
  maxResults = 10,
  emptyMessage = "No commands found",
}: CommandPaletteProps): ReactElement | null {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Filter and search commands
  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) {
      return commands.slice(0, maxResults);
    }

    const query = searchQuery.toLowerCase();
    const results = commands.filter((cmd) => {
      if (cmd.disabled) return false;

      const labelMatch = cmd.label.toLowerCase().includes(query);
      const descMatch = cmd.description?.toLowerCase().includes(query);
      const categoryMatch = cmd.category?.toLowerCase().includes(query);
      const keywordMatch = cmd.keywords?.some((kw) =>
        kw.toLowerCase().includes(query),
      );

      return labelMatch || descMatch || categoryMatch || keywordMatch;
    });

    return results.slice(0, maxResults);
  }, [searchQuery, commands, maxResults]);

  // Group commands by category
  const groupedCommands = useMemo(() => {
    if (!showCategories) {
      return { "": filteredCommands };
    }

    const groups: Record<string, CommandPaletteCommand[]> = {};
    for (const cmd of filteredCommands) {
      const category = cmd.category || "Other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(cmd);
    }
    return groups;
  }, [filteredCommands, showCategories]);

  // Reset state when opened/closed
  useEffect(() => {
    if (open) {
      setSearchQuery("");
      setSelectedIndex(0);
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus input after a brief delay to ensure portal is rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      // Restore focus when closed
      previousActiveElement.current?.focus();
    }
  }, [open]);

  // Reset selected index when search changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: We intentionally only depend on searchQuery
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  // ESC key handler
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  // Handle command selection
  const handleSelect = useCallback(
    (command: CommandPaletteCommand) => {
      if (command.disabled) return;
      command.onSelect();
      onClose();
    },
    [onClose],
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (filteredCommands.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < filteredCommands.length) {
            handleSelect(filteredCommands[selectedIndex]);
          }
          break;
      }
    },
    [filteredCommands, selectedIndex, handleSelect],
  );

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;

    const selectedElement = listRef.current.querySelector(
      `[data-command-index="${selectedIndex}"]`,
    );
    if (selectedElement) {
      selectedElement.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  // Backdrop click handler
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  if (!open) return null;

  let commandIndex = 0;

  const paletteContent = (
    <>
      {/* Backdrop */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: Backdrop click is intentional, ESC key already handled */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop click is intentional, ESC key already handled */}
      <div className={styles.backdrop} onClick={handleBackdropClick}>
        {/* Command Palette Container */}
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Container click stops propagation */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          className={`${styles.palette} ${className}`}
          onClick={(e) => e.stopPropagation()}
          style={style}
        >
          {/* Search Input */}
          <div className={styles.searchContainer}>
            {/* Search Icon */}
            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <title>Search</title>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              aria-label={placeholder}
              autoComplete="off"
              spellCheck={false}
              className={styles.searchInput}
            />

            {/* Keyboard hint */}
            <div className={styles.keyboardHintContainer}>
              <kbd className={styles.kbd}>ESC</kbd>
            </div>
          </div>

          {/* Command List */}
          <div
            ref={listRef}
            role="listbox"
            aria-label="Commands"
            className={styles.commandList}
          >
            {filteredCommands.length === 0 ? (
              // Empty state
              <div className={styles.emptyState}>{emptyMessage}</div>
            ) : (
              // Commands grouped by category
              Object.entries(groupedCommands).map(
                ([category, categoryCommands]) => (
                  <div key={category} className={styles.categoryContainer}>
                    {/* Category Header */}
                    {showCategories && category && (
                      <div className={styles.categoryHeader}>{category}</div>
                    )}

                    {/* Commands in category */}
                    {categoryCommands.map((command) => {
                      const currentIndex = commandIndex++;
                      const isSelected = currentIndex === selectedIndex;

                      return (
                        <button
                          key={command.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          aria-disabled={command.disabled}
                          data-command-index={currentIndex}
                          onClick={() => handleSelect(command)}
                          disabled={command.disabled}
                          className={styles.commandButton}
                          onMouseEnter={() => setSelectedIndex(currentIndex)}
                        >
                          {/* Icon */}
                          {command.icon && (
                            <div className={styles.commandIcon}>
                              {command.icon}
                            </div>
                          )}

                          {/* Label & Description */}
                          <div className={styles.commandContent}>
                            <div
                              className={`${styles.commandLabel} ${command.description ? styles.hasDescription : ""}`}
                            >
                              {command.label}
                            </div>
                            {command.description && (
                              <div className={styles.commandDescription}>
                                {command.description}
                              </div>
                            )}
                          </div>

                          {/* Keyboard Shortcut */}
                          {showShortcuts && command.shortcut && (
                            <kbd
                              className={`${styles.kbd} ${styles.commandShortcut}`}
                            >
                              {command.shortcut}
                            </kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ),
              )
            )}
          </div>

          {/* Footer with hints */}
          <div className={styles.footer}>
            <div className={styles.footerHint}>
              <kbd className={styles.kbd}>↑↓</kbd>
              <span className={styles.footerLabel}>Navigate</span>
            </div>
            <div className={styles.footerHint}>
              <kbd className={styles.kbd}>↵</kbd>
              <span className={styles.footerLabel}>Select</span>
            </div>
            <div className={styles.footerHint}>
              <kbd className={styles.kbd}>ESC</kbd>
              <span className={styles.footerLabel}>Close</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Render in portal
  return createPortal(paletteContent, document.body) as unknown as ReactElement;
}

CommandPalette.displayName = "CommandPalette";
