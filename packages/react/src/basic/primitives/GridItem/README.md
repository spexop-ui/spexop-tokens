# GridItem

A flexible grid item component for precise control over placement, spanning, and alignment within Grid layouts.

## Overview

GridItem works with the Grid component to control item placement and sizing. Use it to create sophisticated layouts with precise positioning, responsive spanning, and semantic grid areas.

## Quick Start

```tsx
import { Grid, GridItem } from '@spexop/react';

// Basic spanning
<Grid columns={12} gap={6}>
  <GridItem span={3}>Sidebar</GridItem>
  <GridItem span={9}>Content</GridItem>
</Grid>
```

## Features

- **Column Spanning** - Span 1-24 columns
- **Row Spanning** - Span 1-12 rows
- **Precise Positioning** - start/end for exact placement
- **Named Grid Areas** - Semantic area references
- **Alignment** - Vertical and horizontal alignment
- **Responsive Props** - Breakpoint objects for all properties
- **Overflow Protection** - min-width: 0 prevents content overflow
- **Polymorphic** - Render as any HTML element

## Basic Usage

### Column Spanning

```tsx
<Grid columns={12} gap={4}>
  <GridItem span={12}>
    Full Width
  </GridItem>
  <GridItem span={6}>
    Half Width
  </GridItem>
  <GridItem span={6}>
    Half Width
  </GridItem>
  <GridItem span={4}>
    One Third
  </GridItem>
  <GridItem span={4}>
    One Third
  </GridItem>
  <GridItem span={4}>
    One Third
  </GridItem>
</Grid>
```

### Row Spanning

```tsx
<Grid columns={3} gap={4}>
  <GridItem rowSpan={2}>
    Tall Item
  </GridItem>
  <GridItem>Regular</GridItem>
  <GridItem>Regular</GridItem>
  <GridItem>Regular</GridItem>
  <GridItem>Regular</GridItem>
</Grid>
```

### Responsive Spanning

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={{ xs: 12, md: 6, lg: 4 }}>
    Full on mobile, half on tablet, third on desktop
  </GridItem>
  <GridItem span={{ xs: 12, md: 6, lg: 4 }}>
    Responsive item 2
  </GridItem>
  <GridItem span={{ xs: 12, md: 12, lg: 4 }}>
    Responsive item 3
  </GridItem>
</Grid>
```

## Advanced Usage

### Precise Positioning

Use `start` and `end` for exact column placement:

```tsx
<Grid columns={12} gap={4}>
  <GridItem start={1} end={4}>
    Columns 1-3
  </GridItem>
  <GridItem start={7} end={13}>
    Columns 7-12 (gap at 4-6)
  </GridItem>
</Grid>
```

### Named Grid Areas

Semantic layouts with named areas:

```tsx
<Grid 
  areas={[
    "header header header",
    "sidebar content content",
    "footer footer footer"
  ]} 
  gap={4}
>
  <GridItem area="header">
    Header Content
  </GridItem>
  <GridItem area="sidebar">
    Sidebar Navigation
  </GridItem>
  <GridItem area="content">
    Main Content
  </GridItem>
  <GridItem area="footer">
    Footer
  </GridItem>
</Grid>
```

### Row Positioning

Control exact row placement:

```tsx
<Grid columns={3} gap={4}>
  <GridItem row={1}>Row 1</GridItem>
  <GridItem row={2}>Row 2</GridItem>
  <GridItem rowStart={1} rowEnd={3}>
    Spans rows 1-2
  </GridItem>
</Grid>
```

### Alignment

Control vertical and horizontal alignment within grid cell:

```tsx
<Grid columns={3} gap={4} style={{ minHeight: "200px" }}>
  <GridItem align="start">
    Top aligned
  </GridItem>
  <GridItem align="center">
    Center aligned
  </GridItem>
  <GridItem align="end">
    Bottom aligned
  </GridItem>
</Grid>

<Grid columns={3} gap={4}>
  <GridItem justify="start">
    Left aligned
  </GridItem>
  <GridItem justify="center">
    Center aligned
  </GridItem>
  <GridItem justify="end">
    Right aligned
  </GridItem>
</Grid>
```

## Common Patterns

### Sidebar Layout

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={{ xs: 12, lg: 3 }}>
    <Sidebar />
  </GridItem>
  <GridItem span={{ xs: 12, lg: 9 }}>
    <MainContent />
  </GridItem>
</Grid>
```

