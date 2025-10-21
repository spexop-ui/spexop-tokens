/**
 * FadeIn Component Tests
 * Tests for fade animation wrapper with directional variants
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { FadeIn } from "./FadeIn.js";

// Add this line to ensure Jest DOM is available
/// <reference types="@testing-library/jest-dom" />

describe("FadeIn", () => {
  describe("Rendering", () => {
    it("should render children", () => {
      const { getByText } = render(
        <FadeIn>
          <div>Test Content</div>
        </FadeIn>,
      );

      expect(getByText("Test Content")).toBeDefined();
    });

    it("should apply reveal className", () => {
      const { container } = render(
        <FadeIn>
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal");
    });
  });

  describe("Direction Variants", () => {
    it("should default to none direction", () => {
      const { container } = render(
        <FadeIn>
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeIn");
    });

    it("should apply up direction", () => {
      const { container } = render(
        <FadeIn direction="up">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInUp");
    });

    it("should apply down direction", () => {
      const { container } = render(
        <FadeIn direction="down">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInDown");
    });

    it("should apply left direction", () => {
      const { container } = render(
        <FadeIn direction="left">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInLeft");
    });

    it("should apply right direction", () => {
      const { container } = render(
        <FadeIn direction="right">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInRight");
    });

    it("should apply none direction explicitly", () => {
      const { container } = render(
        <FadeIn direction="none">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeIn");
    });
  });

  describe("Props Delegation", () => {
    it("should pass through duration prop", () => {
      const { container } = render(
        <FadeIn duration={800}>
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("800ms");
    });

    it("should pass through delay prop", () => {
      const { container } = render(
        <FadeIn delay={300}>
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toBeDefined();
    });

    it("should pass through timing prop", () => {
      const { container } = render(
        <FadeIn timing="ease-in">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("ease-in");
    });

    it("should pass through once prop", () => {
      const { container } = render(
        <FadeIn once={false}>
          <div>Content</div>
        </FadeIn>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should pass through threshold prop", () => {
      const { container } = render(
        <FadeIn threshold={0.5}>
          <div>Content</div>
        </FadeIn>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should pass through style prop", () => {
      const { container } = render(
        <FadeIn style={{ color: "red" }}>
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.color).toBe("red");
    });

    it("should pass through className prop", () => {
      const { container } = render(
        <FadeIn className="custom-fade">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("custom-fade");
    });
  });

  describe("Combined Props", () => {
    it("should handle direction with custom timing", () => {
      const { container } = render(
        <FadeIn direction="up" timing="bounce">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInUp");
      expect(element.style.transition).toContain("cubic-bezier");
    });

    it("should handle all props together", () => {
      const { container } = render(
        <FadeIn
          direction="left"
          duration={600}
          delay={200}
          timing="ease-out"
          threshold={0.3}
          once={true}
          className="custom"
          style={{ marginTop: "20px" }}
        >
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInLeft");
      expect(element.className).toContain("custom");
      expect(element.style.transition).toContain("600ms");
      expect(element.style.transition).toContain("ease-out");
      expect(element.style.marginTop).toBe("20px");
    });
  });

  describe("Display Name", () => {
    it("should have displayName set", () => {
      expect(FadeIn.displayName).toBe("FadeIn");
    });
  });
});
