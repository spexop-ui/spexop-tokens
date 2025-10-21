# DashboardCard Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A versatile card component for dashboard widgets and data displays. Features title, optional icon, action menu, and flexible content area with clean design.

## Features

- ✅ Title with optional icon
- ✅ Optional subtitle/description
- ✅ Action menu dropdown
- ✅ Flexible content area
- ✅ Footer actions
- ✅ Loading state
- ✅ Collapsible variant
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { DashboardCard } from '@spexop/react';

function App() {
  return (
    <DashboardCard
      title="Recent Activity"
      icon={Activity}
    >
      {/* Your content */}
      <p>Activity items go here...</p>
    </DashboardCard>
  );
}
```

## Basic Usage

### Simple Card

```tsx
<DashboardCard title="Quick Stats">
  <div className="stats-content">
    {/* Stats display */}
  </div>
</DashboardCard>
```

### With Icon

```tsx
import { BarChart } from '@spexop/icons';

<DashboardCard
  title="Revenue"
  icon={BarChart}
>
  <div className="chart">
    {/* Chart component */}
  </div>
</DashboardCard>
```

### With Subtitle

```tsx
<DashboardCard
  title="Team Performance"
  subtitle="Last 30 days"
  icon={Users}
>
  {/* Performance metrics */}
</DashboardCard>
```

### With Actions Menu

```tsx
<DashboardCard
  title="Recent Orders"
  icon={ShoppingCart}
  actions={[
    { label: 'View All', onClick: () => navigate('/orders') },
    { label: 'Export', onClick: handleExport },
    { label: 'Refresh', onClick: handleRefresh },
  ]}
>
  {/* Orders list */}
</DashboardCard>
```

### Loading State

```tsx
<DashboardCard
  title="Loading Data"
  icon={Database}
  loading={true}
>
  {/* Content hidden while loading */}
</DashboardCard>
```

## Common Patterns

### Analytics Dashboard

```tsx
import { Grid, GridItem, DashboardCard } from '@spexop/react';
import { Users, DollarSign, ShoppingCart, TrendingUp } from '@spexop/icons';

function AnalyticsDashboard() {
  return (
    <Grid columns={2} gap={6}>
      <GridItem>
        <DashboardCard
          title="Active Users"
          icon={Users}
          subtitle="Last 24 hours"
        >
          <div className="metric">12,345</div>
          <div className="trend">+12% vs yesterday</div>
        </DashboardCard>
      </GridItem>
      
      <GridItem>
        <DashboardCard
          title="Revenue"
          icon={DollarSign}
          subtitle="This month"
          actions={[
            { label: 'View Details', onClick: () => navigate('/revenue') },
            { label: 'Export Report', onClick: handleExport },
          ]}
        >
          <div className="metric">$45,678</div>
          <div className="trend">+8.5% vs last month</div>
        </DashboardCard>
      </GridItem>
    </Grid>
  );
}
```

### Activity Feed

```tsx
<DashboardCard
  title="Recent Activity"
  icon={Activity}
  actions={[
    { label: 'View All', onClick: () => navigate('/activity') },
    { label: 'Mark All Read', onClick: handleMarkAllRead },
  ]}
>
  <Stack direction="vertical" gap={3}>
    {activities.map(activity => (
      <div key={activity.id} className="activity-item">
        <span>{activity.user}</span>
        <span>{activity.action}</span>
        <span>{activity.time}</span>
      </div>
    ))}
  </Stack>
</DashboardCard>
```

### Chart Widget

```tsx
<DashboardCard
  title="Sales Trend"
  subtitle="Last 7 days"
  icon={BarChart}
  actions={[
    { label: 'Change Period', onClick: handleChangePeriod },
    { label: 'Download', onClick: handleDownload },
  ]}
  footer={
    <div className="chart-legend">
      <span>● Sales</span>
      <span>● Target</span>
    </div>
  }
>
  <LineChart data={salesData} />
</DashboardCard>
```

### Task List

```tsx
function TasksWidget() {
  const [tasks, setTasks] = useState([]);

  return (
    <DashboardCard
      title="Today's Tasks"
      subtitle={`${tasks.filter(t => !t.done).length} remaining`}
      icon={CheckSquare}
      actions={[
        { label: 'Add Task', onClick: handleAddTask },
        { label: 'View All', onClick: () => navigate('/tasks') },
      ]}
    >
      <Stack direction="vertical" gap={2}>
        {tasks.map(task => (
          <Checkbox
            key={task.id}
            checked={task.done}
            onChange={(done) => toggleTask(task.id, done)}
            label={task.title}
          />
        ))}
      </Stack>
    </DashboardCard>
  );
}
```

## Props

```typescript
interface DashboardCardProps {
  /** Card title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Optional icon */
  icon?: IconComponent;
  /** Content */
  children: React.ReactNode;
  /** Action menu items */
  actions?: Array<{
    label: string;
    onClick: () => void;
    icon?: IconComponent;
  }>;
  /** Footer content */
  footer?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Collapsible */
  collapsible?: boolean;
  /** Initially collapsed */
  defaultCollapsed?: boolean;
  /** Additional CSS class */
  className?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Card primitive
2. **Borders before shadows** - Clean border-based design
3. **Typography before decoration** - Clear title hierarchy
4. **Tokens before magic numbers** - Uses spacing tokens
5. **Composition before complexity** - Flexible content area

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Keyboard accessible actions
- ✅ Focus indicators
- ✅ Screen reader friendly
- ✅ Loading state announced

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Card` - Base card component
- `StatsCard` - Metric display
- `Grid` - Dashboard layout

## License

MIT
