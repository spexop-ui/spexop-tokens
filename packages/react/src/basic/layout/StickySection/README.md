# StickySection Component

A wrapper component that ensures ContextNav sticky positioning works correctly by automatically handling CSS requirements and layout constraints.

## Overview

The `StickySection` component is a specialized wrapper around the `Section` component that automatically handles the CSS requirements for `position: sticky` to work properly. It prevents common issues that break sticky positioning and provides a safe container for ContextNav components.

## Key Features

- **Automatic Sticky Safety**: Prevents CSS properties that break sticky positioning
- **No Overflow Issues**: Ensures no `overflow-x: hidden` or similar properties
- **Layout Optimization**: Uses `contain: layout` for better performance
- **Full Section API**: Inherits all Section component props and features
- **ContextNav Integration**: Designed specifically for ContextNav components

## Props

```tsx
interface StickySectionProps extends Omit<SectionProps, 'children'> {
  /** Section content */
  children: ReactNode;
  
  /** ContextNav component - will be rendered with proper sticky positioning */
  contextNav?: ReactNode;
  
  /** Whether to apply sticky-safe layout (default: true) */
  stickySafe?: boolean;
}
```

### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Section content |
| `contextNav` | `ReactNode` | - | ContextNav component for sticky navigation |
| `stickySafe` | `boolean` | `true` | Enable sticky-safe layout optimizations |
| `...sectionProps` | `SectionProps` | - | All other Section component props |

## Basic Usage

```tsx
import { StickySection, ContextNav, Grid, GridItem } from '@spexop/react';

<StickySection
  variant="white"
  label="FEATURES"
  title="Our Features"
  contextNav={
    <ContextNav
      number="01"
      title="Features"
      topOffset={80}
      navLinks={[
        { label: "Feature 1", href: "#feature1" },
        { label: "Feature 2", href: "#feature2" },
        { label: "Feature 3", href: "#feature3" }
      ]}
    />
  }
>
  <Grid columns={{ xs: 1, md: 3 }} gap={6}>
    <GridItem>
      <div id="feature1">Feature 1 Content</div>
    </GridItem>
    <GridItem>
      <div id="feature2">Feature 2 Content</div>
    </GridItem>
    <GridItem>
      <div id="feature3">Feature 3 Content</div>
    </GridItem>
  </Grid>
</StickySection>
```

## Advanced Usage

### Multiple StickySections

```tsx
<div className={styles.page}>
  <StickySection
    variant="gradient"
    label="SECTION 1"
    title="First Section"
    contextNav={
      <ContextNav number="01" title="First" topOffset={80} />
    }
  >
    {/* Content */}
  </StickySection>

  <StickySection
    variant="white"
    label="SECTION 2"
    title="Second Section"
    contextNav={
      <ContextNav number="02" title="Second" topOffset={80} />
    }
  >
    {/* Content */}
  </StickySection>
</div>
```

### With All Section Features

```tsx
<StickySection
  variant="neutral"
  padding="spacious"
  label="COMPREHENSIVE"
  title="Full Featured Section"
  description="This section uses all available features"
  accent="left"
  accentColor="#10b981"
  borderColor="rgba(16, 185, 129, 0.3)"
  maxWidth="lg"
  containerPadding={{ xs: 4, md: 8 }}
  contextNav={
    <ContextNav
      number="01"
      title="Comprehensive"
      topOffset={80}
      navLinks={[
        { label: "Overview", href: "#overview" },
        { label: "Details", href: "#details" },
        { label: "Examples", href: "#examples" }
      ]}
    />
  }
>
  <div id="overview">Overview content</div>
  <div id="details">Details content</div>
  <div id="examples">Examples content</div>
</StickySection>
```

## CSS Classes

### `.stickySection`

Base wrapper class that ensures sticky positioning works:

```css
.stickySection {
  width: 100%;
  max-width: 100vw; /* Use max-width for horizontal constraints */
  /* No overflow properties - they break sticky positioning */
}
```

### `.stickySafe`

Additional safety measures (applied when `stickySafe={true}`):

