# ServiceCard Component

Specialized card component for service/feature showcases with numbered badges, hover animations, and relationship indicators.

## Features

- 🔢 **Numbered Badges** - Sequential numbering (01, 02, 03, etc.) with hover animation
- 🎨 **Hover Animations** - Left accent bar slides down, number badge scales and changes color
- 🏷️ **Meta Tags** - Relationship indicators (e.g., "Foundation → Features")
- ⭐ **Featured Variant** - Full-width emphasis with gradient background
- 🎭 **Palette Integration** - Works with all 5 color palettes (Red, Blue, Green, Purple, Neutral)
- ♿ **Accessibility** - WCAG AAA compliant with proper ARIA labels

---

## Installation

```bash
npm install @spexop/react @spexop/theme
```

---

## Basic Usage

```tsx
import { ServiceCard } from '@spexop/react';

function MyPage() {
  return (
    <ServiceCard
      number="01"
      title="Primitives First"
      description="Master five grid primitives before building complex layouts. Grid, Container, Stack, GridItem, and Spacer form the foundation."
      meta="Foundation → Features"
    />
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "featured"` | `"default"` | Card variant |
| `number` | `string` | - | Sequential badge (e.g., "01") |
| `title` | `string` | *Required* | Service title (h3) |
| `description` | `string` | *Required* | Service description (p) |
| `meta` | `string` | - | Relationship tag |
| `density` | `"compact" \| "normal" \| "spacious"` | `"spacious"` | Spacing (16px/24px/32px) |
| `onClick` | `() => void` | - | Click handler |
| `className` | `string` | - | Additional CSS class |
| `id` | `string` | - | HTML id for anchor links (see note below) |
| `children` | `ReactNode` | - | Additional content |

**Note on `id` prop**: The ServiceCard component is excluded from Biome's `useUniqueElementIds` rule because it's commonly used with static IDs for navigation and deep linking purposes (e.g., in feature sections with ContextNav). This is intentional and safe for this component.

---

## Variants

### Default Variant

Standard service card with interactive hover states.

```tsx
<ServiceCard
  number="02"
  title="Borders Before Shadows"
  description="Clean 2px borders define structure. No heavy drop shadows or blur effects."
  meta="Structure → Clarity"
/>
```

### Featured Variant

Full-width emphasis with gradient background and 3px primary-colored border.

```tsx
<ServiceCard
  variant="featured"
  number="05"
  title="Composition Before Complexity"
  description="Build complex interfaces by composing simple, well-tested primitives."
  meta="Simplicity → Power"
/>
```

---

## Density Options

### Compact (16px padding)

For dashboard contexts with tight spacing.

```tsx
<ServiceCard
  density="compact"
  title="Dashboard Metric"
  description="Concise information display."
/>
```

### Normal (24px padding)

Default, balanced spacing for general use.

```tsx
<ServiceCard
  density="normal"
  title="Standard Service"
  description="Balanced spacing for most contexts."
/>
```

### Spacious (32px padding)

For content/blog contexts with generous spacing.

```tsx
<ServiceCard
  density="spacious"
  title="Featured Service"
  description="Generous spacing for emphasis and readability."
/>
```

---

## Grid Layouts

### Asymmetric Grid (7/5 columns)

```tsx
import { Grid, GridItem, ServiceCard } from '@spexop/react';

<Grid columns={12} gap={6}>
  <GridItem span={{ xs: 12, md: 7 }}>
    <ServiceCard
      number="01"
      title="Larger Card"
      description="Takes 7 columns on desktop."
      meta="Foundation → Features"
    />
  </GridItem>
  
  <GridItem span={{ xs: 12, md: 5 }}>
    <ServiceCard
      number="02"
      title="Smaller Card"
      description="Takes 5 columns on desktop."
      meta="Structure → Clarity"
    />
  </GridItem>
</Grid>
```

### Full-Width Featured Card

```tsx
<Grid columns={12} gap={6}>
  <GridItem span={12}>
    <ServiceCard
      variant="featured"
      number="05"
      title="Full-Width Feature"
      description="Emphasized with gradient and full width."
      meta="Simplicity → Power"
    />
  </GridItem>
</Grid>
```

---

## Interactive Cards

Make cards clickable by providing an `onClick` handler:

```tsx
<ServiceCard
  number="01"
  title="Clickable Service"
  description="Click me to navigate or trigger an action."
  meta="Interaction → Engagement"
  onClick={() => navigate('/service-details')}
/>
```

**Note**: When `onClick` is provided, the card automatically becomes an interactive button element with proper accessibility attributes.

---

## Color Palette Integration

ServiceCard automatically responds to the active color palette. All accent colors update dynamically:

- Number badge background (on hover)
- Left accent bar
- Card border (on hover)
- Meta tag background (on hover)

```tsx
// Works with all palettes: red, blue, green, purple, neutral
// No additional props needed - automatically uses --primary-color
<ServiceCard
  number="01"
  title="Palette-Aware"
  description="Automatically adapts to the active color palette."
/>
```

---

## Custom Content

Add additional content after the meta tag using `children`:

