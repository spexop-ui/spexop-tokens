/**
 * CodeBlock - Redesigned code block component with Shiki
 *
 * A refined minimalist code block following "The Spexop Way":
 * - Borders before shadows (strong 2-3px borders)
 * - Typography before decoration (font weight for hierarchy)
 * - High contrast (WCAG AAA compliance)
 * - Token-based design (no magic numbers)
 * - VSCode-powered syntax highlighting with Shiki
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <CodeBlock
 *   code="const hello = 'world';"
 *   language="javascript"
 *   title="Hello World"
 * />
 * ```
 */

import { useEffect, useId, useState } from "react";
import { cn } from "../../../utils/index.js";
import styles from "./CodeBlock.module.css";
import type {
  CodeBlockProps,
  CodeBlockState,
  Framework,
  FrameworkTab,
} from "./CodeBlock.types.js";

// Custom syntax highlighting with theme tokens
interface HighlightedToken {
  content: string;
  type:
    | "keyword"
    | "string"
    | "number"
    | "operator"
    | "punctuation"
    | "comment"
    | "variable"
    | "text";
}

function highlightCode(code: string, language: string): HighlightedToken[] {
  const lines = code.split("\n");
  const tokens: HighlightedToken[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineTokens = highlightLine(line, language);
    tokens.push(...lineTokens);

    // Add line break (except for last line)
    if (i < lines.length - 1) {
      tokens.push({ content: "\n", type: "text" });
    }
  }

  return tokens;
}

function highlightLine(line: string, language: string): HighlightedToken[] {
  const tokens: HighlightedToken[] = [];
  let current = "";
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    // const _nextChar = line[i + 1]; // Available for future use

    // Handle strings
    if (!inString && (char === '"' || char === "'" || char === "`")) {
      if (current) {
        tokens.push({ content: current, type: "text" });
        current = "";
      }
      inString = true;
      stringChar = char;
      current = char;
    } else if (inString && char === stringChar) {
      current += char;
      tokens.push({ content: current, type: "string" });
      current = "";
      inString = false;
      stringChar = "";
    } else if (inString) {
      current += char;
    } else {
      // Handle non-string content
      if (isOperator(char)) {
        if (current) {
          tokens.push({ content: current, type: "text" });
          current = "";
        }
        tokens.push({ content: char, type: "operator" });
      } else if (isPunctuation(char)) {
        if (current) {
          tokens.push({ content: current, type: "text" });
          current = "";
        }
        tokens.push({ content: char, type: "punctuation" });
      } else if (char === " " || char === "\t") {
        if (current) {
          tokens.push({ content: current, type: "text" });
          current = "";
        }
        tokens.push({ content: char, type: "text" });
      } else {
        current += char;
      }
    }
  }

  // Add remaining content
  if (current) {
    tokens.push({ content: current, type: "text" });
  }

  // Post-process to identify keywords and numbers
  return tokens.map((token) => {
    if (token.type === "text") {
      if (isKeyword(token.content, language)) {
        return { ...token, type: "keyword" };
      } else if (isNumber(token.content)) {
        return { ...token, type: "number" };
      } else if (isVariable(token.content)) {
        return { ...token, type: "variable" };
      }
    }
    return token;
  });
}

function isOperator(char: string): boolean {
  return ["+", "-", "*", "/", "=", "<", ">", "!", "&", "|", "?", ":"].includes(
    char,
  );
}

function isPunctuation(char: string): boolean {
  return ["(", ")", "[", "]", "{", "}", ",", ";", ".", ":"].includes(char);
}

function isKeyword(word: string, language: string): boolean {
  const keywords = {
    js: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "import",
      "export",
      "from",
      "as",
      "default",
    ],
    ts: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "import",
      "export",
      "from",
      "as",
      "default",
      "interface",
      "type",
      "enum",
    ],
    tsx: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "import",
      "export",
      "from",
      "as",
      "default",
      "interface",
      "type",
      "enum",
      "React",
    ],
    jsx: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "import",
      "export",
      "from",
      "as",
      "default",
      "React",
    ],
    css: ["@media", "@keyframes", "!important", "inherit", "initial", "unset"],
    html: [
      "!DOCTYPE",
      "html",
      "head",
      "body",
      "div",
      "span",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ],
  };

  const langKey = language.toLowerCase() as keyof typeof keywords;
  return keywords[langKey]?.includes(word) || false;
}

function isNumber(word: string): boolean {
  return /^\d+(\.\d+)?$/.test(word);
}

function isVariable(word: string): boolean {
  return /^[A-Z][a-zA-Z0-9]*$/.test(word) && !isKeyword(word, "");
}

/**
 * Copy icon SVG
 */
function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

/**
 * Download icon SVG
 */
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

/**
 * Share icon SVG
 */
