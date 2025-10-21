# TimelineCard Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A specialized card component for displaying timeline events and chronological information. Features date/time, title, description, and status indicators with clean, vertical layout.

## Features

- ✅ Date and time display
- ✅ Event title and description
- ✅ Status indicator
- ✅ Icon support
- ✅ Connector line (for multiple cards)
- ✅ Timestamp formatting
- ✅ Interactive variant
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { TimelineCard } from '@spexop/react';

function App() {
  return (
    <TimelineCard
      date="2025-01-20"
      time="14:30"
      title="Project Launched"
      description="Successfully deployed v2.0 to production"
      status="completed"
    />
  );
}
```

## Basic Usage

### Simple Event

```tsx
<TimelineCard
  date="2025-01-15"
  title="Meeting scheduled"
  description="Team sync at 2:00 PM"
/>
```

### With Status

```tsx
<TimelineCard
  date="2025-01-18"
  time="10:00 AM"
  title="Design review"
  description="Review new dashboard designs"
  status="completed"
/>
```

### With Icon

```tsx
import { CheckCircle } from '@spexop/icons';

<TimelineCard
  date="2025-01-20"
  time="14:30"
  title="Deployment successful"
  description="Production deployment completed without issues"
  icon={CheckCircle}
  status="completed"
/>
```

## Status Variants

```tsx
{/* Completed */}
<TimelineCard
  date="2025-01-15"
  title="Task completed"
  status="completed"
/>

{/* In Progress */}
<TimelineCard
  date="2025-01-18"
  title="Currently working"
  status="in-progress"
/>

{/* Pending */}
<TimelineCard
  date="2025-01-20"
  title="Scheduled for later"
  status="pending"
/>

{/* Cancelled */}
<TimelineCard
  date="2025-01-17"
  title="Meeting cancelled"
  status="cancelled"
/>
```

## Common Patterns

### Activity Timeline

```tsx
import { Stack, TimelineCard } from '@spexop/react';

function ActivityTimeline() {
  const events = [
    {
      id: 1,
      date: '2025-01-20',
      time: '14:30',
      title: 'Deployed to production',
      description: 'Version 2.0 released',
      status: 'completed',
      icon: Rocket,
    },
    {
      id: 2,
      date: '2025-01-20',
      time: '11:15',
      title: 'Code review completed',
      description: 'All PRs merged',
      status: 'completed',
      icon: CheckCircle,
    },
    {
      id: 3,
      date: '2025-01-19',
      time: '16:00',
      title: 'Design finalized',
      description: 'UI designs approved',
      status: 'completed',
      icon: Palette,
    },
  ];

  return (
    <Container maxWidth="md" padding={8}>
      <h2>Project Timeline</h2>
      
      <Stack direction="vertical" gap={4}>
        {events.map(event => (
          <TimelineCard key={event.id} {...event} />
        ))}
      </Stack>
    </Container>
  );
}
```

### Order Tracking

```tsx
function OrderTracking({ orderId }) {
  const trackingEvents = [
    {
      date: '2025-01-20',
      time: '09:00',
      title: 'Delivered',
      description: 'Package delivered to your address',
      status: 'completed',
    },
    {
      date: '2025-01-19',
      time: '14:30',
      title: 'Out for delivery',
      description: 'Package is on the way',
      status: 'completed',
    },
    {
      date: '2025-01-18',
      time: '11:00',
      title: 'Shipped',
      description: 'Package shipped from warehouse',
      status: 'completed',
    },
    {
      date: '2025-01-17',
      time: '10:00',
      title: 'Order placed',
      description: 'Order confirmed and processing',
      status: 'completed',
    },
  ];

  return (
    <Stack direction="vertical" gap={3}>
      {trackingEvents.map((event, index) => (
        <TimelineCard
          key={index}
          {...event}
          showConnector={index < trackingEvents.length - 1}
        />
      ))}
    </Stack>
  );
}
```

### Project History

```tsx
function ProjectHistory() {
  const milestones = [
    {
      date: '2025-01-20',
      title: 'Launch',
      description: 'Project successfully launched to public',
      status: 'completed',
      icon: Rocket,
    },
    {
      date: '2025-01-15',
      title: 'Beta Testing',
      description: 'Opened to beta testers',
      status: 'completed',
      icon: Users,
    },
    {
      date: '2025-01-10',
      title: 'Development',
      description: 'Core features implemented',
      status: 'completed',
      icon: Code,
    },
    {
      date: '2025-01-05',
      title: 'Planning',
      description: 'Project kickoff and requirements',
      status: 'completed',
      icon: FileText,
    },
  ];

  return (
    <Card>
      <h2>Project Milestones</h2>
      <Stack direction="vertical" gap={3}>
        {milestones.map((milestone, index) => (
          <TimelineCard
            key={index}
            {...milestone}
            showConnector={index < milestones.length - 1}
          />
        ))}
      </Stack>
    </Card>
  );
}
```

## Props

```typescript
interface TimelineCardProps {
  /** Event date */
  date: string;
  /** Event time */
  time?: string;
  /** Event title */
  title: string;
  /** Event description */
  description?: string;
  /** Status indicator */
  status?: "completed" | "in-progress" | "pending" | "cancelled";
  /** Optional icon */
  icon?: IconComponent;
  /** Show connector line to next item */
  showConnector?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Card primitive
2. **Borders before shadows** - Clean border and connector lines
3. **Typography before decoration** - Clear event hierarchy
4. **Tokens before magic numbers** - Uses spacing and color tokens
5. **Composition before complexity** - Simple, stackable design

## Accessibility

- ✅ Semantic HTML structure
- ✅ Chronological order maintained
- ✅ Status indicators accessible
- ✅ Proper heading hierarchy
- ✅ Screen reader friendly

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Card` - Base card component
- `Stack` - Vertical stacking
- `Badge` - Status indicators

## License

MIT
