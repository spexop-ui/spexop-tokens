# Grid Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A powerful CSS Grid-based layout component for creating responsive, flexible grid layouts. One of the 5 core grid primitives in the Spexop design system.

## Features

- ✅ 12-column grid system
- ✅ Auto-fit responsive layouts
- ✅ Configurable gap spacing
- ✅ Minimum column width control
- ✅ Design token integration
- ✅ TypeScript support
- ✅ Works seamlessly with GridItem

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Grid, GridItem } from '@spexop/react';

function App() {
  return (
    <Grid columns={3} gap={6}>
      <GridItem span={1}>Column 1</GridItem>
      <GridItem span={1}>Column 2</GridItem>
      <GridItem span={1}>Column 3</GridItem>
    </Grid>
  );
}
```

## Column Configurations

### Fixed Columns

```tsx
{/* 2-column grid */}
<Grid columns={2} gap={4}>
  <GridItem>Col 1</GridItem>
  <GridItem>Col 2</GridItem>
</Grid>

{/* 3-column grid */}
<Grid columns={3} gap={6}>
  <GridItem>Col 1</GridItem>
  <GridItem>Col 2</GridItem>
  <GridItem>Col 3</GridItem>
</Grid>

{/* 4-column grid */}
<Grid columns={4} gap={6}>
  <GridItem>Col 1</GridItem>
  <GridItem>Col 2</GridItem>
  <GridItem>Col 3</GridItem>
  <GridItem>Col 4</GridItem>
</Grid>

{/* 12-column grid (default) */}
<Grid columns={12} gap={6}>
  <GridItem span={3}>25%</GridItem>
  <GridItem span={6}>50%</GridItem>
  <GridItem span={3}>25%</GridItem>
</Grid>
```

### Auto-Fit Responsive

Automatically fits as many columns as possible based on minimum width.

```tsx
<Grid columns="auto-fit" minColumnWidth="250px" gap={6}>
  <GridItem>Auto 1</GridItem>
  <GridItem>Auto 2</GridItem>
  <GridItem>Auto 3</GridItem>
  <GridItem>Auto 4</GridItem>
</Grid>
```

## Gap Spacing

Uses spacing tokens for consistent gaps.

```tsx
{/* No gap */}
<Grid columns={3} gap={0}>...</Grid>

{/* Small gap (16px) */}
<Grid columns={3} gap={4}>...</Grid>

{/* Default gap (24px) */}
<Grid columns={3} gap={6}>...</Grid>

{/* Large gap (32px) */}
<Grid columns={3} gap={8}>...</Grid>
```

## Common Layouts

### Two-Column Sidebar

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={3}>
    {/* Sidebar */}
  </GridItem>
  <GridItem span={9}>
    {/* Main content */}
  </GridItem>
</Grid>
```

### Three-Column Equal

```tsx
<Grid columns={3} gap={6}>
  <GridItem><Card>Card 1</Card></GridItem>
  <GridItem><Card>Card 2</Card></GridItem>
  <GridItem><Card>Card 3</Card></GridItem>
</Grid>
```

### Responsive Card Grid

```tsx
<Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
  {products.map(product => (
    <GridItem key={product.id}>
      <ProductCard {...product} />
    </GridItem>
  ))}
</Grid>
```

### Dashboard Layout

```tsx
<Grid columns={12} gap={6}>
  {/* Full-width header */}
  <GridItem span={12}>
    <DashboardCard title="Overview" />
  </GridItem>
  
  {/* Two 50% cards */}
  <GridItem span={6}>
    <StatsCard title="Revenue" />
  </GridItem>
  <GridItem span={6}>
    <StatsCard title="Users" />
  </GridItem>
  
  {/* Three 33% cards */}
  <GridItem span={4}>
    <Card>Analytics</Card>
  </GridItem>
  <GridItem span={4}>
    <Card>Reports</Card>
  </GridItem>
  <GridItem span={4}>
    <Card>Settings</Card>
  </GridItem>
</Grid>
```

## Nested Grids

```tsx
<Grid columns={2} gap={8}>
  <GridItem>
    <Grid columns={2} gap={4}>
      <GridItem>Nested 1</GridItem>
      <GridItem>Nested 2</GridItem>
    </Grid>
  </GridItem>
  <GridItem>
    Content
  </GridItem>
</Grid>
```

## Props

```typescript
interface GridProps {
  children: React.ReactNode;
  columns?: number | "auto-fit";
  gap?: number;
  minColumnWidth?: string;
  className?: string;
  style?: React.CSSProperties;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Core layout primitive for grid systems
2. **Tokens before magic numbers** - Uses spacing tokens for gaps
3. **Composition before complexity** - Works with GridItem for flexible layouts
4. **Standards before frameworks** - Pure CSS Grid implementation

## Accessibility

- Semantic HTML (div element)
- Maintains logical document order
- Works with screen readers
- Keyboard navigation preserved

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `GridItem` - Grid cell with span control
- `Container` - Width-constrained wrapper
- `Stack` - Vertical/horizontal stacking
- `Spacer` - Flexible spacing

## License

MIT