### Dashboard Layout

```tsx
<Grid columns={12} gap={4}>
  <GridItem span={12}>
    <Header />
  </GridItem>
  <GridItem span={3} rowSpan={2}>
    <Navigation />
  </GridItem>
  <GridItem span={3}>
    <StatCard label="Users" value="1,234" />
  </GridItem>
  <GridItem span={3}>
    <StatCard label="Revenue" value="$45K" />
  </GridItem>
  <GridItem span={3}>
    <StatCard label="Orders" value="567" />
  </GridItem>
  <GridItem span={9}>
    <MainDashboard />
  </GridItem>
</Grid>
```

### Gallery with Featured Image

```tsx
<Grid columns={4} gap={4}>
  <GridItem span={2} rowSpan={2}>
    <img src="featured.jpg" alt="Featured" />
  </GridItem>
  <GridItem>
    <img src="image1.jpg" alt="1" />
  </GridItem>
  <GridItem>
    <img src="image2.jpg" alt="2" />
  </GridItem>
  <GridItem>
    <img src="image3.jpg" alt="3" />
  </GridItem>
  <GridItem>
    <img src="image4.jpg" alt="4" />
  </GridItem>
</Grid>
```

### Form Layout

```tsx
<Grid columns={2} gap={4}>
  <GridItem span={2}>
    <TextInput label="Full Name" fullWidth />
  </GridItem>
  <GridItem>
    <TextInput label="Email" fullWidth />
  </GridItem>
  <GridItem>
    <TextInput label="Phone" fullWidth />
  </GridItem>
  <GridItem span={2}>
    <Button fullWidth>Submit</Button>
  </GridItem>
</Grid>
```

### Asymmetric Layout

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={7}>
    <PrimaryContent />
  </GridItem>
  <GridItem span={5}>
    <SecondaryContent />
  </GridItem>
  <GridItem span={5}>
    <SecondaryContent />
  </GridItem>
  <GridItem span={7}>
    <PrimaryContent />
  </GridItem>
</Grid>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content (required) |
| `span` | `ResponsiveProp<number>` | `1` | Columns to span (1-24) |
| `start` | `ResponsiveProp<number>` | - | Column start position |
| `end` | `ResponsiveProp<number>` | - | Column end position |
| `row` | `ResponsiveProp<number>` | - | Row position |
| `rowSpan` | `ResponsiveProp<number>` | - | Rows to span (1-12) |
| `rowStart` | `ResponsiveProp<number>` | - | Row start position |
| `rowEnd` | `ResponsiveProp<number>` | - | Row end position |
| `area` | `string` | - | Named grid area |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | Vertical alignment |
| `justify` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | Horizontal alignment |
| `className` | `string` | - | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles |
| `as` | `ElementType` | `"div"` | HTML element type |

## Responsive Props

All positioning and spanning props support responsive objects:

```tsx
<GridItem 
  span={{ xs: 12, sm: 6, md: 4, lg: 3 }}
  rowSpan={{ xs: 1, md: 2 }}
  align={{ xs: "start", lg: "center" }}
>
  Content
</GridItem>
```

**Breakpoints:**

- `xs`: 480px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1440px

## Best Practices

### DO

✅ **Use responsive spanning** for mobile-first layouts

```tsx
<GridItem span={{ xs: 12, lg: 3 }}>
  Mobile full-width, desktop sidebar
</GridItem>
```

✅ **Use named areas** for semantic layouts

```tsx
<GridItem area="header">
  Readable and maintainable
</GridItem>
```

✅ **Combine span and rowSpan** for masonry layouts

```tsx
<GridItem span={2} rowSpan={2}>
  Featured content
</GridItem>
```

✅ **Use polymorphic as prop** for semantic HTML

```tsx
<GridItem as="article" span={8}>
  Semantic article element
</GridItem>
```

### DON'T

❌ **Don't use span > 12 without 12+ column grid**

```tsx
// Bad: Grid only has 6 columns
<Grid columns={6}>
  <GridItem span={12}>Won't fit!</GridItem>
</Grid>
```

❌ **Don't mix area with span/start/end**

```tsx
// Bad: area takes precedence
<GridItem area="header" span={6}>
  Confusing!
</GridItem>
```

❌ **Don't forget overflow protection for long content**

