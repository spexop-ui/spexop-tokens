# Navigation Components - Usage Guide

**Component Version**: v0.2.0
**Last Updated**: October 20, 2025
**Compatibility**: Stable API

## Quick Start

### Installation

```bash
pnpm add @spexop/react @spexop/icons @spexop/theme
```

### Basic Imports

```tsx
import {
  Breadcrumb,
  Link,
  NavLink,
  NavSection,
  Pagination,
  Sidebar,
  SidebarFooter,
  Tabs,
  TopBar
} from '@spexop/react';
```

### Minimal Example

```tsx
import { TopBar, Sidebar, NavLink } from '@spexop/react';

function App() {
  return (
    <>
      <TopBar logoText="My App" />
      <Sidebar>
        <NavLink href="/" active>Home</NavLink>
        <NavLink href="/about">About</NavLink>
      </Sidebar>
    </>
  );
}
```

## Link Component

### Overview of Link Component

The Link component is a general-purpose navigation link with multiple variants, sizes, and full accessibility support. Use it for any navigation or linking needs throughout your application.

### When to Use Link vs NavLink

- **Link**: General-purpose links (headers, footers, inline text, CTAs)
- **NavLink**: Specialized for sidebar navigation with consistent styling

### Basic Usage of Link Component

```tsx
import { Link } from '@spexop/react';

function Header() {
  return (
    <nav>
      <Link href="/docs" variant="ghost">
        Documentation
      </Link>
    </nav>
  );
}
```

### Variants of Link Component

```tsx
// Text link (default) - for inline text and simple navigation
<Link href="/docs" variant="text">
  Documentation
</Link>

// Ghost - for navigation menus and lists
<Link href="/dashboard" variant="ghost">
  Dashboard
</Link>

// Outline - for secondary CTAs
<Link href="/learn-more" variant="outline">
  Learn More
</Link>

// Secondary - for subtle navigation
<Link href="/settings" variant="secondary">
  Settings
</Link>

// Primary - for main CTAs
<Link href="/get-started" variant="primary" size="lg">
  Get Started
</Link>
```

### Header Navigation with Link

```tsx
import { Stack, Link, Icon, Button } from '@spexop/react';

function Header() {
  return (
    <header style={{ borderBottom: '2px solid var(--theme-border)' }}>
      <Stack direction="horizontal" gap="lg" align="center" justify="space-between">
        {/* Logo */}
        <Link href="/" aria-label="Go to homepage">
          <Stack direction="horizontal" gap="xs" align="center">
            <Icon name="Box" size="lg" />
            <span style={{ fontWeight: 700 }}>Spexop</span>
          </Stack>
        </Link>
        
        {/* Navigation */}
        <nav aria-label="Main navigation">
          <Stack direction="horizontal" gap="md" align="center">
            <Link href="/features" variant="ghost">
              Features
            </Link>
            <Link href="/pricing" variant="ghost">
              Pricing
            </Link>
            <Link href="/docs" variant="ghost" active>
              Docs
            </Link>
            <Link href="/blog" variant="ghost">
              Blog
            </Link>
          </Stack>
        </nav>
        
        {/* Actions */}
        <Stack direction="horizontal" gap="sm" align="center">
          <Link href="/login" variant="ghost">
            Sign In
          </Link>
          <Button variant="primary">
            Get Started
          </Button>
        </Stack>
      </Stack>
    </header>
  );
}
```

### Footer Navigation with Link

```tsx
import { Grid, Stack, Link, Icon } from '@spexop/react';

function Footer() {
  return (
    <footer style={{ borderTop: '2px solid var(--theme-border)', padding: '48px 0' }}>
      <Grid columns="auto-fit" minColumnWidth="200px" gap="lg">
        {/* Product Links */}
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
        
        {/* Resource Links */}
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
        
        {/* Social Links */}
        <Stack direction="vertical" gap="sm">
          <h4>Connect</h4>
          <Stack direction="horizontal" gap="sm">
            <Link href="https://twitter.com/spexop" external variant="ghost" aria-label="Twitter">
              <Icon name="Twitter" size="md" />
            </Link>
            <Link href="https://github.com/spexop" external variant="ghost" aria-label="GitHub">
              <Icon name="Github" size="md" />
            </Link>
            <Link href="https://linkedin.com/company/spexop" external variant="ghost" aria-label="LinkedIn">
              <Icon name="Linkedin" size="md" />
            </Link>
          </Stack>
        </Stack>
      </Grid>
    </footer>
  );
}
```

### Inline Text Links with Link Component

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

### External Links with Link Component

```tsx
// External links automatically get target="_blank" and rel="noopener noreferrer"
<Link href="https://github.com/spexop" external>
  View on GitHub
</Link>

// Shows external indicator (↗)
```

### Icon Links with Link Component

```tsx
import { Link, Icon } from '@spexop/react';

// Link with icon
<Link href="/dashboard" variant="ghost">
  <Icon name="LayoutDashboard" size="sm" />
  <span>Dashboard</span>
</Link>

// Icon-only link (requires aria-label)
<Link href="/search" variant="ghost" aria-label="Search">
  <Icon name="Search" size="md" />
</Link>
```

### Active State of Link Component

```tsx
import { Link } from '@spexop/react';

// Automatically adds aria-current="page"
<Link href="/blog" active>
  Blog
</Link>

// Or specify custom aria-current value
<Link href="/step-2" aria-current="step">
  Step 2
</Link>
```

### Full-Width Links with Link Component

```tsx
import { Stack, Link } from '@spexop/react';

function Sidebar() {
  return (
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
  );
}
```

### Link Props

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

## Breadcrumb Component

### Overview of Breadcrumb Component

The Breadcrumb component shows hierarchical navigation paths, helping users understand their location in the application and navigate back to parent pages.

### Basic Usage of Breadcrumb Component

```tsx
import { Breadcrumb } from '@spexop/react';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Category', href: '/products/category' },
  { label: 'Current Page' }
];

function MyPage() {
  return <Breadcrumb items={items} />;
}
```

### With Click Handlers

