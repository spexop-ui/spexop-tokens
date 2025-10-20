# ScrollHeader Component

## Overview

The `ScrollHeader` component is a scroll-activated page navigation header that appears with a smooth animation when users scroll past a defined threshold. It provides quick navigation to different sections of long-form content pages, improving user experience and content discoverability.

## Design Philosophy

- **Aligned with Sidebar**: Uses the same liquid glass aesthetic and design tokens as the Sidebar component
- **Performance-Optimized**: Passive scroll listeners and efficient rendering
- **Fully Responsive**: Adapts seamlessly from mobile to desktop
- **Accessible**: WCAG 2.1 compliant with keyboard navigation and screen reader support
- **Theme-Aware**: Automatically adapts to light/dark themes

## Component Structure

```bash
ScrollHeader/
├── ScrollHeader.tsx           # Main component with scroll logic
├── ScrollHeader.module.css    # CSS Modules styling
├── ScrollHeader.types.ts      # TypeScript type definitions
└── index.ts                   # Public exports
```

## Features

### 1. Scroll Detection

- Monitors scroll position with passive listeners
- Configurable scroll threshold (default: 200px)
- Smooth slide-down animation when threshold is exceeded
- Smooth slide-up animation when scrolling back up

### 2. Section Navigation

- Displays multiple page sections with icons and labels
- Auto-highlights active section based on scroll position
- Smooth scroll to section on click
- Keyboard accessible navigation

### 3. Visual Design

- Liquid glass backdrop blur effect
- Floating shadow for depth
- Theme-aware colors (light/dark)
- Hover and active states with visual feedback
- Active section indicator with accent color underline

### 4. Responsive Behavior

- **Mobile** (< 768px): Icon-only navigation (labels hidden except active)
- **Tablet** (768px - 1023px): Compact layout with smaller spacing
- **Desktop** (≥ 1024px): Full layout with icons and labels

## Usage

### Basic Example

```tsx
import { ScrollHeader, type ScrollSection } from '@spexop/react';
import { Home, Code, Settings } from '@spexop/icons';

const sections: ScrollSection[] = [
  { id: 'intro', label: 'Introduction', icon: Home, href: '#intro' },
  { id: 'features', label: 'Features', icon: Code, href: '#features' },
  { id: 'config', label: 'Configuration', icon: Settings, href: '#config' },
];

function MyPage() {
  const [activeSection, setActiveSection] = useState('intro');

  return (
    <>
      <ScrollHeader
        sections={sections}
        scrollThreshold={300}
        activeSection={activeSection}
        onSectionClick={(sectionId) => setActiveSection(sectionId)}
      />
      
      {/* Page content */}
      <section id="intro">...</section>
      <section id="features">...</section>
      <section id="config">...</section>
    </>
  );
}
```

### With Logo and Actions

```tsx
<ScrollHeader
  sections={sections}
  scrollThreshold={250}
  activeSection={activeSection}
  logo={<img src="/logo.svg" alt="Logo" />}
  actions={
    <>
      <IconButton icon={SearchIcon} onClick={onSearch} />
      <Button variant="primary" size="sm">Get Started</Button>
    </>
  }
/>
```

### Auto-Detecting Active Section

```tsx
function MyPage() {
  const [activeSection, setActiveSection] = useState('intro');
  
  const sections: ScrollSection[] = [
    { id: 'intro', label: 'Introduction', icon: Home, href: '#intro' },
    { id: 'features', label: 'Features', icon: Code, href: '#features' },
  ];

  // Auto-detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => {
        const element = document.querySelector(section.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          return { id: section.id, top: rect.top, bottom: rect.bottom };
        }
        return null;
      }).filter(Boolean);

      // Find section in viewport
      const current = sectionElements.find((section) => {
        if (!section) return false;
        return section.top <= 100 && section.bottom > 100;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollHeader
      sections={sections}
      activeSection={activeSection}
      onSectionClick={setActiveSection}
    />
  );
}
```

## API Reference

### ScrollHeaderProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sections` | `ScrollSection[]` | **Required** | Array of page sections to display |
| `scrollThreshold` | `number` | `200` | Scroll position (px) before header appears |
| `activeSection` | `string` | `undefined` | ID of currently active section |
| `onSectionClick` | `(sectionId: string) => void` | `undefined` | Callback when section is clicked |
| `logo` | `React.ReactNode` | `undefined` | Optional logo/brand element |
| `actions` | `React.ReactNode` | `undefined` | Optional action buttons (right side) |
| `className` | `string` | `undefined` | Additional CSS class |
| `ariaLabel` | `string` | `"Page navigation header"` | ARIA label for accessibility |

### ScrollSection

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the section |
| `label` | `string` | ✅ | Display label for the section |
| `icon` | `React.ComponentType` | ❌ | Optional icon from @spexop/icons |
| `href` | `string` | ✅ | URL or hash link to section |

## Design Tokens Used

### Colors

