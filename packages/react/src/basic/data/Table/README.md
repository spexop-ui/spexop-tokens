# Table Component

Border-first table system with comprehensive styling and accessibility.

## Features

- Semantic HTML table structure
- Multiple visual variants (default, bordered, striped, hover, minimal, compact)
- Three size options (sm, md, lg)
- Composable sub-components (TableHeader, TableBody, TableFooter, TableRow, TableCell)
- Responsive scrolling support
- Sticky header option
- Full keyboard navigation
- WCAG AA+ compliant
- TypeScript types included
- CSS modules for styling isolation
- Design tokens throughout

## Installation

```bash
npm install @spexop/react
```

## Basic Usage

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@spexop/react";

function MyTable() {
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
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell align="right">
            <button>Edit</button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

## Variants

### Default

Standard table with 2px borders and clean design.

```tsx
<Table variant="default">
  {/* Table content */}
</Table>
```

### Bordered

All cells with visible borders.

```tsx
<Table variant="bordered">
  {/* Table content */}
</Table>
```

### Striped

Alternating row backgrounds for better readability.

```tsx
<Table variant="striped">
  {/* Table content */}
</Table>
```

### Hover

Row hover effects for interactive tables.

```tsx
<Table variant="hover">
  {/* Table content */}
</Table>
```

### Minimal

Ultra clean with minimal borders.

```tsx
<Table variant="minimal">
  {/* Table content */}
</Table>
```

### Compact

Reduced spacing for dense data.

```tsx
<Table variant="compact">
  {/* Table content */}
</Table>
```

## Sizes

```tsx
{/* Small - tight padding */}
<Table size="sm">{/* content */}</Table>

{/* Medium (default) - balanced padding */}
<Table size="md">{/* content */}</Table>

{/* Large - generous padding */}
<Table size="lg">{/* content */}</Table>
```

## Advanced Features

### Responsive Scrolling

Enable horizontal scrolling on narrow viewports.

```tsx
<Table responsive>
  {/* Table content */}
</Table>
```

### Sticky Header

Keep header visible during vertical scrolling.

```tsx
<Table stickyHeader>
  <TableHeader>
    {/* Header content */}
  </TableHeader>
  <TableBody>
    {/* Body content */}
  </TableBody>
</Table>
```

### Cell Alignment

Control text alignment within cells.

```tsx
<TableRow>
  <TableCell align="left">Left aligned</TableCell>
  <TableCell align="center">Center aligned</TableCell>
  <TableCell align="right">Right aligned</TableCell>
</TableRow>
```

### Column and Row Spans

Merge cells horizontally or vertically.

```tsx
<TableRow>
  <TableCell colSpan={2}>Spans 2 columns</TableCell>
  <TableCell rowSpan={2}>Spans 2 rows</TableCell>
</TableRow>
```

### Fixed Width Columns

Set specific column widths.

```tsx
<TableCell header width="200px">
  Fixed Width Column
</TableCell>
```

### Table Footer

Add totals, summaries, or additional information.

```tsx
<Table>
  <TableHeader>{/* header */}</TableHeader>
  <TableBody>{/* body */}</TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell align="right">$1,234.56</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Composable table parts (Header, Body, Footer, Row, Cell)
2. **Borders before shadows** - Strong 2px borders for separation instead of shadows
3. **Typography before decoration** - Font weight (600/700) for header hierarchy
4. **Tokens before magic numbers** - Design tokens for all spacing, colors, and sizes
5. **Composition before complexity** - Build tables from simple, reusable components
6. **Standards before frameworks** - Semantic HTML table elements
7. **Accessibility before aesthetics** - ARIA attributes and keyboard support

## Accessibility

- Semantic HTML table elements (`<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`)
- ARIA roles for table structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast colors (WCAG AA+ compliant)
- Focus indicators for interactive elements

## API Reference

### Table Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Table content (Header, Body, Footer) |
| `variant` | `TableVariant` | `"default"` | Visual style variant |
| `size` | `TableSize` | `"md"` | Table size |
| `layout` | `"auto" \| "fixed"` | `"auto"` | Table layout mode |
| `fullWidth` | `boolean` | `true` | Full width table |
| `responsive` | `boolean` | `false` | Enable responsive scrolling |
| `stickyHeader` | `boolean` | `false` | Enable sticky header |
| `className` | `string` | `""` | Additional CSS class |
| `aria-label` | `string` | - | ARIA label |

### TableCell Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Cell content |
| `header` | `boolean` | `false` | Header cell (th) vs data cell (td) |
| `align` | `"left" \| "center" \| "right"` | `"left"` | Text alignment |
| `colSpan` | `number` | - | Column span |
| `rowSpan` | `number` | - | Row span |
| `width` | `string` | - | Cell width (CSS value) |
| `className` | `string` | `""` | Additional CSS class |

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT License - Part of the Spexop Design System
