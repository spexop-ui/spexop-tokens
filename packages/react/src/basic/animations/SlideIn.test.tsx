/**
 * SlideIn Component Tests
 * Tests for slide animation wrapper with directional variants
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { SlideIn } from "./SlideIn.js";

describe("SlideIn", () => {
  describe("Rendering", () => {
    it("should render children", () => {
      const { getByText } = render(
        <SlideIn>
          <div>Test Content</div>
        </SlideIn>,
      );

      expect(getByText("Test Content")).toBeDefined();
    });

    it("should apply reveal className", () => {
      const { container } = render(
        <SlideIn>
          <div>Content</div>
        </SlideIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal");
    });
  });

  describe("Direction Variants", () => {
    it("should default to up direction", () => {
      const { container } = render(
        <SlideIn>
          <div>Content</div>
        </SlideIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--slideUp");
    });

    it("should apply up direction explicitly", () => {
      const { container } = render(
        <SlideIn direction="up">
          <div>Content</div>
        </SlideIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--slideUp");
    });

    it("should apply down direction", () => {
      const { container } = render(
        <SlideIn direction="down">
          <div>Content</div>
        </SlideIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--slideDown");
    });

    it("should apply left direction", () => {
      const { container } = render(
        <SlideIn direction="left">
          <div>Content</div>
        </SlideIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--slideLeft");
    });

    it("should apply right direction", () => {
      const { container } = render(
        <SlideIn direction="right">
          <div>Content</div>
        </SlideIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--slideRight");
    });
  });

  describe("Props Delegation", () => {
    it("should pass through duration prop", () => {
      const { container } = render(
        <SlideIn duration={700}>
          <div>Content</div>
        </SlideIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("700ms");
    });

    it("should pass through delay prop", () => {
      const { container } = render(
        <SlideIn delay={250}>
          <div>Content</div>
        </SlideIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toBeDefined();
    });

    it("should pass through timing prop", () => {
      const { container } = render(
        <SlideIn timing="ease-in-out">
          <div>Content</div>
        </SlideIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("ease-in-out");
    });

    it("should pass through style prop", () => {
      const { container } = render(
        <SlideIn style={{ backgroundColor: "blue" }}>
          <div>Content</div>
        </SlideIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.backgroundColor).toBe("blue");
    });

    it("should pass through className prop", () => {
      const { container } = render(
        <SlideIn className="custom-slide">
          <div>Content</div>
        </SlideIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("custom-slide");
    });
  });

  describe("Combined Props", () => {
    it("should handle direction with custom duration", () => {
      const { container } = render(
        <SlideIn direction="left" duration={500}>
          <div>Content</div>
        </SlideIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--slideLeft");
      expect(element.style.transition).toContain("500ms");
    });

    it("should handle all props together", () => {
      const { container } = render(
        <SlideIn
          direction="right"
          duration={800}
          delay={300}
          timing="elastic"
          threshold={0.4}
          once={false}
          className="slide-animation"
        >
          <div>Content</div>
        </SlideIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--slideRight");
      expect(element.className).toContain("slide-animation");
      expect(element.style.transition).toContain("800ms");
    });
  });

  describe("Display Name", () => {
    it("should have displayName set", () => {
      expect(SlideIn.displayName).toBe("SlideIn");
    });
  });
});
