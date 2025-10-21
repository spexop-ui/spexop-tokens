# PricingCard Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A specialized card component designed for pricing tables and subscription plans. Features clear pricing display, feature lists, and prominent call-to-action buttons.

## Features

- ✅ Price display with currency formatting
- ✅ Billing period support (monthly, yearly, etc.)
- ✅ Feature list with checkmarks
- ✅ Highlighted/featured variant
- ✅ Call-to-action button
- ✅ Badge/label support (Popular, Best Value, etc.)
- ✅ Clean, minimal design
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { PricingCard } from '@spexop/react';

function App() {
  return (
    <PricingCard
      title="Pro"
      price={29}
      currency="$"
      period="month"
      features={[
        'Unlimited projects',
        '100GB storage',
        'Priority support',
        'Advanced analytics',
      ]}
      buttonText="Start Pro Trial"
      onButtonClick={() => console.log('Subscribe to Pro')}
    />
  );
}
```

## Basic Usage

### Simple Plan

```tsx
<PricingCard
  title="Starter"
  price={9}
  currency="$"
  period="month"
  features={[
    '5 projects',
    '10GB storage',
    'Email support',
    'Basic analytics',
  ]}
  buttonText="Get Started"
  onButtonClick={handleSubscribe}
/>
```

### Featured Plan

```tsx
<PricingCard
  title="Pro"
  price={29}
  currency="$"
  period="month"
  featured={true}
  badge="Most Popular"
  features={[
    'Unlimited projects',
    '100GB storage',
    'Priority support',
    'Advanced analytics',
    'API access',
  ]}
  buttonText="Start Free Trial"
  onButtonClick={handleSubscribe}
/>
```

### Enterprise Plan

```tsx
<PricingCard
  title="Enterprise"
  price="Custom"
  features={[
    'Unlimited everything',
    'Custom integrations',
    'Dedicated support',
    'SLA guarantee',
    'Training included',
  ]}
  buttonText="Contact Sales"
  onButtonClick={handleContact}
/>
```

## Common Patterns

### Three-Tier Pricing

```tsx
import { Grid, GridItem, PricingCard } from '@spexop/react';

function PricingSection() {
  const plans = [
    {
      title: 'Starter',
      price: 9,
      features: [
        '5 projects',
        '10GB storage',
        'Email support',
        'Basic analytics',
      ],
    },
    {
      title: 'Pro',
      price: 29,
      featured: true,
      badge: 'Most Popular',
      features: [
        'Unlimited projects',
        '100GB storage',
        'Priority support',
        'Advanced analytics',
        'API access',
      ],
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      features: [
        'Unlimited everything',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee',
        'Training included',
      ],
    },
  ];

  return (
    <Grid columns={3} gap={6}>
      {plans.map((plan) => (
        <GridItem key={plan.title}>
          <PricingCard
            {...plan}
            currency="$"
            period="month"
            buttonText={plan.price === 'Custom' ? 'Contact Sales' : 'Start Trial'}
            onButtonClick={() => handleSubscribe(plan.title)}
          />
        </GridItem>
      ))}
    </Grid>
  );
}
```

### With Annual/Monthly Toggle

```tsx
function PricingTable() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const isAnnual = billingPeriod === 'annual';
  
  const plans = [
    {
      title: 'Pro',
      monthlyPrice: 29,
      annualPrice: 290, // ~$24/month
    },
    {
      title: 'Business',
      monthlyPrice: 99,
      annualPrice: 990, // ~$82/month
    },
  ];

  return (
    <Container maxWidth="xl" padding={8}>
      <Stack direction="vertical" gap={6}>
        <div style={{ textAlign: 'center' }}>
          <h2>Choose Your Plan</h2>
          <SegmentedControl
            value={billingPeriod}
            onChange={setBillingPeriod}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annual', label: 'Annual (Save 17%)' },
            ]}
          />
        </div>
        
        <Grid columns={2} gap={6}>
          {plans.map((plan) => (
            <GridItem key={plan.title}>
              <PricingCard
                title={plan.title}
                price={isAnnual ? plan.annualPrice : plan.monthlyPrice}
                currency="$"
                period={isAnnual ? 'year' : 'month'}
                features={[
                  'Feature 1',
                  'Feature 2',
                  'Feature 3',
                ]}
                buttonText="Subscribe"
                onButtonClick={() => handleSubscribe(plan.title, billingPeriod)}
              />
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
```

### With Discount Badge

```tsx
<PricingCard
  title="Black Friday Special"
  price={19}
  originalPrice={29}
  currency="$"
  period="month"
  badge="Save 34%"
  featured={true}
  features={[
    'All Pro features',
    'Limited time offer',
    'Lock in this price',
  ]}
  buttonText="Claim Offer"
  onButtonClick={handleSpecialOffer}
/>
```

### Free Tier

```tsx
<PricingCard
  title="Free"
  price={0}
  currency="$"
  period="forever"
  features={[
    '3 projects',
    '1GB storage',
    'Community support',
  ]}
  buttonText="Sign Up Free"
  onButtonClick={handleFreeSignup}
/>
```

### Comparison View

```tsx
function PricingComparison() {
  return (
    <Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
      <GridItem>
        <PricingCard
          title="Starter"
          price={9}
          currency="$"
          period="month"
          features={[
            '✓ 5 projects',
            '✓ 10GB storage',
            '✓ Email support',
            '✗ API access',
            '✗ Priority support',
          ]}
          buttonText="Get Started"
          onButtonClick={handleSubscribe}
        />
      </GridItem>
      
      <GridItem>
        <PricingCard
          title="Pro"
          price={29}
          currency="$"
          period="month"
          featured={true}
          badge="Recommended"
          features={[
            '✓ Unlimited projects',
            '✓ 100GB storage',
            '✓ Priority support',
            '✓ API access',
            '✓ Advanced analytics',
          ]}
          buttonText="Start Trial"
          onButtonClick={handleSubscribe}
        />
      </GridItem>
    </Grid>
  );
}
```

## Props

```typescript
interface PricingCardProps {
  /** Plan title */
  title: string;
  /** Price amount (number or string for "Custom", "Free", etc.) */
  price: number | string;
  /** Currency symbol */
  currency?: string;
  /** Billing period */
  period?: string;
  /** Original price (for showing discounts) */
  originalPrice?: number;
  /** List of features */
  features: string[];
  /** CTA button text */
  buttonText: string;
  /** Button click handler */
  onButtonClick: () => void;
  /** Whether this is the featured/recommended plan */
  featured?: boolean;
  /** Badge text (e.g., "Most Popular", "Best Value") */
  badge?: string;
  /** Additional description */
  description?: string;
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
- ✅ Focus indicators for buttons
- ✅ High contrast text
- ✅ Screen reader friendly
- ✅ Clear feature list structure

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Card` - Base card component
- `FeatureCard` - Feature showcase
- `ProductCard` - Product display
- `Button` - Call-to-action buttons

## Best Practices

1. **Highlight the recommended plan** - Use `featured` prop
2. **Keep features concise** - 5-7 features per plan
3. **Use clear pricing** - Include currency and period
4. **Consistent button text** - "Start Trial", "Subscribe", etc.
5. **Show value** - Use badges for discounts or popularity

## License

MIT
