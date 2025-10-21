# StickySection - Usage Guide

**Component Version**: v1.0.0
**Last Updated**: October 21, 2025
**Compatibility**: Stable API

## Quick Start

### Installation

```bash
pnpm add @spexop/react
```

### Basic Example

```tsx
import { StickySection, ContextNav } from '@spexop/react';

function App() {
  return (
    <StickySection
      variant="white"
      label="FEATURES"
      title="Core Features"
      contextNav={
        <ContextNav
          scope="section"
          number="01"
          title="Features"
          navLinks={[
            { label: "Performance", href: "#performance" },
            { label: "Security", href: "#security" }
          ]}
          topOffset={80}
        />
      }
    >
      <div id="performance">Performance content...</div>
      <div id="security">Security content...</div>
    </StickySection>
  );
}
```

## Why Use StickySection?

### The Problem

CSS `position: sticky` requires specific conditions to work:

1. No `overflow: hidden` or `overflow-x: hidden` on parent containers
2. Parent must have a scrollable ancestor
3. Proper layout structure
4. No conflicting transforms or perspective

### The Solution

StickySection automatically handles these requirements:

- Provides sticky-safe container wrapper
- Ensures proper layout structure
- Prevents overflow issues
- Maintains proper z-index stacking
- Auto-spacing between sections

## When to Use

### Use StickySection When

- You need ContextNav with sticky positioning ✅
- You want guaranteed sticky behavior ✅
- You have complex layouts with potential overflow issues ✅
- You're stacking multiple sticky navigation bars ✅

### Use Regular Section When

- You don't need sticky navigation ❌
- You have simple page structure ❌
- You have verified no overflow issues ❌

## Common Use Cases

### Section with Sticky Navigation

Most common use case:

```tsx
import { StickySection, ContextNav } from '@spexop/react';

function DocumentationSection() {
  return (
    <StickySection
      id="api-reference"
      variant="white"
      label="API"
      title="API Reference"
      description="Complete API documentation"
      contextNav={
        <ContextNav
          scope="section"
          number="02"
          title="API Reference"
          navLinks={[
            { label: "Props", href: "#props" },
            { label: "Methods", href: "#methods" },
            { label: "Events", href: "#events" }
          ]}
          topOffset={80}
        />
      }
    >
      <div id="props">Props documentation...</div>
      <div id="methods">Methods documentation...</div>
      <div id="events">Events documentation...</div>
    </StickySection>
  );
}
```

### Multiple Stacked Sections

Stack multiple sections with sticky navs:

```tsx
import { StickySection, ContextNav } from '@spexop/react';

function MultiSectionPage() {
  return (
    <>
      <StickySection
        id="features"
        variant="neutral"
        label="FEATURES"
        title="Key Features"
        contextNav={
          <ContextNav
            scope="section"
            number="01"
            title="Features"
            navLinks={featureLinks}
            topOffset={80}
          />
        }
      >
        {/* Features content */}
      </StickySection>
      
      <StickySection
        id="examples"
        variant="white"
        label="EXAMPLES"
        title="Usage Examples"
        contextNav={
          <ContextNav
            scope="section"
            number="02"
            title="Examples"
            navLinks={exampleLinks}
            topOffset={80}
          />
        }
      >
        {/* Examples content */}
      </StickySection>
      
      <StickySection
        id="api"
        variant="neutral"
        label="API"
        title="API Reference"
        contextNav={
          <ContextNav
            scope="section"
            number="03"
            title="API"
            navLinks={apiLinks}
            topOffset={80}
          />
        }
      >
        {/* API content */}
      </StickySection>
    </>
  );
}
```

### With Page-Level Navigation

Combine with page nav for multi-level navigation:

```tsx
import { ContextNav, StickySection } from '@spexop/react';

function ComplexPage() {
  return (
    <>
      {/* Page-level nav */}
      <ContextNav
        scope="page"
        title="Grid Component"
        navLinks={[
          { label: "Features", href: "#features" },
          { label: "API", href: "#api" },
          { label: "Examples", href: "#examples" }
        ]}
        topOffset={80}
      />
      
      {/* Section-level nav (stacks below page nav) */}
      <StickySection
        id="features"
        contextNav={
          <ContextNav
            scope="section"
            number="01"
            title="Features"
            navLinks={featureSubsections}
            stackBelow="page"
          />
        }
      >
        {/* Features content */}
      </StickySection>
    </>
  );
}
```

