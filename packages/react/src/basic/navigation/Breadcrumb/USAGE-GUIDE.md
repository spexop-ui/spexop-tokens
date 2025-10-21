# Breadcrumb Component - Usage Guide

## Common Patterns

### Basic Page Breadcrumb

```tsx
import { Breadcrumb } from '@spexop/react';

function ProductPage() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Current Product' }
  ];

  return (
    <div>
      <Breadcrumb items={items} />
      <h1>Product Details</h1>
      {/* Page content */}
    </div>
  );
}
```

### With Router Integration

```tsx
import { Breadcrumb } from '@spexop/react';
import { useNavigate } from 'react-router-dom';

function Page() {
  const navigate = useNavigate();

  const items = [
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Products', onClick: () => navigate('/products') },
    { label: 'Electronics', onClick: () => navigate('/products/electronics') },
    { label: 'Phones' }
  ];

  return <Breadcrumb items={items} />;
}
```

### With Icons

```tsx
import { Breadcrumb } from '@spexop/react';
import { Home, Package, Tag } from '@spexop/icons';

const items = [
  {
    label: 'Home',
    href: '/',
    icon: <Home size={16} strokeWidth={2} />
  },
  {
    label: 'Products',
    href: '/products',
    icon: <Package size={16} strokeWidth={2} />
  },
  {
    label: 'Category',
    href: '/products/category',
    icon: <Tag size={16} strokeWidth={2} />
  },
  { label: 'Current Page' }
];

<Breadcrumb items={items} />
```

### Auto-Generated from URL

```tsx
import { Breadcrumb } from '@spexop/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

function AutoBreadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();

  const items = useMemo(() => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Home', onClick: () => navigate('/') }
    ];

    let currentPath = '';
    for (const path of paths) {
      currentPath += `/${path}`;
      const isLast = currentPath === location.pathname;
      
      breadcrumbs.push({
        label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
        onClick: isLast ? undefined : () => navigate(currentPath)
      });
    }

    return breadcrumbs;
  }, [location.pathname, navigate]);

  return <Breadcrumb items={items} />;
}
```

### Collapsible Long Paths

```tsx
import { Breadcrumb } from '@spexop/react';

const longPath = [
  { label: 'Home', href: '/' },
  { label: 'Level 1', href: '/l1' },
  { label: 'Level 2', href: '/l1/l2' },
  { label: 'Level 3', href: '/l1/l2/l3' },
  { label: 'Level 4', href: '/l1/l2/l3/l4' },
  { label: 'Level 5', href: '/l1/l2/l3/l4/l5' },
  { label: 'Current' }
];

// Shows: Home / ... / Level 5 / Current
<Breadcrumb items={longPath} maxItems={4} />
```

### Custom Separator

```tsx
import { Breadcrumb } from '@spexop/react';
import { ArrowRight, ChevronRight } from '@spexop/icons';

// Slash separator
<Breadcrumb items={items} separator="/" />

// Arrow separator
<Breadcrumb items={items} separator={<ArrowRight size={12} />} />

// Chevron separator (default)
<Breadcrumb items={items} separator={<ChevronRight size={12} />} />

// Text separator
<Breadcrumb items={items} separator="›" />
```

### Different Sizes

```tsx
// Small - for compact layouts
<Breadcrumb items={items} size="sm" />

// Medium - default
<Breadcrumb items={items} size="md" />

// Large - for emphasis
<Breadcrumb items={items} size="lg" />
```

### With Disabled Items

```tsx
const items = [
  { label: 'Home', href: '/' },
  { label: 'Private Section', disabled: true },
  { label: 'Restricted Area', disabled: true },
  { label: 'Current' }
];

<Breadcrumb items={items} />
```

## Design Tokens Used

```css
/* Spacing */
gap: var(--theme-spacing-2)
padding: var(--theme-spacing-1) var(--theme-spacing-2)

/* Colors */
color: var(--theme-text-secondary)
color: var(--theme-primary) /* Active/hover */

/* Typography */
font-size: var(--theme-font-size-sm)
font-weight: var(--theme-font-weight-regular)
```

## Accessibility

### Semantic Markup

Breadcrumb uses semantic navigation with ordered list:

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li aria-current="page">Current</li>
  </ol>
</nav>
```

### Screen Reader Support

```tsx
<Breadcrumb 
  items={items} 
  aria-label="Page navigation breadcrumb"
/>
```

### Keyboard Navigation

- Tab to navigate through links
- Enter to activate link
- Disabled items are not focusable

## Best Practices

### Do's

- Always include Home as first item
- Use clear, descriptive labels
- Provide href or onClick for clickable items
- Keep labels short (1-2 words)
- Use icons sparingly
- Add maxItems for long paths

### Don'ts

- Don't make the last item clickable
- Don't use breadcrumbs for flat navigation
- Don't include too many levels (max 5-6)
- Don't forget aria-label for screen readers

## Performance

- Renders only visible items
- Memoize items array if generated dynamically
- CSS Modules for scoped styling
- Minimal re-renders

## Related

- Link - For general navigation
- NavLink - For sidebar navigation
- Pagination - For sequential navigation
