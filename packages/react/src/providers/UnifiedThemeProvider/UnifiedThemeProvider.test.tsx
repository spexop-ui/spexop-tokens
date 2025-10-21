/**
 * UnifiedThemeProvider Tests
 * Comprehensive test suite for unified theme provider
 */

import type { SpexopThemeConfig } from "@spexop/theme";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  UnifiedThemeProvider,
  useUnifiedTheme,
} from "./UnifiedThemeProvider.js";

// Test component that uses the theme hook
function TestComponent() {
  const {
    mode,
    resolvedMode,
    systemMode,
    setMode,
    currentTheme,
    isInitializing,
    prefersReducedMotion,
  } = useUnifiedTheme();

  return (
    <div>
      <div data-testid="mode">{mode}</div>
      <div data-testid="resolved-mode">{resolvedMode}</div>
      <div data-testid="system-mode">{systemMode}</div>
      <div data-testid="initializing">{String(isInitializing)}</div>
      <div data-testid="reduced-motion">{String(prefersReducedMotion)}</div>
      <div data-testid="has-theme">{String(!!currentTheme)}</div>
      <button type="button" onClick={() => setMode("light")}>
        Set Light
      </button>
      <button type="button" onClick={() => setMode("dark")}>
        Set Dark
      </button>
      <button type="button" onClick={() => setMode("auto")}>
        Set Auto
      </button>
    </div>
  );
}

// Mock theme configs
const mockLightTheme: SpexopThemeConfig = {
  meta: {
    name: "light-theme",
    version: "1.0.0",
  },
  colors: {
    primary: "#3b82f6",
    surface: "#ffffff",
    surfaceSecondary: "#f9fafb",
    surfaceHover: "#f3f4f6",
    text: "#000000",
    textSecondary: "#4b5563",
    textMuted: "#9ca3af",
    border: "#e5e5e5",
    borderStrong: "#d1d5db",
    borderSubtle: "#f3f4f6",
  },
  typography: {
    fontFamily: "sans-serif",
    baseSize: 16,
    scale: 1.25,
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    baseUnit: 4,
    scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96],
  },
  borders: {
    thin: 1,
    default: 2,
    thick: 4,
    radiusSubtle: 4,
    radiusRelaxed: 8,
    radiusPill: 9999,
    defaultStyle: "solid",
  },
  breakpoints: {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1440,
    "2xl": 1920,
  },
};

const mockDarkTheme: SpexopThemeConfig = {
  ...mockLightTheme,
  meta: {
    name: "dark-theme",
    version: "1.0.0",
  },
  colors: {
    primary: "#3b82f6",
    surface: "#000000",
    surfaceSecondary: "#1a1a1a",
    surfaceHover: "#2a2a2a",
    text: "#ffffff",
    textSecondary: "#d1d5db",
    textMuted: "#6b7280",
    border: "#333333",
    borderStrong: "#4b5563",
    borderSubtle: "#262626",
  },
};

