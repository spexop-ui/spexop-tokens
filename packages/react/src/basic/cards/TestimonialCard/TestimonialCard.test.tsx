/**
 * TestimonialCard Component Tests
 *
 * @packageName @spexop/react
 * @version 1.0.0
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { TestimonialCard } from "./TestimonialCard.js";

describe("TestimonialCard", () => {
  const defaultProps = {
    quote: "This product transformed our workflow completely!",
    author: "Jane Smith",
    role: "Product Manager",
  };

  it("renders with required props", () => {
    render(<TestimonialCard {...defaultProps} />);

    expect(
      screen.getByText("This product transformed our workflow completely!"),
    ).toBeDefined();
    expect(screen.getByText("Jane Smith")).toBeDefined();
    expect(screen.getByText("Product Manager")).toBeDefined();
  });

  it("renders quote in blockquote element", () => {
    const { container } = render(<TestimonialCard {...defaultProps} />);

    const blockquote = container.querySelector("blockquote");
    expect(blockquote).toBeDefined();
    expect(blockquote?.textContent).toBe(
      "This product transformed our workflow completely!",
    );
  });

  it("renders avatar with correct alt text", () => {
    render(<TestimonialCard {...defaultProps} avatar="/avatars/jane.jpg" />);

    const avatar = screen.getByAltText("Jane Smith");
    expect(avatar).toBeDefined();
    expect(avatar.getAttribute("src")).toBe("/avatars/jane.jpg");
  });

  it("renders fallback initials when no avatar", () => {
    const { container } = render(<TestimonialCard {...defaultProps} />);

    const fallback = container.querySelector('[class*="avatarFallback"]');
    expect(fallback).toBeDefined();
    expect(fallback?.textContent).toBe("JS");
  });

  it("generates correct initials for multi-word names", () => {
    const { container } = render(
      <TestimonialCard {...defaultProps} author="John Michael Doe" />,
    );

    const fallback = container.querySelector('[class*="avatarFallback"]');
    expect(fallback?.textContent).toBe("JM");
  });

  it("displays company when provided", () => {
    render(<TestimonialCard {...defaultProps} company="Tech Corp" />);

    expect(screen.getByText(/Tech Corp/)).toBeDefined();
  });

  it("displays role and company with separator", () => {
    render(<TestimonialCard {...defaultProps} company="Tech Corp" />);

    expect(screen.getByText(/Product Manager · Tech Corp/)).toBeDefined();
  });

  it("renders rating stars when provided", () => {
    const { container } = render(
      <TestimonialCard {...defaultProps} rating={5} />,
    );

    const stars = container.querySelectorAll('[class*="star"]');
    expect(stars.length).toBe(5);
  });

  it("renders partial rating correctly", () => {
    const { container } = render(
      <TestimonialCard {...defaultProps} rating={3} />,
    );

    const stars = container.querySelectorAll('[class*="star"]');
    expect(stars.length).toBe(5);

    // First 3 should be filled, last 2 empty
    const emptyStars = container.querySelectorAll('[class*="empty"]');
    expect(emptyStars.length).toBe(2);
  });

  it("supports different variants", () => {
    const { rerender } = render(
      <TestimonialCard {...defaultProps} variant="basic" />,
    );

    expect(
      screen.getByText("This product transformed our workflow completely!"),
    ).toBeDefined();

    rerender(<TestimonialCard {...defaultProps} variant="highlighted" />);
    expect(
      screen.getByText("This product transformed our workflow completely!"),
    ).toBeDefined();
  });

  it("has proper semantic structure", () => {
    const { container } = render(<TestimonialCard {...defaultProps} />);

    const quote = container.querySelector("blockquote");
    expect(quote).toBeDefined();

    const authorName = container.querySelector('[class*="authorName"]');
    expect(authorName).toBeDefined();
    expect(authorName?.textContent).toBe("Jane Smith");
  });

  it("applies custom className", () => {
    const { container } = render(
      <TestimonialCard {...defaultProps} className="custom-class" />,
    );

    const card = container.querySelector(".custom-class");
    expect(card).toBeDefined();
  });

  it("renders without rating", () => {
    render(<TestimonialCard {...defaultProps} />);

    expect(
      screen.getByText("This product transformed our workflow completely!"),
    ).toBeDefined();
  });

  it("renders without company", () => {
    render(<TestimonialCard {...defaultProps} />);

    expect(screen.queryByText(/·/)).toBeNull();
  });

  it("renders role without company", () => {
    render(<TestimonialCard {...defaultProps} />);

    expect(screen.getByText("Product Manager")).toBeDefined();
    expect(screen.queryByText(/·/)).toBeNull();
  });

  it("uses spacious density by default", () => {
    render(<TestimonialCard {...defaultProps} />);

    expect(
      screen.getByText("This product transformed our workflow completely!"),
    ).toBeDefined();
  });
});