```tsx
import { Breadcrumb } from '@spexop/react';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const navigate = useNavigate();

  const items = [
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Products', onClick: () => navigate('/products') },
    { label: 'Category', onClick: () => navigate('/products/category') },
    { label: 'Current Product' }
  ];

  return <Breadcrumb items={items} />;
}
```

### With Icons

```tsx
import { Breadcrumb } from '@spexop/react';
import { Home, Package, Tag } from '@spexop/icons';

const items = [
  {
    label: 'Home',
    href: '/',
    icon: <Home size={16} strokeWidth={2} />
  },
  {
    label: 'Products',
    href: '/products',
    icon: <Package size={16} strokeWidth={2} />
  },
  {
    label: 'Category',
    href: '/products/category',
    icon: <Tag size={16} strokeWidth={2} />
  },
  { label: 'Current Page' }
];

<Breadcrumb items={items} />
```

### Custom Separator

```tsx
// Slash separator
<Breadcrumb items={items} separator="/" />

// Custom icon separator
import { ArrowRight } from '@spexop/icons';
<Breadcrumb 
  items={items} 
  separator={<ArrowRight size={12} strokeWidth={2} />} 
/>

// Text separator
<Breadcrumb items={items} separator="›" />
```

### Collapsible Breadcrumbs

For long paths, use `maxItems` to collapse middle items:

```tsx
const longPath = [
  { label: 'Home', href: '/' },
  { label: 'Level 1', href: '/l1' },
  { label: 'Level 2', href: '/l1/l2' },
  { label: 'Level 3', href: '/l1/l2/l3' },
  { label: 'Level 4', href: '/l1/l2/l3/l4' },
  { label: 'Level 5', href: '/l1/l2/l3/l4/l5' },
  { label: 'Current Page' }
];

// Shows: Home / ... / Level 5 / Current Page
<Breadcrumb items={longPath} maxItems={4} />
```

### Size Variants

```tsx
// Small
<Breadcrumb items={items} size="sm" />

// Medium (default)
<Breadcrumb items={items} size="md" />

// Large
<Breadcrumb items={items} size="lg" />
```

### Disabled Items

```tsx
const items = [
  { label: 'Home', href: '/' },
  { label: 'Private Section', disabled: true },
  { label: 'Current Page' }
];

<Breadcrumb items={items} />
```

### Breadcrumb Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | required | Array of breadcrumb items |
| `separator` | `React.ReactNode` | ChevronRight icon | Separator between items |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `maxItems` | `number` | - | Max items before collapse |
| `className` | `string` | - | Additional CSS class |
| `aria-label` | `string` | `"Breadcrumb"` | ARIA label for navigation |

#### BreadcrumbItem Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `React.ReactNode` | Yes | Item label text or element |
| `href` | `string` | No | Link URL (for anchor tags) |
| `onClick` | `() => void` | No | Click handler (for buttons) |
| `disabled` | `boolean` | No | Whether item is disabled |
| `icon` | `React.ReactNode` | No | Icon to display before label |

## Pagination Component

### Overview of the Pagination Component

The Pagination component enables users to navigate through pages of content, commonly used with tables, lists, and search results.

### Basic Usage of the Pagination Component

```tsx
import { useState } from 'react';
import { Pagination } from '@spexop/react';

function DataList() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
    />
  );
}
```

### With Data Fetching of the Pagination Component

```tsx
import { useState, useEffect } from 'react';
import { Pagination } from '@spexop/react';

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch(`/api/products?page=${currentPage}&limit=${itemsPerPage}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.items);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      });
  }, [currentPage]);

  return (
    <div>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

### Sibling Count of the Pagination Component

Control how many page numbers appear on each side of the current page:

```tsx
// Show 1 sibling on each side (default)
// Example: 1 ... 4 [5] 6 ... 10
<Pagination
  currentPage={5}
  totalPages={10}
  onPageChange={handleChange}
  siblingCount={1}
/>

// Show 2 siblings on each side
// Example: 1 ... 3 4 [5] 6 7 ... 10
<Pagination
  currentPage={5}
  totalPages={10}
  onPageChange={handleChange}
  siblingCount={2}
/>
```

### Configuration Options of the Pagination Component

```tsx
// Without first/last buttons
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={handleChange}
  showFirstLast={false}
/>

// Without previous/next buttons
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={handleChange}
  showPrevNext={false}
/>

// Numbers only
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={handleChange}
  showFirstLast={false}
  showPrevNext={false}
/>
```

### Custom Labels of the Pagination Component

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={handleChange}
  labels={{
    first: 'Start',
    previous: 'Prev',
    next: 'Next',
    last: 'End',
    page: (page) => `Go to page ${page}`
  }}
/>
```

### Size Variants of the Pagination Component

```tsx
// Small
<Pagination currentPage={1} totalPages={10} onPageChange={handleChange} size="sm" />

// Medium (default)
<Pagination currentPage={1} totalPages={10} onPageChange={handleChange} size="md" />

// Large
<Pagination currentPage={1} totalPages={10} onPageChange={handleChange} size="lg" />
```

### With URL Synchronization of the Pagination Component

```tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@spexop/react';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchResults(currentPage).then(data => {
      setResults(data.items);
      setTotalPages(data.totalPages);
    });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page: String(page) });
  };

  return (
    <>
      <ResultsList items={results} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
```

### Pagination Props of the Pagination Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | required | Current page (1-indexed) |
| `totalPages` | `number` | required | Total number of pages |
| `onPageChange` | `(page: number) => void` | required | Page change callback |
| `siblingCount` | `number` | `1` | Number of siblings shown on each side |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `showFirstLast` | `boolean` | `true` | Show first/last buttons |
| `showPrevNext` | `boolean` | `true` | Show prev/next buttons |
| `showPageNumbers` | `boolean` | `true` | Show page number buttons |
| `className` | `string` | - | Additional CSS class |
| `labels` | `object` | - | Custom button labels |

## Tabs Component

### Overview of the Tabs Component

The Tabs component organizes content into sections, allowing users to switch between different views while maintaining context.

### Basic Usage of the Tabs Component

```tsx
import { Tabs } from '@spexop/react';

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: <div>Overview content</div>
  },
  {
    id: 'details',
    label: 'Details',
    content: <div>Details content</div>
  },
  {
    id: 'reviews',
    label: 'Reviews',
    content: <div>Reviews content</div>
  }
];

