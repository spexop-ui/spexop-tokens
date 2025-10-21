# Link Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A general-purpose link component with multiple variants, sizes, and full accessibility support. Features clean border-based design with icon support and active state handling.

## Features

- 5 visual variants (text, ghost, outline, secondary, primary)
- 3 sizes (sm, md, lg)
- Active state with aria-current
- External link handling with security
- Icon support
- Full-width option
- Disabled state
- WCAG AA+ accessible
- TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Link } from '@spexop/react';

function App() {
  return (
    <Link href="/docs" variant="text">
      Documentation
    </Link>
  );
}
```

## Variants

### Text (Default)

Text-only link with underline on hover.

```tsx
<Link href="/docs" variant="text">
  Documentation
</Link>
```

### Ghost

Transparent link with hover background.

```tsx
<Link href="/dashboard" variant="ghost">
  Dashboard
</Link>
```

### Outline

Border-based link that fills on hover.

```tsx
<Link href="/signup" variant="outline">
  Sign Up
</Link>
```

### Secondary

Subtle bordered style for secondary actions.

```tsx
<Link href="/learn-more" variant="secondary">
  Learn More
</Link>
```

### Primary

Filled with primary color for main CTAs.

```tsx
<Link href="/get-started" variant="primary">
  Get Started
</Link>
```

## Sizes

### Small

```tsx
<Link href="/docs" size="sm">
  Docs
</Link>
```

### Medium (Default)

```tsx
<Link href="/docs" size="md">
  Documentation
</Link>
```

### Large

```tsx
<Link href="/docs" size="lg">
  Documentation
</Link>
```

## Active State

### Current Page

```tsx
<Link href="/blog" active>
  Blog
</Link>

// Or with explicit aria-current
<Link href="/blog" aria-current="page">
  Blog
</Link>
```

### Navigation Step

```tsx
<Link href="/step-2" aria-current="step">
  Step 2
</Link>
```

## Icon Support

### With Icon

```tsx
import { Icon } from '@spexop/react';

<Link href="/home" variant="ghost">
  <Icon name="Home" size="sm" />
  Home
</Link>
```

### Icon-Only

```tsx
<Link href="/home" variant="ghost" aria-label="Go to homepage">
  <Icon name="Home" size="md" />
</Link>
```

## External Links

### With Security

```tsx
<Link href="https://github.com/spexop" external>
  GitHub
</Link>
// Renders with target="_blank" rel="noopener noreferrer"
// Shows external indicator (↗)
```

## Full Width

### Block-Level Link

```tsx
<Link href="/dashboard" variant="ghost" fullWidth>
  Dashboard
</Link>
```

## Disabled State

### Disabled Link

```tsx
<Link href="/unavailable" disabled>
  Coming Soon
</Link>
```

## Advanced Usage

### With Click Handler

```tsx
<Link 
  href="/analytics"
  onClick={(e) => {
    trackNavigation('analytics');
  }}
>
  Analytics
</Link>
```

### With Custom Styling

```tsx
<Link 
  href="/custom"
  variant="text"
  className="my-custom-class"
  style={{ fontWeight: 600 }}
>
  Custom Link
</Link>
```

### Navigation Menu

```tsx
import { Stack, Link } from '@spexop/react';

<Stack direction="horizontal" gap="md">
  <Link href="/" active aria-current="page">
    Home
  </Link>
  <Link href="/features">
    Features
  </Link>
  <Link href="/pricing">
    Pricing
  </Link>
  <Link href="/docs">
    Docs
  </Link>
</Stack>
```

### Footer Links

```tsx
import { Stack, Link } from '@spexop/react';

<Stack direction="vertical" gap="xs">
  <Link href="/privacy" variant="text" size="sm">
    Privacy Policy
  </Link>
  <Link href="/terms" variant="text" size="sm">
    Terms of Service
  </Link>
  <Link href="/cookies" variant="text" size="sm">
    Cookie Policy
  </Link>
</Stack>
```

## Design Principles

### Borders before shadows

Link uses clean 2px borders for variants like outline and secondary, avoiding heavy shadows.

### Typography before decoration

Different variants achieved through border styles and backgrounds, not excessive decoration.

### Tokens before magic numbers

All spacing, sizing, and colors use design tokens from @spexop/theme.

## Accessibility

### WCAG AA Compliance

- Minimum 4.5:1 contrast ratio
- Focus visible indicators
- Keyboard navigation support
- Screen reader friendly

### Keyboard Navigation

- `Tab` - Navigate to link
- `Enter` - Activate link
- `Space` - Activate link

### ARIA Support

```tsx
<Link 
  href="/docs"
  aria-label="View documentation"
  aria-current="page"
  aria-describedby="nav-description"
>
  Docs
</Link>
```

### Active State (aria-current="page")

```tsx
// Automatically adds aria-current="page"
<Link href="/blog" active>
  Blog
</Link>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | required | URL to navigate to |
| `children` | `ReactNode` | required | Link content |
| `variant` | `LinkVariant` | `"text"` | Visual style variant |
| `size` | `LinkSize` | `"md"` | Link size |
| `active` | `boolean` | `false` | Current page indicator |
| `fullWidth` | `boolean` | `false` | Full width link |
| `external` | `boolean` | `false` | External link with security |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | - | Additional CSS class |
| `onClick` | `function` | - | Click handler |
| `aria-label` | `string` | - | ARIA label |
| `aria-current` | `string` | - | ARIA current state |
| `aria-describedby` | `string` | - | ARIA description reference |

### Variants of Link component

- `text` - Default text link with underline on hover
- `ghost` - Transparent with hover background
- `outline` - Border-based link that fills on hover
- `secondary` - Subtle bordered style
- `primary` - Filled with primary color

### Sizes of Link component

- `sm` - 14px font size
- `md` - 16px font size (default)
- `lg` - 18px font size

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

## Related Components

- `NavLink` - Specialized link for sidebar navigation
- `Button` - For actions (not navigation)
- `Breadcrumb` - For breadcrumb navigation

## Migration from NavLink

If using NavLink for general links, migrate to Link:

```tsx
// Before
<NavLink href="/docs" active={isActive}>
  Documentation
</NavLink>

// After
<Link href="/docs" active={isActive} variant="ghost">
  Documentation
</Link>
```

## Best Practices

### Do's

- Use `variant="text"` for inline text links
- Use `variant="ghost"` for navigation menus
- Use `variant="primary"` for main CTAs
- Add `aria-label` for icon-only links
- Use `active` prop for current page
- Use `external` for external links

### Don'ts

- Don't use Link for actions (use Button)
- Don't forget aria-label on icon-only links
- Don't skip the href attribute
- Don't use onClick without href

## License

MIT © Spexop Team
