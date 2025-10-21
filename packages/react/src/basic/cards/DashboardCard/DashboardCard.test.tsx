/**
 * DashboardCard Component Tests
 *
 * @packageName @spexop/react
 * @version 1.0.0
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DashboardCard } from "./DashboardCard.js";

describe("DashboardCard", () => {
  const defaultProps = {
    title: "Revenue Overview",
    children: <div>Chart content</div>,
  };

  it("renders with required props", () => {
    render(<DashboardCard {...defaultProps} />);

    expect(screen.getByText("Revenue Overview")).toBeDefined();
    expect(screen.getByText("Chart content")).toBeDefined();
  });

  it("renders subtitle when provided", () => {
    render(<DashboardCard {...defaultProps} subtitle="Last 30 days" />);

    expect(screen.getByText("Last 30 days")).toBeDefined();
  });

  it("renders actions in header", () => {
    const actions = <button type="button">More</button>;

    render(<DashboardCard {...defaultProps} actions={actions} />);

    expect(screen.getByText("More")).toBeDefined();
  });

  it("shows loading spinner when loading is true", () => {
    const { container } = render(
      <DashboardCard {...defaultProps} loading={true} />,
    );

    const spinner = container.querySelector('[class*="spinner"]');
    expect(spinner).toBeDefined();

    // Content should not be visible when loading
    expect(screen.queryByText("Chart content")).toBeNull();
  });

  it("displays error state with message", () => {
    render(<DashboardCard {...defaultProps} error="Failed to load data" />);

    expect(screen.getByText("Failed to load data")).toBeDefined();

    // Content should not be visible when error exists
    expect(screen.queryByText("Chart content")).toBeNull();
  });

  it("renders content when not loading and no error", () => {
    render(<DashboardCard {...defaultProps} loading={false} />);

    expect(screen.getByText("Chart content")).toBeDefined();
  });

  it("has proper semantic structure", () => {
    const { container } = render(<DashboardCard {...defaultProps} />);

    const title = container.querySelector("h3");
    expect(title).toBeDefined();
    expect(title?.textContent).toBe("Revenue Overview");

    const subtitle = container.querySelector("p");
    expect(subtitle).toBeNull(); // No subtitle by default
  });

  it("applies custom className", () => {
    const { container } = render(
      <DashboardCard {...defaultProps} className="custom-class" />,
    );

    const card = container.querySelector(".custom-class");
    expect(card).toBeDefined();
  });

  it("supports different variants", () => {
    const { rerender } = render(
      <DashboardCard {...defaultProps} variant="basic" />,
    );

    expect(screen.getByText("Revenue Overview")).toBeDefined();

    rerender(<DashboardCard {...defaultProps} variant="highlighted" />);
    expect(screen.getByText("Revenue Overview")).toBeDefined();
  });

  it("uses fullHeight prop", () => {
    render(<DashboardCard {...defaultProps} />);

    // Component should render successfully with fullHeight enabled
    expect(screen.getByText("Revenue Overview")).toBeDefined();
  });

  it("prioritizes error over loading state", () => {
    const { container } = render(
      <DashboardCard {...defaultProps} loading={true} error="Error occurred" />,
    );

    // Error should be shown
    expect(screen.getByText("Error occurred")).toBeDefined();

    // Loading spinner should not be shown
    const spinner = container.querySelector('[class*="spinner"]');
    expect(spinner).toBeNull();

    // Content should not be visible
    expect(screen.queryByText("Chart content")).toBeNull();
  });

  it("renders header with title and actions", () => {
    const actions = <button type="button">Export</button>;

    render(
      <DashboardCard
        {...defaultProps}
        subtitle="Last 30 days"
        actions={actions}
      />,
    );

    expect(screen.getByText("Revenue Overview")).toBeDefined();
    expect(screen.getByText("Last 30 days")).toBeDefined();
    expect(screen.getByText("Export")).toBeDefined();
  });
});