function ProductPage() {
  return <Tabs tabs={tabs} />;
}
```

### Controlled Tabs of the Tabs Component

```tsx
import { useState } from 'react';
import { Tabs } from '@spexop/react';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      content: <ProfileSettings />
    },
    {
      id: 'security',
      label: 'Security',
      content: <SecuritySettings />
    },
    {
      id: 'notifications',
      label: 'Notifications',
      content: <NotificationSettings />
    }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Save to localStorage, update URL, etc.
    localStorage.setItem('activeTab', tabId);
  };

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={handleTabChange}
    />
  );
}
```

### With Icons of the Tabs Component

```tsx
import { Tabs } from '@spexop/react';
import { User, Settings, Bell } from '@spexop/icons';

const tabs = [
  {
    id: 'profile',
    label: 'Profile',
    icon: <User size={16} strokeWidth={2} />,
    content: <ProfileContent />
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={16} strokeWidth={2} />,
    content: <SettingsContent />
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Bell size={16} strokeWidth={2} />,
    content: <NotificationsContent />
  }
];

<Tabs tabs={tabs} />
```

### Disabled Tabs of the Tabs Component

```tsx
const tabs = [
  {
    id: 'available',
    label: 'Available',
    content: <AvailableContent />
  },
  {
    id: 'coming-soon',
    label: 'Coming Soon',
    content: <ComingSoonContent />,
    disabled: true
  }
];

<Tabs tabs={tabs} />
```

### Visual Variants of the Tabs Component

```tsx
// Default variant (bordered)
<Tabs tabs={tabs} variant="default" />

// Pills variant (rounded backgrounds)
<Tabs tabs={tabs} variant="pills" />

// Underline variant (bottom border indicator)
<Tabs tabs={tabs} variant="underline" />
```

### Size Variants of the Tabs Component

```tsx
// Small
<Tabs tabs={tabs} size="sm" />

// Medium (default)
<Tabs tabs={tabs} size="md" />

// Large
<Tabs tabs={tabs} size="lg" />
```

### Full Width Tabs of the Tabs Component

```tsx
<Tabs tabs={tabs} fullWidth />
```

### Tabs Props of the Tabs Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `Tab[]` | required | Array of tab objects |
| `activeTab` | `string` | - | Controlled active tab ID |
| `onChange` | `(tabId: string) => void` | - | Tab change callback |
| `defaultActiveTab` | `string` | First tab | Default active tab (uncontrolled) |
| `variant` | `"default" \| "pills" \| "underline"` | `"default"` | Visual variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `fullWidth` | `boolean` | `false` | Stretch tabs to full width |
| `className` | `string` | - | Additional CSS class |
| `tabListClassName` | `string` | - | Tab list CSS class |
| `tabPanelClassName` | `string` | - | Tab panel CSS class |

#### Tab Object of the Tabs Component

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique tab identifier |
| `label` | `string` | Yes | Tab label text |
| `content` | `React.ReactNode` | Yes | Tab panel content |
| `icon` | `React.ReactNode` | No | Icon to display before label |
| `disabled` | `boolean` | No | Whether tab is disabled |

## Sidebar Navigation System

### Overview of the Sidebar Navigation System

The Sidebar, NavLink, NavSection, and SidebarFooter components work together to create a complete side navigation system with hierarchical structure and mobile support.

### Basic Sidebar of the Sidebar Navigation System

```tsx
import { Sidebar, NavLink } from '@spexop/react';

function Layout({ children }) {
  return (
    <>
      <TopBar />
      <div style={{ display: 'flex' }}>
        <Sidebar isOpen={true}>
          <NavLink href="/" active>Dashboard</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/team">Team</NavLink>
          <NavLink href="/settings">Settings</NavLink>
        </Sidebar>
        <main>{children}</main>
      </div>
    </>
  );
}
```

### Sidebar with NavSections of the Sidebar Navigation System

```tsx
import { Sidebar, NavLink, NavSection } from '@spexop/react';

function AppSidebar() {
  return (
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

      <NavLink href="/settings">Settings</NavLink>
    </Sidebar>
  );
}
```

### Mobile-Responsive Sidebar of the Sidebar Navigation System

```tsx
import { useState } from 'react';
import { Sidebar, NavLink, TopBar } from '@spexop/react';

function ResponsiveLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <TopBar
        logoText="My App"
        onMobileMenuClick={() => setSidebarOpen(true)}
      />

      <div style={{ display: 'flex' }}>
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

        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </>
  );
}
```

### Sidebar with Footer of the Sidebar Navigation System

```tsx
import { Sidebar, NavLink, NavSection, SidebarFooter } from '@spexop/react';

