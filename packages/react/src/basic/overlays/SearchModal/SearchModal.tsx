/**
 * SearchModal Component
 * Centered modal-style search with quick links and categorized results
 *
 * Features:
 * - Portal rendering to body
 * - Focus trap and keyboard navigation
 * - Fuzzy search with categories
 * - Quick links in empty state
 * - Recent searches support
 * - Keyboard shortcuts display
 * - Full accessibility (ARIA)
 *
 * @component SearchModal
 * @packageName @spexop/react
 */

import { ArrowRight, FileText, Home, Search, X } from "@spexop/icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./SearchModal.module.css";
import type { SearchModalProps, SearchResult } from "./SearchModal.types.js";

export function SearchModal({
  isOpen,
  onClose,
  results,
  quickLinks = [],
  recentSearches = [],
  placeholder = "Search pages, sections, and content...",
  className = "",
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Filter and search results
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    return results.filter((result) => {
      const titleMatch = result.title.toLowerCase().includes(query);
      const descMatch = result.description?.toLowerCase().includes(query);
      const categoryMatch = result.category?.toLowerCase().includes(query);
      const keywordMatch = result.keywords?.some((kw) =>
        kw.toLowerCase().includes(query),
      );

      return titleMatch || descMatch || categoryMatch || keywordMatch;
    });
  }, [searchQuery, results]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    for (const result of filteredResults) {
      const category = result.category || "Other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(result);
    }
    return groups;
  }, [filteredResults]);

  // Reset state when opened/closed
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelectedIndex(0);
      previousActiveElement.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Handle result selection
  const handleSelect = useCallback(
    (_result: SearchResult) => {
      onClose();
      // Navigation is handled by the onSelect callback in the result
    },
    [onClose],
  );

  // Handle quick link click
  const handleQuickLinkClick = useCallback(
    (_url: string) => {
      onClose();
    },
    [onClose],
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (filteredResults.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredResults.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredResults.length - 1,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < filteredResults.length) {
            handleSelect(filteredResults[selectedIndex]);
          }
          break;
      }
    },
    [filteredResults, selectedIndex, handleSelect],
  );

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;

    const selectedElement = listRef.current.querySelector(
      `[data-result-index="${selectedIndex}"]`,
    );
    if (selectedElement) {
      selectedElement.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  // Backdrop click handler
  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const showEmptyState = !searchQuery.trim();
  const showNoResults = searchQuery.trim() && filteredResults.length === 0;
  const showResults = searchQuery.trim() && filteredResults.length > 0;

  const modalContent = (
    <>
      {/* Backdrop */}
      <button
        type="button"
        className={styles.backdrop}
        onClick={handleBackdropClick}
        aria-label="Close search"
        tabIndex={-1}
      />

      {/* Search Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className={`${styles.searchModal} ${className}`}
      >
        {/* Search Input */}
        <div className={styles.searchInputWrapper}>
          <Search size={20} className={styles.searchIcon} />

          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label={placeholder}
            autoComplete="off"
            spellCheck={false}
            className={styles.searchInput}
          />

          <kbd className={styles.keyboardHint}>⌘K</kbd>

          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div ref={listRef} className={styles.modalContent}>
          {/* Empty State - Quick Links */}
          {showEmptyState && (
            <div className={styles.emptyState}>
              {quickLinks.length > 0 && (
                <section>
                  <h3 className={styles.sectionHeading}>Quick Links</h3>
                  <div className={styles.quickLinks}>
                    {quickLinks.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        className={styles.quickLink}
                        onClick={(e) => {
                          e.preventDefault();
                          handleQuickLinkClick(link.url);
                        }}
                      >
                        {link.icon ? (
                          <div className={styles.quickLinkIcon}>
                            {link.icon}
                          </div>
                        ) : (
                          <Home size={28} className={styles.quickLinkIcon} />
                        )}
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {recentSearches.length > 0 && (
                <section>
                  <h3 className={styles.sectionHeading}>Recent Searches</h3>
                  <div className={styles.guidesList}>
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        type="button"
                        className={styles.guideLink}
                        onClick={() => setSearchQuery(search)}
                      >
                        <ArrowRight size={18} className={styles.guideIcon} />
                        <span>"{search}"</span>
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* No Results State */}
          {showNoResults && (
            <div className={styles.noResults}>
              <Search size={48} className={styles.noResultsIcon} />
              <h3 className={styles.noResultsTitle}>
                No results found for "{searchQuery}"
              </h3>
              <p className={styles.noResultsDescription}>
                Try adjusting your search or browse our pages.
              </p>

              {quickLinks.length > 0 && (
                <div
                  className={styles.quickLinks}
                  style={{ justifyContent: "center" }}
                >
                  {quickLinks.slice(0, 3).map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className={styles.quickLink}
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuickLinkClick(link.url);
                      }}
                    >
                      {link.icon ? (
                        <div className={styles.quickLinkIcon}>{link.icon}</div>
                      ) : (
                        <FileText size={28} className={styles.quickLinkIcon} />
                      )}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Search Results */}
          {showResults && (
            <>
              <div className={styles.resultsCount}>
                Found {filteredResults.length} result
                {filteredResults.length !== 1 ? "s" : ""}
              </div>

              {Object.entries(groupedResults).map(
                ([category, categoryResults]) => (
                  <div key={category} className={styles.resultGroup}>
                    <div className={styles.resultGroupHeader}>
                      <FileText size={16} className={styles.resultGroupIcon} />
                      <h3 className={styles.resultGroupTitle}>{category}</h3>
                      <span className={styles.resultGroupCount}>
                        ({categoryResults.length})
                      </span>
                    </div>

                    <div className={styles.resultsList}>
                      {categoryResults.map((result, _index) => {
                        const globalIndex = filteredResults.indexOf(result);
                        const isActive = globalIndex === selectedIndex;

                        return (
                          <button
                            key={result.id}
                            type="button"
                            data-result-index={globalIndex}
                            data-active={isActive}
                            className={styles.result}
                            onClick={() => handleSelect(result)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                          >
                            {result.icon ? (
                              <div className={styles.resultIcon}>
                                {result.icon}
                              </div>
                            ) : (
                              <FileText
                                size={20}
                                className={styles.resultIcon}
                              />
                            )}

                            <div className={styles.resultContent}>
                              <div className={styles.resultTitle}>
                                {result.title}
                              </div>
                              <div className={styles.resultDescription}>
                                {result.description}
                              </div>
                              {(result.badge || result.value) && (
                                <div className={styles.resultMeta}>
                                  {result.badge && (
                                    <span
                                      className={`${styles.resultBadge} ${
                                        result.badge === "Approved"
                                          ? styles.approved
                                          : ""
                                      }`}
                                    >
                                      {result.badge}
                                    </span>
                                  )}
                                  {result.value && (
                                    <code className={styles.resultValue}>
                                      {result.value}
                                    </code>
                                  )}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ),
              )}
            </>
          )}
        </div>

        {/* Keyboard Shortcuts Footer */}
        <div className={styles.modalFooter}>
          <div className={styles.shortcut}>
            <kbd className={styles.shortcutKey}>↑</kbd>
            <kbd className={styles.shortcutKey}>↓</kbd>
            <span>Navigate</span>
          </div>

          <div className={styles.shortcut}>
            <kbd className={styles.shortcutKey}>↵</kbd>
            <span>Select</span>
          </div>

          <div className={styles.shortcut}>
            <kbd className={styles.shortcutKey}>ESC</kbd>
            <span>Close</span>
          </div>
        </div>
      </div>
    </>
  );

  // Render in portal
  return createPortal(modalContent, document.body);
}