describe("UnifiedThemeProvider", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset document theme attribute
    document.documentElement.removeAttribute("data-theme");
    // Clear console spies
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should render children", () => {
      render(
        <UnifiedThemeProvider>
          <div data-testid="child">Test Child</div>
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("should start with auto mode by default", () => {
      render(
        <UnifiedThemeProvider>
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("mode")).toHaveTextContent("auto");
    });

    it("should respect defaultMode prop", () => {
      render(
        <UnifiedThemeProvider defaultMode="dark">
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("mode")).toHaveTextContent("dark");
    });

    it("should set data-theme attribute on document", async () => {
      render(
        <UnifiedThemeProvider mode="light">
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      await waitFor(() => {
        expect(document.documentElement.getAttribute("data-theme")).toBe(
          "light",
        );
      });
    });
  });

  describe("Mode Management", () => {
    it("should change mode via setMode", () => {
      render(
        <UnifiedThemeProvider>
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("mode")).toHaveTextContent("auto");

      const lightButton = screen.getByText("Set Light");

      act(() => {
        fireEvent.click(lightButton);
      });

      expect(screen.getByTestId("mode")).toHaveTextContent("light");
    });

    it("should update document theme attribute when mode changes", async () => {
      render(
        <UnifiedThemeProvider>
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      const darkButton = screen.getByText("Set Dark");

      act(() => {
        fireEvent.click(darkButton);
      });

      await waitFor(() => {
        expect(document.documentElement.getAttribute("data-theme")).toBe(
          "dark",
        );
      });
    });

    it("should resolve auto mode to system preference", () => {
      // Mock matchMedia for light mode
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: false, // Light mode
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      render(
        <UnifiedThemeProvider mode="auto">
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("resolved-mode")).toHaveTextContent("light");
    });
  });

  describe("LocalStorage Persistence", () => {
    it("should save mode to localStorage", () => {
      render(
        <UnifiedThemeProvider storageKey="test-theme-mode">
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      const darkButton = screen.getByText("Set Dark");

      act(() => {
        fireEvent.click(darkButton);
      });

      expect(localStorage.getItem("test-theme-mode")).toBe("dark");
    });

    it("should load mode from localStorage", () => {
      localStorage.setItem("test-theme-mode", "dark");

      render(
        <UnifiedThemeProvider storageKey="test-theme-mode">
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("mode")).toHaveTextContent("dark");
    });

    it("should not use localStorage when disableStorage is true", () => {
      render(
        <UnifiedThemeProvider
          storageKey="test-theme-mode"
          disableStorage={true}
        >
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      const darkButton = screen.getByText("Set Dark");

      act(() => {
        fireEvent.click(darkButton);
      });

      expect(localStorage.getItem("test-theme-mode")).toBeNull();
    });

    it("should use default storage key", () => {
      render(
        <UnifiedThemeProvider>
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      const darkButton = screen.getByText("Set Dark");

      act(() => {
        fireEvent.click(darkButton);
      });

      expect(localStorage.getItem("spexop-theme-mode")).toBe("dark");
    });
  });

  describe("Theme Configuration", () => {
    it("should inject single theme CSS", () => {
      render(
        <UnifiedThemeProvider theme={mockLightTheme}>
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("has-theme")).toHaveTextContent("true");

      // Check that style element was created
      const styleElement = document.querySelector("style[data-spexop-theme]");
      expect(styleElement).toBeInTheDocument();
    });

    it("should support multi-theme configuration", () => {
      render(
        <UnifiedThemeProvider themes={[mockLightTheme, mockDarkTheme]}>
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("has-theme")).toHaveTextContent("true");
    });

    it("should select default theme from multi-theme array", () => {
      function ThemeNameComponent() {
        const { currentTheme } = useUnifiedTheme();
        return <div data-testid="theme-name">{currentTheme?.meta.name}</div>;
      }

      render(
        <UnifiedThemeProvider
          themes={[mockLightTheme, mockDarkTheme]}
          defaultTheme="dark-theme"
        >
          <ThemeNameComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("theme-name")).toHaveTextContent("dark-theme");
    });

    it("should clean up style element on unmount", () => {
      const { unmount } = render(
        <UnifiedThemeProvider theme={mockLightTheme}>
          <div>Content</div>
        </UnifiedThemeProvider>,
      );

      expect(
        document.querySelector("style[data-spexop-theme]"),
      ).toBeInTheDocument();

      unmount();

      expect(
        document.querySelector("style[data-spexop-theme]"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Controlled Mode", () => {
    it("should use controlled mode prop", () => {
      render(
        <UnifiedThemeProvider mode="dark">
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("mode")).toHaveTextContent("dark");
    });

    it("should warn when trying to change controlled mode", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      render(
        <UnifiedThemeProvider mode="dark">
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      const lightButton = screen.getByText("Set Light");

      act(() => {
        fireEvent.click(lightButton);
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Cannot change mode when controlled"),
      );

      consoleSpy.mockRestore();
    });
  });

  describe("Forced Mode", () => {
    it("should override mode with forcedMode", () => {
      render(
        <UnifiedThemeProvider mode="light" forcedMode="dark">
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("resolved-mode")).toHaveTextContent("dark");
    });
  });

  describe("System Preference Detection", () => {
    it("should detect system dark mode", () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === "(prefers-color-scheme: dark)",
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      render(
        <UnifiedThemeProvider>
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("system-mode")).toHaveTextContent("dark");
    });

    it("should disable system mode detection when disableSystemMode is true", () => {
      render(
        <UnifiedThemeProvider disableSystemMode={true}>
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      // Should default to light
      expect(screen.getByTestId("system-mode")).toHaveTextContent("light");
    });
  });

  describe("Reduced Motion Support", () => {
    it("should detect prefers-reduced-motion", () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === "(prefers-reduced-motion: reduce)",
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      render(
        <UnifiedThemeProvider>
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("reduced-motion")).toHaveTextContent("true");
    });
  });

  describe("Initialization State", () => {
    it("should mark initialization as complete", async () => {
      render(
        <UnifiedThemeProvider>
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      await waitFor(() => {
        expect(screen.getByTestId("initializing")).toHaveTextContent("false");
      });
    });
  });

  describe("useUnifiedTheme Hook", () => {
    it("should throw error when used outside provider", () => {
      // Suppress console error for this test
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        render(
          <div>
            <TestComponent />
          </div>,
        );
      }).toThrow("useUnifiedTheme must be used within a UnifiedThemeProvider");

      consoleError.mockRestore();
    });

    it("should provide theme context when inside provider", () => {
      render(
        <UnifiedThemeProvider>
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("mode")).toBeInTheDocument();
      expect(screen.getByTestId("resolved-mode")).toBeInTheDocument();
    });
  });

  describe("SSR Safety", () => {
    it("should handle missing window gracefully", () => {
      const originalWindow = global.window;
      // Temporarily remove window for SSR testing
      const windowDescriptor = Object.getOwnPropertyDescriptor(
        global,
        "window",
      );
      Object.defineProperty(global, "window", {
        value: undefined,
        writable: true,
        configurable: true,
      });

      expect(() => {
        render(
          <UnifiedThemeProvider>
            <TestComponent />
          </UnifiedThemeProvider>,
        );
      }).not.toThrow();

      // Restore window
      if (windowDescriptor) {
        Object.defineProperty(global, "window", windowDescriptor);
      }
    });
  });

  describe("Performance", () => {
    it("should memoize context value", () => {
      const { rerender } = render(
        <UnifiedThemeProvider>
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      const mode1 = screen.getByTestId("mode").textContent;

      // Rerender without state change
      rerender(
        <UnifiedThemeProvider>
          <TestComponent />
        </UnifiedThemeProvider>,
      );

      const mode2 = screen.getByTestId("mode").textContent;

      expect(mode1).toBe(mode2);
    });

    it("should memoize CSS generation", () => {
      const { rerender } = render(
        <UnifiedThemeProvider theme={mockLightTheme}>
          <div>Content</div>
        </UnifiedThemeProvider>,
      );

      const styleElement1 = document.querySelector("style[data-spexop-theme]");
      const content1 = styleElement1?.textContent;

      // Rerender without theme change
      rerender(
        <UnifiedThemeProvider theme={mockLightTheme}>
          <div>Content</div>
        </UnifiedThemeProvider>,
      );

      const styleElement2 = document.querySelector("style[data-spexop-theme]");
      const content2 = styleElement2?.textContent;

      expect(content1).toBe(content2);
    });
  });

  describe("Theme Switching", () => {
    it("should switch between themes", () => {
      function ThemeSwitchComponent() {
        const { currentTheme, setTheme, availableThemes } = useUnifiedTheme();

        return (
          <div>
            <div data-testid="current-theme">{currentTheme?.meta.name}</div>
            <button
              type="button"
              onClick={() => {
                const newTheme = availableThemes.find(
                  (t) => t.meta.name === "dark-theme",
                );
                if (newTheme && setTheme) setTheme(newTheme);
              }}
            >
              Switch to Dark
            </button>
          </div>
        );
      }

      render(
        <UnifiedThemeProvider themes={[mockLightTheme, mockDarkTheme]}>
          <ThemeSwitchComponent />
        </UnifiedThemeProvider>,
      );

      expect(screen.getByTestId("current-theme")).toHaveTextContent(
        "light-theme",
      );

      const switchButton = screen.getByText("Switch to Dark");

      act(() => {
        fireEvent.click(switchButton);
      });

      expect(screen.getByTestId("current-theme")).toHaveTextContent(
        "dark-theme",
      );
    });
  });

  describe("Scope Customization", () => {
    it("should accept custom scope for CSS variables", () => {
      render(
        <UnifiedThemeProvider theme={mockLightTheme} scope=".custom-scope">
          <div>Content</div>
        </UnifiedThemeProvider>,
      );

      const styleElement = document.querySelector("style[data-spexop-theme]");
      expect(styleElement?.textContent).toContain(".custom-scope");
    });
  });
});
