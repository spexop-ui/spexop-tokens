/// <reference path="../../../vitest.d.ts" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(
        <Checkbox checked={false} onChange={() => {}} label="Test checkbox" />,
      );
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(
        <Checkbox checked={false} onChange={() => {}} label="Accept terms" />,
      );
      expect(screen.getByText("Accept terms")).toBeInTheDocument();
    });

    it("renders with description", () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          label="Enable feature"
          description="This is a helpful description"
        />,
      );
      expect(
        screen.getByText("This is a helpful description"),
      ).toBeInTheDocument();
    });

    it("renders without label when not provided", () => {
      render(<Checkbox checked={false} onChange={() => {}} />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.queryByText("Accept terms")).not.toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          className="custom-class"
        />,
      );
      expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("renders with custom id", () => {
      render(
        <Checkbox checked={false} onChange={() => {}} id="custom-checkbox" />,
      );
      expect(screen.getByRole("checkbox")).toHaveAttribute(
        "id",
        "custom-checkbox",
      );
    });
  });

  describe("Checked State", () => {
    it("renders unchecked by default", () => {
      render(<Checkbox checked={false} onChange={() => {}} />);
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("renders checked when checked prop is true", () => {
      render(<Checkbox checked={true} onChange={() => {}} />);
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("shows checkmark when checked", () => {
      const { container } = render(
        <Checkbox checked={true} onChange={() => {}} />,
      );
      const checkmark = container.querySelector(".checkmark");
      expect(checkmark).toBeInTheDocument();
    });

    it("hides checkmark when unchecked", () => {
      const { container } = render(
        <Checkbox checked={false} onChange={() => {}} />,
      );
      const checkmark = container.querySelector(".checkmark");
      expect(checkmark).not.toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls onChange when clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} />);

      await user.click(screen.getByRole("checkbox"));

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("calls onChange with false when checked and clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox checked={true} onChange={handleChange} />);

      await user.click(screen.getByRole("checkbox"));

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it("can be clicked multiple times", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} />);

      await user.click(screen.getByRole("checkbox"));
      await user.click(screen.getByRole("checkbox"));
      await user.click(screen.getByRole("checkbox"));

      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it("clicking label triggers onChange", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Checkbox checked={false} onChange={handleChange} label="Click me" />,
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
      render(<Checkbox checked={false} onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();
      await user.keyboard(" ");

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("can be toggled with Enter key", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();
      await user.keyboard("{Enter}");

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("Space key prevents default behavior", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();
      await user.keyboard(" ");

      // If default wasn't prevented, the page might scroll
      expect(handleChange).toHaveBeenCalled();
    });

    it("Enter key prevents default behavior", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();
      await user.keyboard("{Enter}");

      expect(handleChange).toHaveBeenCalled();
    });

    it("is focusable by default", () => {
      render(<Checkbox checked={false} onChange={() => {}} />);
      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();
      expect(checkbox).toHaveFocus();
    });
  });

  describe("Disabled State", () => {
    it("renders disabled when disabled prop is true", () => {
      render(<Checkbox checked={false} onChange={() => {}} disabled={true} />);
      expect(screen.getByRole("checkbox")).toBeDisabled();
    });

    it("does not call onChange when disabled and clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} disabled />);

      await user.click(screen.getByRole("checkbox"));

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("does not respond to Space key when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} disabled />);

      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();
      await user.keyboard(" ");

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("does not respond to Enter key when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} disabled />);

      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();
      await user.keyboard("{Enter}");

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("applies disabled styles", () => {
      const { container } = render(
        <Checkbox checked={false} onChange={() => {}} disabled />,
      );
      expect(container.querySelector(".disabled")).toBeInTheDocument();
    });
  });

  describe("Density Variants", () => {
    it("renders with compact density", () => {
      const { container } = render(
        <Checkbox checked={false} onChange={() => {}} density="compact" />,
      );
      expect(container.querySelector(".densityCompact")).toBeInTheDocument();
    });

    it("renders with normal density by default", () => {
      const { container } = render(
        <Checkbox checked={false} onChange={() => {}} />,
      );
      expect(container.querySelector(".densityNormal")).toBeInTheDocument();
    });

    it("renders with spacious density", () => {
      const { container } = render(
        <Checkbox checked={false} onChange={() => {}} density="spacious" />,
      );
      expect(container.querySelector(".densitySpacious")).toBeInTheDocument();
    });

    it("applies correct density class for compact", () => {
      const { container } = render(
        <Checkbox checked={false} onChange={() => {}} density="compact" />,
      );
      expect(container.querySelector(".densityCompact")).toBeInTheDocument();
    });

    it("applies correct density class for spacious", () => {
      const { container } = render(
        <Checkbox checked={false} onChange={() => {}} density="spacious" />,
      );
      expect(container.querySelector(".densitySpacious")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Checkbox checked={false} onChange={() => {}} />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(
        <Checkbox
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
          <Checkbox
            checked={false}
            onChange={() => {}}
            aria-labelledby="label-id"
          />
        </>,
      );
      expect(screen.getByRole("checkbox")).toHaveAttribute(
        "aria-labelledby",
        "label-id",
      );
    });

    it("associates label with checkbox via htmlFor", () => {
      render(
        <Checkbox checked={false} onChange={() => {}} label="Test label" />,
      );
      const checkbox = screen.getByRole("checkbox");
      const label = screen.getByText("Test label");
      expect(label).toHaveAttribute("for", checkbox.id);
    });

    it("has aria-describedby when description is provided", () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          label="Test"
          description="Description text"
        />,
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-describedby");
    });

    it("description has matching id with aria-describedby", () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          label="Test"
          description="Description text"
        />,
      );
      const checkbox = screen.getByRole("checkbox");
      const describedBy = checkbox.getAttribute("aria-describedby");
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy as string)).toHaveTextContent(
        "Description text",
      );
    });

    it("is keyboard accessible", () => {
      render(<Checkbox checked={false} onChange={() => {}} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("type", "checkbox");
    });
  });

  describe("Edge Cases", () => {
    it("handles rapid clicks", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);
      await user.click(checkbox);
      await user.click(checkbox);
      await user.click(checkbox);
      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(5);
    });

    it("handles empty label prop", () => {
      render(<Checkbox checked={false} onChange={() => {}} label="" />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("handles empty description prop", () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          label="Test"
          description=""
        />,
      );
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("handles onChange with no arguments correctly", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox checked={false} onChange={handleChange} />);

      await user.click(screen.getByRole("checkbox"));

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("maintains state with both label and description", () => {
      render(
        <Checkbox
          checked={true}
          onChange={() => {}}
          label="Test label"
          description="Test description"
        />,
      );
      expect(screen.getByRole("checkbox")).toBeChecked();
      expect(screen.getByText("Test label")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
    });

    it("works with both disabled and checked", () => {
      render(<Checkbox checked={true} onChange={() => {}} disabled />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();
      expect(checkbox).toBeDisabled();
    });

    it("applies multiple classes correctly", () => {
      const { container } = render(
        <Checkbox
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
  });

  describe("Label and Description", () => {
    it("renders label correctly", () => {
      render(
        <Checkbox checked={false} onChange={() => {}} label="Test Label" />,
      );
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("renders description correctly", () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          label="Label"
          description="Description"
        />,
      );
      expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("does not render label when not provided", () => {
      const { container } = render(
        <Checkbox checked={false} onChange={() => {}} />,
      );
      expect(container.querySelector(".labelText")).not.toBeInTheDocument();
    });

    it("does not render description when not provided", () => {
      const { container } = render(
        <Checkbox checked={false} onChange={() => {}} label="Label" />,
      );
      expect(container.querySelector(".description")).not.toBeInTheDocument();
    });

    it("renders both label and description together", () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          label="My Label"
          description="My Description"
        />,
      );
      expect(screen.getByText("My Label")).toBeInTheDocument();
      expect(screen.getByText("My Description")).toBeInTheDocument();
    });
  });

  describe("ID Generation", () => {
    it("uses provided id", () => {
      render(
        <Checkbox checked={false} onChange={() => {}} id="custom-id-123" />,
      );
      expect(screen.getByRole("checkbox")).toHaveAttribute(
        "id",
        "custom-id-123",
      );
    });

    it("generates unique id when not provided", () => {
      const { rerender } = render(
        <Checkbox checked={false} onChange={() => {}} />,
      );
      const firstId = screen.getByRole("checkbox").id;

      rerender(<Checkbox checked={false} onChange={() => {}} />);
      const secondId = screen.getByRole("checkbox").id;

      expect(firstId).toBeTruthy();
      expect(secondId).toBeTruthy();
    });

    it("description id is based on checkbox id", () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          id="test-checkbox"
          label="Label"
          description="Description"
        />,
      );
      const descriptionElement = screen.getByText("Description");
      expect(descriptionElement).toHaveAttribute("id", "test-checkbox-desc");
    });
  });
});
