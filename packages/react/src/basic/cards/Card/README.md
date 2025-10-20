# Card Component

**Flexible container component** for displaying structured content with Refined Minimalism aesthetic and sub-component composition.

## Features

- ✅ **Border-Based Design**: Clean 2px borders (no heavy shadows)
- ✅ **Sub-Component Composition**: CardHeader, CardBody, CardFooter for flexibility
- ✅ **Density Variants**: Compact (16px), Normal (24px), Spacious (32px) for different contexts
- ✅ **6+ Visual Variants**: basic, highlighted, outlined, interactive, ghost, elevated
- ✅ **High Contrast**: WCAG AAA accessible colors (9:1+ contrast)
- ✅ **Minimal Effects**: Border-color changes only (no transforms)
- ✅ **Theme-Aware**: Automatic light and dark mode support
- ✅ **TypeScript**: Full type safety with comprehensive prop types
- ✅ **Clickable**: Transforms to semantic button element
- ✅ **Responsive**: Works seamlessly with Grid system

---

## Quick Start

### New API (Recommended)

```tsx
import { Card, CardHeader, CardBody, CardFooter, Button } from '@spexop/react';

<Card variant="highlighted" density="normal">
  <CardHeader title="Card Title" subtitle="Subtitle text" />
  <CardBody>
    <p>Main content goes here with optimal line-height for readability.</p>
  </CardBody>
  <CardFooter align="right">
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Submit</Button>
  </CardFooter>
</Card>
```

### Old API (Backward Compatible)

```tsx
import { Card } from '@spexop/react';
import { Package } from '@spexop/icons';

// Still works with deprecation warnings in development
<Card 
  icon={<Package />} 
  title="Feature Title" 
  description="Feature description"
  density="compact"
>
  Additional content
</Card>
```

---

## Component API

### Card Props

```typescript
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: 'basic' | 'highlighted' | 'outlined' | 'interactive' | 'ghost' | 'elevated' | 'default' | 'outline';
  
  /** Spacing density (padding scale) */
  density?: 'compact' | 'normal' | 'spacious';
  
  /** Transform to button element when clickable */
  clickable?: boolean;
  
  /** Stretch card to 100% height of container */
  fullHeight?: boolean;
  
  /** Card content */
  children: ReactNode;
  
  /** Additional CSS class */
  className?: string;
  
  /** HTML id for anchor links */
  id?: string;
  
  /** Click handler (requires clickable=true for button element) */
  onClick?: () => void;
}

**Note on `id` prop**: The Card component is excluded from Biome's `useUniqueElementIds` rule because it's commonly used with static IDs for navigation and deep linking purposes (e.g., in feature sections with ContextNav). This is intentional and safe for this component.
```

### CardHeader Props

```typescript
interface CardHeaderProps {
  /** Header title */
  title?: string;
  
  /** Optional subtitle */
  subtitle?: string;
  
  /** Optional badge/tag */
  badge?: ReactNode;
  
  /** Hide bottom border */
  noBorder?: boolean;
  
  /** Custom content (if not using title/subtitle) */
  children?: ReactNode;
  
  /** Additional CSS class */
  className?: string;
}
```

### CardBody Props

```typescript
interface CardBodyProps {
  /** Body content */
  children: ReactNode;
  
  /** Additional CSS class */
  className?: string;
}
```

### CardFooter Props

```typescript
interface CardFooterProps {
  /** Footer content (typically buttons) */
  children: ReactNode;
  
  /** Content alignment */
  align?: 'left' | 'center' | 'right' | 'between';
  
  /** Hide top border */
  noBorder?: boolean;
  
  /** Additional CSS class */
  className?: string;
}
```

---

## Variants

### Basic (Default)

2px neutral border on white background.

```tsx
<Card variant="basic">
  <CardHeader title="Basic Card" subtitle="Default styling" />
  <CardBody>
    <p>Clean border separation with typography-driven hierarchy.</p>
  </CardBody>
</Card>
```

**Use Case**: Default cards, general content

### Highlighted

2px red border for emphasis.

```tsx
<Card variant="highlighted">
  <CardHeader title="Important" subtitle="Featured content" />
  <CardBody>
    <p>Red border draws attention to priority information.</p>
  </CardBody>
</Card>
```

**Use Case**: Featured content, important messages, priority items

### Outlined

3px bold border for strong structure.

