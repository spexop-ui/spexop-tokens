# CTACard Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A call-to-action card component designed to drive user engagement. Features prominent headings, compelling copy, and emphasized action buttons with eye-catching design.

## Features

- ✅ Bold headline
- ✅ Supporting description
- ✅ Primary and secondary actions
- ✅ Icon/image support
- ✅ Background variants
- ✅ Centered or left-aligned layouts
- ✅ Responsive design
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { CTACard } from '@spexop/react';

function App() {
  return (
    <CTACard
      title="Ready to get started?"
      description="Join thousands of users building amazing products"
      primaryAction={{
        label: "Start Free Trial",
        onClick: () => navigate('/signup')
      }}
    />
  );
}
```

## Basic Usage

### Simple CTA

```tsx
<CTACard
  title="Join our community"
  description="Connect with developers worldwide"
  primaryAction={{
    label: "Sign Up",
    onClick: handleSignup
  }}
/>
```

### With Secondary Action

```tsx
<CTACard
  title="Upgrade to Pro"
  description="Unlock advanced features and premium support"
  primaryAction={{
    label: "Upgrade Now",
    onClick: handleUpgrade
  }}
  secondaryAction={{
    label: "Learn More",
    onClick: () => navigate('/pricing')
  }}
/>
```

### With Icon

```tsx
import { Rocket } from '@spexop/icons';

<CTACard
  icon={Rocket}
  title="Launch your project"
  description="Everything you need to build and deploy"
  primaryAction={{
    label: "Get Started",
    onClick: handleStart
  }}
/>
```

## Layout Variants

### Centered (Default)

```tsx
<CTACard
  title="Transform your workflow"
  description="Streamline your process with powerful tools"
  align="center"
  primaryAction={{
    label: "Try It Free",
    onClick: handleTrial
  }}
/>
```

### Left-Aligned

```tsx
<CTACard
  title="Need help?"
  description="Our support team is here for you 24/7"
  align="left"
  primaryAction={{
    label: "Contact Support",
    onClick: handleContact
  }}
/>
```

## Common Patterns

### Newsletter Signup

```tsx
function NewsletterCTA() {
  return (
    <CTACard
      title="Stay in the loop"
      description="Get the latest updates, tips, and exclusive content"
      primaryAction={{
        label: "Subscribe",
        onClick: handleSubscribe
      }}
      secondaryAction={{
        label: "View Archive",
        onClick: () => navigate('/newsletter')
      }}
    />
  );
}
```

### Trial Conversion

```tsx
<CTACard
  icon={Star}
  title="Ready to upgrade?"
  description="Get unlimited projects, priority support, and advanced features"
  primaryAction={{
    label: "Start 14-Day Free Trial",
    onClick: handleTrial
  }}
  secondaryAction={{
    label: "Compare Plans",
    onClick: () => navigate('/pricing')
  }}
  highlighted={true}
/>
```

### Footer CTA

```tsx
function FooterCTA() {
  return (
    <Container maxWidth="xl" padding={8}>
      <CTACard
        title="Build something amazing"
        description="Join thousands of developers creating the future"
        primaryAction={{
          label: "Get Started Free",
          onClick: () => navigate('/signup')
        }}
        secondaryAction={{
          label: "View Documentation",
          onClick: () => navigate('/docs')
        }}
        background="gradient"
      />
    </Container>
  );
}
```

### Download CTA

```tsx
<CTACard
  icon={Download}
  title="Download our mobile app"
  description="Access your account anywhere, anytime"
  primaryAction={{
    label: "App Store",
    onClick: handleAppStore
  }}
  secondaryAction={{
    label: "Google Play",
    onClick: handleGooglePlay
  }}
/>
```

### Limited Time Offer

```tsx
<CTACard
  badge="Limited Time"
  title="Black Friday Sale"
  description="Save 50% on all annual plans - ends in 24 hours"
  primaryAction={{
    label: "Claim Offer",
    onClick: handleClaim
  }}
  secondaryAction={{
    label: "View Details",
    onClick: showDetails
  }}
  urgent={true}
/>
```

## Props

```typescript
interface CTACardProps {
  /** Main headline */
  title: string;
  /** Supporting description */
  description: string;
  /** Optional icon */
  icon?: IconComponent;
  /** Optional badge text */
  badge?: string;
  /** Primary action button */
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  /** Secondary action button */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  /** Text alignment */
  align?: "center" | "left";
  /** Background variant */
  background?: "default" | "gradient" | "primary";
  /** Highlighted/urgent state */
  highlighted?: boolean;
  urgent?: boolean;
  /** Additional CSS class */
  className?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Card primitive
2. **Borders before shadows** - Clean border-based design
3. **Typography before decoration** - Bold headlines for emphasis
4. **Tokens before magic numbers** - Uses spacing and color tokens
5. **Composition before complexity** - Simple, focused component

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ High contrast text
- ✅ Keyboard accessible buttons
- ✅ Focus indicators
- ✅ Screen reader friendly

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Card` - Base card component
- `Button` - Action buttons
- `Hero` - Landing page hero sections

## Best Practices

1. **Clear value proposition** - Make benefit obvious
2. **Strong action verbs** - "Start", "Get", "Join"
3. **Single focus** - One primary action
4. **Create urgency** - When appropriate
5. **Keep it concise** - Brief, compelling copy

## License

MIT