function DocumentationSidebar() {
  return (
    <Sidebar isOpen={true}>
      <NavSection label="Getting Started" defaultOpen={true}>
        <NavLink href="/docs/installation">Installation</NavLink>
        <NavLink href="/docs/quick-start">Quick Start</NavLink>
      </NavSection>

      <NavSection label="Components" defaultOpen={true}>
        <NavLink href="/docs/button">Button</NavLink>
        <NavLink href="/docs/card">Card</NavLink>
        <NavLink href="/docs/modal">Modal</NavLink>
      </NavSection>

      <SidebarFooter>
        <div style={{ padding: '16px' }}>
          <select style={{ width: '100%' }}>
            <option>v1.0.0</option>
            <option>v0.9.0</option>
            <option>v0.8.0</option>
          </select>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
```

### NavLink with Icons of the Sidebar Navigation System

```tsx
import { NavLink } from '@spexop/react';
import { Home, Users, Settings } from '@spexop/icons';

<NavLink href="/" active>
  <Home size={20} strokeWidth={2} />
  <span>Dashboard</span>
</NavLink>

<NavLink href="/team">
  <Users size={20} strokeWidth={2} />
  <span>Team</span>
</NavLink>

<NavLink href="/settings">
  <Settings size={20} strokeWidth={2} />
  <span>Settings</span>
</NavLink>
```

### Sidebar Component Props of the Sidebar Navigation System

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | required | Sidebar content (NavLinks, NavSections) |
| `isOpen` | `boolean` | `true` | Whether sidebar is open |
| `onClose` | `() => void` | - | Close callback (required for mobile) |
| `showHeader` | `boolean` | `true` | Show header on mobile |
| `headerTitle` | `string` | `"Navigation"` | Header title text |
| `className` | `string` | - | Additional CSS class |

### NavLink Component Props of the Sidebar Navigation System

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | required | Link destination |
| `children` | `React.ReactNode` | required | Link content |
| `active` | `boolean` | `false` | Whether link is active |
| `onClick` | `(e: MouseEvent) => void` | - | Click handler |
| `className` | `string` | - | Additional CSS class |

### NavSection Component Props of the Sidebar Navigation System

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Section label text |
| `defaultOpen` | `boolean` | `false` | Whether section starts open |
| `children` | `React.ReactNode` | required | Section content (NavLinks) |
| `onToggle` | `(isOpen: boolean) => void` | - | Toggle callback |
| `className` | `string` | - | Additional CSS class |

### SidebarFooter Component Props of the Sidebar Navigation System

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | required | Footer content |
| `className` | `string` | - | Additional CSS class |

## TopBar Component

### Overview of the TopBar Component

The TopBar component provides a fixed header navigation bar with logo, search, theme toggle, and action buttons.

### Basic Usage of the TopBar Component

```tsx
import { TopBar } from '@spexop/react';

function App() {
  return (
    <>
      <TopBar
        logoText="My Application"
        onLogoClick={() => navigate('/')}
      />
      <main>{/* Content */}</main>
    </>
  );
}
```

### Full Featured TopBar of the TopBar Component

```tsx
import { TopBar } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light';
    setTheme(newTheme);
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

### Custom GitHub Handler of the TopBar Component

```tsx
<TopBar
  logoText="My App"
  onGitHubClick={() => {
    // Custom analytics before opening GitHub
    trackEvent('github_click');
    window.open('https://github.com/myorg/myrepo', '_blank');
  }}
/>
```

### Without Mobile Menu of the TopBar Component

```tsx
<TopBar
  logoText="My App"
  showMobileMenu={false}
/>
```

### TopBar Props of the TopBar Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logoText` | `string` | `"Spexop"` | Logo text |
| `onLogoClick` | `() => void` | - | Logo click handler |
| `onSearchClick` | `() => void` | - | Search button click handler |
| `onThemeToggle` | `() => void` | - | Theme toggle click handler |
| `onGitHubClick` | `() => void` | - | GitHub button click handler |
| `onSettingsClick` | `() => void` | - | Settings button click handler |
| `onMobileMenuClick` | `() => void` | - | Mobile menu button click handler |
| `currentTheme` | `"light" \| "dark" \| "auto"` | `"auto"` | Current theme (changes icon) |
| `showMobileMenu` | `boolean` | `true` | Show mobile menu button |
| `gitHubUrl` | `string` | `"https://github.com/spexop-ui"` | GitHub repository URL |
| `className` | `string` | - | Additional CSS class |

## Complete Navigation System

### Full Application Example of the Navigation System

This example combines all navigation components into a complete application layout:

```tsx
import { useState } from 'react';
import {
  TopBar,
  Sidebar,
  NavLink,
  NavSection,
  SidebarFooter,
  Breadcrumb,
  Tabs
} from '@spexop/react';

function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const themes = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <div className="app">
      {/* Top Navigation Bar */}
      <TopBar
        logoText="Dashboard"
        onLogoClick={() => navigate('/')}
        onSearchClick={() => console.log('Search')}
        onThemeToggle={toggleTheme}
        onMobileMenuClick={() => setSidebarOpen(true)}
        currentTheme={theme}
      />

      <div style={{ display: 'flex', paddingTop: '64px' }}>
        {/* Sidebar Navigation */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          showHeader={true}
          headerTitle="Menu"
        >
          <NavLink href="/" active>
            Dashboard
          </NavLink>

          <NavSection label="Projects" defaultOpen={true}>
            <NavLink href="/projects/active">Active Projects</NavLink>
            <NavLink href="/projects/archived">Archived</NavLink>
            <NavLink href="/projects/new">Create New</NavLink>
          </NavSection>

          <NavSection label="Team">
            <NavLink href="/team/members">Members</NavLink>
            <NavLink href="/team/roles">Roles & Permissions</NavLink>
          </NavSection>

          <NavLink href="/analytics">Analytics</NavLink>
          <NavLink href="/settings">Settings</NavLink>

          <SidebarFooter>
            <div style={{ padding: '16px', borderTop: '1px solid var(--theme-border)' }}>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--theme-text-secondary)' }}>
                Version 1.0.0
              </p>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

function ProjectPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Active Projects', href: '/projects/active' },
    { label: 'Project Alpha' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', content: <ProjectOverview /> },
    { id: 'tasks', label: 'Tasks', content: <ProjectTasks /> },
    { id: 'team', label: 'Team', content: <ProjectTeam /> },
    { id: 'files', label: 'Files', content: <ProjectFiles /> }
  ];

  return (
    <AppLayout>
      <Breadcrumb items={breadcrumbItems} />
      <h1>Project Alpha</h1>
      <Tabs tabs={tabs} />
    </AppLayout>
  );
}
```

### Documentation Site Layout of the Navigation System

```tsx
import {
  TopBar,
  Sidebar,
  NavLink,
  NavSection,
  SidebarFooter,
  Breadcrumb
} from '@spexop/react';

function DocsLayout({ children, breadcrumbs }) {
  const [version, setVersion] = useState('v1.0.0');

  return (
    <>
      <TopBar
        logoText="Documentation"
        onSearchClick={() => openSearchModal()}
        gitHubUrl="https://github.com/myorg/docs"
      />

      <div style={{ display: 'flex', paddingTop: '64px' }}>
        <Sidebar isOpen={true}>
          <NavSection label="Getting Started" defaultOpen={true}>
            <NavLink href="/docs/installation">Installation</NavLink>
            <NavLink href="/docs/quick-start">Quick Start</NavLink>
            <NavLink href="/docs/configuration">Configuration</NavLink>
          </NavSection>

          <NavSection label="Components" defaultOpen={true}>
            <NavLink href="/docs/components/button">Button</NavLink>
            <NavLink href="/docs/components/card">Card</NavLink>
            <NavLink href="/docs/components/modal">Modal</NavLink>
            <NavLink href="/docs/components/tabs">Tabs</NavLink>
          </NavSection>

          <NavSection label="Guides">
            <NavLink href="/docs/guides/theming">Theming</NavLink>
            <NavLink href="/docs/guides/accessibility">Accessibility</NavLink>
            <NavLink href="/docs/guides/testing">Testing</NavLink>
          </NavSection>

          <SidebarFooter>
            <div style={{ padding: '16px' }}>
              <label htmlFor="version-select" style={{ display: 'block', marginBottom: '8px' }}>
                Version
              </label>
              <select
                id="version-select"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="v1.0.0">v1.0.0 (latest)</option>
                <option value="v0.9.0">v0.9.0</option>
                <option value="v0.8.0">v0.8.0</option>
              </select>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main style={{ flex: 1, padding: '24px', maxWidth: '800px' }}>
          <Breadcrumb items={breadcrumbs} />
          {children}
        </main>
      </div>
    </>
  );
}
```

## Routing Integration

### React Router v6

```tsx
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Sidebar, NavLink } from '@spexop/react';

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    const items = [{ label: 'Home', onClick: () => navigate('/') }];

    let currentPath = '';
    for (const path of paths) {
      currentPath += `/${path}`;
      const isLast = currentPath === location.pathname;
      items.push({
        label: path.charAt(0).toUpperCase() + path.slice(1),
        onClick: isLast ? undefined : () => navigate(currentPath)
      });
    }

    return items;
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Sidebar isOpen={true}>
        <NavLink href="/" active={isActive('/')}>Home</NavLink>
        <NavLink href="/about" active={isActive('/about')}>About</NavLink>
        <NavLink href="/contact" active={isActive('/contact')}>Contact</NavLink>
      </Sidebar>

      <main>
        <Breadcrumb items={generateBreadcrumbs()} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
```

### Next.js App Router

```tsx
// app/layout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { TopBar, Sidebar, NavLink, Breadcrumb } from '@spexop/react';
import Link from 'next/link';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const items = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    for (const path of paths) {
      currentPath += `/${path}`;
      items.push({
        label: path.charAt(0).toUpperCase() + path.slice(1),
        href: currentPath
      });
    }

    return items;
  };

  return (
    <html>
      <body>
        <TopBar logoText="Next.js App" />
        
        <div style={{ display: 'flex' }}>
          <Sidebar isOpen={true}>
            <Link href="/" passHref legacyBehavior>
              <NavLink active={pathname === '/'}>Home</NavLink>
            </Link>
            <Link href="/about" passHref legacyBehavior>
              <NavLink active={pathname === '/about'}>About</NavLink>
            </Link>
            <Link href="/blog" passHref legacyBehavior>
              <NavLink active={pathname.startsWith('/blog')}>Blog</NavLink>
            </Link>
          </Sidebar>

          <main>
            <Breadcrumb items={generateBreadcrumbs()} />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
```

### Next.js Pages Router

```tsx
// pages/_app.tsx
import { useRouter } from 'next/router';
import { Sidebar, NavLink } from '@spexop/react';
import Link from 'next/link';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Sidebar isOpen={true}>
        <Link href="/" passHref legacyBehavior>
          <NavLink active={router.pathname === '/'}>Home</NavLink>
        </Link>
        <Link href="/about" passHref legacyBehavior>
          <NavLink active={router.pathname === '/about'}>About</NavLink>
        </Link>
      </Sidebar>
      
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
```

### TanStack Router

```tsx
import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { Sidebar, NavLink, Breadcrumb } from '@spexop/react';

const rootRoute = createRootRoute({
  component: () => {
    const router = useRouter();
    const location = router.state.location;

    return (
      <>
        <Sidebar isOpen={true}>
          <NavLink href="/" active={location.pathname === '/'}>Home</NavLink>
          <NavLink href="/about" active={location.pathname === '/about'}>About</NavLink>
        </Sidebar>
        <main>
          <Outlet />
        </main>
      </>
    );
  }
});
```

## Accessibility

### WCAG AA+ Compliance

All navigation components meet WCAG AA+ accessibility standards:

- **Color Contrast**: Text has minimum 7:1 contrast ratio (AAA level)
- **Touch Targets**: All interactive elements are minimum 44x44px
- **Focus Indicators**: Clear 2px outline on focused elements
- **Semantic HTML**: Proper use of `<nav>`, `<a>`, `<button>` elements
- **ARIA Attributes**: Comprehensive ARIA labels, roles, and states

### Keyboard Navigation

#### Breadcrumb

- **Tab**: Navigate through clickable breadcrumb items
- **Shift + Tab**: Navigate backwards
- **Enter**: Activate focused link/button

#### Pagination

- **Tab**: Navigate through page buttons
- **Shift + Tab**: Navigate backwards
- **Enter/Space**: Activate focused button

#### Tabs

- **Tab**: Focus on tab list (first focus), then tab panels
- **Arrow Left**: Move to previous tab
- **Arrow Right**: Move to next tab
- **Home**: Move to first tab
- **End**: Move to last tab
- **Enter/Space**: Activate focused tab

#### Sidebar

- **Tab**: Navigate through navigation links
- **Enter**: Activate focused link
- **Escape**: Close sidebar (mobile only)

#### NavSection

- **Tab**: Navigate to section toggle button
- **Enter/Space**: Toggle section open/closed
- **Arrow Up/Down**: Navigate between sections (when focused)

### Screen Reader Support

#### Breadcrumb of the Navigation System

```tsx
<nav aria-label="Breadcrumb">
  <ol>
    <li>
      <a href="/">Home</a>
    </li>
    <li aria-current="page">
      <span>Current Page</span>
    </li>
  </ol>
</nav>
```

Announces: "Breadcrumb navigation, list, 2 items. Home, link. Current Page, current page."

#### Pagination of the Navigation System

```tsx
<nav aria-label="Pagination">
  <button aria-label="Go to page 1">1</button>
  <button aria-label="Go to page 2" aria-current="page">2</button>
  <button aria-label="Go to page 3">3</button>
</nav>
```

Announces: "Pagination navigation. Go to page 2, button, current page."

#### Tabs of the Navigation System

```tsx
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">
    Tab 1
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">
    Tab 2
  </button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  Content 1
</div>
```

Announces: "Tab list. Tab 1, tab, selected, 1 of 2."

#### Sidebar of the Navigation System

```tsx
<aside aria-label="Main navigation" aria-hidden="false">
  <nav>
    <a href="/" aria-current="page">Home</a>
    <a href="/about">About</a>
  </nav>
</aside>
```

Announces: "Main navigation, complementary. Home, link, current page."

### Reduced Motion of the Navigation System

All navigation components respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This ensures smooth transitions are disabled for users with vestibular disorders.

## Best Practices

### Navigation Hierarchy of the Navigation System

Use navigation components appropriately for content hierarchy:

1. **TopBar**: Primary global navigation, always visible
2. **Sidebar**: Secondary navigation for major sections
3. **Tabs**: Tertiary navigation within a page or section
4. **Breadcrumb**: Hierarchical trail showing location
5. **Pagination**: Sequential navigation through data

### Mobile Considerations

#### Responsive Breakpoints

Navigation components automatically adapt at these breakpoints:

- **Mobile**: < 768px (Sidebar becomes overlay, TopBar shows menu button)
- **Tablet**: 768px - 1024px (Sidebar visible, full features)
- **Desktop**: > 1024px (Sidebar side-by-side, all features)

#### Touch Targets

All interactive elements meet the 44x44px minimum:

```tsx
// Correct - adequate touch target
<NavLink href="/page">
  Link Text
</NavLink>

// Incorrect - too small
<a href="/page" style={{ padding: '2px' }}>
  Link
</a>
```

#### Mobile Menu Pattern

```tsx
function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TopBar
        onMobileMenuClick={() => setIsOpen(true)}
        showMobileMenu={true}
      />

      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showHeader={true}
        headerTitle="Menu"
      >
        {/* Navigation items */}
      </Sidebar>
    </>
  );
}
```

### Performance

#### Lazy Loading Tab Content

Avoid rendering all tab content at once:

```tsx
import { lazy, Suspense } from 'react';

const OverviewTab = lazy(() => import('./OverviewTab'));
const DetailsTab = lazy(() => import('./DetailsTab'));
const AnalyticsTab = lazy(() => import('./AnalyticsTab'));

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <Suspense fallback={<Spinner />}>
        <OverviewTab />
      </Suspense>
    )
  },
  {
    id: 'details',
    label: 'Details',
    content: (
      <Suspense fallback={<Spinner />}>
        <DetailsTab />
      </Suspense>
    )
  }
];

<Tabs tabs={tabs} />
```

#### Virtual Scrolling for Long Lists

For sidebars with many links:

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function LongSidebar() {
  const parentRef = useRef(null);
  const navItems = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    label: `Item ${i}`,
    href: `/item/${i}`
  }));

  const virtualizer = useVirtualizer({
    count: navItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48
  });

  return (
    <Sidebar isOpen={true}>
      <div ref={parentRef} style={{ height: '100%', overflow: 'auto' }}>
        <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
          {virtualizer.getVirtualItems().map(virtualItem => (
            <NavLink
              key={virtualItem.key}
              href={navItems[virtualItem.index].href}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`
              }}
            >
              {navItems[virtualItem.index].label}
            </NavLink>
          ))}
        </div>
      </div>
    </Sidebar>
  );
}
```

### SEO Considerations

#### Semantic HTML

Use proper semantic elements for better SEO:

```tsx
// Good - semantic navigation
<nav aria-label="Main navigation">
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

// Bad - non-semantic
<div className="nav">
  <span onClick={() => navigate('/')}>Home</span>
</div>
```

#### Structured Data

Add structured data for breadcrumbs:

```tsx
import { Breadcrumb } from '@spexop/react';

function SEOBreadcrumb({ items }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://example.com${item.href}` : undefined
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Breadcrumb items={items} />
    </>
  );
}
```

### State Management

#### Local Storage Persistence

Persist navigation state across sessions:

```tsx
import { useState, useEffect } from 'react';
import { Tabs } from '@spexop/react';

function PersistentTabs() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'overview';
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const tabs = [
    { id: 'overview', label: 'Overview', content: <Overview /> },
    { id: 'details', label: 'Details', content: <Details /> }
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={setActiveTab}
    />
  );
}
```

#### URL Synchronization

Sync navigation state with URL:

```tsx
import { useSearchParams } from 'react-router-dom';
import { Tabs } from '@spexop/react';

function URLTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const handleTabChange = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', content: <Overview /> },
    { id: 'details', label: 'Details', content: <Details /> }
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={handleTabChange}
    />
  );
}
```

## Migration Guide

### From Material-UI

#### AppBar → TopBar

```tsx
// Material-UI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