```tsx
<Card variant="outlined">
  <CardHeader title="Strong Structure" subtitle="Bold borders" />
  <CardBody>
    <p>Thick border creates maximum visual emphasis.</p>
  </CardBody>
</Card>
```

**Use Case**: Important notices, structural emphasis, warnings

### Interactive

Hover changes border to red (indicates interactivity).

```tsx
<Card variant="interactive" clickable onClick={handleClick}>
  <CardHeader title="Click Me" />
  <CardBody>
    <p>Hover to see red border. Cursor changes to pointer.</p>
  </CardBody>
</Card>
```

**Use Case**: Clickable cards, navigation cards, selectable items

### Ghost

Dashed border with transparent background.

```tsx
<Card variant="ghost">
  <CardHeader title="Placeholder" subtitle="Click to add" />
  <CardBody>
    <p>Dashed border indicates placeholder state.</p>
  </CardBody>
</Card>
```

**Use Case**: Placeholders, add new item cards, draft content

### Elevated

Colored background variant (kept for backward compatibility).

```tsx
<Card variant="elevated">
  <CardHeader title="Elevated Card" />
  <CardBody>
    <p>Subtle colored background for emphasis.</p>
  </CardBody>
</Card>
```

**Use Case**: Special emphasis, backward compatibility

---

## Density Variants

### Compact (16px padding)

For high-density dashboards and compact interfaces.

```tsx
<Card density="compact">
  <CardHeader title="Compact Title" subtitle="16px title" />
  <CardBody>Dashboard context with tight spacing.</CardBody>
</Card>
```

**Context**: Dashboards, admin panels, data-heavy interfaces

### Normal (24px padding) - Default

For general-purpose cards and balanced layouts.

```tsx
<Card density="normal">
  <CardHeader title="Normal Title" subtitle="20px title" />
  <CardBody>Default spacing for most use cases.</CardBody>
</Card>
```

**Context**: General UI, standard layouts, component libraries

### Spacious (32px padding)

For content-focused interfaces and reading experiences.

```tsx
<Card density="spacious">
  <CardHeader title="Spacious Title" subtitle="24px title" />
  <CardBody>Generous spacing for content focus and readability.</CardBody>
</Card>
```

**Context**: Blogs, articles, marketing pages, landing pages

---

## Usage Examples

### Basic Structure

```tsx
<Card variant="basic" density="normal">
  <CardHeader title="Card Title" subtitle="Subtitle" />
  <CardBody>
    <p>Main content area with optimal line-height.</p>
  </CardBody>
  <CardFooter align="right">
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Submit</Button>
  </CardFooter>
</Card>
```

### Clickable Card

```tsx
<Card 
  clickable 
  onClick={() => navigate('/details')} 
  variant="interactive"
>
  <CardHeader title="Navigate Here" />
  <CardBody>
    <p>Entire card is clickable and renders as button element.</p>
  </CardBody>
</Card>
```

### With Badge

```tsx
<Card variant="highlighted">
  <CardHeader 
    title="Priority Task" 
    subtitle="Due today"
    badge={<Badge variant="error">Urgent</Badge>}
  />
  <CardBody>
    <p>Complete the refactoring by end of day.</p>
  </CardBody>
  <CardFooter align="right">
    <Button variant="primary">Start Task</Button>
  </CardFooter>
</Card>
```

### Full Height in Grid

```tsx
<Grid columns={{ xs: 1, md: 3 }} gap={6}>
  <Card fullHeight density="compact">
    <CardHeader title="Short Content" />
    <CardBody>
      <p>Small amount of text.</p>
    </CardBody>
    <CardFooter align="right">
      <Button>Action</Button>
    </CardFooter>
  </Card>
  
  <Card fullHeight density="compact">
    <CardHeader title="Long Content" />
    <CardBody>
      <p>
        This card has much more content that takes up more space. 
        The CardBody expands (flex: 1) to fill available space, 
        ensuring both cards have equal height and footers align.
      </p>
    </CardBody>
    <CardFooter align="right">
      <Button>Action</Button>
    </CardFooter>
  </Card>
</Grid>
```

### Without Borders

```tsx
<Card variant="basic">
  <CardHeader title="No Border Header" noBorder={true} />
  <CardBody>
    <p>Content flows seamlessly without border separation.</p>
  </CardBody>
  <CardFooter noBorder={true} align="center">
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>
```

---

## Composition Patterns

### Highlight Card (Icon on Left)

