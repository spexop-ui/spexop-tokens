# Sidebar Component - Usage Guide

## Common Patterns

### Basic Sidebar

```tsx
import { Sidebar, NavLink } from '@spexop/react';

function Layout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar isOpen={true}>
        <NavLink href="/" active>Dashboard</NavLink>
        <NavLink href="/projects">Projects</NavLink>
        <NavLink href="/team">Team</NavLink>
        <NavLink href="/settings">Settings</NavLink>
      </Sidebar>
      
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
```

### Mobile-Responsive Sidebar

```tsx
import { Sidebar, NavLink, TopBar } from '@spexop/react';
import { useState } from 'react';

function ResponsiveLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <TopBar
        logoText="My App"
        onMobileMenuClick={() => setSidebarOpen(true)}
      />

      <div style={{ display: 'flex', paddingTop: '64px' }}>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          showHeader={true}
          headerTitle="Navigation"
        >
          <NavLink href="/" active>Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </Sidebar>

        <main style={{ flex: 1, padding: '24px' }}>
          {children}
        </main>
      </div>
    </>
  );
}
```

### With NavSections

```tsx
import { Sidebar, NavLink, NavSection } from '@spexop/react';

<Sidebar isOpen={true}>
  <NavLink href="/" active>Dashboard</NavLink>

  <NavSection label="Projects" defaultOpen={true}>
    <NavLink href="/projects/active">Active</NavLink>
    <NavLink href="/projects/archived">Archived</NavLink>
    <NavLink href="/projects/templates">Templates</NavLink>
  </NavSection>

  <NavSection label="Team" defaultOpen={false}>
    <NavLink href="/team/members">Members</NavLink>
    <NavLink href="/team/roles">Roles</NavLink>
    <NavLink href="/team/invites">Invites</NavLink>
  </NavSection>

  <NavLink href="/analytics">Analytics</NavLink>
  <NavLink href="/settings">Settings</NavLink>
</Sidebar>
```

### With Footer

```tsx
import { Sidebar, NavLink, SidebarFooter } from '@spexop/react';

<Sidebar isOpen={true}>
  <NavLink href="/" active>Dashboard</NavLink>
  <NavLink href="/projects">Projects</NavLink>
  <NavLink href="/team">Team</NavLink>

  <SidebarFooter>
    <div style={{ padding: '16px', borderTop: '1px solid var(--theme-border)' }}>
      <p style={{ margin: 0, fontSize: '12px', color: 'var(--theme-text-secondary)' }}>
        Version 1.0.0
      </p>
      <p style={{ margin: 0, fontSize: '12px', color: 'var(--theme-text-secondary)' }}>
        © 2025 Company
      </p>
    </div>
  </SidebarFooter>
</Sidebar>
```

### Collapsible Sidebar

```tsx
import { Sidebar, NavLink } from '@spexop/react';
import { useState } from 'react';

function CollapsibleLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar isOpen={!collapsed}>
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
        
        <NavLink href="/">
          {!collapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink href="/projects">
          {!collapsed && <span>Projects</span>}
        </NavLink>
      </Sidebar>

      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
```

### With Icons

```tsx
import { Sidebar, NavLink } from '@spexop/react';
import { LayoutDashboard, FolderOpen, Users, Settings } from '@spexop/icons';

<Sidebar isOpen={true}>
  <NavLink href="/" active>
    <LayoutDashboard size={20} strokeWidth={2} />
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

### Persistent State

```tsx
import { Sidebar, NavLink } from '@spexop/react';
import { useState, useEffect } from 'react';

function PersistentSidebar() {
  const [isOpen, setIsOpen] = useState(() => {
    const stored = localStorage.getItem('sidebar-open');
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem('sidebar-open', JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <Sidebar 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)}
    >
      {/* Navigation items */}
    </Sidebar>
  );
}
```

## Design Tokens Used

```css
/* Layout */
width: 280px /* Desktop */
width: 100% /* Mobile */

/* Colors */
background: var(--theme-surface)
border-right: var(--theme-border-width) solid var(--theme-border)

/* Spacing */
padding: var(--theme-spacing-4)
gap: var(--theme-spacing-2)
```

## Accessibility

### Semantic HTML

```html
<aside aria-label="Main navigation" aria-hidden="false">
  <nav>
    <a href="/" aria-current="page">Home</a>
    <a href="/about">About</a>
  </nav>
</aside>
```

### Keyboard Navigation

- Tab to navigate through links
- Enter to activate link
- Escape to close sidebar (mobile)
- Focus trap in mobile overlay

### Screen Reader Support

```tsx
<Sidebar isOpen={true} aria-label="Main navigation">
  <NavLink href="/">Dashboard</NavLink>
</Sidebar>
```

## Best Practices

### Do's

- Use Sidebar for main application navigation
- Provide onClose for mobile overlay
- Set showHeader={true} for mobile
- Use NavSection for grouped links
- Add SidebarFooter for version info
- Include aria-label

### Don'ts

- Don't forget onClose for mobile
- Don't use for temporary navigation
- Don't nest multiple sidebars
- Don't make sidebar too wide (max 320px)

## Responsive Behavior

### Desktop (>768px)

- Fixed position
- Always visible (if isOpen={true})
- Side-by-side with content
- 280px width

### Mobile (<768px)

- Overlay with backdrop
- Slide-in animation
- Full height
- Requires onClose handler

## Performance

- CSS Modules for scoped styling
- Efficient re-renders
- Focus trap only on mobile
- Minimal bundle impact

## Related

- NavLink - Sidebar links
- NavSection - Collapsible sections
- SidebarFooter - Footer content
- TopBar - Top navigation
- Link - General-purpose links
