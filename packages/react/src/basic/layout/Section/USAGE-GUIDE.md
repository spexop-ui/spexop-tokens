# Section - Usage Guide

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
import { Section } from '@spexop/react';

function App() {
  return (
    <Section
      variant="white"
      padding="normal"
      label="FEATURES"
      title="Core Features"
      description="Everything you need to build amazing interfaces"
    >
      <p>Section content goes here</p>
    </Section>
  );
}
```

## Common Use Cases

### Simple Content Section

Basic section with content:

```tsx
import { Section, Grid } from '@spexop/react';

function FeaturesSection() {
  return (
    <Section
      id="features"
      variant="white"
      label="FEATURES"
      title="What We Offer"
      description="Powerful tools for modern development"
      maxWidth="xl"
      padding="spacious"
    >
      <Grid columns={{ xs: 1, md: 3 }} gap={6}>
        <FeatureCard title="Fast" />
        <FeatureCard title="Secure" />
        <FeatureCard title="Scalable" />
      </Grid>
    </Section>
  );
}
```

### Section with Context Navigation

Sticky navigation within section:

```tsx
import { Section, ContextNav, Grid } from '@spexop/react';

function DetailedSection() {
  return (
    <Section
      id="documentation"
      variant="neutral"
      contextNav={
        <ContextNav
          scope="section"
          number="01"
          title="Documentation"
          navLinks={[
            { label: "Installation", href: "#installation" },
            { label: "Usage", href: "#usage" },
            { label: "API", href: "#api" }
          ]}
          topOffset={80}
        />
      }
    >
      <div id="installation">Installation content...</div>
      <div id="usage">Usage content...</div>
      <div id="api">API content...</div>
    </Section>
  );
}
```

### Gradient Section with Accent

Eye-catching section with visual accents:

```tsx
import { Section } from '@spexop/react';

function CallToActionSection() {
  return (
    <Section
      variant="gradient"
      accent="left"
      accentColor="var(--theme-primary)"
      padding="spacious"
      introAlign="center"
      label="GET STARTED"
      title="Ready to Build?"
      description="Join thousands of developers building with Spexop"
    >
      <Stack direction="horizontal" gap={4} justify="center">
        <Button variant="primary" size="lg">Start Free Trial</Button>
        <Button variant="outline" size="lg">View Pricing</Button>
      </Stack>
    </Section>
  );
}
```

### Full-Width Section

Section without max-width constraint:

```tsx
import { Section } from '@spexop/react';

function FullWidthSection() {
  return (
    <Section
      variant="neutral"
      fullWidth
      padding="normal"
      border={false}
    >
      <div style={{ width: '100%' }}>
        Full-width content (no max-width constraint)
      </div>
    </Section>
  );
}
```

### Multi-Section Page

Stack multiple sections:

```tsx
import { Section } from '@spexop/react';

function LandingPage() {
  return (
    <>
      <Section
        id="hero"
        variant="white"
        padding="spacious"
        marginBottom="large"
        centered
      >
        <Hero />
      </Section>
      
      <Section
        id="features"
        variant="neutral"
        label="FEATURES"
        title="Why Choose Us"
        padding="spacious"
        marginBottom="large"
        accent="top"
      >
        <FeatureGrid />
      </Section>
      
      <Section
        id="pricing"
        variant="white"
        label="PRICING"
        title="Simple, Transparent Pricing"
        padding="spacious"
        marginBottom="large"
      >
        <PricingCards />
      </Section>
      
      <Section
        id="cta"
        variant="gradient"
        padding="spacious"
        marginBottom="none"
        accent="left"
        introAlign="center"
      >
        <CTAContent />
      </Section>
    </>
  );
}
```

## Features and Props

### Variants

```tsx
{/* White background */}
<Section variant="white">
  <p>Content</p>
</Section>

{/* Neutral gray background */}
<Section variant="neutral">
  <p>Content</p>
</Section>

{/* Gradient background */}
<Section variant="gradient">
  <p>Content</p>
</Section>
```

### Intro Content

Section heading with label, title, and description:

```tsx
<Section
  label="THE SPEXOP WAY"
  title="Design Principles"
  description="Seven fundamental principles guide every component"
  introAlign="center"
  introGap={6}
>
  {/* Content */}
</Section>
```

**Alignment Options**:

- `"left"`: Left-aligned intro
- `"center"`: Center-aligned (default)
- `"right"`: Right-aligned intro

### Padding

Control vertical spacing:

```tsx
{/* Compact padding */}
<Section padding="compact">
  <p>Content</p>
</Section>

{/* Normal padding (default) */}
<Section padding="normal">
  <p>Content</p>
