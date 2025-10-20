/**
 * TopBar Component Examples
 */

import { useState } from "react";
import { TopBar } from "./TopBar.js";

/**
 * Basic TopBar Example
 */
export function BasicTopBar() {
  return (
    <TopBar
      logoText="Spexop Design System"
      onLogoClick={() => console.log("Logo clicked")}
      onSearchClick={() => console.log("Search clicked")}
      onThemeToggle={() => console.log("Theme toggled")}
      gitHubUrl="https://github.com/spexop-ui"
    />
  );
}

/**
 * TopBar with State Management
 */
export function TopBarWithState() {
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleThemeToggle = () => {
    const nextTheme =
      theme === "light" ? "dark" : theme === "dark" ? "auto" : "light";
    setTheme(nextTheme);
  };

  return (
    <TopBar
      logoText="Spexop Design System"
      currentTheme={theme}
      onThemeToggle={handleThemeToggle}
      onMobileMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      onSearchClick={() => console.log("Open search modal")}
    />
  );
}

/**
 * TopBar with Custom GitHub Handler
 */
export function TopBarWithCustomGitHub() {
  const handleGitHubClick = () => {
    // Custom tracking or modal before opening GitHub
    console.log("GitHub link clicked");
    window.open("https://github.com/spexop-ui", "_blank");
  };

  return (
    <TopBar
      logoText="Spexop"
      onGitHubClick={handleGitHubClick}
      onSearchClick={() => console.log("Search")}
    />
  );
}

/**
 * Complete Example with Layout
 */
export function CompleteExample() {
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div style={{ paddingTop: "64px" }}>
      <TopBar
        logoText="Spexop Design System"
        currentTheme={theme}
        onLogoClick={() => {
          window.location.href = "/";
        }}
        onSearchClick={() => setIsSearchOpen(true)}
        onThemeToggle={() =>
          setTheme((prev) =>
            prev === "light" ? "dark" : prev === "dark" ? "auto" : "light",
          )
        }
        onMobileMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        gitHubUrl="https://github.com/spexop-ui"
      />

      {/* Your content here */}
      <main style={{ padding: "var(--s-spacing-6)" }}>
        <h1>Main Content</h1>
        <p>Sidebar is {isSidebarOpen ? "open" : "closed"}</p>
        <p>Search is {isSearchOpen ? "open" : "closed"}</p>
        <p>Theme: {theme}</p>
      </main>
    </div>
  );
}
