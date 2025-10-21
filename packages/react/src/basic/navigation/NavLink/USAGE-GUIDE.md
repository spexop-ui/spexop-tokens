# NavLink Component - Usage Guide

## Common Patterns

### Sidebar Navigation

```tsx
import { Sidebar, NavLink } from '@spexop/react';

function AppSidebar() {
  const currentPath = window.location.pathname;

  return (
    <Sidebar isOpen={true}>
      <NavLink href="/" active={currentPath === '/'}>
        Dashboard
      </NavLink>
      <NavLink href="/projects" active={currentPath === '/projects'}>
        Projects
      </NavLink>
      <NavLink href="/team" active={currentPath === '/team'}>
        Team
      </NavLink>
      <NavLink href="/settings" active={currentPath === '/settings'}>
        Settings
      </NavLink>
    </Sidebar>
  );
}
```

### With Icons

```tsx
import { NavLink } from '@spexop/react';
import { Home, FolderOpen, Users, Settings } from '@spexop/icons';

<Sidebar isOpen={true}>
  <NavLink href="/" active>
    <Home size={20} strokeWidth={2} />
    <span>Dashboard</span>
  </NavLink>
  
  <NavLink href="/projects">
    <FolderOpen size={20} strokeWidth={2} />
    <span>Projects</span>
  </NavLink>
  
  <NavLink href="/team">
    <Users size={20} strokeWidth={2} />
    <span>Team</span>
  </NavLink>
  
  <NavLink href="/settings">
    <Settings size={20} strokeWidth={2} />
    <span>Settings</span>
  </NavLink>
</Sidebar>
```

### With React Router

```tsx
import { NavLink } from '@spexop/react';
import { useLocation, useNavigate } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar isOpen={true}>
      <NavLink 
        href="/" 
        active={location.pathname === '/'}
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}
      >
        Home
      </NavLink>
      
      <NavLink 
        href="/about" 
        active={location.pathname === '/about'}
        onClick={(e) => {
          e.preventDefault();
          navigate('/about');
        }}
      >
        About
      </NavLink>
    </Sidebar>
  );
}
```

### With Badge/Count

```tsx
import { NavLink, Badge } from '@spexop/react';
import { Inbox, Bell } from '@spexop/icons';

<Sidebar isOpen={true}>
  <NavLink href="/inbox">
    <Inbox size={20} strokeWidth={2} />
    <span>Inbox</span>
    <Badge variant="primary">12</Badge>
  </NavLink>
  
  <NavLink href="/notifications">
    <Bell size={20} strokeWidth={2} />
    <span>Notifications</span>
    <Badge variant="error">3</Badge>
  </NavLink>
</Sidebar>
```

### Nested with NavSection

```tsx
import { Sidebar, NavLink, NavSection } from '@spexop/react';

<Sidebar isOpen={true}>
  <NavLink href="/" active>Dashboard</NavLink>
  
  <NavSection label="Projects" defaultOpen={true}>
    <NavLink href="/projects/active">Active</NavLink>
    <NavLink href="/projects/archived">Archived</NavLink>
    <NavLink href="/projects/templates">Templates</NavLink>
  </NavSection>
  
  <NavLink href="/settings">Settings</NavLink>
</Sidebar>
```

## Design Tokens Used

```css
/* Spacing */
padding: var(--theme-spacing-3) var(--theme-spacing-4)
gap: var(--theme-spacing-2)

/* Colors */
color: var(--theme-text)
background: transparent
border: var(--theme-border-width) solid transparent

/* Hover */
background: var(--theme-surface-hover)
border-color: var(--theme-border)

/* Active */
border-color: var(--theme-primary)
background: var(--theme-primary-subtle)
```

## Accessibility

### Semantic HTML

NavLink renders as an anchor tag with proper attributes:

```html
<a 
  href="/dashboard" 
  class="navLink active"
  aria-current="page"
  tabindex="0"
>
  Dashboard
</a>
```

### ARIA Current

Active links automatically get `aria-current="page"`:

```tsx
<NavLink href="/blog" active>
  Blog
</NavLink>
// Renders: <a aria-current="page">Blog</a>
```

### Keyboard Navigation

- Tab to focus link
- Enter to activate
- All links are keyboard accessible

## Best Practices

### Do's

- Use NavLink inside Sidebar component
- Set active state based on current route
- Use icons for visual clarity
- Keep labels short and clear
- Use aria-current for active state

### Don'ts

- Don't use NavLink for header navigation (use Link)
- Don't use NavLink for inline text links (use Link)
- Don't forget to set active state
- Don't nest NavLinks directly (use NavSection)

## When to Use NavLink vs Link

**Use NavLink when:**

- Building sidebar navigation
- Need consistent sidebar styling
- Part of a vertical navigation menu

**Use Link when:**

- Header navigation
- Footer links
- Inline text links
- CTA buttons as links
- Any non-sidebar navigation

## Performance

- CSS Modules for scoped styling
- Minimal re-renders
- No runtime overhead
- Tree-shakeable

## Related

- Link - General-purpose links
- NavSection - Collapsible navigation sections
- Sidebar - Sidebar container
- TopBar - Top navigation bar
