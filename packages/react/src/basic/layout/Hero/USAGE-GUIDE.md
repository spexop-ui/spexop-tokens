# Hero - Usage Guide

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
import { Hero } from '@spexop/react';

function App() {
  return (
    <Hero
      variant="centered"
      title="Build Faster with Spexop"
      subtitle="Modern design system for React"
      description="Production-ready components with 245+ design tokens"
      primaryAction={{
        label: "Get Started",
        onClick: () => navigate('/docs')
      }}
    />
  );
}
```

## Common Use Cases

### Centered Hero

Classic centered hero with actions:

```tsx
import { Hero } from '@spexop/react';

function CenteredHero() {
  return (
    <Hero
      variant="centered"
      eyebrow="NEW RELEASE"
      title="Welcome to Spexop"
      subtitle="Build beautiful interfaces faster"
      description="A primitives-first design system with 60+ React components"
      primaryAction={{
        label: "Get Started",
        onClick: () => navigate('/docs'),
        ariaLabel: "Get started with Spexop"
      }}
      secondaryAction={{
        label: "View on GitHub",
        onClick: () => window.open('https://github.com/spexop-ui/spexop'),
        ariaLabel: "View Spexop on GitHub"
      }}
      background="gradient"
      align="center"
    />
  );
}
```

### Split Layout Hero

Content on left, media on right:

```tsx
import { Hero } from '@spexop/react';

function SplitHero() {
  return (
    <Hero
      variant="split"
      title="Transform Your Workflow"
      subtitle="Productivity meets simplicity"
      description="Everything you need to build modern web applications"
      primaryAction={{
        label: "Start Free Trial",
        onClick: handleTrial
      }}
      media={{
        type: "image",
        src: "/hero-image.jpg",
        alt: "Product screenshot"
      }}
      align="left"
    />
  );
}
```

### Full-Bleed Hero

Media background with overlay content:

```tsx
import { Hero } from '@spexop/react';

function FullBleedHero() {
  return (
    <Hero
      variant="full-bleed"
      title="Experience the Difference"
      subtitle="Premium quality, exceptional results"
      primaryAction={{
        label: "Watch Demo",
        onClick: handleDemo
      }}
      media={{
        type: "video",
        src: "/hero-video.mp4",
        autoplay: true,
        overlay: true
      }}
      background="dark"
      align="center"
    />
  );
}
```

### Hero with Stats

Show key metrics:

```tsx
import { Hero } from '@spexop/react';

function HeroWithStats() {
  return (
    <Hero
      variant="centered"
      title="Trusted by Thousands"
      subtitle="Join the community of developers"
      description="Build production-ready applications faster"
      primaryAction={{
        label: "Get Started",
        onClick: handleStart
      }}
      stats={[
        { value: "50K+", label: "Developers" },
        { value: "100K+", label: "Projects" },
        { value: "99.9%", label: "Uptime" }
      ]}
    />
  );
}
```

### Hero with Animated Background

```tsx
import { Hero } from '@spexop/react';

function AnimatedHero() {
  return (
    <Hero
      variant="centered"
      title="Build Something Amazing"
      subtitle="Modern tools for modern developers"
      primaryAction={{
        label: "Start Building",
        onClick: handleStart
      }}
      backgroundPattern={{
        variant: "particles",
        intensity: "medium",
        colors: [
          "rgba(239, 68, 68, 0.2)",
          "rgba(148, 163, 184, 0.18)"
        ]
      }}
    />
  );
}
```

## Features and Props

### Variants

```tsx
{/* Centered layout (default) */}
<Hero
  variant="centered"
  title="Title"
  subtitle="Subtitle"
/>

{/* Split layout (content | media) */}
<Hero
  variant="split"
  title="Title"
  subtitle="Subtitle"
  media={{ type: "image", src: "/img.jpg", alt: "Hero" }}
/>

{/* Full-bleed (media with overlay) */}
<Hero
  variant="full-bleed"
  title="Title"
  subtitle="Subtitle"
  media={{ type: "video", src: "/video.mp4" }}
/>
```

### Content Sections

#### Eyebrow

Small text above title:

```tsx
<Hero
  eyebrow="NEW RELEASE v2.0"
  title="Main Title"
/>
```

#### Title

Main heading (required):

```tsx
<Hero
  title="Build Faster with Spexop"
  titleLevel={1}  // h1, h2, etc. (default: 1)
/>
```

#### Subtitle

Secondary heading:

```tsx
<Hero
  title="Main Title"
  subtitle="Secondary description text"
