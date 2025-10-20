/**
 * SidebarFooter Component Examples
 * Demonstrates sidebar footer usage
 *
 * @component SidebarFooter
 * @packageName @spexop/react
 * @description Simple wrapper for sidebar footer content
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 */

import { useId } from "react";
import { SidebarFooter } from "./SidebarFooter.js";

export function SidebarFooterExamples() {
  const versionSelectId = useId();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--s-spacing-6)",
        padding: "var(--s-spacing-6)",
        maxWidth: "400px",
      }}
    >
      {/* Example 1: Version Selector */}
      <div>
        <h3
          style={{
            marginBottom: "var(--s-spacing-4)",
            fontSize: "var(--s-font-size-lg)",
          }}
        >
          With Version Selector
        </h3>
        <div
          style={{
            border: "2px solid var(--s-color-neutral-200)",
            borderRadius: "var(--s-radius-md)",
            overflow: "hidden",
            background: "var(--s-color-neutral-50)",
          }}
        >
          {/* Simulated sidebar content */}
          <div
            style={{
              padding: "var(--s-spacing-5)",
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--s-color-neutral-500)",
              fontSize: "var(--s-font-size-sm)",
            }}
          >
            Sidebar content above
          </div>

          <SidebarFooter>
            <label
              htmlFor={versionSelectId}
              style={{
                display: "block",
                fontSize: "var(--s-font-size-xs)",
                fontWeight: "var(--s-font-weight-semibold)",
                color: "var(--s-color-neutral-700)",
                marginBottom: "var(--s-spacing-2)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Version
            </label>
            <select
              id={versionSelectId}
              style={{
                width: "100%",
                padding: "var(--s-spacing-2) var(--s-spacing-3)",
                border: "1px solid var(--s-color-neutral-300)",
                borderRadius: "var(--s-radius-sm)",
                fontSize: "var(--s-font-size-sm)",
                fontFamily: "inherit",
                background: "var(--s-color-neutral-50)",
                cursor: "pointer",
              }}
            >
              <option>v3.0 (latest)</option>
              <option>v2.5</option>
              <option>v2.0</option>
              <option>v1.0</option>
            </select>
          </SidebarFooter>
        </div>
      </div>

      {/* Example 2: Footer Links */}
      <div>
        <h3
          style={{
            marginBottom: "var(--s-spacing-4)",
            fontSize: "var(--s-font-size-lg)",
          }}
        >
          With Footer Links
        </h3>
        <div
          style={{
            border: "2px solid var(--s-color-neutral-200)",
            borderRadius: "var(--s-radius-md)",
            overflow: "hidden",
            background: "var(--s-color-neutral-50)",
          }}
        >
          {/* Simulated sidebar content */}
          <div
            style={{
              padding: "var(--s-spacing-5)",
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--s-color-neutral-500)",
              fontSize: "var(--s-font-size-sm)",
            }}
          >
            Sidebar content above
          </div>

          <SidebarFooter>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--s-spacing-2)",
              }}
            >
              <a
                href="#changelog"
                style={{
                  fontSize: "var(--s-font-size-xs)",
                  color: "var(--s-color-neutral-600)",
                  textDecoration: "none",
                }}
              >
                Changelog
              </a>
              <a
                href="#github"
                style={{
                  fontSize: "var(--s-font-size-xs)",
                  color: "var(--s-color-neutral-600)",
                  textDecoration: "none",
                }}
              >
                GitHub
              </a>
              <a
                href="#support"
                style={{
                  fontSize: "var(--s-font-size-xs)",
                  color: "var(--s-color-neutral-600)",
                  textDecoration: "none",
                }}
              >
                Support
              </a>
            </div>
          </SidebarFooter>
        </div>
      </div>

      {/* Example 3: Custom Content */}
      <div>
        <h3
          style={{
            marginBottom: "var(--s-spacing-4)",
            fontSize: "var(--s-font-size-lg)",
          }}
        >
          With Custom Content
        </h3>
        <div
          style={{
            border: "2px solid var(--s-color-neutral-200)",
            borderRadius: "var(--s-radius-md)",
            overflow: "hidden",
            background: "var(--s-color-neutral-50)",
          }}
        >
          {/* Simulated sidebar content */}
          <div
            style={{
              padding: "var(--s-spacing-5)",
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--s-color-neutral-500)",
              fontSize: "var(--s-font-size-sm)",
            }}
          >
            Sidebar content above
          </div>

          <SidebarFooter>
            <div
              style={{
                fontSize: "var(--s-font-size-xs)",
                color: "var(--s-color-neutral-600)",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, marginBottom: "var(--s-spacing-1)" }}>
                Spexop Design System
              </p>
              <p style={{ margin: 0, color: "var(--s-color-neutral-500)" }}>
                v3.0.0
              </p>
            </div>
          </SidebarFooter>
        </div>
      </div>

      {/* Testing Instructions */}
      <div
        style={{
          marginTop: "var(--s-spacing-6)",
          padding: "var(--s-spacing-5)",
          background: "var(--s-color-blue-50)",
          border: "2px solid var(--s-color-blue-200)",
          borderRadius: "var(--s-radius-md)",
        }}
      >
        <h3
          style={{
            marginBottom: "var(--s-spacing-3)",
            fontSize: "var(--s-font-size-lg)",
          }}
        >
          Testing Instructions
        </h3>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "var(--s-spacing-2)",
            fontSize: "var(--s-font-size-sm)",
          }}
        >
          <li>✓ Check 2px border-top separator</li>
          <li>✓ Verify spacing-5 padding</li>
          <li>✓ Test with different content types</li>
          <li>✓ Version selector should be functional</li>
          <li>✓ Links should be clickable</li>
          <li>✓ Simple and clean appearance</li>
        </ul>
      </div>
    </div>
  );
}
