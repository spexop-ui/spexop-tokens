/// <reference path="../../../vitest.d.ts" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<Slider value={50} onChange={() => {}} />);
      expect(screen.getByRole("slider")).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(
        <Slider value={50} onChange={() => {}} className="custom-class" />,
      );
      expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("renders with custom id", () => {
      render(<Slider value={50} onChange={() => {}} id="custom-id" />);
      expect(screen.getByRole("slider")).toHaveAttribute("id", "custom-id");
    });

    it("renders track element", () => {
      const { container } = render(<Slider value={50} onChange={() => {}} />);
      expect(container.querySelector(".track")).toBeInTheDocument();
    });

    it("renders thumb element", () => {
      const { container } = render(<Slider value={50} onChange={() => {}} />);
      expect(container.querySelector(".thumb")).toBeInTheDocument();
    });

    it("renders progress element", () => {
      const { container } = render(<Slider value={50} onChange={() => {}} />);
      expect(container.querySelector(".progress")).toBeInTheDocument();
    });
  });

  describe("Value Display", () => {
    it("shows value when showValue is true", () => {
      render(<Slider value={75} onChange={() => {}} showValue />);
      expect(screen.getByText("75")).toBeInTheDocument();
    });

    it("does not show value by default", () => {
      const { container } = render(<Slider value={75} onChange={() => {}} />);
      expect(container.querySelector(".value")).not.toBeInTheDocument();
    });

    it("formats value with custom formatter", () => {
      render(
        <Slider
          value={50}
          onChange={() => {}}
          showValue
          formatValue={(val) => `${val}%`}
        />,
      );
      expect(screen.getByText("50%")).toBeInTheDocument();
    });
  });

  describe("Min/Max/Step", () => {
    it("uses default min of 0", () => {
      render(<Slider value={50} onChange={() => {}} />);
      expect(screen.getByRole("slider")).toHaveAttribute("min", "0");
    });

    it("uses default max of 100", () => {
      render(<Slider value={50} onChange={() => {}} />);
      expect(screen.getByRole("slider")).toHaveAttribute("max", "100");
    });

    it("uses default step of 1", () => {
      render(<Slider value={50} onChange={() => {}} />);
      expect(screen.getByRole("slider")).toHaveAttribute("step", "1");
    });

    it("applies custom min value", () => {
      render(<Slider value={50} onChange={() => {}} min={10} />);
      expect(screen.getByRole("slider")).toHaveAttribute("min", "10");
    });

    it("applies custom max value", () => {
      render(<Slider value={50} onChange={() => {}} max={200} />);
      expect(screen.getByRole("slider")).toHaveAttribute("max", "200");
    });

    it("applies custom step value", () => {
      render(<Slider value={50} onChange={() => {}} step={5} />);
      expect(screen.getByRole("slider")).toHaveAttribute("step", "5");
    });
  });

  describe("Interactions", () => {
    it("calls onChange when value changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider value={50} onChange={handleChange} />);

      const slider = screen.getByRole("slider");
      await user.click(slider);

      expect(handleChange).toHaveBeenCalled();
    });

    it("updates value on drag", async () => {
      const handleChange = vi.fn();
      render(<Slider value={50} onChange={handleChange} />);

      const slider = screen.getByRole("slider") as HTMLInputElement;
      slider.value = "75";
      slider.dispatchEvent(new Event("change", { bubbles: true }));

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("Keyboard Navigation", () => {
    it("increases value with ArrowRight", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider value={50} onChange={handleChange} step={1} />);

      const slider = screen.getByRole("slider");
      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(handleChange).toHaveBeenCalledWith(51);
    });

    it("increases value with ArrowUp", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider value={50} onChange={handleChange} step={1} />);

      const slider = screen.getByRole("slider");
      slider.focus();
      await user.keyboard("{ArrowUp}");

      expect(handleChange).toHaveBeenCalledWith(51);
    });

    it("decreases value with ArrowLeft", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider value={50} onChange={handleChange} step={1} />);

      const slider = screen.getByRole("slider");
      slider.focus();
      await user.keyboard("{ArrowLeft}");

      expect(handleChange).toHaveBeenCalledWith(49);
    });

    it("decreases value with ArrowDown", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider value={50} onChange={handleChange} step={1} />);

      const slider = screen.getByRole("slider");
      slider.focus();
      await user.keyboard("{ArrowDown}");

      expect(handleChange).toHaveBeenCalledWith(49);
    });

    it("sets to min value with Home key", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider value={50} onChange={handleChange} min={0} />);

      const slider = screen.getByRole("slider");
      slider.focus();
      await user.keyboard("{Home}");

      expect(handleChange).toHaveBeenCalledWith(0);
    });

    it("sets to max value with End key", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider value={50} onChange={handleChange} max={100} />);

      const slider = screen.getByRole("slider");
      slider.focus();
      await user.keyboard("{End}");

      expect(handleChange).toHaveBeenCalledWith(100);
    });

    it("increases by larger step with PageUp", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider value={50} onChange={handleChange} step={2} />);

      const slider = screen.getByRole("slider");
      slider.focus();
      await user.keyboard("{PageUp}");

      expect(handleChange).toHaveBeenCalledWith(60);
    });

    it("decreases by larger step with PageDown", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider value={50} onChange={handleChange} step={2} />);

      const slider = screen.getByRole("slider");
      slider.focus();
      await user.keyboard("{PageDown}");

      expect(handleChange).toHaveBeenCalledWith(40);
    });

    it("respects max value when increasing", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider value={99} onChange={handleChange} max={100} step={5} />);

      const slider = screen.getByRole("slider");
      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(handleChange).toHaveBeenCalledWith(100);
    });

    it("respects min value when decreasing", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider value={1} onChange={handleChange} min={0} step={5} />);

      const slider = screen.getByRole("slider");
      slider.focus();
      await user.keyboard("{ArrowLeft}");

      expect(handleChange).toHaveBeenCalledWith(0);
    });
  });

  describe("Disabled State", () => {
    it("renders as disabled when disabled prop is true", () => {
      render(<Slider value={50} onChange={() => {}} disabled />);
      expect(screen.getByRole("slider")).toBeDisabled();
    });

    it("does not call onChange when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider value={50} onChange={handleChange} disabled />);

      const slider = screen.getByRole("slider");
      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("applies disabled styles", () => {
      const { container } = render(
        <Slider value={50} onChange={() => {}} disabled />,
      );
      expect(container.querySelector(".disabled")).toBeInTheDocument();
    });

    it("cannot be focused when disabled", () => {
      render(<Slider value={50} onChange={() => {}} disabled />);
      const slider = screen.getByRole("slider");
      slider.focus();
      expect(slider).not.toHaveFocus();
    });
  });

  describe("Density Variants", () => {
    it("renders with compact density", () => {
      const { container } = render(
        <Slider value={50} onChange={() => {}} density="compact" />,
      );
      expect(container.querySelector(".densityCompact")).toBeInTheDocument();
    });

    it("renders with normal density by default", () => {
      const { container } = render(<Slider value={50} onChange={() => {}} />);
      expect(container.querySelector(".densityNormal")).toBeInTheDocument();
    });

    it("renders with spacious density", () => {
      const { container } = render(
        <Slider value={50} onChange={() => {}} density="spacious" />,
      );
      expect(container.querySelector(".densitySpacious")).toBeInTheDocument();
    });
  });

  describe("Tick Marks", () => {
    it("does not show ticks by default", () => {
      const { container } = render(<Slider value={50} onChange={() => {}} />);
      expect(container.querySelector(".tickContainer")).not.toBeInTheDocument();
    });

    it("shows ticks when showTicks is true", () => {
      const { container } = render(
        <Slider value={50} onChange={() => {}} showTicks step={25} />,
      );
      expect(container.querySelector(".tickContainer")).toBeInTheDocument();
    });

    it("renders correct number of ticks based on step", () => {
      const { container } = render(
        <Slider
          value={50}
          onChange={() => {}}
          showTicks
          min={0}
          max={100}
          step={25}
        />,
      );
      const ticks = container.querySelectorAll(".tick");
      expect(ticks).toHaveLength(5); // 0, 25, 50, 75, 100
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Slider value={50} onChange={() => {}} />);
      expect(screen.getByRole("slider")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(
        <Slider value={50} onChange={() => {}} aria-label="Volume control" />,
      );
      expect(screen.getByLabelText("Volume control")).toBeInTheDocument();
    });

    it("supports aria-labelledby", () => {
      render(
        <>
          <span id="label-id">Brightness</span>
          <Slider value={50} onChange={() => {}} aria-labelledby="label-id" />
        </>,
      );
      expect(screen.getByRole("slider")).toHaveAttribute(
        "aria-labelledby",
        "label-id",
      );
    });

    it("has aria-valuemin attribute", () => {
      render(<Slider value={50} onChange={() => {}} min={10} />);
      expect(screen.getByRole("slider")).toHaveAttribute("aria-valuemin", "10");
    });

    it("has aria-valuemax attribute", () => {
      render(<Slider value={50} onChange={() => {}} max={200} />);
      expect(screen.getByRole("slider")).toHaveAttribute(
        "aria-valuemax",
        "200",
      );
    });

    it("has aria-valuenow attribute", () => {
      render(<Slider value={75} onChange={() => {}} />);
      expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "75");
    });

    it("updates aria-valuenow when value changes", () => {
      const { rerender } = render(<Slider value={50} onChange={() => {}} />);
      expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "50");

      rerender(<Slider value={75} onChange={() => {}} />);
      expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "75");
    });

    it("is keyboard accessible", () => {
      render(<Slider value={50} onChange={() => {}} />);
      const slider = screen.getByRole("slider");
      slider.focus();
      expect(slider).toHaveFocus();
    });
  });

  describe("Edge Cases", () => {
    it("handles value at minimum", () => {
      render(<Slider value={0} onChange={() => {}} min={0} />);
      expect(screen.getByRole("slider")).toHaveValue("0");
    });

    it("handles value at maximum", () => {
      render(<Slider value={100} onChange={() => {}} max={100} />);
      expect(screen.getByRole("slider")).toHaveValue("100");
    });

    it("handles decimal step values", () => {
      render(<Slider value={50.5} onChange={() => {}} step={0.5} />);
      expect(screen.getByRole("slider")).toHaveAttribute("step", "0.5");
    });

    it("handles negative min values", () => {
      render(<Slider value={0} onChange={() => {}} min={-100} max={100} />);
      expect(screen.getByRole("slider")).toHaveAttribute("min", "-100");
    });

    it("handles large ranges", () => {
      render(<Slider value={500} onChange={() => {}} min={0} max={1000} />);
      expect(screen.getByRole("slider")).toHaveValue("500");
    });

    it("maintains value across re-renders", () => {
      const { rerender } = render(<Slider value={75} onChange={() => {}} />);

      rerender(<Slider value={75} onChange={() => {}} />);

      expect(screen.getByRole("slider")).toHaveValue("75");
    });
  });

  describe("ID Generation", () => {
    it("uses provided id", () => {
      render(<Slider value={50} onChange={() => {}} id="custom-id-123" />);
      expect(screen.getByRole("slider")).toHaveAttribute("id", "custom-id-123");
    });

    it("generates unique id when not provided", () => {
      const { rerender } = render(<Slider value={50} onChange={() => {}} />);
      const firstId = screen.getByRole("slider").id;

      rerender(<Slider value={50} onChange={() => {}} />);
      const secondId = screen.getByRole("slider").id;

      expect(firstId).toBeTruthy();
      expect(secondId).toBeTruthy();
    });
  });

  describe("Progress Bar", () => {
    it("progress width matches value percentage", () => {
      const { container } = render(
        <Slider value={50} onChange={() => {}} min={0} max={100} />,
      );
      const progress = container.querySelector(".progress") as HTMLElement;
      expect(progress.style.width).toBe("50%");
    });

    it("progress width is 0% at minimum", () => {
      const { container } = render(
        <Slider value={0} onChange={() => {}} min={0} max={100} />,
      );
      const progress = container.querySelector(".progress") as HTMLElement;
      expect(progress.style.width).toBe("0%");
    });

    it("progress width is 100% at maximum", () => {
      const { container } = render(
        <Slider value={100} onChange={() => {}} min={0} max={100} />,
      );
      const progress = container.querySelector(".progress") as HTMLElement;
      expect(progress.style.width).toBe("100%");
    });
  });
});
