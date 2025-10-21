# Tabs Component - Usage Guide

## Common Patterns

### Basic Tabs

```tsx
import { Tabs } from '@spexop/react';

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: <div>Overview content here</div>
  },
  {
    id: 'details',
    label: 'Details',
    content: <div>Details content here</div>
  },
  {
    id: 'reviews',
    label: 'Reviews',
    content: <div>Reviews content here</div>
  }
];

function ProductPage() {
  return <Tabs tabs={tabs} />;
}
```

### Controlled Tabs

```tsx
import { Tabs } from '@spexop/react';
import { useState } from 'react';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      content: <ProfileSettings />
    },
    {
      id: 'security',
      label: 'Security',
      content: <SecuritySettings />
    },
    {
      id: 'notifications',
      label: 'Notifications',
      content: <NotificationSettings />
    }
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={setActiveTab}
    />
  );
}
```

### With Icons

```tsx
import { Tabs } from '@spexop/react';
import { User, Lock, Bell } from '@spexop/icons';

const tabs = [
  {
    id: 'profile',
    label: 'Profile',
    icon: <User size={16} strokeWidth={2} />,
    content: <ProfileContent />
  },
  {
    id: 'security',
    label: 'Security',
    icon: <Lock size={16} strokeWidth={2} />,
    content: <SecurityContent />
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Bell size={16} strokeWidth={2} />,
    content: <NotificationsContent />
  }
];

<Tabs tabs={tabs} />
```

### With URL Synchronization

```tsx
import { Tabs } from '@spexop/react';
import { useSearchParams } from 'react-router-dom';

function URLTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const handleTabChange = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', content: <Overview /> },
    { id: 'details', label: 'Details', content: <Details /> },
    { id: 'analytics', label: 'Analytics', content: <Analytics /> }
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={handleTabChange}
    />
  );
}
```

### Lazy Loading Tab Content

```tsx
import { Tabs } from '@spexop/react';
import { lazy, Suspense } from 'react';
import { Spinner } from '@spexop/react';

const OverviewTab = lazy(() => import('./OverviewTab'));
const DetailsTab = lazy(() => import('./DetailsTab'));
const AnalyticsTab = lazy(() => import('./AnalyticsTab'));

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <Suspense fallback={<Spinner />}>
        <OverviewTab />
      </Suspense>
    )
  },
  {
    id: 'details',
    label: 'Details',
    content: (
      <Suspense fallback={<Spinner />}>
        <DetailsTab />
      </Suspense>
    )
  },
  {
    id: 'analytics',
    label: 'Analytics',
    content: (
      <Suspense fallback={<Spinner />}>
        <AnalyticsTab />
      </Suspense>
    )
  }
];

<Tabs tabs={tabs} />
```

### Variants

```tsx
// Default - bordered tabs
<Tabs tabs={tabs} variant="default" />

// Pills - rounded background tabs
<Tabs tabs={tabs} variant="pills" />

// Underline - bottom border indicator
<Tabs tabs={tabs} variant="underline" />
```

### Sizes

```tsx
// Small - compact tabs
<Tabs tabs={tabs} size="sm" />

// Medium - default
<Tabs tabs={tabs} size="md" />

// Large - prominent tabs
<Tabs tabs={tabs} size="lg" />
```

### Full Width Tabs

```tsx
<Tabs tabs={tabs} fullWidth />
```

### Disabled Tabs

```tsx
const tabs = [
  {
    id: 'available',
    label: 'Available',
    content: <AvailableContent />
  },
  {
    id: 'coming-soon',
    label: 'Coming Soon',
    content: <ComingSoonContent />,
    disabled: true
  },
  {
    id: 'premium',
    label: 'Premium Only',
    content: <PremiumContent />,
    disabled: !user.isPremium
  }
];

<Tabs tabs={tabs} />
```

### With State Persistence

```tsx
import { Tabs } from '@spexop/react';
import { useState, useEffect } from 'react';

function PersistentTabs() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'overview';
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const tabs = [
    { id: 'overview', label: 'Overview', content: <Overview /> },
    { id: 'details', label: 'Details', content: <Details /> }
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={setActiveTab}
    />
  );
}
```

## Design Tokens Used

```css
/* Tab buttons */
padding: var(--theme-spacing-3) var(--theme-spacing-4)
border: var(--theme-border-width) solid var(--theme-border)
gap: var(--theme-spacing-2)

/* Active tab */
border-color: var(--theme-primary)
background: var(--theme-primary-subtle)

/* Tab panel */
padding: var(--theme-spacing-6)
```

## Accessibility

### ARIA Tabs Pattern

```html
<div role="tablist" aria-label="Settings tabs">
  <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">
    Profile
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">
    Security
  </button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  Profile content
</div>
```

### Keyboard Navigation

- Tab to focus on tab list
- Arrow Left to move to previous tab
- Arrow Right to move to next tab
- Home to move to first tab
- End to move to last tab
- Enter/Space to activate tab

### Screen Reader Announcements

```bash
"Profile, tab, selected, 1 of 3"
"Security, tab, 2 of 3"
```

## Best Practices

### Do's

- Use tabs for related content that belongs together
- Limit to 3-7 tabs for usability
- Keep tab labels short (1-2 words)
- Use icons to clarify meaning
- Lazy load heavy content
- Persist active tab state

### Don'ts

- Don't use tabs for sequential steps (use stepper)
- Don't use too many tabs (>7)
- Don't hide critical content in tabs
- Don't use tabs for unrelated content
- Don't nest tabs inside tabs

## Performance

### Lazy Loading

Only load active tab content:

```tsx
const tabs = [
  {
    id: 'heavy',
    label: 'Heavy Tab',
    content: activeTab === 'heavy' ? <HeavyComponent /> : null
  }
];
```

### Memoization

```tsx
import { useMemo } from 'react';

const tabs = useMemo(() => [
  { id: '1', label: 'Tab 1', content: <Content1 /> },
  { id: '2', label: 'Tab 2', content: <Content2 /> }
], [/* dependencies */]);
```

## Related

- Link - For navigation links
- NavLink - For sidebar links
- Card - For card containers
