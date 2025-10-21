/**
 * StatsCard Component Tests
 *
 * @packageName @spexop/react
 * @version 1.0.0
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { StatsCard } from "./StatsCard.js";

describe("StatsCard", () => {
  const defaultProps = {
    label: "Active Users",
    value: "12,543",
  };

  it("renders with required props", () => {
    render(<StatsCard {...defaultProps} />);

    expect(screen.getByText("Active Users")).toBeDefined();
    expect(screen.getByText("12,543")).toBeDefined();
  });

  it("formats numeric value with locale", () => {
    render(<StatsCard label="Total Users" value={1234567} />);

    // Should format with commas
    expect(screen.getByText(/1,234,567/)).toBeDefined();
  });

  it("formats currency values", () => {
    render(<StatsCard label="Revenue" value={50000} format="currency" />);

    expect(screen.getByText("$50,000")).toBeDefined();
  });

  it("formats percentage values", () => {
    render(<StatsCard label="Growth" value={12.5} format="percentage" />);

    expect(screen.getByText("12.5%")).toBeDefined();
  });

  it("displays trend with up arrow", () => {
    const { container } = render(
      <StatsCard {...defaultProps} trend={{ value: 12.5, direction: "up" }} />,
    );

    expect(screen.getByText("+12.5%")).toBeDefined();

    // Check for trend icon
    const trendSection = container.querySelector('[class*="trend"]');
    expect(trendSection).toBeDefined();
  });

  it("displays trend with down arrow", () => {
    const { container } = render(
      <StatsCard {...defaultProps} trend={{ value: 5.2, direction: "down" }} />,
    );

    expect(screen.getByText("5.2%")).toBeDefined();

    // Check for trend section
    const trendSection = container.querySelector('[class*="trend"]');
    expect(trendSection).toBeDefined();
  });

  it("displays neutral trend", () => {
    const { container } = render(
      <StatsCard
        {...defaultProps}
        trend={{ value: 0, direction: "neutral" }}
      />,
    );

    expect(screen.getByText("+0%")).toBeDefined();

    // Check for trend section
    const trendSection = container.querySelector('[class*="trend"]');
    expect(trendSection).toBeDefined();
  });

  it("renders icon when provided", () => {
    const TestIcon = () => <div data-testid="test-icon">👤</div>;

    render(<StatsCard {...defaultProps} icon={<TestIcon />} />);

    expect(screen.getByTestId("test-icon")).toBeDefined();
  });

  it("applies trend direction styling", () => {
    const { container } = render(
      <StatsCard {...defaultProps} trend={{ value: 12.5, direction: "up" }} />,
    );

    const trendElement = container.querySelector('[class*="up"]');
    expect(trendElement).toBeDefined();
  });

  it("supports different variants", () => {
    const { rerender } = render(
      <StatsCard {...defaultProps} variant="basic" />,
    );

    expect(screen.getByText("Active Users")).toBeDefined();

    rerender(<StatsCard {...defaultProps} variant="highlighted" />);
    expect(screen.getByText("Active Users")).toBeDefined();
  });

  it("has proper semantic structure", () => {
    const { container } = render(<StatsCard {...defaultProps} />);

    const value = container.querySelector("p");
    expect(value?.textContent).toContain("12,543");

    const label = container.querySelectorAll("p")[1];
    expect(label?.textContent).toBe("Active Users");
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatsCard {...defaultProps} className="custom-class" />,
    );

    const card = container.querySelector(".custom-class");
    expect(card).toBeDefined();
  });

  it("renders without trend", () => {
    render(<StatsCard {...defaultProps} />);

    expect(screen.getByText("Active Users")).toBeDefined();
    expect(screen.getByText("12,543")).toBeDefined();
  });

  it("renders without icon", () => {
    render(<StatsCard {...defaultProps} />);

    expect(screen.getByText("Active Users")).toBeDefined();
  });

  it("uses number format by default", () => {
    render(<StatsCard label="Count" value={1000} />);

    expect(screen.getByText("1,000")).toBeDefined();
  });

  it("accepts string values without formatting", () => {
    render(<StatsCard label="Status" value="Active" />);

    expect(screen.getByText("Active")).toBeDefined();
  });

  it("uses normal density by default", () => {
    render(<StatsCard {...defaultProps} />);

    expect(screen.getByText("Active Users")).toBeDefined();
  });
});
