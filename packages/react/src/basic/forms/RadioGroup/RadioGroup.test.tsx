/// <reference path="../../../vitest.d.ts" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup } from "./RadioGroup";
import type { RadioOption } from "./RadioGroup";

const mockOptions: RadioOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const mockOptionsWithDescriptions: RadioOption[] = [
  { value: "compact", label: "Compact", description: "Less padding" },
  { value: "normal", label: "Normal", description: "Balanced spacing" },
  { value: "spacious", label: "Spacious", description: "More padding" },
];

const mockOptionsWithDisabled: RadioOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2", disabled: true },
  { value: "option3", label: "Option 3" },
];

describe("RadioGroup", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptions}
        />,
      );
      expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    });

    it("renders all options", () => {
      render(<RadioGroup value="" onChange={() => {}} options={mockOptions} />);
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });

    it("renders with descriptions", () => {
      render(
        <RadioGroup
          value="normal"
          onChange={() => {}}
          options={mockOptionsWithDescriptions}
        />,
      );
      expect(screen.getByText("Less padding")).toBeInTheDocument();
      expect(screen.getByText("Balanced spacing")).toBeInTheDocument();
      expect(screen.getByText("More padding")).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(
        <RadioGroup
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
        <RadioGroup
          value=""
          onChange={() => {}}
          options={mockOptions}
          id="custom-id"
        />,
      );
      const radios = screen.getAllByRole("radio");
      expect(radios[0]).toHaveAttribute("id");
      expect(radios[0].id).toContain("custom-id");
    });
  });

  describe("Selection", () => {
    it("shows selected option as checked", () => {
      render(
        <RadioGroup
          value="option2"
          onChange={() => {}}
          options={mockOptions}
        />,
      );
      const radio = screen.getByRole("radio", { name: /option 2/i });
      expect(radio).toBeChecked();
    });

    it("only one option is checked at a time", () => {
      render(
        <RadioGroup
          value="option2"
          onChange={() => {}}
          options={mockOptions}
        />,
      );
      const radios = screen.getAllByRole("radio");
      const checkedRadios = radios.filter(
        (radio) => (radio as HTMLInputElement).checked,
      );
      expect(checkedRadios).toHaveLength(1);
    });

    it("calls onChange when option is clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup
          value="option1"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      await user.click(screen.getByRole("radio", { name: /option 2/i }));

      expect(handleChange).toHaveBeenCalledWith("option2");
    });

    it("can change selection multiple times", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup
          value="option1"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      await user.click(screen.getByRole("radio", { name: /option 2/i }));
      await user.click(screen.getByRole("radio", { name: /option 3/i }));

      expect(handleChange).toHaveBeenCalledTimes(2);
    });

    it("does not select disabled options", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup
          value="option1"
          onChange={handleChange}
          options={mockOptionsWithDisabled}
        />,
      );

      await user.click(screen.getByRole("radio", { name: /option 2/i }));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard Navigation", () => {
    it("navigates to next option with ArrowDown", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup
          value="option1"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const firstRadio = screen.getByRole("radio", { name: /option 1/i });
      firstRadio.focus();
      await user.keyboard("{ArrowDown}");

      expect(handleChange).toHaveBeenCalledWith("option2");
    });

    it("navigates to next option with ArrowRight", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup
          value="option1"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const firstRadio = screen.getByRole("radio", { name: /option 1/i });
      firstRadio.focus();
      await user.keyboard("{ArrowRight}");

      expect(handleChange).toHaveBeenCalledWith("option2");
    });

    it("navigates to previous option with ArrowUp", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup
          value="option2"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const secondRadio = screen.getByRole("radio", { name: /option 2/i });
      secondRadio.focus();
      await user.keyboard("{ArrowUp}");

      expect(handleChange).toHaveBeenCalledWith("option1");
    });

    it("navigates to previous option with ArrowLeft", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup
          value="option2"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const secondRadio = screen.getByRole("radio", { name: /option 2/i });
      secondRadio.focus();
      await user.keyboard("{ArrowLeft}");

      expect(handleChange).toHaveBeenCalledWith("option1");
    });

    it("goes to first option with Home key", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup
          value="option3"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const lastRadio = screen.getByRole("radio", { name: /option 3/i });
      lastRadio.focus();
      await user.keyboard("{Home}");

      expect(handleChange).toHaveBeenCalledWith("option1");
    });

    it("goes to last option with End key", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup
          value="option1"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const firstRadio = screen.getByRole("radio", { name: /option 1/i });
      firstRadio.focus();
      await user.keyboard("{End}");

      expect(handleChange).toHaveBeenCalledWith("option3");
    });

    it("selects option with Space key", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup
          value="option1"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const secondRadio = screen.getByRole("radio", { name: /option 2/i });
      secondRadio.focus();
      await user.keyboard(" ");

      expect(handleChange).toHaveBeenCalledWith("option2");
    });

    it("selects option with Enter key", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup
          value="option1"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const secondRadio = screen.getByRole("radio", { name: /option 2/i });
      secondRadio.focus();
      await user.keyboard("{Enter}");

      expect(handleChange).toHaveBeenCalledWith("option2");
    });

    it("skips disabled options during keyboard navigation", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup
          value="option1"
          onChange={handleChange}
          options={mockOptionsWithDisabled}
        />,
      );

      const firstRadio = screen.getByRole("radio", { name: /option 1/i });
      firstRadio.focus();
      await user.keyboard("{ArrowDown}");

      expect(handleChange).toHaveBeenCalledWith("option3");
    });
  });

  describe("Disabled State", () => {
    it("disables all options when group is disabled", () => {
      render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptions}
          disabled
        />,
      );

      const radios = screen.getAllByRole("radio");
      for (const radio of radios) {
        expect(radio).toBeDisabled();
      }
    });

    it("disables individual options", () => {
      render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptionsWithDisabled}
        />,
      );

      const disabledRadio = screen.getByRole("radio", { name: /option 2/i });
      expect(disabledRadio).toBeDisabled();
    });

    it("does not call onChange for disabled group", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RadioGroup
          value="option1"
          onChange={handleChange}
          options={mockOptions}
          disabled
        />,
      );

      await user.click(screen.getByRole("radio", { name: /option 2/i }));

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("applies disabled styles to group", () => {
      const { container } = render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptions}
          disabled
        />,
      );
      expect(container.querySelector(".disabled")).toBeInTheDocument();
    });

    it("applies disabled styles to individual options", () => {
      const { container } = render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptionsWithDisabled}
        />,
      );
      expect(container.querySelector(".optionDisabled")).toBeInTheDocument();
    });
  });

  describe("Density Variants", () => {
    it("renders with compact density", () => {
      const { container } = render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptions}
          density="compact"
        />,
      );
      expect(container.querySelector(".densityCompact")).toBeInTheDocument();
    });

    it("renders with normal density by default", () => {
      const { container } = render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptions}
        />,
      );
      expect(container.querySelector(".densityNormal")).toBeInTheDocument();
    });

    it("renders with spacious density", () => {
      const { container } = render(
        <RadioGroup
          value="option1"
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
      render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptions}
        />,
      );
      expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(
        <RadioGroup
          value="option1"
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
          <RadioGroup
            value="option1"
            onChange={() => {}}
            options={mockOptions}
            aria-labelledby="label-id"
          />
        </>,
      );
      expect(screen.getByRole("radiogroup")).toHaveAttribute(
        "aria-labelledby",
        "label-id",
      );
    });

    it("associates labels with radio inputs", () => {
      render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptions}
        />,
      );

      const labels = screen.getAllByRole("radio").map((radio) => {
        const label = document.querySelector(`label[for="${radio.id}"]`);
        return label?.textContent;
      });

      expect(labels).toContain("Option 1");
      expect(labels).toContain("Option 2");
      expect(labels).toContain("Option 3");
    });

    it("has aria-describedby for descriptions", () => {
      render(
        <RadioGroup
          value="normal"
          onChange={() => {}}
          options={mockOptionsWithDescriptions}
        />,
      );

      const radio = screen.getByRole("radio", { name: /normal/i });
      expect(radio).toHaveAttribute("aria-describedby");
    });

    it("description has matching id with aria-describedby", () => {
      render(
        <RadioGroup
          value="normal"
          onChange={() => {}}
          options={mockOptionsWithDescriptions}
        />,
      );

      const radio = screen.getByRole("radio", { name: /normal/i });
      const describedBy = radio.getAttribute("aria-describedby");
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy as string)).toHaveTextContent(
        "Balanced spacing",
      );
    });

    it("each radio has type radio", () => {
      render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptions}
        />,
      );

      const radios = screen.getAllByRole("radio");
      for (const radio of radios) {
        expect(radio).toHaveAttribute("type", "radio");
      }
    });

    it("all radios share the same name", () => {
      render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptions}
        />,
      );

      const radios = screen.getAllByRole("radio") as HTMLInputElement[];
      const names = radios.map((radio) => radio.name);
      const uniqueNames = new Set(names);

      expect(uniqueNames.size).toBe(1);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty options array", () => {
      render(<RadioGroup value="" onChange={() => {}} options={[]} />);
      expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    });

    it("handles value not in options", () => {
      render(
        <RadioGroup
          value="invalid"
          onChange={() => {}}
          options={mockOptions}
        />,
      );

      const radios = screen.getAllByRole("radio");
      const checkedRadios = radios.filter(
        (radio) => (radio as HTMLInputElement).checked,
      );
      expect(checkedRadios).toHaveLength(0);
    });

    it("maintains selected value across re-renders", () => {
      const { rerender } = render(
        <RadioGroup
          value="option2"
          onChange={() => {}}
          options={mockOptions}
        />,
      );

      rerender(
        <RadioGroup
          value="option2"
          onChange={() => {}}
          options={mockOptions}
        />,
      );

      expect(screen.getByRole("radio", { name: /option 2/i })).toBeChecked();
    });

    it("works with options without descriptions", () => {
      render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptions}
        />,
      );

      const radio = screen.getByRole("radio", { name: /option 1/i });
      expect(radio).not.toHaveAttribute("aria-describedby");
    });
  });

  describe("ID Generation", () => {
    it("uses provided id as base", () => {
      render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptions}
          id="custom-id"
        />,
      );

      const radios = screen.getAllByRole("radio");
      for (const radio of radios) {
        expect(radio.id).toContain("custom-id");
      }
    });

    it("generates unique ids when not provided", () => {
      const { rerender } = render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptions}
        />,
      );
      const firstIds = screen.getAllByRole("radio").map((r) => r.id);

      rerender(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={mockOptions}
        />,
      );
      const secondIds = screen.getAllByRole("radio").map((r) => r.id);

      for (const id of firstIds) {
        expect(id).toBeTruthy();
      }
      for (const id of secondIds) {
        expect(id).toBeTruthy();
      }
    });
  });
});
