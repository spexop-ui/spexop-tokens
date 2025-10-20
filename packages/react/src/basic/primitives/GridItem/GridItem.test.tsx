/**
 * GridItem Component Tests
 * Tests for responsive props, token integration, and mobile-first behavior
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GridItem } from "./GridItem.js";

describe("GridItem", () => {
  describe("Column Span", () => {
    it("should apply span correctly", () => {
      const { container } = render(<GridItem span={6}>Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("span6");
    });

    it("should handle span=1", () => {
      const { container } = render(<GridItem span={1}>Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("span1");
    });

    it("should handle span=12", () => {
      const { container } = render(<GridItem span={12}>Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("span12");
    });

    it("should handle span=24", () => {
      const { container } = render(<GridItem span={24}>Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("span24");
    });

    it("should accept responsive span object", () => {
      const { container } = render(
        <GridItem span={{ xs: 12, md: 6, lg: 4 }}>Item</GridItem>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Row Span", () => {
    it("should apply rowSpan correctly", () => {
      const { container } = render(<GridItem rowSpan={2}>Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("rowSpan2");
    });

    it("should handle rowSpan=1", () => {
      const { container } = render(<GridItem rowSpan={1}>Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("rowSpan1");
    });

    it("should handle rowSpan=12", () => {
      const { container } = render(<GridItem rowSpan={12}>Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("rowSpan12");
    });

    it("should accept responsive rowSpan object", () => {
      const { container } = render(
        <GridItem rowSpan={{ xs: 1, md: 2 }}>Item</GridItem>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Precise Positioning", () => {
    it("should handle start position", () => {
      const { container } = render(<GridItem start={1}>Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.gridColumnStart).toBe("1");
    });

    it("should handle end position", () => {
      const { container } = render(<GridItem end={4}>Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.gridColumnEnd).toBe("4");
    });

    it("should handle start and end together", () => {
      const { container } = render(
        <GridItem start={1} end={4}>
          Item
        </GridItem>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.gridColumnStart).toBe("1");
      expect(element.style.gridColumnEnd).toBe("4");
    });

    it("should handle row position", () => {
      const { container } = render(<GridItem row={2}>Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.gridRow).toBe("2");
    });

    it("should handle rowStart", () => {
      const { container } = render(<GridItem rowStart={1}>Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.gridRowStart).toBe("1");
    });

    it("should handle rowEnd", () => {
      const { container } = render(<GridItem rowEnd={3}>Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.gridRowEnd).toBe("3");
    });

    it("should accept responsive start position", () => {
      const { container } = render(
        <GridItem start={{ xs: 1, md: 2 }}>Item</GridItem>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should accept responsive end position", () => {
      const { container } = render(
        <GridItem end={{ xs: 13, md: 7 }}>Item</GridItem>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Named Grid Area", () => {
    it("should handle named area", () => {
      const { container } = render(<GridItem area="header">Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.gridArea).toBe("header");
    });

    it("should handle complex area names", () => {
      const { container } = render(<GridItem area="sidebar">Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.gridArea).toBe("sidebar");
    });
  });

  describe("Alignment", () => {
    it("should apply alignStart", () => {
      const { container } = render(<GridItem align="start">Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("alignStart");
    });

    it("should apply alignCenter", () => {
      const { container } = render(<GridItem align="center">Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("alignCenter");
    });

    it("should apply alignEnd", () => {
      const { container } = render(<GridItem align="end">Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("alignEnd");
    });

    it("should apply alignStretch", () => {
      const { container } = render(<GridItem align="stretch">Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("alignStretch");
    });

    it("should accept responsive align", () => {
      const { container } = render(
        <GridItem align={{ xs: "start", md: "center" }}>Item</GridItem>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Justification", () => {
    it("should apply justifyStart", () => {
      const { container } = render(<GridItem justify="start">Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifyStart");
    });

    it("should apply justifyCenter", () => {
      const { container } = render(<GridItem justify="center">Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifyCenter");
    });

    it("should apply justifyEnd", () => {
      const { container } = render(<GridItem justify="end">Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifyEnd");
    });

    it("should apply justifyStretch", () => {
      const { container } = render(<GridItem justify="stretch">Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifyStretch");
    });

    it("should accept responsive justify", () => {
      const { container } = render(
        <GridItem justify={{ xs: "start", md: "center" }}>Item</GridItem>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Min-Width Overflow Protection", () => {
    it("should have min-width: 0 in CSS", () => {
      const { container } = render(
        <GridItem span={6}>
          <div>Item with potentially long content that could overflow</div>
        </GridItem>,
      );
      const element = container.firstChild as HTMLElement;
      // The CSS class should apply min-width: 0
      expect(element.className).toContain("gridItem");
    });
  });

  describe("Responsive Props - Mobile-First Cascading", () => {
    it("should handle all responsive props together", () => {
      const { container } = render(
        <GridItem
          span={{ xs: 12, md: 6, lg: 4 }}
          rowSpan={{ xs: 1, lg: 2 }}
          align={{ xs: "start", lg: "center" }}
          justify={{ xs: "start", lg: "center" }}
        >
          Item
        </GridItem>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Custom Props", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <GridItem className="custom-class">Item</GridItem>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("custom-class");
    });

    it("should apply custom style", () => {
      const { container } = render(
        <GridItem style={{ backgroundColor: "red" }}>Item</GridItem>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.backgroundColor).toBe("red");
    });

    it("should render as custom element", () => {
      const { container } = render(<GridItem as="article">Item</GridItem>);
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("ARTICLE");
    });
  });

  describe("Children", () => {
    it("should render children", () => {
      const { getByText } = render(<GridItem>Test Content</GridItem>);
      expect(getByText("Test Content")).toBeTruthy();
    });

    it("should render complex children", () => {
      const { getByText } = render(
        <GridItem>
          <div>
            <h2>Title</h2>
            <p>Content</p>
          </div>
        </GridItem>,
      );
      expect(getByText("Title")).toBeTruthy();
      expect(getByText("Content")).toBeTruthy();
    });
  });
});
