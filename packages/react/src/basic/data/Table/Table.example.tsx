/**
 * Table Component Examples
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "./Table.js";

/**
 * Basic Table Example
 */
export function BasicTableExample() {
  return (
    <Table variant="bordered" size="md">
      <TableHeader>
        <TableRow>
          <TableCell header>Name</TableCell>
          <TableCell header>Email</TableCell>
          <TableCell header align="right">
            Actions
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell align="right">
            <button type="button">Edit</button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell align="right">
            <button type="button">Edit</button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell align="right">
            <button type="button">Edit</button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

/**
 * Striped Table Example
 */
export function StripedTableExample() {
  return (
    <Table variant="striped" size="md">
      <TableHeader>
        <TableRow>
          <TableCell header>Product</TableCell>
          <TableCell header align="center">
            Quantity
          </TableCell>
          <TableCell header align="right">
            Price
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Product A</TableCell>
          <TableCell align="center">10</TableCell>
          <TableCell align="right">$99.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Product B</TableCell>
          <TableCell align="center">5</TableCell>
          <TableCell align="right">$149.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Product C</TableCell>
          <TableCell align="center">3</TableCell>
          <TableCell align="right">$79.99</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

/**
 * Table with Footer Example
 */
export function TableWithFooterExample() {
  return (
    <Table variant="bordered" size="md">
      <TableHeader>
        <TableRow>
          <TableCell header>Item</TableCell>
          <TableCell header align="center">
            Quantity
          </TableCell>
          <TableCell header align="right">
            Price
          </TableCell>
          <TableCell header align="right">
            Total
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Laptop</TableCell>
          <TableCell align="center">2</TableCell>
          <TableCell align="right">$999.00</TableCell>
          <TableCell align="right">$1,998.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Monitor</TableCell>
          <TableCell align="center">3</TableCell>
          <TableCell align="right">$299.00</TableCell>
          <TableCell align="right">$897.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Keyboard</TableCell>
          <TableCell align="center">5</TableCell>
          <TableCell align="right">$79.00</TableCell>
          <TableCell align="right">$395.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell align="right">$3,290.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

/**
 * Responsive Table Example
 */
export function ResponsiveTableExample() {
  return (
    <Table variant="bordered" size="md" responsive>
      <TableHeader>
        <TableRow>
          <TableCell header>ID</TableCell>
          <TableCell header>Name</TableCell>
          <TableCell header>Email</TableCell>
          <TableCell header>Department</TableCell>
          <TableCell header>Position</TableCell>
          <TableCell header>Location</TableCell>
          <TableCell header>Start Date</TableCell>
          <TableCell header align="right">
            Salary
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Engineering</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>New York</TableCell>
          <TableCell>2020-01-15</TableCell>
          <TableCell align="right">$120,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>Design</TableCell>
          <TableCell>Lead Designer</TableCell>
          <TableCell>San Francisco</TableCell>
          <TableCell>2019-06-20</TableCell>
          <TableCell align="right">$110,000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

/**
 * Sticky Header Table Example
 */
export function StickyHeaderTableExample() {
  const rows = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));

  return (
    <div style={{ height: "400px", overflow: "auto" }}>
      <Table variant="bordered" size="md" stickyHeader>
        <TableHeader>
          <TableRow>
            <TableCell header>ID</TableCell>
            <TableCell header>Name</TableCell>
            <TableCell header>Email</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * Hover Effect Table Example
 */
export function HoverTableExample() {
  return (
    <Table variant="hover" size="md">
      <TableHeader>
        <TableRow>
          <TableCell header>Name</TableCell>
          <TableCell header>Status</TableCell>
          <TableCell header align="right">
            Actions
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Project Alpha</TableCell>
          <TableCell>Active</TableCell>
          <TableCell align="right">
            <button type="button">View</button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Project Beta</TableCell>
          <TableCell>In Progress</TableCell>
          <TableCell align="right">
            <button type="button">View</button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Project Gamma</TableCell>
          <TableCell>Completed</TableCell>
          <TableCell align="right">
            <button type="button">View</button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

/**
 * Compact Table Example
 */
export function CompactTableExample() {
  return (
    <Table variant="compact" size="sm">
      <TableHeader>
        <TableRow>
          <TableCell header>Code</TableCell>
          <TableCell header>Description</TableCell>
          <TableCell header align="right">
            Value
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>A001</TableCell>
          <TableCell>Item Description A</TableCell>
          <TableCell align="right">100</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>B002</TableCell>
          <TableCell>Item Description B</TableCell>
          <TableCell align="right">200</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>C003</TableCell>
          <TableCell>Item Description C</TableCell>
          <TableCell align="right">300</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

/**
 * Minimal Table Example
 */
export function MinimalTableExample() {
  return (
    <Table variant="minimal" size="md">
      <TableHeader>
        <TableRow>
          <TableCell header>Feature</TableCell>
          <TableCell header align="center">
            Basic
          </TableCell>
          <TableCell header align="center">
            Pro
          </TableCell>
          <TableCell header align="center">
            Enterprise
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Users</TableCell>
          <TableCell align="center">5</TableCell>
          <TableCell align="center">25</TableCell>
          <TableCell align="center">Unlimited</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Storage</TableCell>
          <TableCell align="center">10 GB</TableCell>
          <TableCell align="center">100 GB</TableCell>
          <TableCell align="center">1 TB</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Support</TableCell>
          <TableCell align="center">Email</TableCell>
          <TableCell align="center">Priority</TableCell>
          <TableCell align="center">24/7 Dedicated</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
