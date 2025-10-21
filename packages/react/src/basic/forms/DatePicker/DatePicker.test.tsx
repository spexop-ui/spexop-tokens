/// <reference path="../../../vitest.d.ts" />

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  const today = new Date();
  const todayISO = today.toISOString();

  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<DatePicker value="" onChange={() => {}} />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<DatePicker value="" onChange={() => {}} label="Select date" />);
      expect(screen.getByText("Select date")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      render(
        <DatePicker value="" onChange={() => {}} placeholder="Choose a date" />,
      );
      expect(screen.getByPlaceholderText("Choose a date")).toBeInTheDocument();
    });

    it("renders calendar icon", () => {
      const { container } = render(<DatePicker value="" onChange={() => {}} />);
      expect(container.querySelector(".calendarIcon")).toBeInTheDocument();
    });

    it("input is readonly", () => {
      render(<DatePicker value="" onChange={() => {}} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
    });
  });

  describe("Calendar Display", () => {
    it("shows calendar when input is clicked", async () => {
      const user = userEvent.setup();
      render(<DatePicker value="" onChange={() => {}} />);

      await user.click(screen.getByRole("textbox"));

      expect(
        screen.getByRole("button", { name: /previous month/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /next month/i }),
      ).toBeInTheDocument();
    });

    it("closes calendar when clicking outside", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <DatePicker value="" onChange={() => {}} />
          <button type="button">Outside</button>
        </div>,
      );

      await user.click(screen.getByRole("textbox"));
      expect(
        screen.getByRole("button", { name: /previous month/i }),
      ).toBeInTheDocument();

      await user.click(screen.getByText("Outside"));
      expect(
        screen.queryByRole("button", { name: /previous month/i }),
      ).not.toBeInTheDocument();
    });

    it("displays current month and year", async () => {
      const user = userEvent.setup();
      render(<DatePicker value="" onChange={() => {}} />);

      await user.click(screen.getByRole("textbox"));

      const monthYear = today.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      expect(
        screen.getByText(new RegExp(monthYear.split(" ")[0])),
      ).toBeInTheDocument();
    });

    it("displays weekday headers", async () => {
      const user = userEvent.setup();
      const { container } = render(<DatePicker value="" onChange={() => {}} />);

      await user.click(screen.getByRole("textbox"));

      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      for (const day of weekdays) {
        expect(screen.getByText(day)).toBeInTheDocument();
      }
    });

    it("displays days of current month", async () => {
      const user = userEvent.setup();
      render(<DatePicker value="" onChange={() => {}} />);

      await user.click(screen.getByRole("textbox"));

      // Should show day 1 and other days
      expect(screen.getByText("1")).toBeInTheDocument();
    });
  });

  describe("Date Selection", () => {
    it("calls onChange when a date is selected", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<DatePicker value="" onChange={handleChange} />);

      await user.click(screen.getByRole("textbox"));
      await user.click(screen.getByText("15"));

      expect(handleChange).toHaveBeenCalled();
      expect(typeof handleChange.mock.calls[0][0]).toBe("string");
    });

    it("closes calendar after selecting a date", async () => {
      const user = userEvent.setup();
      render(<DatePicker value="" onChange={() => {}} />);

      await user.click(screen.getByRole("textbox"));
      await user.click(screen.getByText("15"));

      expect(
        screen.queryByRole("button", { name: /previous month/i }),
      ).not.toBeInTheDocument();
    });

    it("displays selected date in input", () => {
      const date = new Date(2024, 0, 15).toISOString();
      render(<DatePicker value={date} onChange={() => {}} />);

      const input = screen.getByRole("textbox") as HTMLInputElement;
      expect(input.value).toContain("01");
      expect(input.value).toContain("15");
      expect(input.value).toContain("2024");
    });
  });

  describe("Month Navigation", () => {
    it("navigates to previous month", async () => {
      const user = userEvent.setup();
      render(<DatePicker value="" onChange={() => {}} />);

      await user.click(screen.getByRole("textbox"));
      const currentMonth = screen.getByText(
        new RegExp(today.toLocaleString("default", { month: "long" })),
      ).textContent;

      await user.click(screen.getByRole("button", { name: /previous month/i }));

      const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1);
      expect(
        screen.getByText(
          new RegExp(prevMonth.toLocaleString("default", { month: "long" })),
        ),
      ).toBeInTheDocument();
    });

    it("navigates to next month", async () => {
      const user = userEvent.setup();
      render(<DatePicker value="" onChange={() => {}} />);

      await user.click(screen.getByRole("textbox"));

      await user.click(screen.getByRole("button", { name: /next month/i }));

      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
      expect(
        screen.getByText(
          new RegExp(nextMonth.toLocaleString("default", { month: "long" })),
        ),
      ).toBeInTheDocument();
    });

    it("updates year when navigating across year boundary", async () => {
      const user = userEvent.setup();
      render(
        <DatePicker
          value={new Date(2024, 0, 15).toISOString()}
          onChange={() => {}}
        />,
      );

      await user.click(screen.getByRole("textbox"));

      // Navigate backwards from January
      await user.click(screen.getByRole("button", { name: /previous month/i }));

      expect(screen.getByText(/2023/)).toBeInTheDocument();
    });
  });

  describe("Date Formats", () => {
    it("formats date as MM/DD/YYYY by default", () => {
      const date = new Date(2024, 0, 15).toISOString();
      render(<DatePicker value={date} onChange={() => {}} />);

      expect(screen.getByDisplayValue("01/15/2024")).toBeInTheDocument();
    });

    it("formats date as DD/MM/YYYY when specified", () => {
      const date = new Date(2024, 0, 15).toISOString();
      render(
        <DatePicker value={date} onChange={() => {}} format="DD/MM/YYYY" />,
      );

      expect(screen.getByDisplayValue("15/01/2024")).toBeInTheDocument();
    });

    it("formats date as YYYY-MM-DD when specified", () => {
      const date = new Date(2024, 0, 15).toISOString();
      render(
        <DatePicker value={date} onChange={() => {}} format="YYYY-MM-DD" />,
      );

      expect(screen.getByDisplayValue("2024-01-15")).toBeInTheDocument();
    });
  });

  describe("Min/Max Date Range", () => {
    it("disables dates before min date", async () => {
      const user = userEvent.setup();
      const minDate = new Date(2024, 0, 15).toISOString();
      const { container } = render(
        <DatePicker value="" onChange={() => {}} min={minDate} />,
      );

      await user.click(screen.getByRole("textbox"));

      // Dates before 15th should be disabled
      const disabledDates = container.querySelectorAll(".disabled");
      expect(disabledDates.length).toBeGreaterThan(0);
    });

    it("disables dates after max date", async () => {
      const user = userEvent.setup();
      const maxDate = new Date(2024, 0, 15).toISOString();
      const { container } = render(
        <DatePicker value="" onChange={() => {}} max={maxDate} />,
      );

      await user.click(screen.getByRole("textbox"));

      // Dates after 15th should be disabled
      const disabledDates = container.querySelectorAll(".disabled");
      expect(disabledDates.length).toBeGreaterThan(0);
    });

    it("does not select disabled dates", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const maxDate = new Date(2024, 0, 10).toISOString();
      const { container } = render(
        <DatePicker value="" onChange={handleChange} max={maxDate} />,
      );

      await user.click(screen.getByRole("textbox"));

      // Try to click a disabled date (15th is after max)
      const day15 = screen.getByText("15");
      const parent = day15.closest("button");
      if (parent?.disabled) {
        await user.click(parent);
        expect(handleChange).not.toHaveBeenCalled();
      }
    });
  });

  describe("Keyboard Navigation", () => {
    it("opens calendar with Enter key", async () => {
      const user = userEvent.setup();
      render(<DatePicker value="" onChange={() => {}} />);

      screen.getByRole("textbox").focus();
      await user.keyboard("{Enter}");

      expect(
        screen.getByRole("button", { name: /previous month/i }),
      ).toBeInTheDocument();
    });

    it("closes calendar with Escape key", async () => {
      const user = userEvent.setup();
      render(<DatePicker value="" onChange={() => {}} />);

      await user.click(screen.getByRole("textbox"));
      expect(
        screen.getByRole("button", { name: /previous month/i }),
      ).toBeInTheDocument();

      await user.keyboard("{Escape}");

      expect(
        screen.queryByRole("button", { name: /previous month/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe("Required Field", () => {
    it("shows required indicator when required", () => {
      render(<DatePicker value="" onChange={() => {}} label="Date" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("has aria-required when required", () => {
      render(<DatePicker value="" onChange={() => {}} required />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-required",
        "true",
      );
    });
  });

  describe("Disabled State", () => {
    it("disables input when disabled", () => {
      render(<DatePicker value="" onChange={() => {}} disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("does not open calendar when disabled", async () => {
      const user = userEvent.setup();
      render(<DatePicker value="" onChange={() => {}} disabled />);

      await user.click(screen.getByRole("textbox"));

      expect(
        screen.queryByRole("button", { name: /previous month/i }),
      ).not.toBeInTheDocument();
    });

    it("applies disabled styles", () => {
      const { container } = render(
        <DatePicker value="" onChange={() => {}} disabled />,
      );
      expect(container.querySelector(".disabled")).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("renders with small size", () => {
      const { container } = render(
        <DatePicker value="" onChange={() => {}} size="sm" />,
      );
      expect(container.querySelector(".size-sm")).toBeInTheDocument();
    });

    it("renders with medium size by default", () => {
      const { container } = render(<DatePicker value="" onChange={() => {}} />);
      expect(container.querySelector(".size-md")).toBeInTheDocument();
    });

    it("renders with large size", () => {
      const { container } = render(
        <DatePicker value="" onChange={() => {}} size="lg" />,
      );
      expect(container.querySelector(".size-lg")).toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("displays error message when error prop is provided", () => {
      render(<DatePicker value="" onChange={() => {}} error="Invalid date" />);
      expect(screen.getByText("Invalid date")).toBeInTheDocument();
    });

    it("applies error styles when error is present", () => {
      const { container } = render(
        <DatePicker value="" onChange={() => {}} error="Error" />,
      );
      expect(container.querySelector(".hasError")).toBeInTheDocument();
    });

    it("error message has role alert", () => {
      render(<DatePicker value="" onChange={() => {}} error="Invalid date" />);
      expect(screen.getByRole("alert")).toHaveTextContent("Invalid date");
    });
  });

  describe("Help Text", () => {
    it("displays help text when provided", () => {
      render(
        <DatePicker
          value=""
          onChange={() => {}}
          helpText="Select your birth date"
        />,
      );
      expect(screen.getByText("Select your birth date")).toBeInTheDocument();
    });

    it("does not display help text when error is present", () => {
      render(
        <DatePicker
          value=""
          onChange={() => {}}
          error="Error"
          helpText="Help text"
        />,
      );
      expect(screen.queryByText("Help text")).not.toBeInTheDocument();
    });
  });

  describe("First Day of Week", () => {
    it("starts week on Sunday by default", async () => {
      const user = userEvent.setup();
      render(<DatePicker value="" onChange={() => {}} />);

      await user.click(screen.getByRole("textbox"));

      const weekdays = screen.getAllByText(/sun|mon|tue|wed|thu|fri|sat/i);
      expect(weekdays[0]).toHaveTextContent("Sun");
    });

    it("can start week on Monday", async () => {
      const user = userEvent.setup();
      render(<DatePicker value="" onChange={() => {}} firstDayOfWeek={1} />);

      await user.click(screen.getByRole("textbox"));

      const weekdays = screen.getAllByText(/sun|mon|tue|wed|thu|fri|sat/i);
      expect(weekdays[0]).toHaveTextContent("Mon");
    });
  });

  describe("Accessibility", () => {
    it("associates label with input", () => {
      render(<DatePicker value="" onChange={() => {}} label="Birth date" />);
      expect(screen.getByLabelText("Birth date")).toBeInTheDocument();
    });

    it("has aria-invalid when error is present", () => {
      render(<DatePicker value="" onChange={() => {}} error="Invalid" />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("calendar days have proper aria labels", async () => {
      const user = userEvent.setup();
      render(<DatePicker value="" onChange={() => {}} />);

      await user.click(screen.getByRole("textbox"));

      const day15 = screen.getByText("15").closest("button");
      expect(day15).toHaveAttribute("aria-label");
    });

    it("selected date has aria-selected", async () => {
      const user = userEvent.setup();
      const date = new Date(
        today.getFullYear(),
        today.getMonth(),
        15,
      ).toISOString();
      render(<DatePicker value={date} onChange={() => {}} />);

      await user.click(screen.getByRole("textbox"));

      const day15 = screen.getByText("15").closest("button");
      expect(day15).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty value", () => {
      render(<DatePicker value="" onChange={() => {}} />);
      expect(screen.getByRole("textbox")).toHaveValue("");
    });

    it("handles invalid date string", () => {
      render(<DatePicker value="invalid" onChange={() => {}} />);
      expect(screen.getByRole("textbox")).toHaveValue("");
    });

    it("maintains calendar position across month changes", async () => {
      const user = userEvent.setup();
      render(<DatePicker value="" onChange={() => {}} />);

      await user.click(screen.getByRole("textbox"));
      await user.click(screen.getByRole("button", { name: /next month/i }));
      await user.click(screen.getByRole("button", { name: /previous month/i }));

      expect(
        screen.getByRole("button", { name: /previous month/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Custom Icon", () => {
    it("renders custom left icon when provided", () => {
      const CustomIcon = () => <span data-testid="custom-icon">📅</span>;
      render(
        <DatePicker value="" onChange={() => {}} leftIcon={<CustomIcon />} />,
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });
});
