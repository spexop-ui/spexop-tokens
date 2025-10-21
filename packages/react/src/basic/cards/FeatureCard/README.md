# FeatureCard Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A specialized card component designed to showcase product features, benefits, or key selling points. Features icon support, clean typography, and optional call-to-action.

## Features

- ✅ Icon support (@spexop/icons)
- ✅ Title and description
- ✅ Optional link or button
- ✅ Clean, minimal design
- ✅ Hover effects
- ✅ Theme-aware styling
- ✅ Responsive layout
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { FeatureCard } from '@spexop/react';
import { Zap } from '@spexop/icons';

function App() {
  return (
    <FeatureCard
      icon={Zap}
      title="Lightning Fast"
      description="Built for speed with optimized performance"
    />
  );
}
```

## Basic Usage

### With Icon

```tsx
import { Zap, Shield, Heart } from '@spexop/icons';

<FeatureCard
  icon={Zap}
  title="Fast Performance"
  description="Optimized for speed and efficiency"
/>

<FeatureCard
  icon={Shield}
  title="Secure by Default"
  description="Enterprise-grade security built-in"
/>

<FeatureCard
  icon={Heart}
  title="User Friendly"
  description="Intuitive interface that users love"
/>
```

### With Link

```tsx
<FeatureCard
  icon={Code}
  title="Developer Tools"
  description="Comprehensive toolkit for developers"
  link={{
    text: "Learn more",
    href: "/docs/developer-tools"
  }}
/>
```

### With Action Button

```tsx
<FeatureCard
  icon={Rocket}
  title="Quick Start"
  description="Get up and running in minutes"
  action={{
    text: "Get Started",
    onClick: () => navigate('/getting-started')
  }}
/>
```

## Common Patterns

### Feature Grid

```tsx
import { Grid, GridItem, FeatureCard } from '@spexop/react';
import { Zap, Shield, Heart, Code } from '@spexop/icons';

function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for maximum performance',
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Enterprise-grade security',
    },
    {
      icon: Heart,
      title: 'User Friendly',
      description: 'Intuitive and easy to use',
    },
    {
      icon: Code,
      title: 'Developer First',
      description: 'Built for developers',
    },
  ];

  return (
    <Grid columns="auto-fit" minColumnWidth="280px" gap={6}>
      {features.map((feature) => (
        <GridItem key={feature.title}>
          <FeatureCard {...feature} />
        </GridItem>
      ))}
    </Grid>
  );
}
```

### Three-Column Layout

```tsx
<Grid columns={3} gap={6}>
  <GridItem>
    <FeatureCard
      icon={Database}
      title="Data Management"
      description="Powerful tools for managing your data efficiently"
    />
  </GridItem>
  
  <GridItem>
    <FeatureCard
      icon={BarChart}
      title="Analytics"
      description="Real-time insights and comprehensive reporting"
    />
  </GridItem>
  
  <GridItem>
    <FeatureCard
      icon={Users}
      title="Team Collaboration"
      description="Work together seamlessly with your team"
    />
  </GridItem>
</Grid>
```

### With Custom Styling

```tsx
<FeatureCard
  icon={Palette}
  title="Customizable"
  description="Tailor the experience to your needs"
  className="custom-feature-card"
  style={{ borderColor: 'var(--s-color-primary-500)' }}
/>
```

### Landing Page Features

```tsx
function LandingPageFeatures() {
  return (
    <Container maxWidth="xl" padding={8}>
      <Stack direction="vertical" gap={8}>
        <div style={{ textAlign: 'center' }}>
          <h2>Why Choose Us</h2>
          <p>Everything you need to succeed</p>
        </div>
        
        <Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
          <GridItem>
            <FeatureCard
              icon={Zap}
              title="Blazing Fast"
              description="Lightning-fast performance optimized for speed"
              link={{ text: "See benchmarks", href: "/benchmarks" }}
            />
          </GridItem>
          
          <GridItem>
            <FeatureCard
              icon={Lock}
              title="Secure"
              description="Bank-level encryption and security protocols"
              link={{ text: "Security details", href: "/security" }}
            />
          </GridItem>
          
          <GridItem>
            <FeatureCard
              icon={Smartphone}
              title="Mobile Ready"
              description="Fully responsive design that works everywhere"
              link={{ text: "View demo", href: "/demo" }}
            />
          </GridItem>
        </Grid>
      </Stack>
    </Container>
  );
}
```

## Props

```typescript
interface FeatureCardProps {
  /** Icon component from @spexop/icons */
  icon: IconComponent;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional link */
  link?: {
    text: string;
    href: string;
  };
  /** Optional action button */
  action?: {
    text: string;
    onClick: () => void;
  };
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Card primitive
2. **Borders before shadows** - Clean border-based design
3. **Typography before decoration** - Clear hierarchy with font weights
4. **Tokens before magic numbers** - Uses spacing and color tokens
5. **Composition before complexity** - Simple, focused component

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Focus indicators for interactive elements
- ✅ High contrast text
- ✅ Screen reader friendly

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Card` - Base card component
- `ProductCard` - Product showcase
- `ServiceCard` - Service offerings
- `PricingCard` - Pricing tiers

## License

MIT
