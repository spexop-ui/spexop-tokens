/**
 * ZoomIn Component Tests
 * Tests for zoom animation wrapper with in/out variants
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { ZoomIn } from "./ZoomIn.js";

describe("ZoomIn", () => {
  describe("Rendering", () => {
    it("should render children", () => {
      const { getByText } = render(
        <ZoomIn>
          <div>Test Content</div>
        </ZoomIn>,
      );

      expect(getByText("Test Content")).toBeDefined();
    });

    it("should apply reveal className", () => {
      const { container } = render(
        <ZoomIn>
          <div>Content</div>
        </ZoomIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal");
    });
  });

  describe("Type Variants", () => {
    it("should default to in type", () => {
      const { container } = render(
        <ZoomIn>
          <div>Content</div>
        </ZoomIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--zoomIn");
    });

    it("should apply in type explicitly", () => {
      const { container } = render(
        <ZoomIn type="in">
          <div>Content</div>
        </ZoomIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--zoomIn");
    });

    it("should apply out type", () => {
      const { container } = render(
        <ZoomIn type="out">
          <div>Content</div>
        </ZoomIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--zoomOut");
    });
  });

  describe("Props Delegation", () => {
    it("should pass through duration prop", () => {
      const { container } = render(
        <ZoomIn duration={500}>
          <div>Content</div>
        </ZoomIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("500ms");
    });

    it("should pass through delay prop", () => {
      const { container } = render(
        <ZoomIn delay={200}>
          <div>Content</div>
        </ZoomIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toBeDefined();
    });

    it("should pass through timing prop", () => {
      const { container } = render(
        <ZoomIn timing="bounce">
          <div>Content</div>
        </ZoomIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("cubic-bezier");
    });

    it("should pass through style prop", () => {
      const { container } = render(
        <ZoomIn style={{ padding: "20px" }}>
          <div>Content</div>
        </ZoomIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.padding).toBe("20px");
    });

    it("should pass through className prop", () => {
      const { container } = render(
        <ZoomIn className="zoom-wrapper">
          <div>Content</div>
        </ZoomIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("zoom-wrapper");
    });
  });

  describe("Combined Props", () => {
    it("should handle type with custom duration", () => {
      const { container } = render(
        <ZoomIn type="out" duration={600}>
          <div>Content</div>
        </ZoomIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--zoomOut");
      expect(element.style.transition).toContain("600ms");
    });

    it("should handle all props together", () => {
      const { container } = render(
        <ZoomIn
          type="in"
          duration={400}
          delay={100}
          timing="elastic"
          threshold={0.5}
          className="custom-zoom"
        >
          <div>Content</div>
        </ZoomIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--zoomIn");
      expect(element.className).toContain("custom-zoom");
      expect(element.style.transition).toContain("400ms");
    });
  });

  describe("Display Name", () => {
    it("should have displayName set", () => {
      expect(ZoomIn.displayName).toBe("ZoomIn");
    });
  });
});
