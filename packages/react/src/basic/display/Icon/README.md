# Icon

Icon wrapper component that integrates with @spexop/icons. Supports named icons or custom SVG content with consistent sizing and styling.

## Installation

```bash
npm install @spexop/react @spexop/icons
```

## Import

```typescript
import { Icon } from '@spexop/react';
// Also import specific icons from @spexop/icons
import { Search, Menu, Settings } from '@spexop/icons';
```

## Basic Usage

### With @spexop/icons

```tsx
import { Search } from '@spexop/icons';
import { Icon } from '@spexop/react';

<Icon size="md">
  <Search size={20} strokeWidth={1.5} />
</Icon>
```

### By Icon Name

```tsx
<Icon name="search" size="md" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `undefined` | Icon name from @spexop/icons |
| `children` | `ReactNode` | `undefined` | Custom icon element (takes precedence over name) |
| `size` | `"sm"` \| `"md"` \| `"lg"` \| `"xl"` | `"md"` | Icon size variant |
| `className` | `string` | `""` | Additional CSS class |

### Size Variants

| Size | Pixels | Use Case |
|------|--------|----------|
| `sm` | 16px | Inline text, compact UIs, badges |
| `md` | 20px | Default, buttons, navigation |
| `lg` | 24px | Headers, prominent actions |
| `xl` | 32px | Hero sections, feature highlights |

## Examples

### Different Sizes

```tsx
import { Settings } from '@spexop/icons';

// Small - 16px
<Icon size="sm">
  <Settings size={16} />
</Icon>

// Medium (default) - 20px
<Icon size="md">
  <Settings size={20} />
</Icon>

// Large - 24px
<Icon size="lg">
  <Settings size={24} />
</Icon>

// Extra large - 32px
<Icon size="xl">
  <Settings size={32} />
</Icon>
```

### In Buttons

```tsx
import { Icon, Button } from '@spexop/react';
import { Download } from '@spexop/icons';

<Button variant="primary">
  <Icon size="sm">
    <Download size={16} />
  </Icon>
  Download File
</Button>
```

### In Navigation

```tsx
import { Icon, NavLink } from '@spexop/react';
import { Home, Users, Settings } from '@spexop/icons';

<nav>
  <NavLink href="/">
    <Icon size="sm"><Home size={16} /></Icon>
    Home
  </NavLink>
  <NavLink href="/users">
    <Icon size="sm"><Users size={16} /></Icon>
    Users
  </NavLink>
  <NavLink href="/settings">
    <Icon size="sm"><Settings size={16} /></Icon>
    Settings
  </NavLink>
</nav>
```

### Inline with Text

```tsx
<p>
  <Icon size="sm">
    <Search size={16} />
  </Icon>
  Search our documentation
</p>
```

### Custom Color

Icons inherit text color by default:

```tsx
<div style={{ color: 'var(--s-color-red-500)' }}>
  <Icon size="md">
    <Settings size={20} color="currentColor" />
  </Icon>
</div>
```

### With Custom SVG

```tsx
<Icon size="lg">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
  </svg>
</Icon>
```

## Icon Library Integration

### Using @spexop/icons

The Icon component works seamlessly with the official Spexop icon library:

```bash
npm install @spexop/icons
```

Available icons (262 total):

```typescript
import {
  // Navigation
  Home, Menu, Search, Settings,
  // Actions
  Plus, Edit, Trash, Download, Upload,
  // Communication
  Mail, MessageCircle, Phone, Send,
  // Media
  Image, Video, Music, Film,
  // And 250+ more...
} from '@spexop/icons';
```

**See**: [@spexop/icons documentation](https://npmjs.com/package/@spexop/icons) for complete icon list.

### Icon Props

When using @spexop/icons, you can pass additional props:

```typescript
<Icon>
  <Search
    size={20}           // Icon size in pixels
    strokeWidth={1.5}   // Stroke width (1-3)
    color="currentColor" // Color (inherits by default)
    className="custom"   // Additional class
  />
</Icon>
```

## Accessibility

### Screen Readers

Icons are decorative by default. For semantic icons:

```tsx
// Decorative (default)
<Icon><Settings size={20} /></Icon>

// Semantic (add role and label)
<Icon>
  <Settings size={20} role="img" aria-label="Settings icon" />
</Icon>
```

### In Buttons and IconButtons

When using icons in buttons, ensure the button has accessible text:

```tsx
// Good - text + icon
<Button>
  <Icon><Download size={16} /></Icon>
  Download
</Button>

// Good - icon-only with aria-label
<Button iconOnly aria-label="Download file">
  <Icon><Download size={20} /></Icon>
</Button>

// Bad - icon-only without label
<Button>
  <Icon><Download size={20} /></Icon>
</Button>
```

## Performance

- Zero runtime overhead
- No re-renders
- CSS-only sizing
- Lightweight wrapper (~100 bytes)

## Best Practices

### Do ✅

```tsx
// Use @spexop/icons for consistency
import { Search } from '@spexop/icons';
<Icon><Search size={20} /></Icon>

// Match icon size to component size
<Button size="sm">
  <Icon size="sm"><Plus size={16} /></Icon> Add
</Button>

// Use currentColor for theme integration
<Search size={20} color="currentColor" />

// Keep strokeWidth consistent (1.5 is default)
<Search size={20} strokeWidth={1.5} />
```

### Don't ❌

```tsx
// Don't use inconsistent sizes
<Icon size="md"><Search size={32} /></Icon> // Mismatch

// Don't inline SVG code (use @spexop/icons)
<Icon>
  <svg>...</svg> // Use named icons instead
</Icon>

// Don't skip accessibility for semantic icons
<Icon><Info size={20} /></Icon> // Missing aria-label

// Don't use hardcoded colors
<Icon><Search size={20} color="#ff0000" /></Icon>
// Use tokens: color="var(--s-color-red-500)"
```

## Common Patterns

### Icon + Text

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <Icon size="sm"><Check size={16} /></Icon>
  <span>Task completed</span>
</div>
```

### Feature Cards

```tsx
import { Card, CardHeader, CardBody, Icon } from '@spexop/react';
import { Zap } from '@spexop/icons';

<Card>
  <CardHeader 
    title="Fast Performance"
    badge={<Icon size="lg"><Zap size={24} /></Icon>}
  />
  <CardBody>
    <p>Optimized for speed and efficiency.</p>
  </CardBody>
</Card>
```

### Status Indicators

```tsx
const statusIcons = {
  success: <Icon><CheckCircle size={20} color="var(--s-color-green-500)" /></Icon>,
  warning: <Icon><AlertTriangle size={20} color="var(--s-color-yellow-500)" /></Icon>,
  error: <Icon><XCircle size={20} color="var(--s-color-red-500)" /></Icon>,
  info: <Icon><Info size={20} color="var(--s-color-blue-500)" /></Icon>
};

<div>{statusIcons[status]}</div>
```

## Related Documentation

- **@spexop/icons** - Official icon library (262 icons)
- **IconButton** - Icon-only button component
- **Button** - Button component with icon support
- **Badge** - Status badges with optional icons

## TypeScript

Full TypeScript support:

```typescript
import type { IconProps } from '@spexop/react';

const iconProps: IconProps = {
  size: 'md',
  className: 'custom-icon'
};
```

---

**Part of Display Components** - Typography and visual indicators for enhanced UI.