```tsx
<Card variant="highlighted" density="spacious">
  <div style={{ 
    display: 'flex', 
    gap: 'var(--s-spacing-6)', 
    alignItems: 'flex-start' 
  }}>
    <div style={{
      width: '80px',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid var(--s-color-red-500)',
      borderRadius: 'var(--s-radius-md)',
      color: 'var(--s-color-red-500)'
    }}>
      <Zap size={56} strokeWidth={2} />
    </div>
    <div style={{ flex: 1 }}>
      <h3 style={{
        fontSize: 'var(--s-font-size-2xl)',
        fontWeight: 'var(--s-font-weight-bold)',
        marginBottom: 'var(--s-spacing-3)'
      }}>
        Lightning Fast
      </h3>
      <p style={{ marginBottom: 'var(--s-spacing-4)' }}>
        Optimized for speed with minimal bundle size.
      </p>
      <Button variant="primary">Learn More</Button>
    </div>
  </div>
</Card>
```

### Notification Card (Left Border Accent)

```tsx
<Card style={{ borderLeft: '4px solid var(--s-color-red-500)' }}>
  <div style={{ 
    display: 'flex', 
    gap: 'var(--s-spacing-4)', 
    alignItems: 'flex-start' 
  }}>
    <CheckCircle size={24} strokeWidth={2} />
    <div>
      <h3 style={{
        margin: 0,
        fontSize: 'var(--s-font-size-lg)',
        fontWeight: 'var(--s-font-weight-bold)',
        marginBottom: 'var(--s-spacing-2)'
      }}>
        Success
      </h3>
      <p style={{ margin: 0 }}>
        Your changes have been saved successfully.
      </p>
    </div>
  </div>
</Card>
```

### Stats Card (Typography-Driven)

```tsx
<Card variant="basic" density="normal">
  <div style={{ textAlign: 'center' }}>
    <div style={{
      fontSize: 'var(--s-font-size-4xl)',
      fontWeight: 'var(--s-font-weight-bold)',
      color: 'var(--s-color-red-500)',
      marginBottom: 'var(--s-spacing-2)'
    }}>
      12.5K
    </div>
    <div style={{
      fontSize: 'var(--s-font-size-sm)',
      fontWeight: 'var(--s-font-weight-semibold)',
      color: 'var(--s-color-neutral-600)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }}>
      Total Users
    </div>
  </div>
</Card>
```

---

## Grid Integration

### Responsive Card Grid

```tsx
import { Grid, Container, Card, CardHeader, CardBody } from '@spexop/react';

<Container maxWidth="2xl" padding={6}>
  <Grid columns={{ xs: 1, md: 2, lg: 4 }} gap={6}>
    <Card>
      <CardHeader title="Fast" />
      <CardBody>Lightning performance</CardBody>
    </Card>
    <Card>
      <CardHeader title="Secure" />
      <CardBody>Type-safe APIs</CardBody>
    </Card>
    <Card>
      <CardHeader title="Accessible" />
      <CardBody>WCAG AAA compliant</CardBody>
    </Card>
    <Card>
      <CardHeader title="Responsive" />
      <CardBody>Mobile-first design</CardBody>
    </Card>
  </Grid>
</Container>
```

### Dashboard with Sidebar

```tsx
import { Grid, GridItem, Container, Card } from '@spexop/react';

<Container maxWidth="full" padding={6}>
  <Grid columns={12} gap={6}>
    <GridItem span={{ xs: 12, lg: 3 }}>
      <Card fullHeight>
        <CardHeader title="Quick Stats" />
        <CardBody>
          {/* Stats content */}
        </CardBody>
      </Card>
    </GridItem>
    
    <GridItem span={{ xs: 12, lg: 9 }}>
      <Grid columns={{ xs: 1, md: 2 }} gap={6}>
        <Card fullHeight>
          <CardHeader title="Content 1" />
          <CardBody>Main content</CardBody>
        </Card>
        <Card fullHeight>
          <CardHeader title="Content 2" />
          <CardBody>Main content</CardBody>
        </Card>
      </Grid>
    </GridItem>
  </Grid>
</Container>
```

---

## Accessibility

### Semantic HTML

**CardHeader** uses `<h3>` for titles:

```tsx
<CardHeader title="Semantic Title" />
// Renders: <h3>Semantic Title</h3>
```

**Clickable cards** render as `<button>`:

```tsx
<Card clickable onClick={handleClick}>
  Content
</Card>
// Renders: <button>...</button>
```

### Keyboard Navigation

