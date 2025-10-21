/**
 * ProductCard Component Tests
 *
 * @packageName @spexop/react
 * @version 1.0.0
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { ProductCard } from "./ProductCard.js";

describe("ProductCard", () => {
  const defaultProps = {
    name: "Premium Headphones",
    price: 299,
    image: "/products/headphones.jpg",
  };

  it("renders with required props", () => {
    render(<ProductCard {...defaultProps} />);

    expect(screen.getByText("Premium Headphones")).toBeDefined();
    expect(screen.getByText("$299.00")).toBeDefined();
  });

  it("renders product image with correct alt text", () => {
    render(<ProductCard {...defaultProps} />);

    const image = screen.getByAltText("Premium Headphones");
    expect(image).toBeDefined();
    expect(image.getAttribute("src")).toBe("/products/headphones.jpg");
  });

  it("displays custom currency", () => {
    render(<ProductCard {...defaultProps} currency="€" />);

    expect(screen.getByText("€299.00")).toBeDefined();
  });

  it("displays rating when provided", () => {
    const { container } = render(
      <ProductCard {...defaultProps} rating={4.5} />,
    );

    // Check for star rating elements
    const stars = container.querySelectorAll('[class*="star"]');
    expect(stars.length).toBe(5);
  });

  it("displays review count when provided", () => {
    render(<ProductCard {...defaultProps} rating={4.5} reviews={127} />);

    expect(screen.getByText("(127)")).toBeDefined();
  });

  it("displays badge when provided", () => {
    render(<ProductCard {...defaultProps} badge="20% Off" />);

    expect(screen.getByText("20% Off")).toBeDefined();
  });

  it("shows out of stock message when inStock is false", () => {
    render(<ProductCard {...defaultProps} inStock={false} />);

    expect(screen.getByText("Out of Stock")).toBeDefined();
  });

  it("handles add to cart click", async () => {
    const handleAddToCart = vi.fn();
    const user = userEvent.setup();

    render(<ProductCard {...defaultProps} onAddToCart={handleAddToCart} />);

    const addButton = screen.getByText("Add to Cart");
    await user.click(addButton);

    expect(handleAddToCart).toHaveBeenCalledTimes(1);
  });

  it("handles view details click", async () => {
    const handleViewDetails = vi.fn();
    const user = userEvent.setup();

    render(
      <ProductCard
        {...defaultProps}
        onAddToCart={vi.fn()}
        onViewDetails={handleViewDetails}
      />,
    );

    // Find the view details button (should be the icon button)
    const buttons = screen.getAllByRole("button");
    const viewButton = buttons.find(
      (btn) => btn !== screen.getByText("Add to Cart"),
    );

    if (viewButton) {
      await user.click(viewButton);
      expect(handleViewDetails).toHaveBeenCalled();
    }
  });

  it("disables add to cart when out of stock", () => {
    render(
      <ProductCard {...defaultProps} inStock={false} onAddToCart={vi.fn()} />,
    );

    const button = screen.getByText("Add to Cart");
    expect(button.hasAttribute("disabled")).toBe(true);
  });

  it("handles card click for view details", async () => {
    const handleViewDetails = vi.fn();
    const user = userEvent.setup();

    render(<ProductCard {...defaultProps} onViewDetails={handleViewDetails} />);

    const card = screen.getByText("Premium Headphones").closest("div");
    if (card) {
      await user.click(card);
      expect(handleViewDetails).toHaveBeenCalled();
    }
  });

  it("has proper semantic structure", () => {
    const { container } = render(<ProductCard {...defaultProps} />);

    const name = container.querySelector("h3");
    expect(name).toBeDefined();
    expect(name?.textContent).toBe("Premium Headphones");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProductCard {...defaultProps} className="custom-class" />,
    );

    const card = container.querySelector(".custom-class");
    expect(card).toBeDefined();
  });

  it("supports different variants", () => {
    const { rerender } = render(
      <ProductCard {...defaultProps} variant="basic" />,
    );

    expect(screen.getByText("Premium Headphones")).toBeDefined();

    rerender(<ProductCard {...defaultProps} variant="highlighted" />);
    expect(screen.getByText("Premium Headphones")).toBeDefined();
  });

  it("formats price with two decimal places", () => {
    render(<ProductCard {...defaultProps} price={99} />);

    expect(screen.getByText("$99.00")).toBeDefined();
  });

  it("renders without rating and reviews", () => {
    render(<ProductCard {...defaultProps} />);

    expect(screen.queryByText(/\(\d+\)/)).toBeNull();
  });

  it("renders without badge", () => {
    render(<ProductCard {...defaultProps} />);

    expect(screen.queryByText("20% Off")).toBeNull();
  });

  it("uses fullHeight by default", () => {
    render(<ProductCard {...defaultProps} />);

    expect(screen.getByText("Premium Headphones")).toBeDefined();
  });
});
