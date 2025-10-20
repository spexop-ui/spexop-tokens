# Grid System

A modern, fluid-first grid system with container query support and seamless integration with spacing tokens.

## Overview

The grid system consists of five complementary components:

- **Grid** - Main container with multiple layout modes
- **GridItem** - Individual grid items with positioning
- **Stack** - Simple flexbox utility for stacking
- **Container** - Max-width content wrapper
- **Spacer** - Utility for spacing between elements

## Quick Start

```tsx
import { Grid, GridItem, Stack, Container, Spacer } from '@spexop/react';

// 12-column layout grid
<Grid columns={12} gap={6}>
  <GridItem span={{ xs: 12, lg: 3 }}>Sidebar</GridItem>
  <GridItem span={{ xs: 12, lg: 9 }}>Content</GridItem>
</Grid>
```

## Grid Component

### Basic Usage

```tsx
// Default 12-column grid
<Grid gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</Grid>

// Custom column count
<Grid columns={3} gap={6}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

### Auto-responsive Grids

The most powerful feature - grids that automatically adjust based on available space:

```tsx
// Auto-fit: fills with as many items as possible
<Grid columns="auto-fit" minColumnWidth="300px" gap={4}>
  <Card>Product 1</Card>
  <Card>Product 2</Card>
  <Card>Product 3</Card>
</Grid>

// Auto-fill: maintains column count even with empty spaces
<Grid columns="auto-fill" minColumnWidth="250px" gap={4}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Grid>
```

### Fluid Mode

Enable fluid column sizing with `clamp()` for smooth scaling:

```tsx
<Grid 
  columns="auto-fit" 
  minColumnWidth="250px"
  maxColumnWidth="400px"
  fluid
  gap={4}
>
  <Card>Smoothly scales</Card>
  <Card>No breakpoint jumps</Card>
</Grid>
```

### Named Grid Areas

Semantic layouts using named areas:

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
    <Header />
  </GridItem>
  <GridItem area="sidebar">
    <Sidebar />
  </GridItem>
  <GridItem area="content">
    <Main />
  </GridItem>
  <GridItem area="footer">
    <Footer />
  </GridItem>
</Grid>
```

### Container Queries

Progressive enhancement with container queries:

```tsx
<Grid container columns="auto-fit" minColumnWidth="300px" gap={4}>
  {/* Grid responds to container size, not viewport */}
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Grid>
```

### Responsive Columns

```tsx
<Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>
```

### Alignment and Distribution

Control how grid columns are distributed and how items align within rows:

```tsx
// Center a 6-column grid within a wider container
<Grid columns={6} gap={4} justify="center">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
  <Card>Item 5</Card>
  <Card>Item 6</Card>
</Grid>

// Distribute columns with space between
<Grid columns={4} gap={4} justify="space-between">
  <Card>Left</Card>
  <Card>Center Left</Card>
  <Card>Center Right</Card>
  <Card>Right</Card>
</Grid>

// Vertical alignment (useful when items have different heights)
<Grid columns={3} gap={4} align="center">
  <div style={{ height: '80px' }}>Short</div>
  <div style={{ height: '120px' }}>Tall</div>
  <div style={{ height: '100px' }}>Medium</div>
</Grid>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `number \| ResponsiveProp<number> \| "auto-fit" \| "auto-fill"` | `12` | Number of columns or auto mode |
| `gap` | `ResponsiveProp<0-10>` | `4` | Gap between all items |
| `rowGap` | `ResponsiveProp<0-10>` | - | Gap between rows |
| `columnGap` | `ResponsiveProp<0-10>` | - | Gap between columns |
| `areas` | `string[]` | - | Named grid areas |
| `fluid` | `boolean` | `false` | Enable fluid sizing |
| `minColumnWidth` | `string` | `"250px"` | Min width for auto grids |
| `maxColumnWidth` | `string` | `"400px"` | Max width for fluid grids |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | Vertical alignment of items within rows |
| `justify` | `"start" \| "center" \| "end" \| "space-between" \| "space-around" \| "space-evenly"` | `"start"` | Horizontal distribution of grid columns (use "center" to center grid, "space-between" to distribute) |
| `container` | `boolean` | `false` | Enable container queries |
| `subgrid` | `boolean` | `false` | Use CSS subgrid |

## When to Use GridItem vs Direct Children

Following the **primitives-first philosophy** of using the simplest approach:

### Direct Children (No GridItem Wrapper)

Use plain elements when items flow naturally into the grid (no spanning or positioning needed):

```tsx
// ✅ Simple: Direct children for natural flow
<Grid columns={3} gap={6}>
  <Card>Product 1</Card>
  <Card>Product 2</Card>
  <Card>Product 3</Card>
</Grid>

// ✅ Simple: Auto-fit grid with direct children
<Grid columns="auto-fit" minColumnWidth="300px" gap={4}>
  <Card>Feature 1</Card>
  <Card>Feature 2</Card>