<AppBar position="fixed">
  <Toolbar>
    <Typography variant="h6">My App</Typography>
  </Toolbar>
</AppBar>

// Spexop
import { TopBar } from '@spexop/react';

<TopBar logoText="My App" />
```

#### Drawer → Sidebar

```tsx
// Material-UI
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

<Drawer open={open} onClose={onClose}>
  <List>
    <ListItem button>Home</ListItem>
    <ListItem button>About</ListItem>
  </List>
</Drawer>

// Spexop
import { Sidebar, NavLink } from '@spexop/react';

<Sidebar isOpen={open} onClose={onClose}>
  <NavLink href="/">Home</NavLink>
  <NavLink href="/about">About</NavLink>
</Sidebar>
```

#### Tabs → Tabs

```tsx
// Material-UI
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';

<Tabs value={value} onChange={handleChange}>
  <Tab label="Tab 1" />
  <Tab label="Tab 2" />
</Tabs>
<TabPanel value={value} index={0}>Content 1</TabPanel>
<TabPanel value={value} index={1}>Content 2</TabPanel>

// Spexop
import { Tabs } from '@spexop/react';

const tabs = [
  { id: '0', label: 'Tab 1', content: 'Content 1' },
  { id: '1', label: 'Tab 2', content: 'Content 2' }
];

