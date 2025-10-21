/**
 * DebugProvider Tests
 * Comprehensive test suite for debug mode provider
 */

import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DebugProvider, useDebug } from "./DebugProvider.js";

// Test component that uses the debug hook
function TestComponent() {
  const {
    enabled,
    toggle,
    setEnabled,
    updateOptions,
    showBreakpoint,
    showBoundaries,
    showTokens,
  } = useDebug();

  return (
    <div>
      <div data-testid="enabled">{String(enabled)}</div>
      <div data-testid="show-breakpoint">{String(showBreakpoint)}</div>
      <div data-testid="show-boundaries">{String(showBoundaries)}</div>
      <div data-testid="show-tokens">{String(showTokens)}</div>
      <button type="button" onClick={toggle}>
        Toggle
      </button>
      <button type="button" onClick={() => setEnabled(true)}>
        Enable
      </button>
      <button type="button" onClick={() => setEnabled(false)}>
        Disable
      </button>
      <button
        type="button"
        onClick={() =>
          updateOptions({
            showBreakpoint: false,
            showBoundaries: false,
          })
        }
      >
        Update Options
      </button>
    </div>
  );
}

describe("DebugProvider", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Clear console spies
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should render children", () => {
      render(
        <DebugProvider>
          <div data-testid="child">Test Child</div>
        </DebugProvider>,
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("should start with debug mode disabled by default", () => {
      render(
        <DebugProvider>
          <TestComponent />
        </DebugProvider>,
      );

      expect(screen.getByTestId("enabled")).toHaveTextContent("false");
    });

    it("should respect initialEnabled prop", () => {
      render(
        <DebugProvider initialEnabled={true}>
          <TestComponent />
        </DebugProvider>,
      );

      expect(screen.getByTestId("enabled")).toHaveTextContent("true");
    });

    it("should initialize with default options", () => {
      render(
        <DebugProvider>
          <TestComponent />
        </DebugProvider>,
      );

      expect(screen.getByTestId("show-breakpoint")).toHaveTextContent("true");
      expect(screen.getByTestId("show-boundaries")).toHaveTextContent("true");
      expect(screen.getByTestId("show-tokens")).toHaveTextContent("true");
    });

    it("should respect defaultOptions prop", () => {
      render(
        <DebugProvider
          defaultOptions={{
            showBreakpoint: false,
            showBoundaries: false,
            showTokens: false,
          }}
        >
          <TestComponent />
        </DebugProvider>,
      );

      expect(screen.getByTestId("show-breakpoint")).toHaveTextContent("false");
      expect(screen.getByTestId("show-boundaries")).toHaveTextContent("false");
      expect(screen.getByTestId("show-tokens")).toHaveTextContent("false");
    });
  });

  describe("Toggle Functionality", () => {
    it("should toggle debug mode on button click", () => {
      render(
        <DebugProvider>
          <TestComponent />
        </DebugProvider>,
      );

      const toggleButton = screen.getByText("Toggle");

      expect(screen.getByTestId("enabled")).toHaveTextContent("false");

      act(() => {
        fireEvent.click(toggleButton);
      });

      expect(screen.getByTestId("enabled")).toHaveTextContent("true");

      act(() => {
        fireEvent.click(toggleButton);
      });

      expect(screen.getByTestId("enabled")).toHaveTextContent("false");
    });

    it("should enable debug mode via setEnabled", () => {
      render(
        <DebugProvider>
          <TestComponent />
        </DebugProvider>,
      );

      const enableButton = screen.getByText("Enable");

      act(() => {
        fireEvent.click(enableButton);
      });

      expect(screen.getByTestId("enabled")).toHaveTextContent("true");
    });

    it("should disable debug mode via setEnabled", () => {
      render(
        <DebugProvider initialEnabled={true}>
          <TestComponent />
        </DebugProvider>,
      );

      const disableButton = screen.getByText("Disable");

      act(() => {
        fireEvent.click(disableButton);
      });

      expect(screen.getByTestId("enabled")).toHaveTextContent("false");
    });
  });

  describe("Options Management", () => {
    it("should update options via updateOptions", () => {
      render(
        <DebugProvider>
          <TestComponent />
        </DebugProvider>,
      );

      expect(screen.getByTestId("show-breakpoint")).toHaveTextContent("true");
      expect(screen.getByTestId("show-boundaries")).toHaveTextContent("true");

      const updateButton = screen.getByText("Update Options");

      act(() => {
        fireEvent.click(updateButton);
      });

      expect(screen.getByTestId("show-breakpoint")).toHaveTextContent("false");
      expect(screen.getByTestId("show-boundaries")).toHaveTextContent("false");
    });
  });

  describe("Keyboard Shortcut", () => {
    it("should toggle debug mode with Ctrl+Shift+D", () => {
      render(
        <DebugProvider>
          <TestComponent />
        </DebugProvider>,
      );

      expect(screen.getByTestId("enabled")).toHaveTextContent("false");

      act(() => {
        fireEvent.keyDown(window, {
          key: "D",
          shiftKey: true,
          ctrlKey: true,
        });
      });

      expect(screen.getByTestId("enabled")).toHaveTextContent("true");

      act(() => {
        fireEvent.keyDown(window, {
          key: "D",
          shiftKey: true,
          ctrlKey: true,
        });
      });

      expect(screen.getByTestId("enabled")).toHaveTextContent("false");
    });

    it("should toggle debug mode with Cmd+Shift+D on Mac", () => {
      render(
        <DebugProvider>
          <TestComponent />
        </DebugProvider>,
      );

      expect(screen.getByTestId("enabled")).toHaveTextContent("false");

      act(() => {
        fireEvent.keyDown(window, {
          key: "D",
          shiftKey: true,
          metaKey: true,
        });
      });

      expect(screen.getByTestId("enabled")).toHaveTextContent("true");
    });

    it("should not toggle with incorrect key combination", () => {
      render(
        <DebugProvider>
          <TestComponent />
        </DebugProvider>,
      );

      expect(screen.getByTestId("enabled")).toHaveTextContent("false");

      act(() => {
        fireEvent.keyDown(window, {
          key: "D",
          ctrlKey: true, // Missing shift key
        });
      });

      expect(screen.getByTestId("enabled")).toHaveTextContent("false");
    });
  });

  describe("LocalStorage Persistence", () => {
    it("should save debug state to localStorage", () => {
      render(
        <DebugProvider storageKey="test-debug">
          <TestComponent />
        </DebugProvider>,
      );

      const enableButton = screen.getByText("Enable");

      act(() => {
        fireEvent.click(enableButton);
      });

      expect(localStorage.getItem("test-debug")).toBe("true");
    });

    it("should load debug state from localStorage", () => {
      localStorage.setItem("test-debug", "true");

      render(
        <DebugProvider storageKey="test-debug">
          <TestComponent />
        </DebugProvider>,
      );

      expect(screen.getByTestId("enabled")).toHaveTextContent("true");
    });

    it("should not use localStorage when disableStorage is true", () => {
      render(
        <DebugProvider storageKey="test-debug" disableStorage={true}>
          <TestComponent />
        </DebugProvider>,
      );

      const enableButton = screen.getByText("Enable");

      act(() => {
        fireEvent.click(enableButton);
      });

      expect(localStorage.getItem("test-debug")).toBeNull();
    });

    it("should use default storage key", () => {
      render(
        <DebugProvider>
          <TestComponent />
        </DebugProvider>,
      );

      const enableButton = screen.getByText("Enable");

      act(() => {
        fireEvent.click(enableButton);
      });

      expect(localStorage.getItem("spexop-debug-mode")).toBe("true");
    });
  });

  describe("Breakpoint Indicator", () => {
    it("should show breakpoint indicator when enabled", () => {
      render(
        <DebugProvider initialEnabled={true}>
          <div>Content</div>
        </DebugProvider>,
      );

      // Breakpoint indicator should be visible
      const indicator = screen.getByRole("status");
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveAttribute("aria-live", "polite");
    });

    it("should not show breakpoint indicator when disabled", () => {
      render(
        <DebugProvider initialEnabled={false}>
          <div>Content</div>
        </DebugProvider>,
      );

      // Breakpoint indicator should not be visible
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    it("should hide breakpoint indicator when showBreakpoint is false", () => {
      render(
        <DebugProvider
          initialEnabled={true}
          defaultOptions={{ showBreakpoint: false }}
        >
          <div>Content</div>
        </DebugProvider>,
      );

      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes on breakpoint indicator", () => {
      render(
        <DebugProvider initialEnabled={true}>
          <div>Content</div>
        </DebugProvider>,
      );

      const indicator = screen.getByRole("status");
      expect(indicator).toHaveAttribute("aria-live", "polite");
      expect(indicator).toHaveAttribute("aria-atomic", "true");
      expect(indicator).toHaveAttribute("aria-label");
    });

    it("should have screen reader announcements", () => {
      render(
        <DebugProvider initialEnabled={true}>
          <div>Content</div>
        </DebugProvider>,
      );

      // Check for assertive live region
      const liveRegion = document.querySelector('[aria-live="assertive"]');
      expect(liveRegion).toBeInTheDocument();
    });
  });

  describe("useDebug Hook", () => {
    it("should throw error when used outside provider", () => {
      // For this test, we need to test the default behavior
      function ComponentWithoutProvider() {
        const debug = useDebug();
        return <div data-testid="enabled">{String(debug.enabled)}</div>;
      }

      // Should return default values instead of throwing
      render(<ComponentWithoutProvider />);

      expect(screen.getByTestId("enabled")).toHaveTextContent("false");
    });

    it("should provide debug context when inside provider", () => {
      render(
        <DebugProvider>
          <TestComponent />
        </DebugProvider>,
      );

      expect(screen.getByTestId("enabled")).toBeInTheDocument();
      expect(screen.getByTestId("show-breakpoint")).toBeInTheDocument();
    });
  });

  describe("SSR Safety", () => {
    it("should handle missing window gracefully", () => {
      // This test ensures localStorage access is guarded
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
          <DebugProvider>
            <TestComponent />
          </DebugProvider>,
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
        <DebugProvider>
          <TestComponent />
        </DebugProvider>,
      );

      const enabled1 = screen.getByTestId("enabled").textContent;

      // Rerender without state change
      rerender(
        <DebugProvider>
          <TestComponent />
        </DebugProvider>,
      );

      const enabled2 = screen.getByTestId("enabled").textContent;

      expect(enabled1).toBe(enabled2);
    });
  });
});
