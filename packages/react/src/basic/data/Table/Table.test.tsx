/**
 * Table Component Tests
 * Comprehensive test suite for Table component and subcomponents
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "./Table.js";

describe("Table", () => {
  describe("Basic Rendering", () => {
    it("renders a basic table", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>Name</TableCell>
              <TableCell header>Email</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(
        <Table className="custom-table">
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const table = container.querySelector(".custom-table");
      expect(table).toBeInTheDocument();
    });

    it("applies aria-label", () => {
      render(
        <Table aria-label="Test table">
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByLabelText("Test table")).toBeInTheDocument();
    });

    it("applies aria-describedby", () => {
      render(
        <div>
          <p id="table-description">This is a test table</p>
          <Table aria-describedby="table-description">
            <TableBody>
              <TableRow>
                <TableCell>Content</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>,
      );

      const table = screen.getByRole("table");
      expect(table).toHaveAttribute("aria-describedby", "table-description");
    });
  });

  describe("TableHeader", () => {
    it("renders thead element", () => {
      const { container } = render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>Header</TableCell>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      expect(container.querySelector("thead")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Table>
          <TableHeader className="custom-header">
            <TableRow>
              <TableCell header>Header</TableCell>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      const thead = container.querySelector(".custom-header");
      expect(thead).toBeInTheDocument();
    });

    it("renders multiple header rows", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>Header 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell header>Header 2</TableCell>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      expect(screen.getByText("Header 1")).toBeInTheDocument();
      expect(screen.getByText("Header 2")).toBeInTheDocument();
    });
  });

  describe("TableBody", () => {
    it("renders tbody element", () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(container.querySelector("tbody")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Table>
          <TableBody className="custom-body">
            <TableRow>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const tbody = container.querySelector(".custom-body");
      expect(tbody).toBeInTheDocument();
    });

    it("renders multiple body rows", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Row 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Row 2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Row 3</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Row 1")).toBeInTheDocument();
      expect(screen.getByText("Row 2")).toBeInTheDocument();
      expect(screen.getByText("Row 3")).toBeInTheDocument();
    });
  });

  describe("TableFooter", () => {
    it("renders tfoot element", () => {
      const { container } = render(
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>,
      );

      expect(container.querySelector("tfoot")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Table>
          <TableFooter className="custom-footer">
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>,
      );

      const tfoot = container.querySelector(".custom-footer");
      expect(tfoot).toBeInTheDocument();
    });

    it("renders footer content", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Item 1</TableCell>
              <TableCell>$10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Item 2</TableCell>
              <TableCell>$20</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>$30</TableCell>
            </TableRow>
          </TableFooter>
        </Table>,
      );

      expect(screen.getByText("Total")).toBeInTheDocument();
      expect(screen.getByText("$30")).toBeInTheDocument();
    });
  });

  describe("TableRow", () => {
    it("renders tr element", () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(container.querySelector("tr")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow className="custom-row">
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const row = container.querySelector(".custom-row");
      expect(row).toBeInTheDocument();
    });

    it("handles selected state", () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow selected>
              <TableCell>Selected Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const row = container.querySelector("tr");
      expect(row).toHaveAttribute("aria-selected", "true");
    });

    it("handles click events", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Table>
          <TableBody>
            <TableRow onClick={handleClick}>
              <TableCell>Clickable Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const row = screen.getByText("Clickable Row").closest("tr");
      if (row) {
        await user.click(row);
      }

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("supports keyboard interaction with Enter", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Table>
          <TableBody>
            <TableRow onClick={handleClick}>
              <TableCell>Interactive Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const row = screen.getByText("Interactive Row").closest("tr");
      if (row) {
        row.focus();
        await user.keyboard("{Enter}");
      }

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("supports keyboard interaction with Space", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Table>
          <TableBody>
            <TableRow onClick={handleClick}>
              <TableCell>Interactive Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const row = screen.getByText("Interactive Row").closest("tr");
      if (row) {
        row.focus();
        await user.keyboard(" ");
      }

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("has tabIndex when clickable", () => {
      const handleClick = vi.fn();

      const { container } = render(
        <Table>
          <TableBody>
            <TableRow onClick={handleClick}>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const row = container.querySelector("tr");
      expect(row).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("TableCell", () => {
    it("renders td element by default", () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(container.querySelector("td")).toBeInTheDocument();
    });

    it("renders th element when header prop is true", () => {
      const { container } = render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>Header</TableCell>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      expect(container.querySelector("th")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="custom-cell">Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const cell = container.querySelector(".custom-cell");
      expect(cell).toBeInTheDocument();
    });

    it("supports left alignment", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="left">Left aligned</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Left aligned")).toBeInTheDocument();
    });

    it("supports center alignment", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="center">Center aligned</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Center aligned")).toBeInTheDocument();
    });

    it("supports right alignment", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right">Right aligned</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Right aligned")).toBeInTheDocument();
    });

    it("supports colspan", () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Spans 2 columns</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const cell = container.querySelector("td");
      expect(cell).toHaveAttribute("colSpan", "2");
    });

    it("supports rowspan", () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell rowSpan={2}>Spans 2 rows</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Row 2</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const cell = container.querySelector("td");
      expect(cell).toHaveAttribute("rowSpan", "2");
    });

    it("supports fixed width", () => {
      const { container } = render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header width="200px">
                Fixed Width
              </TableCell>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      const cell = container.querySelector("th");
      expect(cell).toHaveStyle({ width: "200px" });
    });

    it("supports aria-sort attribute", () => {
      const { container } = render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header aria-sort="ascending">
                Sortable
              </TableCell>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      const cell = container.querySelector("th");
      expect(cell).toHaveAttribute("aria-sort", "ascending");
    });
  });

  describe("Variants", () => {
    it("renders default variant", () => {
      render(
        <Table variant="default">
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("renders bordered variant", () => {
      render(
        <Table variant="bordered">
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("renders striped variant", () => {
      render(
        <Table variant="striped">
          <TableBody>
            <TableRow>
              <TableCell>Row 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Row 2</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Row 1")).toBeInTheDocument();
      expect(screen.getByText("Row 2")).toBeInTheDocument();
    });

    it("renders hover variant", () => {
      render(
        <Table variant="hover">
          <TableBody>
            <TableRow>
              <TableCell>Hover Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Hover Row")).toBeInTheDocument();
    });

    it("renders minimal variant", () => {
      render(
        <Table variant="minimal">
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("renders compact variant", () => {
      render(
        <Table variant="compact">
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      render(
        <Table size="sm">
          <TableBody>
            <TableRow>
              <TableCell>Small</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Small")).toBeInTheDocument();
    });

    it("renders medium size (default)", () => {
      render(
        <Table size="md">
          <TableBody>
            <TableRow>
              <TableCell>Medium</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Medium")).toBeInTheDocument();
    });

    it("renders large size", () => {
      render(
        <Table size="lg">
          <TableBody>
            <TableRow>
              <TableCell>Large</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Large")).toBeInTheDocument();
    });
  });

  describe("Layout Modes", () => {
    it("uses auto layout by default", () => {
      render(
        <Table layout="auto">
          <TableBody>
            <TableRow>
              <TableCell>Auto Layout</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("supports fixed layout", () => {
      render(
        <Table layout="fixed">
          <TableBody>
            <TableRow>
              <TableCell>Fixed Layout</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  describe("Width Options", () => {
    it("renders full width by default", () => {
      render(
        <Table fullWidth>
          <TableBody>
            <TableRow>
              <TableCell>Full Width</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("renders auto width", () => {
      render(
        <Table fullWidth={false}>
          <TableBody>
            <TableRow>
              <TableCell>Auto Width</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  describe("Responsive Scrolling", () => {
    it("enables responsive scrolling", () => {
      const { container } = render(
        <Table responsive>
          <TableBody>
            <TableRow>
              <TableCell>Responsive</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const wrapper = container.querySelector("div");
      expect(wrapper).toBeInTheDocument();
    });

    it("disables responsive scrolling by default", () => {
      const { container } = render(
        <Table responsive={false}>
          <TableBody>
            <TableRow>
              <TableCell>Not Responsive</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      // Should render table directly without wrapper
      const table = container.querySelector("table");
      expect(table?.parentElement?.tagName).not.toBe("DIV");
    });
  });

  describe("Sticky Header", () => {
    it("enables sticky header", () => {
      render(
        <Table stickyHeader>
          <TableHeader>
            <TableRow>
              <TableCell header>Sticky Header</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Sticky Header")).toBeInTheDocument();
    });

    it("disables sticky header by default", () => {
      render(
        <Table stickyHeader={false}>
          <TableHeader>
            <TableRow>
              <TableCell header>Normal Header</TableCell>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      expect(screen.getByText("Normal Header")).toBeInTheDocument();
    });
  });

  describe("Complex Table Structures", () => {
    it("renders table with all sections", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>Item</TableCell>
              <TableCell header>Price</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Item 1</TableCell>
              <TableCell>$10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Item 2</TableCell>
              <TableCell>$20</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>$30</TableCell>
            </TableRow>
          </TableFooter>
        </Table>,
      );

      expect(screen.getByText("Item")).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Total")).toBeInTheDocument();
    });

    it("handles nested content in cells", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <div>
                  <strong>Bold Text</strong>
                  <span>Regular Text</span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Bold Text")).toBeInTheDocument();
      expect(screen.getByText("Regular Text")).toBeInTheDocument();
    });

    it("handles empty cells", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Filled</TableCell>
              <TableCell>{""}</TableCell>
              <TableCell>Also Filled</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Filled")).toBeInTheDocument();
      expect(screen.getByText("Also Filled")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA roles", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>Header</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("row")).toHaveLength(2);
      expect(screen.getByRole("columnheader")).toBeInTheDocument();
      expect(screen.getByRole("cell")).toBeInTheDocument();
    });

    it("supports screen readers with semantic HTML", () => {
      const { container } = render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>Name</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(container.querySelector("table")).toBeInTheDocument();
      expect(container.querySelector("thead")).toBeInTheDocument();
      expect(container.querySelector("tbody")).toBeInTheDocument();
      expect(container.querySelector("th")).toBeInTheDocument();
      expect(container.querySelector("td")).toBeInTheDocument();
    });

    it("maintains focus visibility", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Table>
          <TableBody>
            <TableRow onClick={handleClick}>
              <TableCell>Focusable Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const row = screen.getByText("Focusable Row").closest("tr");
      await user.tab();

      expect(document.activeElement).toBe(row);
    });
  });

  describe("Integration Scenarios", () => {
    it("works with pagination controls", () => {
      render(
        <div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Page 1 Data</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div>
            <button type="button">Previous</button>
            <span>Page 1 of 5</span>
            <button type="button">Next</button>
          </div>
        </div>,
      );

      expect(screen.getByText("Page 1 Data")).toBeInTheDocument();
      expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
    });

    it("works with filtering and search", () => {
      render(
        <div>
          <input type="text" placeholder="Search..." />
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Filtered Data</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>,
      );

      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
      expect(screen.getByText("Filtered Data")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("renders empty table", () => {
      render(
        <Table>
          <TableBody>{""}</TableBody>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("renders table with only header", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>Header Only</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{""}</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Header Only")).toBeInTheDocument();
    });

    it("renders table with only footer", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{""}</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Footer Only</TableCell>
            </TableRow>
          </TableFooter>
        </Table>,
      );

      expect(screen.getByText("Footer Only")).toBeInTheDocument();
    });

    it("handles single cell table", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Single Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Single Cell")).toBeInTheDocument();
    });

    it("handles very long cell content", () => {
      const longText = "This is a very long text ".repeat(20);

      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{longText}</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });
});
