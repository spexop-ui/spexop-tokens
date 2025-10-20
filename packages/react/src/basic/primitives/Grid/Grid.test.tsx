/**
 * Grid Component Tests
 * Tests for responsive props, token integration, and mobile-first behavior
 */

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Grid } from "./Grid.js";

describe("Grid", () => {
  describe("Token Integration - Spacing Scale", () => {
    it("should apply gap spacing scale 0-10 correctly", () => {
      const { container } = render(
        <Grid gap={4}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("gap4");
    });

    it("should handle gap=0", () => {
      const { container } = render(
        <Grid gap={0}>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("gap0");
    });

    it("should handle gap=1", () => {
      const { container } = render(
        <Grid gap={1}>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("gap1");
    });

    it("should handle gap=5", () => {
      const { container } = render(
        <Grid gap={5}>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("gap5");
    });

    it("should handle gap=8", () => {
      const { container } = render(
        <Grid gap={8}>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("gap8");
    });

    it("should handle gap=10", () => {
      const { container } = render(
        <Grid gap={10}>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("gap10");
    });

    it("should apply rowGap independently", () => {
      const { container } = render(
        <Grid rowGap={6}>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("rowGap6");
    });

    it("should apply columnGap independently", () => {
      const { container } = render(
        <Grid columnGap={6}>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("columnGap6");
    });

    it("should allow rowGap and columnGap to override gap", () => {
      const { container } = render(
        <Grid gap={4} rowGap={2} columnGap={8}>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("gap4");
      expect(element.className).toContain("rowGap2");
      expect(element.className).toContain("columnGap8");
    });
  });

  describe("Columns", () => {
    it("should default to 12 columns", () => {
      const { container } = render(
        <Grid>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("cols12");
    });

    it("should apply numeric column count", () => {
      const { container } = render(
        <Grid columns={3}>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("cols3");
    });

    it("should handle minimum columns (1)", () => {
      const { container } = render(
        <Grid columns={1}>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("cols1");
    });

    it("should handle maximum columns (24)", () => {
      const { container } = render(
        <Grid columns={24}>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("cols24");
    });

    it("should apply auto-fit", () => {
      const { container } = render(
        <Grid columns="auto-fit">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("autoFit");
    });

    it("should apply auto-fill", () => {
      const { container } = render(
        <Grid columns="auto-fill">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("autoFill");
    });

    it("should accept responsive columns object", () => {
      const { container } = render(
        <Grid columns={{ xs: 1, md: 2, lg: 3 }}>
          <div>Item</div>
        </Grid>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Alignment", () => {
    it("should default to stretch", () => {
      const { container } = render(
        <Grid>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("alignStretch");
    });

    it("should apply alignStart", () => {
      const { container } = render(
        <Grid align="start">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("alignStart");
    });

    it("should apply alignCenter", () => {
      const { container } = render(
        <Grid align="center">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("alignCenter");
    });

    it("should apply alignEnd", () => {
      const { container } = render(
        <Grid align="end">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("alignEnd");
    });
  });

  describe("Justification", () => {
    it("should default to start", () => {
      const { container } = render(
        <Grid>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifyStart");
    });

    it("should apply justifyCenter", () => {
      const { container } = render(
        <Grid justify="center">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifyCenter");
    });

    it("should apply justifyEnd", () => {
      const { container } = render(
        <Grid justify="end">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifyEnd");
    });

    it("should apply justifySpaceBetween", () => {
      const { container } = render(
        <Grid justify="space-between">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifySpaceBetween");
    });

    it("should apply justifySpaceAround", () => {
      const { container } = render(
        <Grid justify="space-around">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifySpaceAround");
    });

    it("should apply justifySpaceEvenly", () => {
      const { container } = render(
        <Grid justify="space-evenly">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("justifySpaceEvenly");
    });
  });

  describe("Auto-Fit/Auto-Fill with Min Column Width", () => {
    it("should handle auto-fit with minColumnWidth", () => {
      const { container } = render(
        <Grid columns="auto-fit" minColumnWidth="300px">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeTruthy();
    });

    it("should handle auto-fill with minColumnWidth", () => {
      const { container } = render(
        <Grid columns="auto-fill" minColumnWidth="250px">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeTruthy();
    });

    it("should accept responsive minColumnWidth", () => {
      const { container } = render(
        <Grid columns="auto-fit" minColumnWidth={{ xs: "200px", md: "300px" }}>
          <div>Item</div>
        </Grid>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should set CSS variable --grid-min-col-width", () => {
      const { container } = render(
        <Grid columns="auto-fit" minColumnWidth="300px">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.getPropertyValue("--grid-min-col-width")).toBe(
        "300px",
      );
    });

    it("should set CSS variable --grid-max-col-width when provided", () => {
      const { container } = render(
        <Grid columns="auto-fit" minColumnWidth="250px" maxColumnWidth="500px">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.getPropertyValue("--grid-min-col-width")).toBe(
        "250px",
      );
      expect(element.style.getPropertyValue("--grid-max-col-width")).toBe(
        "500px",
      );
    });
  });

  describe("Fluid Mode", () => {
    it("should handle fluid with maxColumnWidth", () => {
      const { container } = render(
        <Grid
          columns="auto-fit"
          minColumnWidth="250px"
          maxColumnWidth="400px"
          fluid
        >
          <div>Item</div>
        </Grid>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should accept responsive maxColumnWidth", () => {
      const { container } = render(
        <Grid
          columns="auto-fit"
          minColumnWidth="250px"
          maxColumnWidth={{ xs: "300px", lg: "400px" }}
          fluid
        >
          <div>Item</div>
        </Grid>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should apply fluid class with auto-fit", () => {
      const { container } = render(
        <Grid columns="auto-fit" minColumnWidth="250px" fluid>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("fluid");
      expect(element.className).toContain("autoFit");
    });

    it("should apply fluid class with auto-fill", () => {
      const { container } = render(
        <Grid columns="auto-fill" minColumnWidth="250px" fluid>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("fluid");
      expect(element.className).toContain("autoFill");
    });
  });

  describe("Named Grid Areas", () => {
    it("should handle named areas", () => {
      const { container } = render(
        <Grid areas={["header header", "sidebar content", "footer footer"]}>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.gridTemplateAreas).toBeTruthy();
    });
  });

  describe("Container Queries", () => {
    it("should apply container class", () => {
      const { container } = render(
        <Grid container>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("container");
    });
  });

  describe("Subgrid", () => {
    it("should apply subgrid class", () => {
      const { container } = render(
        <Grid subgrid>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("subgrid");
    });
  });

  describe("Responsive Props - Mobile-First Cascading", () => {
    it("should handle all responsive props together", () => {
      const { container } = render(
        <Grid
          columns={{ xs: 1, md: 2, lg: 3 }}
          gap={{ xs: 2, lg: 6 }}
          rowGap={{ xs: 2, md: 4 }}
          columnGap={{ xs: 4, lg: 6 }}
        >
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    // Note: align and justify support responsive values in implementation
    // but types need to be updated to ResponsiveProp<GridAlign> and ResponsiveProp<GridJustify>
  });

  describe("Custom Props", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <Grid className="custom-class">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("custom-class");
    });

    it("should apply custom style", () => {
      const { container } = render(
        <Grid style={{ backgroundColor: "red" }}>
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.backgroundColor).toBe("red");
    });

    it("should render as custom element", () => {
      const { container } = render(
        <Grid as="section">
          <div>Item</div>
        </Grid>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("SECTION");
    });
  });

  describe("Children", () => {
    it("should render multiple children", () => {
      const { getByText } = render(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>,
      );
      expect(getByText("Item 1")).toBeTruthy();
      expect(getByText("Item 2")).toBeTruthy();
      expect(getByText("Item 3")).toBeTruthy();
    });
  });
});
