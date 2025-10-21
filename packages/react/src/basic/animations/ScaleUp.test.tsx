/**
 * ScaleUp Component Tests
 * Tests for scale animation wrapper
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { ScaleUp } from "./ScaleUp.js";

describe("ScaleUp", () => {
  describe("Rendering", () => {
    it("should render children", () => {
      const { getByText } = render(
        <ScaleUp>
          <div>Test Content</div>
        </ScaleUp>,
      );

      expect(getByText("Test Content")).toBeDefined();
    });

    it("should apply reveal className", () => {
      const { container } = render(
        <ScaleUp>
          <div>Content</div>
        </ScaleUp>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal");
    });

    it("should apply scaleUp variant", () => {
      const { container } = render(
        <ScaleUp>
          <div>Content</div>
        </ScaleUp>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--scaleUp");
    });
  });

  describe("Props Delegation", () => {
    it("should pass through duration prop", () => {
      const { container } = render(
        <ScaleUp duration={600}>
          <div>Content</div>
        </ScaleUp>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("600ms");
    });

    it("should pass through delay prop", () => {
      const { container } = render(
        <ScaleUp delay={200}>
          <div>Content</div>
        </ScaleUp>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toBeDefined();
    });

    it("should pass through timing prop", () => {
      const { container } = render(
        <ScaleUp timing="elastic">
          <div>Content</div>
        </ScaleUp>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("cubic-bezier");
    });

    it("should pass through once prop", () => {
      const { container } = render(
        <ScaleUp once={true}>
          <div>Content</div>
        </ScaleUp>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should pass through threshold prop", () => {
      const { container } = render(
        <ScaleUp threshold={0.2}>
          <div>Content</div>
        </ScaleUp>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should pass through style prop", () => {
      const { container } = render(
        <ScaleUp style={{ margin: "10px" }}>
          <div>Content</div>
        </ScaleUp>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.margin).toBe("10px");
    });

    it("should pass through className prop", () => {
      const { container } = render(
        <ScaleUp className="scale-wrapper">
          <div>Content</div>
        </ScaleUp>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("scale-wrapper");
    });
  });

  describe("Combined Props", () => {
    it("should handle multiple props together", () => {
      const { container } = render(
        <ScaleUp
          duration={500}
          delay={100}
          timing="bounce"
          once={false}
          threshold={0.3}
          className="animated-card"
          style={{ padding: "15px" }}
        >
          <div>Content</div>
        </ScaleUp>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--scaleUp");
      expect(element.className).toContain("animated-card");
      expect(element.style.transition).toContain("500ms");
      expect(element.style.padding).toBe("15px");
    });
  });

  describe("Display Name", () => {
    it("should have displayName set", () => {
      expect(ScaleUp.displayName).toBe("ScaleUp");
    });
  });
});