```tsx
// GridItem already handles this with min-width: 0
// But be aware of content that might need max-width
```

## Accessibility

### Semantic HTML

Use the `as` prop for semantic markup:

```tsx
<Grid columns={12} gap={6}>
  <GridItem as="header" span={12}>
    Page Header
  </GridItem>
  <GridItem as="aside" span={3}>
    Sidebar Navigation
  </GridItem>
  <GridItem as="main" span={9}>
    Main Content
  </GridItem>
  <GridItem as="footer" span={12}>
    Page Footer
  </GridItem>
</Grid>
```

### Landmarks

Combine with ARIA landmarks:

```tsx
<GridItem as="nav" span={3} aria-label="Main navigation">
  Navigation Menu
</GridItem>
```

## Technical Details

### Overflow Protection

GridItem includes `min-width: 0` to prevent content from breaking the grid:

```css
.gridItem {
  min-width: 0; /* Allows grid items to shrink below content size */
  max-width: 100%;
  overflow-x: hidden;
}
```

This prevents issues with long words, code blocks, or images that might otherwise overflow.

### Alignment vs Grid Alignment

- **Grid alignment** - Controls ALL items in the grid
- **GridItem alignment** - Controls individual item alignment

```tsx
// Grid-level alignment (affects all items)
<Grid align="center">
  <GridItem>Centered by Grid</GridItem>
</Grid>

// Item-level alignment (overrides grid alignment)
<Grid align="center">
  <GridItem align="start">Start-aligned item</GridItem>
  <GridItem>Centered item</GridItem>
</Grid>
```

### Spanning Logic

**Column Spanning:**

- `span={6}` - Occupies 6 columns
- `start={1} end={7}` - Also occupies columns 1-6 (same result)
- `span` is simpler, `start/end` is for precise control

**Row Spanning:**

- `rowSpan={2}` - Occupies 2 rows
- `rowStart={1} rowEnd={3}` - Also occupies rows 1-2

## Integration with Other Components

### With Card Components

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={{ xs: 12, md: 6, lg: 4 }}>
    <Card>
      <CardHeader title="Card 1" />
      <CardBody>Content</CardBody>
    </Card>
  </GridItem>
  <GridItem span={{ xs: 12, md: 6, lg: 4 }}>
    <Card>
      <CardHeader title="Card 2" />
      <CardBody>Content</CardBody>
    </Card>
  </GridItem>
</Grid>
```

### With Container

```tsx
<Container maxWidth="2xl" padding={6}>
  <Grid columns={12} gap={6}>
    <GridItem span={{ xs: 12, lg: 3 }}>
      Sidebar
    </GridItem>
    <GridItem span={{ xs: 12, lg: 9 }}>
      Content
    </GridItem>
  </Grid>
</Container>
```

## Browser Support

- **CSS Grid**: All modern browsers
- **grid-column/grid-row**: All modern browsers
- **grid-area**: All modern browsers
- **Subgrid**: Chrome 117+, Safari 16+, Firefox 71+ (not used by GridItem directly)

## TypeScript

```typescript
interface GridItemProps {
  children: ReactNode;
  span?: ResponsiveProp<number>;
  start?: ResponsiveProp<number>;
  end?: ResponsiveProp<number>;
  row?: ResponsiveProp<number>;
  rowSpan?: ResponsiveProp<number>;
  rowStart?: ResponsiveProp<number>;
  rowEnd?: ResponsiveProp<number>;
  area?: string;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "stretch";
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}
```

## Examples

See **Storybook** for 17 interactive examples:

- Column spanning variations
- Row spanning patterns
- Responsive layouts
- Dashboard patterns
- Gallery layouts
- Form layouts
- Magazine-style grids

## Related Components

- **Grid** - Container for GridItem
- **Stack** - Simple flexbox alternative
- **Container** - Max-width wrapper
- **Spacer** - Spacing utility

## See Also

- [Grid Component](../Grid/README.md)
- [Grid Primitives Guide](/docs/grid-primitives.md)
- [Responsive Patterns](/docs/responsive-patterns.md)

## Contributing

Contributions are welcome! Please see the [contributing guide](../../CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## Author

This project was created by [@olmstedian](https://github.com/olmstedian) and [@spexop](https://github.com/spexop-ui). For more information, please see the [Spexop Design System](https://spexop.com).
