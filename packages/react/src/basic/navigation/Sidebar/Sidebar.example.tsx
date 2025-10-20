/**
 * Sidebar Component Examples
 * Demonstrates complete sidebar usage
 *
 * @component Sidebar
 * @packageName @spexop/react
 * @description Main sidebar with desktop side-by-side and mobile overlay
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 */

import { useId, useState } from "react";
import { NavLink } from "../NavLink/NavLink.js";
import { NavSection } from "../NavSection/NavSection.js";
import { SidebarFooter } from "../SidebarFooter/SidebarFooter.js";
import { TopBar } from "../TopBar/TopBar.js";
import { Sidebar } from "./Sidebar.js";

export function SidebarExamples() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("/button");
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "components",
  );
  const versionSelectId = useId();

  const handleSectionToggle = (sectionId: string) => (isOpen: boolean) => {
    setExpandedSection(isOpen ? sectionId : null);
  };

  const handleNavLinkClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActiveLink(href);
    };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* TopBar */}
      <TopBar
        logoText="Spexop Design System"
        onMobileMenuClick={() => setIsOpen(!isOpen)}
      />

      {/* Layout: Sidebar + Content */}
      <div style={{ display: "flex", paddingTop: "64px" }}>
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <NavSection
            label="Getting Started"
            defaultOpen={expandedSection === "getting-started"}
            onToggle={handleSectionToggle("getting-started")}
          >
            <NavLink
              href="/installation"
              active={activeLink === "/installation"}
              onClick={handleNavLinkClick("/installation")}
            >
              Installation
            </NavLink>
            <NavLink
              href="/quickstart"
              active={activeLink === "/quickstart"}
              onClick={handleNavLinkClick("/quickstart")}
            >
              Quick Start
            </NavLink>
            <NavLink
              href="/configuration"
              active={activeLink === "/configuration"}
              onClick={handleNavLinkClick("/configuration")}
            >
              Configuration
            </NavLink>
          </NavSection>

          <NavSection
            label="Components"
            defaultOpen={expandedSection === "components"}
            onToggle={handleSectionToggle("components")}
          >
            <NavLink
              href="/button"
              active={activeLink === "/button"}
              onClick={handleNavLinkClick("/button")}
            >
              Button
            </NavLink>
            <NavLink
              href="/card"
              active={activeLink === "/card"}
              onClick={handleNavLinkClick("/card")}
            >
              Card
            </NavLink>
            <NavLink
              href="/badge"
              active={activeLink === "/badge"}
              onClick={handleNavLinkClick("/badge")}
            >
              Badge
            </NavLink>
            <NavLink
              href="/icon"
              active={activeLink === "/icon"}
              onClick={handleNavLinkClick("/icon")}
            >
              Icon
            </NavLink>
          </NavSection>

          <NavSection
            label="Foundation"
            defaultOpen={expandedSection === "foundation"}
            onToggle={handleSectionToggle("foundation")}
          >
            <NavLink
              href="/grid"
              active={activeLink === "/grid"}
              onClick={handleNavLinkClick("/grid")}
            >
              Grid
            </NavLink>
            <NavLink
              href="/stack"
              active={activeLink === "/stack"}
              onClick={handleNavLinkClick("/stack")}
            >
              Stack
            </NavLink>
            <NavLink
              href="/container"
              active={activeLink === "/container"}
              onClick={handleNavLinkClick("/container")}
            >
              Container
            </NavLink>
          </NavSection>

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
        </Sidebar>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: "var(--s-spacing-8)",
            maxWidth: "1200px",
          }}
        >
          <h1
            style={{
              fontSize: "var(--s-font-size-4xl)",
              fontWeight: "var(--s-font-weight-bold)",
              marginBottom: "var(--s-spacing-4)",
            }}
          >
            Complete Sidebar Example
          </h1>

          <div
            style={{
              padding: "var(--s-spacing-6)",
              background: "var(--s-color-neutral-100)",
              border: "2px solid var(--s-color-neutral-200)",
              borderRadius: "var(--s-radius-md)",
            }}
          >
            <p
              style={{
                fontSize: "var(--s-font-size-lg)",
                marginBottom: "var(--s-spacing-4)",
              }}
            >
              <strong>Currently Active:</strong> {activeLink}
            </p>
            <p style={{ fontSize: "var(--s-font-size-md)" }}>
              <strong>Expanded Section:</strong> {expandedSection || "None"}
            </p>
          </div>

          <div
            style={{
              marginTop: "var(--s-spacing-8)",
              padding: "var(--s-spacing-6)",
              background: "var(--s-color-blue-50)",
              border: "2px solid var(--s-color-blue-200)",
              borderRadius: "var(--s-radius-md)",
            }}
          >
            <h2
              style={{
                fontSize: "var(--s-font-size-2xl)",
                marginBottom: "var(--s-spacing-4)",
              }}
            >
              Testing Instructions
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "var(--s-spacing-2)",
              }}
            >
              <li>✓ Desktop: Sidebar visible side-by-side</li>
              <li>✓ Mobile: Click hamburger to open overlay</li>
              <li>✓ Backdrop: Click to close on mobile</li>
              <li>✓ Escape: Press ESC to close on mobile</li>
              <li>✓ Focus: Tab stays within sidebar on mobile</li>
              <li>✓ Scroll: Body locked when sidebar open on mobile</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
