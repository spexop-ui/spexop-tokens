/**
 * Reveal Component Tests
 * Tests for viewport-triggered animations with IntersectionObserver
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Reveal } from "./Reveal.js";

// Add this line to ensure Jest DOM is available
/// <reference types="@testing-library/jest-dom" />

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  elements: Set<Element>;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    this.elements = new Set();
  }

  observe(element: Element) {
    this.elements.add(element);
  }

  unobserve(element: Element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  trigger(isIntersecting: boolean) {
    const entries = Array.from(this.elements).map((element) => ({
      target: element,
      isIntersecting,
      intersectionRatio: isIntersecting ? 1 : 0,
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRect: element.getBoundingClientRect(),
      rootBounds: null,
      time: Date.now(),
    }));
    this.callback(
      entries as IntersectionObserverEntry[],
      this as unknown as IntersectionObserver,
    );
  }
}

let mockObserver: MockIntersectionObserver;

beforeEach(() => {
  mockObserver = new MockIntersectionObserver(vi.fn());
  global.IntersectionObserver = vi.fn(
    (callback) => new MockIntersectionObserver(callback),
  ) as unknown as typeof IntersectionObserver;
});

describe("Reveal", () => {
  describe("Rendering", () => {
    it("should render children", () => {
      const { getByText } = render(
        <Reveal>
          <div>Test Content</div>
        </Reveal>,
      );

      expect(getByText("Test Content")).toBeDefined();
    });

    it("should apply default className", () => {
      const { container } = render(
        <Reveal>
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal");
      expect(element.className).toContain("spex-reveal--fadeIn");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Reveal className="custom-class">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("custom-class");
    });

    it("should apply custom styles", () => {
      const { container } = render(
        <Reveal style={{ color: "red", fontSize: "20px" }}>
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.color).toBe("red");
      expect(element.style.fontSize).toBe("20px");
    });
  });

  describe("Animation Variants", () => {
    it("should apply fadeIn variant", () => {
      const { container } = render(
        <Reveal variant="fadeIn">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeIn");
    });

    it("should apply fadeInUp variant", () => {
      const { container } = render(
        <Reveal variant="fadeInUp">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInUp");
    });

    it("should apply fadeInDown variant", () => {
      const { container } = render(
        <Reveal variant="fadeInDown">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInDown");
    });

    it("should apply fadeInLeft variant", () => {
      const { container } = render(
        <Reveal variant="fadeInLeft">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInLeft");
    });

    it("should apply fadeInRight variant", () => {
      const { container } = render(
        <Reveal variant="fadeInRight">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInRight");
    });

    it("should apply slideUp variant", () => {
      const { container } = render(
        <Reveal variant="slideUp">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--slideUp");
    });

    it("should apply slideDown variant", () => {
      const { container } = render(
        <Reveal variant="slideDown">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--slideDown");
    });

    it("should apply slideLeft variant", () => {
      const { container } = render(
        <Reveal variant="slideLeft">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--slideLeft");
    });

    it("should apply slideRight variant", () => {
      const { container } = render(
        <Reveal variant="slideRight">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--slideRight");
    });

    it("should apply zoomIn variant", () => {
      const { container } = render(
        <Reveal variant="zoomIn">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--zoomIn");
    });

    it("should apply zoomOut variant", () => {
      const { container } = render(
        <Reveal variant="zoomOut">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--zoomOut");
    });

    it("should apply scaleUp variant", () => {
      const { container } = render(
        <Reveal variant="scaleUp">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--scaleUp");
    });

    it("should apply rotateIn variant", () => {
      const { container } = render(
        <Reveal variant="rotateIn">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--rotateIn");
    });
  });

  describe("Animation Properties", () => {
    it("should apply default duration", () => {
      const { container } = render(
        <Reveal>
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("400ms");
    });

    it("should apply custom duration", () => {
      const { container } = render(
        <Reveal duration={800}>
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("800ms");
    });

    it("should apply default timing function", () => {
      const { container } = render(
        <Reveal>
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("ease-out");
    });

    it("should apply custom timing function", () => {
      const { container } = render(
        <Reveal timing="ease-in-out">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("ease-in-out");
    });

    it("should apply bounce timing function", () => {
      const { container } = render(
        <Reveal timing="bounce">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("cubic-bezier");
    });

    it("should apply elastic timing function", () => {
      const { container } = render(
        <Reveal timing="elastic">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("cubic-bezier");
    });
  });

  describe("Transform Values", () => {
    it("should have correct fadeInUp transform", () => {
      const { container } = render(
        <Reveal variant="fadeInUp">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      // Initial state: translateY(12px)
      expect(element.style.transform).toContain("translateY(12px)");
    });

    it("should have correct slideUp transform", () => {
      const { container } = render(
        <Reveal variant="slideUp">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      // Initial state: translateY(20px)
      expect(element.style.transform).toContain("translateY(20px)");
    });

    it("should have correct zoomIn transform", () => {
      const { container } = render(
        <Reveal variant="zoomIn">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      // Initial state: scale(0.95)
      expect(element.style.transform).toContain("scale(0.95)");
    });

    it("should have correct rotateIn transform", () => {
      const { container } = render(
        <Reveal variant="rotateIn">
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      // Initial state: rotate(-3deg) scale(0.97)
      expect(element.style.transform).toContain("rotate(-3deg)");
      expect(element.style.transform).toContain("scale(0.97)");
    });
  });

  describe("Opacity", () => {
    it("should start with opacity 0", () => {
      const { container } = render(
        <Reveal>
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.opacity).toBe("0");
    });

    it("should maintain opacity 0 for all variants initially", () => {
      const variants = [
        "fadeIn",
        "fadeInUp",
        "slideDown",
        "zoomIn",
        "rotateIn",
      ] as const;

      for (const variant of variants) {
        const { container } = render(
          <Reveal variant={variant}>
            <div>Content</div>
          </Reveal>,
        );

        const element = container.firstChild as HTMLElement;
        expect(element.style.opacity).toBe("0");
      }
    });
  });

  describe("IntersectionObserver Configuration", () => {
    it("should use default threshold", () => {
      const observerSpy = vi.spyOn(global, "IntersectionObserver");

      render(
        <Reveal>
          <div>Content</div>
        </Reveal>,
      );

      expect(observerSpy).toHaveBeenCalled();
      // Check that observer was created (threshold would be in options)
    });

    it("should apply custom threshold", () => {
      const observerSpy = vi.spyOn(global, "IntersectionObserver");

      render(
        <Reveal threshold={0.5}>
          <div>Content</div>
        </Reveal>,
      );

      expect(observerSpy).toHaveBeenCalled();
    });

    it("should handle once prop", () => {
      render(
        <Reveal once={true}>
          <div>Content</div>
        </Reveal>,
      );

      expect(global.IntersectionObserver).toHaveBeenCalled();
    });

    it("should handle once={false} for repeated animations", () => {
      render(
        <Reveal once={false}>
          <div>Content</div>
        </Reveal>,
      );

      expect(global.IntersectionObserver).toHaveBeenCalled();
    });
  });

  describe("Delay", () => {
    it("should handle zero delay", () => {
      const { container } = render(
        <Reveal delay={0}>
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toBeDefined();
    });

    it("should handle custom delay", () => {
      const { container } = render(
        <Reveal delay={500}>
          <div>Content</div>
        </Reveal>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toBeDefined();
    });
  });

  describe("Multiple Children", () => {
    it("should wrap multiple children", () => {
      const { getByText } = render(
        <Reveal>
          <div>First</div>
          <div>Second</div>
        </Reveal>,
      );

      expect(getByText("First")).toBeDefined();
      expect(getByText("Second")).toBeDefined();
    });

    it("should handle complex children", () => {
      const { getByText } = render(
        <Reveal>
          <div>
            <h1>Title</h1>
            <p>Description</p>
            <button type="button">Action</button>
          </div>
        </Reveal>,
      );

      expect(getByText("Title")).toBeDefined();
      expect(getByText("Description")).toBeDefined();
      expect(getByText("Action")).toBeDefined();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty children", () => {
      const { container } = render(
        <Reveal>
          <div />
        </Reveal>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should handle string children", () => {
      const { getByText } = render(<Reveal>Plain text</Reveal>);

      expect(getByText("Plain text")).toBeDefined();
    });

    it("should handle number children", () => {
      const { getByText } = render(<Reveal>{42}</Reveal>);

      expect(getByText("42")).toBeDefined();
    });

    it("should handle null/undefined gracefully", () => {
      const { container } = render(
        <Reveal>
          <div>{null}</div>
        </Reveal>,
      );

      expect(container.firstChild).toBeDefined();
    });
  });

  describe("Display Name", () => {
    it("should have displayName set", () => {
      expect(Reveal.displayName).toBe("Reveal");
    });
  });
});
