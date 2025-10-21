# Grid Component - Comprehensive Usage Guide

Version: 0.2.0
Package: @spexop/react
Status: Production Ready

## Table of Contents

- [Overview](#overview)
- [Core Concepts](#core-concepts)
- [Layout Patterns](#layout-patterns)
- [Responsive Strategies](#responsive-strategies)
- [Container Query Integration](#container-query-integration)
- [Subgrid Usage](#subgrid-usage)
- [Named Grid Areas](#named-grid-areas)
- [Real-World Examples](#real-world-examples)
- [Common Pitfalls](#common-pitfalls)
- [Performance Considerations](#performance-considerations)
- [Accessibility](#accessibility)
- [API Reference](#api-reference)

## Overview

Grid is one of the 5 core primitives in the Spexop design system. It provides a powerful CSS Grid-based layout system for creating responsive, flexible multi-dimensional layouts.

### When to Use Grid

- Multi-column page layouts
- Card grids with equal heights
- Dashboard layouts with complex positioning
- Responsive component grids (auto-fit/auto-fill)
- Layouts requiring precise item placement
- Named grid area layouts

### When NOT to Use Grid

- Simple vertical stacking (use Stack)
- Single direction layouts (use Stack)
- Quick spacing between elements (use Spacer)
- Content width constraints only (use Container)

## Core Concepts

### Column System

Grid supports three column modes:

1. **Fixed Columns** (1-24): Explicit column count
2. **Auto-Fit**: Automatically fits as many columns as possible
3. **Auto-Fill**: Similar to auto-fit but keeps empty tracks

### Gap System

Uses spacing tokens (0-10) for consistent gaps:

- `gap`: Sets both row and column gap
- `rowGap`: Sets only row gap
- `columnGap`: Sets only column gap

### Alignment

- `align`: Cross-axis alignment (start, center, end, stretch, baseline)
- `justify`: Main-axis distribution (start, center, end, space-between, space-around, space-evenly)

### Container Queries

Enable responsive behavior based on container size (not viewport):

```tsx
<Grid container columns="auto-fit" minColumnWidth="300px">
  {/* Responds to Grid width, not viewport width */}
</Grid>
```

### Subgrid

Inherit parent grid's column/row tracks:

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={12}>
    <Grid subgrid gap={6}>
      {/* Inherits parent's 12 columns */}
    </Grid>
  </GridItem>
</Grid>
```

## Layout Patterns

### 12-Column Layout System

The classic 12-column grid for precise control:

```tsx
<Grid columns={12} gap={6}>
  {/* 1/4 width */}
  <GridItem span={3}>Sidebar</GridItem>
  
  {/* 3/4 width */}
  <GridItem span={9}>Main Content</GridItem>
</Grid>
```

**Common 12-column patterns:**

```tsx
// Two equal columns
<Grid columns={12} gap={6}>
  <GridItem span={6}>Left</GridItem>
  <GridItem span={6}>Right</GridItem>
</Grid>

// Three equal columns
<Grid columns={12} gap={6}>
  <GridItem span={4}>Col 1</GridItem>
  <GridItem span={4}>Col 2</GridItem>
  <GridItem span={4}>Col 3</GridItem>
</Grid>

// Four equal columns
<Grid columns={12} gap={6}>
  <GridItem span={3}>Col 1</GridItem>
  <GridItem span={3}>Col 2</GridItem>
  <GridItem span={3}>Col 3</GridItem>
  <GridItem span={3}>Col 4</GridItem>
</Grid>

// Asymmetric layout
<Grid columns={12} gap={6}>
  <GridItem span={8}>Main</GridItem>
  <GridItem span={4}>Aside</GridItem>
</Grid>
```

### Auto-Fit Responsive Grid

Automatically fits columns based on minimum width:

```tsx
<Grid columns="auto-fit" minColumnWidth="250px" gap={6}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
  {/* Automatically wraps based on container width */}
</Grid>
```

**With max width:**

```tsx
<Grid 
  columns="auto-fit" 
  minColumnWidth="200px"
  maxColumnWidth="400px"
  fluid
  gap={6}
>
  {/* Columns grow from 200px to 400px, then new column */}
  <Card>Responsive Card</Card>
</Grid>
```

### Auto-Fill Grid

Similar to auto-fit but maintains empty tracks:

```tsx
<Grid columns="auto-fill" minColumnWidth="300px" gap={6}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  {/* Empty tracks remain even if no items */}
</Grid>
```

### Fixed Column Count

Simple explicit column layouts:

```tsx
// 2 columns
<Grid columns={2} gap={6}>
  <div>Column 1</div>
  <div>Column 2</div>
</Grid>

// 3 columns
<Grid columns={3} gap={6}>
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</Grid>

// 4 columns
<Grid columns={4} gap={6}>
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
  <div>Column 4</div>
</Grid>
```

### Holy Grail Layout

Classic three-column layout with header and footer:

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

## Responsive Strategies

### Mobile-First Column Count

```tsx
<Grid 
  columns={{ 
    xs: 1,      // Stack on mobile
    sm: 2,      // 2 columns on small tablets
    md: 3,      // 3 columns on tablets
    lg: 4,      // 4 columns on desktop
    xl: 6       // 6 columns on large screens
  }} 
  gap={6}
>
  {items.map(item => (
    <Card key={item.id}>{item.title}</Card>
  ))}
</Grid>
```

### Responsive Gap

```tsx
<Grid 
  columns={3}
  gap={{
    xs: 4,   // 16px on mobile (tighter)
    md: 6,   // 24px on tablet
    lg: 8    // 40px on desktop (more breathing room)
  }}
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

### Responsive Auto-Fit

```tsx
<Grid 
  columns="auto-fit"
  minColumnWidth={{
    xs: "200px",   // Smaller cards on mobile
    md: "250px",   // Medium cards on tablet
    lg: "300px"    // Larger cards on desktop
  }}
  gap={6}
>
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</Grid>
```

### Independent Row and Column Gaps

```tsx
<Grid 
  columns={3}
  rowGap={{ xs: 6, lg: 8 }}
  columnGap={{ xs: 4, lg: 6 }}
>
  {/* More vertical space than horizontal */}
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

## Container Query Integration

Container queries enable responsive behavior based on container size, not viewport:

```tsx
<Grid container columns="auto-fit" minColumnWidth="300px" gap={6}>
  {/* Responds to Grid's width, not window width */}
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</Grid>
```

### Use case: Sidebar layout

```tsx
<div style={{ display: 'flex' }}>
  {/* Narrow sidebar */}
  <aside style={{ width: '250px' }}>
    <Grid container columns="auto-fit" minColumnWidth="200px" gap={4}>
      {/* Adapts to sidebar width */}
      <Widget>Widget 1</Widget>
      <Widget>Widget 2</Widget>
    </Grid>
  </aside>
  
  {/* Wide main area */}
  <main style={{ flex: 1 }}>
    <Grid container columns="auto-fit" minColumnWidth="300px" gap={6}>
      {/* Adapts to main width */}
      <Card>Card 1</Card>
      <Card>Card 2</Card>
      <Card>Card 3</Card>
    </Grid>
  </main>
</div>
```

## Subgrid Usage

Subgrid allows nested grids to align with parent grid tracks:

### Basic Subgrid

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={12}>
    {/* This Grid inherits parent's columns */}
    <Grid subgrid gap={6}>
      <GridItem span={3}>Aligns with parent</GridItem>
      <GridItem span={9}>Aligns with parent</GridItem>
    </Grid>
  </GridItem>
</Grid>
```

### Card with Subgrid

Align card content across rows:

```tsx
<Grid columns={3} gap={6}>
  {cards.map(card => (
    <GridItem key={card.id}>
      <Card>
        <Grid subgrid rowGap={4}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <button>Learn More</button>
        </Grid>
      </Card>
    </GridItem>
  ))}
</Grid>
```

### Form Subgrid

Align form labels and inputs:

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={12}>
    <form>
      <Grid subgrid columnGap={4} rowGap={6}>
        {/* Labels and inputs align across rows */}
        <GridItem span={3}><label>Name:</label></GridItem>
        <GridItem span={9}><input type="text" /></GridItem>
        
        <GridItem span={3}><label>Email:</label></GridItem>
        <GridItem span={9}><input type="email" /></GridItem>
      </Grid>
    </form>
  </GridItem>
</Grid>
```

## Named Grid Areas

Define layout structure with named areas:

### Basic Named Areas

```tsx
<Grid 
  areas={[
    "header header",
    "sidebar content",
    "footer footer"
  ]}
  gap={6}
>
  <GridItem area="header">Header</GridItem>
  <GridItem area="sidebar">Sidebar</GridItem>
  <GridItem area="content">Content</GridItem>
  <GridItem area="footer">Footer</GridItem>
</Grid>
```

### App Shell Layout

```tsx
<Grid 
  areas={[
    "nav nav nav",
    "sidebar main aside",
    "footer footer footer"
  ]}
  gap={6}
  style={{ minHeight: '100vh' }}
>
  <GridItem area="nav">
    <nav>Navigation</nav>
  </GridItem>
  
  <GridItem area="sidebar">
    <aside>Left Sidebar</aside>
  </GridItem>
  
  <GridItem area="main">
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

### Magazine Layout

```tsx
<Grid 
  areas={[
    "hero hero feature1",
    "hero hero feature2",
    "article1 article2 feature3"
  ]}
  gap={6}
>
  <GridItem area="hero">
    <Card large>Hero Article</Card>
  </GridItem>
  
  <GridItem area="feature1">
    <Card>Feature 1</Card>
  </GridItem>
  
  <GridItem area="feature2">
    <Card>Feature 2</Card>
  </GridItem>
  
  <GridItem area="feature3">
    <Card>Feature 3</Card>
  </GridItem>
  
  <GridItem area="article1">
    <Card>Article 1</Card>
  </GridItem>
  
  <GridItem area="article2">
    <Card>Article 2</Card>
  </GridItem>
</Grid>
```

## Real-World Examples

### Dashboard Layout

```tsx
function Dashboard() {
  return (
    <Grid columns={12} gap={6}>
      {/* Full-width header */}
      <GridItem span={12}>
        <Card>
          <h1>Dashboard Overview</h1>
        </Card>
      </GridItem>
      
      {/* Stats row - 4 equal columns */}
      <GridItem span={3}>
        <StatsCard title="Users" value="1,234" trend="+12%" />
      </GridItem>
      <GridItem span={3}>
        <StatsCard title="Revenue" value="$5,678" trend="+8%" />
      </GridItem>
      <GridItem span={3}>
        <StatsCard title="Orders" value="890" trend="+15%" />
      </GridItem>
      <GridItem span={3}>
        <StatsCard title="Growth" value="+12%" trend="+3%" />
      </GridItem>
      
      {/* Charts row - 2/3 and 1/3 split */}
      <GridItem span={8}>
        <Card>
          <h2>Revenue Chart</h2>
          <LineChart data={revenueData} />
        </Card>
      </GridItem>
      <GridItem span={4}>
        <Card>
          <h2>Top Products</h2>
          <ProductList products={topProducts} />
        </Card>
      </GridItem>
      
      {/* Activity feed - full width */}
      <GridItem span={12}>
        <Card>
          <h2>Recent Activity</h2>
          <ActivityFeed items={recentActivity} />
        </Card>
      </GridItem>
    </Grid>
  );
}
```

### E-commerce Product Grid

```tsx
function ProductGrid({ products }) {
  return (
    <Grid 
      columns="auto-fit" 
      minColumnWidth="280px"
      maxColumnWidth="350px"
      fluid
      gap={6}
    >
      {products.map(product => (
        <Card key={product.id}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button>Add to Cart</button>
        </Card>
      ))}
    </Grid>
  );
}
```

### Masonry-Style Blog Layout

```tsx
function BlogMasonry({ posts }) {
  return (
    <Grid 
      columns={{ xs: 1, sm: 2, lg: 3 }}
      gap={6}
    >
      {posts.map(post => (
        <GridItem 
          key={post.id}
          rowSpan={post.featured ? 2 : 1}
        >
          <Card>
            <img src={post.image} alt={post.title} />
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <a href={`/posts/${post.id}`}>Read More</a>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}
```

### Form Layout

```tsx
function RegistrationForm() {
  return (
    <Grid columns={12} gap={6}>
      {/* Full-width fields */}
      <GridItem span={12}>
        <TextInput label="Email" type="email" />
      </GridItem>
      
      <GridItem span={12}>
        <TextInput label="Password" type="password" />
      </GridItem>
      
      {/* Two-column fields */}
      <GridItem span={6}>
        <TextInput label="First Name" />
      </GridItem>
      <GridItem span={6}>
        <TextInput label="Last Name" />
      </GridItem>
      
      {/* Address fields */}
      <GridItem span={12}>
        <TextInput label="Street Address" />
      </GridItem>
      
      <GridItem span={6}>
        <TextInput label="City" />
      </GridItem>
      <GridItem span={3}>
        <Select label="State" />
      </GridItem>
      <GridItem span={3}>
        <TextInput label="ZIP" />
      </GridItem>
      
      {/* Submit button */}
      <GridItem span={12}>
        <Stack direction="horizontal" gap={3} justify="end">
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Create Account</Button>
        </Stack>
      </GridItem>
    </Grid>
  );
}
```

### Sidebar with Cards

```tsx
function SidebarLayout() {
  return (
    <Grid columns={12} gap={6}>
      {/* Sidebar - 1/4 width */}
      <GridItem span={3}>
        <Stack direction="vertical" gap={6}>
          <Card>
            <h3>Filters</h3>
            <FilterOptions />
          </Card>
          <Card>
            <h3>Categories</h3>
            <CategoryList />
          </Card>
        </Stack>
      </GridItem>
      
      {/* Main content - 3/4 width */}
      <GridItem span={9}>
        <Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
          {items.map(item => (
            <Card key={item.id}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </Card>
          ))}
        </Grid>
      </GridItem>
    </Grid>
  );
}
```

## Common Pitfalls

### Pitfall 1: Forgetting GridItem Wrapper

```tsx
// BAD - Direct children don't span
<Grid columns={12} gap={6}>
  <div>Takes 1 column</div>
  <div>Takes 1 column</div>
</Grid>

// GOOD - Use GridItem for spanning
<Grid columns={12} gap={6}>
  <GridItem span={6}>Half width</GridItem>
  <GridItem span={6}>Half width</GridItem>
</Grid>
```

### Pitfall 2: Auto-Fit Without Min Width

```tsx
// BAD - No minimum width specified
<Grid columns="auto-fit" gap={6}>
  <Card>Might be too narrow</Card>
</Grid>

// GOOD - Specify minimum column width
<Grid columns="auto-fit" minColumnWidth="250px" gap={6}>
  <Card>Respects minimum width</Card>
</Grid>
```

### Pitfall 3: Mixing Span and Areas

```tsx
// BAD - Conflicting positioning methods
<Grid areas={["header content"]} columns={12}>
  <GridItem span={6}>Confusing</GridItem>
</Grid>

// GOOD - Use one method consistently
<Grid areas={["header content"]}>
  <GridItem area="header">Header</GridItem>
  <GridItem area="content">Content</GridItem>
</Grid>
```

### Pitfall 4: Fixed Heights in Auto-Fit

```tsx
// BAD - Fixed height prevents proper flow
<Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
  <Card style={{ height: '400px' }}>
    Content might overflow
  </Card>
</Grid>

// GOOD - Let content determine height
<Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
  <Card>
    Content flows naturally
  </Card>
</Grid>
```

### Pitfall 5: Too Many Columns on Mobile

```tsx
// BAD - 4 columns on mobile is cramped
<Grid columns={4} gap={6}>
  <Card>Too narrow</Card>
</Grid>

// GOOD - Responsive column count
<Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap={6}>
  <Card>Appropriate width at each breakpoint</Card>
</Grid>
```

## Performance Considerations

### Auto-Fit vs Fixed Columns

```tsx
// Auto-fit - More flexible but recalculates on resize
<Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
  <Card>Responsive</Card>
</Grid>

// Fixed - Better performance, no resize calculations
<Grid columns={3} gap={6}>
  <Card>Static</Card>
</Grid>

// Best of both - Responsive object with fixed values
<Grid columns={{ xs: 1, sm: 2, lg: 3 }} gap={6}>
  <Card>Optimized responsive</Card>
</Grid>
```

### Minimize Nested Grids

```tsx
// BAD - Deep nesting can impact performance
<Grid columns={12}>
  <GridItem span={12}>
    <Grid columns={12}>
      <GridItem span={6}>
        <Grid columns={12}>
          {/* Too deep */}
        </Grid>
      </GridItem>
    </Grid>
  </GridItem>
</Grid>

// GOOD - Flatten structure when possible
<Grid columns={12}>
  <GridItem span={6}>Content</GridItem>
  <GridItem span={6}>Content</GridItem>
</Grid>
```

### CSS Module Benefits

- Scoped class names (no global conflicts)
- Dead code elimination
- Optimized bundle size
- Zero runtime overhead for styles

### Memoization

Grid memoizes class names and inline styles:

```tsx
const classes = useMemo(() => {
  // Only recomputes when dependencies change
}, [subgrid, container, currentColumns, ...]);

const inlineStyles = useMemo(() => {
  // Only recomputes when dependencies change
}, [style, currentColumns, areas, ...]);
```

## Accessibility

### Semantic HTML

Use the `as` prop for semantic markup:

```tsx
<Grid as="main" columns={12} gap={6}>
  <GridItem as="article" span={8}>
    <h1>Article Title</h1>
  </GridItem>
  <GridItem as="aside" span={4}>
    <h2>Related</h2>
  </GridItem>
</Grid>
```

### Landmarks

```tsx
<Grid as="nav" role="navigation" aria-label="Main navigation">
  <GridItem span={12}>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </GridItem>
</Grid>
```

### Reading Order

Grid maintains document order for screen readers:

```tsx
// Visual order can differ from DOM order
<Grid columns={2} gap={6}>
  {/* DOM order: 1, 2, 3, 4 */}
  <GridItem>1. First in DOM</GridItem>
  <GridItem>2. Second in DOM</GridItem>
  <GridItem>3. Third in DOM</GridItem>
  <GridItem>4. Fourth in DOM</GridItem>
  {/* Screen readers follow DOM order */}
</Grid>
```

### Keyboard Navigation

Grid preserves tab order:

```tsx
<Grid columns={3} gap={6}>
  <button>Tab 1</button>
  <button>Tab 2</button>
  <button>Tab 3</button>
  {/* Tab order: 1 → 2 → 3 */}
</Grid>
```

## API Reference

### Props

```typescript
interface GridProps {
  // Content
  children: React.ReactNode;
  
  // Column configuration
  columns?: 
    | number                    // 1-24
    | "auto-fit"               // Fit as many as possible
    | "auto-fill"              // Fill with empty tracks
    | ResponsiveObject;        // Responsive values
  
  // Default: 12
  
  // Gap spacing
  gap?: SpacingScale | ResponsiveObject;          // Both row and column gap
  rowGap?: SpacingScale | ResponsiveObject;       // Row gap only
  columnGap?: SpacingScale | ResponsiveObject;    // Column gap only
  
  // Auto-fit/auto-fill configuration
  minColumnWidth?: string | ResponsiveObject;     // "250px"
  maxColumnWidth?: string | ResponsiveObject;     // "400px"
  fluid?: boolean;                                // Enable max-width
  
  // Named grid areas
  areas?: string[];                               // ["header header", "sidebar content"]
  
  // Alignment
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
    | "space-between" 
    | "space-around" 
    | "space-evenly"
    | ResponsiveObject;
  
  // Advanced features
  container?: boolean;        // Enable container queries
  subgrid?: boolean;          // Inherit parent grid tracks
  
  // Custom styles
  className?: string;
  style?: React.CSSProperties;
  
  // Polymorphic element
  as?: keyof JSX.IntrinsicElements;  // Default: "div"
}

type SpacingScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

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
  columns: 12,
  gap: 4,
  align: "stretch",
  justify: "start",
  fluid: false,
  container: false,
  subgrid: false,
  as: "div"
}
```

### Design Tokens

```css
/* Spacing tokens */
--theme-spacing-0: 0;
--theme-spacing-1: 4px;
--theme-spacing-2: 8px;
--theme-spacing-3: 12px;
--theme-spacing-4: 16px;
--theme-spacing-5: 20px;
--theme-spacing-6: 24px;
--theme-spacing-7: 32px;
--theme-spacing-8: 40px;
--theme-spacing-9: 48px;
--theme-spacing-10: 64px;
```

## Related Components

- **GridItem** - Grid cell with span and positioning
- **Container** - Width-constrained wrapper
- **Stack** - Vertical/horizontal stacking
- **Spacer** - Spacing utility

## Design Principles

Grid follows "The Spexop Way":

1. **Primitives before patterns** - Master Grid before complex layouts
2. **Tokens before magic numbers** - Uses spacing tokens exclusively
3. **Composition before complexity** - Works with GridItem for flexibility
4. **Standards before frameworks** - Pure CSS Grid implementation
5. **Accessibility before aesthetics** - Semantic HTML, screen reader friendly

## Further Reading

- [GridItem Component USAGE-GUIDE](../GridItem/USAGE-GUIDE.md)
- [Container Component USAGE-GUIDE](../Container/USAGE-GUIDE.md)
- [Grid Primitives Guide](/docs/grid-primitives.md)
- [CSS Grid Layout - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

## License

MIT

## Author

Created by @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
