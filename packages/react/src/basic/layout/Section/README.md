# Section Component

**Version**: 1.0.0  
**Status**: Production Ready  
**Category**: Layout Primitive

Floating card-style section container with rounded corners, borders, and built-in header support. Extracted from HomePage sections to provide consistent section styling across the application.

## Features

- ✅ 3 visual variants (white, neutral, gradient)
- ✅ Built-in intro header (label + title + description)
- ✅ Built-in Container with max-width control
- ✅ 4-position accent bars (left, right, top, bottom)
- ✅ Flexible border control (all sides, specific sides, none)
- ✅ 3 padding sizes (compact, normal, spacious)
- ✅ 3 margin options (none, normal, large)
- ✅ Full-width mode support
- ✅ ContextNav integration (direct child for sticky positioning)
- ✅ Dark mode support
- ✅ Responsive design

## Installation

```tsx
import { Section } from '@spexop/react';
```

## Basic Usage

### Simple Section

```tsx
<Section variant="white" padding="normal">
  <p>Your content here</p>
</Section>
```

### With Built-in Intro

```tsx
<Section
  variant="white"
  label="RESOURCES"
  title="Everything you need to build"
  description="Documentation, examples, and guides to help you build with Spexop UI."
>
  {/* Your content */}
</Section>
```

### With ContextNav (Sticky Navigation)

```tsx
<Section
  variant="neutral"
  label="FEATURES"
  title="Core Features"
  description="Explore the key features of our design system."
  contextNav={
    <ContextNav
      number="01"
      title="Features"
      navLinks={[
        { label: "Primitives", href: "#primitives" },
        { label: "Tokens", href: "#tokens" },
        { label: "Components", href: "#components" },
      ]}
      topOffset={80}
    />
  }
>
  {/* Your content */}
</Section>
```

## Props API

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required**. Section content |
| `variant` | `"white" \| "neutral" \| "gradient"` | `"white"` | Visual style variant |
| `padding` | `"compact" \| "normal" \| "spacious"` | `"normal"` | Vertical padding size |
| `marginBottom` | `"none" \| "normal" \| "large"` | `"normal"` | Bottom margin spacing |
| `className` | `string` | - | Additional CSS class |
| `id` | `string` | - | HTML id for anchor links (see note below) |
| `style` | `React.CSSProperties` | - | Inline styles |

**Note on `id` prop**: The Section component is excluded from Biome's `useUniqueElementIds` rule because it's designed to accept static IDs for navigation and deep linking purposes. This is intentional and safe for this component.

### Context Navigation

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `contextNav` | `ReactNode` | - | ContextNav component (renders as direct child for sticky) |

**Important**: ContextNav must be passed via this prop (not as children) to ensure it's a direct child of the section element for sticky positioning to work.

### Section Intro Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Optional section label (e.g., "THE SPEXOP WAY") |
| `title` | `string` | - | Optional section heading |
| `description` | `string` | - | Optional section description |
| `introAlign` | `"left" \| "center" \| "right"` | `"center"` | Intro content alignment |
| `introGap` | `StackProps["gap"]` | `8` | Gap between intro and content |

### Container Control

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `ContainerMaxWidth` | `"xl"` | Max width: "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "full" |
| `containerPadding` | `ResponsiveProp<SpacingScale>` | `{ xs: 6, md: 10 }` | Container padding (responsive) |
| `centered` | `boolean` | `true` | Center content horizontally |

### Accent Bar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accent` | `"left" \| "right" \| "top" \| "bottom" \| "none"` | `"none"` (auto `"left"` for gradient) | Accent bar position |
| `accentColor` | `string` | `var(--primary-color)` | Custom accent color |

### Border Control

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `border` | `boolean \| "top" \| "bottom" \| "left" \| "right" \| "horizontal" \| "vertical"` | `true` | Border configuration |
| `borderColor` | `string` | - | Custom border color |

### Layout Control

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fullWidth` | `boolean` | `false` | Remove max-width constraint |

## Variants

### White Variant (Default)

Clean white background with neutral borders. Perfect for primary content sections.

```tsx
<Section variant="white">
  {/* Content */}
</Section>
```

**Styling**:

- Background: `white` (light) / `neutral-900` (dark)
- Border: `neutral-200` (light) / `neutral-800` (dark)

### Neutral Variant

Subtle neutral background for visual hierarchy and alternating sections.

```tsx
<Section variant="neutral">
  {/* Content */}
</Section>
```

**Styling**:

- Background: `gray-50` (light) / `neutral-950` (dark)
- Border: `neutral-200` (light) / `neutral-800` (dark)

### Gradient Variant

Gradient background with optional accent bar. Perfect for CTAs and featured content.

```tsx
<Section variant="gradient">
  {/* Content */}
