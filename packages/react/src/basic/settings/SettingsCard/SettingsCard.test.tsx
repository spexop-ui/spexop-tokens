/// <reference types="@testing-library/jest-dom" />
/**
 * SettingsCard Component Tests
 *
 * Tests for SettingsCard component covering:
 * - Title and description rendering
 * - Visual structure (header, separator, content)
 * - Custom className application
 * - Semantic HTML structure
 * - Heading hierarchy
 * - Accessibility (ARIA, screen readers)
 * - Empty state handling
 * - Multiple cards layout
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { SettingsCard } from "./SettingsCard.js";

describe("SettingsCard", () => {
  describe("Rendering", () => {
    it("renders title text", () => {
      render(
        <SettingsCard title="TEST SECTION">
          <div>Content</div>
        </SettingsCard>,
      );

      expect(screen.getByText("TEST SECTION")).toBeInTheDocument();
    });

    it("renders description when provided", () => {
      render(
        <SettingsCard
          title="SECTION"
          description="This is a section description"
        >
          <div>Content</div>
        </SettingsCard>,
      );

      expect(
        screen.getByText("This is a section description"),
      ).toBeInTheDocument();
    });

    it("does not render description when not provided", () => {
      const { container } = render(
        <SettingsCard title="SECTION">
          <div>Content</div>
        </SettingsCard>,
      );

      const description = container.querySelector(".description");
      expect(description).not.toBeInTheDocument();
    });

    it("renders children content", () => {
      render(
        <SettingsCard title="SECTION">
          <div data-testid="test-content">Test Content</div>
        </SettingsCard>,
      );

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <SettingsCard title="SECTION" className="custom-class">
          <div>Content</div>
        </SettingsCard>,
      );

      const card = container.querySelector(".card");
      expect(card).toHaveClass("custom-class");
    });
  });

  describe("Visual Structure", () => {
    it("renders with correct DOM structure", () => {
      const { container } = render(
        <SettingsCard title="SECTION" description="Description">
          <div>Content</div>
        </SettingsCard>,
      );

      // Main card container
      const card = container.querySelector(".card");
      expect(card).toBeInTheDocument();

      // Header
      const header = container.querySelector(".header");
      expect(header).toBeInTheDocument();

      // Title
      const title = container.querySelector(".title");
      expect(title).toBeInTheDocument();

      // Description
      const description = container.querySelector(".description");
      expect(description).toBeInTheDocument();

      // Separator
      const separator = container.querySelector(".separator");
      expect(separator).toBeInTheDocument();

      // Content
      const content = container.querySelector(".content");
      expect(content).toBeInTheDocument();
    });

    it("renders separator between header and content", () => {
      const { container } = render(
        <SettingsCard title="SECTION">
          <div>Content</div>
        </SettingsCard>,
      );

      const separator = container.querySelector(".separator");
      expect(separator).toBeInTheDocument();
    });

    it("maintains structure without description", () => {
      const { container } = render(
        <SettingsCard title="SECTION">
          <div>Content</div>
        </SettingsCard>,
      );

      const card = container.querySelector(".card");
      const header = container.querySelector(".header");
      const separator = container.querySelector(".separator");
      const content = container.querySelector(".content");

      expect(card).toBeInTheDocument();
      expect(header).toBeInTheDocument();
      expect(separator).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });

  describe("Semantic HTML", () => {
    it("renders title as h3 element", () => {
      render(
        <SettingsCard title="SECTION TITLE">
          <div>Content</div>
        </SettingsCard>,
      );

      const title = screen.getByText("SECTION TITLE");
      expect(title.tagName).toBe("H3");
    });

    it("renders description as paragraph element", () => {
      const { container } = render(
        <SettingsCard title="SECTION" description="Test Description">
          <div>Content</div>
        </SettingsCard>,
      );

      const description = screen.getByText("Test Description");
      expect(description.tagName).toBe("P");
    });

    it("uses div for card container", () => {
      const { container } = render(
        <SettingsCard title="SECTION">
          <div>Content</div>
        </SettingsCard>,
      );

      const card = container.firstChild;
      expect(card?.nodeName).toBe("DIV");
    });
  });

  describe("Heading Hierarchy", () => {
    it("creates proper heading level (h3)", () => {
      render(
        <SettingsCard title="NOTIFICATIONS">
          <div>Content</div>
        </SettingsCard>,
      );

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("NOTIFICATIONS");
    });

    it("supports multiple cards with proper headings", () => {
      render(
        <div>
          <SettingsCard title="FIRST SECTION">
            <div>First Content</div>
          </SettingsCard>
          <SettingsCard title="SECOND SECTION">
            <div>Second Content</div>
          </SettingsCard>
        </div>,
      );

      const headings = screen.getAllByRole("heading", { level: 3 });
      expect(headings).toHaveLength(2);
      expect(headings[0]).toHaveTextContent("FIRST SECTION");
      expect(headings[1]).toHaveTextContent("SECOND SECTION");
    });
  });

  describe("CSS Classes", () => {
    it("applies card class", () => {
      const { container } = render(
        <SettingsCard title="SECTION">
          <div>Content</div>
        </SettingsCard>,
      );

      const card = container.querySelector(".card");
      expect(card).toBeInTheDocument();
    });

    it("applies header class", () => {
      const { container } = render(
        <SettingsCard title="SECTION">
          <div>Content</div>
        </SettingsCard>,
      );

      const header = container.querySelector(".header");
      expect(header).toBeInTheDocument();
    });

    it("applies title class", () => {
      const { container } = render(
        <SettingsCard title="SECTION">
          <div>Content</div>
        </SettingsCard>,
      );

      const title = container.querySelector(".title");
      expect(title).toBeInTheDocument();
    });

    it("applies description class when present", () => {
      const { container } = render(
        <SettingsCard title="SECTION" description="Description">
          <div>Content</div>
        </SettingsCard>,
      );

      const description = container.querySelector(".description");
      expect(description).toBeInTheDocument();
    });

    it("applies separator class", () => {
      const { container } = render(
        <SettingsCard title="SECTION">
          <div>Content</div>
        </SettingsCard>,
      );

      const separator = container.querySelector(".separator");
      expect(separator).toBeInTheDocument();
    });

    it("applies content class", () => {
      const { container } = render(
        <SettingsCard title="SECTION">
          <div>Content</div>
        </SettingsCard>,
      );

      const content = container.querySelector(".content");
      expect(content).toBeInTheDocument();
    });

    it("combines custom className with default classes", () => {
      const { container } = render(
        <SettingsCard title="SECTION" className="custom-class">
          <div>Content</div>
        </SettingsCard>,
      );

      const card = container.querySelector(".card");
      expect(card).toHaveClass("card");
      expect(card).toHaveClass("custom-class");
    });
  });

  describe("Content Rendering", () => {
    it("renders simple text content", () => {
      render(
        <SettingsCard title="SECTION">
          <p>Simple text content</p>
        </SettingsCard>,
      );

      expect(screen.getByText("Simple text content")).toBeInTheDocument();
    });

    it("renders multiple children", () => {
      render(
        <SettingsCard title="SECTION">
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <div data-testid="child-3">Child 3</div>
        </SettingsCard>,
      );

      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
      expect(screen.getByTestId("child-3")).toBeInTheDocument();
    });

    it("renders complex nested content", () => {
      render(
        <SettingsCard title="SECTION">
          <div>
            <div>
              <p data-testid="nested">Nested content</p>
            </div>
          </div>
        </SettingsCard>,
      );

      expect(screen.getByTestId("nested")).toBeInTheDocument();
    });

    it("renders React components as children", () => {
      const TestComponent = () => <div data-testid="test-component">Test</div>;

      render(
        <SettingsCard title="SECTION">
          <TestComponent />
        </SettingsCard>,
      );

      expect(screen.getByTestId("test-component")).toBeInTheDocument();
    });
  });

  describe("Empty States", () => {
    it("handles empty children gracefully", () => {
      const { container } = render(
        <SettingsCard title="SECTION">{null}</SettingsCard>,
      );

      const content = container.querySelector(".content");
      expect(content).toBeInTheDocument();
      expect(content?.textContent).toBe("");
    });

    it("handles undefined children", () => {
      const { container } = render(
        <SettingsCard title="SECTION">{undefined}</SettingsCard>,
      );

      const content = container.querySelector(".content");
      expect(content).toBeInTheDocument();
    });

    it("handles empty string description", () => {
      const { container } = render(
        <SettingsCard title="SECTION" description="">
          <div>Content</div>
        </SettingsCard>,
      );

      const description = container.querySelector(".description");
      expect(description).not.toBeInTheDocument();
    });
  });

  describe("Multiple Cards", () => {
    it("renders multiple cards independently", () => {
      render(
        <div>
          <SettingsCard title="FIRST">
            <div data-testid="first-content">First</div>
          </SettingsCard>
          <SettingsCard title="SECOND">
            <div data-testid="second-content">Second</div>
          </SettingsCard>
          <SettingsCard title="THIRD">
            <div data-testid="third-content">Third</div>
          </SettingsCard>
        </div>,
      );

      expect(screen.getByText("FIRST")).toBeInTheDocument();
      expect(screen.getByText("SECOND")).toBeInTheDocument();
      expect(screen.getByText("THIRD")).toBeInTheDocument();

      expect(screen.getByTestId("first-content")).toBeInTheDocument();
      expect(screen.getByTestId("second-content")).toBeInTheDocument();
      expect(screen.getByTestId("third-content")).toBeInTheDocument();
    });

    it("maintains separate descriptions for multiple cards", () => {
      render(
        <div>
          <SettingsCard title="FIRST" description="First description">
            <div>Content</div>
          </SettingsCard>
          <SettingsCard title="SECOND" description="Second description">
            <div>Content</div>
          </SettingsCard>
        </div>,
      );

      expect(screen.getByText("First description")).toBeInTheDocument();
      expect(screen.getByText("Second description")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("uses semantic heading for title", () => {
      render(
        <SettingsCard title="ACCESSIBLE SECTION">
          <div>Content</div>
        </SettingsCard>,
      );

      const heading = screen.getByRole("heading", {
        name: "ACCESSIBLE SECTION",
      });
      expect(heading).toBeInTheDocument();
    });

    it("maintains proper heading level", () => {
      render(
        <SettingsCard title="SECTION">
          <div>Content</div>
        </SettingsCard>,
      );

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toBeInTheDocument();
    });

    it("description is accessible to screen readers", () => {
      render(
        <SettingsCard title="SECTION" description="Helpful description">
          <div>Content</div>
        </SettingsCard>,
      );

      const description = screen.getByText("Helpful description");
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe("P");
    });

    it("maintains logical reading order", () => {
      const { container } = render(
        <SettingsCard title="SECTION" description="Description">
          <div>Content</div>
        </SettingsCard>,
      );

      const card = container.firstChild as HTMLElement;
      const elements = Array.from(card.querySelectorAll("*"));

      // Title should come before description
      const titleIndex = elements.findIndex((el) =>
        el.classList.contains("title"),
      );
      const descIndex = elements.findIndex((el) =>
        el.classList.contains("description"),
      );
      const contentIndex = elements.findIndex((el) =>
        el.classList.contains("content"),
      );

      expect(titleIndex).toBeLessThan(descIndex);
      expect(descIndex).toBeLessThan(contentIndex);
    });
  });

  describe("Edge Cases", () => {
    it("handles very long title text", () => {
      const longTitle =
        "THIS IS A VERY LONG TITLE THAT SHOULD STILL RENDER PROPERLY WITHOUT BREAKING THE LAYOUT";

      render(
        <SettingsCard title={longTitle}>
          <div>Content</div>
        </SettingsCard>,
      );

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("handles very long description text", () => {
      const longDescription =
        "This is a very long description that should still render properly and provide helpful information without breaking the layout or causing any visual issues";

      render(
        <SettingsCard title="SECTION" description={longDescription}>
          <div>Content</div>
        </SettingsCard>,
      );

      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it("handles special characters in title", () => {
      render(
        <SettingsCard title="SECTION & SETTINGS">
          <div>Content</div>
        </SettingsCard>,
      );

      expect(screen.getByText("SECTION & SETTINGS")).toBeInTheDocument();
    });

    it("handles special characters in description", () => {
      render(
        <SettingsCard
          title="SECTION"
          description="Description with <special> & {characters}"
        >
          <div>Content</div>
        </SettingsCard>,
      );

      expect(
        screen.getByText("Description with <special> & {characters}"),
      ).toBeInTheDocument();
    });

    it("handles empty title gracefully", () => {
      render(
        <SettingsCard title="">
          <div>Content</div>
        </SettingsCard>,
      );

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe("");
    });

    it("renders without description prop", () => {
      const { container } = render(
        <SettingsCard title="SECTION">
          <div>Content</div>
        </SettingsCard>,
      );

      const card = container.querySelector(".card");
      expect(card).toBeInTheDocument();

      const description = container.querySelector(".description");
      expect(description).not.toBeInTheDocument();
    });

    it("handles className as empty string", () => {
      const { container } = render(
        <SettingsCard title="SECTION" className="">
          <div>Content</div>
        </SettingsCard>,
      );

      const card = container.querySelector(".card");
      expect(card).toBeInTheDocument();
    });
  });
});
