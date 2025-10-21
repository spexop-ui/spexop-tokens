# Container Component - Comprehensive Usage Guide

Version: 0.2.0
Package: @spexop/react
Status: Production Ready

## Table of Contents

- [Overview](#overview)
- [Core Concepts](#core-concepts)
- [Basic Usage](#basic-usage)
- [Advanced Patterns](#advanced-patterns)
- [Responsive Strategies](#responsive-strategies)
- [Real-World Examples](#real-world-examples)
- [Common Pitfalls](#common-pitfalls)
- [Performance Considerations](#performance-considerations)
- [Accessibility](#accessibility)
- [API Reference](#api-reference)

## Overview

Container is one of the 5 core grid primitives in the Spexop design system. It constrains content width and provides consistent padding, following the "Primitives before patterns" principle.

### When to Use Container

- Page-level content wrapping
- Section width constraints
- Consistent padding management
- Centering content horizontally
- Creating reading-friendly line lengths

### When NOT to Use Container

- For vertical spacing (use Stack or Spacer)
- For multi-column layouts (use Grid)
- For flexbox layouts (use Stack)
- When you need full-width backgrounds with constrained content (nest Container inside)

## Core Concepts

### Max-Width Breakpoints

Container provides 7 max-width options based on design tokens:

- `xs`: 480px - Narrow content (forms, modals)
- `sm`: 640px - Mobile-optimized content
- `md`: 768px - Tablet layouts
- `lg`: 1024px - Desktop content (default for articles)
- `xl`: 1280px - Wide layouts (default)
- `2xl`: 1536px - Very wide content
- `full`: No constraint - Full viewport width

### Padding System

Uses spacing tokens (0-10) from @spexop/theme:

- 0 = 0px
- 1 = 4px
- 2 = 8px
- 3 = 12px
- 4 = 16px (recommended minimum)
- 5 = 20px
- 6 = 24px (recommended default)
- 7 = 32px
- 8 = 40px
- 9 = 48px
- 10 = 64px

### Centering Behavior

By default, Container centers content horizontally using `margin: 0 auto`. This can be disabled with `centered={false}`.

## Basic Usage

### Standard Page Container

```tsx
import { Container } from '@spexop/react';

function Page() {
  return (
    <Container maxWidth="xl" padding={6}>
      <h1>Page Title</h1>
      <p>Page content with consistent max-width and padding.</p>
    </Container>
  );
}
```

### Form Container

```tsx
<Container maxWidth="sm" padding={8}>
  <form>
    <h2>Sign In</h2>
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <button type="submit">Submit</button>
  </form>
</Container>
```

### Article Container

```tsx
<Container maxWidth="lg" padding={6}>
  <article>
    <h1>Article Title</h1>
    <p>Optimized line length for reading (60-70 characters per line).</p>
  </article>
</Container>
```

## Advanced Patterns

### Nested Containers

Use nested containers to create progressive width constraints:

```tsx
<Container maxWidth="2xl" padding={8}>
  {/* Full-width header within 2xl constraint */}
  <header>
    <h1>Site Header</h1>
  </header>
  
  {/* Narrower content area */}
  <Container maxWidth="lg" padding={0}>
    <article>
      <p>Article content with narrower line length.</p>
    </article>
  </Container>
</Container>
```

### With Grid Layout

Container + Grid is the foundation for most page layouts:

```tsx
<Container maxWidth="xl" padding={6}>
  <Grid columns={12} gap={6}>
    <GridItem span={3}>
      <aside>Sidebar</aside>
    </GridItem>
    <GridItem span={9}>
      <main>Main Content</main>
    </GridItem>
  </Grid>
</Container>
```

### With Stack for Vertical Spacing

```tsx
<Container maxWidth="lg" padding={8}>
  <Stack direction="vertical" gap={6}>
    <header>
      <h1>Dashboard</h1>
      <p>Welcome back!</p>
    </header>
    
    <section>
      <h2>Stats</h2>
      {/* Stats content */}
    </section>
    
    <section>
      <h2>Recent Activity</h2>
      {/* Activity content */}
    </section>
  </Stack>
</Container>
```

### Fluid Container with Centered Content

```tsx
<Container fluid padding={0}>
  {/* Full-width background */}
  <div style={{ background: 'var(--theme-surface-secondary)' }}>
    <Container maxWidth="xl" padding={6}>
      {/* Constrained content within full-width background */}
      <h2>Centered Content with Full-Width Background</h2>
    </Container>
  </div>
</Container>
```

### Asymmetric Padding

Override individual padding directions:

```tsx
<Container 
  maxWidth="lg" 
  paddingTop={10}
  paddingBottom={10}
  paddingLeft={6}
  paddingRight={6}
>
  {/* Large vertical padding, standard horizontal */}
  <section>Hero Section</section>
</Container>
```

### No Horizontal Padding

Useful when children need to extend to edges:

```tsx
<Container maxWidth="xl" paddingLeft={0} paddingRight={0}>
  {/* Full-width hero image */}
  <img src="hero.jpg" alt="Hero" style={{ width: '100%' }} />
  
  {/* Padded content below */}
  <div style={{ padding: 'var(--theme-spacing-6)' }}>
    <h1>Content with padding</h1>
  </div>
</Container>
```

### Semantic HTML with 'as' Prop

```tsx
<Container as="main" maxWidth="xl" padding={6}>
  <h1>Main Content</h1>
</Container>

<Container as="section" maxWidth="lg" padding={8}>
  <h2>Section Content</h2>
</Container>

<Container as="article" maxWidth="md" padding={6}>
  <h1>Article Title</h1>
  <p>Article content</p>
</Container>
```

## Responsive Strategies

### Mobile-First Responsive Width

```tsx
<Container 
  maxWidth={{ 
    xs: "full",    // Full width on mobile
    md: "lg",      // Constrained on tablet
    xl: "xl"       // Wider on desktop
  }} 
  padding={6}
>
  <h1>Responsive Container</h1>
</Container>
```

### Responsive Padding

```tsx
<Container 
  maxWidth="xl"
  padding={{
    xs: 4,   // 16px on mobile (space is limited)
    md: 6,   // 24px on tablet
    lg: 8,   // 40px on desktop (more breathing room)
    xl: 10   // 64px on large screens
  }}
>
  <h1>Responsive Padding</h1>
</Container>
```

### Mobile-First Padding Strategy

```tsx
<Container 
  maxWidth="xl"
  paddingTop={{ xs: 6, lg: 10 }}
  paddingBottom={{ xs: 6, lg: 10 }}
  paddingLeft={{ xs: 4, md: 6 }}
  paddingRight={{ xs: 4, md: 6 }}
>
  {/* Larger vertical padding on desktop, 
      standard horizontal padding */}
  <section>Hero Section</section>
</Container>
```

### Touch-Friendly Mobile Padding

```tsx
<Container 
  maxWidth="sm"
  padding={{
    xs: 4,  // Minimum 16px for touch targets near edges
    md: 6   // More space on larger screens
  }}
>
  <form>
    {/* Form controls need space from viewport edges */}
    <button>Submit</button>
  </form>
</Container>
```

## Real-World Examples

### Marketing Landing Page

```tsx
function LandingPage() {
  return (
    <>
      {/* Hero - Full width background, constrained content */}
      <div style={{ background: 'var(--theme-primary)' }}>
        <Container maxWidth="xl" padding={{ xs: 6, lg: 10 }}>
          <Stack direction="vertical" gap={6} align="center">
            <h1>Welcome to Our Product</h1>
            <p>Transform your workflow</p>
            <button>Get Started</button>
          </Stack>
        </Container>
      </div>
      
      {/* Features - Constrained width */}
      <Container maxWidth="xl" padding={{ xs: 6, lg: 10 }}>
        <Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
          <Card>Feature 1</Card>
          <Card>Feature 2</Card>
          <Card>Feature 3</Card>
        </Grid>
      </Container>
      
      {/* CTA - Full width background */}
      <div style={{ background: 'var(--theme-surface-secondary)' }}>
        <Container maxWidth="lg" padding={{ xs: 8, lg: 12 }}>
          <Stack direction="vertical" gap={4} align="center">
            <h2>Ready to get started?</h2>
            <button>Sign Up Now</button>
          </Stack>
        </Container>
      </div>
    </>
  );
}
```

### Blog Article Layout

```tsx
function BlogArticle() {
  return (
    <>
      {/* Wide header */}
      <Container maxWidth="xl" padding={6}>
        <header>
          <h1>Article Title</h1>
          <p>Published on Jan 1, 2024</p>
        </header>
      </Container>
      
      {/* Narrow reading width for body */}
      <Container maxWidth="md" padding={6}>
        <article>
          <p>Article content optimized for reading...</p>
          <p>Line length is constrained for readability.</p>
        </article>
      </Container>
      
      {/* Wide footer */}
      <Container maxWidth="xl" padding={6}>
        <footer>
          <Grid columns={3} gap={6}>
            <div>Related Article 1</div>
            <div>Related Article 2</div>
            <div>Related Article 3</div>
          </Grid>
        </footer>
      </Container>
    </>
  );
}
```

### Dashboard Layout

```tsx
function Dashboard() {
  return (
    <Container maxWidth="2xl" padding={{ xs: 4, lg: 8 }}>
      <Stack direction="vertical" gap={8}>
        {/* Header */}
        <header>
          <Stack direction="horizontal" justify="space-between" align="center">
            <h1>Dashboard</h1>
            <button>New Item</button>
          </Stack>
        </header>
        
        {/* Stats Grid */}
        <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap={6}>
          <StatsCard title="Users" value="1,234" />
          <StatsCard title="Revenue" value="$5,678" />
          <StatsCard title="Orders" value="890" />
          <StatsCard title="Growth" value="+12%" />
        </Grid>
        
        {/* Main Content Grid */}
        <Grid columns={{ xs: 1, lg: 12 }} gap={6}>
          <GridItem span={{ xs: 1, lg: 8 }}>
            <Card>Chart</Card>
          </GridItem>
          <GridItem span={{ xs: 1, lg: 4 }}>
            <Card>Activity Feed</Card>
          </GridItem>
        </Grid>
      </Stack>
    </Container>
  );
}
```

### Settings Page

```tsx
function SettingsPage() {
  return (
    <Container maxWidth="lg" padding={6}>
      <Stack direction="vertical" gap={8}>
        <h1>Settings</h1>
        
        <section>
          <h2>Profile</h2>
          <Stack direction="vertical" gap={4}>
            <TextInput label="Name" />
            <TextInput label="Email" />
            <TextArea label="Bio" />
          </Stack>
        </section>
        
        <section>
          <h2>Preferences</h2>
          <Stack direction="vertical" gap={4}>
            <Checkbox label="Email notifications" />
            <Checkbox label="Dark mode" />
          </Stack>
        </section>
        
        <Stack direction="horizontal" gap={3} justify="end">
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </Stack>
      </Stack>
    </Container>
  );
}
```

## Common Pitfalls

### Pitfall 1: Double Padding

```tsx
// BAD - Double padding from Container and child
<Container padding={6}>
  <div style={{ padding: '24px' }}>
    Content has 48px total padding
  </div>
</Container>

// GOOD - Let Container handle padding
<Container padding={6}>
  <div>
    Content has correct 24px padding
  </div>
</Container>
```

### Pitfall 2: Fixed Width Inside Container

```tsx
// BAD - Fixed width fights with max-width
<Container maxWidth="lg">
  <div style={{ width: '1200px' }}>
    Might overflow on smaller screens
  </div>
</Container>

// GOOD - Use percentage or let content flow
<Container maxWidth="lg">
  <div style={{ width: '100%' }}>
    Respects container constraint
  </div>
</Container>
```

### Pitfall 3: Conflicting fluid and maxWidth

```tsx
// BAD - Conflicting props
<Container fluid maxWidth="lg">
  Which one wins?
</Container>

// GOOD - Choose one approach
<Container fluid>
  Full width
</Container>

// OR
<Container maxWidth="lg">
  Constrained width
</Container>
```

### Pitfall 4: Forgetting Mobile Padding

```tsx
// BAD - No padding on mobile
<Container maxWidth="xl" padding={0}>
  <button>Submit</button>
  {/* Button touches screen edges on mobile */}
</Container>

// GOOD - Always have minimum mobile padding
<Container maxWidth="xl" padding={{ xs: 4, lg: 6 }}>
  <button>Submit</button>
</Container>
```

### Pitfall 5: Using Container for Vertical Spacing

```tsx
// BAD - Containers for vertical spacing
<Container padding={6}>Section 1</Container>
<Container padding={6}>Section 2</Container>

// GOOD - Use Stack for vertical spacing
<Stack direction="vertical" gap={6}>
  <section>Section 1</section>
  <section>Section 2</section>
</Stack>
```

## Performance Considerations

### Responsive Value Resolution

Container uses `useResponsiveValue` hook which:

- Listens to window resize events
- Resolves current breakpoint
- Re-renders only when breakpoint changes (not on every pixel)

```tsx
// Efficient - Only re-renders on breakpoint changes
<Container 
  maxWidth={{ xs: "sm", lg: "xl" }}
  padding={{ xs: 4, lg: 8 }}
>
  Content
</Container>
```

### CSS Module Benefits

Container uses CSS Modules which:

- Generates scoped class names (no global conflicts)
- Enables dead code elimination
- Optimizes bundle size
- Zero runtime overhead for styles

### Memoization

Container memoizes class name computation:

```tsx
const classes = useMemo(() => {
  // Only recomputes when dependencies change
  return classList.join(" ");
}, [centered, fluid, currentMaxWidth, currentPadding, ...]);
```

### Debug Mode Overhead

Debug mode adds data attributes. Disable in production:

```tsx
// Development - Debug boundaries visible
<DebugProvider enabled={true}>
  <Container padding={6}>Content</Container>
</DebugProvider>

// Production - Zero debug overhead
<DebugProvider enabled={false}>
  <Container padding={6}>Content</Container>
</DebugProvider>
```

### Recommendations

1. Use static maxWidth when possible (no responsive object)
2. Minimize padding direction overrides
3. Avoid inline styles when CSS classes suffice
4. Use 'as' prop for semantic HTML (no wrapper cost)
5. Disable debug mode in production

## Accessibility

### Semantic HTML

Always use the `as` prop for semantic markup:

```tsx
// Main content area
<Container as="main" maxWidth="xl" padding={6}>
  <h1>Main Content</h1>
</Container>

// Article
<Container as="article" maxWidth="md" padding={6}>
  <h1>Article Title</h1>
  <p>Content</p>
</Container>

// Section
<Container as="section" maxWidth="lg" padding={8}>
  <h2>Section Title</h2>
</Container>
```

### Landmarks

Combine with ARIA landmarks:

```tsx
<Container as="nav" role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</Container>
```

### Skip Links

Provide skip links for keyboard users:

```tsx
<>
  <a href="#main-content" style={{ /* skip link styles */ }}>
    Skip to main content
  </a>
  
  <Container as="main" id="main-content" maxWidth="xl" padding={6}>
    <h1>Main Content</h1>
  </Container>
</>
```

### Focus Management

Container preserves focus order:

```tsx
<Container maxWidth="lg" padding={6}>
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
  {/* Tab order preserved: 1 → 2 → 3 */}
</Container>
```

### Screen Reader Considerations

Container is transparent to screen readers:

- Doesn't announce itself (purely layout)
- Maintains document structure
- Preserves heading hierarchy
- No ARIA attributes needed

## API Reference

### Props

```typescript
interface ContainerProps {
  // Content
  children: React.ReactNode;
  
  // Max-width constraint
  maxWidth?: 
    | "xs"      // 480px
    | "sm"      // 640px
    | "md"      // 768px
    | "lg"      // 1024px
    | "xl"      // 1280px (default)
    | "2xl"     // 1536px
    | "full"    // No constraint
    | ResponsiveObject;
  
  // Padding (all sides)
  padding?: SpacingScale | ResponsiveObject;  // Default: 4
  
  // Individual padding overrides
  paddingLeft?: SpacingScale | ResponsiveObject;
  paddingRight?: SpacingScale | ResponsiveObject;
  paddingTop?: SpacingScale | ResponsiveObject;
  paddingBottom?: SpacingScale | ResponsiveObject;
  
  // Centering
  centered?: boolean;  // Default: true
  
  // Fluid mode (no max-width)
  fluid?: boolean;     // Default: false
  
  // Custom styles
  className?: string;
  style?: React.CSSProperties;
  
  // Polymorphic element type
  as?: keyof JSX.IntrinsicElements;  // Default: "div"
}

type SpacingScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type ResponsiveObject = {
  xs?: SpacingScale;
  sm?: SpacingScale;
  md?: SpacingScale;
  lg?: SpacingScale;
  xl?: SpacingScale;
  "2xl"?: SpacingScale;
};
```

### Defaults

```typescript
{
  maxWidth: "xl",
  padding: 4,
  centered: true,
  fluid: false,
  as: "div"
}
```

### Design Tokens

Container uses these CSS custom properties from @spexop/theme:

```css
/* Max-width tokens */
--theme-breakpoint-xs: 480px;
--theme-breakpoint-sm: 640px;
--theme-breakpoint-md: 768px;
--theme-breakpoint-lg: 1024px;
--theme-breakpoint-xl: 1280px;
--theme-breakpoint-2xl: 1536px;

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

- **Grid** - Multi-column layouts
- **GridItem** - Grid cell positioning
- **Stack** - Vertical/horizontal stacking
- **Spacer** - Spacing utility
- **Section** - Semantic page sections

## Design Principles

Container follows "The Spexop Way":

1. **Primitives before patterns** - Core layout primitive, master it first
2. **Tokens before magic numbers** - Uses breakpoint and spacing tokens exclusively
3. **Composition before complexity** - Designed to wrap other components
4. **Standards before frameworks** - Standard HTML element with CSS constraints
5. **Accessibility before aesthetics** - Semantic HTML, screen reader friendly

## Further Reading

- [Grid Component README](../Grid/README.md)
- [Stack Component README](../Stack/README.md)
- [Responsive Design Patterns](/docs/responsive-patterns.md)
- [Grid Primitives Guide](/docs/grid-primitives.md)

## License

MIT

## Author

Created by @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
