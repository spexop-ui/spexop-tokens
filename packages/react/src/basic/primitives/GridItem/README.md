# GridItem Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A grid cell component that works with the Grid component to create flexible, responsive layouts. Controls how many columns an item should span.

## Features

- ✅ Column span control (1-12)
- ✅ Responsive span values
- ✅ Auto-placement support
- ✅ Works seamlessly with Grid
- ✅ Design token integration
- ✅ TypeScript support

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
    <Grid columns={12} gap={6}>
      <GridItem span={4}>
        25% width (4/12 columns)
      </GridItem>
      <GridItem span={8}>
        75% width (8/12 columns)
      </GridItem>
    </Grid>
  );
}
```

## Column Spans

### Single Column

```tsx
<Grid columns={3} gap={4}>
  <GridItem span={1}>33%</GridItem>
  <GridItem span={1}>33%</GridItem>
  <GridItem span={1}>33%</GridItem>
</Grid>
```

### Multiple Columns

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={3}>25%</GridItem>
  <GridItem span={6}>50%</GridItem>
  <GridItem span={3}>25%</GridItem>
</Grid>
```

### Full Width

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={12}>
    Full width header
  </GridItem>
  <GridItem span={6}>Left column</GridItem>
  <GridItem span={6}>Right column</GridItem>
</Grid>
```

### Auto-Span (Default)

When span is not specified, items take up one column:

```tsx
<Grid columns={4} gap={4}>
  <GridItem>Auto</GridItem>
  <GridItem>Auto</GridItem>
  <GridItem>Auto</GridItem>
  <GridItem>Auto</GridItem>
</Grid>
```

## Common Layouts

### Sidebar Layout

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={3}>
    <aside>Sidebar</aside>
  </GridItem>
  <GridItem span={9}>
    <main>Main Content</main>
  </GridItem>
</Grid>
```

### Card Grid

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={4}>
    <Card>Card 1</Card>
  </GridItem>
  <GridItem span={4}>
    <Card>Card 2</Card>
  </GridItem>
  <GridItem span={4}>
    <Card>Card 3</Card>
  </GridItem>
</Grid>
```

### Dashboard Layout

```tsx
<Grid columns={12} gap={6}>
  {/* Header */}
  <GridItem span={12}>
    <DashboardCard title="Overview" />
  </GridItem>
  
  {/* Stats Row */}
  <GridItem span={3}>
    <StatsCard metric="Users" value="1,234" />
  </GridItem>
  <GridItem span={3}>
    <StatsCard metric="Revenue" value="$5,678" />
  </GridItem>
  <GridItem span={3}>
    <StatsCard metric="Orders" value="890" />
  </GridItem>
  <GridItem span={3}>
    <StatsCard metric="Growth" value="+12%" />
  </GridItem>
  
  {/* Charts Row */}
  <GridItem span={8}>
    <Card>Chart</Card>
  </GridItem>
  <GridItem span={4}>
    <Card>Summary</Card>
  </GridItem>
</Grid>
```

### Asymmetric Layout

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={8}>
    <article>Main article content</article>
  </GridItem>
  <GridItem span={4}>
    <aside>Related links</aside>
  </GridItem>
  
  <GridItem span={5}>
    <Card>Feature 1</Card>
  </GridItem>
  <GridItem span={7}>
    <Card>Feature 2</Card>
  </GridItem>
</Grid>
```

## Responsive Spans

GridItem spans are responsive by default through the Grid's responsive behavior:

```tsx
{/* Mobile: stacks vertically */}
{/* Tablet: 2 columns */}
{/* Desktop: 3 columns */}
<Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
  <GridItem>
    <Card>Responsive Card 1</Card>
  </GridItem>
  <GridItem>
    <Card>Responsive Card 2</Card>
  </GridItem>
  <GridItem>
    <Card>Responsive Card 3</Card>
  </GridItem>
</Grid>
```

## Nested GridItems

```tsx
<Grid columns={12} gap={8}>
  <GridItem span={8}>
    <Grid columns={2} gap={4}>
      <GridItem>Nested 1</GridItem>
      <GridItem>Nested 2</GridItem>
    </Grid>
  </GridItem>
  <GridItem span={4}>
    Sidebar
  </GridItem>
</Grid>
```

## Props

```typescript
interface GridItemProps {
  children: React.ReactNode;
  span?: number;
  className?: string;
  style?: React.CSSProperties;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Core grid cell primitive
2. **Composition before complexity** - Works with Grid for layouts
3. **Standards before frameworks** - Pure CSS Grid implementation

## Accessibility

- Semantic HTML (div element)
- Maintains document flow
- Works with screen readers
- No specific ARIA requirements

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Grid` - Parent grid container
- `Container` - Width-constrained wrapper
- `Stack` - Vertical/horizontal stacking
- `Spacer` - Flexible spacing

## License

MIT