/>
```

#### Description

Body text:

```tsx
<Hero
  title="Main Title"
  subtitle="Subtitle"
  description="Detailed description of your product or service"
/>
```

### Actions

```tsx
<Hero
  title="Main Title"
  primaryAction={{
    label: "Get Started",
    onClick: () => navigate('/start'),
    ariaLabel: "Get started with Spexop",
    iconLeft: <Icon name="Play" />,
    iconRight: <Icon name="ChevronRight" />
  }}
  secondaryAction={{
    label: "Learn More",
    onClick: () => navigate('/docs'),
    ariaLabel: "Learn more about Spexop"
  }}
/>
```

### Media

#### Image

```tsx
<Hero
  title="Main Title"
  media={{
    type: "image",
    src: "/hero-image.jpg",
    alt: "Product screenshot",
    overlay: false
  }}
  variant="split"
/>
```

#### Video

```tsx
<Hero
  title="Main Title"
  media={{
    type: "video",
    src: "/hero-video.mp4",
    alt: "Product demo video",
    autoplay: true,
    overlay: true
  }}
  variant="full-bleed"
/>
```

### Stats

```tsx
<Hero
  title="Main Title"
  stats={[
    { value: "10K+", label: "Users" },
    { value: "50K+", label: "Downloads" },
    { value: "99.9%", label: "Uptime" }
  ]}
/>
```

### Background Options

```tsx
{/* Default background */}
<Hero background="default" title="Title" />

{/* Gradient background */}
<Hero background="gradient" title="Title" />

{/* Dark background */}
<Hero background="dark" title="Title" />

{/* Light background */}
<Hero background="light" title="Title" />
```

### Alignment

```tsx
{/* Center aligned (default) */}
<Hero align="center" title="Title" />

{/* Left aligned */}
<Hero align="left" title="Title" />

{/* Right aligned */}
<Hero align="right" title="Title" />
```

### Background Patterns

```tsx
{/* Particles pattern */}
<Hero
  title="Title"
  backgroundPattern={{
    variant: "particles",
    intensity: "medium",
    colors: ["rgba(239, 68, 68, 0.2)"]
  }}
/>

{/* Gradient mesh pattern */}
<Hero
  title="Title"
  backgroundPattern={{
    variant: "gradient",
    intensity: "low"
  }}
/>

{/* Mesh pattern */}
<Hero
  title="Title"
  backgroundPattern={{
    variant: "mesh",
    intensity: "high"
  }}
/>
```

## Animation Configuration

### Default Animation

All elements animate by default:

```tsx
<Hero
  title="Animated Hero"
  subtitle="Smooth entrance animations"
/>
```

### Disable Animations

```tsx
<Hero
  title="Static Hero"
  animation={{
    disabled: true
  }}
/>
```

### Custom Animation Sequence

```tsx
<Hero
  title="Custom Animation"
  animation={{
    sequence: "sequential",  // or "simultaneous"
    staggerDelay: 150,       // ms between elements
    entranceDelay: 200       // initial delay
  }}
/>
```

### Animation Respect Reduced Motion

Automatically respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled automatically */
}
```

## Accessibility

### Semantic HTML

```tsx
{/* h1 by default */}
<Hero title="Main Heading" titleLevel={1} />

{/* h2 for sub-sections */}
<Hero title="Section Heading" titleLevel={2} />
```

### ARIA Labels

```tsx
<Hero
  title="Welcome"
  ariaLabel="Hero section introducing our product"
  primaryAction={{
    label: "Get Started",
    onClick: handleStart,
    ariaLabel: "Get started with our free trial"
  }}
/>
```

### Keyboard Navigation

All interactive elements are keyboard accessible:

- **Tab**: Focus buttons
- **Enter/Space**: Activate buttons
- **Shift + Tab**: Navigate backwards

### Screen Readers

- Semantic HTML structure
- Proper heading hierarchy
- Descriptive button labels
- Alt text for images
- ARIA labels for sections

## Best Practices

### DO

- Use clear, concise title (5-10 words)
- Provide meaningful subtitle (10-20 words)
- Include 1-2 action buttons maximum
- Use high-quality images and videos
- Provide alt text for all media
- Test on all screen sizes
- Keep descriptions brief (2-3 sentences)
- Use appropriate heading level

### DON'T

- Don't use more than 2 action buttons
- Don't forget alt text for images
- Don't use tiny or low-quality media
- Don't overwhelm with too much text
- Don't auto-play videos with sound
- Don't use flashy animations excessively
- Don't forget mobile testing
- Don't skip accessibility attributes

