# Spacer Component - Comprehensive Usage Guide

Version: 0.2.0
Package: @spexop/react
Status: Production Ready

## Table of Contents

- [Overview](#overview)
- [Core Concepts](#core-concepts)
- [When to Use vs Alternatives](#when-to-use-vs-alternatives)
- [Vertical Spacing Patterns](#vertical-spacing-patterns)
- [Horizontal Spacing Patterns](#horizontal-spacing-patterns)
- [Responsive Strategies](#responsive-strategies)
- [Section Separation Techniques](#section-separation-techniques)
- [Real-World Examples](#real-world-examples)
- [Common Pitfalls](#common-pitfalls)
- [Performance Considerations](#performance-considerations)
- [Accessibility](#accessibility)
- [API Reference](#api-reference)

## Overview

Spacer is one of the 5 core primitives in the Spexop design system. It provides a simple, declarative way to add vertical or horizontal space between elements using design tokens.

### When to Use Spacer

- Quick spacing adjustments between elements
- Creating breathing room in layouts
- Separating page sections
- Adding responsive spacing
- One-off spacing needs

### When NOT to Use Spacer

- Multiple items need consistent spacing (use Stack with gap)
- Multi-column layouts (use Grid)
- Complex layouts requiring alignment (use Stack or Grid)
- Spacing that could be handled by parent component's gap property

## Core Concepts

### Spacing Scale

Spacer uses the design system's spacing scale (0-10):

| Value | Token | Size | Use Case |
|-------|-------|------|----------|
| 0 | `--theme-spacing-0` | 0px | No space |
| 1 | `--theme-spacing-1` | 4px | Minimal separation |
| 2 | `--theme-spacing-2` | 8px | Tight spacing |
| 3 | `--theme-spacing-3` | 12px | Compact spacing |
| 4 | `--theme-spacing-4` | 16px | Standard spacing (default) |
| 5 | `--theme-spacing-5` | 20px | Comfortable spacing |
| 6 | `--theme-spacing-6` | 24px | Generous spacing |
| 7 | `--theme-spacing-7` | 32px | Large spacing |
| 8 | `--theme-spacing-8` | 40px | Section spacing |
| 9 | `--theme-spacing-9` | 48px | Major section spacing |
| 10 | `--theme-spacing-10` | 64px | Page-level spacing |

### Direction

- **Vertical** (default): Adds height spacing
- **Horizontal**: Adds width spacing

### ARIA Hidden

Spacer has `aria-hidden="true"` by default since it's purely decorative.

## When to Use vs Alternatives

### Use Spacer When

```tsx
// Quick one-off spacing
<div>
  <h1>Title</h1>
  <Spacer size={6} />
  <p>Content</p>
</div>

// Irregular spacing needs
<div>
  <section>Section 1</section>
  <Spacer size={8} />
  <section>Section 2</section>
  <Spacer size={4} />
  <section>Section 3</section>
</div>
```

### Use Stack When

```tsx
// Multiple items with consistent spacing
<Stack direction="vertical" gap={6}>
  <h1>Title</h1>
  <p>Content 1</p>
  <p>Content 2</p>
  <p>Content 3</p>
</Stack>

// Need alignment or justification
<Stack direction="horizontal" gap={4} justify="space-between">
  <div>Left</div>
  <div>Right</div>
</Stack>
```

### Use Grid When

```tsx
// Multi-column layouts
<Grid columns={3} gap={6}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Complex positioning
<Grid columns={12} gap={6}>
  <GridItem span={8}>Main</GridItem>
  <GridItem span={4}>Sidebar</GridItem>
</Grid>
```

### Comparison Table

| Feature | Spacer | Stack | Grid |
|---------|--------|-------|------|
| Purpose | Simple spacing | Stacking with gap | Multi-dimensional layout |
| Children | None | Multiple | Multiple |
| Direction | Vertical or Horizontal | Vertical or Horizontal | Both (2D) |
| Alignment | N/A | Yes | Yes |
| Responsive | Size only | Full props | Full props |
| Use Case | One-off spacing | Consistent gaps | Complex layouts |

## Vertical Spacing Patterns

### Basic Vertical Spacing

```tsx
<div>
  <h1>Welcome</h1>
  <Spacer size={4} />
  <p>This paragraph has 16px spacing above it.</p>
</div>
```

### Between Sections

```tsx
<main>
  <section>
    <h2>Section 1</h2>
    <p>Content...</p>
  </section>
  
  <Spacer size={10} />
  
  <section>
    <h2>Section 2</h2>
    <p>Content...</p>
  </section>
</main>
```

### After Headings

```tsx
<article>
  <h1>Article Title</h1>
  <Spacer size={6} />
  <p className="subtitle">Article subtitle</p>
  <Spacer size={4} />
  <p>Article content...</p>
</article>
```

### Before Buttons

```tsx
<div>
  <p>Read our terms and conditions before continuing.</p>
  <Spacer size={6} />
  <button>I Agree</button>
</div>
```

### Stacked Elements

```tsx
<div>
  <img src="hero.jpg" alt="Hero" />
  <Spacer size={8} />
  <h1>Title</h1>
  <Spacer size={4} />
  <p>Subtitle</p>
  <Spacer size={6} />
  <button>Call to Action</button>
</div>
```

## Horizontal Spacing Patterns

### Between Inline Elements

```tsx
<div style={{ display: 'flex' }}>
  <button>Cancel</button>
  <Spacer size={3} direction="horizontal" />
  <button>Submit</button>
</div>
```

### Between Icons and Text

```tsx
<div style={{ display: 'flex', alignItems: 'center' }}>
  <Icon name="User" />
  <Spacer size={2} direction="horizontal" />
  <span>John Doe</span>
</div>
```

### Button Groups

```tsx
<div style={{ display: 'flex' }}>
  <button>Action 1</button>
  <Spacer size={2} direction="horizontal" />
  <button>Action 2</button>
  <Spacer size={2} direction="horizontal" />
  <button>Action 3</button>
</div>
```

### Inline Form Fields

```tsx
<div style={{ display: 'flex' }}>
  <input type="text" placeholder="First Name" />
  <Spacer size={4} direction="horizontal" />
  <input type="text" placeholder="Last Name" />
</div>
```

### Navigation Items

```tsx
<nav style={{ display: 'flex' }}>
  <a href="/">Home</a>
  <Spacer size={6} direction="horizontal" />
  <a href="/about">About</a>
  <Spacer size={6} direction="horizontal" />
  <a href="/contact">Contact</a>
</nav>
```

## Responsive Strategies

### Mobile-First Spacing

```tsx
<div>
  <h1>Title</h1>
  <Spacer 
    size={{
      xs: 4,   // 16px on mobile (tighter)
      md: 6,   // 24px on tablet
      lg: 8    // 40px on desktop (more breathing room)
    }}
  />
  <p>Content with responsive spacing</p>
</div>
```

### Conditional Spacing

```tsx
<div>
  <section>Section 1</section>
  <Spacer 
    size={{
      xs: 6,   // Standard spacing on mobile
      lg: 10   // Extra spacing on desktop
    }}
  />
  <section>Section 2</section>
</div>
```

### Responsive Direction

```tsx
// Vertical on mobile, horizontal on desktop
<div style={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}>
  <div>Item 1</div>
  <Spacer 
    size={4}
    direction="vertical"  // Note: Direction itself is not responsive
  />
  <div>Item 2</div>
</div>
```

### Touch-Friendly Mobile Spacing

```tsx
<div>
  <button>Button 1</button>
  <Spacer 
    size={{
      xs: 6,   // 24px minimum for touch targets
      lg: 4    // Can be tighter on desktop
    }}
  />
  <button>Button 2</button>
</div>
```

## Section Separation Techniques

### Page Sections

```tsx
<main>
  <section>
    <h2>Hero Section</h2>
    <p>Introduction...</p>
  </section>
  
  <Spacer size={10} />
  
  <section>
    <h2>Features</h2>
    <Grid columns={3} gap={6}>
      <Card>Feature 1</Card>
      <Card>Feature 2</Card>
      <Card>Feature 3</Card>
    </Grid>
  </section>
  
  <Spacer size={10} />
  
  <section>
    <h2>Pricing</h2>
    <PricingTable />
  </section>
</main>
```

### Article Paragraphs

```tsx
<article>
  <h1>Article Title</h1>
  <Spacer size={6} />
  
  <p>First paragraph...</p>
  <Spacer size={5} />
  
  <p>Second paragraph...</p>
  <Spacer size={5} />
  
  <blockquote>
    Important quote...
  </blockquote>
  <Spacer size={5} />
  
  <p>Final paragraph...</p>
</article>
```

### Form Sections

```tsx
<form>
  <section>
    <h3>Personal Information</h3>
    <TextInput label="Name" />
    <TextInput label="Email" />
  </section>
  
  <Spacer size={8} />
  
  <section>
    <h3>Address</h3>
    <TextInput label="Street" />
    <TextInput label="City" />
  </section>
  
  <Spacer size={8} />
  
  <button type="submit">Submit</button>
</form>
```

### Card Separators

```tsx
<div>
  <Card>
    <h3>Card 1</h3>
    <p>Content...</p>
  </Card>
  
  <Spacer size={6} />
  
  <Card>
    <h3>Card 2</h3>
    <p>Content...</p>
  </Card>
  
  <Spacer size={6} />
  
  <Card>
    <h3>Card 3</h3>
    <p>Content...</p>
  </Card>
</div>
```

## Real-World Examples

### Landing Page

```tsx
function LandingPage() {
  return (
    <Container maxWidth="xl" padding={6}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center' }}>
        <h1>Transform Your Workflow</h1>
        <Spacer size={4} />
        <p>The complete solution for modern teams</p>
        <Spacer size={8} />
        <button>Get Started Free</button>
      </section>
      
      <Spacer size={10} />
      
      {/* Features Section */}
      <section>
        <h2>Features</h2>
        <Spacer size={6} />
        <Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
          <Card>Feature 1</Card>
          <Card>Feature 2</Card>
          <Card>Feature 3</Card>
        </Grid>
      </section>
      
      <Spacer size={10} />
      
      {/* CTA Section */}
      <section style={{ textAlign: 'center' }}>
        <h2>Ready to get started?</h2>
        <Spacer size={6} />
        <button>Sign Up Now</button>
      </section>
    </Container>
  );
}
```

### Blog Post

```tsx
function BlogPost({ post }) {
  return (
    <Container maxWidth="md" padding={6}>
      <article>
        <img src={post.coverImage} alt={post.title} style={{ width: '100%' }} />
        
        <Spacer size={8} />
        
        <h1>{post.title}</h1>
        <Spacer size={4} />
        <div style={{ display: 'flex', gap: '12px' }}>
          <span>{post.author}</span>
          <span>•</span>
          <time>{post.publishedAt}</time>
        </div>
        
        <Spacer size={8} />
        
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <Spacer size={10} />
        
        <footer>
          <h3>Share this article</h3>
          <Spacer size={4} />
          <div style={{ display: 'flex' }}>
            <button>Twitter</button>
            <Spacer size={3} direction="horizontal" />
            <button>Facebook</button>
            <Spacer size={3} direction="horizontal" />
            <button>LinkedIn</button>
          </div>
        </footer>
      </article>
    </Container>
  );
}
```

### Modal Dialog

```tsx
function Modal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Action</h2>
        <Spacer size={4} />
        <p>Are you sure you want to proceed? This action cannot be undone.</p>
        <Spacer size={8} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose}>Cancel</button>
          <Spacer size={3} direction="horizontal" />
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
```

### Profile Card

```tsx
function ProfileCard({ user }) {
  return (
    <Card>
      <img 
        src={user.avatar} 
        alt={user.name}
        style={{ width: '80px', height: '80px', borderRadius: '50%' }}
      />
      
      <Spacer size={4} />
      
      <h3>{user.name}</h3>
      <Spacer size={2} />
      <p>{user.title}</p>
      
      <Spacer size={6} />
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button>Message</button>
        <Spacer size={3} direction="horizontal" />
        <button>Follow</button>
      </div>
    </Card>
  );
}
```

### Dashboard Widget

```tsx
function StatsWidget({ title, value, change }) {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>{title}</h4>
        <Icon name="TrendingUp" />
      </div>
      
      <Spacer size={4} />
      
      <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        {value}
      </div>
      
      <Spacer size={2} />
      
      <div style={{ color: change > 0 ? 'green' : 'red' }}>
        {change > 0 ? '+' : ''}{change}% from last month
      </div>
    </Card>
  );
}
```

## Common Pitfalls

### Pitfall 1: Using Spacer for Consistent Gaps

```tsx
// BAD - Repetitive spacers
<div>
  <div>Item 1</div>
  <Spacer size={4} />
  <div>Item 2</div>
  <Spacer size={4} />
  <div>Item 3</div>
  <Spacer size={4} />
  <div>Item 4</div>
</div>

// GOOD - Use Stack with gap
<Stack direction="vertical" gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Stack>
```

### Pitfall 2: Magic Numbers

```tsx
// BAD - Arbitrary inline styles
<div style={{ marginTop: '23px' }}>Content</div>

// GOOD - Use Spacer with spacing scale
<Spacer size={6} />  {/* 24px from scale */}
<div>Content</div>
```

### Pitfall 3: Forgetting Direction

```tsx
// BAD - Vertical spacer in flex row
<div style={{ display: 'flex' }}>
  <button>Left</button>
  <Spacer size={4} />  {/* No effect - needs direction="horizontal" */}
  <button>Right</button>
</div>

// GOOD - Specify horizontal direction
<div style={{ display: 'flex' }}>
  <button>Left</button>
  <Spacer size={4} direction="horizontal" />
  <button>Right</button>
</div>
```

### Pitfall 4: Excessive Nesting

```tsx
// BAD - Unnecessary wrapper divs for spacing
<div>
  <div style={{ marginBottom: '24px' }}>
    <h1>Title</h1>
  </div>
  <div>
    <p>Content</p>
  </div>
</div>

// GOOD - Direct spacing with Spacer
<div>
  <h1>Title</h1>
  <Spacer size={6} />
  <p>Content</p>
</div>
```

### Pitfall 5: Layout Spacer

```tsx
// BAD - Using Spacer for layout
<div style={{ display: 'flex' }}>
  <aside>Sidebar</aside>
  <Spacer size={6} direction="horizontal" />
  <main>Content</main>
</div>

// GOOD - Use Grid for layout
<Grid columns={12} gap={6}>
  <GridItem span={3}>
    <aside>Sidebar</aside>
  </GridItem>
  <GridItem span={9}>
    <main>Content</main>
  </GridItem>
</Grid>
```

## Performance Considerations

### Zero Runtime Overhead

Spacer is a simple div with CSS classes:

```tsx
// No JavaScript computation
// Pure CSS height/width
<Spacer size={6} />

// Compiles to:
<div class="spacer vertical6" aria-hidden="true"></div>
```

### Responsive Performance

```tsx
// Efficient - Uses CSS custom properties
<Spacer size={{ xs: 4, lg: 8 }} />

// No resize listeners
// CSS media queries handle breakpoints
```

### CSS Module Benefits

- Minimal CSS output (~20 bytes per instance)
- Scoped class names
- Dead code elimination
- No style recalculation

### Memory Footprint

```tsx
// Extremely lightweight
// No state
// No effects
// No event listeners
<Spacer size={6} />
```

## Accessibility

### ARIA Hidden (ariaHidden)

Spacer is decorative and hidden from assistive technology:

```tsx
<Spacer size={6} />
// Renders with aria-hidden="true"
```

### Disable ARIA Hidden (Rare)

```tsx
// Only if Spacer contains semantic meaning (unusual)
<Spacer size={6} ariaHidden={false} />
```

### Semantic Structure

Spacer doesn't affect document structure:

```tsx
<article>
  <h1>Title</h1>
  <Spacer size={6} />
  <p>Content</p>
  {/* Screen reader: h1 → p (Spacer is ignored) */}
</article>
```

### Keyboard Navigation

Spacer is not focusable:

```tsx
<button>Button 1</button>
<Spacer size={4} />
<button>Button 2</button>
{/* Tab order: Button 1 → Button 2 */}
```

### Screen Reader Announcement

Spacer is completely transparent to screen readers:

```tsx
<div>
  <p>First paragraph</p>
  <Spacer size={8} />
  <p>Second paragraph</p>
</div>
// Screen reader: "First paragraph. Second paragraph."
// (Spacer is not announced)
```

## API Reference

### Props

```typescript
interface SpacerProps {
  // Size from spacing scale (0-10)
  size?: SpacingScale | ResponsiveObject;  // Default: 4
  
  // Direction of spacing
  direction?: "vertical" | "horizontal";   // Default: "vertical"
  
  // Custom CSS class
  className?: string;
  
  // ARIA hidden attribute
  ariaHidden?: boolean;                    // Default: true
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
  size: 4,
  direction: "vertical",
  ariaHidden: true
}
```

### Design Tokens

```css
/* Spacing tokens used by Spacer */
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

- **Stack** - Flexbox layout with automatic gaps
- **Grid** - Multi-dimensional layouts
- **Container** - Width constraints and padding
- **GridItem** - Grid cell positioning

## Design Principles

Spacer follows "The Spexop Way":

1. **Primitives before patterns** - Simple spacing primitive
2. **Tokens before magic numbers** - Uses spacing scale exclusively
3. **Composition before complexity** - Works with any layout
4. **Standards before frameworks** - Simple div with height/width
5. **Accessibility before aesthetics** - ARIA hidden, screen reader friendly

## Further Reading

- [Stack Component USAGE-GUIDE](../Stack/USAGE-GUIDE.md)
- [Container Component USAGE-GUIDE](../Container/USAGE-GUIDE.md)
- [Grid Primitives Guide](/docs/grid-primitives.md)
- [Spacing Scale Documentation](/docs/spacing-scale.md)

## License

MIT

## Author

Created by @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