</Section>
```

**Styling**:

- Background: Linear gradient `gray-50 → white` (light) / `neutral-950 → neutral-900` (dark)
- Border: `neutral-200` (light) / `neutral-800` (dark)
- Accent: Automatically adds left accent bar (can override with `accent` prop)

## Padding Sizes

### Compact

- Desktop: `48px` vertical (spacing-12)
- Mobile: `32px` vertical (spacing-8)

### Normal (Default)

- Desktop: `80px` vertical (spacing-20)
- Mobile: `48px` vertical (spacing-12)

### Spacious

- Desktop: `96px` vertical (spacing-24)
- Mobile: `64px` vertical (spacing-16)

## Margin Bottom

### None

- `0px` - For last section or adjacent sections

### Normal (Default Size)

- Desktop: `80px` (spacing-20)
- Mobile: `48px` (spacing-12)

### Large

- Desktop: `96px` (spacing-24)
- Mobile: `64px` (spacing-16)

## Advanced Usage

### Accent Bar Positions

```tsx
{/* Left accent (default for gradient) */}
<Section variant="gradient" accent="left">
  {/* Content */}
</Section>

{/* Top accent */}
<Section variant="white" accent="top">
  {/* Content */}
</Section>

{/* Custom accent color */}
<Section 
  variant="gradient" 
  accent="left" 
  accentColor="#10b981"
>
  {/* Content */}
</Section>

{/* No accent */}
<Section variant="gradient" accent="none">
  {/* Content */}
</Section>
```

### Border Control (see note below)

```tsx
{/* No borders */}
<Section border={false}>
  {/* Content */}
</Section>

{/* Top border only */}
<Section border="top">
  {/* Content */}
</Section>

{/* Horizontal borders (top + bottom) */}
<Section border="horizontal">
  {/* Content */}
</Section>

{/* Custom border color */}
<Section borderColor="rgba(16, 185, 129, 0.3)">
  {/* Content */}
</Section>
```

### Layout Control (see note below)

```tsx
{/* Full width (no max-width constraint) */}
<Section fullWidth={true}>
  {/* Content stretches edge-to-edge */}
</Section>

{/* Custom max-width */}
<Section maxWidth="lg">
  {/* Content constrained to "lg" width */}
</Section>

{/* Custom container padding */}
<Section containerPadding={{ xs: 4, md: 8, lg: 12 }}>
  {/* Content */}
</Section>
```

### Intro Alignment

```tsx
{/* Left-aligned intro */}
<Section
  label="FEATURES"
  title="Core Features"
  description="All the features you need."
  introAlign="left"
>
  {/* Content */}
</Section>

{/* Right-aligned intro */}
<Section
  label="ABOUT"
  title="About Us"
  introAlign="right"
>
  {/* Content */}
</Section>
```

## Complete Example (HomePage-style)

```tsx
<Section
  id="services"
  variant="gradient"
  padding="spacious"
  marginBottom="normal"
  label="THE SPEXOP WAY"
  title="Why Choose Spexop UI"
  description="Five principles that guide every design decision. Built for teams who value quality and developer experience."
  accent="left"
  contextNav={
    <ContextNav
      number="01"
      title="Why Spexop UI"
      navLinks={[
        { label: "Primitives", href: "#primitives" },
        { label: "Borders", href: "#borders" },
        { label: "Tokens", href: "#tokens" },
      ]}
      topOffset={80}
    />
  }
>
  <Grid columns={12} gap={6}>
    <GridItem span={{ xs: 12, md: 7 }}>
      <ServiceCard
        number="01"
        title="Primitives First"
        description="Master five grid primitives before building complex layouts."
        meta="Foundation → Features"
      />
    </GridItem>
    {/* More content */}
  </Grid>
</Section>
```

## Integration with ContextNav

### Critical: Direct Child Requirement

ContextNav **MUST** be a direct child of the section element for sticky positioning to work. Use the `contextNav` prop, NOT children:

```tsx
{/* ✅ CORRECT - Direct child via contextNav prop */}
<Section
  contextNav={<ContextNav number="01" title="Features" />}
>
  {/* Content */}
</Section>

{/* ❌ WRONG - Gets wrapped in Container/Stack, sticky breaks */}
<Section>
  <ContextNav number="01" title="Features" />
  {/* Content */}
</Section>
```

### Structure

When you use `contextNav` prop, Section renders:

```tsx
<section>
  {contextNav}        {/* Direct child - can stick! */}
  <Container>
    {introContent}
    {children}
  </Container>
</section>
```

## Responsive Behavior

### Mobile (< 768px)

- Border radius: `24px` (spacing-6)
- Padding: Reduced by ~40%
- Margin bottom: Reduced by ~40%
- ContextNav: Hidden navigation links, simplified display

### Desktop (≥ 768px)

- Border radius: `40px` (spacing-8)
- Full padding and margins
- ContextNav: Full horizontal expansion with navigation

## Design System Integration

### Token Usage

All spacing, colors, and typography use design system tokens:

```css
border-radius: var(--s-spacing-8);
padding: var(--s-spacing-20) 0;
margin-bottom: var(--s-spacing-20);
border: 2px solid var(--s-color-neutral-200);
```

### Refined Minimalism

- ✅ **Borders Before Shadows**: 2px solid borders, no drop shadows
- ✅ **Typography Before Decoration**: Content-focused, minimal effects
- ✅ **Tokens Before Magic Numbers**: All spacing from design tokens
- ✅ **Composition Before Complexity**: Works with Grid/Stack/Container

## Common Patterns

### Alternating Sections

```tsx
<Section variant="white">
  {/* Section 1 */}
