# Breadcrumb

**Status**: ✅ Production Ready | **Version**: 0.2.0

An accessible breadcrumb navigation component for showing navigation hierarchy.

> For comprehensive documentation, examples, and advanced patterns, see the [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md#breadcrumb-component)

## Features

- Keyboard accessible navigation
- Screen reader accessible with ARIA
- Multiple size variants
- Custom separator support
- Icons support
- Collapsible for long paths
- Click handlers or links
- Disabled items
- Semantic HTML
- WCAG AA+ compliant

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Breadcrumb } from "@spexop/react";
import type { BreadcrumbItem } from "@spexop/react";

const items: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Category', href: '/products/category' },
  { label: 'Current Page' },
];

function App() {
  return <Breadcrumb items={items} />;
}
```

## With Click Handlers

```tsx
const items = [
  { label: 'Home', onClick: () => navigate('/') },
  { label: 'Products', onClick: () => navigate('/products') },
  { label: 'Current Page' },
];

<Breadcrumb items={items} />
```

## Sizes

```tsx
{/* Small */}
<Breadcrumb items={items} size="sm" />

{/* Medium (default) */}
<Breadcrumb items={items} size="md" />

{/* Large */}
<Breadcrumb items={items} size="lg" />
```

## Custom Separator

```tsx
{/* Slash separator */}
<Breadcrumb items={items} separator="/" />

{/* Custom icon */}
<Breadcrumb items={items} separator={<CustomIcon />} />
```

## With Icons

```tsx
const items = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Products', href: '/products', icon: <ProductIcon /> },
  { label: 'Current Page', icon: <PageIcon /> },
];

<Breadcrumb items={items} />
```

## Collapsible

```tsx
{/* Show max 4 items, collapse middle items */}
<Breadcrumb items={longItems} maxItems={4} />
```

## Disabled Items

```tsx
const items = [
  { label: 'Home', href: '/' },
  { label: 'Private Section', disabled: true },
  { label: 'Current Page' },
];

<Breadcrumb items={items} />
```

## Router Integration

```tsx
import { useNavigate } from 'react-router-dom';

function MyBreadcrumb() {
  const navigate = useNavigate();

  const items = [
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Products', onClick: () => navigate('/products') },
    { label: 'Category', onClick: () => navigate('/products/category') },
    { label: 'Current Product' },
  ];

  return <Breadcrumb items={items} />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | required | Array of breadcrumb items |
| `separator` | `React.ReactNode` | chevron right | Separator between items |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `maxItems` | `number` | - | Max items before collapse |
| `className` | `string` | - | Additional CSS class |
| `aria-label` | `string` | `"Breadcrumb"` | ARIA label |

### BreadcrumbItem Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `React.ReactNode` | Yes | Item label |
| `href` | `string` | No | Link URL |
| `onClick` | `() => void` | No | Click handler |
| `disabled` | `boolean` | No | Whether disabled |
| `icon` | `React.ReactNode` | No | Icon to display |

## Design Principles

This component follows "The Spexop Way":

- **Principle 3: Typography before decoration** - Font weight for hierarchy
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with proper navigation semantics

## Accessibility

- Uses semantic `<nav>` element
- Proper ARIA labels and landmarks
- `aria-current="page"` for current item
- Keyboard navigable links/buttons
- Focus visible indicators
- Screen reader friendly
- High contrast colors

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Tab** | Navigate through clickable breadcrumb items |
| **Shift + Tab** | Navigate backwards through items |
| **Enter** | Activate focused link or button |
| **Space** | Activate focused button (if using onClick) |

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import { Breadcrumb, type BreadcrumbProps, type BreadcrumbItem } from "@spexop/react";

interface CustomBreadcrumbItem extends BreadcrumbItem {
  metadata?: {
    category: string;
    timestamp: number;
  };
}

const items: CustomBreadcrumbItem[] = [
  { 
    label: 'Home', 
    href: '/',
    metadata: { category: 'root', timestamp: Date.now() }
  },
  { label: 'Current' }
];
```

## Advanced Patterns

### Auto-Generated from Route

```tsx
import { useLocation } from 'react-router-dom';
import { Breadcrumb, type BreadcrumbItem } from "@spexop/react";

function AutoBreadcrumb() {
  const location = useLocation();
  
  const items: BreadcrumbItem[] = useMemo(() => {
    const paths = location.pathname.split('/').filter(Boolean);
    return [
      { label: 'Home', href: '/' },
      ...paths.map((path, index) => ({
        label: path.charAt(0).toUpperCase() + path.slice(1),
        href: `/${paths.slice(0, index + 1).join('/')}`
      }))
    ];
  }, [location.pathname]);
  
  return <Breadcrumb items={items} />;
}
```

### With Structured Data (SEO)

```tsx
function SEOBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://example.com${item.href}` : undefined
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Breadcrumb items={items} />
    </>
  );
}
```

## Performance

- Lightweight: ~2KB gzipped
- No runtime dependencies
- Optimized re-renders with React.memo potential
- Icon components from @spexop/icons are shared across components

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- [Pagination](../Pagination/README.md) - For paginated content navigation
- [Tabs](../Tabs/README.md) - For horizontal content navigation
- [NavLink](../NavLink/README.md) - For navigation links
- [Complete Navigation System](../USAGE-GUIDE.md#complete-navigation-system) - Full navigation setup

## Further Reading

- [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md) - Comprehensive guide with routing integration, migration guides, and advanced patterns
- [Accessibility Guidelines](../USAGE-GUIDE.md#accessibility) - WCAG compliance details
- [Best Practices](../USAGE-GUIDE.md#best-practices) - Mobile patterns and performance optimization
