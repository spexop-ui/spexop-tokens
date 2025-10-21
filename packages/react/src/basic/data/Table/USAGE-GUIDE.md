# Table Usage Guide

Complete guide for using the Table primitives from @spexop/react

## Table of Contents

- [Quick Start](#quick-start)
- [Composing Tables](#composing-tables)
- [Layout Strategies](#layout-strategies)
- [Styling Patterns](#styling-patterns)
- [Responsive Design](#responsive-design)
- [Sticky Headers](#sticky-headers)
- [Clickable Rows](#clickable-rows)
- [Custom Cell Content](#custom-cell-content)
- [Common Patterns](#common-patterns)
- [Integration with DataTable](#integration-with-datatable)
- [Performance Tips](#performance-tips)
- [Accessibility](#accessibility)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)

## Quick Start

### Installation

```bash
npm install @spexop/react @spexop/theme
```

### Basic Table

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@spexop/react';

function BasicTable() {
  return (
    <Table variant="bordered" size="md">
      <TableHeader>
        <TableRow>
          <TableCell header>Name</TableCell>
          <TableCell header>Email</TableCell>
          <TableCell header align="right">Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell align="right">
            <button>Edit</button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

## Composing Tables

### The Five Primitives

Table is built from five composable primitives:

1. **Table** - Main container
2. **TableHeader** - Header section (thead)
3. **TableBody** - Body section (tbody)
4. **TableFooter** - Footer section (tfoot)
5. **TableRow** - Row container (tr)
6. **TableCell** - Cell content (td/th)

### Full Table Structure

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableCell header>Header 1</TableCell>
      <TableCell header>Header 2</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data 1</TableCell>
      <TableCell>Data 2</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Footer 1</TableCell>
      <TableCell>Footer 2</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

### Minimal Table

```tsx
<Table>
  <TableBody>
    <TableRow>
      <TableCell>Simple Cell</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Layout Strategies

### Auto Layout (Default)

Automatically sizes columns based on content:

```tsx
<Table layout="auto">
  <TableBody>
    <TableRow>
      <TableCell>Short</TableCell>
      <TableCell>Much Longer Content Here</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Fixed Layout

All columns have equal width:

```tsx
<Table layout="fixed">
  <TableBody>
    <TableRow>
      <TableCell>Equal</TableCell>
      <TableCell>Width</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Mixed Layout

Combine fixed widths with auto layout:

```tsx
<Table layout="auto">
  <TableHeader>
    <TableRow>
      <TableCell header width="100px">ID</TableCell>
      <TableCell header>Name</TableCell>
      <TableCell header width="200px">Actions</TableCell>
    </TableRow>
  </TableHeader>
</Table>
```

### Full Width Control

```tsx
// Full width (default)
<Table fullWidth>
  {/* content */}
</Table>

// Auto width
<Table fullWidth={false}>
  {/* content */}
</Table>
```

## Styling Patterns

### Variants

#### Default

```tsx
<Table variant="default">
  {/* Clean 2px borders */}
</Table>
```

#### Bordered

```tsx
<Table variant="bordered">
  {/* All cells with borders */}
</Table>
```

#### Striped

```tsx
<Table variant="striped">
  {/* Alternating row backgrounds */}
</Table>
```

#### Hover

```tsx
<Table variant="hover">
  {/* Row hover effects */}
</Table>
```

#### Minimal

```tsx
<Table variant="minimal">
  {/* Ultra clean, minimal borders */}
</Table>
```

#### Compact

```tsx
<Table variant="compact">
  {/* Reduced spacing for dense data */}
</Table>
```

### Sizes

#### Small

```tsx
<Table size="sm">
  {/* Tight padding, 12px font */}
</Table>
```

#### Medium (Default)

```tsx
<Table size="md">
  {/* Balanced padding, 14px font */}
</Table>
```

#### Large

```tsx
<Table size="lg">
  {/* Generous padding, 16px font */}
</Table>
```

### Custom Styling

```tsx
<Table className="custom-table">
  <TableHeader className="custom-header">
    <TableRow className="custom-row">
      <TableCell header className="custom-cell">
        Header
      </TableCell>
    </TableRow>
  </TableHeader>
</Table>
```

## Responsive Design

### Responsive Scrolling

Enable horizontal scrolling on narrow viewports:

```tsx
<Table responsive>
  <TableHeader>
    <TableRow>
      <TableCell header>ID</TableCell>
      <TableCell header>Name</TableCell>
      <TableCell header>Email</TableCell>
      <TableCell header>Department</TableCell>
      <TableCell header>Position</TableCell>
      <TableCell header>Location</TableCell>
      <TableCell header>Salary</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* Many columns */}
  </TableBody>
</Table>
```

### Mobile-First Design

```tsx
function ResponsiveTable() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <div>
        {data.map(item => (
          <Card key={item.id}>
            <div><strong>Name:</strong> {item.name}</div>
            <div><strong>Email:</strong> {item.email}</div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Table responsive>
      {/* Desktop table */}
    </Table>
  );
}
```

## Sticky Headers

### Basic Sticky Header

Keep header visible during vertical scroll:

```tsx
<div style={{ height: '400px', overflow: 'auto' }}>
  <Table stickyHeader>
    <TableHeader>
      <TableRow>
        <TableCell header>Name</TableCell>
        <TableCell header>Email</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {/* Many rows */}
    </TableBody>
  </Table>
</div>
```

### Sticky Column

Make first column sticky during horizontal scroll:

```tsx
<Table responsive>
  <TableHeader>
    <TableRow>
      <TableCell
        header
        style={{
          position: 'sticky',
          left: 0,
          background: 'var(--theme-surface-hover)',
          zIndex: 1100,
        }}
      >
        Name
      </TableCell>
      <TableCell header>Email</TableCell>
      {/* More columns */}
    </TableRow>
  </TableHeader>
</Table>
```

## Clickable Rows

### Basic Clickable Row

```tsx
<TableRow onClick={() => handleRowClick(row)}>
  <TableCell>{row.name}</TableCell>
  <TableCell>{row.email}</TableCell>
</TableRow>
```

### Keyboard Navigation

Clickable rows automatically support Enter and Space keys:

```tsx
<TableRow onClick={() => console.log('Clicked')}>
  {/* Supports click, Enter, and Space */}
</TableRow>
```

### Selected State

```tsx
<TableRow
  selected={selectedId === row.id}
  onClick={() => setSelectedId(row.id)}
>
  <TableCell>{row.name}</TableCell>
</TableRow>
```

### Row Actions

```tsx
<TableRow>
  <TableCell>{row.name}</TableCell>
  <TableCell align="right">
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent row click
        handleEdit(row);
      }}
    >
      Edit
    </button>
  </TableCell>
</TableRow>
```

## Custom Cell Content

### Text Alignment

```tsx
<TableRow>
  <TableCell align="left">Left</TableCell>
  <TableCell align="center">Center</TableCell>
  <TableCell align="right">Right</TableCell>
</TableRow>
```

### Nested Components

```tsx
<TableCell>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <Avatar src={user.avatar} />
    <div>
      <div><strong>{user.name}</strong></div>
      <div style={{ fontSize: '12px', color: '#666' }}>
        {user.email}
      </div>
    </div>
  </div>
</TableCell>
```

### Status Badges

```tsx
<TableCell>
  <span
    style={{
      padding: '4px 12px',
      borderRadius: '16px',
      background: status === 'active' ? '#e3f2fd' : '#ffebee',
      color: status === 'active' ? '#1976d2' : '#d32f2f',
      fontWeight: 600,
    }}
  >
    {status}
  </span>
</TableCell>
```

### Action Buttons

```tsx
<TableCell align="right">
  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
    <button onClick={() => handleEdit(row)}>Edit</button>
    <button onClick={() => handleDelete(row)}>Delete</button>
  </div>
</TableCell>
```

### Column and Row Spans

```tsx
<TableRow>
  <TableCell colSpan={2}>Spans 2 columns</TableCell>
  <TableCell rowSpan={2}>Spans 2 rows</TableCell>
</TableRow>
```

## Common Patterns

### Invoice Table

```tsx
<Table variant="bordered">
  <TableHeader>
    <TableRow>
      <TableCell header>Item</TableCell>
      <TableCell header align="center">Qty</TableCell>
      <TableCell header align="right">Price</TableCell>
      <TableCell header align="right">Total</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {items.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell align="center">{item.quantity}</TableCell>
        <TableCell align="right">${item.price.toFixed(2)}</TableCell>
        <TableCell align="right">
          ${(item.quantity * item.price).toFixed(2)}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}><strong>Total</strong></TableCell>
      <TableCell align="right">
        <strong>${total.toFixed(2)}</strong>
      </TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

### Comparison Table

```tsx
<Table variant="bordered" size="lg">
  <TableHeader>
    <TableRow>
      <TableCell header>Feature</TableCell>
      <TableCell header align="center">Basic</TableCell>
      <TableCell header align="center">Pro</TableCell>
      <TableCell header align="center">Enterprise</TableCell>
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
  </TableBody>
</Table>
```

### Status Dashboard

```tsx
<Table variant="hover" size="sm">
  <TableHeader>
    <TableRow>
      <TableCell header>Service</TableCell>
      <TableCell header align="center">Status</TableCell>
      <TableCell header align="right">Uptime</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {services.map(service => (
      <TableRow key={service.id}>
        <TableCell>{service.name}</TableCell>
        <TableCell align="center">
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: service.status === 'up' ? 'green' : 'red',
            display: 'inline-block',
          }} />
        </TableCell>
        <TableCell align="right">{service.uptime}%</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Integration with DataTable

### When to Use Table vs DataTable

**Use Table when:**

- You have simple, static data
- You don't need sorting/filtering/pagination
- You want full control over rendering
- You're building a custom table component

**Use DataTable when:**

- You need sorting, filtering, or pagination
- You have large datasets
- You want built-in features
- You need row selection

### Building on Table Primitives

DataTable is built using Table primitives internally. You can use the same patterns:

```tsx
// DataTable uses Table internally
<DataTable columns={columns} data={data} />

// Equivalent to:
<Table>
  <TableHeader>
    {/* Header from columns */}
  </TableHeader>
  <TableBody>
    {/* Rows from data */}
  </TableBody>
</Table>
```

### Hybrid Approach

```tsx
function HybridTable() {
  return (
    <Table variant="bordered">
      <TableHeader>
        <TableRow>
          <TableCell header>Custom Header</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Map data manually with custom logic */}
        {data.map(row => (
          <TableRow key={row.id}>
            <TableCell>
              {/* Custom cell rendering */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Performance Tips

### Memoize Rows

```tsx
const rows = useMemo(() => data.map(item => (
  <TableRow key={item.id}>
    <TableCell>{item.name}</TableCell>
  </TableRow>
)), [data]);
```

### Virtual Scrolling

For very large tables, use virtual scrolling:

```tsx
import { useVirtual } from 'react-virtual';

function VirtualTable() {
  const parentRef = useRef();
  const rowVirtualizer = useVirtual({
    size: data.length,
    parentRef,
    estimateSize: useCallback(() => 50, []),
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <Table>
        <TableBody>
          {rowVirtualizer.virtualItems.map(virtualRow => {
            const row = data[virtualRow.index];
            return (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
```

### Lazy Loading

```tsx
function LazyTable() {
  const [visibleRows, setVisibleRows] = useState(20);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && visibleRows < data.length) {
      setVisibleRows(prev => Math.min(prev + 20, data.length));
    }
  };

  return (
    <div onScroll={handleScroll} style={{ height: '400px', overflow: 'auto' }}>
      <Table>
        <TableBody>
          {data.slice(0, visibleRows).map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

## Accessibility

### Semantic HTML

Table uses proper semantic HTML:

```tsx
<table>        {/* Table */}
  <thead>      {/* TableHeader */}
    <tr>       {/* TableRow */}
      <th>     {/* TableCell header */}
```

### ARIA Attributes

```tsx
<Table aria-label="User data table">
  <TableHeader>
    <TableRow>
      <TableCell header aria-sort="ascending">
        Name
      </TableCell>
    </TableRow>
  </TableHeader>
</Table>
```

### Keyboard Navigation of Accessibility

All interactive elements are keyboard accessible:

```tsx
<TableRow
  onClick={() => console.log('clicked')}
  // Automatically gets tabIndex={0}
  // Supports Enter and Space keys
>
  <TableCell>Accessible Row</TableCell>
</TableRow>
```

### Screen Reader Support

```tsx
<Table aria-label="Employee list">
  <TableHeader>
    <TableRow>
      <TableCell header>Name</TableCell>
      <TableCell header>Department</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>Engineering</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Focus Management

```tsx
function FocusableTable() {
  const firstCellRef = useRef(null);

  useEffect(() => {
    firstCellRef.current?.focus();
  }, []);

  return (
    <Table>
      <TableBody>
        <TableRow onClick={handleClick}>
          <TableCell ref={firstCellRef}>
            Focusable Content
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

## Best Practices

### 1. Use Semantic Structure

Always include TableHeader for column headers:

```tsx
// Good
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
</Table>

// Bad
<Table>
  <TableBody>
    <TableRow>
      <TableCell>Name</TableCell> {/* Should be header */}
    </TableRow>
    <TableRow>
      <TableCell>John</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### 2. Provide Meaningful Labels

```tsx
<Table aria-label="Employee directory">
  {/* content */}
</Table>
```

### 3. Use Appropriate Variants

- **bordered**: Data-heavy tables
- **striped**: Long lists
- **hover**: Interactive tables
- **minimal**: Dashboard widgets
- **compact**: Dense data

### 4. Align Numbers Right

```tsx
<TableCell align="right">$1,234.56</TableCell>
<TableCell align="right">42</TableCell>
<TableCell align="right">99.9%</TableCell>
```

### 5. Keep Cells Simple

Avoid complex nested structures in cells:

```tsx
// Good
<TableCell>
  <UserBadge user={user} />
</TableCell>

// Bad
<TableCell>
  <div>
    <div>
      <div>
        {/* Too much nesting */}
      </div>
    </div>
  </div>
</TableCell>
```

## Real-World Examples

### Employee Directory

```tsx
function EmployeeDirectory() {
  return (
    <Table variant="striped" size="md">
      <TableHeader>
        <TableRow>
          <TableCell header>Employee</TableCell>
          <TableCell header>Department</TableCell>
          <TableCell header>Location</TableCell>
          <TableCell header align="right">Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map(employee => (
          <TableRow key={employee.id}>
            <TableCell>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={employee.avatar}
                  alt=""
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                <div>
                  <div><strong>{employee.name}</strong></div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {employee.email}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.location}</TableCell>
            <TableCell align="right">
              <button>View Profile</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Order History

```tsx
function OrderHistory() {
  return (
    <Table variant="hover" size="md" responsive>
      <TableHeader>
        <TableRow>
          <TableCell header>Order #</TableCell>
          <TableCell header>Date</TableCell>
          <TableCell header>Status</TableCell>
          <TableCell header align="right">Total</TableCell>
          <TableCell header align="right">Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          <TableRow key={order.id}>
            <TableCell>
              <strong>#{order.id}</strong>
            </TableCell>
            <TableCell>{formatDate(order.date)}</TableCell>
            <TableCell>
              <StatusBadge status={order.status} />
            </TableCell>
            <TableCell align="right">
              <strong>${order.total.toFixed(2)}</strong>
            </TableCell>
            <TableCell align="right">
              <button onClick={() => viewOrder(order)}>
                View Details
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Additional Resources

- [Table README](./README.md)
- [DataTable USAGE-GUIDE](../DataTable/USAGE-GUIDE.md)
- [Component API Reference](./Table.types.ts)
- [Spexop Design System](https://spexop-ui.dev)

## Support

For issues or questions:

- GitHub Issues: [spexop-ui/issues](https://github.com/spexop-ui/spexop-public/issues)
- Documentation: [spexop-ui.dev](https://spexop-ui.dev)
