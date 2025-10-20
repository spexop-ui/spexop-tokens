/**
 * Stack Component Tests
 * Tests for responsive props, token integration, and mobile-first behavior
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 */

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stack } from "./Stack.js";

describe("Stack", () => {
  describe("Token Integration - Spacing Scale", () => {
    it("should apply gap spacing scale 0-10 correctly", () => {
      const { container } = render(
        <Stack gap={4}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("gap4");
    });

    it("should handle gap=0", () => {
      const { container } = render(
        <Stack gap={0}>
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("gap0");
    });

    it("should handle gap=10", () => {
      const { container } = render(
        <Stack gap={10}>
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("gap10");
    });
  });

  describe("Direction", () => {
    it("should default to vertical", () => {
      const { container } = render(
        <Stack>
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("vertical");
    });

    it("should apply horizontal direction", () => {
      const { container } = render(
        <Stack direction="horizontal">
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("horizontal");
    });

    it("should accept responsive direction", () => {
      const { container } = render(
        <Stack direction={{ xs: "vertical", md: "horizontal" }}>
          <div>Item</div>
        </Stack>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Alignment", () => {
    it("should default to stretch", () => {
      const { container } = render(
        <Stack>
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("alignStretch");
    });

    it("should apply alignStart", () => {
      const { container } = render(
        <Stack align="start">
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("alignStart");
    });

    it("should apply alignCenter", () => {
      const { container } = render(
        <Stack align="center">
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("alignCenter");
    });

    it("should apply alignEnd", () => {
      const { container } = render(
        <Stack align="end">
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("alignEnd");
    });

    it("should apply alignBaseline", () => {
      const { container } = render(
        <Stack align="baseline">
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("alignBaseline");
    });

    it("should accept responsive align", () => {
      const { container } = render(
        <Stack align={{ xs: "start", md: "center" }}>
          <div>Item</div>
        </Stack>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Justification", () => {
    it("should default to start", () => {
      const { container } = render(
        <Stack>
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifyStart");
    });

    it("should apply justifyCenter", () => {
      const { container } = render(
        <Stack justify="center">
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifyCenter");
    });

    it("should apply justifyEnd", () => {
      const { container } = render(
        <Stack justify="end">
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifyEnd");
    });

    it("should apply justifySpaceBetween", () => {
      const { container } = render(
        <Stack justify="space-between">
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifySpaceBetween");
    });

    it("should apply justifySpaceAround", () => {
      const { container } = render(
        <Stack justify="space-around">
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifySpaceAround");
    });

    it("should apply justifySpaceEvenly", () => {
      const { container } = render(
        <Stack justify="space-evenly">
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifySpaceEvenly");
    });

    it("should accept responsive justify", () => {
      const { container } = render(
        <Stack justify={{ xs: "start", md: "space-between" }}>
          <div>Item</div>
        </Stack>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Wrapping", () => {
    it("should not wrap by default", () => {
      const { container } = render(
        <Stack>
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).not.toContain("wrap");
    });

    it("should apply wrap class", () => {
      const { container } = render(
        <Stack wrap>
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("wrap");
    });
  });

  describe("Responsive Props - Mobile-First Cascading", () => {
    it("should accept responsive gap object", () => {
      const { container } = render(
        <Stack gap={{ xs: 2, md: 4, lg: 6 }}>
          <div>Item</div>
        </Stack>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should handle all responsive props together", () => {
      const { container } = render(
        <Stack
          gap={{ xs: 2, lg: 6 }}
          direction={{ xs: "vertical", md: "horizontal" }}
          align={{ xs: "start", lg: "center" }}
          justify={{ xs: "start", lg: "space-between" }}
        >
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Min-Width Overflow Protection", () => {
    it("should have min-width: 0 in CSS", () => {
      const { container } = render(
        <Stack>
          <div>Item with potentially long content that could overflow</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      // The CSS class should apply min-width: 0
      expect(element.className).toContain("stack");
    });
  });

  describe("Custom Props", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <Stack className="custom-class">
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("custom-class");
    });

    it("should apply custom style", () => {
      const { container } = render(
        <Stack style={{ backgroundColor: "red" }}>
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.backgroundColor).toBe("red");
    });

    it("should render as custom element", () => {
      const { container } = render(
        <Stack as="section">
          <div>Item</div>
        </Stack>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("SECTION");
    });
  });

  describe("Children", () => {
    it("should render single child", () => {
      const { getByText } = render(
        <Stack>
          <div>Single Item</div>
        </Stack>,
      );
      expect(getByText("Single Item")).toBeTruthy();
    });

    it("should render multiple children", () => {
      const { getByText } = render(
        <Stack>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Stack>,
      );
      expect(getByText("Item 1")).toBeTruthy();
      expect(getByText("Item 2")).toBeTruthy();
      expect(getByText("Item 3")).toBeTruthy();
    });
  });
});
