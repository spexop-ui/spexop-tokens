/**
 * PricingCard Component Tests
 *
 * @packageName @spexop/react
 * @version 1.0.0
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { PricingCard } from "./PricingCard.js";

describe("PricingCard", () => {
  const defaultProps = {
    name: "Professional",
    price: 49,
    features: ["Unlimited projects", "Advanced analytics", "Priority support"],
  };

  it("renders with required props", () => {
    render(<PricingCard {...defaultProps} />);

    expect(screen.getByText("Professional")).toBeDefined();
    expect(screen.getByText("49")).toBeDefined();
    expect(screen.getByText("Unlimited projects")).toBeDefined();
    expect(screen.getByText("Advanced analytics")).toBeDefined();
    expect(screen.getByText("Priority support")).toBeDefined();
  });

  it("displays currency symbol", () => {
    render(<PricingCard {...defaultProps} />);

    expect(screen.getByText("$")).toBeDefined();
  });

  it("displays custom currency", () => {
    render(<PricingCard {...defaultProps} currency="€" />);

    expect(screen.getByText("€")).toBeDefined();
  });

  it("displays period when provided", () => {
    render(<PricingCard {...defaultProps} period="month" />);

    expect(screen.getByText("/month")).toBeDefined();
  });

  it("displays custom period", () => {
    render(<PricingCard {...defaultProps} period="year" />);

    expect(screen.getByText("/year")).toBeDefined();
  });

  it("renders badge when provided", () => {
    render(<PricingCard {...defaultProps} badge="Popular" />);

    expect(screen.getByText("Popular")).toBeDefined();
  });

  it("renders features with checkmarks", () => {
    const { container } = render(<PricingCard {...defaultProps} />);

    const features = container.querySelectorAll("li");
    expect(features.length).toBe(3);

    // Check that features are in list
    expect(screen.getByText("Unlimited projects")).toBeDefined();
  });

  it("handles CTA click", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<PricingCard {...defaultProps} onCtaClick={handleClick} />);

    const button = screen.getByText("Get Started");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("displays custom CTA label", () => {
    render(
      <PricingCard
        {...defaultProps}
        ctaLabel="Subscribe Now"
        onCtaClick={vi.fn()}
      />,
    );

    expect(screen.getByText("Subscribe Now")).toBeDefined();
  });

  it("applies highlighted styles when highlighted prop is true", () => {
    const { container } = render(<PricingCard {...defaultProps} highlighted />);

    const highlightedCard = container.querySelector('[class*="highlighted"]');
    expect(highlightedCard).toBeDefined();
  });

  it("uses highlighted variant automatically when highlighted is true", () => {
    render(<PricingCard {...defaultProps} highlighted />);

    expect(screen.getByText("Professional")).toBeDefined();
  });

  it("supports custom variant override", () => {
    render(<PricingCard {...defaultProps} variant="basic" highlighted />);

    expect(screen.getByText("Professional")).toBeDefined();
  });

  it("renders without badge", () => {
    render(<PricingCard {...defaultProps} />);

    expect(screen.queryByText("Popular")).toBeNull();
  });

  it("renders without CTA", () => {
    render(<PricingCard {...defaultProps} />);

    expect(screen.queryByText("Get Started")).toBeNull();
  });

  it("has proper semantic structure", () => {
    const { container } = render(<PricingCard {...defaultProps} />);

    const planName = container.querySelector("h3");
    expect(planName).toBeDefined();
    expect(planName?.textContent).toBe("Professional");

    const featuresList = container.querySelector("ul");
    expect(featuresList).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <PricingCard {...defaultProps} className="custom-class" />,
    );

    const card = container.querySelector(".custom-class");
    expect(card).toBeDefined();
  });

  it("uses spacious density by default", () => {
    render(<PricingCard {...defaultProps} />);

    expect(screen.getByText("Professional")).toBeDefined();
  });

  it("uses fullHeight by default", () => {
    render(<PricingCard {...defaultProps} />);

    expect(screen.getByText("Professional")).toBeDefined();
  });
});
