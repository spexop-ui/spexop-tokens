/**
 * NavSection Component Examples
 * Demonstrates accordion-style navigation sections
 *
 * @component NavSection
 * @packageName @spexop/react
 * @description Accordion-style navigation section for sidebar with expand/collapse
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 */

import { useState } from "react";
import { NavLink } from "../NavLink/NavLink.js";
import { NavSection } from "./NavSection.js";

export function NavSectionExamples() {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "components",
  );

  const handleToggle = (sectionId: string) => (isOpen: boolean) => {
    // Auto-close other sections (accordion behavior)
    setExpandedSection(isOpen ? sectionId : null);
    console.log(`Section "${sectionId}" ${isOpen ? "opened" : "closed"}`);
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
      {/* Example 1: Basic NavSection */}
      <div>
        <h3
          style={{
            marginBottom: "var(--s-spacing-4)",
            fontSize: "var(--s-font-size-lg)",
          }}
        >
          Basic NavSection
        </h3>
        <div
          style={{
            border: "2px solid var(--s-color-neutral-200)",
            borderRadius: "var(--s-radius-md)",
            background: "var(--s-color-neutral-50)",
            overflow: "hidden",
          }}
        >
          <NavSection label="Components" defaultOpen>
            <NavLink href="/button">Button</NavLink>
            <NavLink href="/card">Card</NavLink>
            <NavLink href="/badge">Badge</NavLink>
          </NavSection>
        </div>
      </div>

      {/* Example 2: Multiple Sections (Accordion) */}
      <div>
        <h3
          style={{
            marginBottom: "var(--s-spacing-4)",
            fontSize: "var(--s-font-size-lg)",
          }}
        >
          Multiple Sections (Accordion)
        </h3>
        <nav
          style={{
            border: "2px solid var(--s-color-neutral-200)",
            borderRadius: "var(--s-radius-md)",
            background: "var(--s-color-neutral-50)",
            overflow: "hidden",
          }}
        >
          <NavSection
            label="Getting Started"
            defaultOpen={expandedSection === "getting-started"}
            onToggle={handleToggle("getting-started")}
          >
            <NavLink href="/installation">Installation</NavLink>
            <NavLink href="/quickstart">Quick Start</NavLink>
            <NavLink href="/configuration">Configuration</NavLink>
          </NavSection>

          <NavSection
            label="Components"
            defaultOpen={expandedSection === "components"}
            onToggle={handleToggle("components")}
          >
            <NavLink href="/button">Button</NavLink>
            <NavLink href="/card">Card</NavLink>
            <NavLink href="/badge">Badge</NavLink>
            <NavLink href="/icon">Icon</NavLink>
          </NavSection>

          <NavSection
            label="Foundation"
            defaultOpen={expandedSection === "foundation"}
            onToggle={handleToggle("foundation")}
          >
            <NavLink href="/grid">Grid</NavLink>
            <NavLink href="/stack">Stack</NavLink>
            <NavLink href="/container">Container</NavLink>
          </NavSection>

          <NavSection
            label="Design Tokens"
            defaultOpen={expandedSection === "tokens"}
            onToggle={handleToggle("tokens")}
          >
            <NavLink href="/colors">Colors</NavLink>
            <NavLink href="/spacing">Spacing</NavLink>
            <NavLink href="/typography">Typography</NavLink>
          </NavSection>
        </nav>
      </div>

      {/* Example 3: Section with Active Link */}
      <div>
        <h3
          style={{
            marginBottom: "var(--s-spacing-4)",
            fontSize: "var(--s-font-size-lg)",
          }}
        >
          With Active Link
        </h3>
        <div
          style={{
            border: "2px solid var(--s-color-neutral-200)",
            borderRadius: "var(--s-radius-md)",
            background: "var(--s-color-neutral-50)",
            overflow: "hidden",
          }}
        >
          <NavSection label="Components" defaultOpen>
            <NavLink href="/button">Button</NavLink>
            <NavLink href="/card" active>
              Card
            </NavLink>
            <NavLink href="/badge">Badge</NavLink>
            <NavLink href="/icon">Icon</NavLink>
          </NavSection>
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
          <li>✓ Click section headers to expand/collapse</li>
          <li>✓ Notice + icon rotates to × when open</li>
          <li>✓ Smooth max-height animation</li>
          <li>✓ Tab through sections (keyboard nav)</li>
          <li>✓ Accordion: only one section open at a time</li>
          <li>✓ Check console for toggle events</li>
          <li>✓ ARIA expanded attribute updates</li>
        </ul>
      </div>
    </div>
  );
}
