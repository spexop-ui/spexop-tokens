/// <reference path="../../../vitest.d.ts" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";
import type { SelectOption } from "./Select";

const mockOptions: SelectOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const mockOptionsWithDisabled: SelectOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2", disabled: true },
  { value: "option3", label: "Option 3" },
];

describe("Select", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<Select value="" onChange={() => {}} options={mockOptions} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("displays placeholder when no value selected", () => {
      render(
        <Select
          value=""
          onChange={() => {}}
          options={mockOptions}
          placeholder="Choose an option"
        />,
      );
      expect(screen.getByText("Choose an option")).toBeInTheDocument();
    });

    it("displays selected option label", () => {
      render(
        <Select value="option2" onChange={() => {}} options={mockOptions} />,
      );
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(
        <Select
          value=""
          onChange={() => {}}
          options={mockOptions}
          className="custom-class"
        />,
      );
      expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("renders with custom id", () => {
      render(
        <Select
          value=""
          onChange={() => {}}
          options={mockOptions}
          id="custom-id"
        />,
      );
      expect(screen.getByRole("button")).toHaveAttribute("id", "custom-id");
    });
  });

  describe("Dropdown Behavior", () => {
    it("opens dropdown when clicked", async () => {
      const user = userEvent.setup();
      render(<Select value="" onChange={() => {}} options={mockOptions} />);

      await user.click(screen.getByRole("button"));

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("displays all options when opened", async () => {
      const user = userEvent.setup();
      render(<Select value="" onChange={() => {}} options={mockOptions} />);

      await user.click(screen.getByRole("button"));

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });

    it("closes dropdown when clicking outside", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Select value="" onChange={() => {}} options={mockOptions} />
          <button type="button">Outside</button>
        </div>,
      );

      await user.click(screen.getByRole("button", { name: /select/i }));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.click(screen.getByText("Outside"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("applies open class when dropdown is open", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Select value="" onChange={() => {}} options={mockOptions} />,
      );

      await user.click(screen.getByRole("button"));

      expect(container.querySelector(".open")).toBeInTheDocument();
    });
  });

  describe("Option Selection", () => {
    it("calls onChange when option is clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Select value="" onChange={handleChange} options={mockOptions} />);

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("Option 2"));

      expect(handleChange).toHaveBeenCalledWith("option2");
    });

    it("closes dropdown after selection", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Select value="" onChange={handleChange} options={mockOptions} />);

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("Option 1"));

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("shows checkmark on selected option", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Select value="option2" onChange={() => {}} options={mockOptions} />,
      );

      await user.click(screen.getByRole("button"));

      const selectedOption = container.querySelector(".selected");
      expect(selectedOption).toBeInTheDocument();
      expect(selectedOption).toHaveTextContent("Option 2");
    });

    it("does not select disabled options", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Select
          value=""
          onChange={handleChange}
          options={mockOptionsWithDisabled}
        />,
      );

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("Option 2"));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard Navigation", () => {
    it("opens dropdown with Enter key", async () => {
      const user = userEvent.setup();
      render(<Select value="" onChange={() => {}} options={mockOptions} />);

      screen.getByRole("button").focus();
      await user.keyboard("{Enter}");

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("opens dropdown with Space key", async () => {
      const user = userEvent.setup();
      render(<Select value="" onChange={() => {}} options={mockOptions} />);

      screen.getByRole("button").focus();
      await user.keyboard(" ");

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("closes dropdown with Escape key", async () => {
      const user = userEvent.setup();
      render(<Select value="" onChange={() => {}} options={mockOptions} />);

      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("navigates options with ArrowDown", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Select value="" onChange={() => {}} options={mockOptions} />,
      );

      screen.getByRole("button").focus();
      await user.keyboard("{Enter}");
      await user.keyboard("{ArrowDown}");

      const focusedOption = container.querySelector(".focused");
      expect(focusedOption).toBeInTheDocument();
    });

    it("navigates options with ArrowUp", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Select value="option2" onChange={() => {}} options={mockOptions} />,
      );

      screen.getByRole("button").focus();
      await user.keyboard("{Enter}");
      await user.keyboard("{ArrowUp}");

      const focusedOption = container.querySelector(".focused");
      expect(focusedOption).toBeInTheDocument();
    });

    it("selects option with Enter when focused", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Select value="" onChange={handleChange} options={mockOptions} />);

      screen.getByRole("button").focus();
      await user.keyboard("{Enter}");
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      expect(handleChange).toHaveBeenCalled();
    });

    it("goes to first option with Home key", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Select value="option3" onChange={() => {}} options={mockOptions} />,
      );

      await user.click(screen.getByRole("button"));
      await user.keyboard("{Home}");

      expect(container.querySelector(".focused")).toBeInTheDocument();
    });

    it("goes to last option with End key", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Select value="" onChange={() => {}} options={mockOptions} />,
      );

      await user.click(screen.getByRole("button"));
      await user.keyboard("{End}");

      expect(container.querySelector(".focused")).toBeInTheDocument();
    });

    it("closes dropdown on Tab", async () => {
      const user = userEvent.setup();
      render(<Select value="" onChange={() => {}} options={mockOptions} />);

      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.keyboard("{Tab}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("renders disabled when disabled prop is true", () => {
      render(
        <Select value="" onChange={() => {}} options={mockOptions} disabled />,
      );
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("does not open dropdown when disabled", async () => {
      const user = userEvent.setup();
      render(
        <Select value="" onChange={() => {}} options={mockOptions} disabled />,
      );

      await user.click(screen.getByRole("button"));

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("applies disabled styles", () => {
      const { container } = render(
        <Select value="" onChange={() => {}} options={mockOptions} disabled />,
      );
      expect(container.querySelector(".disabled")).toBeInTheDocument();
    });

    it("does not respond to keyboard when disabled", async () => {
      const user = userEvent.setup();
      render(
        <Select value="" onChange={() => {}} options={mockOptions} disabled />,
      );

      screen.getByRole("button").focus();
      await user.keyboard("{Enter}");

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("Density Variants", () => {
    it("renders with compact density", () => {
      const { container } = render(
        <Select
          value=""
          onChange={() => {}}
          options={mockOptions}
          density="compact"
        />,
      );
      expect(container.querySelector(".densityCompact")).toBeInTheDocument();
    });

    it("renders with normal density by default", () => {
      const { container } = render(
        <Select value="" onChange={() => {}} options={mockOptions} />,
      );
      expect(container.querySelector(".densityNormal")).toBeInTheDocument();
    });

    it("renders with spacious density", () => {
      const { container } = render(
        <Select
          value=""
          onChange={() => {}}
          options={mockOptions}
          density="spacious"
        />,
      );
      expect(container.querySelector(".densitySpacious")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Select value="" onChange={() => {}} options={mockOptions} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("has aria-haspopup", () => {
      render(<Select value="" onChange={() => {}} options={mockOptions} />);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-haspopup",
        "listbox",
      );
    });

    it("has aria-expanded attribute", async () => {
      const user = userEvent.setup();
      render(<Select value="" onChange={() => {}} options={mockOptions} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "false");

      await user.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("supports aria-label", () => {
      render(
        <Select
          value=""
          onChange={() => {}}
          options={mockOptions}
          aria-label="Custom label"
        />,
      );
      expect(screen.getByLabelText("Custom label")).toBeInTheDocument();
    });

    it("supports aria-labelledby", () => {
      render(
        <>
          <span id="label-id">External label</span>
          <Select
            value=""
            onChange={() => {}}
            options={mockOptions}
            aria-labelledby="label-id"
          />
        </>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-labelledby",
        "label-id",
      );
    });

    it("options have role option", async () => {
      const user = userEvent.setup();
      render(<Select value="" onChange={() => {}} options={mockOptions} />);

      await user.click(screen.getByRole("button"));

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
    });

    it("selected option has aria-selected", async () => {
      const user = userEvent.setup();
      render(
        <Select value="option2" onChange={() => {}} options={mockOptions} />,
      );

      await user.click(screen.getByRole("button"));

      const selectedOption = screen.getByRole("option", { name: "Option 2" });
      expect(selectedOption).toHaveAttribute("aria-selected", "true");
    });

    it("disabled option has aria-disabled", async () => {
      const user = userEvent.setup();
      render(
        <Select
          value=""
          onChange={() => {}}
          options={mockOptionsWithDisabled}
        />,
      );

      await user.click(screen.getByRole("button"));

      const disabledOption = screen.getByRole("option", { name: "Option 2" });
      expect(disabledOption).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty options array", () => {
      render(<Select value="" onChange={() => {}} options={[]} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("handles rapid clicks", async () => {
      const user = userEvent.setup();
      render(<Select value="" onChange={() => {}} options={mockOptions} />);

      const button = screen.getByRole("button");
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(button).toBeInTheDocument();
    });

    it("handles value not in options", () => {
      render(
        <Select value="invalid" onChange={() => {}} options={mockOptions} />,
      );
      expect(screen.getByText("Select...")).toBeInTheDocument();
    });

    it("maintains selected value across re-renders", () => {
      const { rerender } = render(
        <Select value="option2" onChange={() => {}} options={mockOptions} />,
      );

      rerender(
        <Select value="option2" onChange={() => {}} options={mockOptions} />,
      );

      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });
  });

  describe("ID Generation", () => {
    it("uses provided id", () => {
      render(
        <Select
          value=""
          onChange={() => {}}
          options={mockOptions}
          id="custom-id-123"
        />,
      );
      expect(screen.getByRole("button")).toHaveAttribute("id", "custom-id-123");
    });

    it("generates unique id when not provided", () => {
      const { rerender } = render(
        <Select value="" onChange={() => {}} options={mockOptions} />,
      );
      const firstId = screen.getByRole("button").id;

      rerender(<Select value="" onChange={() => {}} options={mockOptions} />);
      const secondId = screen.getByRole("button").id;

      expect(firstId).toBeTruthy();
      expect(secondId).toBeTruthy();
    });
  });
});