</Section>

{/* Spacious padding */}
<Section padding="spacious">
  <p>Content</p>
</Section>
```

### Margin Bottom

Space between sections:

```tsx
{/* No bottom margin */}
<Section marginBottom="none">
  <p>Content</p>
</Section>

{/* Normal bottom margin (default) */}
<Section marginBottom="normal">
  <p>Content</p>
</Section>

{/* Large bottom margin */}
<Section marginBottom="large">
  <p>Content</p>
</Section>
```

### Container Control

Manage content width:

```tsx
{/* Standard max-width */}
<Section maxWidth="xl">
  <p>Content</p>
</Section>

{/* No max-width */}
<Section fullWidth>
  <p>Full-width content</p>
</Section>

{/* Custom container padding */}
<Section
  maxWidth="lg"
  containerPadding={{ xs: 4, md: 8, lg: 12 }}
>
  <p>Content</p>
</Section>
```

**Max Width Options**:

- `"sm"`: 640px
- `"md"`: 768px
- `"lg"`: 1024px
- `"xl"`: 1280px (default)
- `"2xl"`: 1536px

### Accent Bars

Visual emphasis:

```tsx
{/* Left accent bar */}
<Section accent="left">
  <p>Content</p>
</Section>

{/* Top accent bar */}
<Section accent="top">
  <p>Content</p>
</Section>

{/* Bottom accent bar */}
<Section accent="bottom">
  <p>Content</p>
</Section>

{/* Right accent bar */}
<Section accent="right">
  <p>Content</p>
</Section>

{/* Custom accent color */}
<Section
  accent="left"
  accentColor="#ff0000"
>
  <p>Content</p>
</Section>
```

### Borders

Control border display:

```tsx
{/* All borders (default for most variants) */}
<Section border={true}>
  <p>Content</p>
</Section>

{/* No borders */}
<Section border={false}>
  <p>Content</p>
</Section>

{/* Specific borders */}
<Section border="top">
  <p>Content</p>
</Section>

<Section border="bottom">
  <p>Content</p>
</Section>

<Section border="horizontal">
  <p>Content with top and bottom borders</p>
</Section>

<Section border="vertical">
  <p>Content with left and right borders</p>
</Section>

{/* Custom border color */}
<Section
  border="top"
  borderColor="var(--theme-primary)"
>
  <p>Content</p>
</Section>
```

## Integration with Components

### With ContextNav

```tsx
import { Section, ContextNav } from '@spexop/react';

function NavigableSection() {
  return (
    <Section
      id="features"
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
    </Section>
  );
}
```

### With Grid Layout

```tsx
import { Section, Grid } from '@spexop/react';

function GridSection() {
  return (
    <Section
      label="TEAM"
      title="Meet Our Team"
      maxWidth="xl"
    >
      <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
        <TeamMember />
        <TeamMember />
        <TeamMember />
        <TeamMember />
      </Grid>
    </Section>
  );
}
```

### With Stack Layout

```tsx
import { Section, Stack } from '@spexop/react';

function StackSection() {
  return (
    <Section
      label="PROCESS"
      title="How It Works"
      introAlign="center"
    >
      <Stack direction="vertical" gap={8}>
        <ProcessStep number={1} />
        <ProcessStep number={2} />
        <ProcessStep number={3} />
      </Stack>
    </Section>
  );
}
```

## Accessibility

### Semantic HTML

```tsx
{/* Renders as <section> element */}
<Section id="features">
  <p>Content</p>
</Section>
```

### Anchor Links

```tsx
{/* Use id for navigation */}
<Section id="pricing" label="PRICING" title="Our Plans">
  <p>Pricing content</p>
</Section>

{/* Link to section */}
<a href="#pricing">View Pricing</a>
```

### Heading Hierarchy

```tsx
{/* Title renders as <h2> by default */}
<Section title="Features">
  {/* Subheadings should be <h3> or lower */}
  <h3>Feature Details</h3>
</Section>
```

### Screen Readers

- Semantic HTML structure
- Proper heading hierarchy
- Descriptive labels and titles
- Meaningful anchor IDs

## Best Practices

### DO

- Use clear, descriptive titles
- Provide context with label and description
- Use appropriate variants for visual hierarchy
- Set meaningful IDs for anchor links
- Keep intro content concise
- Use Container for consistent max-width
- Choose appropriate padding for content density
- Use accent bars sparingly for emphasis

### DON'T

- Don't skip IDs if section needs anchoring
- Don't use overly long titles (5-10 words max)
- Don't nest sections unnecessarily
- Don't mix too many variants on one page
- Don't forget responsive considerations
- Don't use accent bars on every section
- Don't use fullWidth without good reason

## Common Patterns

### Hero Section

```tsx
<Section
  id="hero"
  variant="white"
  padding="spacious"
  marginBottom="large"
  border={false}
  fullWidth