<Tabs tabs={tabs} />
```

#### Breadcrumbs → Breadcrumb

```tsx
// Material-UI
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

<Breadcrumbs>
  <Link href="/">Home</Link>
  <Link href="/products">Products</Link>
  <Typography>Current</Typography>
</Breadcrumbs>

// Spexop
import { Breadcrumb } from '@spexop/react';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Current' }
];

<Breadcrumb items={items} />
```

#### Pagination → Pagination

```tsx
// Material-UI
import Pagination from '@mui/material/Pagination';

<Pagination 
  count={10} 
  page={page} 
  onChange={(e, value) => setPage(value)} 
/>

// Spexop
import { Pagination } from '@spexop/react';

<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
/>
```

### From Chakra UI

#### Header → TopBar

```tsx
// Chakra UI
import { Box, Flex, Heading } from '@chakra-ui/react';

<Box as="header" bg="white" boxShadow="sm">
  <Flex align="center" justify="space-between" p={4}>
    <Heading size="md">My App</Heading>
  </Flex>
</Box>

// Spexop
import { TopBar } from '@spexop/react';

<TopBar logoText="My App" />
```

#### Sidebar → Sidebar

```tsx
// Chakra UI
import { Box, VStack, Link } from '@chakra-ui/react';

<Box w="240px" bg="gray.100">
  <VStack align="stretch" spacing={2}>
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
  </VStack>
