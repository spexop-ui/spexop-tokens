# SidebarFooter Component - Usage Guide

## Common Patterns

### Version Information

```tsx
import { Sidebar, NavLink, SidebarFooter } from '@spexop/react';

<Sidebar isOpen={true}>
  <NavLink href="/" active>Dashboard</NavLink>
  <NavLink href="/projects">Projects</NavLink>
  <NavLink href="/settings">Settings</NavLink>

  <SidebarFooter>
    <div style={{ 
      padding: '16px', 
      borderTop: '1px solid var(--theme-border)',
      fontSize: '12px',
      color: 'var(--theme-text-secondary)'
    }}>
      <p style={{ margin: 0 }}>Version 1.0.0</p>
      <p style={{ margin: 0 }}>© 2025 Company</p>
    </div>
  </SidebarFooter>
</Sidebar>
```

### Version Selector

```tsx
import { Sidebar, NavLink, SidebarFooter } from '@spexop/react';
import { useState } from 'react';

function DocsSidebar() {
  const [version, setVersion] = useState('v1.0.0');

  return (
    <Sidebar isOpen={true}>
      <NavLink href="/docs">Documentation</NavLink>
      <NavLink href="/guides">Guides</NavLink>

      <SidebarFooter>
        <div style={{ padding: '16px' }}>
          <label 
            htmlFor="version-select" 
            style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            Version
          </label>
          <select
            id="version-select"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            style={{ 
              width: '100%',
              padding: '8px',
              borderRadius: '4px'
            }}
          >
            <option value="v1.0.0">v1.0.0 (latest)</option>
            <option value="v0.9.0">v0.9.0</option>
            <option value="v0.8.0">v0.8.0</option>
          </select>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
```

### User Profile

```tsx
import { Sidebar, NavLink, SidebarFooter, Avatar } from '@spexop/react';

<Sidebar isOpen={true}>
  <NavLink href="/">Dashboard</NavLink>
  <NavLink href="/projects">Projects</NavLink>

  <SidebarFooter>
    <div style={{ 
      padding: '16px',
      borderTop: '1px solid var(--theme-border)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <Avatar name="John Doe" size="sm" />
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>
          John Doe
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: 'var(--theme-text-secondary)' }}>
          john@example.com
        </p>
      </div>
    </div>
  </SidebarFooter>
</Sidebar>
```

### Action Buttons

```tsx
import { Sidebar, NavLink, SidebarFooter, Button } from '@spexop/react';

<Sidebar isOpen={true}>
  <NavLink href="/">Dashboard</NavLink>
  <NavLink href="/projects">Projects</NavLink>

  <SidebarFooter>
    <div style={{ padding: '16px', borderTop: '1px solid var(--theme-border)' }}>
      <Button variant="primary" size="sm" fullWidth>
        Upgrade to Pro
      </Button>
    </div>
  </SidebarFooter>
</Sidebar>
```

### Settings Links

```tsx
import { Sidebar, NavLink, SidebarFooter, Link } from '@spexop/react';
import { Settings, HelpCircle, LogOut } from '@spexop/icons';

<Sidebar isOpen={true}>
  <NavLink href="/">Dashboard</NavLink>
  <NavLink href="/projects">Projects</NavLink>

  <SidebarFooter>
    <div style={{ 
      padding: '16px', 
      borderTop: '1px solid var(--theme-border)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <Link href="/settings" variant="ghost" size="sm">
        <Settings size={16} strokeWidth={2} />
        <span>Settings</span>
      </Link>
      <Link href="/help" variant="ghost" size="sm">
        <HelpCircle size={16} strokeWidth={2} />
        <span>Help & Support</span>
      </Link>
      <Link href="/logout" variant="ghost" size="sm">
        <LogOut size={16} strokeWidth={2} />
        <span>Sign Out</span>
      </Link>
    </div>
  </SidebarFooter>
</Sidebar>
```

### Theme Switcher

```tsx
import { Sidebar, NavLink, SidebarFooter } from '@spexop/react';
import { useDarkMode } from '@spexop/react';

function ThemedSidebar() {
  const { theme, setTheme } = useDarkMode();

  return (
    <Sidebar isOpen={true}>
      <NavLink href="/">Dashboard</NavLink>

      <SidebarFooter>
        <div style={{ padding: '16px' }}>
          <label style={{ fontSize: '12px', marginBottom: '8px', display: 'block' }}>
            Theme
          </label>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
```

### Status Indicator

```tsx
import { Sidebar, NavLink, SidebarFooter, Badge } from '@spexop/react';

<Sidebar isOpen={true}>
  <NavLink href="/">Dashboard</NavLink>

  <SidebarFooter>
    <div style={{ 
      padding: '16px',
      borderTop: '1px solid var(--theme-border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge variant="success">Online</Badge>
        <span style={{ fontSize: '12px' }}>All systems operational</span>
      </div>
    </div>
  </SidebarFooter>
</Sidebar>
```

## Design Tokens Used

```css
/* Layout */
position: absolute
bottom: 0
width: 100%

/* Borders */
border-top: var(--theme-border-width) solid var(--theme-border)

/* Background */
background: var(--theme-surface)

/* Spacing */
padding: var(--theme-spacing-4)
```

## Accessibility

### Semantic HTML

SidebarFooter renders as a semantic footer element when appropriate.

### Keyboard Navigation

All interactive elements in footer are keyboard accessible:

- Tab to navigate through links/buttons
- Enter/Space to activate

## Best Practices

### Do's

- Use for secondary navigation actions
- Include version information
- Add user profile for apps
- Keep content minimal
- Use for settings/help links
- Add border-top separation

### Don'ts

- Don't overload with too much content
- Don't include primary navigation
- Don't hide critical features
- Don't forget padding

## Common Use Cases

### 1. Version Selector

For documentation sites with multiple versions

### 2. User Profile

For authenticated applications

### 3. Quick Actions

Settings, help, sign out links

### 4. Status Information

System status, connectivity, sync state

### 5. Theme Switcher

For applications with multiple themes

## Performance

- Renders at bottom of sidebar
- Minimal re-renders
- CSS Modules for scoped styling
- Lightweight component

## Related

- Sidebar - Sidebar container
- NavLink - Sidebar navigation links
- Link - General-purpose links
- Button - Action buttons