</Section>

<Section variant="neutral">
  {/* Section 2 */}
</Section>

<Section variant="white">
  {/* Section 3 */}
</Section>
```

### Multi-section Page with Navigation

```tsx
<div className={styles.page}>
  <Section
    id="features"
    variant="white"
    label="FEATURES"
    title="Core Features"
    contextNav={
      <ContextNav
        number="01"
        title="Features"
        navLinks={[
          { label: "Grid", href: "#grid" },
          { label: "Components", href: "#components" },
        ]}
      />
    }
  >
    {/* Content */}
  </Section>

  <Section
    id="about"
    variant="neutral"
    label="ABOUT"
    title="About Us"
    contextNav={
      <ContextNav
        number="02"
        title="About"
        navLinks={[
          { label: "Team", href: "#team" },
          { label: "Mission", href: "#mission" },
        ]}
      />
    }
  >
    {/* Content */}
  </Section>
</div>
```

### CTA Section (Gradient with Accent)

```tsx
<Section
  variant="gradient"
  padding="spacious"
  marginBottom="large"
  accent="left"
>
  <Stack direction="vertical" gap={6} align="center">
    <h2>Ready to get started?</h2>
    <p>Join thousands of developers building with Spexop UI.</p>
    <Button variant="primary" size="lg">Get Started</Button>
  </Stack>
</Section>
```

## Accessibility

- ✅ Semantic `<section>` element
- ✅ Proper heading hierarchy (h2 for titles)
- ✅ Keyboard navigation support
- ✅ High contrast borders (WCAG AA)
- ✅ Responsive font sizes
- ✅ No decorative motion (border transitions only)

## Performance

- ✅ CSS Modules for scoped styling
- ✅ No JavaScript animations
- ✅ GPU-accelerated accent bar positioning
- ✅ Minimal reflows

## Troubleshooting

### Sticky Navigation Not Working

If ContextNav doesn't stick:

1. ✅ Use `contextNav` prop (not children)
2. ✅ Ensure no `overflow: hidden` on ancestors (html, body, #root, .page)
3. ✅ Section must be tall enough (min-height: 400px applied automatically)
4. ✅ Check `topOffset` prop matches your layout (default: 80px)

### Border Radius Not Showing

If rounded corners are cut off:

- Section doesn't use `overflow: hidden` (only `overflow-x: hidden` if needed)
- Parent elements should not clip content

### Content Not Centered

If content appears off-center:

- Check page wrapper doesn't have asymmetric padding
- Use `centered={true}` prop (default)
- Verify `maxWidth` prop is appropriate

## File Structure

```bash
Section/
├── Section.tsx           # Component logic
├── Section.module.css    # Scoped styles
├── Section.types.ts      # TypeScript types
├── index.ts              # Exports
└── README.md            # This file
```

## Related Components

- **ContextNav** - Sticky navigation for sections
- **Container** - Max-width wrapper (built into Section)
- **Stack** - Vertical/horizontal layout (used internally)
- **Grid** - Grid layout (compose inside Section)
- **ServiceCard** - Service showcase cards
- **ButtonGridItem** - Interactive media cards

## Examples

See `/test/section` route for comprehensive examples of all variants and configurations.

## Common Issues and Solutions

### ContextNav Not Sticking

When using `contextNav` prop, ensure parent containers don't break sticky positioning:

**❌ WRONG - Parent layout breaks sticky:**

```css
.pageWrapper {
  overflow-x: hidden; /* Breaks sticky positioning! */
  display: flex;
  flex-direction: column;
  gap: 40px; /* Flex gap can interfere */
}
```

**✅ CORRECT - Clean layout for sticky:**

```css
.pageWrapper {
  /* No overflow properties */
  width: 100%;
  max-width: 100vw; /* Use max-width for constraints */
}
```

**✅ Use Section's built-in spacing:**

```tsx
<Section marginBottom="normal"> {/* Use Section's margin */}
  <ContextNav topOffset={80} /> {/* Always set topOffset */}
</Section>
```

### Key Requirements for Sticky ContextNav

1. **No `overflow` on parent containers** - Creates new containing block
2. **Always set `topOffset` prop** - Required for proper positioning
3. **Use Section `marginBottom` prop** - Instead of flex gap on parent
4. **Sufficient section height** - Section must be tall enough to scroll

See `ContextNav` component documentation for complete troubleshooting guide.

## Version History

### 1.0.0 (2025-10-14)

- Initial release
- Extracted from HomePage sections
- Added intro props (label, title, description)
- Added Container control (maxWidth, padding)
- Added accent bars (4 positions + custom colors)
- Added border control (selective sides)
- Added layout control (fullWidth, centered)
- Added ContextNav integration via `contextNav` prop
- Added `overflow` constraint notes for sticky positioning
