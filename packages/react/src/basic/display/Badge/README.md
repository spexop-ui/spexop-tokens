# Badge Component

Small status indicator component for displaying labels, counts, or status information.

## Features

- **6 Variants**: Default, Success, Warning, Error, Info, Subtle
- **3 Sizes**: XS, SM, MD
- **2 Shapes**: Pill (rounded) and Square
- **Theme-Aware**: Light and dark mode support
- **Accessible**: ARIA label support and focus states
- **Responsive**: Adapts to mobile devices
- **Icon Support**: Can contain icons alongside text

## Usage

### Basic Badge

```tsx
import { Badge } from '@spexop/react';

function MyComponent() {
  return (
    <Badge variant="default">New</Badge>
  );
}
```

### Badge Variants

```tsx
import { Badge } from '@spexop/react';

function MyComponent() {
  return (
    <>
      {/* Default - blue accent */}
      <Badge variant="default">Default</Badge>

      {/* Success - green accent */}
      <Badge variant="success">Approved</Badge>

      {/* Warning - yellow accent */}
      <Badge variant="warning">In Review</Badge>

      {/* Error - red accent */}
      <Badge variant="error">Failed</Badge>

      {/* Info - blue accent */}
      <Badge variant="info">Information</Badge>

      {/* Subtle - neutral gray */}
      <Badge variant="subtle">Priority 1</Badge>
    </>
  );
}
```

### Badge Sizes

```tsx
import { Badge } from '@spexop/react';

function MyComponent() {
  return (
    <>
      <Badge size="xs">Extra Small</Badge>
      <Badge size="sm">Small (default)</Badge>
      <Badge size="md">Medium</Badge>
    </>
  );
}
```

### Badge Shapes

```tsx
import { Badge } from '@spexop/react';

function MyComponent() {
  return (
    <>
      {/* Pill shape (default) */}
      <Badge pill>Pill Badge</Badge>

      {/* Square corners */}
      <Badge pill={false}>Square Badge</Badge>
    </>
  );
}
```

### Badge with Icons

```tsx
import { Badge } from '@spexop/react';
import { Check, Clock, Package } from '@spexop/icons';

function MyComponent() {
  return (
    <>
      {/* Icon with text */}
      <Badge variant="success">
        <Check size={12} strokeWidth={2} />
        Approved
      </Badge>

      {/* Icon with text */}
      <Badge variant="warning">
        <Clock size={12} strokeWidth={2} />
        In Review
      </Badge>

      {/* Icon with text */}
      <Badge variant="default">
        <Package size={12} strokeWidth={2} />
        Coming Soon
      </Badge>
    </>
  );
}
```

### Status Indicators

```tsx
import { Badge } from '@spexop/react';

function ComponentStatus() {
  const components = [
    { name: 'Button', status: 'approved' },
    { name: 'Card', status: 'in-review' },
    { name: 'Modal', status: 'coming-soon' }
  ];

  return (
    <div>
      {components.map(comp => (
        <div key={comp.name}>
          <span>{comp.name}</span>
          <Badge 
            variant={
              comp.status === 'approved' ? 'success' :
              comp.status === 'in-review' ? 'warning' : 'default'
            }
            size="xs"
          >
            {comp.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}
```

### Version Badge

```tsx
import { Badge } from '@spexop/react';

function Header() {
  return (
    <div>
      <h1>Spexop Design System</h1>
      <Badge variant="default" size="sm" pill>
        v0.2.1
      </Badge>
    </div>
  );
}
```

### Count Badge

```tsx
import { Badge } from '@spexop/react';

function NotificationButton() {
  const unreadCount = 5;

  return (
    <button>
      Notifications
      {unreadCount > 0 && (
        <Badge variant="error" size="xs">
          {unreadCount}
        </Badge>
      )}
    </button>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Badge content (text, icons, or both) |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'subtle'` | `'default'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md'` | `'sm'` | Badge size |
| `pill` | `boolean` | `true` | Pill shape (rounded) vs square corners |
| `className` | `string` | - | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles (use sparingly) |
| `aria-label` | `string` | - | Accessibility label |

## Variants

### Default

Blue accent color. Perfect for general information, versions, or neutral status.

### Success

Green accent color. Use for positive states like "Approved", "Active", "Completed".

### Warning

Yellow accent color. Use for cautionary states like "Pending", "In Review", "Draft".

### Error

Red accent color. Use for negative states like "Failed", "Rejected", "Deprecated".

### Info

Blue accent color (same as default). Use for informational states.

### Subtle

Gray/neutral accent color. Use for low-emphasis labels like priorities, categories.

## Size Guidelines

- **XS (12px text)**: Use for compact layouts, tags, or when space is limited
- **SM (12px text)**: Default size, works in most contexts
- **MD (14px text)**: Use for prominent badges or when more emphasis is needed

## Accessibility

- **Semantic HTML**: Uses `<span>` element
- **ARIA Labels**: Support for `aria-label` for screen readers
- **Focus States**: Clear focus ring on `:focus-visible`
- **High Contrast**: Borders ensure visibility in all color modes
- **Text Transform**: Uppercase for distinction and readability

## Design Tokens Used

All styling uses design tokens from `@spexop/tokens`:

- **Spacing**: `--s-spacing-{1-5}`
- **Colors**: `--s-color-{neutral|red|blue|green|yellow}-{100-900}`
- **Border Radius**: `--s-radius-{base|pill}`
- **Typography**: `--s-font-size-{xs|sm}`
- **Transitions**: `--s-duration-fast`, `--s-ease-smooth`

## Responsive Behavior

**Desktop (> 768px)**:

- Full padding and sizes as specified

**Mobile (≤ 768px)**:

- Slightly reduced padding for compact display
- Maintained readability with adjusted min-heights

## Best Practices

✅ **DO:**

- Use semantic colors (success for positive, error for negative)
- Keep text concise (1-3 words ideal)
- Use XS size for dense layouts
- Combine with icons for quick recognition
- Use pill shape for most cases (rounder, friendlier)

❌ **DON'T:**

- Use long text strings in badges
- Mix too many variants on the same page
- Use badges as buttons (use Button component instead)
- Overuse bright variants (warning, error) - they lose impact
- Forget aria-label for icon-only badges

## Common Use Cases

- **Status Indicators**: Component approval, build status, deployment state
- **Version Numbers**: Package versions, release tags
- **Counts**: Notification counts, unread messages, cart items
- **Categories**: Project types, content tags
- **Priorities**: Task urgency, importance levels
- **Availability**: In stock, out of stock, limited
