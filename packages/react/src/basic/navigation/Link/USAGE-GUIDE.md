# Link Component - Usage Guide

## Common Patterns

### Navigation Menu

```tsx
import { Stack, Link, Icon } from '@spexop/react';

function MainNav() {
  const currentPath = window.location.pathname;
  
  return (
    <nav aria-label="Main navigation">
      <Stack direction="horizontal" gap="md" align="center">
        <Link 
          href="/" 
          variant="ghost"
          active={currentPath === '/'}
        >
          Home
        </Link>
        <Link 
          href="/features" 
          variant="ghost"
          active={currentPath === '/features'}
        >
          Features
        </Link>
        <Link 
          href="/pricing" 
          variant="ghost"
          active={currentPath === '/pricing'}
        >
          Pricing
        </Link>
        <Link 
          href="/docs" 
          variant="ghost"
          active={currentPath === '/docs'}
        >
          Docs
        </Link>
      </Stack>
    </nav>
  );
}
```

### Sidebar Navigation

```tsx
import { Stack, Link } from '@spexop/react';

function Sidebar() {
  return (
    <nav aria-label="Sidebar navigation">
      <Stack direction="vertical" gap="xs">
        <Link href="/dashboard" variant="ghost" fullWidth active>
          Dashboard
        </Link>
        <Link href="/analytics" variant="ghost" fullWidth>
          Analytics
        </Link>
        <Link href="/settings" variant="ghost" fullWidth>
          Settings
        </Link>
      </Stack>
    </nav>
  );
}
```

### CTA Section

```tsx
import { Stack, Link, Icon } from '@spexop/react';

function CTASection() {
  return (
    <Stack direction="horizontal" gap="sm" align="center">
      <Link href="/get-started" variant="primary" size="lg">
        <span>Get Started</span>
        <Icon name="ArrowRight" size="sm" />
      </Link>
      <Link href="/demo" variant="outline" size="lg">
        <Icon name="PlayCircle" size="sm" />
        <span>Watch Demo</span>
      </Link>
    </Stack>
  );
}
```

### Footer Links

```tsx
import { Grid, Stack, Link, Icon } from '@spexop/react';

function Footer() {
  return (
    <footer>
      <Grid columns="auto-fit" minColumnWidth="200px" gap="lg">
        <Stack direction="vertical" gap="sm">
          <h4>Product</h4>
          <Stack direction="vertical" gap="xs">
            <Link href="/features" variant="text" size="sm">
              Features
            </Link>
            <Link href="/pricing" variant="text" size="sm">
              Pricing
            </Link>
            <Link href="/changelog" variant="text" size="sm">
              Changelog
            </Link>
          </Stack>
        </Stack>
        
        <Stack direction="vertical" gap="sm">
          <h4>Resources</h4>
          <Stack direction="vertical" gap="xs">
            <Link href="/docs" variant="text" size="sm">
              Documentation
            </Link>
            <Link href="/examples" variant="text" size="sm">
              Examples
            </Link>
            <Link href="/blog" variant="text" size="sm">
              Blog
            </Link>
          </Stack>
        </Stack>
      </Grid>
      
      <Stack direction="horizontal" gap="sm" align="center">
        <Link 
          href="https://twitter.com/spexop" 
          external 
          variant="ghost" 
          aria-label="Follow us on Twitter"
        >
          <Icon name="Twitter" size="md" />
        </Link>
        <Link 
          href="https://github.com/spexop" 
          external 
          variant="ghost"
          aria-label="View our GitHub"
        >
          <Icon name="Github" size="md" />
        </Link>
      </Stack>
    </footer>
  );
}
```

### Breadcrumb Links

```tsx
import { Stack, Link, Icon } from '@spexop/react';

function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb">
      <Stack direction="horizontal" gap="xs" align="center">
        <Link href="/" variant="text" size="sm">
          Home
        </Link>
        <Icon name="ChevronRight" size="sm" />
        <Link href="/components" variant="text" size="sm">
          Components
        </Link>
        <Icon name="ChevronRight" size="sm" />
        <Link href="/components/button" variant="text" size="sm" active>
          Button
        </Link>
      </Stack>
    </nav>
  );
}
```

