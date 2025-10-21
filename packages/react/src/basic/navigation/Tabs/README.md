# Tabs

**Status**: ✅ Production Ready | **Version**: 0.2.0

An accessible tabs component for organizing content into sections.

> For comprehensive documentation, examples, and advanced patterns, see the [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md#tabs-component)

## Features

- Keyboard navigation (Arrow keys, Home, End)
- Screen reader accessible with ARIA attributes
- Multiple visual variants (default, pills, underline)
- Size variants
- Disabled tabs support
- Icons support
- Controlled and uncontrolled modes
- Full width option
- WCAG AA+ compliant

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Tabs, type Tab } from "@spexop/react";

const tabs: Tab[] = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
];

function App() {
  return <Tabs tabs={tabs} />;
}
```

## Controlled Mode

```tsx
import { useState } from "react";
import { Tabs } from "@spexop/react";

function App() {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs = [
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
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

## Variants

```tsx
{/* Default */}
<Tabs tabs={tabs} variant="default" />

{/* Pills */}
<Tabs tabs={tabs} variant="pills" />

{/* Underline */}
<Tabs tabs={tabs} variant="underline" />
```

## Sizes

```tsx
{/* Small */}
<Tabs tabs={tabs} size="sm" />

{/* Medium (default) */}
<Tabs tabs={tabs} size="md" />

{/* Large */}
<Tabs tabs={tabs} size="lg" />
```

## With Icons

```tsx
const tabs = [
  { 
    id: 'home', 
    label: 'Home', 
    icon: <HomeIcon />,
    content: <div>Home content</div> 
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: <SettingsIcon />,
    content: <div>Settings content</div> 
  },
];

<Tabs tabs={tabs} />
```

## Disabled Tabs

```tsx
const tabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
];

<Tabs tabs={tabs} />
```

## Full Width

```tsx
<Tabs tabs={tabs} fullWidth />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `Tab[]` | required | Array of tabs |
| `activeTab` | `string` | - | Currently active tab ID (controlled) |
| `onChange` | `(tabId: string) => void` | - | Callback when tab changes |
| `defaultActiveTab` | `string` | first tab | Default active tab ID (uncontrolled) |
| `variant` | `"default" \| "pills" \| "underline"` | `"default"` | Visual variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `fullWidth` | `boolean` | `false` | Tabs fill container width |
| `className` | `string` | - | Additional CSS class for container |
| `tabListClassName` | `string` | - | Additional CSS class for tab list |
| `tabPanelClassName` | `string` | - | Additional CSS class for tab panels |

### Tab Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `label` | `React.ReactNode` | Yes | Tab label |
| `content` | `React.ReactNode` | Yes | Tab panel content |
| `disabled` | `boolean` | No | Whether tab is disabled |
| `icon` | `React.ReactNode` | No | Icon before label |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Strong borders for active state indication
- **Principle 3: Typography before decoration** - Bold font weight for active tabs
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with full keyboard support

## Accessibility

- Uses proper ARIA roles (`tablist`, `tab`, `tabpanel`)
- `aria-selected` indicates active tab
- `aria-controls` links tabs to panels
- `aria-disabled` for disabled tabs
- Keyboard navigation with arrow keys
- Only active tab is in tab order (`tabIndex`)
- Focus visible indicators
- Screen reader friendly

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Left Arrow** | Navigate to previous tab (wraps to last) |
| **Right Arrow** | Navigate to next tab (wraps to first) |
| **Home** | Navigate to first tab |
| **End** | Navigate to last tab |
| **Tab** | Focus into active tab panel |
| **Shift + Tab** | Move focus to previous element |

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import { Tabs, type TabsProps, type Tab } from "@spexop/react";

interface CustomTab extends Tab {
  badge?: number;
  locked?: boolean;
}

function CustomTabs() {
  const tabs: CustomTab[] = [
    { 
      id: 'overview', 
      label: 'Overview', 
      content: <OverviewPanel />,
      badge: 5 
    },
    { 
      id: 'locked', 
      label: 'Premium', 
      content: <PremiumPanel />,
      locked: true,
      disabled: true 
    }
  ];

  return <Tabs tabs={tabs} variant="pills" size="lg" />;
}
```

## Advanced Patterns

### Lazy Loading Tab Content

```tsx
import { lazy, Suspense } from 'react';
import { Tabs, type Tab } from "@spexop/react";

const OverviewTab = lazy(() => import('./tabs/OverviewTab'));
const AnalyticsTab = lazy(() => import('./tabs/AnalyticsTab'));

const tabs: Tab[] = [
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
    id: 'analytics',
    label: 'Analytics',
    content: (
      <Suspense fallback={<Spinner />}>
        <AnalyticsTab />
      </Suspense>
    )
  }
];
```

### Tabs with URL Synchronization

```tsx
import { useSearchParams } from 'react-router-dom';

function URLTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={handleTabChange}
    />
  );
}
```

### Conditional Tab Rendering

```tsx
function ConditionalTabs({ userRole }: { userRole: string }) {
  const baseTabs: Tab[] = [
    { id: 'overview', label: 'Overview', content: <Overview /> },
    { id: 'details', label: 'Details', content: <Details /> }
  ];

  const adminTabs: Tab[] = userRole === 'admin' ? [
    { id: 'admin', label: 'Admin', content: <AdminPanel /> }
  ] : [];

  return <Tabs tabs={[...baseTabs, ...adminTabs]} />;
}
```

## Performance

- Lightweight: ~2.5KB gzipped
- Only active tab panel is rendered (others hidden with `hidden` attribute)
- Efficient keyboard navigation with O(1) lookups
- No unnecessary re-renders
- Supports lazy loading for large content

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- [Breadcrumb](../Breadcrumb/README.md) - For navigation hierarchy
- [Pagination](../Pagination/README.md) - For paginated content
- [NavLink](../NavLink/README.md) - For navigation links
- [Complete Navigation System](../USAGE-GUIDE.md#complete-navigation-system) - Full navigation setup

## Further Reading

- [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md) - Comprehensive guide with routing integration, migration guides, and advanced patterns
- [Accessibility Guidelines](../USAGE-GUIDE.md#accessibility) - WCAG compliance details
- [Best Practices](../USAGE-GUIDE.md#best-practices) - Mobile patterns and performance optimization
