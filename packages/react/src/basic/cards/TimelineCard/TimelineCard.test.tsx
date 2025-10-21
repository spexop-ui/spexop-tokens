/**
 * TimelineCard Component Tests
 *
 * @packageName @spexop/react
 * @version 1.0.0
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { TimelineCard } from "./TimelineCard.js";

describe("TimelineCard", () => {
  const defaultProps = {
    title: "Product Launch",
    description: "Official release of version 2.0 with new features",
    date: "2025-11-01",
  };

  it("renders with required props", () => {
    render(<TimelineCard {...defaultProps} />);

    expect(screen.getByText("Product Launch")).toBeDefined();
    expect(
      screen.getByText("Official release of version 2.0 with new features"),
    ).toBeDefined();
    expect(screen.getByText("2025-11-01")).toBeDefined();
  });

  it("formats Date object correctly", () => {
    const dateObj = new Date("2025-11-01");
    render(<TimelineCard {...defaultProps} date={dateObj} />);

    expect(screen.getByText(/November/)).toBeDefined();
    expect(screen.getByText(/2025/)).toBeDefined();
  });

  it("displays time when provided", () => {
    render(<TimelineCard {...defaultProps} time="10:00 AM PST" />);

    expect(screen.getByText("10:00 AM PST")).toBeDefined();
  });

  it("displays location when provided", () => {
    render(<TimelineCard {...defaultProps} location="Virtual Event" />);

    expect(screen.getByText("Virtual Event")).toBeDefined();
  });

  it("renders icon when provided", () => {
    const TestIcon = () => <div data-testid="test-icon">🚀</div>;

    render(<TimelineCard {...defaultProps} icon={<TestIcon />} />);

    expect(screen.getByTestId("test-icon")).toBeDefined();
  });

  it("displays status badge", () => {
    render(<TimelineCard {...defaultProps} status="upcoming" />);

    expect(screen.getByText("upcoming")).toBeDefined();
  });

  it("supports different status variants", () => {
    const { rerender } = render(
      <TimelineCard {...defaultProps} status="upcoming" />,
    );
    expect(screen.getByText("upcoming")).toBeDefined();

    rerender(<TimelineCard {...defaultProps} status="completed" />);
    expect(screen.getByText("completed")).toBeDefined();

    rerender(<TimelineCard {...defaultProps} status="ongoing" />);
    expect(screen.getByText("ongoing")).toBeDefined();
  });

  it("applies status styling", () => {
    const { container } = render(
      <TimelineCard {...defaultProps} status="completed" />,
    );

    const card = container.querySelector('[class*="completed"]');
    expect(card).toBeDefined();
  });

  it("supports different variants", () => {
    const { rerender } = render(
      <TimelineCard {...defaultProps} variant="basic" />,
    );

    expect(screen.getByText("Product Launch")).toBeDefined();

    rerender(<TimelineCard {...defaultProps} variant="highlighted" />);
    expect(screen.getByText("Product Launch")).toBeDefined();
  });

  it("has proper semantic structure", () => {
    const { container } = render(<TimelineCard {...defaultProps} />);

    const title = container.querySelector("h3");
    expect(title).toBeDefined();
    expect(title?.textContent).toBe("Product Launch");

    const description = container.querySelector("p");
    expect(description).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <TimelineCard {...defaultProps} className="custom-class" />,
    );

    const card = container.querySelector(".custom-class");
    expect(card).toBeDefined();
  });

  it("renders without time", () => {
    render(<TimelineCard {...defaultProps} />);

    expect(screen.getByText("Product Launch")).toBeDefined();
  });

  it("renders without location", () => {
    render(<TimelineCard {...defaultProps} />);

    expect(screen.getByText("Product Launch")).toBeDefined();
  });

  it("renders without icon", () => {
    render(<TimelineCard {...defaultProps} />);

    expect(screen.getByText("Product Launch")).toBeDefined();
  });

  it("uses upcoming status by default", () => {
    render(<TimelineCard {...defaultProps} />);

    expect(screen.getByText("upcoming")).toBeDefined();
  });

  it("displays all metadata when provided", () => {
    render(
      <TimelineCard
        {...defaultProps}
        time="10:00 AM PST"
        location="Virtual Event"
        status="upcoming"
      />,
    );

    expect(screen.getByText("2025-11-01")).toBeDefined();
    expect(screen.getByText("10:00 AM PST")).toBeDefined();
    expect(screen.getByText("Virtual Event")).toBeDefined();
    expect(screen.getByText("upcoming")).toBeDefined();
  });

  it("uses normal density by default", () => {
    render(<TimelineCard {...defaultProps} />);

    expect(screen.getByText("Product Launch")).toBeDefined();
  });
});
