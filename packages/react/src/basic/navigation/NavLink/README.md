# NavLink Component

A styled navigation link component with active state support and accessibility features.

## Overview

The `NavLink` component is designed for use within sidebar navigation. It provides:

- Active state highlighting
- Hover effects
- Focus management
- Touch-optimized sizing
- Left border indicator for active state

## Features

✅ **Active State**: Red highlight with left border  
✅ **Hover Effects**: Smooth background transitions  
✅ **Accessibility**: ARIA attributes and keyboard support  
✅ **Touch Targets**: 48px minimum height (WCAG AA)  
✅ **Dark Mode**: Automatic theme support

---

## Installation

```tsx
import { NavLink } from '@spexop/react';
```

---

## Basic Usage

```tsx
import { NavLink } from '@spexop/react';

function Sidebar() {
  return (
    <nav>
      <NavLink href="/home">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact" active>Contact</NavLink>
    </nav>
  );
}
```

---

## Props

### `NavLinkProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | **required** | The URL the link points to |
| `children` | `ReactNode` | **required** | The link content (usually text) |
| `active` | `boolean` | `false` | Whether this link is currently active |
| `onClick` | `(e: MouseEvent) => void` | `undefined` | Optional click handler |
| `className` | `string` | `""` | Additional CSS classes |

---

## Examples

### With React Router

```tsx
import { NavLink } from '@spexop/react';
import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <nav>
      <NavLink 
        href="/" 
        active={location.pathname === '/'}
        onClick={handleClick('/')}
      >
        Home
      </NavLink>
      <NavLink 
        href="/about" 
        active={location.pathname === '/about'}
        onClick={handleClick('/about')}
      >
        About
      </NavLink>
    </nav>
  );
}
```

### Grouped Links

```tsx
import { NavLink, NavSection } from '@spexop/react';

function Sidebar() {
  const currentPage = '/components/button';

  const componentLinks = [
    { href: '/components/button', label: 'Button' },
    { href: '/components/card', label: 'Card' },
    { href: '/components/badge', label: 'Badge' },
  ];

  return (
    <NavSection label="Components" defaultOpen>
      {componentLinks.map((link) => (
        <NavLink 
          key={link.href}
          href={link.href} 
          active={currentPage === link.href}
        >
          {link.label}
        </NavLink>
      ))}
    </NavSection>
  );
}
```

### With Icons

```tsx
import { NavLink } from '@spexop/react';
import { Home, Settings, User } from '@spexop/icons';

function Sidebar() {
  return (
    <nav>
      <NavLink href="/home">
        <Home size={16} style={{ marginRight: '8px' }} />
        Home
      </NavLink>
      <NavLink href="/settings">
        <Settings size={16} style={{ marginRight: '8px' }} />
        Settings
      </NavLink>
      <NavLink href="/profile" active>
        <User size={16} style={{ marginRight: '8px' }} />
        Profile
      </NavLink>
    </nav>
  );
}
```

### With Custom Styling

```tsx
import { NavLink } from '@spexop/react';
import styles from './MySidebar.module.css';

function Sidebar() {
  return (
    <NavLink 
      href="/special" 
      className={styles.customLink}
    >
      Special Page
    </NavLink>
  );
}
```

---

## Styling

### CSS Variables

The NavLink uses design tokens:

```css
/* Spacing */
--s-spacing-3 (12px) - vertical padding
--s-spacing-5 (20px) - horizontal padding right
--s-spacing-8 (40px) - horizontal padding left

/* Typography */
--s-font-size-sm (14px)
--s-font-weight-normal (400)
--s-font-weight-semibold (600 - active)

/* Colors - Light Theme */
--s-color-neutral-700 (text)
--s-color-neutral-100 (hover background)
--s-color-neutral-900 (hover text)
--s-color-red-500 (active highlight)
--s-color-red-50 (active background)

/* Transitions */
--s-duration-fast (150ms)
```

### Active State

Active links have:

- Background: `var(--s-color-red-50)`
- Text color: `var(--s-color-red-500)`
- Left border: `3px solid var(--s-color-red-500)`
- Font weight: `var(--s-font-weight-semibold)`

### Dark Theme

```css
[data-theme="dark"] .navLink {
  color: var(--s-color-neutral-300);
}

[data-theme="dark"] .navLink:hover {
  background-color: var(--s-color-neutral-800);
  color: var(--s-color-neutral-50);
}

[data-theme="dark"] .navLink.active {
  background-color: var(--s-color-red-900);
  color: var(--s-color-red-300);
}
```

---

## Accessibility

### ARIA Attributes

Active links automatically get `aria-current="page"`:

```tsx
<a 
  href="/current-page" 
  aria-current="page"
  className="navLink active"
>
  Current Page
</a>
```

### Keyboard Navigation

- ✅ **Tab**: Navigate between links
- ✅ **Enter**: Activate link
- ✅ **Focus indicator**: 2px red outline

### Touch Targets

- ✅ Minimum height: 48px (WCAG 2.1 AA)
- ✅ Adequate spacing between links
- ✅ Large tap area on mobile

---

## Best Practices

### 1. **Active State Management**

Use React Router's `useLocation` to determine active state:

```tsx
import { useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  return (
    <NavLink 
      href="/about" 
      active={location.pathname === '/about'}
    >
      About
    </NavLink>
  );
}
```

### 2. **Handle Navigation**

Prevent default and use your router's navigation:

```tsx
const navigate = useNavigate();

<NavLink 
  href="/page" 
  onClick={(e) => {
    e.preventDefault();
    navigate('/page');
  }}
>
  Page
</NavLink>
```

### 3. **Mobile Considerations**

Close sidebar on mobile after navigation:

```tsx
const isMobile = window.innerWidth < 768;

<NavLink 
  href="/page" 
  onClick={(e) => {
    e.preventDefault();
    navigate('/page');
    if (isMobile) {
      closeSidebar();
    }
  }}
>
  Page
</NavLink>
```

### 4. **Organize with NavSection**

Group related links in sections:

```tsx
<NavSection label="Foundation">
  <NavLink href="/grid">Grid</NavLink>
  <NavLink href="/stack">Stack</NavLink>
  <NavLink href="/container">Container</NavLink>
</NavSection>
```

---

## Common Patterns

### Dynamic Navigation

```tsx
const navigationItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

function Sidebar() {
  const location = useLocation();

  return (
    <nav>
      {navigationItems.map((item) => (
        <NavLink 
          key={item.id}
          href={item.href}
          active={location.pathname === item.href}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
```

### Nested Routes

```tsx
function Sidebar() {
  const location = useLocation();
  const isComponentsActive = location.pathname.startsWith('/components');

  return (
    <NavSection label="Components">
      <NavLink 
        href="/components/button"
        active={location.pathname === '/components/button'}
      >
        Button
      </NavLink>
      <NavLink 
        href="/components/card"
        active={location.pathname === '/components/card'}
      >
        Card
      </NavLink>
    </NavSection>
  );
}
```

---

## Related Components

- **NavSection**: Collapsible sections for grouped links
- **Sidebar**: Main navigation container
- **SidebarFooter**: Footer section for sidebar
- **TopBar**: Top navigation bar

---

## API Reference

See [`NavLink.types.ts`](./NavLink.types.ts) for complete TypeScript definitions.

---

## Version

**v0.1.0** - Initial release with Sidebar refactoring (2025-10-13)

---

## License

MIT
