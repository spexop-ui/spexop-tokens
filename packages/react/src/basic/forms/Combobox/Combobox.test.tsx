/// <reference path="../../../vitest.d.ts" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Combobox } from "./Combobox";
import type { ComboboxOption } from "./Combobox.types";

const mockOptions: ComboboxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

const mockOptionsWithDescriptions: ComboboxOption[] = [
  { value: "react", label: "React", description: "A JavaScript library" },
  { value: "vue", label: "Vue", description: "The Progressive Framework" },
  {
    value: "angular",
    label: "Angular",
    description: "Platform for building apps",
  },
];

const mockOptionsWithDisabled: ComboboxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue", disabled: true },
  { value: "angular", label: "Angular" },
];

describe("Combobox", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          label="Choose framework"
        />,
      );
      expect(screen.getByText("Choose framework")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          placeholder="Type to search..."
        />,
      );
      expect(
        screen.getByPlaceholderText("Type to search..."),
      ).toBeInTheDocument();
    });

    it("renders chevron icon", () => {
      const { container } = render(
        <Combobox value="" onChange={() => {}} options={mockOptions} />,
      );
      expect(container.querySelector(".chevron")).toBeInTheDocument();
    });

    it("displays selected option label", () => {
      render(
        <Combobox value="react" onChange={() => {}} options={mockOptions} />,
      );
      expect(screen.getByDisplayValue("React")).toBeInTheDocument();
    });
  });

  describe("Dropdown Behavior", () => {
    it("opens dropdown when input is focused", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      await user.click(screen.getByRole("combobox"));

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("shows all options when opened", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      await user.click(screen.getByRole("combobox"));

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Vue")).toBeInTheDocument();
      expect(screen.getByText("Angular")).toBeInTheDocument();
      expect(screen.getByText("Svelte")).toBeInTheDocument();
    });

    it("closes dropdown when clicking outside", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Combobox value="" onChange={() => {}} options={mockOptions} />
          <button type="button">Outside</button>
        </div>,
      );

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.click(screen.getByText("Outside"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("applies open class when dropdown is open", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Combobox value="" onChange={() => {}} options={mockOptions} />,
      );

      await user.click(screen.getByRole("combobox"));

      expect(container.querySelector(".open")).toBeInTheDocument();
    });
  });

  describe("Search and Filter", () => {
    it("filters options based on search query", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      await user.type(screen.getByRole("combobox"), "rea");

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.queryByText("Vue")).not.toBeInTheDocument();
      expect(screen.queryByText("Angular")).not.toBeInTheDocument();
    });

    it("shows no results message when no matches", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      await user.type(screen.getByRole("combobox"), "xyz");

      expect(screen.getByText("No results found")).toBeInTheDocument();
    });

    it("filters by option description", async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptionsWithDescriptions}
        />,
      );

      await user.type(screen.getByRole("combobox"), "library");

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.queryByText("Vue")).not.toBeInTheDocument();
    });

    it("uses custom filter function when provided", async () => {
      const user = userEvent.setup();
      const customFilter = vi.fn(
        (option, query) => option.value.toLowerCase() === query.toLowerCase(),
      );

      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          filterFn={customFilter}
        />,
      );

      await user.type(screen.getByRole("combobox"), "react");

      expect(customFilter).toHaveBeenCalled();
    });

    it("is case insensitive by default", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      await user.type(screen.getByRole("combobox"), "REACT");

      expect(screen.getByText("React")).toBeInTheDocument();
    });
  });

  describe("Option Selection", () => {
    it("calls onChange when option is clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Combobox value="" onChange={handleChange} options={mockOptions} />,
      );

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByText("Vue"));

      expect(handleChange).toHaveBeenCalledWith("vue");
    });

    it("closes dropdown after selection", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Combobox value="" onChange={handleChange} options={mockOptions} />,
      );

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByText("React"));

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("clears search query after selection", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      await user.type(screen.getByRole("combobox"), "rea");
      await user.click(screen.getByText("React"));

      expect(screen.getByRole("combobox")).toHaveValue("React");
    });

    it("shows checkmark on selected option", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Combobox value="vue" onChange={() => {}} options={mockOptions} />,
      );

      await user.click(screen.getByRole("combobox"));

      const selectedOption = container.querySelector(".selected");
      expect(selectedOption).toBeInTheDocument();
    });

    it("does not select disabled options", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Combobox
          value=""
          onChange={handleChange}
          options={mockOptionsWithDisabled}
        />,
      );

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByText("Vue"));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard Navigation", () => {
    it("opens dropdown with ArrowDown", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      screen.getByRole("combobox").focus();
      await user.keyboard("{ArrowDown}");

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("closes dropdown with Escape", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("navigates options with ArrowDown", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Combobox value="" onChange={() => {}} options={mockOptions} />,
      );

      await user.click(screen.getByRole("combobox"));
      await user.keyboard("{ArrowDown}");

      const focusedOption = container.querySelector(".focused");
      expect(focusedOption).toBeInTheDocument();
    });

    it("navigates options with ArrowUp", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Combobox value="vue" onChange={() => {}} options={mockOptions} />,
      );

      await user.click(screen.getByRole("combobox"));
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowUp}");

      const focusedOption = container.querySelector(".focused");
      expect(focusedOption).toBeInTheDocument();
    });

    it("selects option with Enter", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Combobox value="" onChange={handleChange} options={mockOptions} />,
      );

      await user.click(screen.getByRole("combobox"));
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      expect(handleChange).toHaveBeenCalled();
    });

    it("goes to first option with Home", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Combobox value="angular" onChange={() => {}} options={mockOptions} />,
      );

      await user.click(screen.getByRole("combobox"));
      await user.keyboard("{Home}");

      expect(container.querySelector(".focused")).toBeInTheDocument();
    });

    it("goes to last option with End", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Combobox value="" onChange={() => {}} options={mockOptions} />,
      );

      await user.click(screen.getByRole("combobox"));
      await user.keyboard("{End}");

      expect(container.querySelector(".focused")).toBeInTheDocument();
    });

    it("closes dropdown on Tab", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.keyboard("{Tab}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("blurs input on Tab", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      const input = screen.getByRole("combobox");
      input.focus();
      await user.keyboard("{Tab}");

      expect(input).not.toHaveFocus();
    });
  });

  describe("Required Field", () => {
    it("shows required indicator when required", () => {
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          label="Framework"
          required
        />,
      );
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("has aria-required when required", () => {
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          required
        />,
      );
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-required",
        "true",
      );
    });
  });

  describe("Disabled State", () => {
    it("disables input when disabled", () => {
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          disabled
        />,
      );
      expect(screen.getByRole("combobox")).toBeDisabled();
    });

    it("does not open dropdown when disabled", async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          disabled
        />,
      );

      await user.click(screen.getByRole("combobox"));

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("applies disabled styles", () => {
      const { container } = render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          disabled
        />,
      );
      expect(container.querySelector(".disabled")).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("renders with small size", () => {
      const { container } = render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          size="sm"
        />,
      );
      expect(container.querySelector(".size-sm")).toBeInTheDocument();
    });

    it("renders with medium size by default", () => {
      const { container } = render(
        <Combobox value="" onChange={() => {}} options={mockOptions} />,
      );
      expect(container.querySelector(".size-md")).toBeInTheDocument();
    });

    it("renders with large size", () => {
      const { container } = render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          size="lg"
        />,
      );
      expect(container.querySelector(".size-lg")).toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("displays error message when error prop is provided", () => {
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          error="Selection required"
        />,
      );
      expect(screen.getByText("Selection required")).toBeInTheDocument();
    });

    it("applies error styles when error is present", () => {
      const { container } = render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          error="Error"
        />,
      );
      expect(container.querySelector(".hasError")).toBeInTheDocument();
    });

    it("error message has role alert", () => {
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          error="Selection required"
        />,
      );
      expect(screen.getByRole("alert")).toHaveTextContent("Selection required");
    });
  });

  describe("Help Text", () => {
    it("displays help text when provided", () => {
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          helpText="Choose your preferred framework"
        />,
      );
      expect(
        screen.getByText("Choose your preferred framework"),
      ).toBeInTheDocument();
    });

    it("does not display help text when error is present", () => {
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          error="Error"
          helpText="Help text"
        />,
      );
      expect(screen.queryByText("Help text")).not.toBeInTheDocument();
    });
  });

  describe("Option Descriptions", () => {
    it("displays option descriptions when provided", async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptionsWithDescriptions}
        />,
      );

      await user.click(screen.getByRole("combobox"));

      expect(screen.getByText("A JavaScript library")).toBeInTheDocument();
      expect(screen.getByText("The Progressive Framework")).toBeInTheDocument();
    });
  });

  describe("Max Height", () => {
    it("applies custom maxHeight to dropdown", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          maxHeight="200px"
        />,
      );

      await user.click(screen.getByRole("combobox"));

      const dropdown = container.querySelector(".dropdown") as HTMLElement;
      expect(dropdown.style.maxHeight).toBe("200px");
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("has aria-autocomplete attribute", () => {
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-autocomplete",
        "list",
      );
    });

    it("has aria-expanded attribute", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("aria-expanded", "false");

      await user.click(input);
      expect(input).toHaveAttribute("aria-expanded", "true");
    });

    it("has aria-controls attribute", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      await user.click(screen.getByRole("combobox"));

      const input = screen.getByRole("combobox");
      const controlsId = input.getAttribute("aria-controls");
      if (controlsId) {
        expect(document.getElementById(controlsId)).toBeInTheDocument();
      }
    });

    it("supports aria-label", () => {
      render(
        <Combobox
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
          <Combobox
            value=""
            onChange={() => {}}
            options={mockOptions}
            aria-labelledby="label-id"
          />
        </>,
      );
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-labelledby",
        "label-id",
      );
    });

    it("has aria-invalid when error is present", () => {
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          error="Invalid"
        />,
      );
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("options have role option", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      await user.click(screen.getByRole("combobox"));

      const options = screen.getAllByRole("option");
      expect(options.length).toBeGreaterThan(0);
    });

    it("selected option has aria-selected", async () => {
      const user = userEvent.setup();
      render(
        <Combobox value="vue" onChange={() => {}} options={mockOptions} />,
      );

      await user.click(screen.getByRole("combobox"));

      const selectedOption = screen.getByRole("option", { name: /vue/i });
      expect(selectedOption).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Custom Icon", () => {
    it("renders custom left icon when provided", () => {
      const CustomIcon = () => <span data-testid="custom-icon">🔍</span>;
      render(
        <Combobox
          value=""
          onChange={() => {}}
          options={mockOptions}
          leftIcon={<CustomIcon />}
        />,
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty options array", () => {
      render(<Combobox value="" onChange={() => {}} options={[]} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("handles rapid typing", async () => {
      const user = userEvent.setup();
      render(<Combobox value="" onChange={() => {}} options={mockOptions} />);

      await user.type(screen.getByRole("combobox"), "react");

      expect(screen.getByText("React")).toBeInTheDocument();
    });

    it("maintains selected value across re-renders", () => {
      const { rerender } = render(
        <Combobox value="vue" onChange={() => {}} options={mockOptions} />,
      );

      rerender(
        <Combobox value="vue" onChange={() => {}} options={mockOptions} />,
      );

      expect(screen.getByDisplayValue("Vue")).toBeInTheDocument();
    });
  });
});