</Grid>
```

### GridItem Wrapper (Precise Control)

Wrap in GridItem when you need **positioning or spanning**:

```tsx
// ✅ Precise: Need column spanning
<Grid columns={12} gap={6}>
  <GridItem span={{ xs: 12, lg: 8 }}>
    <Card>Main content (8 cols on desktop)</Card>
  </GridItem>
  <GridItem span={{ xs: 12, lg: 4 }}>
    <Card>Sidebar (4 cols on desktop)</Card>
  </GridItem>
</Grid>

// ✅ Precise: Need specific positioning
<Grid columns={12} gap={4}>
  <GridItem start={1} end={4}>Columns 1-3</GridItem>
  <GridItem start={7} end={13}>Columns 7-12</GridItem>
</Grid>

// ✅ Precise: Named grid areas
<Grid areas={["header header", "sidebar content"]} gap={4}>
  <GridItem area="header">Header</GridItem>
  <GridItem area="sidebar">Sidebar</GridItem>
  <GridItem area="content">Content</GridItem>
</Grid>
```

**Principle**: Don't over-engineer. Use GridItem only when you need its features (spanning, positioning, areas). For simple grids where items flow naturally, direct children are simpler and cleaner.

## GridItem Component

### Basic Usage of GridItem Component

```tsx
<Grid columns={12} gap={4}>
  <GridItem span={3}>Sidebar (3 cols)</GridItem>
  <GridItem span={9}>Content (9 cols)</GridItem>
</Grid>
```

### Responsive Spanning

```tsx
<Grid columns={12} gap={4}>
  <GridItem span={{ xs: 12, md: 6, lg: 4 }}>
    Full width on mobile, half on tablet, third on desktop
  </GridItem>
</Grid>
```

### Precise Positioning

```tsx
<Grid columns={12} gap={4}>
  <GridItem start={1} end={4}>Columns 1-3</GridItem>
  <GridItem start={7} end={13}>Columns 7-12</GridItem>
</Grid>
```

### Row Spanning

```tsx
<Grid columns={3} gap={4}>
  <GridItem span={1} rowSpan={2}>Tall item</GridItem>
  <GridItem>Regular</GridItem>
  <GridItem>Regular</GridItem>
</Grid>
```

### Props of GridItem Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `span` | `ResponsiveProp<number>` | `1` | Column span (1-24) |
| `start` | `ResponsiveProp<number>` | - | Column start position |
| `end` | `ResponsiveProp<number>` | - | Column end position |
| `row` | `ResponsiveProp<number>` | - | Row position |
| `rowSpan` | `ResponsiveProp<number>` | - | Row span |
| `area` | `string` | - | Named grid area |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | Vertical alignment |
| `justify` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | Horizontal alignment |

## Stack Component

Simple flexbox utility for common stacking patterns.

### Vertical Stack

```tsx
<Stack direction="vertical" gap={4}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Stack>
```

### Horizontal Stack

```tsx
<Stack direction="horizontal" gap={2} wrap>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
  <Button>Action 3</Button>
</Stack>
```

### Responsive Direction

```tsx
<Stack direction={{ xs: "vertical", md: "horizontal" }} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

### Props of Stack Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `ResponsiveProp<"vertical" \| "horizontal">` | `"vertical"` | Stack direction |
| `gap` | `ResponsiveProp<0-10>` | `4` | Gap between items |
| `align` | `"start" \| "center" \| "end" \| "stretch" \| "baseline"` | `"stretch"` | Cross-axis alignment |
| `justify` | `"start" \| "center" \| "end" \| "space-between" \| "space-around" \| "space-evenly"` | `"start"` | Main-axis distribution |
| `wrap` | `boolean` | `false` | Enable wrapping |

## Container Component

Max-width content wrapper with responsive padding.

**Recent Change** (Oct 2025): Container max-widths now use design tokens for consistency.  
⚠️ **Breaking**: `maxWidth="xl"` changed from 1536px to 1440px (uses `sBreakpoint2xl` token).

### Basic Usage of Container Component

```tsx
<Container maxWidth="lg" padding={6}>
  <h1>Page Content</h1>
  <p>This content is constrained to a max-width</p>
</Container>
```

### Fluid Container

```tsx
<Container fluid padding={4}>
  <div>Full-width content</div>
</Container>
```

### Responsive Max-Width

```tsx
<Container maxWidth={{ xs: "full", md: "lg", xl: "xl" }} padding={6}>
  <div>Responsive container</div>
</Container>
```

### Props of Container Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `ResponsiveProp<"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "full">` | `"xl"` | Maximum width |
| `padding` | `ResponsiveProp<0-10>` | `4` | Padding around content |
| `paddingLeft` | `ResponsiveProp<0-10>` | - | Left padding override |
| `paddingRight` | `ResponsiveProp<0-10>` | - | Right padding override |
| `paddingTop` | `ResponsiveProp<0-10>` | - | Top padding override |
| `paddingBottom` | `ResponsiveProp<0-10>` | - | Bottom padding override |
| `centered` | `boolean` | `true` | Center horizontally |
| `fluid` | `boolean` | `false` | No max-width constraints |