</Box>

// Spexop
import { Sidebar, NavLink } from '@spexop/react';

<Sidebar isOpen={true}>
  <NavLink href="/">Home</NavLink>
  <NavLink href="/about">About</NavLink>
</Sidebar>
```

### From Ant Design

#### Menu → Sidebar + NavLink

```tsx
// Ant Design
import { Menu } from 'antd';

<Menu mode="inline" selectedKeys={[current]}>
  <Menu.Item key="home">Home</Menu.Item>
  <Menu.SubMenu key="products" title="Products">
    <Menu.Item key="active">Active</Menu.Item>
    <Menu.Item key="archived">Archived</Menu.Item>
  </Menu.SubMenu>
</Menu>

// Spexop
import { Sidebar, NavLink, NavSection } from '@spexop/react';

<Sidebar isOpen={true}>
  <NavLink href="/" active={current === 'home'}>Home</NavLink>
  <NavSection label="Products" defaultOpen={true}>
    <NavLink href="/active" active={current === 'active'}>Active</NavLink>
    <NavLink href="/archived" active={current === 'archived'}>Archived</NavLink>
  </NavSection>
</Sidebar>
```

## Troubleshooting

### Sidebar Not Appearing on Mobile

**Problem**: Sidebar doesn't show on mobile devices.

**Solution**: Ensure `isOpen` prop is controlled and set to `true` when menu button is clicked:

```tsx
const [sidebarOpen, setSidebarOpen] = useState(false);

<TopBar onMobileMenuClick={() => setSidebarOpen(true)} />
<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
```

### Tabs Not Switching

**Problem**: Tab content doesn't change when clicking tabs.

**Solution**: Make sure each tab has a unique `id` and content is properly defined:

```tsx
const tabs = [
  { id: 'unique-1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'unique-2', label: 'Tab 2', content: <div>Content 2</div> }
];
```

### Pagination Not Updating

**Problem**: Clicking pagination buttons doesn't change the page.

**Solution**: Ensure `onPageChange` callback updates the `currentPage` state:

```tsx
const [currentPage, setCurrentPage] = useState(1);

<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={(page) => setCurrentPage(page)} // Correct
  // onPageChange={handleChange} // Make sure handleChange updates state
/>
```

### NavLink Active State Not Working

**Problem**: NavLink doesn't show active state even though href matches.

**Solution**: Manually set the `active` prop based on your routing library:

```tsx
import { useLocation } from 'react-router-dom';

const location = useLocation();

<NavLink href="/about" active={location.pathname === '/about'}>
  About
</NavLink>
```

### Breadcrumb Items Not Clickable

**Problem**: Breadcrumb items don't navigate when clicked.

**Solution**: Ensure items have either `href` or `onClick`:

```tsx
// With href
const items = [
  { label: 'Home', href: '/' }, // Clickable
  { label: 'Current' } // Not clickable (last item)
];

// With onClick
const items = [
  { label: 'Home', onClick: () => navigate('/') }, // Clickable
  { label: 'Current' } // Not clickable
];
```

### Sidebar Focus Trap Issues

**Problem**: Can't tab out of sidebar or focus gets stuck.

**Solution**: Ensure `onClose` is provided for mobile and ESC key works:

```tsx
<Sidebar
  isOpen={isOpen}
  onClose={() => setIsOpen(false)} // Required for focus trap to work
>
  {/* Content */}
</Sidebar>
```

### TopBar Overlapping Content

**Problem**: TopBar covers page content.

**Solution**: Add padding-top to your main content equal to TopBar height (64px):

```tsx
<div style={{ paddingTop: '64px' }}>
  <main>{/* Content */}</main>
</div>
```

### Tabs Keyboard Navigation Not Working

**Problem**: Arrow keys don't switch tabs.

**Solution**: Ensure tabs aren't disabled and have proper structure:

```tsx
const tabs = [
  { id: '1', label: 'Tab 1', content: <div>1</div> }, // No disabled: true
  { id: '2', label: 'Tab 2', content: <div>2</div> }
];

<Tabs tabs={tabs} />
```

### NavSection Not Expanding

**Problem**: NavSection button doesn't expand/collapse.

**Solution**: Check that children are provided and `defaultOpen` is set correctly:

```tsx
<NavSection label="Section" defaultOpen={false}>
  <NavLink href="/link1">Link 1</NavLink>
  <NavLink href="/link2">Link 2</NavLink>
</NavSection>
```

## Advanced Patterns

### Dynamic Navigation from API

```tsx
import { useEffect, useState } from 'react';
import { Sidebar, NavLink, NavSection } from '@spexop/react';

function DynamicSidebar() {
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    fetch('/api/navigation')
      .then(res => res.json())
      .then(data => setNavItems(data));
  }, []);

  return (
    <Sidebar isOpen={true}>
      {navItems.map(item => {
        if (item.type === 'link') {
          return (
            <NavLink key={item.id} href={item.href}>
              {item.label}
            </NavLink>
          );
        }
        if (item.type === 'section') {
          return (
            <NavSection key={item.id} label={item.label}>
              {item.children.map(child => (
                <NavLink key={child.id} href={child.href}>
                  {child.label}
                </NavLink>
              ))}
            </NavSection>
          );
        }
        return null;
      })}
    </Sidebar>
  );
}
```

### Permission-Based Navigation

```tsx
import { Sidebar, NavLink, NavSection } from '@spexop/react';

