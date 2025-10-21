/// <reference types="@testing-library/jest-dom" />
/**
 * Button Component Tests
 *
 * Tests for Button component covering:
 * - Rendering all 12 variants
 * - Size variants (sm, md, lg)
 * - Compact mode
 * - Icon-only mode with aria-label requirement
 * - Loading state
 * - Disabled state
 * - Full-width mode
 * - Click handlers
 * - Keyboard navigation (Enter, Space)
 * - ARIA attributes
 * - Border customization
 * - Text color override
 * - Polymorphic rendering
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { Edit } from "@spexop/icons";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React, { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button.js";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders as a button element by default", () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole("button", { name: "Click me" });
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });

    it("renders button text", () => {
      render(<Button>Test Button</Button>);

      expect(screen.getByText("Test Button")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Button className="custom-class">Button</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("custom-class");
    });
  });

  describe("Variants", () => {
    it("renders primary variant", () => {
      const { container } = render(<Button variant="primary">Primary</Button>);

      const button = container.querySelector(".primary");
      expect(button).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      const { container } = render(
        <Button variant="secondary">Secondary</Button>,
      );

      const button = container.querySelector(".secondary");
      expect(button).toBeInTheDocument();
    });

    it("renders outline variant", () => {
      const { container } = render(<Button variant="outline">Outline</Button>);

      const button = container.querySelector(".outline");
      expect(button).toBeInTheDocument();
    });

    it("renders ghost variant", () => {
      const { container } = render(<Button variant="ghost">Ghost</Button>);

      const button = container.querySelector(".ghost");
      expect(button).toBeInTheDocument();
    });

    it("renders text variant", () => {
      const { container } = render(<Button variant="text">Text</Button>);

      const button = container.querySelector(".text");
      expect(button).toBeInTheDocument();
    });

    it("renders pill variant", () => {
      const { container } = render(<Button variant="pill">Pill</Button>);

      const button = container.querySelector(".pill");
      expect(button).toBeInTheDocument();
    });

    it("renders border-emphasis variant", () => {
      const { container } = render(
        <Button variant="border-emphasis">Border</Button>,
      );

      const button = container.querySelector(".borderEmphasis");
      expect(button).toBeInTheDocument();
    });

    it("renders danger variant", () => {
      const { container } = render(<Button variant="danger">Danger</Button>);

      const button = container.querySelector(".danger");
      expect(button).toBeInTheDocument();
    });

    it("renders success variant", () => {
      const { container } = render(<Button variant="success">Success</Button>);

      const button = container.querySelector(".success");
      expect(button).toBeInTheDocument();
    });

    it("renders warning variant", () => {
      const { container } = render(<Button variant="warning">Warning</Button>);

      const button = container.querySelector(".warning");
      expect(button).toBeInTheDocument();
    });

    it("renders info variant", () => {
      const { container } = render(<Button variant="info">Info</Button>);

      const button = container.querySelector(".info");
      expect(button).toBeInTheDocument();
    });

    it("renders neutral variant", () => {
      const { container } = render(<Button variant="neutral">Neutral</Button>);

      const button = container.querySelector(".neutral");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      const { container } = render(<Button size="sm">Small</Button>);

      const button = container.querySelector(".sizeSm");
      expect(button).toBeInTheDocument();
    });

    it("renders medium size (default)", () => {
      const { container } = render(<Button size="md">Medium</Button>);

      const button = container.querySelector(".sizeMd");
      expect(button).toBeInTheDocument();
    });

    it("renders large size", () => {
      const { container } = render(<Button size="lg">Large</Button>);

      const button = container.querySelector(".sizeLg");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Compact Mode", () => {
    it("renders compact sm mode", () => {
      const { container } = render(
        <Button compact="sm" iconOnly aria-label="Edit">
          <Edit size={16} />
        </Button>,
      );

      const button = container.querySelector(".compactSm");
      expect(button).toBeInTheDocument();
    });

    it("renders compact md mode", () => {
      const { container } = render(
        <Button compact="md" iconOnly aria-label="Edit">
          <Edit size={16} />
        </Button>,
      );

      const button = container.querySelector(".compactMd");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Icon-Only Mode", () => {
    it("renders icon-only button with aria-label", () => {
      render(
        <Button iconOnly aria-label="Edit item">
          <Edit size={20} />
        </Button>,
      );

      const button = screen.getByRole("button", { name: "Edit item" });
      expect(button).toBeInTheDocument();
    });

    it("applies iconOnly class", () => {
      const { container } = render(
        <Button iconOnly aria-label="Edit">
          <Edit size={20} />
        </Button>,
      );

      const button = container.querySelector(".iconOnly");
      expect(button).toBeInTheDocument();
    });

    it("warns when iconOnly is true without aria-label in development", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      render(
        <Button iconOnly>
          <Edit size={20} />
        </Button>,
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        "Button: iconOnly={true} requires an aria-label for accessibility.",
      );

      consoleSpy.mockRestore();
    });
  });

  describe("Loading State", () => {
    it("renders loading state", () => {
      const { container } = render(<Button loading>Loading</Button>);

      const button = container.querySelector(".loading");
      expect(button).toBeInTheDocument();
    });

    it("disables button when loading", () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("does not call onClick when loading", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Disabled State", () => {
    it("renders disabled button", () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("applies disabled class", () => {
      const { container } = render(<Button disabled>Disabled</Button>);

      const button = container.querySelector(".disabled");
      expect(button).toBeInTheDocument();
    });

    it("does not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("has tabIndex -1 when disabled", () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("Full-Width Mode", () => {
    it("renders full-width button", () => {
      const { container } = render(<Button fullWidth>Full Width</Button>);

      const button = container.querySelector(".fullWidth");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Click Handlers", () => {
    it("calls onClick when button is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick if not provided", async () => {
      const user = userEvent.setup();

      render(<Button>Click me</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      // Should not throw
      expect(button).toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("button is keyboard accessible", async () => {
      const user = userEvent.setup();

      render(<Button>Keyboard Button</Button>);

      await user.tab();

      const button = screen.getByRole("button");
      expect(button).toHaveFocus();
    });

    it("triggers onClick on Enter key", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Button</Button>);

      const button = screen.getByRole("button");
      button.focus();

      await user.keyboard("{Enter}");

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("triggers onClick on Space key", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Button</Button>);

      const button = screen.getByRole("button");
      button.focus();

      await user.keyboard(" ");

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("ARIA Attributes", () => {
    it("supports aria-label", () => {
      render(<Button aria-label="Custom label">Button</Button>);

      const button = screen.getByRole("button", { name: "Custom label" });
      expect(button).toBeInTheDocument();
    });

    it("supports aria-pressed", () => {
      render(<Button aria-pressed={true}>Toggle</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-pressed", "true");
    });

    it("supports aria-expanded", () => {
      render(<Button aria-expanded={true}>Expand</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("supports aria-controls", () => {
      render(<Button aria-controls="menu-1">Menu</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-controls", "menu-1");
    });

    it("supports aria-describedby", () => {
      render(<Button aria-describedby="help-text">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "help-text");
    });

    it("supports aria-haspopup", () => {
      render(<Button aria-haspopup="menu">Actions</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-haspopup", "menu");
    });
  });

  describe("Border Customization", () => {
    it("applies thin border weight", () => {
      const { container } = render(<Button borderWeight="thin">Thin</Button>);

      const button = container.querySelector(".borderWeightThin");
      expect(button).toBeInTheDocument();
    });

    it("applies thick border weight", () => {
      const { container } = render(<Button borderWeight="thick">Thick</Button>);

      const button = container.querySelector(".borderWeightThick");
      expect(button).toBeInTheDocument();
    });

    it("applies dashed border style", () => {
      const { container } = render(
        <Button borderStyle="dashed">Dashed</Button>,
      );

      const button = container.querySelector(".borderStyleDashed");
      expect(button).toBeInTheDocument();
    });

    it("applies dotted border style", () => {
      const { container } = render(
        <Button borderStyle="dotted">Dotted</Button>,
      );

      const button = container.querySelector(".borderStyleDotted");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Text Color Override", () => {
    it("applies light text color", () => {
      const { container } = render(
        <Button textColor="light">Light Text</Button>,
      );

      const button = container.querySelector(".textColorLight");
      expect(button).toBeInTheDocument();
    });

    it("applies dark text color", () => {
      const { container } = render(<Button textColor="dark">Dark Text</Button>);

      const button = container.querySelector(".textColorDark");
      expect(button).toBeInTheDocument();
    });

    it("does not apply class for auto text color", () => {
      const { container } = render(<Button textColor="auto">Auto Text</Button>);

      const button = container.querySelector(".textColorAuto");
      expect(button).not.toBeInTheDocument();
    });
  });

  describe("Button Type", () => {
    it("renders submit type", () => {
      render(<Button type="submit">Submit</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("renders reset type", () => {
      render(<Button type="reset">Reset</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "reset");
    });

    it("renders button type by default", () => {
      render(<Button>Default</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });
  });

  describe("Polymorphic Rendering", () => {
    it("renders as custom element", () => {
      const CustomElement = ({
        children,
        ...props
      }: { children: ReactNode; [key: string]: unknown }) => (
        <a {...props}>{children}</a>
      );

      render(
        <Button as={CustomElement} href="/test">
          Link Button
        </Button>,
      );

      const link = screen.getByText("Link Button");
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/test");
    });

    it("does not add type attribute for non-button elements", () => {
      const CustomElement = ({
        children,
        ...props
      }: { children: ReactNode; [key: string]: unknown }) => (
        <a {...props}>{children}</a>
      );

      render(
        <Button as={CustomElement} href="/test">
          Link
        </Button>,
      );

      const link = screen.getByText("Link");
      expect(link).not.toHaveAttribute("type");
    });

    it("does not add disabled attribute for non-button elements", () => {
      const CustomElement = ({
        children,
        ...props
      }: { children: ReactNode; [key: string]: unknown }) => (
        <div {...props}>{children}</div>
      );

      render(
        <Button as={CustomElement} disabled>
          Div Button
        </Button>,
      );

      const div = screen.getByText("Div Button");
      expect(div).not.toHaveAttribute("disabled");
    });
  });

  describe("Icon Integration", () => {
    it("renders button with icon", () => {
      render(
        <Button>
          <Edit size={20} />
          Edit
        </Button>,
      );

      const button = screen.getByRole("button", { name: /Edit/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles multiple class combinations", () => {
      const { container } = render(
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled
          className="custom"
        >
          Button
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button.className).toContain("custom");
      expect(button.className).toContain("primary");
      expect(button.className).toContain("sizeLg");
      expect(button.className).toContain("fullWidth");
      expect(button.className).toContain("disabled");
    });

    it("handles empty children gracefully", () => {
      render(<Button aria-label="Empty button">{null}</Button>);

      const button = screen.getByRole("button", { name: "Empty button" });
      expect(button).toBeInTheDocument();
    });

    it("has tabIndex 0 when not disabled", () => {
      render(<Button>Normal</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Accessibility", () => {
    it("has correct button role", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("is keyboard focusable", async () => {
      const user = userEvent.setup();

      render(<Button>Focusable</Button>);

      await user.tab();

      const button = screen.getByRole("button");
      expect(button).toHaveFocus();
    });

    it("is not keyboard focusable when disabled", async () => {
      const user = userEvent.setup();

      render(<Button disabled>Disabled</Button>);

      await user.tab();

      const button = screen.getByRole("button");
      expect(button).not.toHaveFocus();
    });
  });
});
