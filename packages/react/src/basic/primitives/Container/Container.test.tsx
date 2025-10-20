/**
 * Container Component Tests
 * Tests for responsive props, token integration, and mobile-first behavior
 */

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "./Container.js";

describe("Container", () => {
  describe("Token Integration", () => {
    it("should apply spacing scale 0-10 correctly", () => {
      const { container } = render(
        <Container padding={6} data-testid="container">
          Content
        </Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("padding6");
    });

    it("should handle padding=0", () => {
      const { container } = render(<Container padding={0}>Content</Container>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("padding0");
    });

    it("should handle padding=10", () => {
      const { container } = render(<Container padding={10}>Content</Container>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("padding10");
    });
  });

  describe("Responsive Props - Mobile-First Cascading", () => {
    it("should accept responsive maxWidth object", () => {
      const { container } = render(
        <Container maxWidth={{ xs: "sm", md: "lg", xl: "2xl" }}>
          Content
        </Container>,
      );
      // Component should render without errors
      expect(container.firstChild).toBeTruthy();
    });

    it("should accept responsive padding object", () => {
      const { container } = render(
        <Container padding={{ xs: 2, md: 4, lg: 6 }}>Content</Container>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should accept responsive paddingLeft", () => {
      const { container } = render(
        <Container paddingLeft={{ xs: 2, lg: 6 }}>Content</Container>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should accept responsive paddingRight", () => {
      const { container } = render(
        <Container paddingRight={{ xs: 2, lg: 6 }}>Content</Container>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should accept responsive paddingTop", () => {
      const { container } = render(
        <Container paddingTop={{ xs: 2, lg: 6 }}>Content</Container>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should accept responsive paddingBottom", () => {
      const { container } = render(
        <Container paddingBottom={{ xs: 2, lg: 6 }}>Content</Container>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("MaxWidth - Token-Based", () => {
    it("should apply maxWidth xs", () => {
      const { container } = render(
        <Container maxWidth="xs">Content</Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("maxWidthXs");
    });

    it("should apply maxWidth sm", () => {
      const { container } = render(
        <Container maxWidth="sm">Content</Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("maxWidthSm");
    });

    it("should apply maxWidth md", () => {
      const { container } = render(
        <Container maxWidth="md">Content</Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("maxWidthMd");
    });

    it("should apply maxWidth lg", () => {
      const { container } = render(
        <Container maxWidth="lg">Content</Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("maxWidthLg");
    });

    it("should apply maxWidth xl (default)", () => {
      const { container } = render(<Container>Content</Container>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("maxWidthXl");
    });

    it("should apply maxWidth 2xl", () => {
      const { container } = render(
        <Container maxWidth="2xl">Content</Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("maxWidth2Xl");
    });

    it("should apply maxWidth full", () => {
      const { container } = render(
        <Container maxWidth="full">Content</Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("maxWidthFull");
    });
  });

  describe("Centering", () => {
    it("should center by default", () => {
      const { container } = render(<Container>Content</Container>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("centered");
    });

    it("should not center when centered=false", () => {
      const { container } = render(
        <Container centered={false}>Content</Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).not.toContain("centered");
    });
  });

  describe("Fluid Mode", () => {
    it("should apply fluid class", () => {
      const { container } = render(<Container fluid>Content</Container>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("fluid");
    });

    it("should not apply maxWidth classes when fluid=true", () => {
      const { container } = render(
        <Container fluid maxWidth="lg">
          Content
        </Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("fluid");
      expect(element.className).not.toContain("maxWidth");
    });
  });

  describe("Individual Padding Overrides", () => {
    it("should apply paddingLeft", () => {
      const { container } = render(
        <Container paddingLeft={8}>Content</Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("paddingLeft8");
    });

    it("should apply paddingRight", () => {
      const { container } = render(
        <Container paddingRight={8}>Content</Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("paddingRight8");
    });

    it("should apply paddingTop", () => {
      const { container } = render(
        <Container paddingTop={8}>Content</Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("paddingTop8");
    });

    it("should apply paddingBottom", () => {
      const { container } = render(
        <Container paddingBottom={8}>Content</Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("paddingBottom8");
    });
  });

  describe("Custom Props", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <Container className="custom-class">Content</Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("custom-class");
    });

    it("should apply custom style", () => {
      const { container } = render(
        <Container style={{ backgroundColor: "red" }}>Content</Container>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.backgroundColor).toBe("red");
    });

    it("should render as custom element", () => {
      const { container } = render(<Container as="section">Content</Container>);
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("SECTION");
    });
  });

  describe("Children", () => {
    it("should render children", () => {
      const { getByText } = render(<Container>Test Content</Container>);
      expect(getByText("Test Content")).toBeTruthy();
    });

    it("should render multiple children", () => {
      const { getByText } = render(
        <Container>
          <div>Child 1</div>
          <div>Child 2</div>
        </Container>,
      );
      expect(getByText("Child 1")).toBeTruthy();
      expect(getByText("Child 2")).toBeTruthy();
    });
  });
});
