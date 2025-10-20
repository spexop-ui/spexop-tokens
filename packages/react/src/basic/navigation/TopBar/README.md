# TopBar Component

A fixed top navigation bar with logo, search, theme toggle, and mobile menu support.

## Overview

The `TopBar` component provides a consistent navigation header across your application. It includes:

- Logo and branding
- Search button
- Theme toggle (light/dark/auto)
- GitHub link
- Settings button
- Mobile menu toggle (responsive)

## Features

✅ **Fixed Positioning**: Stays at top of viewport (64px height)  
✅ **Responsive**: Adapts layout for mobile, tablet, and desktop  
✅ **Theme Support**: Built-in dark mode support  
✅ **Mobile Menu**: Hamburger menu for mobile devices  
✅ **Accessibility**: WCAG AA+ compliant with keyboard navigation  
✅ **Z-Index**: Proper layering (z-index: 200)

---

## Installation

```tsx
import { TopBar } from '@spexop/react';
```

---

## Basic Usage

```tsx
import { TopBar } from '@spexop/react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <TopBar
      logoText="My App"
      onLogoClick={() => navigate('/')}
      onSearchClick={() => console.log('Search')}
      onThemeToggle={() => console.log('Toggle theme')}
      onGitHubClick={() => window.open('https://github.com/myapp')}
      onMobileMenuClick={() => console.log('Toggle menu')}
    />
  );
}
```

---

## Props

### `TopBarProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logoText` | `string` | `"Spexop"` | Text displayed next to logo |
| `onLogoClick` | `() => void` | `undefined` | Callback when logo is clicked |
| `onSearchClick` | `() => void` | `undefined` | Callback when search button is clicked |
| `onThemeToggle` | `() => void` | `undefined` | Callback when theme toggle is clicked |
| `onGitHubClick` | `() => void` | `undefined` | Callback when GitHub link is clicked |
| `onSettingsClick` | `() => void` | `undefined` | Callback when settings button is clicked |
| `gitHubUrl` | `string` | `"https://github.com/spexop-ui"` | URL for GitHub link |
| `onMobileMenuClick` | `() => void` | `undefined` | Callback when mobile menu is clicked |
| `currentTheme` | `"light" \| "dark" \| "auto"` | `"light"` | Current theme state for icon display |
| `showMobileMenu` | `boolean` | `false` | Whether to show mobile menu button |
| `className` | `string` | `""` | Additional CSS classes |

---

## Examples

### With Theme Toggle

```tsx
import { TopBar } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');

  const handleThemeToggle = () => {
    const nextTheme = 
      theme === 'light' ? 'dark' : 
      theme === 'dark' ? 'auto' : 'light';
    setTheme(nextTheme);
  };

  return (
    <TopBar
      logoText="My App"
      currentTheme={theme}
      onThemeToggle={handleThemeToggle}
    />
  );
}
```

### With Mobile Menu

```tsx
import { TopBar } from '@spexop/react';
import { useState, useEffect } from 'react';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <TopBar
      logoText="My App"
      showMobileMenu={isMobile}
      onMobileMenuClick={() => setMenuOpen(!menuOpen)}
    />
  );
}
```

### Full Example with All Features

```tsx
import { TopBar } from '@spexop/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = 
      theme === 'light' ? 'dark' : 
      theme === 'dark' ? 'auto' : 'light';
    setTheme(nextTheme);
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleSearchClick = () => {
    // Open search overlay
    console.log('Open search');
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/myapp', '_blank', 'noopener,noreferrer');
  };

  const handleSettingsClick = () => {
    setSettingsOpen(true);
  };

  return (
    <>
      <TopBar
        logoText="My App"
        onLogoClick={() => navigate('/')}
        onSearchClick={handleSearchClick}
        onThemeToggle={handleThemeToggle}
        onGitHubClick={handleGitHubClick}
        onSettingsClick={handleSettingsClick}
        onMobileMenuClick={() => setSidebarOpen(!sidebarOpen)}
        currentTheme={theme}
        showMobileMenu={isMobile}
      />
      {/* Your app content */}
    </>
  );
}
```

---

## Layout Integration

The TopBar should be placed at the top of your layout and paired with appropriate padding on the main content:

```tsx
import { TopBar } from '@spexop/react';

function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      <TopBar logoText="My App" />
      
      {/* Main content with padding for fixed TopBar */}
      <main style={{ paddingTop: '64px' }}>
        {children}
      </main>
    </div>
  );
}
```

---

## Styling

### CSS Variables

The TopBar uses design tokens for consistent styling:

```css
/* Height */
--topbar-height: 64px;

/* Colors */
--s-color-neutral-50 (background)
--s-color-neutral-200 (border)
--s-color-neutral-700 (text)
--s-color-neutral-900 (text hover)
--s-color-red-500 (focus outline)

/* Spacing */
--s-spacing-4 (16px)
--s-spacing-5 (20px)

/* Z-Index */
--s-z-index-sticky (200)
```

### Dark Theme

The TopBar automatically adapts to dark theme:

```css
[data-theme="dark"] .topBar {
  background: var(--s-color-neutral-900);
  border-bottom-color: var(--s-color-neutral-700);
  color: var(--s-color-neutral-50);
}
```

---

## Responsive Behavior

### Desktop (≥ 768px)

- Logo text visible
- All buttons visible
- Mobile menu hidden

### Mobile (< 768px)

- Logo text hidden (icon only)
- Hamburger menu visible
- All other buttons visible

---

## Accessibility

### ARIA Labels

All interactive elements have proper ARIA labels:

```tsx
<button aria-label="Search">...</button>
<button aria-label="Toggle theme">...</button>
<button aria-label="Open navigation menu">...</button>
```

### Keyboard Navigation

- ✅ **Tab**: Navigate between buttons
- ✅ **Enter/Space**: Activate buttons
- ✅ **Focus indicators**: 2px red outline on focus

### Touch Targets

- ✅ All buttons: 40x40px minimum
- ✅ Mobile-optimized spacing
- ✅ WCAG 2.1 AA compliant (44x44px+)

---

## Best Practices

### 1. **Fixed Positioning**

Always account for the TopBar's height in your layout:

```css
body {
  padding-top: 64px; /* TopBar height */
}
```

### 2. **Mobile Menu**

Show the mobile menu button only on mobile devices:

```tsx
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

<TopBar showMobileMenu={isMobile} />
```

### 3. **Theme Persistence**

Persist theme selection to localStorage:

```tsx
const handleThemeToggle = () => {
  const nextTheme = /* ... */;
  setTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
  document.documentElement.setAttribute('data-theme', nextTheme);
};
```

### 4. **Z-Index Layering**

The TopBar uses z-index: 200. Ensure other fixed elements don't conflict:

```bash
Modal: 1100
Overlay: 1000
TopBar: 200
Sidebar: 10
```

---

## Related Components

- **Sidebar**: Main navigation sidebar (pairs with TopBar)
- **NavSection**: Collapsible navigation sections
- **NavLink**: Individual navigation links
- **SidebarFooter**: Footer for sidebar content

---

## API Reference

See [`TopBar.types.ts`](./TopBar.types.ts) for complete TypeScript definitions.

---

## Version

**v0.1.0** - Initial release with Sidebar refactoring (2025-10-13)

---

## License

MIT