### In-Text Links

```tsx
import { Link } from '@spexop/react';

function Article() {
  return (
    <p>
      Check out our{' '}
      <Link href="/docs" variant="text">
        comprehensive documentation
      </Link>
      {' '}to learn more about using Spexop components.
    </p>
  );
}
```

### With Router Integration

#### React Router

```tsx
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@spexop/react';

// Use as prop to render as RouterLink
<Link 
  as={RouterLink}
  to="/dashboard" 
  variant="ghost"
>
  Dashboard
</Link>
```

#### Next.js

```tsx
import NextLink from 'next/link';
import { Link } from '@spexop/react';

// Wrap Next.js Link
<NextLink href="/dashboard" passHref legacyBehavior>
  <Link variant="ghost">
    Dashboard
  </Link>
</NextLink>
```

## Accessibility Examples

### Icon-Only Link

```tsx
<Link 
  href="/search" 
  variant="ghost"
  aria-label="Search"
>
  <Icon name="Search" size="md" />
</Link>
```

### Current Page Indicator

```tsx
<Link 
  href="/blog" 
  variant="ghost"
  active
  aria-current="page"
>
  Blog
</Link>
```

### With Description

```tsx
<>
  <Link 
    href="/help" 
    variant="text"
    aria-describedby="help-description"
  >
    Help Center
  </Link>
  <p id="help-description" className="sr-only">
    Get support and find answers to common questions
  </p>
</>
```

## Design Tokens Used

### Spacing

- `--theme-spacing-1` (padding adjustments)
- `--theme-spacing-2` (gap, padding)
- `--theme-spacing-3` (small padding)
- `--theme-spacing-4` (medium padding)
- `--theme-spacing-5` (large padding)

### Colors

- `--theme-primary` (primary variant, text links)
- `--theme-surface` (backgrounds)
- `--theme-surface-hover` (hover states)
- `--theme-text` (text color)
- `--theme-border` (borders)

### Typography

- `--theme-font-size-sm` (small size)
- `--theme-font-size-base` (medium size)
- `--theme-font-size-lg` (large size)
- `--theme-font-weight-semibold` (default weight)
- `--theme-font-weight-bold` (active state)

### Border

- `--theme-border-width` (2px borders)
- `--theme-radius-relaxed` (border radius)

## Best Practices

### Navigation

Use `variant="ghost"` for navigation menus:

```tsx
<Link href="/docs" variant="ghost">
  Documentation
</Link>
```

### CTAs

Use `variant="primary"` for main calls-to-action:

```tsx
<Link href="/signup" variant="primary" size="lg">
  Get Started Free
</Link>
```

### Inline Text

Use `variant="text"` for links within content:

```tsx
<p>
  Read more in our <Link href="/blog">blog post</Link>.
</p>
```

### External Links

Always use `external` prop for external URLs:

```tsx
<Link href="https://example.com" external>
  Example Site
</Link>
```

## Common Mistakes

### Using Button for Navigation

```tsx
// ❌ Don't use Button for navigation
<Button onClick={() => navigate('/docs')}>
  Documentation
</Button>

// ✅ Use Link for navigation
<Link href="/docs">
  Documentation
</Link>
```

### Missing aria-label on Icon-Only

```tsx
// ❌ Missing aria-label
<Link href="/search">
  <Icon name="Search" />
</Link>

// ✅ With aria-label
<Link href="/search" aria-label="Search">
  <Icon name="Search" />
</Link>
```

### Forgetting External Security

```tsx
// ❌ Manual external link (missing security)
<Link href="https://example.com" target="_blank">
  Example
</Link>

// ✅ Use external prop
<Link href="https://example.com" external>
  Example
</Link>
```

## Performance

- Uses CSS Modules for scoped styling
- Zero runtime overhead
- Tree-shakeable
- Minimal bundle impact (~2KB)

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

## Related

- NavLink - Specialized sidebar navigation link
- Button - For actions (not navigation)
- Breadcrumb - Breadcrumb navigation