function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

/**
 * Check icon SVG (for copied state)
 */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * CodeBlock Component
 * Redesigned code block with refined minimalism and Shiki highlighting
 * @version 3.0.0
 */
export function CodeBlock({
  code,
  language = "javascript",
  title,
  meta,
  enableSyntaxHighlighting = true,
  showLineNumbers = false,
  showCopy = true,
  showDownload = false,
  showShare = false,
  customActions,
  infoBadge,
  variant = "default",
  activeFramework,
  onFrameworkChange,
  onCopy,
  onDownload,
  onShare,
  maxHeight = "40vh",
  copyButtonLabel = "Copy Code",
  copiedLabel = "Copied!",
  downloadButtonLabel = "Download",
  shareButtonLabel = "Share",
  hideHeader = false,
  hideActions = false,
  className = "",
  "aria-label": ariaLabel,
}: CodeBlockProps) {
  // Generate unique ID for accessibility
  const codeId = useId();

  // Determine if we have multi-framework code
  const isMultiFramework = Array.isArray(code);
  const frameworks = isMultiFramework
    ? (code as FrameworkTab[]).map((tab) => tab.framework)
    : [];

  // State for active framework, copied status, and highlighted tokens
  const [state, setState] = useState<
    CodeBlockState & { tokens?: HighlightedToken[] }
  >(() => {
    if (isMultiFramework) {
      const tabs = code as FrameworkTab[];
      const initialFramework = activeFramework || tabs[0]?.framework || "react";
      const initialTab = tabs.find((t) => t.framework === initialFramework);
      return {
        activeFramework: initialFramework,
        code: initialTab?.code || "",
        language: initialFramework,
        copied: false,
        tokens: undefined,
      };
    }
    return {
      activeFramework: "react",
      code: code as string,
      language,
      copied: false,
      tokens: undefined,
    };
  });

  // Watch for theme changes (for future use)
  useEffect(() => {
    if (typeof document === "undefined") return;

    const observer = new MutationObserver(() => {
      // Theme change detection - can be used for future enhancements
      const theme = document.documentElement.getAttribute("data-theme");
      console.log("Theme changed to:", theme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Update state when activeFramework prop changes
  useEffect(() => {
    if (isMultiFramework && activeFramework) {
      const tabs = code as FrameworkTab[];
      const tab = tabs.find((t) => t.framework === activeFramework);
      if (tab) {
        setState((prev) => ({
          ...prev,
          activeFramework,
          code: tab.code,
          language: activeFramework,
          tokens: undefined, // Reset to trigger re-highlight
        }));
      }
    }
  }, [activeFramework, code, isMultiFramework]);

  // Custom syntax highlighting
  useEffect(() => {
    if (!enableSyntaxHighlighting) {
      setState((prev) => ({ ...prev, tokens: undefined }));
      return;
    }

    try {
      const codeString =
        typeof state.code === "string" ? state.code : String(state.code || "");
      const tokens = highlightCode(codeString, state.language);
      setState((prev) => ({ ...prev, tokens }));
    } catch (error) {
      console.error("Failed to highlight code:", error);
      setState((prev) => ({ ...prev, tokens: undefined }));
    }
  }, [state.code, state.language, enableSyntaxHighlighting]);

  // Handle framework tab change
  const handleFrameworkChange = (framework: Framework) => {
    const tabs = code as FrameworkTab[];
    const tab = tabs.find((t) => t.framework === framework);
    if (tab) {
      setState((prev) => ({
        ...prev,
        activeFramework: framework,
        code: tab.code,
        language: framework,
        tokens: undefined, // Reset to trigger re-highlight
      }));
      onFrameworkChange?.(framework);
    }
  };

  // Handle copy button click
  const handleCopy = async () => {
    try {
      const textToCopy =
        typeof state.code === "string" ? state.code : String(state.code || "");
      await navigator.clipboard.writeText(textToCopy);
      setState((prev) => ({ ...prev, copied: true }));
      onCopy?.(textToCopy);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setState((prev) => ({ ...prev, copied: false }));
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  // Handle download button click
  const handleDownload = () => {
    const textToDownload =
      typeof state.code === "string" ? state.code : String(state.code || "");
    const blob = new Blob([textToDownload], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${state.language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onDownload?.(textToDownload, state.language);
  };

  // Handle share button click
  const handleShare = () => {
    const textToShare =
      typeof state.code === "string" ? state.code : String(state.code || "");
    onShare?.(textToShare);
  };

  // Ensure code is always a string
  const codeString =
    typeof state.code === "string" ? state.code : String(state.code || "");

  // Split code into lines for line numbers
  const lines = showLineNumbers ? codeString.split("\n") : [];

  // Determine if we should show header
  const shouldShowHeader = !hideHeader && (title || meta || isMultiFramework);

  // Determine if we should show actions
  const shouldShowActions =
    !hideActions &&
    (showCopy || showDownload || showShare || customActions || infoBadge);

  // Get display language label
  const displayLanguage = state.language.toUpperCase();

  // Convert maxHeight to string
  const maxHeightValue =
    typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

  // Render highlighted tokens
  function renderHighlightedTokens(tokens: HighlightedToken[]) {
    return tokens.map((token, index) => (
      <span
        key={`token-${index}-${token.type}-${token.content.slice(0, 10)}`}
        className={cn(styles.token, styles[`token--${token.type}`])}
      >
        {token.content}
      </span>
    ));
  }

  // Render highlighted line (for line numbers)
  function renderHighlightedLine(line: string, language: string) {
    const lineTokens = highlightLine(line, language);
    return lineTokens.map((token, index) => (
      <span
        key={`line-token-${index}-${token.type}-${token.content.slice(0, 10)}`}
        className={cn(styles.token, styles[`token--${token.type}`])}
      >
        {token.content}
      </span>
    ));
  }

  return (
    <section
      className={cn(
        styles.codeblock,
        variant === "compact" && styles["codeblock--compact"],
        variant === "minimal" && styles["codeblock--minimal"],
        className,
      )}
      aria-label={ariaLabel || `${displayLanguage} code example`}
    >
      {/* Header */}
      {shouldShowHeader && (
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            {title && <h3 className={styles.title}>{title}</h3>}
            <span className={styles.languageBadge}>{displayLanguage}</span>
          </div>
          {meta && <span className={styles.meta}>{meta}</span>}
        </div>
      )}

      {/* Framework Tabs */}
      {isMultiFramework && frameworks.length > 1 && (
        <div className={styles.tabs} role="tablist">
          {frameworks.map((framework) => {
            const tabs = code as FrameworkTab[];
            const tab = tabs.find((t) => t.framework === framework);
            const label = tab?.label || framework;

            return (
              <button
                key={framework}
                type="button"
                role="tab"
                aria-selected={state.activeFramework === framework}
                aria-controls={codeId}
                className={cn(
                  styles.tab,
                  state.activeFramework === framework && styles["tab--active"],
                )}
                onClick={() => handleFrameworkChange(framework)}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Code Display */}
      <div className={styles.codeWrapper}>
        <pre
          className={styles.code}
          style={{ maxHeight: maxHeightValue }}
          id={codeId}
          role="tabpanel"
          // biome-ignore lint/a11y/noNoninteractiveTabindex: Tabpanel role requires tabIndex for keyboard accessibility
          tabIndex={0}
        >
          {showLineNumbers ? (
            <code className={styles.codeContent}>
              {lines.map((line, index) => (
                <div
                  key={`line-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: Line numbers are stable
                    index
                  }`}
                  className={styles.line}
                >
                  <span className={styles.lineNumber}>{index + 1}</span>
                  <span className={styles.lineContent}>
                    {enableSyntaxHighlighting
                      ? renderHighlightedLine(line, state.language)
                      : line}
                  </span>
                </div>
              ))}
            </code>
          ) : (
            <code className={styles.codeContent}>
              {enableSyntaxHighlighting && state.tokens
                ? renderHighlightedTokens(state.tokens)
                : codeString}
            </code>
          )}
        </pre>
      </div>

      {/* Action Bar */}
      {shouldShowActions && (
        <div className={styles.actions}>
          <div className={styles.actionsLeft}>
            {showCopy && (
              <button
                type="button"
                className={cn(
                  styles.btn,
                  !showDownload && !showShare && styles["btn--primary"],
                )}
                onClick={handleCopy}
                aria-label={state.copied ? copiedLabel : copyButtonLabel}
              >
                {state.copied ? (
                  <>
                    <CheckIcon className={styles.btnIcon} />
                    {copiedLabel}
                  </>
                ) : (
                  <>
                    <CopyIcon className={styles.btnIcon} />
                    {copyButtonLabel}
                  </>
                )}
              </button>
            )}

            {showDownload && (
              <button
                type="button"
                className={styles.btn}
                onClick={handleDownload}
                aria-label={downloadButtonLabel}
              >
                <DownloadIcon className={styles.btnIcon} />
                {downloadButtonLabel}
              </button>
            )}

            {showShare && (
              <button
                type="button"
                className={styles.btn}
                onClick={handleShare}
                aria-label={shareButtonLabel}
              >
                <ShareIcon className={styles.btnIcon} />
                {shareButtonLabel}
              </button>
            )}
          </div>

          <div className={styles.actionsRight}>
            {infoBadge && <span className={styles.infoBadge}>{infoBadge}</span>}
            {customActions && (
              <div className={styles.customActions}>{customActions}</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
