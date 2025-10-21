# Sidebar Component

**Status**: ✅ Production Ready | **Version**: 0.2.0

A responsive, accessible sidebar navigation component with mobile support, collapsible sections, and full keyboard navigation.

> For comprehensive documentation, examples, and advanced patterns, see the [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md#sidebar-navigation-system)

## Overview

A responsive sidebar navigation component that adapts between desktop (side-by-side) and mobile (overlay) layouts. Works seamlessly with NavLink, NavSection, and SidebarFooter components.

## Features

- ✅ Icon-only and full-width modes
- ✅ Collapsible navigation sections
- ✅ Active state tracking
- ✅ Mobile-responsive (slide-out drawer)
- ✅ Smooth animations
- ✅ Keyboard navigation support
- ✅ WCAG AA+ accessible
- ✅ Design token integration
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { Sidebar } from '@spexop/react';
import { Home, Settings, User } from '@spexop/icons';

function App() {
  return (
    <Sidebar
      logo={{
        icon: Home,
        text: 'MyApp',
        href: '/',
      }}
      sections={[
        {
          title: 'Main',
          items: [
            { label: 'Dashboard', href: '/dashboard', icon: Home },
            { label: 'Profile', href: '/profile', icon: User },
            { label: 'Settings', href: '/settings', icon: Settings },
          ],
        },
      ]}
      currentPath="/dashboard"
      onNavigate={(path) => console.log(path)}
    />
  );
}
```

## States

### Icons Mode

Collapsed sidebar showing only icons.

```tsx
<Sidebar
  state="icons"
  logo={logo}
  sections={sections}
  currentPath={currentPath}
  onNavigate={handleNavigate}
/>
```

### Hidden Mode

Completely hidden sidebar.

```tsx
<Sidebar
  state="hidden"
  logo={logo}
  sections={sections}
  currentPath={currentPath}
  onNavigate={handleNavigate}
/>
```

## Sections and Items

### Basic Navigation

```tsx
const sections = [
  {
    title: 'Navigation',
    items: [
      { label: 'Home', href: '/', icon: Home },
      { label: 'About', href: '/about', icon: Info },
      { label: 'Contact', href: '/contact', icon: Mail },
    ],
  },
];

<Sidebar
  sections={sections}
  currentPath={currentPath}
  onNavigate={handleNavigate}
/>
```

### Multiple Sections

```tsx
const sections = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Projects', href: '/projects', icon: Folder },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Profile', href: '/profile', icon: User },
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];
```

### With Badges

```tsx
const sections = [
  {
    title: 'Navigation',
    items: [
      { 
        label: 'Messages', 
        href: '/messages', 
        icon: Mail,
        badge: '12',
      },
      { 
        label: 'Notifications', 
        href: '/notifications', 
        icon: Bell,
        badge: '3',
      },
    ],
  },
];
```

### Expandable Submenus

```tsx
const sections = [
  {
    title: 'Components',
    items: [
      {
        label: 'Buttons',
        href: '/components/buttons',
        icon: MousePointer,
        submenu: [
          { label: 'Button', href: '/components/buttons/button' },
          { label: 'Icon Button', href: '/components/buttons/icon-button' },
          { label: 'Button Group', href: '/components/buttons/group' },
        ],
      },
      {
        label: 'Forms',
        href: '/components/forms',
        icon: FileText,
        submenu: [
          { label: 'Input', href: '/components/forms/input' },
          { label: 'Select', href: '/components/forms/select' },
          { label: 'Checkbox', href: '/components/forms/checkbox' },
        ],
      },
    ],
  },
];
```

## Logo Configuration

```tsx
<Sidebar
  logo={{
    icon: Logo,
    text: 'Spexop',
    href: '/',
    ariaLabel: 'Spexop - Home',
  }}
  sections={sections}
  currentPath={currentPath}
  onNavigate={handleNavigate}
/>
```

## Mobile Behavior

On mobile, the sidebar automatically becomes a slide-out drawer:

```tsx
<Sidebar
  sections={sections}
  currentPath={currentPath}
  onNavigate={handleNavigate}
  onMobileClose={() => console.log('Mobile sidebar closed')}
/>
```

## Props

```typescript
interface SidebarProps {
  logo: {
    icon: IconComponent;
    text: string;
    href: string;
    ariaLabel?: string;
  };
  sections: SidebarSection[];
  currentPath: string;
  onNavigate: (path: string) => void;
  state?: "icons" | "hidden";
  position?: "left" | "right";
  className?: string;
  onMobileClose?: () => void;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface SidebarItem {
  label: string;
  href: string;
  icon: IconComponent;
  badge?: string;
  submenu?: SubMenuItem[];
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Stack and Container primitives
2. **Borders before shadows** - Clean border-based separation
3. **Typography before decoration** - Clear navigation labels
4. **Tokens before magic numbers** - Uses spacing and color tokens
5. **Accessibility before aesthetics** - Full keyboard and screen reader support

## Accessibility

- ✅ Semantic HTML with proper ARIA roles
- ✅ Keyboard navigation (Arrow keys, Enter, Tab)
- ✅ Screen reader announcements
- ✅ Focus management
- ✅ Active state indication
- ✅ Expandable sections properly announced
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Arrow Up/Down` - Navigate between items
- `Enter/Space` - Select item or expand submenu
- `Escape` - Close mobile sidebar or collapse submenu
- `Tab` - Move focus through sidebar
- `Home` - Jump to first item
- `End` - Jump to last item

## Common Patterns

### With Layout

```tsx
<div className="app-layout">
  <Sidebar
    logo={logo}
    sections={sections}
    currentPath={currentPath}
    onNavigate={handleNavigate}
  />
  <main className="main-content">
    <Outlet />
  </main>
</div>
```

### With State Management

```tsx
function AppLayout() {
  const [sidebarState, setSidebarState] = useState('icons');
  const location = useLocation();

  return (
    <>
      <Sidebar
        state={sidebarState}
        logo={logo}
        sections={sections}
        currentPath={location.pathname}
        onNavigate={(path) => navigate(path)}
      />
      <button onClick={() => 
        setSidebarState(state => state === 'icons' ? 'hidden' : 'icons')
      }>
        Toggle Sidebar
      </button>
    </>
  );
}
```

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import { Sidebar, type SidebarProps } from "@spexop/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function MySidebar({ isOpen, onClose }: Props) {
  const props: SidebarProps = {
    isOpen,
    onClose,
    showHeader: true,
    headerTitle: "Navigation"
  };

  return <Sidebar {...props}>...content...</Sidebar>;
}
```

## Performance

- Lightweight: ~2KB gzipped
- Portal rendering only on mobile
- Focus trap and scroll lock only when active
- Efficient responsive breakpoint detection
- Smooth CSS transitions

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
- React 18+

## Related Components

- [TopBar](../TopBar/README.md) - Top navigation bar
- [NavLink](../NavLink/README.md) - Individual navigation link
- [NavSection](../NavSection/README.md) - Collapsible navigation section
- [SidebarFooter](../SidebarFooter/README.md) - Footer content for sidebar
- [Complete Navigation System](../USAGE-GUIDE.md#complete-navigation-system) - Full navigation setup

## Further Reading

- [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md) - Comprehensive guide with routing integration, migration guides, and advanced patterns
- [Accessibility Guidelines](../USAGE-GUIDE.md#accessibility) - WCAG compliance details
- [Best Practices](../USAGE-GUIDE.md#best-practices) - Mobile patterns and performance optimization

## License

MIT
