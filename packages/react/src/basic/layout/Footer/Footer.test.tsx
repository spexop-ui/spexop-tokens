import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer.js";

describe("Footer", () => {
  describe("Basic Rendering", () => {
    it("should render with children", () => {
      const { getByText } = render(<Footer>Footer Content</Footer>);
      expect(getByText("Footer Content")).toBeTruthy();
    });

    it("should render as footer element by default", () => {
      const { container } = render(<Footer>Content</Footer>);
      expect(container.querySelector("footer")).toBeTruthy();
    });

    it("should render as custom element with as prop", () => {
      const { container } = render(<Footer as="div">Content</Footer>);
      const div = container.querySelector("div");
      expect(div).toBeTruthy();
    });
  });

  describe("Variants", () => {
    it("should apply default variant styles", () => {
      const { container } = render(<Footer variant="default">Content</Footer>);
      const footer = container.firstChild as HTMLElement;
      expect(footer.className).toContain("footer--default");
    });

    it("should apply minimal variant styles", () => {
      const { container } = render(<Footer variant="minimal">Content</Footer>);
      const footer = container.firstChild as HTMLElement;
      expect(footer.className).toContain("footer--minimal");
    });

    it("should apply bordered variant styles", () => {
      const { container } = render(<Footer variant="bordered">Content</Footer>);
      const footer = container.firstChild as HTMLElement;
      expect(footer.className).toContain("footer--bordered");
    });
  });

  describe("Spacing", () => {
    it("should apply padding from 0-10 scale", () => {
      const { container } = render(<Footer padding={6}>Content</Footer>);
      const footer = container.firstChild as HTMLElement;
      expect(footer.className).toContain("padding6");
    });

    it("should apply paddingTop", () => {
      const { container } = render(<Footer paddingTop={4}>Content</Footer>);
      const footer = container.firstChild as HTMLElement;
      expect(footer.className).toContain("paddingTop4");
    });

    it("should apply paddingBottom", () => {
      const { container } = render(<Footer paddingBottom={8}>Content</Footer>);
      const footer = container.firstChild as HTMLElement;
      expect(footer.className).toContain("paddingBottom8");
    });

    it("should apply paddingLeft", () => {
      const { container } = render(<Footer paddingLeft={3}>Content</Footer>);
      const footer = container.firstChild as HTMLElement;
      expect(footer.className).toContain("paddingLeft3");
    });

    it("should apply paddingRight", () => {
      const { container } = render(<Footer paddingRight={5}>Content</Footer>);
      const footer = container.firstChild as HTMLElement;
      expect(footer.className).toContain("paddingRight5");
    });

    it("should accept responsive padding object", () => {
      const { container } = render(
        <Footer padding={{ xs: 4, md: 6, lg: 8 }}>Content</Footer>,
      );
      // Should render without errors - actual responsive value depends on breakpoint
      expect(container.firstChild).toBeTruthy();
    });

    it("should accept responsive paddingTop object", () => {
      const { container } = render(
        <Footer paddingTop={{ xs: 2, md: 4 }}>Content</Footer>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should accept responsive paddingBottom object", () => {
      const { container } = render(
        <Footer paddingBottom={{ xs: 3, lg: 6 }}>Content</Footer>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Visual Modifiers", () => {
    it("should apply border when withBorder=true", () => {
      const { container } = render(<Footer withBorder>Content</Footer>);
      const footer = container.firstChild as HTMLElement;
      expect(footer.className).toContain("withBorder");
    });

    it("should remove background when withBackground=false", () => {
      const { container } = render(
        <Footer withBackground={false}>Content</Footer>,
      );
      const footer = container.firstChild as HTMLElement;
      expect(footer.className).toContain("noBackground");
    });
  });

  describe("Accessibility", () => {
    it("should apply aria-label", () => {
      const { container } = render(
        <Footer aria-label="Site footer">Content</Footer>,
      );
      const footer = container.querySelector("footer");
      expect(footer?.getAttribute("aria-label")).toBe("Site footer");
    });

    it("should apply aria-labelledby", () => {
      const { container } = render(
        <Footer aria-labelledby="footer-heading">Content</Footer>,
      );
      const footer = container.querySelector("footer");
      expect(footer?.getAttribute("aria-labelledby")).toBe("footer-heading");
    });
  });

  describe("Custom Props", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <Footer className="custom-footer">Content</Footer>,
      );
      const footer = container.firstChild as HTMLElement;
      expect(footer.className).toContain("custom-footer");
    });

    it("should apply custom style prop", () => {
      const { container } = render(
        <Footer style={{ marginTop: "20px" }}>Content</Footer>,
      );
      const footer = container.firstChild as HTMLElement;
      expect(footer.style.marginTop).toBe("20px");
    });
  });

  describe("Data Attributes", () => {
    it("should apply data-component attribute", () => {
      const { container } = render(<Footer>Content</Footer>);
      const footer = container.firstChild as HTMLElement;
      expect(footer.getAttribute("data-component")).toBe("Footer");
    });
  });
});