Clickable cards are fully keyboard accessible:

- **Tab**: Navigate to card
- **Enter/Space**: Activate card
- **Focus indicator**: 2px red outline

### Color Contrast

All text meets WCAG AAA standards:

- **Title**: 15:1 contrast (AAA)
- **Body**: 9:1 contrast (AAA)  
**Subtitle**: 7:1 contrast (AA+)

### High Contrast Mode

Automatically adapts:

```css
@media (prefers-contrast: high) {
  .card {
    border-width: 2px;
  }
  .card__title {
    font-weight: 800; /* Bolder */
  }
}
```

### Reduced Motion

Respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
```

---

## Design Tokens

### Spacing

```bash
--s-spacing-4: 16px   # Compact density
--s-spacing-6: 24px   # Normal density (default)
--s-spacing-8: 32px   # Spacious density
```

### Colors

```bash
# Backgrounds
--s-color-white         # Light mode cards
--s-color-neutral-900   # Dark mode cards

# Borders
--s-color-neutral-200   # Default border
--s-color-neutral-300   # Hover border
--s-color-red-500       # Highlighted border
--s-color-neutral-900   # Outlined border (bold)

# Text
--s-color-neutral-900   # Titles (light mode)
--s-color-neutral-700   # Body (light mode)
--s-color-neutral-600   # Subtitle (light mode)
```

### Typography

```bash
# Font Sizes (density-based for titles)
--s-font-size-base: 16px    # Compact title
--s-font-size-xl: 20px      # Normal title
--s-font-size-2xl: 24px     # Spacious title
--s-font-size-sm: 14px      # Subtitle

# Font Weights
--s-font-weight-bold: 700      # Titles
--s-font-weight-normal: 400    # Body, subtitle

# Line Heights
--s-line-height-tight: 1.25    # Titles
--s-line-height-relaxed: 1.625 # Body (optimal readability)
```

### Border Radius

```bash
--s-radius-lg: 8px   # Card corners
--s-radius-md: 6px   # Icon containers
```

---

## Advanced Examples

### Form Card

```tsx
<Card density="normal">
  <CardHeader title="Login" subtitle="Enter your credentials" />
  <CardBody>
    <Stack direction="vertical" gap={3}>
      <input 
        type="email" 
        placeholder="Email"
        style={{
          padding: 'var(--s-spacing-3)',
          border: '2px solid var(--s-color-neutral-200)',
          borderRadius: 'var(--s-radius-md)',
          fontSize: 'var(--s-font-size-base)',
          width: '100%'
        }}
      />
      <input 
        type="password" 
        placeholder="Password"
        style={{
          padding: 'var(--s-spacing-3)',
          border: '2px solid var(--s-color-neutral-200)',
          borderRadius: 'var(--s-radius-md)',
          fontSize: 'var(--s-font-size-base)',
          width: '100%'
        }}
      />
    </Stack>
  </CardBody>
  <CardFooter align="right">
    <Button variant="ghost">Forgot Password</Button>
    <Button variant="primary">Log In</Button>
  </CardFooter>
</Card>
```

### Product Card

```tsx
<Card fullHeight>
  <CardBody>
    <img 
      src="product.jpg" 
      alt="Product" 
      style={{ 
        width: '100%', 
        borderRadius: 'var(--s-radius-md)',
        marginBottom: 'var(--s-spacing-4)'
      }} 
    />
    <h3 style={{
      fontSize: 'var(--s-font-size-xl)',
      fontWeight: 'var(--s-font-weight-bold)',
      marginBottom: 'var(--s-spacing-2)'
    }}>
      Product Name
    </h3>
    <p style={{ 
      marginBottom: 'var(--s-spacing-4)',
      flex: 1
    }}>
      Product description goes here with details.
    </p>
  </CardBody>
  <CardFooter align="between">
    <span style={{ 
      fontSize: 'var(--s-font-size-xl)', 
      fontWeight: 'var(--s-font-weight-bold)' 
    }}>
      $99.99
    </span>
    <Button variant="primary">Add to Cart</Button>
  </CardFooter>
