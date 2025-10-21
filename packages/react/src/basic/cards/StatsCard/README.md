# StatsCard Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A specialized card component for displaying key metrics and statistics. Features large numbers, labels, trends, icons, and change indicators with clean, data-focused design.

## Features

- ✅ Large metric display
- ✅ Metric label/description
- ✅ Trend indicators (up/down)
- ✅ Change percentage
- ✅ Icon support
- ✅ Color variants for trends
- ✅ Comparison values
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { StatsCard } from '@spexop/react';

function App() {
  return (
    <StatsCard
      metric="1,234"
      label="Total Users"
      trend="up"
      change="+12.5%"
    />
  );
}
```

## Basic Usage

### Simple Stat

```tsx
<StatsCard
  metric="5,678"
  label="Revenue"
  currency="$"
/>
```

### With Trend

```tsx
<StatsCard
  metric="890"
  label="Orders"
  trend="up"
  change="+15%"
/>
```

### With Icon

```tsx
import { Users } from '@spexop/icons';

<StatsCard
  metric="12,345"
  label="Active Users"
  icon={Users}
  trend="up"
  change="+8.2%"
/>
```

### Negative Trend

```tsx
<StatsCard
  metric="234"
  label="Open Tickets"
  trend="down"
  change="-22%"
  trendLabel="vs last month"
/>
```

## Common Patterns

### Dashboard Stats

```tsx
import { Grid, GridItem, StatsCard } from '@spexop/react';
import { Users, DollarSign, ShoppingCart, TrendingUp } from '@spexop/icons';

function Dashboard() {
  return (
    <Grid columns={4} gap={6}>
      <GridItem>
        <StatsCard
          metric="12,345"
          label="Total Users"
          icon={Users}
          trend="up"
          change="+12%"
        />
      </GridItem>
      
      <GridItem>
        <StatsCard
          metric="$45,678"
          label="Revenue"
          icon={DollarSign}
          trend="up"
          change="+8.5%"
        />
      </GridItem>
      
      <GridItem>
        <StatsCard
          metric="890"
          label="Orders"
          icon={ShoppingCart}
          trend="up"
          change="+15.2%"
        />
      </GridItem>
      
      <GridItem>
        <StatsCard
          metric="67%"
          label="Growth"
          icon={TrendingUp}
          trend="up"
          change="+5.3%"
        />
      </GridItem>
    </Grid>
  );
}
```

### With Comparison

```tsx
<StatsCard
  metric="2,456"
  label="New Signups"
  comparison="vs 2,134 last month"
  trend="up"
  change="+15.1%"
/>
```

### Clickable Stats

```tsx
<StatsCard
  metric="128"
  label="Pending Reviews"
  icon={FileText}
  onClick={() => navigate('/reviews')}
  trend="down"
  change="-8%"
  clickable={true}
/>
```

### Time Period Stats

```tsx
function RevenueStats() {
  const [period, setPeriod] = useState('month');
  
  const stats = {
    month: { value: '$45,678', change: '+12%' },
    quarter: { value: '$138,234', change: '+8.5%' },
    year: { value: '$523,456', change: '+15.2%' },
  };

  return (
    <Card>
      <div className="card-header">
        <h3>Revenue</h3>
        <SegmentedButton
          value={period}
          onChange={setPeriod}
          options={[
            { value: 'month', label: 'Month' },
            { value: 'quarter', label: 'Quarter' },
            { value: 'year', label: 'Year' },
          ]}
        />
      </div>
      
      <StatsCard
        metric={stats[period].value}
        label={`Total ${period} revenue`}
        trend="up"
        change={stats[period].change}
      />
    </Card>
  );
}
```

### Analytics Dashboard

```tsx
function AnalyticsDashboard() {
  const metrics = [
    {
      metric: '45.2K',
      label: 'Page Views',
      icon: Eye,
      trend: 'up',
      change: '+12.5%',
      period: 'vs last week',
    },
    {
      metric: '2.8K',
      label: 'Unique Visitors',
      icon: Users,
      trend: 'up',
      change: '+8.3%',
      period: 'vs last week',
    },
    {
      metric: '3m 24s',
      label: 'Avg. Session',
      icon: Clock,
      trend: 'down',
      change: '-5.1%',
      period: 'vs last week',
    },
    {
      metric: '68%',
      label: 'Bounce Rate',
      icon: Activity,
      trend: 'down',
      change: '-3.2%',
      period: 'vs last week',
    },
  ];

  return (
    <Grid columns="auto-fit" minColumnWidth="250px" gap={6}>
      {metrics.map((stat, index) => (
        <GridItem key={index}>
          <StatsCard
            {...stat}
            trendLabel={stat.period}
          />
        </GridItem>
      ))}
    </Grid>
  );
}
```

## Props

```typescript
interface StatsCardProps {
  /** Main metric value */
  metric: string | number;
  /** Metric label/title */
  label: string;
  /** Optional icon */
  icon?: IconComponent;
  /** Currency symbol */
  currency?: string;
  /** Trend direction */
  trend?: "up" | "down" | "neutral";
  /** Change value/percentage */
  change?: string;
  /** Trend label (e.g., "vs last month") */
  trendLabel?: string;
  /** Comparison text */
  comparison?: string;
  /** Click handler */
  onClick?: () => void;
  /** Clickable state (shows hover) */
  clickable?: boolean;
  /** Additional CSS class */
  className?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Card primitive
2. **Borders before shadows** - Clean border-based design
3. **Typography before decoration** - Large, bold numbers for emphasis
4. **Tokens before magic numbers** - Uses spacing and color tokens
5. **Composition before complexity** - Simple, focused component

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ High contrast numbers
- ✅ Screen reader friendly
- ✅ Trend indicators with text
- ✅ Keyboard accessible (if clickable)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Card` - Base card component
- `DashboardCard` - Dashboard widgets
- `Badge` - Status indicators
- `Icon` - Icon display

## Best Practices

1. **Keep metrics clear** - Large, readable numbers
2. **Use appropriate trends** - Match color to positive/negative
3. **Format numbers** - Use thousands separators
4. **Provide context** - Include comparison periods
5. **Group related metrics** - Use grid layouts

## License

MIT