## Features and Props

StickySection accepts all Section props plus sticky-specific props:

### All Section Props

```tsx
<StickySection
  // Section props
  variant="white"
  padding="normal"
  marginBottom="normal"
  label="SECTION"
  title="Section Title"
  description="Section description"
  introAlign="center"
  maxWidth="xl"
  accent="left"
  border={true}
  // ... all other Section props
>
  {/* Content */}
</StickySection>
```

### Sticky-Specific Props

```tsx
<StickySection
  contextNav={<ContextNav />}  // ContextNav component
  stickySafe={true}            // Enable sticky-safe wrapper (default)
>
  {/* Content */}
</StickySection>
```

## How It Works

### Technical Details

StickySection wraps your Section in a sticky-safe container:

```tsx
// What StickySection does internally:
<div className="stickySection stickySafe">
  <Section
    contextNav={contextNav}
    {...sectionProps}
  >
    {children}
  </Section>
</div>
```

The wrapper:

- Has no overflow properties
- Uses proper layout structure
- Maintains z-index hierarchy
- Allows sticky positioning to work correctly

### Sticky Positioning Requirements

For ContextNav to stick properly:

1. **No overflow on parents**: ✅ StickySection ensures this
2. **Scrollable ancestor**: ✅ Page scroll provides this
3. **Proper layout**: ✅ StickySection wrapper provides this
4. **Z-index stacking**: ✅ Properly managed

## Common Issues and Solutions

### Issue: Sticky Nav Not Sticking

**Symptom**: ContextNav doesn't stay at the top when scrolling

**Cause**: Parent container has `overflow: hidden` or `overflow-x: hidden`

**Solution**: Use StickySection instead of Section

```tsx
{/* WRONG - Section may have overflow issues */}
<Section
  contextNav={<ContextNav topOffset={80} />}
>
  {/* Content */}
</Section>

{/* CORRECT - StickySection ensures proper behavior */}
<StickySection
  contextNav={<ContextNav topOffset={80} />}
>
  {/* Content */}
</StickySection>
```

### Issue: Multiple Navs Overlapping

**Symptom**: Multiple sticky navs stack on top of each other

**Solution**: Use `stackBelow` prop on ContextNav

```tsx
<ContextNav
  scope="page"
  title="Main Nav"
  topOffset={80}
/>

<StickySection
  contextNav={
    <ContextNav
      scope="section"
      title="Section Nav"
      stackBelow="page"  // Auto-calculates offset
      topOffset={80}
    />
  }
>
  {/* Content */}
</StickySection>
```

### Issue: Sticky Nav Jumps

**Symptom**: Nav position jumps when becoming sticky

**Cause**: Insufficient scroll distance or incorrect topOffset

**Solution**: Ensure adequate content height and correct offset

```tsx
<StickySection
  padding="spacious"  // More padding = more scroll distance
  contextNav={
    <ContextNav
      topOffset={80}  // Match your header height
      title="Features"
    />
  }
>
  {/* Ensure enough content for scrolling */}
  <div style={{ minHeight: '800px' }}>
    {/* Content */}
  </div>
</StickySection>
```

## Best Practices

### DO

- Use StickySection when you need ContextNav with sticky behavior
- Provide adequate content height for scrolling
- Use `stackBelow` for proper multi-level navigation
- Test sticky behavior on different screen sizes
- Ensure `topOffset` matches your header height
- Keep section content focused and well-organized

### DON'T

- Don't use StickySection if you don't need sticky navigation
- Don't nest StickySection inside containers with overflow properties
- Don't forget to test mobile behavior
- Don't use on very short sections (< 400px)
- Don't stack too many sticky navs (max 2-3)

## Comparison: StickySection vs Section

### StickySection

```tsx
<StickySection
  contextNav={<ContextNav />}
>
  {/* Sticky nav will work reliably */}
</StickySection>
```

**Pros**:

- Guarantees sticky positioning works ✅
- Handles overflow issues automatically ✅
- Proper layout structure ✅
- Best for complex layouts ✅

**Cons**:

- Extra wrapper div (minimal overhead)
- Only needed when using ContextNav

### Regular Section

```tsx
<Section
  contextNav={<ContextNav />}
>
  {/* Sticky nav may not work if parent has overflow */}
</Section>
```

**Pros**:

- Simpler structure ✅
- Fine for simple pages ✅

**Cons**:

- May break with overflow properties ❌
- Requires manual troubleshooting ❌

## Common Patterns

### Documentation Page

```tsx
function DocumentationPage() {
  return (
    <div>
      <ContextNav
        scope="page"
        title="Grid Component"
        navLinks={mainSections}
        topOffset={80}
      />
      
      <StickySection
        id="quick-start"
        variant="white"
        label="QUICK START"
        title="Getting Started"
        contextNav={
          <ContextNav
            scope="section"
            number="01"
            title="Quick Start"
            navLinks={quickStartLinks}
            stackBelow="page"
            topOffset={80}
          />
        }
      >
        {/* Quick start content */}
      </StickySection>
      
      <StickySection
        id="examples"
        variant="neutral"
        label="EXAMPLES"
        title="Usage Examples"
        contextNav={
          <ContextNav
            scope="section"
            number="02"
            title="Examples"
            navLinks={exampleLinks}
            stackBelow="page"
            topOffset={80}
          />
        }
      >
        {/* Examples content */}
      </StickySection>
    </div>
  );
}
```

### Marketing Page

```tsx
function MarketingPage() {
  return (
    <>
      <StickySection
        id="features"
        variant="gradient"
        label="FEATURES"
        title="What We Offer"
        description="Everything you need to succeed"
        accent="left"
        padding="spacious"
        contextNav={
          <ContextNav
            scope="section"
            number="01"
            title="Features"
            navLinks={[
              { label: "Fast", href: "#fast" },
              { label: "Secure", href: "#secure" },
              { label: "Scalable", href: "#scalable" }
            ]}
            topOffset={80}
          />
        }
      >
        <div id="fast">Fast features...</div>
        <div id="secure">Security features...</div>
        <div id="scalable">Scalability features...</div>
      </StickySection>
    </>
  );
}
```

## Accessibility

StickySection inherits all accessibility features from Section:

- Semantic HTML (`<section>`)
- Proper heading hierarchy
- Meaningful anchor IDs
- Keyboard navigation support
- Screen reader friendly

Plus ContextNav accessibility:

- Sticky navigation remains accessible
- Keyboard navigation works at all scroll positions
- Screen readers announce sticky state changes

## Performance

- Minimal overhead (single wrapper div)
- No JavaScript for sticky positioning (CSS only)
- GPU-accelerated sticky positioning
- Efficient layout calculations

## Styling

### Theme Integration

Inherits all Section styling:

- Background: `var(--theme-surface)`
- Text: `var(--theme-text)`
- Border: `var(--theme-border)`
- Spacing: `var(--theme-spacing-*)`

### Custom Styling

```tsx
<StickySection
  className="custom-sticky-section"
  style={{
    // Custom styles
  }}
>
  {/* Content */}
</StickySection>
```

## Debugging Sticky Issues

### Check These Items

1. ✅ Is `stickySafe` prop enabled (default: true)?
2. ✅ Does parent have `overflow` properties?
3. ✅ Is `topOffset` correct for your layout?
4. ✅ Is section tall enough for scrolling?
5. ✅ Are there conflicting CSS transforms?
6. ✅ Is z-index correct for stacking?

### Debug Mode

Enable debug mode to inspect structure:

```tsx
<StickySection
  contextNav={<ContextNav topOffset={80} />}
  style={{ outline: '2px solid red' }}  // Visualize wrapper
>
  {/* Content */}
</StickySection>
```

## Related Components

- **Section**: Base section component
- **ContextNav**: Sticky navigation component
- **Container**: For content width control
- **Grid/Stack**: For layout composition

## Examples

See the [README.md](./README.md) for comprehensive examples including:

- Documentation pages
- Marketing sections
- Multi-level navigation
- Troubleshooting guides
- And more

## Support

For issues, questions, or feature requests:

1. Check this usage guide
2. Review the [README.md](./README.md)
3. Check Section and ContextNav documentation
4. Search existing GitHub issues
5. Create a new issue with reproduction

## Summary

StickySection provides:

- Guaranteed sticky positioning for ContextNav
- Automatic handling of overflow issues
- Proper layout structure
- All Section features
- Simple integration
- No JavaScript overhead
- Complete accessibility
- Debugging support

Perfect for:

- Documentation pages with navigation
- Long-form content with subsections
- Marketing pages with features
- Any section needing sticky navigation

Use when you need reliable sticky positioning for ContextNav.

Built with Spexop design principles for a refined, accessible user experience.