</Card>
```

### Article Card

```tsx
<Card density="spacious" clickable onClick={handleRead}>
  <CardHeader 
    title="Understanding Design Systems" 
    subtitle="Oct 13, 2025"
  />
  <CardBody>
    <p>
      A comprehensive guide to building scalable design systems 
      with modern web technologies and best practices.
    </p>
  </CardBody>
  <CardFooter align="between">
    <div style={{ 
      display: 'flex', 
      gap: 'var(--s-spacing-3)',
      fontSize: 'var(--s-font-size-sm)',
      color: 'var(--s-color-neutral-600)'
    }}>
      <User size={16} />
      <span>Jane Doe</span>
      <span>•</span>
      <span>5 min read</span>
    </div>
    <Button variant="primary">Read Article</Button>
  </CardFooter>
</Card>
```

---

## Migration Guide

### From Old API to New API

#### Before (Deprecated)

```tsx
<Card 
  icon={<Icon name="zap" />} 
  title="Old API" 
  description="Using deprecated props"
  density="compact"
>
  Additional content
</Card>
```

#### After (Recommended)

```tsx
<Card density="compact">
  <CardHeader title="New API" subtitle="Using sub-components" />
  <CardBody>
    <div style={{ display: 'flex', gap: 'var(--s-spacing-3)', alignItems: 'center' }}>
      <Zap size={24} />
      <p>Additional content</p>
    </div>
  </CardBody>
</Card>
```

### Breaking Changes

**None!** Old API still works with deprecation warnings in development.

### Deprecation Warnings

The following props show warnings in development mode and will be removed in v2.0.0:

- `icon` → Compose icons in CardBody or custom layout
- `title` → Use CardHeader title prop
- `description` → Use CardBody with content
- `size` → Use density prop

### Variant Aliases

The following variant names are aliases and both work:

- `variant="default"` → Same as `variant="basic"`
- `variant="outline"` → Same as `variant="outlined"`

---

## Design Principles

### Borders Before Shadows

Cards use 2px borders for separation, not heavy shadows:

```css
/* ✅ CORRECT */
.card {
  border: 2px solid var(--s-color-neutral-200);
}

/* ❌ AVOID */
.card {
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}
```

### Typography Before Decoration

Hierarchy created through bold weights and clear sizes:

```css
/* ✅ CORRECT */
.card__title {
  font-size: var(--s-font-size-xl);
  font-weight: var(--s-font-weight-bold);
}

/* ❌ AVOID */
.card__title {
  font-size: 18px;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### Minimal Decoration

Effects only when purposeful (hover indicates interaction):

```css
/* ✅ CORRECT - Purposeful hover */
.card--interactive:hover {
  border-color: var(--s-color-red-500);
}

/* ❌ AVOID - Decorative */
.card:hover {
  transform: scale(1.05) rotate(2deg);
  filter: brightness(1.2);
}
```

---

## Troubleshooting

### Card not rendering as button?

Make sure `clickable={true}` is set:

```tsx
<Card clickable onClick={handleClick}>
  {/* Will render as <button> */}
</Card>
```

### Cards have different heights in Grid?

Use `fullHeight` prop:

```tsx
<Grid columns={{ xs: 1, md: 3 }} gap={6}>
  <Card fullHeight>Content 1</Card>
  <Card fullHeight>Much longer content 2</Card>
  <Card fullHeight>Content 3</Card>
</Grid>
```

### Footer not at bottom?

Ensure CardBody has content or add `fullHeight` to Card:

```tsx
<Card fullHeight>
  <CardHeader title="Title" />
  <CardBody>
    {/* flex: 1 pushes footer down */}
  </CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

### Deprecation warnings in console?

Migrate to sub-components:

```tsx
// Old (with warnings)
<Card title="Title" description="Desc" />

// New (no warnings)
<Card>
  <CardHeader title="Title" />
  <CardBody><p>Desc</p></CardBody>
</Card>
```

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Requires CSS Grid and CSS Custom Properties support.

---

## Related Components

- **Grid** - Layout cards in responsive grids
- **Container** - Wrap card grids with max-width
- **Button** - Action buttons in CardFooter
- **Badge** - Status badges in CardHeader
- **Stack** - Vertical/horizontal spacing

---

## Further Reading

- [HTML Showcase](../../../temp-docs/cards-refactoring/card-styles-showcase.html) - All variants visualized
- [Component Development Guide](../../../../../docs/component-development.md) - Development patterns
- [Design Tokens Reference](../../../../../docs/tokens-quick-reference.txt) - All 379 tokens
- [Grid System Guide](../../../../../docs/grid-foundation.md) - Layout fundamentals

---

**Version**: 1.0.0 (Refactored 2025-10-13)  
**Status**: Stable  
**Bundle Size**: ~2KB (gzipped)
