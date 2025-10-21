# StickySection Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A section component that sticks to the viewport during scrolling. Perfect for table of contents, navigation sidebars, and persistent headers.

## Features

- ✅ Sticky positioning
- ✅ Configurable top offset
- ✅ Optional background
- ✅ Z-index control
- ✅ Scroll boundary support
- ✅ Responsive behavior
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { StickySection } from '@spexop/react';

function App() {
  return (
    <StickySection top={0}>
      <nav>
        <a href="#section1">Section 1</a>
        <a href="#section2">Section 2</a>
      </nav>
    </StickySection>
  );
}
```

## Basic Usage

### Sticky Navigation

```tsx
<StickySection top={0}>
  <nav className="page-nav">
    <a href="#introduction">Introduction</a>
    <a href="#features">Features</a>
    <a href="#pricing">Pricing</a>
  </nav>
</StickySection>
```

### With Top Offset

```tsx
<StickySection top={64}> {/* Offset for header */}
  <div className="sidebar-nav">
    <h3>Table of Contents</h3>
    <ul>
      <li><a href="#section1">Section 1</a></li>
      <li><a href="#section2">Section 2</a></li>
    </ul>
  </div>
</StickySection>
```

### With Background

```tsx
<StickySection top={0} background={true}>
  <div className="sticky-toolbar">
    <Button>Action 1</Button>
    <Button>Action 2</Button>
  </div>
</StickySection>
```

## Common Patterns

### Table of Contents Sidebar

```tsx
function ArticleLayout() {
  return (
    <Grid columns={12} gap={8}>
      {/* Main content */}
      <GridItem span={9}>
        <article>
          <h1 id="introduction">Introduction</h1>
          <p>Content...</p>
          
          <h2 id="features">Features</h2>
          <p>Content...</p>
          
          <h2 id="usage">Usage</h2>
          <p>Content...</p>
        </article>
      </GridItem>
      
      {/* Sticky TOC */}
      <GridItem span={3}>
        <StickySection top={80}>
          <nav>
            <h3>On This Page</h3>
            <ul>
              <li><a href="#introduction">Introduction</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#usage">Usage</a></li>
            </ul>
          </nav>
        </StickySection>
      </GridItem>
    </Grid>
  );
}
```

### Sticky Actions Bar

```tsx
function EditorPage() {
  return (
    <div>
      <StickySection top={0} background={true}>
        <div className="editor-toolbar">
          <Button variant="ghost" onClick={handleSave}>Save</Button>
          <Button variant="ghost" onClick={handlePreview}>Preview</Button>
          <Button variant="primary" onClick={handlePublish}>Publish</Button>
        </div>
      </StickySection>
      
      <div className="editor-content">
        {/* Editor */}
      </div>
    </div>
  );
}
```

### Sticky Filters

```tsx
function ProductsPage() {
  return (
    <Grid columns={12} gap={6}>
      {/* Sticky filters */}
      <GridItem span={3}>
        <StickySection top={64}>
          <Card>
            <h3>Filters</h3>
            <Stack direction="vertical" gap={4}>
              <Select label="Category" value={category} onChange={setCategory}>
                <option value="">All</option>
                <option value="electronics">Electronics</option>
              </Select>
              
              <Slider
                label="Price Range"
                value={maxPrice}
                onChange={setMaxPrice}
                min={0}
                max={1000}
              />
              
              <Checkbox
                label="In Stock Only"
                checked={inStockOnly}
                onChange={setInStockOnly}
              />
            </Stack>
          </Card>
        </StickySection>
      </GridItem>
      
      {/* Products grid */}
      <GridItem span={9}>
        <Grid columns={3} gap={6}>
          {products.map(product => (
            <GridItem key={product.id}>
              <ProductCard {...product} />
            </GridItem>
          ))}
        </Grid>
      </GridItem>
    </Grid>
  );
}
```

## Props

```typescript
interface StickySectionProps {
  /** Content to make sticky */
  children: React.ReactNode;
  /** Top offset in pixels */
  top?: number;
  /** Show background */
  background?: boolean;
  /** Z-index value */
  zIndex?: number;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Simple positioning wrapper
2. **Borders before shadows** - Clean separation
3. **Standards before frameworks** - CSS position: sticky
4. **Composition before complexity** - Wraps any content

## Accessibility

- ✅ Maintains document flow
- ✅ Keyboard navigation preserved
- ✅ Screen reader compatible
- ✅ Focus management works normally

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+ (good sticky support)
- React 18+

## Related Components

- `Section` - Non-sticky sections
- `Container` - Width constraints
- `ScrollHeader` - Scroll-triggered header

## Best Practices

1. **Set appropriate offset** - Account for fixed headers
2. **Use sparingly** - Too many sticky elements confuse users
3. **Consider mobile** - May want to disable on small screens
4. **Test scrolling** - Ensure smooth performance
5. **Mind z-index** - Layer sticky elements correctly

## License

MIT
