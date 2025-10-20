/**
 * NavLink Component Examples
 * Demonstrates various NavLink use cases
 *
 * @component NavLink
 * @packageName @spexop/react
 * @description Navigation link for sidebar with active state support
 * @author @spexop-ui | github.com/spexop-ui |  @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 */

import { NavLink } from "./NavLink.js";

export function NavLinkExamples() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log("Link clicked:", e.currentTarget.href);
  };

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
      {/* Example 1: Basic NavLink */}
      <div>
        <h3
          style={{
            marginBottom: "var(--s-spacing-4)",
            fontSize: "var(--s-font-size-lg)",
          }}
        >
          Basic NavLink
        </h3>
        <div
          style={{
            border: "2px solid var(--s-color-neutral-200)",
            borderRadius: "var(--s-radius-md)",
          }}
        >
          <NavLink href="/components" onClick={handleClick}>
            Components
          </NavLink>
        </div>
      </div>

      {/* Example 2: Active NavLink */}
      <div>
        <h3
          style={{
            marginBottom: "var(--s-spacing-4)",
            fontSize: "var(--s-font-size-lg)",
          }}
        >
          Active NavLink
        </h3>
        <div
          style={{
            border: "2px solid var(--s-color-neutral-200)",
            borderRadius: "var(--s-radius-md)",
          }}
        >
          <NavLink href="/components/button" active onClick={handleClick}>
            Button
          </NavLink>
        </div>
      </div>

      {/* Example 3: Multiple NavLinks (Sidebar Simulation) */}
      <div>
        <h3
          style={{
            marginBottom: "var(--s-spacing-4)",
            fontSize: "var(--s-font-size-lg)",
          }}
        >
          Navigation List
        </h3>
        <nav
          style={{
            border: "2px solid var(--s-color-neutral-200)",
            borderRadius: "var(--s-radius-md)",
            background: "var(--s-color-neutral-50)",
          }}
        >
          <NavLink href="/getting-started" onClick={handleClick}>
            Getting Started
          </NavLink>
          <NavLink href="/components" active onClick={handleClick}>
            Components
          </NavLink>
          <NavLink href="/tokens" onClick={handleClick}>
            Design Tokens
          </NavLink>
          <NavLink href="/icons" onClick={handleClick}>
            Icons
          </NavLink>
        </nav>
      </div>

      {/* Example 4: With Custom Class */}
      <div>
        <h3
          style={{
            marginBottom: "var(--s-spacing-4)",
            fontSize: "var(--s-font-size-lg)",
          }}
        >
          With Custom Class
        </h3>
        <div
          style={{
            border: "2px solid var(--s-color-neutral-200)",
            borderRadius: "var(--s-radius-md)",
          }}
        >
          <NavLink
            href="/custom"
            onClick={handleClick}
            className="custom-nav-link"
          >
            Custom Styled Link
          </NavLink>
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
          <li>✓ Hover over links to see background change</li>
          <li>✓ Notice the red left border on active link</li>
          <li>✓ Tab through links to see focus states</li>
          <li>✓ Click links to see console logs</li>
          <li>✓ Active link has semibold font weight</li>
          <li>✓ All links have 48px min-height (touch targets)</li>
        </ul>
      </div>
    </div>
  );
}