## Common Patterns

### Marketing Landing Page

```tsx
<Hero
  variant="centered"
  eyebrow="PRODUCT LAUNCH"
  title="The Future of Design Systems"
  subtitle="Build beautiful interfaces in minutes, not hours"
  description="Spexop provides 60+ production-ready components with full theme support"
  primaryAction={{
    label: "Start Free Trial",
    onClick: handleTrial
  }}
  secondaryAction={{
    label: "Watch Demo",
    onClick: handleDemo
  }}
  stats={[
    { value: "10K+", label: "Developers" },
    { value: "50K+", label: "Projects" },
    { value: "99.9%", label: "Uptime" }
  ]}
  background="gradient"
  backgroundPattern={{
    variant: "particles",
    intensity: "low"
  }}
/>
```

### Product Showcase

```tsx
<Hero
  variant="split"
  title="Meet Your New Workflow"
  subtitle="Designed for modern teams"
  description="Collaborate seamlessly with powerful tools built for productivity"
  primaryAction={{
    label: "See It In Action",
    onClick: handleDemo
  }}
  media={{
    type: "image",
    src: "/product-screenshot.jpg",
    alt: "Product interface screenshot"
  }}
  align="left"
/>
```

### Video Hero

```tsx
<Hero
  variant="full-bleed"
  title="Experience Excellence"
  subtitle="See what sets us apart"
  primaryAction={{
    label: "Get Started",
    onClick: handleStart
  }}
  media={{
    type: "video",
    src: "/background-video.mp4",
    autoplay: true,
    overlay: true
  }}
  background="dark"
/>
```

## Performance Tips

### Optimize Images

```tsx
// Use responsive images
<Hero
  media={{
    type: "image",
    src: "/hero-large.jpg",
    alt: "Hero image"
  }}
/>

// In production, use:
// - WebP format for better compression
// - srcset for responsive images
// - Lazy loading for below-fold images
```

### Optimize Videos

```tsx
<Hero
  media={{
    type: "video",
    src: "/hero-video.mp4",  // Compressed, optimized
    autoplay: true,
    // Tips:
    // - Use H.264 codec
    // - Compress to reasonable bitrate
    // - Keep duration short (10-20s loops)
    // - Provide poster image
  }}
/>
```

### Lazy Load Background Patterns

```tsx
// Background patterns are only rendered when needed
// Automatically disabled for prefers-reduced-motion
<Hero
  backgroundPattern={{
    variant: "particles",
    intensity: "low"  // Lower intensity = better performance
  }}
/>
```

## Styling

### Theme Integration

Hero automatically uses theme tokens:

- Text: `var(--theme-text)`
- Background: `var(--theme-surface)`
- Primary: `var(--theme-primary)`
- Spacing: `var(--theme-spacing-*)`
- Radius: `var(--theme-radius-*)`

### Custom Styling

```tsx
<Hero
  title="Custom Hero"
  className="custom-hero"
  style={{
    minHeight: '80vh',
    background: 'linear-gradient(to bottom, var(--theme-primary), var(--theme-secondary))'
  }}
/>
```

## Responsive Design

Hero automatically adapts to all screen sizes:

- **Mobile**: Stacked layout, smaller text, full-width buttons
- **Tablet**: Adjusted spacing, medium text
- **Desktop**: Full layout, large text, optimal spacing

## Migration Notes

### Future Versions

This component has a stable API. Future versions will:

- Maintain backward compatibility
- Add new features as optional props
- Provide migration guides for breaking changes

## Related Components

- **Section**: For page sections with heroes
- **Button**: For action buttons
- **Container**: For content width constraints
- **Grid/Stack**: For layout composition

## Examples

See the [README.md](./README.md) for comprehensive examples including:

- Marketing heroes
- Product showcases
- Video backgrounds
- Animated patterns
- And more

## Support

For issues, questions, or feature requests:

1. Check this usage guide
2. Review the [README.md](./README.md)
3. Search existing GitHub issues
4. Create a new issue with reproduction

## Summary

Hero provides:

- Multiple layout variants (centered, split, full-bleed)
- Flexible content sections (eyebrow, title, subtitle, description)
- Action buttons with icons
- Media support (image, video)
- Stats display
- Animated backgrounds
- Full accessibility
- Theme integration
- Performance optimizations

Perfect for:

- Landing pages
- Product showcases
- Marketing campaigns
- Video backgrounds
- Feature introductions

Built with Spexop design principles for a refined, accessible user experience.
