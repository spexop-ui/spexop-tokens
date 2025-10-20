# SearchModal Component

A centered modal-style search with quick links and categorized results, following Spexop's Refined Minimalism design principles.

## Features

- **Centered Modal**: Spotlight-style search in center of screen
- **Close Button**: Easy-to-tap close button on all devices
- **Quick Links**: Shows quick access links in empty state
- **Recent Searches**: Optional recent search suggestions
- **Categorized Results**: Groups results by category
- **Fuzzy Search**: Searches titles, descriptions, categories, and keywords
- **Keyboard Navigation**: Full keyboard support on desktop (↑↓ to navigate, Enter to select, ESC to close)
- **Responsive Design**: Mobile-first with optimized touch targets
- **Accessibility**: Full ARIA support, focus trap, screen reader friendly

## Props

```tsx
interface SearchModalProps {
  isOpen: boolean;                  // Whether the modal is open
  onClose: () => void;              // Callback when modal should close
  results: SearchResult[];          // All searchable results
  quickLinks?: QuickLink[];         // Quick links for empty state
  recentSearches?: string[];        // Recent search queries
  placeholder?: string;             // Search input placeholder
  className?: string;               // Additional CSS class
}

interface SearchResult {
  id: string;                       // Unique identifier
  title: string;                    // Result title
  description: string;              // Result description
  url: string;                      // URL to navigate to
  category: string;                 // Category for grouping
  icon?: ReactNode;                 // Optional icon
  badge?: string;                   // Optional badge text
  value?: string;                   // Optional value to display (for tokens)
  keywords?: string[];              // Keywords for search matching
}

interface QuickLink {
  label: string;                    // Link label
  url: string;                      // Link URL
  icon?: ReactNode;                 // Optional icon
}
```

## Usage

### Basic Usage

```tsx
import { SearchModal } from '@spexop/react';
import { Home, FileText, Code } from '@spexop/icons';

const [isSearchOpen, setIsSearchOpen] = useState(false);

const searchResults = [
  {
    id: 'home',
    title: 'Home',
    description: 'Main homepage with overview',
    url: '/',
    category: 'Pages',
  },
  {
    id: 'about',
    title: 'About',
    description: 'Learn about Spexop-UI',
    url: '/about',
    category: 'Pages',
  },
];

const quickLinks = [
  { label: 'Home', url: '/', icon: <Home size={28} /> },
  { label: 'Docs', url: '/docs', icon: <FileText size={28} /> },
  { label: 'Components', url: '/components', icon: <Code size={28} /> },
];

<SearchModal
  isOpen={isSearchOpen}
  onClose={() => setIsSearchOpen(false)}
  results={searchResults}
  quickLinks={quickLinks}
  placeholder="Search pages and content..."
/>
```

### With Keyboard Shortcut

```tsx
import { useEffect, useState } from 'react';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cmd/Ctrl + K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button onClick={() => setIsSearchOpen(true)}>
        Search
      </button>
      
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        results={searchResults}
      />
    </>
  );
}
```

### With Recent Searches

```tsx
const [recentSearches, setRecentSearches] = useState([
  'button variant',
  'sColorRed500',
  'grid layout',
]);

<SearchModal
  isOpen={isSearchOpen}
  onClose={() => setIsSearchOpen(false)}
  results={searchResults}
  recentSearches={recentSearches}
/>
```

## States

### Empty State

Shows quick links and recent searches when no search query is entered.

### Search Results

Shows categorized results with staggered animations as you type.

### No Results

Shows helpful message and quick links when no results match the query.

## Keyboard Shortcuts

Desktop only (keyboard shortcuts footer is hidden on mobile/tablet):

- **Cmd/Ctrl + K**: Open search (implement in parent component)
- **ESC**: Close modal
- **↑/↓**: Navigate through results
- **Enter**: Select highlighted result
- **Type**: Filter results in real-time

Mobile/Tablet:

- **Tap Close Button (X)**: Close modal
- **Tap Backdrop**: Close modal
- **Type**: Filter results in real-time
- **Tap Result**: Select result

## Responsive Behavior

### Mobile (< 768px)

- **Full-screen modal**: Edge-to-edge display
- **Bottom sheet animation**: Slides up from bottom with smooth transition
- **Dynamic viewport height**: Uses `100dvh` for proper height on mobile browsers with dynamic toolbars (falls back to `100vh`)
- **Safe area insets**: Respects iPhone notch/island and home indicator
- **Close button**: Large 40px × 40px close button (X icon) for easy tapping
- **Touch-optimized**:
  - 2-column quick links
  - 88px minimum touch targets for quick links
  - 64px minimum touch targets for results
  - 52px minimum touch targets for guide links
  - Larger icons (32px for quick links, 24px for results)
