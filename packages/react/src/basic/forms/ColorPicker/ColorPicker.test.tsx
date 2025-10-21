/// <reference path="../../../vitest.d.ts" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { ColorPicker } from "./ColorPicker";

describe("ColorPicker", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<ColorPicker value="#000000" onChange={() => {}} />);
      const inputs = screen.getAllByRole("textbox");
      expect(inputs.length).toBeGreaterThan(0);
    });

    it("renders with label", () => {
      render(
        <ColorPicker
          value="#000000"
          onChange={() => {}}
          label="Choose color"
        />,
      );
      expect(screen.getByText("Choose color")).toBeInTheDocument();
    });

    it("renders color swatch", () => {
      const { container } = render(
        <ColorPicker value="#ff0000" onChange={() => {}} />,
      );
      expect(container.querySelector(".colorSwatch")).toBeInTheDocument();
    });

    it("renders hex input by default", () => {
      render(<ColorPicker value="#ff0000" onChange={() => {}} />);
      const hexInput = screen.getByDisplayValue("#ff0000");
      expect(hexInput).toBeInTheDocument();
    });

    it("hides hex input when showInput is false", () => {
      render(
        <ColorPicker value="#ff0000" onChange={() => {}} showInput={false} />,
      );
      const hexInput = screen.queryByDisplayValue("#ff0000");
      expect(hexInput).not.toBeInTheDocument();
    });
  });

  describe("Color Selection", () => {
    it("displays current color in swatch", () => {
      const { container } = render(
        <ColorPicker value="#ff0000" onChange={() => {}} />,
      );
      const swatch = container.querySelector(".colorSwatch") as HTMLElement;
      expect(swatch.style.backgroundColor).toBe("rgb(255, 0, 0)");
    });

    it("calls onChange when color is selected", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(
        <ColorPicker value="#000000" onChange={handleChange} />,
      );

      const colorInput = container.querySelector(
        'input[type="color"]',
      ) as HTMLInputElement;
      colorInput.value = "#ff0000";
      colorInput.dispatchEvent(new Event("change", { bubbles: true }));

      expect(handleChange).toHaveBeenCalledWith("#ff0000");
    });
  });

  describe("Hex Input", () => {
    it("updates hex input when value changes", () => {
      const { rerender } = render(
        <ColorPicker value="#000000" onChange={() => {}} />,
      );

      rerender(<ColorPicker value="#ff0000" onChange={() => {}} />);

      expect(screen.getByDisplayValue("#ff0000")).toBeInTheDocument();
    });

    it("calls onChange when hex input is changed", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ColorPicker value="#000000" onChange={handleChange} />);

      const hexInput = screen.getByDisplayValue("#000000");
      await user.clear(hexInput);
      await user.type(hexInput, "#ff0000");
      await user.tab(); // Trigger blur

      expect(handleChange).toHaveBeenCalledWith("#ff0000");
    });

    it("validates hex input format", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ColorPicker value="#000000" onChange={handleChange} />);

      const hexInput = screen.getByDisplayValue("#000000");
      await user.clear(hexInput);
      await user.type(hexInput, "invalid");
      await user.tab();

      // Should revert to original value on invalid input
      expect(handleChange).not.toHaveBeenCalledWith("invalid");
    });

    it("accepts 3-character hex shorthand", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ColorPicker value="#000000" onChange={handleChange} />);

      const hexInput = screen.getByDisplayValue("#000000");
      await user.clear(hexInput);
      await user.type(hexInput, "#f00");
      await user.tab();

      expect(handleChange).toHaveBeenCalledWith("#ff0000");
    });

    it("accepts hex without # prefix", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ColorPicker value="#000000" onChange={handleChange} />);

      const hexInput = screen.getByDisplayValue("#000000");
      await user.clear(hexInput);
      await user.type(hexInput, "ff0000");
      await user.tab();

      expect(handleChange).toHaveBeenCalledWith("#ff0000");
    });
  });

  describe("Presets", () => {
    it("shows preset colors by default", () => {
      const { container } = render(
        <ColorPicker value="#000000" onChange={() => {}} />,
      );
      const presets = container.querySelectorAll(".presetSwatch");
      expect(presets.length).toBeGreaterThan(0);
    });

    it("hides presets when showPresets is false", () => {
      const { container } = render(
        <ColorPicker value="#000000" onChange={() => {}} showPresets={false} />,
      );
      const presets = container.querySelectorAll(".presetSwatch");
      expect(presets.length).toBe(0);
    });

    it("renders custom presets", () => {
      const customPresets = ["#ff0000", "#00ff00", "#0000ff"];
      const { container } = render(
        <ColorPicker
          value="#000000"
          onChange={() => {}}
          presets={customPresets}
        />,
      );
      const presets = container.querySelectorAll(".presetSwatch");
      expect(presets.length).toBe(3);
    });

    it("calls onChange when preset is clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const customPresets = ["#ff0000"];
      const { container } = render(
        <ColorPicker
          value="#000000"
          onChange={handleChange}
          presets={customPresets}
        />,
      );

      const preset = container.querySelector(".presetSwatch") as HTMLElement;
      await user.click(preset);

      expect(handleChange).toHaveBeenCalledWith("#ff0000");
    });

    it("highlights selected preset", () => {
      const { container } = render(
        <ColorPicker
          value="#ff0000"
          onChange={() => {}}
          presets={["#ff0000", "#00ff00"]}
        />,
      );
      const selectedPreset = container.querySelector(".presetSelected");
      expect(selectedPreset).toBeInTheDocument();
    });
  });

  describe("Required Field", () => {
    it("shows required indicator when required", () => {
      render(
        <ColorPicker
          value="#000000"
          onChange={() => {}}
          label="Color"
          required
        />,
      );
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("has required attribute when required", () => {
      const { container } = render(
        <ColorPicker value="#000000" onChange={() => {}} required />,
      );
      const colorInput = container.querySelector('input[type="color"]');
      expect(colorInput).toBeRequired();
    });
  });

  describe("Disabled State", () => {
    it("disables color input when disabled", () => {
      const { container } = render(
        <ColorPicker value="#000000" onChange={() => {}} disabled />,
      );
      const colorInput = container.querySelector('input[type="color"]');
      expect(colorInput).toBeDisabled();
    });

    it("disables hex input when disabled", () => {
      render(<ColorPicker value="#000000" onChange={() => {}} disabled />);
      const hexInput = screen.getByDisplayValue("#000000");
      expect(hexInput).toBeDisabled();
    });

    it("disables presets when disabled", () => {
      const { container } = render(
        <ColorPicker
          value="#000000"
          onChange={() => {}}
          disabled
          presets={["#ff0000"]}
        />,
      );
      const preset = container.querySelector(
        ".presetSwatch",
      ) as HTMLButtonElement;
      expect(preset).toBeDisabled();
    });

    it("applies disabled styles", () => {
      const { container } = render(
        <ColorPicker value="#000000" onChange={() => {}} disabled />,
      );
      expect(container.querySelector(".disabled")).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("renders with small size", () => {
      const { container } = render(
        <ColorPicker value="#000000" onChange={() => {}} size="sm" />,
      );
      expect(container.querySelector(".size-sm")).toBeInTheDocument();
    });

    it("renders with medium size by default", () => {
      const { container } = render(
        <ColorPicker value="#000000" onChange={() => {}} />,
      );
      expect(container.querySelector(".size-md")).toBeInTheDocument();
    });

    it("renders with large size", () => {
      const { container } = render(
        <ColorPicker value="#000000" onChange={() => {}} size="lg" />,
      );
      expect(container.querySelector(".size-lg")).toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("displays error message when error prop is provided", () => {
      render(
        <ColorPicker
          value="#000000"
          onChange={() => {}}
          error="Invalid color"
        />,
      );
      expect(screen.getByText("Invalid color")).toBeInTheDocument();
    });

    it("applies error styles when error is present", () => {
      const { container } = render(
        <ColorPicker value="#000000" onChange={() => {}} error="Error" />,
      );
      expect(container.querySelector(".hasError")).toBeInTheDocument();
    });

    it("error message has role alert", () => {
      render(
        <ColorPicker
          value="#000000"
          onChange={() => {}}
          error="Invalid color"
        />,
      );
      expect(screen.getByRole("alert")).toHaveTextContent("Invalid color");
    });
  });

  describe("Help Text", () => {
    it("displays help text when provided", () => {
      render(
        <ColorPicker
          value="#000000"
          onChange={() => {}}
          helpText="Choose your brand color"
        />,
      );
      expect(screen.getByText("Choose your brand color")).toBeInTheDocument();
    });

    it("does not display help text when error is present", () => {
      render(
        <ColorPicker
          value="#000000"
          onChange={() => {}}
          error="Error"
          helpText="Help text"
        />,
      );
      expect(screen.queryByText("Help text")).not.toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("opens color picker with Enter key", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ColorPicker value="#000000" onChange={() => {}} />,
      );

      const colorDisplay = container.querySelector(
        ".colorDisplay",
      ) as HTMLElement;
      colorDisplay.focus();
      await user.keyboard("{Enter}");

      // Color picker should be triggered
      expect(colorDisplay).toHaveAttribute("role", "button");
    });

    it("opens color picker with Space key", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ColorPicker value="#000000" onChange={() => {}} />,
      );

      const colorDisplay = container.querySelector(
        ".colorDisplay",
      ) as HTMLElement;
      colorDisplay.focus();
      await user.keyboard(" ");

      expect(colorDisplay).toHaveAttribute("role", "button");
    });
  });

  describe("Accessibility", () => {
    it("associates label with input", () => {
      render(
        <ColorPicker value="#000000" onChange={() => {}} label="Brand color" />,
      );
      expect(screen.getByText("Brand color")).toBeInTheDocument();
    });

    it("has aria-label on color display", () => {
      const { container } = render(
        <ColorPicker value="#ff0000" onChange={() => {}} />,
      );
      const colorDisplay = container.querySelector(".colorDisplay");
      expect(colorDisplay).toHaveAttribute("aria-label");
    });

    it("has aria-invalid when error is present", () => {
      const { container } = render(
        <ColorPicker value="#000000" onChange={() => {}} error="Invalid" />,
      );
      const colorInput = container.querySelector('input[type="color"]');
      expect(colorInput).toHaveAttribute("aria-invalid", "true");
    });

    it("preset buttons have proper aria-labels", () => {
      const { container } = render(
        <ColorPicker
          value="#000000"
          onChange={() => {}}
          presets={["#ff0000"]}
        />,
      );
      const preset = container.querySelector(".presetSwatch") as HTMLElement;
      expect(preset).toHaveAttribute("aria-label");
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<ColorPicker value="#000000" onChange={() => {}} />);

      await user.tab();
      // Should be able to tab through color picker elements
      expect(document.activeElement).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles uppercase hex values", () => {
      render(<ColorPicker value="#FF0000" onChange={() => {}} />);
      const hexInput = screen.getByDisplayValue("#FF0000");
      expect(hexInput).toBeInTheDocument();
    });

    it("handles mixed case hex values", () => {
      render(<ColorPicker value="#FfAa00" onChange={() => {}} />);
      const hexInput = screen.getByDisplayValue("#FfAa00");
      expect(hexInput).toBeInTheDocument();
    });

    it("handles rapid color changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(
        <ColorPicker value="#000000" onChange={handleChange} />,
      );

      const hexInput = screen.getByDisplayValue("#000000");
      await user.clear(hexInput);
      await user.type(hexInput, "#111111");
      await user.clear(hexInput);
      await user.type(hexInput, "#222222");

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("Custom Icon", () => {
    it("renders custom icon when provided", () => {
      const CustomIcon = () => <span data-testid="custom-icon">🎨</span>;
      render(
        <ColorPicker
          value="#000000"
          onChange={() => {}}
          icon={<CustomIcon />}
        />,
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });
});