function PermissionBasedNav({ user Permissions }) {
  const canView = (permission) => userPermissions.includes(permission);

  return (
    <Sidebar isOpen={true}>
      <NavLink href="/">Dashboard</NavLink>

      {canView('projects') && (
        <NavSection label="Projects">
          <NavLink href="/projects">All Projects</NavLink>
          {canView('projects:create') && (
            <NavLink href="/projects/new">Create New</NavLink>
          )}
        </NavSection>
      )}

      {canView('admin') && (
        <NavSection label="Admin">
          <NavLink href="/admin/users">Users</NavLink>
          <NavLink href="/admin/settings">Settings</NavLink>
        </NavSection>
      )}
    </Sidebar>
  );
}
```

### Multi-Level Breadcrumbs

```tsx
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from '@spexop/react';

const routeLabels = {
  '/': 'Home',
  '/products': 'Products',
  '/products/electronics': 'Electronics',
  '/products/electronics/phones': 'Phones'
};

function AutoBreadcrumb() {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const paths = location.pathname.split('/').filter(Boolean);
    const items = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    for (const path of paths) {
      currentPath += `/${path}`;
      items.push({
        label: routeLabels[currentPath] || path,
        href: currentPath
      });
    }

    return items;
  }, [location.pathname]);

  return <Breadcrumb items={breadcrumbs} />;
}
```

## TypeScript Support

All navigation components are fully typed with TypeScript.

### Type Definitions

```tsx
import type {
  BreadcrumbProps,
  BreadcrumbItem,
  PaginationProps,
  TabsProps,
  Tab,
  SidebarProps,
  NavLinkProps,
  NavSectionProps,
  TopBarProps,
  SidebarFooterProps
} from '@spexop/react';

// Custom breadcrumb type
type CustomBreadcrumbItem = BreadcrumbItem & {
  metadata?: Record<string, unknown>;
};

// Custom tab type
type CustomTab = Tab & {
  badge?: number;
  locked?: boolean;
};
```

### Generic Navigation Hook

```tsx
import { useState, useCallback } from 'react';

function useNavigation<T extends string>(initialRoute: T) {
  const [currentRoute, setCurrentRoute] = useState<T>(initialRoute);
  const [history, setHistory] = useState<T[]>([initialRoute]);

  const navigate = useCallback((route: T) => {
    setCurrentRoute(route);
    setHistory(prev => [...prev, route]);
  }, []);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentRoute(newHistory[newHistory.length - 1]);
    }
  }, [history]);

  return {
    currentRoute,
    history,
    navigate,
    goBack,
    canGoBack: history.length > 1
  };
}

// Usage
type AppRoute = '/' | '/about' | '/contact';
const { currentRoute, navigate, goBack, canGoBack } = useNavigation<AppRoute>('/');
```

## Performance Optimization

### Memoization

```tsx
import { memo, useMemo } from 'react';
import { Sidebar, NavLink } from '@spexop/react';

const MemoizedNavLink = memo(NavLink);

function OptimizedSidebar({ items, currentPath }) {
  const navLinks = useMemo(() => (
    items.map(item => (
      <MemoizedNavLink
        key={item.id}
        href={item.href}
        active={currentPath === item.href}
      >
        {item.label}
      </MemoizedNavLink>
    ))
  ), [items, currentPath]);

  return <Sidebar isOpen={true}>{navLinks}</Sidebar>;
}
```

### Code Splitting

```tsx
import { lazy, Suspense } from 'react';
import { Tabs } from '@spexop/react';
import { Spinner } from '@spexop/react';

const HeavyComponent1 = lazy(() => import('./HeavyComponent1'));
const HeavyComponent2 = lazy(() => import('./HeavyComponent2'));

const tabs = [
  {
    id: '1',
    label: 'Tab 1',
    content: (
      <Suspense fallback={<Spinner />}>
        <HeavyComponent1 />
      </Suspense>
    )
  },
  {
    id: '2',
    label: 'Tab 2',
    content: (
      <Suspense fallback={<Spinner />}>
        <HeavyComponent2 />
      </Suspense>
    )
  }
];

<Tabs tabs={tabs} />
```

## Browser Support

All navigation components support:

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- iOS Safari (latest 2 versions)
- Chrome Mobile (latest 2 versions)

## Related Resources

- [Spexop React Documentation](https://github.com/spexop-ui/spexop-react)
- [Spexop Icons Package](https://github.com/spexop-ui/spexop-icons)
- [Spexop Theme Package](https://github.com/spexop-ui/spexop-theme)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## Version History

- **v0.2.0** (2025-10-20): Fixed inline SVG violations, replaced with @spexop/icons
- **v0.1.0** (2025-10-13): Initial release of all 8 navigation components

## Contributing

Found an issue or want to contribute? Visit our [GitHub repository](https://github.com/spexop-ui/spexop-react) to report bugs, request features, or submit pull requests.

## License

MIT License - see LICENSE file for details.
