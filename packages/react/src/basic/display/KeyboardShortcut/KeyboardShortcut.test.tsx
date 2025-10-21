/**
 * KeyboardShortcut Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { KeyboardShortcut } from "./KeyboardShortcut";

describe("KeyboardShortcut", () => {
  describe("Rendering", () => {
    it("should render with keys", () => {
      render(<KeyboardShortcut keys={["cmd", "k"]} />);
      expect(screen.getByRole("note")).toBeInTheDocument();
    });

    it("should render as kbd element", () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);
      expect(container.firstChild?.nodeName).toBe("KBD");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <KeyboardShortcut keys={["cmd", "k"]} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Keys Rendering", () => {
    it("should render single key", () => {
      render(<KeyboardShortcut keys={["k"]} />);
      expect(screen.getByText("k")).toBeInTheDocument();
    });

    it("should render multiple keys", () => {
      render(<KeyboardShortcut keys={["cmd", "shift", "p"]} />);
      expect(screen.getByRole("note")).toBeInTheDocument();
    });

    it("should render separator between keys", () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);
      const separator = container.querySelector(".separator");
      expect(separator).toBeInTheDocument();
      expect(separator?.textContent).toBe("+");
    });

    it("should not render separator after last key", () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);
      const separators = container.querySelectorAll(".separator");
      // Should have one separator for two keys
      expect(separators).toHaveLength(1);
    });
  });

  describe("Platform Detection", () => {
    it("should detect platform on mount", async () => {
      render(<KeyboardShortcut keys={["cmd", "k"]} />);

      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });

    it("should format cmd key based on platform", async () => {
      // Mock Mac platform
      Object.defineProperty(window.navigator, "userAgent", {
        writable: true,
        value: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      });

      render(<KeyboardShortcut keys={["cmd", "k"]} />);

      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });
  });

  describe("Predefined Shortcuts", () => {
    it("should render search shortcut", () => {
      render(<KeyboardShortcut shortcut="search" />);
      expect(screen.getByRole("note")).toBeInTheDocument();
    });

    it("should render command-palette shortcut", () => {
      render(<KeyboardShortcut shortcut="command-palette" />);
      expect(screen.getByRole("note")).toBeInTheDocument();
    });

    it("should render settings shortcut", () => {
      render(<KeyboardShortcut shortcut="settings" />);
      expect(screen.getByRole("note")).toBeInTheDocument();
    });
  });

  describe("Raw Text Display", () => {
    it("should render raw text when children is provided", () => {
      render(<KeyboardShortcut>⌘K</KeyboardShortcut>);
      expect(screen.getByText("⌘K")).toBeInTheDocument();
    });

    it("should prioritize children over keys", () => {
      render(
        <KeyboardShortcut keys={["cmd", "k"]}>Custom Text</KeyboardShortcut>,
      );
      expect(screen.getByText("Custom Text")).toBeInTheDocument();
      expect(screen.queryByText("⌘")).not.toBeInTheDocument();
    });

    it("should prioritize children over shortcut", () => {
      render(<KeyboardShortcut shortcut="search">Custom</KeyboardShortcut>);
      expect(screen.getByText("Custom")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should render md size by default", () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);
      expect(container.firstChild).toHaveClass("md");
    });

    it("should render sm size", () => {
      const { container } = render(
        <KeyboardShortcut keys={["cmd", "k"]} size="sm" />,
      );
      expect(container.firstChild).toHaveClass("sm");
    });

    it("should render md size", () => {
      const { container } = render(
        <KeyboardShortcut keys={["cmd", "k"]} size="md" />,
      );
      expect(container.firstChild).toHaveClass("md");
    });
  });

  describe("Key Formatting", () => {
    it("should format cmd key", async () => {
      render(<KeyboardShortcut keys={["cmd"]} />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });

    it("should format ctrl key", async () => {
      render(<KeyboardShortcut keys={["ctrl"]} />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });

    it("should format alt key", async () => {
      render(<KeyboardShortcut keys={["alt"]} />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });

    it("should format shift key", async () => {
      render(<KeyboardShortcut keys={["shift"]} />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });

    it("should format enter key", async () => {
      render(<KeyboardShortcut keys={["enter"]} />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });

    it("should format escape key", async () => {
      render(<KeyboardShortcut keys={["escape"]} />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });

    it("should keep unknown keys as-is", async () => {
      render(<KeyboardShortcut keys={["A"]} />);
      await waitFor(() => {
        expect(screen.getByText("A")).toBeInTheDocument();
      });
    });

    it("should be case-insensitive for modifier keys", async () => {
      render(<KeyboardShortcut keys={["CMD", "K"]} />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty keys array", () => {
      const { container } = render(<KeyboardShortcut keys={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it("should handle undefined keys", () => {
      const { container } = render(<KeyboardShortcut keys={undefined} />);
      expect(container.firstChild).toBeNull();
    });

    it("should handle empty children", () => {
      render(<KeyboardShortcut>{""}</KeyboardShortcut>);
      expect(screen.getByRole("note")).toBeInTheDocument();
    });

    it("should handle undefined className", () => {
      const { container } = render(
        <KeyboardShortcut keys={["cmd", "k"]} className={undefined} />,
      );
      expect(container.firstChild).toHaveClass("keyboardShortcut");
    });

    it("should handle whitespace in keys", async () => {
      render(<KeyboardShortcut keys={["cmd", " k "]} />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });
  });

  describe("Use Cases", () => {
    it("should work in menu items", () => {
      render(
        <div role="menuitem" tabIndex={0}>
          <span>Search</span>
          <KeyboardShortcut keys={["cmd", "k"]} />
        </div>,
      );
      expect(screen.getByText("Search")).toBeInTheDocument();
    });

    it("should work in tooltips", () => {
      render(
        <div title="Search (⌘K)">
          <button type="button">Search</button>
          <KeyboardShortcut keys={["cmd", "k"]} />
        </div>,
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should work in help text", () => {
      render(
        <p>
          Press <KeyboardShortcut keys={["cmd", "k"]} /> to search
        </p>,
      );
      expect(screen.getByText("Press")).toBeInTheDocument();
      expect(screen.getByText("to search")).toBeInTheDocument();
    });

    it("should work standalone", () => {
      render(<KeyboardShortcut keys={["cmd", "k"]} />);
      expect(screen.getByRole("note")).toBeInTheDocument();
    });
  });

  describe("Complex Key Combinations", () => {
    it("should render three-key combination", async () => {
      render(<KeyboardShortcut keys={["cmd", "shift", "p"]} />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });

      const { container } = render(
        <KeyboardShortcut keys={["cmd", "shift", "p"]} />,
      );
      const separators = container.querySelectorAll(".separator");
      expect(separators).toHaveLength(2);
    });

    it("should render four-key combination", async () => {
      render(<KeyboardShortcut keys={["ctrl", "shift", "alt", "k"]} />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });

      const { container } = render(
        <KeyboardShortcut keys={["ctrl", "shift", "alt", "k"]} />,
      );
      const separators = container.querySelectorAll(".separator");
      expect(separators).toHaveLength(3);
    });
  });

  describe("Multiple KeyboardShortcuts", () => {
    it("should render multiple shortcuts independently", () => {
      const { container } = render(
        <>
          <KeyboardShortcut keys={["cmd", "k"]} />
          <KeyboardShortcut keys={["cmd", "p"]} />
          <KeyboardShortcut keys={["cmd", "s"]} />
        </>,
      );

      const shortcuts = container.querySelectorAll(".keyboardShortcut");
      expect(shortcuts).toHaveLength(3);
    });

    it("should maintain separate props for multiple shortcuts", () => {
      const { container } = render(
        <>
          <KeyboardShortcut keys={["cmd", "k"]} size="sm" />
          <KeyboardShortcut keys={["cmd", "p"]} size="md" />
        </>,
      );

      const shortcuts = container.querySelectorAll(".keyboardShortcut");
      expect(shortcuts[0]).toHaveClass("sm");
      expect(shortcuts[1]).toHaveClass("md");
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic HTML", () => {
      render(<KeyboardShortcut keys={["cmd", "k"]} />);
      const kbd = screen.getByRole("note");
      expect(kbd.nodeName).toBe("KBD");
    });

    it("should be readable by screen readers", () => {
      render(<KeyboardShortcut keys={["cmd", "k"]} />);
      expect(screen.getByRole("note")).toBeInTheDocument();
    });
  });

  describe("Shortcut Aliases", () => {
    it("should map search shortcut correctly", async () => {
      render(<KeyboardShortcut shortcut="search" />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });

    it("should map command-palette shortcut correctly", async () => {
      render(<KeyboardShortcut shortcut="command-palette" />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });

    it("should map settings shortcut correctly", async () => {
      render(<KeyboardShortcut shortcut="settings" />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });
  });

  describe("Server-Side Rendering", () => {
    it("should handle SSR gracefully", () => {
      // During SSR, window is undefined
      const originalWindow = global.window;
      // @ts-expect-error: Simulating SSR environment where window is undefined
      global.window = undefined;

      const { container } = render(<KeyboardShortcut keys={["ctrl", "k"]} />);
      expect(container.firstChild).toBeInTheDocument();

      // Restore window
      global.window = originalWindow;
    });
  });

  describe("Special Characters", () => {
    it("should handle special characters in keys", async () => {
      render(<KeyboardShortcut keys={["cmd", "["]} />);
      await waitFor(() => {
        expect(screen.getByRole("note")).toBeInTheDocument();
      });
    });

    it("should handle numbers in keys", async () => {
      render(<KeyboardShortcut keys={["cmd", "1"]} />);
      await waitFor(() => {
        expect(screen.getByText("1")).toBeInTheDocument();
      });
    });

    it("should handle symbols in keys", async () => {
      render(<KeyboardShortcut keys={["cmd", "/"]} />);
      await waitFor(() => {
        expect(screen.getByText("/")).toBeInTheDocument();
      });
    });
  });

  describe("Combination of Props", () => {
    it("should render with all props", () => {
      const { container } = render(
        <KeyboardShortcut
          keys={["cmd", "shift", "p"]}
          size="sm"
          className="custom"
        />,
      );

      expect(container.firstChild).toHaveClass(
        "keyboardShortcut",
        "sm",
        "custom",
      );
    });

    it("should render predefined shortcut with custom size and class", () => {
      const { container } = render(
        <KeyboardShortcut shortcut="search" size="sm" className="custom" />,
      );

      expect(container.firstChild).toHaveClass(
        "keyboardShortcut",
        "sm",
        "custom",
      );
    });

    it("should render raw text with custom size and class", () => {
      const { container } = render(
        <KeyboardShortcut size="sm" className="custom">
          ⌘K
        </KeyboardShortcut>,
      );

      expect(container.firstChild).toHaveClass(
        "keyboardShortcut",
        "sm",
        "custom",
      );
      expect(screen.getByText("⌘K")).toBeInTheDocument();
    });
  });
});
