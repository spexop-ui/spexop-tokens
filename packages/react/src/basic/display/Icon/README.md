# Icon Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A flexible icon component that supports @spexop/icons by name or custom icon components. Features multiple sizes and theme-aware styling.

## Features

- ✅ Support for @spexop/icons by name
- ✅ Custom icon component support
- ✅ 4 sizes (sm, md, lg, xl)
- ✅ Theme-aware styling
- ✅ Consistent sizing with design tokens
- ✅ TypeScript support
- ✅ Accessible by default

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { Icon } from '@spexop/react';

function App() {
  return (
    <>
      {/* Using icon name */}
      <Icon name="Home" size="md" />
      
      {/* Using custom icon */}
      <Icon size="lg">
        <CustomIcon />
      </Icon>
    </>
  );
}
```

## Sizes

### Small (sm) - 16px

```tsx
<Icon name="Check" size="sm" />
```

### Medium (md) - 20px (Default)

```tsx
<Icon name="User" size="md" />
```

### Large (lg) - 24px

```tsx
<Icon name="Settings" size="lg" />
```

### Extra Large (xl) - 32px

```tsx
<Icon name="Heart" size="xl" />
```

## Using @spexop/icons

### By Name

```tsx
<Icon name="Home" />
<Icon name="User" />
<Icon name="Settings" />
<Icon name="Search" />
<Icon name="Bell" />
```

### Available Icons

The Icon component supports all icons from @spexop/icons package. Common icons include:

- **Navigation:** Home, Menu, ChevronLeft, ChevronRight, ArrowUp, ArrowDown
- **Actions:** Plus, Minus, X, Check, Edit, Trash
- **Communication:** Mail, Phone, MessageSquare
- **Media:** Play, Pause, Volume, Camera
- **Files:** File, Folder, Download, Upload
- **UI:** Search, Settings, User, Bell, Heart
- **And many more...**

## Using Custom Icons

### React Component

```tsx
import { Icon } from '@spexop/react';
import { CustomIcon } from './icons';

<Icon size="md">
  <CustomIcon />
</Icon>
```

### SVG Element

```tsx
<Icon size="lg">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
</Icon>
```

### Emoji or Unicode

```tsx
<Icon size="md">
  <span>⭐</span>
</Icon>
```

## Common Patterns

### Icon with Text

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <Icon name="Home" size="sm" />
  <span>Home</span>
</div>
```

### Icon Button

```tsx
<button style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <Icon name="Plus" size="sm" />
  Add Item
</button>
```

### Status Indicators

```tsx
function StatusIndicator({ status }) {
  const iconMap = {
    success: 'CheckCircle',
    error: 'XCircle',
    warning: 'AlertTriangle',
    info: 'Info',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon name={iconMap[status]} size="sm" />
      <span>{status}</span>
    </div>
  );
}
```

### Navigation Menu

```tsx
function NavMenu() {
  const menuItems = [
    { icon: 'Home', label: 'Dashboard' },
    { icon: 'Users', label: 'Team' },
    { icon: 'Settings', label: 'Settings' },
    { icon: 'HelpCircle', label: 'Help' },
  ];

  return (
    <nav>
      {menuItems.map(item => (
        <a key={item.label} href={`/${item.label.toLowerCase()}`}>
          <Icon name={item.icon} size="md" />
          {item.label}
        </a>
      ))}
    </nav>
  );
}
```

### Feature List

```tsx
function FeatureList() {
  const features = [
    'Fast performance',
    'Easy to use',
    'Fully accessible',
    'Dark mode support',
  ];

  return (
    <ul>
      {features.map(feature => (
        <li key={feature}>
          <Icon name="Check" size="sm" />
          {feature}
        </li>
      ))}
    </ul>
  );
}
```

### Icon Grid

```tsx
function IconGrid() {
  const icons = [
    'Home', 'User', 'Settings', 'Search',
    'Bell', 'Mail', 'Heart', 'Star',
  ];

  return (
    <Grid columns={4} gap={4}>
      {icons.map(icon => (
        <GridItem key={icon}>
          <div style={{ textAlign: 'center' }}>
            <Icon name={icon} size="lg" />
            <p>{icon}</p>
          </div>
        </GridItem>
      ))}
    </Grid>
  );
}
```

## Props

```typescript
interface IconProps {
  /** Icon name from @spexop/icons */
  name?: string;
  /** Custom ReactNode icon (takes precedence over name) */
  children?: ReactNode;
  /** Size of the icon */
  size?: "sm" | "md" | "lg" | "xl";
  /** Additional CSS classes */
  className?: string;
}
```

## Size Mapping

| Size | Pixels | Token |
|------|--------|-------|
| sm   | 16px   | --s-icon-sm |
| md   | 20px   | --s-icon-md |
| lg   | 24px   | --s-icon-lg |
| xl   | 32px   | --s-icon-xl |

## Design Principles

Following "The Spexop Way":

1. **Tokens before magic numbers** - Uses size tokens
2. **Standards before frameworks** - Leverages currentColor for theming
3. **Composition before complexity** - Supports both name and children

## Accessibility

- ✅ Uses semantic span wrapper
- ✅ Inherits color from parent (currentColor)
- ✅ Appropriate for decorative icons
- ✅ Use with aria-label on parent for meaningful icons
- ✅ Screen reader compatible

### Best Practices

**Decorative Icons:**

```tsx
<button aria-label="Close">
  <Icon name="X" />
</button>
```

**Meaningful Icons:**

```tsx
<Icon name="Error" aria-hidden="false" role="img" aria-label="Error occurred" />
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `IconButton` - Icon-only button
- `Badge` - Status indicators
- `Button` - Buttons with icons

## License

MIT