>
  <Hero
    title="Welcome to Spexop"
    subtitle="Build better interfaces"
    primaryAction={{ label: "Get Started", onClick: handleStart }}
  />
</Section>
```

### Feature Grid

```tsx
<Section
  id="features"
  variant="neutral"
  label="FEATURES"
  title="Everything You Need"
  description="Comprehensive toolkit for modern development"
  padding="spacious"
  marginBottom="large"
  accent="top"
  maxWidth="xl"
>
  <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
    <FeatureCard icon="Zap" title="Fast" />
    <FeatureCard icon="Shield" title="Secure" />
    <FeatureCard icon="Layers" title="Scalable" />
  </Grid>
</Section>
```

### Testimonials

```tsx
<Section
  id="testimonials"
  variant="white"
  label="TESTIMONIALS"
  title="What People Say"
  description="Hear from our satisfied customers"
  padding="spacious"
  marginBottom="large"
  introAlign="center"
  maxWidth="lg"
>
  <Stack direction="vertical" gap={6}>
    <TestimonialCard />
    <TestimonialCard />
    <TestimonialCard />
  </Stack>
</Section>
```

### Call to Action

```tsx
<Section
  id="cta"
  variant="gradient"
  padding="spacious"
  marginBottom="none"
  accent="left"
  accentColor="var(--theme-primary)"
  introAlign="center"
  maxWidth="md"
>
  <Stack direction="vertical" gap={6} align="center">
    <h2>Ready to Get Started?</h2>
    <p>Join thousands of developers building with Spexop</p>
    <Stack direction="horizontal" gap={4}>
      <Button variant="primary" size="lg">Start Free Trial</Button>
      <Button variant="outline" size="lg">Contact Sales</Button>
    </Stack>
  </Stack>
</Section>
```

## Responsive Design

Section automatically adapts:

- **Mobile**: Compact padding, centered content
- **Tablet**: Normal padding, flexible layout
- **Desktop**: Spacious padding, full layout

Use responsive props for fine control:

```tsx
<Section
  containerPadding={{ xs: 4, md: 8, lg: 12 }}
  maxWidth="xl"
>
  <Grid columns={{ xs: 1, sm: 2, md: 3 }} gap={{ xs: 4, md: 6 }}>
    {/* Content */}
  </Grid>
</Section>
```

## Styling

### Theme Integration

Section automatically uses theme tokens:

- Background: `var(--theme-surface)`
- Text: `var(--theme-text)`
- Border: `var(--theme-border)`
- Primary: `var(--theme-primary)` (for accents)
- Spacing: `var(--theme-spacing-*)`
- Radius: `var(--theme-radius-*)`

### Custom Styling

```tsx
<Section
  className="custom-section"
  style={{
    backgroundImage: 'linear-gradient(to bottom, transparent, var(--theme-surface))'
  }}
>
  <p>Content</p>
</Section>
```

### CSS Variables

Override section-specific variables:

```css
.custom-section {
  --accent-color: #ff0000;
  --border-color: rgba(0, 0, 0, 0.1);
}
```

## Performance Tips

- Use appropriate variants to minimize style complexity
- Keep intro content minimal
- Use Container for automatic width constraints
- Avoid deeply nested sections
- Use Grid/Stack for efficient layouts

## Migration Notes

### Future Versions

This component has a stable API. Future versions will:

- Maintain backward compatibility
- Add new features as optional props
- Provide migration guides for breaking changes

## Related Components

- **ContextNav**: For section navigation
- **StickySection**: Wrapper for sticky behavior
- **Container**: For content width control
- **Grid/Stack**: For layout composition
- **Hero**: For hero sections

## Examples

See the [README.md](./README.md) for comprehensive examples including:

- Landing pages
- Feature sections
- Documentation pages
- Marketing layouts
- And more

## Support

For issues, questions, or feature requests:

1. Check this usage guide
2. Review the [README.md](./README.md)
3. Search existing GitHub issues
4. Create a new issue with reproduction

## Summary

Section provides:

- Flexible page section container
- Multiple variants (white, neutral, gradient)
- Intro content (label, title, description)
- Container integration with max-width
- Accent bars for visual emphasis
- Border customization
- ContextNav integration
- Complete accessibility
- Theme integration
- Responsive design

Perfect for:

- Page sections
- Feature showcases
- Content blocks
- Landing pages
- Documentation pages
- Marketing layouts

Built with Spexop design principles for a refined, accessible user experience.
