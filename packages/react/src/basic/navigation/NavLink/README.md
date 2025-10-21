# NavLink Component

**Status**: ✅ Production Ready | **Version**: 0.2.0

A navigation link component with active state indication for sidebar navigation.

> For comprehensive documentation, examples, and advanced patterns, see the [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md#sidebar-navigation-system)

## Overview

A simple navigation link component with active state indication, used as building block for Sidebar navigation menus.

## Features

- ✅ Active state styling
- ✅ Icon support (@spexop/icons)
- ✅ Badge/count indicators
- ✅ External link support
- ✅ Disabled state
- ✅ Keyboard navigation
- ✅ WCAG AA+ accessible
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { NavLink } from '@spexop/react';
import { Home } from '@spexop/icons';

function App() {
  return (
    <NavLink
      href="/"
      label="Home"
      icon={Home}
      isActive={currentPath === '/'}
      onClick={() => navigate('/')}
    />
  );
}
```

## Basic Usage

### Simple Link

```tsx
<NavLink
  href="/about"
  label="About"
  isActive={currentPath === '/about'}
  onClick={handleNavigate}
/>
```

### With Icon

```tsx
import { Settings } from '@spexop/icons';

<NavLink
  href="/settings"
  label="Settings"
  icon={Settings}
  isActive={currentPath === '/settings'}
  onClick={handleNavigate}
/>
```

### With Badge

```tsx
import { Mail } from '@spexop/icons';

<NavLink
  href="/messages"
  label="Messages"
  icon={Mail}
  badge="12"
  isActive={currentPath === '/messages'}
  onClick={handleNavigate}
/>
```

### External Link

```tsx
import { ExternalLink } from '@spexop/icons';

<NavLink
  href="https://docs.example.com"
  label="Documentation"
  icon={ExternalLink}
  external={true}
/>
```

## States

### Active State

```tsx
<NavLink
  href="/dashboard"
  label="Dashboard"
  isActive={true}
  onClick={handleNavigate}
/>
```

### Disabled State

```tsx
<NavLink
  href="/premium"
  label="Premium Features"
  disabled={true}
  onClick={handleNavigate}
/>
```

## Common Patterns

### Navigation Menu

```tsx
function NavigationMenu() {
  const [currentPath, setCurrentPath] = useState('/');
  
  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/projects', label: 'Projects', icon: Folder },
    { href: '/team', label: 'Team', icon: Users },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav>
      {navItems.map(item => (
        <NavLink
          key={item.href}
          {...item}
          isActive={currentPath === item.href}
          onClick={() => setCurrentPath(item.href)}
        />
      ))}
    </nav>
  );
}
```

### With Notification Badges

```tsx
function NavWithBadges() {
  const notifications = {
    messages: 5,
    alerts: 2,
  };

  return (
    <nav>
      <NavLink
        href="/messages"
        label="Messages"
        icon={Mail}
        badge={notifications.messages.toString()}
        isActive={currentPath === '/messages'}
        onClick={handleNavigate}
      />
      
      <NavLink
        href="/alerts"
        label="Alerts"
        icon={Bell}
        badge={notifications.alerts.toString()}
        isActive={currentPath === '/alerts'}
        onClick={handleNavigate}
      />
    </nav>
  );
}
```

### Grouped Navigation

```tsx
function GroupedNav() {
  return (
    <Stack direction="vertical" gap={6}>
      <NavSection title="Main">
        <NavLink href="/" label="Dashboard" icon={LayoutDashboard} />
        <NavLink href="/analytics" label="Analytics" icon={BarChart} />
      </NavSection>
      
      <NavSection title="Settings">
        <NavLink href="/profile" label="Profile" icon={User} />
        <NavLink href="/preferences" label="Preferences" icon={Settings} />
      </NavSection>
    </Stack>
  );
}
```

### Responsive Navigation

```tsx
function ResponsiveNav() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <nav>
      {navItems.map(item => (
        <NavLink
          key={item.href}
          href={item.href}
          label={isMobile ? '' : item.label} // Icon only on mobile
          icon={item.icon}
          isActive={currentPath === item.href}
          onClick={handleNavigate}
        />
      ))}
    </nav>
  );
}
```

## Props

```typescript
interface NavLinkProps {
  /** Link destination */
  href: string;
  /** Link label text */
  label: string;
  /** Icon component from @spexop/icons */
  icon?: IconComponent;
  /** Whether this link is currently active */
  isActive?: boolean;
  /** Badge text or count */
  badge?: string;
  /** External link (opens in new tab) */
  external?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler (for client-side routing) */
  onClick?: (event: React.MouseEvent) => void;
  /** Additional CSS class */
  className?: string;
  /** ARIA label */
  "aria-label"?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean active state indication
2. **Typography before decoration** - Font weight for emphasis
3. **Tokens before magic numbers** - Uses spacing and color tokens
4. **Accessibility before aesthetics** - Full keyboard and screen reader support

## Accessibility

- ✅ Semantic HTML (`<a>` element)
- ✅ Active state indication
- ✅ Focus indicators
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ External link indication
- ✅ WCAG AA+ compliant

## TypeScript Support

```tsx
import { NavLink, type NavLinkProps } from "@spexop/react";

const props: NavLinkProps = {
  href: "/dashboard",
  children: "Dashboard",
  active: true,
  onClick: (e) => {
    e.preventDefault();
    navigate('/dashboard');
  }
};

<NavLink {...props} />
```

## Performance

- Lightweight: < 1KB gzipped
- Minimal re-renders
- Simple link semantics

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
- React 18+

## Related Components

- [NavSection](../NavSection/README.md) - Collapsible navigation section grouping
- [Sidebar](../Sidebar/README.md) - Side navigation container
- [TopBar](../TopBar/README.md) - Top navigation bar
- [Complete Navigation System](../USAGE-GUIDE.md#complete-navigation-system) - Full navigation setup

## Further Reading

- [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md) - Comprehensive guide with routing integration, migration guides, and advanced patterns
- [Accessibility Guidelines](../USAGE-GUIDE.md#accessibility) - WCAG compliance details
- [Best Practices](../USAGE-GUIDE.md#best-practices) - Mobile patterns and performance optimization

## License

MIT