**Max-Width Values** (token-based):

- `xs`: 640px (sBreakpointSm)
- `sm`: 768px (sBreakpointMd)
- `md`: 1024px (sBreakpointLg)
- `lg`: 1280px (sBreakpointXl)
- `xl`: 1440px (sBreakpoint2xl) ⚠️ Changed from 1536px
- `2xl`: 1920px
- `full`: No max-width

## Spacer Component

Utility for adding space between elements.

### Basic Usage of Spacer Component

```tsx
<div>
  <h1>Title</h1>
  <Spacer size={4} direction="vertical" />
  <p>Content</p>
</div>
```

### Horizontal Spacing

```tsx
<div style={{ display: 'flex' }}>
  <Button>Left</Button>
  <Spacer size={2} direction="horizontal" />
  <Button>Right</Button>
</div>
```

### Responsive Spacing

```tsx
<Spacer size={{ xs: 2, md: 4, lg: 6 }} direction="vertical" />
```

### Props of Spacer Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `ResponsiveProp<0-10>` | `4` | Size of spacing |
| `direction` | `"vertical" \| "horizontal"` | `"vertical"` | Direction of spacing |

## Common Patterns

### Page Layout

```tsx
<Container maxWidth="xl" padding={6}>
  <Grid columns={12} gap={6}>
    <GridItem span={{ xs: 12, lg: 3 }}>
      <Sidebar />
    </GridItem>
    <GridItem span={{ xs: 12, lg: 9 }}>
      <Stack direction="vertical" gap={6}>
        <Article />
        <Comments />
      </Stack>
    </GridItem>
  </Grid>
</Container>
```

### Product Grid

```tsx
<Container maxWidth="2xl" padding={6}>
  <Stack direction="vertical" gap={8}>
    <h1>Products</h1>
    <Grid columns="auto-fit" minColumnWidth="300px" fluid gap={6}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </Grid>
  </Stack>
</Container>
```

### Form Layout

```tsx
<Container maxWidth="md" padding={6}>
  <Grid columns={2} gap={4}>
    <GridItem span={2}>
      <Input label="Full Name" />
    </GridItem>
    <GridItem>
      <Input label="Email" />
    </GridItem>
    <GridItem>
      <Input label="Phone" />
    </GridItem>
    <GridItem span={2}>
      <Button fullWidth>Submit</Button>
    </GridItem>
  </Grid>
</Container>
```

### Documentation Layout

```tsx
<Container maxWidth="2xl" padding={6}>
  <Grid columns={{ xs: 1, lg: 4 }} gap={6}>
    <GridItem span={{ xs: 1, lg: 1 }}>
      <TableOfContents />
    </GridItem>
    <GridItem span={{ xs: 1, lg: 3 }}>
      <Stack direction="vertical" gap={6}>
        <Article />
        <RelatedLinks />
      </Stack>
    </GridItem>
  </Grid>
</Container>
```

## Spacing Scale Reference

The grid system uses spacing tokens (0-10) from the design system:

- `0` - 0px
- `1` - 4px
- `2` - 8px
- `3` - 12px
- `4` - 16px (default)
- `5` - 20px
- `6` - 24px
- `7` - 32px
- `8` - 40px
- `9` - 48px
- `10` - 64px

## Browser Support

- **CSS Grid**: All modern browsers
- **Container Queries**: Chrome 105+, Safari 16+, Firefox 110+ (progressive enhancement)
- **Subgrid**: Chrome 117+, Safari 16+, Firefox 71+ (progressive enhancement)
- **Fallback**: Viewport-based media queries for older browsers

## Best Practices

1. **Use auto-fit/auto-fill for component grids** - Let content dictate layout
2. **Use 12-column grids for page layouts** - Maximum flexibility
3. **Enable fluid mode for smooth scaling** - Avoid breakpoint jumps
4. **Leverage named areas for semantic layouts** - Improve readability
5. **Use direct children when possible** - Only wrap in GridItem when you need spanning/positioning
6. **Use `justify="center"` to center grids** - Simple, no tricks needed (e.g., center 6 items in 12-column space)
7. **Use Stack for simple layouts** - Simpler than Grid when you don't need complex positioning
8. **Wrap sections in Container** - Consistent max-widths across your app
9. **Use responsive props liberally** - Make layouts adapt to screen size

## Contributing

Contributions are welcome! Please see the [contributing guide](../../CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## Author

This project was created by [@olmstedian](https://github.com/olmstedian) and [@spexop](https://github.com/spexop-ui). For more information, please see the [Spexop Design System](https://spexop.com).
