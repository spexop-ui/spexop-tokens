# Badge Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A versatile badge component for displaying small pieces of information like status indicators, counts, labels, and tags. Features multiple variants, sizes, and density options with full theme support.

## Features

- ✅ 6 visual variants (default, success, warning, error, info, subtle)
- ✅ 3 sizes (xs, sm, md)
- ✅ 3 density modes (compact, normal, spacious)
- ✅ Pill and square shapes
- ✅ Design token integration
- ✅ Theme-aware styling
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Badge } from '@spexop/react';

function App() {
  return (
    <>
      <Badge variant="success">Active</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info" size="xs">New</Badge>
    </>
  );
}
```

## Variants

### Status Variants

#### Success

Green badge for positive states and confirmations.

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="success">Completed</Badge>
```

#### Warning

Yellow badge for warnings and cautionary states.

```tsx
<Badge variant="warning">Pending</Badge>
<Badge variant="warning">Limited</Badge>
```

#### Error

Red badge for errors and destructive states.

```tsx
<Badge variant="error">Failed</Badge>
<Badge variant="error">Expired</Badge>
```

#### Info

Blue badge for informational states.

```tsx
<Badge variant="info">New</Badge>
<Badge variant="info">Beta</Badge>
```

### Visual Variants

#### Default

Neutral gray badge for general purpose use.

```tsx
<Badge variant="default">Default</Badge>
```

#### Subtle

Low-contrast badge for subtle emphasis.

```tsx
<Badge variant="subtle">Draft</Badge>
```

## Sizes

### Extra Small (xs)

Compact badge for tight spaces.

```tsx
<Badge size="xs">12</Badge>
```

### Small (sm) - Default

Standard badge size for most use cases.

```tsx
<Badge size="sm">Badge</Badge>
```

### Medium (md)

Larger badge for emphasis.

```tsx
<Badge size="md">Featured</Badge>
```

## Density

Control padding and spacing for different contexts.

```tsx
<Badge density="compact">Compact</Badge>
<Badge density="normal">Normal</Badge>
<Badge density="spacious">Spacious</Badge>
```

## Shape

```tsx
{/* Pill shape (default) */}
<Badge pill={true}>Pill</Badge>

{/* Square corners */}
<Badge pill={false}>Square</Badge>
```

## Props

```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "subtle";
  size?: "xs" | "sm" | "md";
  density?: "compact" | "normal" | "spacious";
  pill?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean 1-2px borders for definition
2. **Typography before decoration** - Clear, readable text
3. **Tokens before magic numbers** - Uses design tokens for all values
4. **High-contrast colors** - WCAG AA+ compliant color combinations

## Accessibility

- Uses semantic HTML
- Sufficient color contrast ratios
- Works with screen readers
- Respects reduced motion preferences

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Icon` - For icon-only indicators
- `KeyboardShortcut` - For keyboard shortcuts
- `Button` - For interactive elements

## License

MIT