- `--s-color-glass-light-2-0` / `--s-color-glass-dark-2-0` - Background
- `--s-color-glass-border-light` / `--s-color-glass-border-dark` - Border
- `--s-color-neutral-700` / `--s-color-neutral-200` - Text
- `--s-color-blue-100` / `--s-color-red-900` - Active background
- `--s-color-blue-700` / `--s-color-red-200` - Active text
- `--s-color-blue-500` / `--s-color-red-500` - Active indicator

### Spacing

- `--s-spacing-2` through `--s-spacing-8` - Internal spacing
- `--s-spacing-6` - Container padding

### Typography

- `--s-font-family-base` - Font family
- `--s-font-size-sm` - Link text size
- `--s-font-weight-medium` / `--s-font-weight-semibold` - Font weights
- `--s-line-height-tight` - Line height

### Effects

- `--s-blur-md` - Backdrop blur
- `--s-shadow-float` - Box shadow
- `--s-radius-base` - Border radius

### Transitions

- `--s-duration-fast` / `--s-duration-normal` - Animation duration
- `--s-ease-smooth` - Easing function

### Z-Index

- `--s-z-index-sticky` (400) - Stacking context

## Accessibility

### WCAG 2.1 Compliance

- **Keyboard Navigation**: All sections are focusable and keyboard-accessible
- **Focus Indicators**: Clear focus-visible styles for keyboard users
- **Screen Readers**: Proper ARIA labels and landmarks
- **Motion Sensitivity**: Respects `prefers-reduced-motion`
- **High Contrast**: Enhanced borders in high contrast mode

### ARIA Attributes

- `role="banner"` - Identifies header landmark
- `aria-label` - Describes the header purpose
- `aria-hidden` - Hides when not visible
- `aria-current="page"` - Marks active section
- `aria-label` on navigation - Describes navigation purpose

### Keyboard Support

- **Tab** / **Shift+Tab** - Navigate between sections
- **Enter** / **Space** - Activate section link
- **Escape** - (If needed for dismissal)

## Styling Customization

### CSS Custom Properties

You can override the default styling by targeting the component with CSS custom properties:

```css
.myCustomHeader {
  --scroll-header-height: 72px;
  --scroll-header-blur: 16px;
  --scroll-header-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
```

### Class Names

The component exposes these CSS classes for customization:

- `.scrollHeader` - Root container
- `.visible` - Applied when visible (scrolled)
- `.container` - Inner container
- `.navigation` - Navigation wrapper
- `.sectionList` - Section list (ul)
- `.sectionItem` - Individual section (li)
- `.sectionLink` - Section button
- `.active` - Active section
- `.sectionIcon` - Icon element
- `.sectionLabel` - Label text

## Integration with HomePage

The ScrollHeader is integrated into the HomePage to provide navigation for long content:

```tsx
// Define page sections
const pageSections: ScrollSection[] = [
  { id: 'hero', label: 'Home', icon: Home, href: '#hero' },
  { id: 'overview', label: 'Overview', icon: Layers, href: '#overview' },
  { id: 'tokens', label: 'Tokens', icon: Palette, href: '#tokens-card' },
  { id: 'colors', label: 'Colors', icon: Code, href: '#colors-card' },
  { id: 'motion', label: 'Motion', icon: Heart, href: '#motion-card' },
  { id: 'components', label: 'Components', icon: Info, href: '#components-card' },
];

// Add IDs to page sections
<section id="hero">...</section>
<section id="overview">...</section>
<Card id="tokens-card">...</Card>
```

## Performance Considerations

### Optimizations

1. **Passive Scroll Listeners** - Non-blocking scroll detection
2. **CSS Transitions** - Hardware-accelerated animations
3. **Conditional Rendering** - Hidden state uses `pointer-events: none`
4. **Debouncing** - Consider debouncing scroll handler for complex pages

### Best Practices

- Keep sections array stable (memoize or define outside component)
- Use hash links (#section-id) for instant navigation
- Limit number of sections to 6-8 for optimal UX
- Test performance on low-end devices

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Chrome Android 90+

### Fallbacks

- Backdrop blur gracefully degrades in unsupported browsers
- Smooth scroll falls back to instant scroll
- Transitions disabled when `prefers-reduced-motion: reduce`

## Related Components

- **Sidebar** - Main navigation sidebar (shares design aesthetic)
- **AppBar** - Mobile-only top navigation bar
- **NavItem** - Individual navigation item component
- **IconButton** - Used for action buttons

## Migration Guide

If migrating from a custom scroll header, follow these steps:

1. **Install Dependencies**: Ensure `@spexop/react` and `@spexop/icons` are installed
2. **Define Sections**: Convert your navigation items to `ScrollSection[]` format
3. **Add IDs**: Add `id` attributes to your page sections
4. **Replace Component**: Replace custom header with `<ScrollHeader />`
5. **Handle Active State**: Implement scroll detection or pass `activeSection` prop
6. **Test Responsiveness**: Verify behavior on mobile, tablet, and desktop
7. **Accessibility Audit**: Test keyboard navigation and screen reader support

## Examples

See the HomePage implementation for a complete, real-world example:

- File: `apps/website/src/pages/HomePage.tsx`
- Lines: 115-122 (ScrollHeader usage)
- Lines: 32-39 (Section definitions)
- Lines: 57-88 (Active section detection)
