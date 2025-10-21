/**
 * BlogCard Component Tests
 *
 * @packageName @spexop/react
 * @version 1.0.0
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { BlogCard } from "./BlogCard.js";

describe("BlogCard", () => {
  const defaultProps = {
    title: "Test Blog Post",
    excerpt: "This is a test excerpt for the blog post.",
    coverImage: "/test-image.jpg",
    author: "John Doe",
    date: "2025-10-19",
    href: "/blog/test-post",
  };

  it("renders with required props", () => {
    render(<BlogCard {...defaultProps} />);

    expect(screen.getByText("Test Blog Post")).toBeDefined();
    expect(
      screen.getByText("This is a test excerpt for the blog post."),
    ).toBeDefined();
    expect(screen.getByText("John Doe")).toBeDefined();
    expect(screen.getByText("2025-10-19")).toBeDefined();
  });

  it("renders cover image with correct alt text", () => {
    render(<BlogCard {...defaultProps} />);

    const image = screen.getByAltText("Test Blog Post");
    expect(image).toBeDefined();
    expect(image.getAttribute("src")).toBe("/test-image.jpg");
  });

  it("displays reading time when provided", () => {
    render(<BlogCard {...defaultProps} readTime="5 min" />);

    expect(screen.getByText("5 min")).toBeDefined();
  });

  it("displays tags when provided", () => {
    const tags = ["React", "TypeScript", "Testing"];
    render(<BlogCard {...defaultProps} tags={tags} />);

    for (const tag of tags) {
      expect(screen.getByText(tag)).toBeDefined();
    }
  });

  it("formats Date object correctly", () => {
    const dateObj = new Date("2025-10-19");
    render(<BlogCard {...defaultProps} date={dateObj} />);

    expect(screen.getByText(/Oct/)).toBeDefined();
    expect(screen.getByText(/2025/)).toBeDefined();
  });

  it("renders metadata dividers correctly", () => {
    render(<BlogCard {...defaultProps} readTime="5 min" />);

    const dividers = screen.getAllByText("·");
    expect(dividers.length).toBeGreaterThan(0);
  });

  it("renders without tags", () => {
    render(<BlogCard {...defaultProps} />);

    // Should not throw error
    expect(screen.getByText("Test Blog Post")).toBeDefined();
  });

  it("renders without cover image", () => {
    const propsWithoutImage = { ...defaultProps, coverImage: undefined };
    render(<BlogCard {...propsWithoutImage} />);

    expect(screen.getByText("Test Blog Post")).toBeDefined();
  });

  it("has proper semantic structure", () => {
    const { container } = render(<BlogCard {...defaultProps} />);

    const title = container.querySelector("h3");
    expect(title).toBeDefined();
    expect(title?.textContent).toBe("Test Blog Post");
  });

  it("renders as a link with correct href", () => {
    render(<BlogCard {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/blog/test-post");
  });

  it("applies custom className", () => {
    const { container } = render(
      <BlogCard {...defaultProps} className="custom-class" />,
    );

    const card = container.querySelector(".custom-class");
    expect(card).toBeDefined();
  });

  it("supports different variants", () => {
    const { rerender } = render(<BlogCard {...defaultProps} variant="basic" />);

    expect(screen.getByText("Test Blog Post")).toBeDefined();

    rerender(<BlogCard {...defaultProps} variant="highlighted" />);
    expect(screen.getByText("Test Blog Post")).toBeDefined();
  });
});
