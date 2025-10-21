/// <reference path="../../../vitest.d.ts" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(
        <Toggle checked={false} onChange={() => {}} label="Test toggle" />,
      );
      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(
        <Toggle checked={false} onChange={() => {}} label="Enable feature" />,
      );
      expect(screen.getByText("Enable feature")).toBeInTheDocument();
    });

    it("renders without label when not provided", () => {
      render(<Toggle checked={false} onChange={() => {}} />);
      expect(screen.getByRole("switch")).toBeInTheDocument();
      expect(screen.queryByText("Enable feature")).not.toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(
        <Toggle checked={false} onChange={() => {}} className="custom-class" />,
      );
      expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("renders with custom id", () => {
      render(<Toggle checked={false} onChange={() => {}} id="custom-toggle" />);
      expect(screen.getByRole("switch")).toHaveAttribute("id", "custom-toggle");
    });
  });

  describe("Checked State", () => {
    it("renders unchecked by default", () => {
      render(<Toggle checked={false} onChange={() => {}} />);
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-checked",
        "false",
      );
    });

    it("renders checked when checked prop is true", () => {
      render(<Toggle checked={true} onChange={() => {}} />);
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });

    it("applies checked class when checked", () => {
      const { container } = render(
        <Toggle checked={true} onChange={() => {}} />,
      );
      expect(container.querySelector(".checked")).toBeInTheDocument();
    });

    it("does not apply checked class when unchecked", () => {
      const { container } = render(
        <Toggle checked={false} onChange={() => {}} />,
      );
      expect(container.querySelector(".checked")).not.toBeInTheDocument();
    });

    it("has data-checked attribute when checked", () => {
      render(<Toggle checked={true} onChange={() => {}} />);
      expect(screen.getByRole("switch")).toHaveAttribute("data-checked");
    });

    it("does not have data-checked attribute when unchecked", () => {
      render(<Toggle checked={false} onChange={() => {}} />);
      expect(screen.getByRole("switch")).not.toHaveAttribute("data-checked");
    });
  });

  describe("Interactions", () => {
    it("calls onChange when clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle checked={false} onChange={handleChange} />);

      await user.click(screen.getByRole("switch"));

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("calls onChange with false when checked and clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle checked={true} onChange={handleChange} />);

      await user.click(screen.getByRole("switch"));

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it("can be toggled multiple times", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle checked={false} onChange={handleChange} />);

      await user.click(screen.getByRole("switch"));
      await user.click(screen.getByRole("switch"));
      await user.click(screen.getByRole("switch"));

      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it("clicking label triggers onChange", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Toggle checked={false} onChange={handleChange} label="Click me" />,
      );

      await user.click(screen.getByText("Click me"));

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Keyboard Navigation", () => {
    it("can be toggled with Space key", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle checked={false} onChange={handleChange} />);

      const toggle = screen.getByRole("switch");
      toggle.focus();
      await user.keyboard(" ");

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("can be toggled with Enter key", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle checked={false} onChange={handleChange} />);

      const toggle = screen.getByRole("switch");
      toggle.focus();
      await user.keyboard("{Enter}");

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("Space key prevents default behavior", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle checked={false} onChange={handleChange} />);

      const toggle = screen.getByRole("switch");
      toggle.focus();
      await user.keyboard(" ");

      expect(handleChange).toHaveBeenCalled();
    });

    it("Enter key prevents default behavior", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle checked={false} onChange={handleChange} />);

      const toggle = screen.getByRole("switch");
      toggle.focus();
      await user.keyboard("{Enter}");

      expect(handleChange).toHaveBeenCalled();
    });

    it("is focusable by default", () => {
      render(<Toggle checked={false} onChange={() => {}} />);
      const toggle = screen.getByRole("switch");
      toggle.focus();
      expect(toggle).toHaveFocus();
    });
  });

  describe("Disabled State", () => {
    it("renders disabled when disabled prop is true", () => {
      render(<Toggle checked={false} onChange={() => {}} disabled={true} />);
      expect(screen.getByRole("switch")).toBeDisabled();
    });

    it("does not call onChange when disabled and clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle checked={false} onChange={handleChange} disabled />);

      await user.click(screen.getByRole("switch"));

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("does not respond to Space key when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle checked={false} onChange={handleChange} disabled />);

      const toggle = screen.getByRole("switch");
      toggle.focus();
      await user.keyboard(" ");

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("does not respond to Enter key when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle checked={false} onChange={handleChange} disabled />);

      const toggle = screen.getByRole("switch");
      toggle.focus();
      await user.keyboard("{Enter}");

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("applies disabled styles", () => {
      const { container } = render(
        <Toggle checked={false} onChange={() => {}} disabled />,
      );
      expect(container.querySelector(".disabled")).toBeInTheDocument();
    });
  });

  describe("Density Variants", () => {
    it("renders with compact density", () => {
      const { container } = render(
        <Toggle checked={false} onChange={() => {}} density="compact" />,
      );
      expect(container.querySelector(".densityCompact")).toBeInTheDocument();
    });

    it("renders with normal density by default", () => {
      const { container } = render(
        <Toggle checked={false} onChange={() => {}} />,
      );
      expect(container.querySelector(".densityNormal")).toBeInTheDocument();
    });

    it("renders with spacious density", () => {
      const { container } = render(
        <Toggle checked={false} onChange={() => {}} density="spacious" />,
      );
      expect(container.querySelector(".densitySpacious")).toBeInTheDocument();
    });

    it("applies correct density class for compact", () => {
      const { container } = render(
        <Toggle checked={false} onChange={() => {}} density="compact" />,
      );
      expect(container.querySelector(".densityCompact")).toBeInTheDocument();
    });

    it("applies correct density class for spacious", () => {
      const { container } = render(
        <Toggle checked={false} onChange={() => {}} density="spacious" />,
      );
      expect(container.querySelector(".densitySpacious")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Toggle checked={false} onChange={() => {}} />);
      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(
        <Toggle
          checked={false}
          onChange={() => {}}
          aria-label="Custom label"
        />,
      );
      expect(screen.getByLabelText("Custom label")).toBeInTheDocument();
    });

    it("supports aria-labelledby", () => {
      render(
        <>
          <span id="label-id">External label</span>
          <Toggle
            checked={false}
            onChange={() => {}}
            aria-labelledby="label-id"
          />
        </>,
      );
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-labelledby",
        "label-id",
      );
    });

    it("uses label as aria-label when provided", () => {
      render(<Toggle checked={false} onChange={() => {}} label="Test label" />);
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-label",
        "Test label",
      );
    });

    it("has aria-checked attribute", () => {
      render(<Toggle checked={true} onChange={() => {}} />);
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });

    it("updates aria-checked when toggled", async () => {
      const user = userEvent.setup();
      let checked = false;
      const handleChange = vi.fn((newChecked) => {
        checked = newChecked;
      });

      const { rerender } = render(
        <Toggle checked={checked} onChange={handleChange} />,
      );

      await user.click(screen.getByRole("switch"));

      rerender(<Toggle checked={true} onChange={handleChange} />);

      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });

    it("is keyboard accessible", () => {
      render(<Toggle checked={false} onChange={() => {}} />);
      const toggle = screen.getByRole("switch");
      expect(toggle).toHaveAttribute("type", "button");
    });
  });

  describe("Edge Cases", () => {
    it("handles rapid clicks", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle checked={false} onChange={handleChange} />);

      const toggle = screen.getByRole("switch");
      await user.click(toggle);
      await user.click(toggle);
      await user.click(toggle);
      await user.click(toggle);
      await user.click(toggle);

      expect(handleChange).toHaveBeenCalledTimes(5);
    });

    it("handles empty label prop", () => {
      render(<Toggle checked={false} onChange={() => {}} label="" />);
      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("works with both disabled and checked", () => {
      render(<Toggle checked={true} onChange={() => {}} disabled />);
      const toggle = screen.getByRole("switch");
      expect(toggle).toHaveAttribute("aria-checked", "true");
      expect(toggle).toBeDisabled();
    });

    it("applies multiple classes correctly", () => {
      const { container } = render(
        <Toggle
          checked={true}
          onChange={() => {}}
          disabled
          density="compact"
          className="custom-class"
        />,
      );
      expect(container.querySelector(".disabled")).toBeInTheDocument();
      expect(container.querySelector(".densityCompact")).toBeInTheDocument();
      expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("handles onChange with no arguments correctly", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle checked={false} onChange={handleChange} />);

      await user.click(screen.getByRole("switch"));

      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Label Association", () => {
    it("renders label correctly", () => {
      render(<Toggle checked={false} onChange={() => {}} label="Test Label" />);
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("does not render label when not provided", () => {
      const { container } = render(
        <Toggle checked={false} onChange={() => {}} />,
      );
      expect(container.querySelector(".label")).not.toBeInTheDocument();
    });

    it("associates label with toggle via htmlFor", () => {
      render(<Toggle checked={false} onChange={() => {}} label="Test label" />);
      const toggle = screen.getByRole("switch");
      const label = screen.getByText("Test label");
      expect(label).toHaveAttribute("for", toggle.id);
    });
  });

  describe("ID Generation", () => {
    it("uses provided id", () => {
      render(<Toggle checked={false} onChange={() => {}} id="custom-id-123" />);
      expect(screen.getByRole("switch")).toHaveAttribute("id", "custom-id-123");
    });

    it("generates unique id when not provided", () => {
      const { rerender } = render(
        <Toggle checked={false} onChange={() => {}} />,
      );
      const firstId = screen.getByRole("switch").id;

      rerender(<Toggle checked={false} onChange={() => {}} />);
      const secondId = screen.getByRole("switch").id;

      expect(firstId).toBeTruthy();
      expect(secondId).toBeTruthy();
    });
  });

  describe("Visual Components", () => {
    it("renders track element", () => {
      const { container } = render(
        <Toggle checked={false} onChange={() => {}} />,
      );
      expect(container.querySelector(".track")).toBeInTheDocument();
    });

    it("renders thumb element", () => {
      const { container } = render(
        <Toggle checked={false} onChange={() => {}} />,
      );
      expect(container.querySelector(".thumb")).toBeInTheDocument();
    });

    it("track contains thumb", () => {
      const { container } = render(
        <Toggle checked={false} onChange={() => {}} />,
      );
      const track = container.querySelector(".track") as HTMLElement;
      const thumb = container.querySelector(".thumb") as HTMLElement;
      expect(track).toContainElement(thumb);
    });
  });
});
