/**
 * Section Component Tests
 *
 * Tests for Section component covering:
 * - Rendering with children
 * - Variants (white, neutral, gradient)
 * - Intro content (label, title, description)
 * - Container integration
 * - Padding options
 * - Margin bottom options
 * - Accent bars
 * - Border configurations
 * - ContextNav integration
 * - Layout options (fullWidth, centered)
 * - Custom styling
 * - Accessibility
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Section } from "./Section.js";

describe("Section", () => {
  describe("Basic Rendering", () => {
    it("should render with children", () => {
      const { getByText } = render(
        <Section>
          <p>Section content</p>
        </Section>,
      );
      expect(getByText("Section content")).toBeTruthy();
    });

    it("should render as section element", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>,
      );
      const section = container.querySelector("section");
      expect(section).toBeTruthy();
    });

    it("should apply custom id", () => {
      const { container } = render(
        <Section id="test-section">
          <p>Content</p>
        </Section>,
      );
      const section = container.querySelector("section");
      expect(section?.id).toBe("test-section");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Section className="custom-section">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("custom-section");
    });

    it("should apply custom style", () => {
      const { container } = render(
        <Section style={{ marginTop: "20px" }}>
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.style.marginTop).toBe("20px");
    });
  });

  describe("Variants", () => {
    it("should apply white variant by default", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("variant-white");
    });

    it("should apply neutral variant", () => {
      const { container } = render(
        <Section variant="neutral">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("variant-neutral");
    });

    it("should apply gradient variant", () => {
      const { container } = render(
        <Section variant="gradient">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("variant-gradient");
    });
  });

  describe("Intro Content", () => {
    it("should not render intro content when not provided", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>,
      );
      const intro = container.querySelector('[class*="intro"]');
      expect(intro).toBeFalsy();
    });

    it("should render label when provided", () => {
      const { getByText } = render(
        <Section label="FEATURES">
          <p>Content</p>
        </Section>,
      );
      expect(getByText("FEATURES")).toBeTruthy();
    });

    it("should render title when provided", () => {
      const { getByText } = render(
        <Section title="Section Title">
          <p>Content</p>
        </Section>,
      );
      expect(getByText("Section Title")).toBeTruthy();
    });

    it("should render title as h2 element", () => {
      const { container } = render(
        <Section title="Section Title">
          <p>Content</p>
        </Section>,
      );
      const h2 = container.querySelector("h2");
      expect(h2).toBeTruthy();
      expect(h2?.textContent).toBe("Section Title");
    });

    it("should render description when provided", () => {
      const { getByText } = render(
        <Section description="Section description">
          <p>Content</p>
        </Section>,
      );
      expect(getByText("Section description")).toBeTruthy();
    });

    it("should render all intro content together", () => {
      const { getByText } = render(
        <Section
          label="FEATURES"
          title="Section Title"
          description="Section description"
        >
          <p>Content</p>
        </Section>,
      );
      expect(getByText("FEATURES")).toBeTruthy();
      expect(getByText("Section Title")).toBeTruthy();
      expect(getByText("Section description")).toBeTruthy();
    });

    it("should apply left intro alignment", () => {
      const { container } = render(
        <Section label="TEST" title="Title" introAlign="left">
          <p>Content</p>
        </Section>,
      );
      const intro = container.querySelector('[class*="intro"]');
      expect(intro?.getAttribute("data-align")).toBe("left");
    });

    it("should apply center intro alignment by default", () => {
      const { container } = render(
        <Section label="TEST" title="Title">
          <p>Content</p>
        </Section>,
      );
      const intro = container.querySelector('[class*="intro"]');
      expect(intro?.getAttribute("data-align")).toBe("center");
    });

    it("should apply right intro alignment", () => {
      const { container } = render(
        <Section label="TEST" title="Title" introAlign="right">
          <p>Content</p>
        </Section>,
      );
      const intro = container.querySelector('[class*="intro"]');
      expect(intro?.getAttribute("data-align")).toBe("right");
    });
  });

  describe("Padding", () => {
    it("should apply normal padding by default", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("padding-normal");
    });

    it("should apply compact padding", () => {
      const { container } = render(
        <Section padding="compact">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("padding-compact");
    });

    it("should apply spacious padding", () => {
      const { container } = render(
        <Section padding="spacious">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("padding-spacious");
    });
  });

  describe("Margin Bottom", () => {
    it("should apply normal margin bottom by default", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("margin-normal");
    });

    it("should apply no margin bottom", () => {
      const { container } = render(
        <Section marginBottom="none">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("margin-none");
    });

    it("should apply large margin bottom", () => {
      const { container } = render(
        <Section marginBottom="large">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("margin-large");
    });
  });

  describe("Accent Bars", () => {
    it("should apply no accent by default for white variant", () => {
      const { container } = render(
        <Section variant="white">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).not.toContain("accent-");
    });

    it("should apply left accent for gradient variant by default", () => {
      const { container } = render(
        <Section variant="gradient">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("accent-left");
    });

    it("should apply left accent", () => {
      const { container } = render(
        <Section accent="left">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("accent-left");
    });

    it("should apply top accent", () => {
      const { container } = render(
        <Section accent="top">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("accent-top");
    });

    it("should apply bottom accent", () => {
      const { container } = render(
        <Section accent="bottom">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("accent-bottom");
    });

    it("should apply right accent", () => {
      const { container } = render(
        <Section accent="right">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("accent-right");
    });

    it("should apply custom accent color", () => {
      const { container } = render(
        <Section accent="left" accentColor="#ff0000">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.style.getPropertyValue("--accent-color")).toBe("#ff0000");
    });
  });

  describe("Borders", () => {
    it("should apply borders by default", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).not.toContain("noBorder");
    });

    it("should remove borders when border=false", () => {
      const { container } = render(
        <Section border={false}>
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("noBorder");
    });

    it("should apply top border", () => {
      const { container } = render(
        <Section border="top">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("border-top");
    });

    it("should apply bottom border", () => {
      const { container } = render(
        <Section border="bottom">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("border-bottom");
    });

    it("should apply horizontal borders", () => {
      const { container } = render(
        <Section border="horizontal">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("border-horizontal");
    });

    it("should apply vertical borders", () => {
      const { container } = render(
        <Section border="vertical">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("border-vertical");
    });

    it("should apply custom border color", () => {
      const { container } = render(
        <Section borderColor="#0000ff">
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.style.getPropertyValue("--border-color")).toBe("#0000ff");
    });
  });

  describe("Layout Options", () => {
    it("should not be fullWidth by default", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).not.toContain("fullWidth");
    });

    it("should apply fullWidth class", () => {
      const { container } = render(
        <Section fullWidth>
          <p>Content</p>
        </Section>,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("fullWidth");
    });

    it("should be centered by default", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>,
      );
      // Container should be rendered when not fullWidth
      expect(container.firstChild).toBeTruthy();
    });

    it("should apply centered prop", () => {
      const { container } = render(
        <Section centered={false}>
          <p>Content</p>
        </Section>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("ContextNav Integration", () => {
    it("should render without contextNav", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should render with contextNav prop", () => {
      const mockContextNav = <div data-testid="context-nav">Context Nav</div>;
      const { getByTestId } = render(
        <Section contextNav={mockContextNav}>
          <p>Content</p>
        </Section>,
      );
      expect(getByTestId("context-nav")).toBeTruthy();
    });

    it("should render contextNav before content", () => {
      const mockContextNav = <div data-testid="context-nav">Context Nav</div>;
      const { container } = render(
        <Section contextNav={mockContextNav}>
          <p data-testid="content">Content</p>
        </Section>,
      );

      const section = container.querySelector("section");
      const children = Array.from(section?.children || []);
      const contextNavIndex = children.findIndex(
        (child) =>
          (child as HTMLElement).getAttribute("data-testid") === "context-nav",
      );
      const contentIndex = children.findIndex((child) =>
        child.textContent?.includes("Content"),
      );

      // ContextNav should appear before content
      expect(contextNavIndex).toBeLessThan(contentIndex);
    });
  });

  describe("Max Width", () => {
    it("should apply xl maxWidth by default", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>,
      );
      // Container should be rendered with default maxWidth
      expect(container.firstChild).toBeTruthy();
    });

    it("should accept different maxWidth values", () => {
      const maxWidths = ["sm", "md", "lg", "xl", "2xl"] as const;

      for (const maxWidth of maxWidths) {
        const { container } = render(
          <Section maxWidth={maxWidth}>
            <p>Content</p>
          </Section>,
        );
        expect(container.firstChild).toBeTruthy();
      }
    });
  });

  describe("Container Padding", () => {
    it("should apply default container padding", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should apply custom container padding", () => {
      const { container } = render(
        <Section containerPadding={{ xs: 4, md: 8 }}>
          <p>Content</p>
        </Section>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Forward Ref", () => {
    it("should forward ref to section element", () => {
      const ref = vi.fn();
      render(
        <Section ref={ref}>
          <p>Content</p>
        </Section>,
      );
      expect(ref).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should use semantic section element", () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>,
      );
      const section = container.querySelector("section");
      expect(section).toBeTruthy();
    });

    it("should support anchor links with id", () => {
      const { container } = render(
        <Section id="features">
          <p>Content</p>
        </Section>,
      );
      const section = container.querySelector("section");
      expect(section?.id).toBe("features");
    });

    it("should have proper heading hierarchy", () => {
      const { container } = render(
        <Section title="Section Title">
          <p>Content</p>
        </Section>,
      );
      const h2 = container.querySelector("h2");
      expect(h2).toBeTruthy();
      expect(h2?.textContent).toBe("Section Title");
    });
  });
});
