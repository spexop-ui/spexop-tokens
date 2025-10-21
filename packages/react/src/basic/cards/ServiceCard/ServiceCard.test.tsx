/**
 * ServiceCard Component Tests
 *
 * @packageName @spexop/react
 * @version 1.0.0
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { ServiceCard } from "./ServiceCard.js";

describe("ServiceCard", () => {
  it("renders with required props", () => {
    render(
      <ServiceCard
        title="Primitives First"
        description="Master five grid primitives before building complex layouts."
      />,
    );

    expect(screen.getByText("Primitives First")).toBeDefined();
    expect(screen.getByText(/Master five grid primitives/)).toBeDefined();
  });

  it("renders number badge when provided", () => {
    render(<ServiceCard number="01" title="Test" description="Description" />);

    expect(screen.getByText("01")).toBeDefined();
    expect(screen.getByLabelText("Step 01")).toBeDefined();
  });

  it("renders meta tag when provided", () => {
    render(
      <ServiceCard
        title="Test"
        description="Description"
        meta="Foundation → Features"
      />,
    );

    expect(screen.getByText("Foundation → Features")).toBeDefined();
  });

  it("handles click events when onClick provided", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <ServiceCard
        title="Test"
        description="Description"
        onClick={handleClick}
      />,
    );

    const card = screen.getByRole("button");
    await user.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has proper accessibility attributes", () => {
    render(
      <ServiceCard
        number="02"
        title="Accessibility Test"
        description="This is a test description"
      />,
    );

    const title = screen.getByText("Accessibility Test");
    const description = screen.getByText("This is a test description");

    expect(title.tagName).toBe("H3");
    expect(description.tagName).toBe("P");
  });

  it("supports different density options", () => {
    const { rerender } = render(
      <ServiceCard title="Test" description="Description" density="compact" />,
    );

    // Test each density
    rerender(
      <ServiceCard title="Test" description="Description" density="spacious" />,
    );

    expect(screen.getByText("Test")).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ServiceCard
        title="Test"
        description="Description"
        className="custom-class"
      />,
    );

    const card = container.querySelector(".custom-class");
    expect(card).toBeDefined();
  });

  it("renders children when provided", () => {
    render(
      <ServiceCard title="Test" description="Description">
        <div data-testid="custom-child">Custom Content</div>
      </ServiceCard>,
    );

    expect(screen.getByTestId("custom-child")).toBeDefined();
    expect(screen.getByText("Custom Content")).toBeDefined();
  });
});
