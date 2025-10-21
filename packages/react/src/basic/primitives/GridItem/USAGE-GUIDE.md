# GridItem Component - Comprehensive Usage Guide

Version: 0.2.0
Package: @spexop/react
Status: Production Ready

## Table of Contents

- [Overview](#overview)
- [Core Concepts](#core-concepts)
- [Spanning Techniques](#spanning-techniques)
- [Positioning Patterns](#positioning-patterns)
- [Responsive Strategies](#responsive-strategies)
- [Integration with Grid](#integration-with-grid)
- [Real-World Examples](#real-world-examples)
- [Common Pitfalls](#common-pitfalls)
- [Performance Considerations](#performance-considerations)
- [Accessibility](#accessibility)
- [API Reference](#api-reference)

## Overview

GridItem is a grid cell component that works with Grid to create flexible, responsive layouts. It controls how items are positioned and sized within a grid container.

### When to Use GridItem

- Controlling column span within a Grid
- Positioning items at specific grid locations
- Using named grid areas
- Spanning multiple rows
- Aligning individual items differently from grid default
- Controlling item order visually

### When NOT to Use GridItem

- Outside of a Grid component
- Simple auto-placement layouts (Grid children work fine without GridItem)
- Single-direction layouts (use Stack instead)

## Core Concepts

### Column Spanning

GridItem can span 1-24 columns:

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={3}>25% width (3/12)</GridItem>
  <GridItem span={9}>75% width (9/12)</GridItem>
</Grid>
```

### Row Spanning

GridItem can span multiple rows:

```tsx
<Grid columns={2} gap={6}>
  <GridItem rowSpan={2}>Spans 2 rows</GridItem>
  <GridItem>Row 1</GridItem>
  <GridItem>Row 2</GridItem>
</Grid>
```

### Precise Positioning

Use `start` and `end` for exact placement:

```tsx
<Grid columns={12} gap={6}>
  <GridItem start={3} end={10}>
    Starts at column 3, ends at column 10
  </GridItem>
</Grid>
```

### Named Areas

Reference grid areas defined in Grid:

```tsx
<Grid areas={["header header", "sidebar content"]}>
  <GridItem area="header">Header</GridItem>
  <GridItem area="sidebar">Sidebar</GridItem>
  <GridItem area="content">Content</GridItem>
</Grid>
```

### Alignment

Override grid's default alignment for individual items:

```tsx
<Grid columns={3} gap={6} align="start">
  <GridItem>Default (start)</GridItem>
  <GridItem align="center">Centered</GridItem>
  <GridItem align="end">Bottom-aligned</GridItem>
</Grid>
```

## Spanning Techniques

### Equal Column Spans

```tsx
<Grid columns={12} gap={6}>
  {/* Two equal columns (50% each) */}
  <GridItem span={6}>Left Half</GridItem>
  <GridItem span={6}>Right Half</GridItem>
</Grid>
```

### Unequal Column Spans

```tsx
<Grid columns={12} gap={6}>
  {/* 1/3 and 2/3 split */}
  <GridItem span={4}>1/3 width</GridItem>
  <GridItem span={8}>2/3 width</GridItem>
</Grid>
```

### Three-Column Layout

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={4}>Column 1 (33%)</GridItem>
  <GridItem span={4}>Column 2 (33%)</GridItem>
  <GridItem span={4}>Column 3 (33%)</GridItem>
</Grid>
```

### Four-Column Layout

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={3}>Column 1 (25%)</GridItem>
  <GridItem span={3}>Column 2 (25%)</GridItem>
  <GridItem span={3}>Column 3 (25%)</GridItem>
  <GridItem span={3}>Column 4 (25%)</GridItem>
</Grid>
```

### Full-Width Spans

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={12}>Full-width header</GridItem>
  <GridItem span={6}>Half-width content</GridItem>
  <GridItem span={6}>Half-width content</GridItem>
  <GridItem span={12}>Full-width footer</GridItem>
</Grid>
```

### Multi-Row Spanning

```tsx
<Grid columns={3} gap={6}>
  {/* Tall item spanning 2 rows */}
  <GridItem span={1} rowSpan={2}>
    <Card tall>Sidebar</Card>
  </GridItem>
  
  {/* Regular items */}
  <GridItem span={2}>Top content</GridItem>
  <GridItem span={2}>Bottom content</GridItem>
</Grid>
```

### Complex Row and Column Spans

```tsx
<Grid columns={12} gap={6}>
  {/* Hero spanning 2 rows and 8 columns */}
  <GridItem span={8} rowSpan={2}>
    <Card hero>Hero Content</Card>
  </GridItem>
  
  {/* Side items */}
  <GridItem span={4}>Side Item 1</GridItem>
  <GridItem span={4}>Side Item 2</GridItem>
  
  {/* Bottom row */}
  <GridItem span={4}>Bottom 1</GridItem>
  <GridItem span={4}>Bottom 2</GridItem>
  <GridItem span={4}>Bottom 3</GridItem>
</Grid>
```

## Positioning Patterns

### Start and End Positioning

```tsx
<Grid columns={12} gap={6}>
  {/* Position at columns 3-7 */}
  <GridItem start={3} end={7}>
    Positioned item
  </GridItem>
  
  {/* Position at columns 8-12 */}
  <GridItem start={8} end={12}>
    Another positioned item
  </GridItem>
</Grid>
```

### Row Positioning

```tsx
<Grid columns={3} gap={6}>
  {/* Place in specific row */}
  <GridItem row={2}>
    Appears in row 2
  </GridItem>
  
  {/* Span specific rows */}
  <GridItem rowStart={1} rowEnd={3}>
    Spans rows 1-2
  </GridItem>
</Grid>
```

### Absolute Grid Positioning

```tsx
<Grid columns={12} gap={6}>
  {/* Bottom-right corner */}
  <GridItem start={10} end={13} rowStart={3} rowEnd={4}>
    Bottom-right corner
  </GridItem>
  
  {/* Top-left corner */}
  <GridItem start={1} end={4} rowStart={1} rowEnd={2}>
    Top-left corner
  </GridItem>
</Grid>
```

### Overlapping Items

```tsx
<Grid columns={12} gap={6}>
  {/* Background layer */}
  <GridItem start={1} end={13} rowStart={1} rowEnd={3}>
    <div style={{ background: 'var(--theme-surface-secondary)' }}>
      Background
    </div>
  </GridItem>
  
  {/* Foreground layer */}
  <GridItem start={3} end={11} rowStart={1} rowEnd={2} style={{ zIndex: 1 }}>
    <Card>Foreground content</Card>
  </GridItem>
</Grid>
```

### Gap-Free Positioning

```tsx
<Grid columns={12} gap={0}>
  {/* Items touch without gaps */}
  <GridItem span={6}>
    <div style={{ background: 'var(--theme-primary)' }}>Left</div>
  </GridItem>
  <GridItem span={6}>
    <div style={{ background: 'var(--theme-secondary)' }}>Right</div>
  </GridItem>
</Grid>
```

## Responsive Strategies

### Responsive Column Spans

```tsx
<Grid columns={12} gap={6}>
  <GridItem 
    span={{
      xs: 12,  // Full width on mobile
      md: 6,   // Half width on tablet
      lg: 4    // 1/3 width on desktop
    }}
  >
    Responsive Card
  </GridItem>
</Grid>
```

### Mobile-First Sidebar

```tsx
<Grid columns={12} gap={6}>
  {/* Sidebar: full width on mobile, 1/4 on desktop */}
  <GridItem span={{ xs: 12, lg: 3 }}>
    <aside>Sidebar</aside>
  </GridItem>
  
  {/* Content: full width on mobile, 3/4 on desktop */}
  <GridItem span={{ xs: 12, lg: 9 }}>
    <main>Main Content</main>
  </GridItem>
</Grid>
```

### Responsive Row Spans

```tsx
<Grid columns={{ xs: 1, md: 2 }} gap={6}>
  <GridItem 
    rowSpan={{
      xs: 1,  // Normal height on mobile
      md: 2   // Tall on desktop
    }}
  >
    <Card>Responsive height</Card>
  </GridItem>
  
  <GridItem>Regular card</GridItem>
  <GridItem>Regular card</GridItem>
</Grid>
```

### Responsive Order Change

```tsx
<Grid columns={12} gap={6}>
  {/* Sidebar appears first on mobile, second on desktop */}
  <GridItem 
    span={{ xs: 12, lg: 3 }}
    start={{ xs: 1, lg: 10 }}
  >
    <aside>Sidebar (visual order changes)</aside>
  </GridItem>
  
  <GridItem 
    span={{ xs: 12, lg: 9 }}
    start={{ xs: 1, lg: 1 }}
  >
    <main>Main content</main>
  </GridItem>
</Grid>
```

### Responsive Alignment

```tsx
<Grid columns={3} gap={6}>
  <GridItem 
    align={{
      xs: "start",   // Top-aligned on mobile
      lg: "center"   // Centered on desktop
    }}
  >
    Responsive alignment
  </GridItem>
</Grid>
```

## Integration with Grid

### With Auto-Fit Grids

```tsx
<Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
  {/* GridItem span is ignored with auto-fit */}
  {/* Let auto-fit handle sizing */}
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</Grid>
```

### With Named Areas

```tsx
<Grid 
  areas={[
    "header header header",
    "sidebar content aside",
    "footer footer footer"
  ]}
  gap={6}
>
  <GridItem area="header">
    <header>Header</header>
  </GridItem>
  
  <GridItem area="sidebar">
    <aside>Left Sidebar</aside>
  </GridItem>
  
  <GridItem area="content">
    <main>Main Content</main>
  </GridItem>
  
  <GridItem area="aside">
    <aside>Right Sidebar</aside>
  </GridItem>
  
  <GridItem area="footer">
    <footer>Footer</footer>
  </GridItem>
</Grid>
```

### With Subgrid

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={12}>
    {/* Nested grid inherits parent columns */}
    <Grid subgrid gap={6}>
      <GridItem span={4}>Aligns with parent</GridItem>
      <GridItem span={8}>Aligns with parent</GridItem>
    </Grid>
  </GridItem>
</Grid>
```

### Nested Grids

```tsx
<Grid columns={12} gap={8}>
  <GridItem span={8}>
    {/* New grid context inside GridItem */}
    <Grid columns={2} gap={4}>
      <GridItem span={1}>Nested 1</GridItem>
      <GridItem span={1}>Nested 2</GridItem>
    </Grid>
  </GridItem>
  
  <GridItem span={4}>
    <aside>Sidebar</aside>
  </GridItem>
</Grid>
```

## Real-World Examples

### Magazine Layout

```tsx
function MagazineLayout() {
  return (
    <Grid columns={12} gap={6}>
      {/* Large hero article */}
      <GridItem span={8} rowSpan={2}>
        <Card large>
          <img src="hero.jpg" alt="Hero" />
          <h2>Hero Article Title</h2>
          <p>Hero article content...</p>
        </Card>
      </GridItem>
      
      {/* Side features */}
      <GridItem span={4}>
        <Card>
          <h3>Feature 1</h3>
        </Card>
      </GridItem>
      <GridItem span={4}>
        <Card>
          <h3>Feature 2</h3>
        </Card>
      </GridItem>
      
      {/* Bottom row of articles */}
      <GridItem span={4}>
        <Card>Article 1</Card>
      </GridItem>
      <GridItem span={4}>
        <Card>Article 2</Card>
      </GridItem>
      <GridItem span={4}>
        <Card>Article 3</Card>
      </GridItem>
    </Grid>
  );
}
```

### Dashboard with Varied Card Sizes

```tsx
function Dashboard() {
  return (
    <Grid columns={12} gap={6}>
      {/* Full-width welcome card */}
      <GridItem span={12}>
        <Card>
          <h1>Welcome back, User!</h1>
        </Card>
      </GridItem>
      
      {/* Stats - 4 equal columns */}
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
      
      {/* Large chart with sidebar */}
      <GridItem span={8} rowSpan={2}>
        <Card>
          <h2>Revenue Chart</h2>
          <LineChart />
        </Card>
      </GridItem>
      
      <GridItem span={4}>
        <Card>
          <h3>Top Products</h3>
          <ProductList />
        </Card>
      </GridItem>
      
      <GridItem span={4}>
        <Card>
          <h3>Recent Orders</h3>
          <OrderList />
        </Card>
      </GridItem>
    </Grid>
  );
}
```

### Responsive Form Layout

```tsx
function ContactForm() {
  return (
    <Grid columns={12} gap={6}>
      {/* Full-width fields */}
      <GridItem span={12}>
        <TextInput label="Email" type="email" required />
      </GridItem>
      
      {/* Two-column on desktop, stacked on mobile */}
      <GridItem span={{ xs: 12, md: 6 }}>
        <TextInput label="First Name" required />
      </GridItem>
      <GridItem span={{ xs: 12, md: 6 }}>
        <TextInput label="Last Name" required />
      </GridItem>
      
      {/* Full-width message */}
      <GridItem span={12}>
        <TextArea label="Message" rows={5} required />
      </GridItem>
      
      {/* Buttons aligned right on desktop */}
      <GridItem span={12}>
        <Stack direction="horizontal" gap={3} justify="end">
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary" type="submit">Send Message</Button>
        </Stack>
      </GridItem>
    </Grid>
  );
}
```

### Photo Gallery with Featured Image

```tsx
function PhotoGallery() {
  return (
    <Grid columns={12} gap={4}>
      {/* Featured large image */}
      <GridItem span={{ xs: 12, md: 8 }} rowSpan={{ xs: 1, md: 2 }}>
        <Card>
          <img src="featured.jpg" alt="Featured" style={{ width: '100%' }} />
        </Card>
      </GridItem>
      
      {/* Smaller side images */}
      <GridItem span={{ xs: 6, md: 4 }}>
        <Card>
          <img src="photo1.jpg" alt="Photo 1" style={{ width: '100%' }} />
        </Card>
      </GridItem>
      <GridItem span={{ xs: 6, md: 4 }}>
        <Card>
          <img src="photo2.jpg" alt="Photo 2" style={{ width: '100%' }} />
        </Card>
      </GridItem>
      
      {/* Bottom row */}
      <GridItem span={{ xs: 6, md: 3 }}>
        <Card>
          <img src="photo3.jpg" alt="Photo 3" style={{ width: '100%' }} />
        </Card>
      </GridItem>
      <GridItem span={{ xs: 6, md: 3 }}>
        <Card>
          <img src="photo4.jpg" alt="Photo 4" style={{ width: '100%' }} />
        </Card>
      </GridItem>
      <GridItem span={{ xs: 6, md: 3 }}>
        <Card>
          <img src="photo5.jpg" alt="Photo 5" style={{ width: '100%' }} />
        </Card>
      </GridItem>
      <GridItem span={{ xs: 6, md: 3 }}>
        <Card>
          <img src="photo6.jpg" alt="Photo 6" style={{ width: '100%' }} />
        </Card>
      </GridItem>
    </Grid>
  );
}
```

### Pricing Table

```tsx
function PricingTable() {
  return (
    <Grid columns={12} gap={6}>
      {/* Three pricing tiers */}
      <GridItem span={{ xs: 12, md: 4 }}>
        <Card>
          <h3>Basic</h3>
          <p className="price">$9/mo</p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
          <Button>Choose Plan</Button>
        </Card>
      </GridItem>
      
      <GridItem span={{ xs: 12, md: 4 }}>
        <Card featured>
          <h3>Pro</h3>
          <p className="price">$29/mo</p>
          <ul>
            <li>Everything in Basic</li>
            <li>Feature 4</li>
            <li>Feature 5</li>
            <li>Feature 6</li>
          </ul>
          <Button variant="primary">Choose Plan</Button>
        </Card>
      </GridItem>
      
      <GridItem span={{ xs: 12, md: 4 }}>
        <Card>
          <h3>Enterprise</h3>
          <p className="price">$99/mo</p>
          <ul>
            <li>Everything in Pro</li>
            <li>Feature 7</li>
            <li>Feature 8</li>
            <li>Priority Support</li>
          </ul>
          <Button>Contact Sales</Button>
        </Card>
      </GridItem>
    </Grid>
  );
}
```

## Common Pitfalls

### Pitfall 1: Span Exceeds Grid Columns

```tsx
// BAD - Span exceeds grid columns
<Grid columns={8} gap={6}>
  <GridItem span={12}>
    Overflows grid (12 > 8)
  </GridItem>
</Grid>

// GOOD - Span within grid columns
<Grid columns={12} gap={6}>
  <GridItem span={12}>
    Correct full width
  </GridItem>
</Grid>
```

### Pitfall 2: Using GridItem Outside Grid

```tsx
// BAD - GridItem without Grid parent
<div>
  <GridItem span={6}>
    No effect without Grid
  </GridItem>
</div>

// GOOD - GridItem inside Grid
<Grid columns={12} gap={6}>
  <GridItem span={6}>
    Works correctly
  </GridItem>
</Grid>
```

### Pitfall 3: Mixing Span with Start/End

```tsx
// BAD - Conflicting positioning
<GridItem span={6} start={3} end={10}>
  Which one applies?
</GridItem>

// GOOD - Use one method
<GridItem span={6}>
  Auto-placement with span
</GridItem>

// OR
<GridItem start={3} end={10}>
  Explicit positioning
</GridItem>
```

### Pitfall 4: Forgetting Mobile Span

```tsx
// BAD - Same span on all devices
<Grid columns={12} gap={6}>
  <GridItem span={3}>
    Too narrow on mobile
  </GridItem>
</Grid>

// GOOD - Responsive span
<Grid columns={12} gap={6}>
  <GridItem span={{ xs: 12, lg: 3 }}>
    Full width on mobile, 1/4 on desktop
  </GridItem>
</Grid>
```

### Pitfall 5: Auto-Fit with Span

```tsx
// BAD - Span ignored with auto-fit
<Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
  <GridItem span={6}>
    Span has no effect
  </GridItem>
</Grid>

// GOOD - Don't use GridItem with auto-fit
<Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
  <Card>Let auto-fit handle sizing</Card>
</Grid>
```

## Performance Considerations

### Responsive Value Resolution

GridItem uses `useResponsiveValue` hook:

```tsx
// Efficient - Only re-renders on breakpoint changes
<GridItem 
  span={{ xs: 12, lg: 4 }}
  rowSpan={{ xs: 1, lg: 2 }}
>
  Content
</GridItem>
```

### CSS Module Benefits

- Scoped class names (no conflicts)
- Dead code elimination
- Optimized bundle size
- Zero runtime style overhead

### Memoization

GridItem memoizes class names and inline styles:

```tsx
const classes = useMemo(() => {
  // Only recomputes when dependencies change
}, [currentSpan, currentRowSpan, currentAlign, currentJustify]);

const inlineStyles = useMemo(() => {
  // Only recomputes when dependencies change
}, [style, area, currentStart, currentEnd, ...]);
```

### Minimizing Complexity

```tsx
// Simple span - Best performance
<GridItem span={6}>Content</GridItem>

// Responsive span - Good performance
<GridItem span={{ xs: 12, lg: 6 }}>Content</GridItem>

// Complex positioning - More overhead
<GridItem 
  start={{ xs: 1, lg: 3 }}
  end={{ xs: 13, lg: 10 }}
  rowStart={2}
  rowEnd={4}
  align={{ xs: "start", lg: "center" }}
>
  Content
</GridItem>
```

## Accessibility

### Semantic HTML

Use the `as` prop for semantic markup:

```tsx
<Grid columns={12} gap={6}>
  <GridItem as="article" span={8}>
    <h1>Article Title</h1>
    <p>Article content</p>
  </GridItem>
  
  <GridItem as="aside" span={4}>
    <h2>Related Links</h2>
    <ul>...</ul>
  </GridItem>
</Grid>
```

### Document Order

Screen readers follow DOM order, not visual order:

```tsx
<Grid columns={12} gap={6}>
  {/* DOM order: 1, 2 */}
  <GridItem span={8}>
    Main content (read first)
  </GridItem>
  <GridItem span={4}>
    Sidebar (read second)
  </GridItem>
  {/* Visual order can be changed with positioning */}
</Grid>
```

### Keyboard Navigation

GridItem preserves tab order:

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={6}>
    <button>Button 1</button>
  </GridItem>
  <GridItem span={6}>
    <button>Button 2</button>
  </GridItem>
  {/* Tab order: Button 1 → Button 2 */}
</Grid>
```

### Screen Reader Transparency

GridItem is transparent to screen readers:

- Doesn't announce itself
- Maintains document structure
- Preserves heading hierarchy
- No ARIA attributes needed

## API Reference

### Props

```typescript
interface GridItemProps {
  // Content
  children: React.ReactNode;
  
  // Column spanning (1-24)
  span?: number | ResponsiveObject;
  
  // Column positioning
  start?: number | ResponsiveObject;
  end?: number | ResponsiveObject;
  
  // Row spanning (1-12)
  rowSpan?: number | ResponsiveObject;
  
  // Row positioning
  row?: number | ResponsiveObject;
  rowStart?: number | ResponsiveObject;
  rowEnd?: number | ResponsiveObject;
  
  // Named grid area
  area?: string;
  
  // Individual item alignment
  align?: 
    | "start" 
    | "center" 
    | "end" 
    | "stretch" 
    | "baseline"
    | ResponsiveObject;
  
  justify?: 
    | "start" 
    | "center" 
    | "end" 
    | "stretch"
    | ResponsiveObject;
  
  // Custom styles
  className?: string;
  style?: React.CSSProperties;
  
  // Polymorphic element
  as?: keyof JSX.IntrinsicElements;  // Default: "div"
}

type ResponsiveObject = {
  xs?: any;
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
  "2xl"?: any;
};
```

### Defaults

```typescript
{
  as: "div"
  // All other props are optional with no defaults
}
```

## Related Components

- **Grid** - Parent grid container
- **Container** - Width-constrained wrapper
- **Stack** - Vertical/horizontal stacking
- **Spacer** - Spacing utility

## Design Principles

GridItem follows "The Spexop Way":

1. **Primitives before patterns** - Core grid cell primitive
2. **Composition before complexity** - Works with Grid for flexible layouts
3. **Standards before frameworks** - Pure CSS Grid implementation
4. **Accessibility before aesthetics** - Semantic HTML, screen reader friendly

## Further Reading

- [Grid Component USAGE-GUIDE](../Grid/USAGE-GUIDE.md)
- [Container Component USAGE-GUIDE](../Container/USAGE-GUIDE.md)
- [Grid Primitives Guide](/docs/grid-primitives.md)
- [CSS Grid Item - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Grid_Template_Areas)

## License

MIT

## Author

Created by @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