```css
.stickySafe {
  contain: layout; /* Optimize layout calculations */
  position: relative; /* Create positioning context */
}
```

## Page Layout Integration

### Correct Page Structure

```tsx
// ✅ CORRECT - StickySection handles sticky requirements
function MyPage() {
  return (
    <div className={styles.page}>
      <StickySection contextNav={<ContextNav ... />}>
        {/* Content */}
      </StickySection>
      
      <StickySection contextNav={<ContextNav ... />}>
        {/* Content */}
      </StickySection>
    </div>
  );
}
```

```css
/* ✅ CORRECT - Page CSS that works with sticky */
.page {
  background: var(--s-color-gray-50);
  min-height: 100vh;
  padding: var(--s-spacing-8);
  /* StickySection handles sticky requirements */
}
```

### Migration from Regular Section

```tsx
// ❌ BEFORE - Manual sticky handling
<Section
  contextNav={
    <ContextNav number="01" title="Features" topOffset={80} />
  }
>
  {/* Content */}
</Section>

// ✅ AFTER - Automatic sticky safety
<StickySection
  contextNav={
    <ContextNav number="01" title="Features" topOffset={80} />
  }
>
  {/* Content */}
</StickySection>
```

## What StickySection Prevents

### 1. Overflow Issues

```css
/* ❌ BREAKS STICKY - StickySection prevents this */
.layout {
  overflow-x: hidden; /* Creates new containing block */
  overflow-y: auto;
}

/* ✅ SAFE - StickySection uses max-width instead */
.stickySection {
  max-width: 100vw; /* No overflow needed */
}
```

### 2. Flex Layout Issues

```css
/* ⚠️ CAN CAUSE ISSUES - StickySection avoids this */
.page {
  display: flex;
  flex-direction: column;
  gap: 40px; /* Can interfere with sticky */
}

/* ✅ BETTER - Use StickySection + Section margins */
.stickySection {
  /* Clean block layout */
}
```

## Performance

- **Layout Containment**: Uses `contain: layout` for optimized layout calculations
- **Minimal Overhead**: Wrapper adds minimal DOM nodes
- **CSS Optimization**: Avoids expensive overflow calculations

## Accessibility

- Inherits all accessibility features from Section component
- Maintains proper heading hierarchy
- Preserves focus management for ContextNav

## Browser Support

- **Modern Browsers**: Full support for `position: sticky`
- **Fallback**: Graceful degradation on older browsers
- **CSS Containment**: Progressive enhancement

## Common Issues

### ContextNav Still Not Sticking

1. **Check topOffset**: Ensure `topOffset` prop is provided to ContextNav
2. **Verify parent containers**: Ensure no parent has `overflow` properties
3. **Check section height**: Section must be tall enough for sticky behavior
4. **Browser DevTools**: Check computed styles for `position: sticky`

### Debugging Steps

```tsx
// Add debugging
<StickySection
  stickySafe={false} // Temporarily disable to isolate issues
  contextNav={<ContextNav topOffset={80} />}
>
  {/* Content */}
</StickySection>
```

## Integration with Other Components

### With ServiceCard

```tsx
<StickySection
  contextNav={<ContextNav number="01" title="Services" topOffset={80} />}
>
  <Grid columns={{ xs: 1, md: 2 }} gap={6}>
    <ServiceCard
      id="service1"
      number="01"
      title="Service 1"
      description="Description"
    />
    <ServiceCard
      id="service2"
      number="02"
      title="Service 2"
      description="Description"
    />
  </Grid>
</StickySection>
```

### With Card Components

```tsx
<StickySection
  contextNav={<ContextNav number="01" title="Features" topOffset={80} />}
>
  <Grid columns={{ xs: 1, md: 3 }} gap={6}>
    <Card id="feature1" fullHeight>
      <CardHeader title="Feature 1" />
      <CardBody>Content</CardBody>
    </Card>
  </Grid>
</StickySection>
```

## Version History

### 1.0.0 (2025-10-14)

- Initial release
- Automatic sticky positioning safety
- Full Section component API compatibility
- ContextNav integration optimization
- Performance optimizations with CSS containment
