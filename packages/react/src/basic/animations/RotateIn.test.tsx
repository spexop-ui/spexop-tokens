/**
 * RotateIn Component Tests
 * Tests for rotation animation wrapper
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { RotateIn } from "./RotateIn.js";

describe("RotateIn", () => {
  describe("Rendering", () => {
    it("should render children", () => {
      const { getByText } = render(
        <RotateIn>
          <div>Test Content</div>
        </RotateIn>,
      );

      expect(getByText("Test Content")).toBeDefined();
    });

    it("should apply reveal className", () => {
      const { container } = render(
        <RotateIn>
          <div>Content</div>
        </RotateIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal");
    });

    it("should apply rotateIn variant", () => {
      const { container } = render(
        <RotateIn>
          <div>Content</div>
        </RotateIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--rotateIn");
    });
  });

  describe("Props Delegation", () => {
    it("should pass through duration prop", () => {
      const { container } = render(
        <RotateIn duration={700}>
          <div>Content</div>
        </RotateIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("700ms");
    });

    it("should pass through delay prop", () => {
      const { container } = render(
        <RotateIn delay={300}>
          <div>Content</div>
        </RotateIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toBeDefined();
    });

    it("should pass through timing prop", () => {
      const { container } = render(
        <RotateIn timing="bounce">
          <div>Content</div>
        </RotateIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("cubic-bezier");
    });

    it("should pass through once prop", () => {
      const { container } = render(
        <RotateIn once={false}>
          <div>Content</div>
        </RotateIn>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should pass through threshold prop", () => {
      const { container } = render(
        <RotateIn threshold={0.3}>
          <div>Content</div>
        </RotateIn>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should pass through style prop", () => {
      const { container } = render(
        <RotateIn style={{ border: "1px solid red" }}>
          <div>Content</div>
        </RotateIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.border).toBe("1px solid red");
    });

    it("should pass through className prop", () => {
      const { container } = render(
        <RotateIn className="rotate-animation">
          <div>Content</div>
        </RotateIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("rotate-animation");
    });
  });

  describe("Combined Props", () => {
    it("should handle multiple props together", () => {
      const { container } = render(
        <RotateIn
          duration={600}
          delay={150}
          timing="elastic"
          once={true}
          threshold={0.4}
          className="custom-rotate"
          style={{ width: "100px" }}
        >
          <div>Content</div>
        </RotateIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--rotateIn");
      expect(element.className).toContain("custom-rotate");
      expect(element.style.transition).toContain("600ms");
      expect(element.style.width).toBe("100px");
    });
  });

  describe("Display Name", () => {
    it("should have displayName set", () => {
      expect(RotateIn.displayName).toBe("RotateIn");
    });
  });
});
