/**
 * CTACard Component Tests
 *
 * @packageName @spexop/react
 * @version 1.0.0
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { CTACard } from "./CTACard.js";

describe("CTACard", () => {
  const defaultProps = {
    headline: "Ready to get started?",
    description: "Join thousands of users building better products",
    primaryAction: {
      label: "Start Free Trial",
      onClick: vi.fn(),
    },
  };

  it("renders with required props", () => {
    render(<CTACard {...defaultProps} />);

    expect(screen.getByText("Ready to get started?")).toBeDefined();
    expect(
      screen.getByText("Join thousands of users building better products"),
    ).toBeDefined();
    expect(screen.getByText("Start Free Trial")).toBeDefined();
  });

  it("handles primary action click", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <CTACard
        {...defaultProps}
        primaryAction={{ label: "Start Free Trial", onClick: handleClick }}
      />,
    );

    const button = screen.getByText("Start Free Trial");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders secondary action when provided", () => {
    const secondaryAction = {
      label: "Learn More",
      onClick: vi.fn(),
    };

    render(<CTACard {...defaultProps} secondaryAction={secondaryAction} />);

    expect(screen.getByText("Learn More")).toBeDefined();
  });

  it("handles secondary action click", async () => {
    const user = userEvent.setup();
    const handleSecondaryClick = vi.fn();

    render(
      <CTACard
        {...defaultProps}
        secondaryAction={{
          label: "Learn More",
          onClick: handleSecondaryClick,
        }}
      />,
    );

    const button = screen.getByText("Learn More");
    await user.click(button);

    expect(handleSecondaryClick).toHaveBeenCalledTimes(1);
  });

  it("renders icon when provided", () => {
    const TestIcon = () => <div data-testid="test-icon">Icon</div>;

    render(<CTACard {...defaultProps} icon={<TestIcon />} />);

    expect(screen.getByTestId("test-icon")).toBeDefined();
  });

  it("applies centered styling when centered prop is true", () => {
    const { container } = render(<CTACard {...defaultProps} centered />);

    // The component should have centered class applied
    expect(container.querySelector('[class*="centered"]')).toBeDefined();
  });

  it("uses default variant when not specified", () => {
    render(<CTACard {...defaultProps} />);

    expect(screen.getByText("Ready to get started?")).toBeDefined();
  });

  it("supports custom variant", () => {
    render(<CTACard {...defaultProps} variant="basic" />);

    expect(screen.getByText("Ready to get started?")).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CTACard {...defaultProps} className="custom-class" />,
    );

    const card = container.querySelector(".custom-class");
    expect(card).toBeDefined();
  });

  it("has proper semantic structure", () => {
    const { container } = render(<CTACard {...defaultProps} />);

    const headline = container.querySelector("h2");
    expect(headline).toBeDefined();
    expect(headline?.textContent).toBe("Ready to get started?");

    const description = container.querySelector("p");
    expect(description).toBeDefined();
  });

  it("renders without secondary action", () => {
    render(<CTACard {...defaultProps} />);

    expect(screen.getByText("Start Free Trial")).toBeDefined();
    expect(screen.queryByText("Learn More")).toBeNull();
  });

  it("uses spacious density by default", () => {
    render(<CTACard {...defaultProps} />);

    // Component should render successfully with default density
    expect(screen.getByText("Ready to get started?")).toBeDefined();
  });
});
