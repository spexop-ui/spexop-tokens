# TopBar Component - Usage Guide

## Common Patterns

### Basic TopBar

```tsx
import { TopBar } from '@spexop/react';

function App() {
  return (
    <>
      <TopBar logoText="My Application" />
      <main style={{ paddingTop: '64px' }}>
        {/* Content */}
      </main>
    </>
  );
}
```

### Full-Featured TopBar

```tsx
import { TopBar } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const themes = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <TopBar
      logoText="Spexop Design System"
      onLogoClick={() => navigate('/')}
      onSearchClick={() => setSearchOpen(true)}
      onThemeToggle={toggleTheme}
      onMobileMenuClick={() => setSidebarOpen(true)}
      onSettingsClick={() => navigate('/settings')}
      currentTheme={theme}
      gitHubUrl="https://github.com/myorg/myrepo"
    />
  );
}
```

### With Custom Logo

```tsx
import { TopBar } from '@spexop/react';

<TopBar 
  logoText={
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img src="/logo.svg" alt="Logo" width={32} height={32} />
      <span style={{ fontWeight: 700 }}>My Brand</span>
    </div>
  }
/>
```

### Minimal TopBar

```tsx
// Logo only
<TopBar 
  logoText="Simple App" 
  showMobileMenu={false}
/>

// No GitHub button
<TopBar 
  logoText="My App"
  onGitHubClick={undefined}
/>
```

### With Search Integration

```tsx
import { TopBar, SearchModal } from '@spexop/react';
import { useState } from 'react';

function AppWithSearch() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <TopBar
        logoText="My App"
        onSearchClick={() => setSearchOpen(true)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
        placeholder="Search documentation..."
      />
    </>
  );
}
```

### With Theme Toggle

```tsx
import { TopBar } from '@spexop/react';
import { useDarkMode } from '@spexop/react';

function ThemedApp() {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <TopBar
      logoText="My App"
      onThemeToggle={toggleTheme}
      currentTheme={theme}
    />
  );
}
```

### Mobile Menu Integration

```tsx
import { TopBar, Sidebar, NavLink } from '@spexop/react';
import { useState } from 'react';

function MobileResponsive() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <TopBar
        logoText="My App"
        onMobileMenuClick={() => setMenuOpen(true)}
        showMobileMenu={true}
      />

      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        showHeader={true}
        headerTitle="Menu"
      >
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </Sidebar>
    </>
  );
}
```

## Design Tokens Used

```css
/* Layout */
height: 64px
position: fixed
top: 0
width: 100%
z-index: 1000

/* Colors */
background: var(--theme-surface)
border-bottom: var(--theme-border-width) solid var(--theme-border)

/* Spacing */
padding: 0 var(--theme-spacing-6)
gap: var(--theme-spacing-4)
```

## Accessibility

### Semantic HTML

```html
<header role="banner">
  <nav aria-label="Main navigation">
    <a href="/" aria-label="Go to homepage">
      <span>Logo</span>
    </a>
    <button aria-label="Search">...</button>
    <button aria-label="Toggle theme">...</button>
  </nav>
</header>
```

### Keyboard Navigation

- Tab to navigate through all buttons
- Enter/Space to activate buttons
- All controls keyboard accessible

### Screen Reader Support

All icon buttons have aria-labels:

```tsx
<TopBar 
  logoText="My App"
  // Buttons automatically get:
  // aria-label="Search"
  // aria-label="Toggle theme"
  // aria-label="GitHub repository"
  // aria-label="Settings"
  // aria-label="Mobile menu"
/>
```

## Best Practices

### Do's

- Keep TopBar simple and focused
- Provide logo click handler
- Use theme toggle for dark mode
- Add mobile menu for responsive design
- Include GitHub link for open source
- Use proper aria-labels

### Don'ts

- Don't overload with too many buttons
- Don't forget mobile menu handler
- Don't hide critical navigation in TopBar
- Don't forget padding-top on main content (64px)

## Responsive Behavior

### Desktop (>768px)

- All buttons visible
- Logo and actions side-by-side
- Fixed height (64px)

### Mobile (<768px)

- Mobile menu button visible
- Search and theme toggle remain
- Compact spacing
- Logo text may be shortened

## Integration with Layout

### Fixed Positioning

TopBar is fixed at the top, add padding to main content:

```tsx
<>
  <TopBar logoText="My App" />
  
  {/* Add 64px padding for TopBar */}
  <div style={{ paddingTop: '64px' }}>
    <main>{/* Content */}</main>
  </div>
</>
```

### With Sidebar

```tsx
<>
  <TopBar 
    logoText="My App"
    onMobileMenuClick={() => setSidebarOpen(true)}
  />
  
  <div style={{ display: 'flex', paddingTop: '64px' }}>
    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
      {/* Navigation */}
    </Sidebar>
    
    <main style={{ flex: 1 }}>
      {/* Content */}
    </main>
  </div>
</>
```

## Performance

- Fixed position for optimal scrolling
- Minimal re-renders
- CSS Modules for scoped styling
- Icon buttons are optimized

## Related

- Sidebar - Side navigation
- Link - Navigation links
- SearchModal - Search functionality
- ThemeToggle - Theme switching