```tsx
<ServiceCard
  number="01"
  title="With Custom Content"
  description="ServiceCard supports additional content via children."
  meta="Flexibility → Power"
>
  <div style={{ marginTop: 'var(--s-spacing-4)' }}>
    <Button variant="outline" size="sm">
      Learn More
    </Button>
  </div>
</ServiceCard>
```

---

## Accessibility

### WCAG AAA Compliance

- ✅ **Contrast Ratios**: 9:1+ for all text
- ✅ **Semantic HTML**: h3 for titles, p for descriptions
- ✅ **ARIA Labels**: Proper labeling for number badges and meta tags
- ✅ **Keyboard Navigation**: Full Tab/Enter/Space support
- ✅ **Focus Indicators**: Visible 2px outline on focus
- ✅ **Screen Reader**: Proper announcements with aria-labelledby/describedby

### Reduced Motion

Animations are automatically disabled when users prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  /* All transitions and transforms are disabled */
}
```

### High Contrast Mode

Border widths are increased for better visibility:

```css
@media (prefers-contrast: high) {
  /* Border widths increased by 1-2px */
}
```

---

## Design Tokens

ServiceCard uses design tokens from `@spexop/theme`:

### Colors

```css
--primary-color        /* Main accent (500 shade) */
--primary-hover        /* Hover state (600 shade) */
--primary-light        /* Light background (50 shade) */
--primary-dark         /* Dark mode shade (900 shade) */
--s-color-neutral-100  /* Number badge background */
--s-color-neutral-600  /* Description text */
```

### Spacing

```css
--s-spacing-2  /* 8px - Meta padding */
--s-spacing-3  /* 12px - Title margin */
--s-spacing-4  /* 16px - Number margin, description margin */
```

### Typography

```css
--s-font-size-xs    /* 12px - Meta tag */
--s-font-size-base  /* 16px - Description */
--s-font-size-xl    /* 20px - Number badge */
--s-font-size-2xl   /* 30px - Title */
```

---

## Real-World Example

Complete example from the Spexop homepage services section:

```tsx
import { Container, Grid, GridItem, ServiceCard, Stack } from '@spexop/react';

function ServicesSection() {
  return (
    <Container maxWidth="xl" padding={{ xs: 6, md: 10 }}>
      <Stack direction="vertical" gap={8} align="center">
        {/* Section Intro */}
        <div style={{ textAlign: 'center', maxWidth: '700px' }}>
          <h2>Why choose Spexop UI</h2>
          <p>Five principles that guide every design decision.</p>
        </div>

        {/* Services Grid */}
        <Grid columns={12} gap={6}>
          <GridItem span={{ xs: 12, md: 7 }}>
            <ServiceCard
              number="01"
              title="Primitives First"
              description="Master five grid primitives before building complex layouts."
              meta="Foundation → Features"
            />
          </GridItem>

          <GridItem span={{ xs: 12, md: 5 }}>
            <ServiceCard
              number="02"
              title="Borders Before Shadows"
              description="Clean 2px borders define structure."
              meta="Structure → Clarity"
            />
          </GridItem>

          <GridItem span={{ xs: 12, md: 5 }}>
            <ServiceCard
              number="03"
              title="Typography Before Decoration"
              description="Bold type hierarchy creates structure."
              meta="Hierarchy → Design"
            />
          </GridItem>

          <GridItem span={{ xs: 12, md: 7 }}>
            <ServiceCard
              number="04"
              title="Tokens Before Magic Numbers"
              description="379 semantic design tokens with s-prefix naming."
              meta="Consistency → Scale"
            />
          </GridItem>

          <GridItem span={12}>
            <ServiceCard
              variant="featured"
              number="05"
              title="Composition Before Complexity"
              description="Build complex interfaces by composing simple primitives."
              meta="Simplicity → Power"
            />
          </GridItem>
        </Grid>
      </Stack>
    </Container>
  );
}
```

---

## Best Practices

### Do ✅

- Use sequential numbering (01, 02, 03) for clarity
- Keep descriptions concise (2-3 sentences)
- Use relationship arrows in meta tags (→)
- Combine with Grid for asymmetric layouts
- Use featured variant sparingly for emphasis
- Provide `onClick` for interactive cards

### Don't ❌

- Don't use long paragraphs in descriptions
- Don't mix numbered and non-numbered cards in same section
- Don't use custom colors (use palette system)
- Don't skip meta tags (they provide context)
- Don't use more than one featured card per section

---

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+
- Samsung Internet 14+

---

## Related Components

- **Card** - Base card component (ServiceCard extends this)
- **Grid** - For creating asymmetric layouts
- **GridItem** - For controlling card spans
- **Container** - For max-width constraints
- **Stack** - For vertical spacing

---

## Further Reading

- [Card Component](../Card/README.md)
- [Grid Primitives](../../../../../../docs/grid-foundation.md)
- [Design Tokens](../../../../../../docs/TOKENS-REFERENCE.md)
- [Color Palette System](../../../../../../apps/website/src/styles/palettes.css)

---

**Version**: 1.0.0  
**Status**: Stable  
**Date**: 2025-10-14  
**Author**: @olmstedian | @spexop-ui