- **Mobile-friendly input**: 16px font size (prevents iOS zoom)
- **No keyboard hint**: Hides `⌘K` hint on mobile devices (not relevant for touch)
- **No keyboard shortcuts footer**: Footer hidden on mobile (not relevant for touch)
- **No border radius**: Full-screen with only top border
- **Optimized padding**: Adjusted spacing for mobile comfort

### Tablet (768-1023px)

- 85% width modal (max 600px)
- Centered on screen
- 3-column quick links
- Comfortable spacing
- Close button (32px × 32px) for touch support
- No keyboard shortcuts footer (hidden on tablet)
- Hybrid touch/keyboard support

### Desktop (≥ 1024px)

- 640px max-width
- Centered modal with backdrop
- 5-column quick links
- Scale animation on open
- Compact spacing
- Close button (32px × 32px) for convenience
- Keyboard shortcut hint visible (`⌘K`)
- Keyboard shortcuts footer visible (↑↓, ↵, ESC)

## Accessibility

- **ARIA**: Full `role="dialog"` and `aria-modal` support
- **Focus Trap**: Focus stays within modal when open
- **Focus Restore**: Returns focus to previous element on close
- **Keyboard Navigation**: Complete keyboard support
- **Screen Readers**: Proper labels and descriptions
- **Body Scroll Lock**: Prevents background scrolling

## Styling

All styles use design tokens:

- **Borders**: 2px borders (borders before shadows)
- **Typography**: Bold hierarchy (typography before decoration)
- **Colors**: High contrast (WCAG AAA)
- **Spacing**: Token-based (tokens before magic numbers)
- **Animations**: Purposeful only (reduced motion support)

## Mobile Technical Details

The SearchModal has been specifically optimized for mobile devices:

### Viewport Configuration

The main `index.html` should include `viewport-fit=cover` for proper safe area support:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

### Dynamic Viewport Height

On mobile, the component uses `100dvh` (dynamic viewport height) which adjusts for browser toolbars that appear/disappear on scroll:

```css
/* Fallback for older browsers */
height: 100vh;
max-height: 100vh;
/* Modern browsers with dynamic toolbar support */
height: 100dvh;
max-height: 100dvh;
```

### Safe Area Insets

Supports iPhone notches, Dynamic Island, and home indicators:

```css
/* Top padding respects notch/Dynamic Island */
padding: max(var(--s-spacing-5), env(safe-area-inset-top)) var(--s-spacing-5) var(--s-spacing-5);

/* Bottom padding respects home indicator */
padding: var(--s-spacing-4) var(--s-spacing-4) max(var(--s-spacing-4), env(safe-area-inset-bottom));
```

### Transform Fix

Uses `translate(0, 100%)` instead of `translateY(100%)` to maintain consistency:

```css
/* Initial state - off screen */
transform: translate(0, 100%);

/* Animation to visible state */
@keyframes slideUp {
  to {
    transform: translate(0, 0);
  }
}
```

## Best Practices

**Do** ✅:

- Provide searchable results with good descriptions
- Include quick links for common pages
- Track and show recent searches
- Use appropriate categories
- Test keyboard navigation
- Test on mobile devices (especially iOS Safari)
- Test with Dynamic Island and home indicator
- Test landscape and portrait orientations

**Don't** ❌:

- Don't show too many quick links (5 max on desktop, 4 max on mobile)
- Don't skip categories for better organization
- Don't forget to handle navigation in onSelect
- Don't ignore mobile optimization
- Don't forget to add `viewport-fit=cover` meta tag
- Don't use fixed pixel values for safe areas

## Examples

### Complete Integration

```tsx
import { SearchModal, type SearchResult } from '@spexop/react';
import { Home, FileText, Code } from '@spexop/icons';
import { useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchResults: SearchResult[] = [
    {
      id: 'home',
      title: 'Home',
      description: 'Main homepage with overview',
      url: '/',
      category: 'Pages',
      icon: <Home size={20} />,
    },
    // ... more results
  ];

  const quickLinks = [
    { label: 'Home', url: '/', icon: <Home size={28} /> },
    { label: 'About', url: '/about', icon: <FileText size={28} /> },
    { label: 'Contact', url: '/contact', icon: <Code size={28} /> },
  ];

  return (
    <>
      {/* Your layout */}
      
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        results={searchResults.map(r => ({
          ...r,
          onSelect: () => navigate(r.url),
        }))}
        quickLinks={quickLinks}
      />
    </>
  );
}
```
