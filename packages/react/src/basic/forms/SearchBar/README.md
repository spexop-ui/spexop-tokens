# SearchBar

Search input component with icon, keyboard shortcuts, and clear button. Built for command palettes, navigation search, and content filtering.

## Installation

```bash
npm install @spexop/react @spexop/icons
```

## Import

```typescript
import { SearchBar } from '@spexop/react';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { SearchBar } from '@spexop/react';

function MyComponent() {
  const [query, setQuery] = useState('');
  
  const handleSearch = (searchQuery: string) => {
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <SearchBar
      value={query}
      onChange={setQuery}
      onSearch={handleSearch}
      placeholder="Search..."
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `"Search..."` | Placeholder text |
| `onSearch` | `(query: string) => void` | `undefined` | Search callback (on submit) |
| `onClick` | `() => void` | `undefined` | Click callback (for opening modal/palette) |
| `onChange` | `(query: string) => void` | `undefined` | Real-time change callback |
| `value` | `string` | `undefined` | Current search value (controlled) |
| `variant` | `"compact"` \| `"full"` | `"full"` | Visual variant |
| `showShortcut` | `boolean` | `false` | Show keyboard shortcut hint |
| `shortcut` | `string` | auto-detected | Custom keyboard shortcut text |
| `readOnly` | `boolean` | `false` | Make input read-only (for triggers) |
| `className` | `string` | `""` | Additional CSS class |

## Examples

### Basic Search

```tsx
<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  onSearch={handleSearch}
  placeholder="Search documentation..."
/>
```

### With Keyboard Shortcut

Shows Cmd+K (Mac) or Ctrl+K (Windows/Linux):

```tsx
<SearchBar
  onClick={openCommandPalette}
  showShortcut={true}
  placeholder="Search..."
  readOnly
/>
```

### Custom Shortcut

```tsx
<SearchBar
  onClick={openSearch}
  showShortcut={true}
  shortcut="/"
  placeholder="Press / to search"
  readOnly
/>
```

### Compact Variant

Smaller version for toolbars:

```tsx
<SearchBar
  value={query}
  onChange={setQuery}
  variant="compact"
  placeholder="Search"
/>
```

### Real-time Search

```tsx
function LiveSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const handleChange = (value: string) => {
    setQuery(value);
    // Trigger search immediately
    const filtered = data.filter(item => 
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };
  
  return (
    <div>
      <SearchBar
        value={query}
        onChange={handleChange}
        placeholder="Search items..."
      />
      <ul>
        {results.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
```

### Command Palette Trigger

```tsx
function AppLayout() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  
  return (
    <>
      <SearchBar
        onClick={() => setPaletteOpen(true)}
        showShortcut={true}
        placeholder="Search or jump to..."
        readOnly
      />
      
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
      />
    </>
  );
}
```

### In TopBar

```tsx
import { TopBar } from '@spexop/react';

function Header() {
  const handleSearchClick = () => {
    // Open search modal or palette
  };
  
  return (
    <TopBar
      logoText="My App"
      onSearchClick={handleSearchClick}
    />
  );
}
```

### With Debounced Search

```tsx
import { debounce } from '@spexop/utils';
import { useMemo } from 'react';

function DebouncedSearch() {
  const [query, setQuery] = useState('');
  
  const debouncedSearch = useMemo(
    () => debounce((value: string) => {
      // API call or expensive search
      fetchResults(value);
    }, 300),
    []
  );
  
  const handleChange = (value: string) => {
    setQuery(value);
    debouncedSearch(value);
  };
  
  return (
    <SearchBar
      value={query}
      onChange={handleChange}
      placeholder="Search..."
    />
  );
}
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Cmd/Ctrl + K** | Focus search (when showShortcut={true}) |
| **/** | Focus search (alternative shortcut) |
| **Escape** | Clear search and blur |
| **Enter** | Submit search (calls onSearch) |

## Accessibility

### ARIA Attributes

- `type="search"` - Identifies search input
- `role="searchbox"` - Search landmark
- `aria-label` - Describes input purpose
- `autocomplete="off"` - Prevents browser autocomplete

### Focus Management

- ✅ Focus visible on keyboard navigation
- ✅ Clear button appears when text entered
- ✅ Escape clears and blurs input
- ✅ Keyboard shortcut shown visually

### Screen Readers

- Announces as "search" input
- Announces placeholder text
- Announces keyboard shortcuts
- Announces when value changes

## Styling

### Custom Styling

```tsx
<SearchBar
  className="my-search"
  value={query}
  onChange={setQuery}
/>
```

```css
.my-search {
  max-width: 500px;
}
```

### Design Tokens

Uses tokens for theming:

- Colors: `--s-color-neutral-*`
- Spacing: `--s-spacing-*`
- Border radius: `--s-radius-md`
- Transitions: `--s-transition-fast`

## Integration Patterns

### With SearchModal

```tsx
import { SearchBar, SearchModal } from '@spexop/react';

function Search() {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <>
      <SearchBar
        onClick={() => setModalOpen(true)}
        showShortcut={true}
        placeholder="Search docs..."
        readOnly
      />
      
      <SearchModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        results={searchResults}
      />
    </>
  );
}
```

### With SearchOverlay

```tsx
import { SearchBar, SearchOverlay } from '@spexop/react';

function SearchFeature() {
  const [query, setQuery] = useState('');
  const [overlayOpen, setOverlayOpen] = useState(false);
  
  return (
    <>
      <SearchBar
        value={query}
        onChange={(val) => {
          setQuery(val);
          setOverlayOpen(val.length > 0);
        }}
        placeholder="Search..."
      />
      
      {overlayOpen && (
        <SearchOverlay
          query={query}
          content={searchableContent}
          onSelect={handleSelect}
          onClose={() => setOverlayOpen(false)}
        />
      )}
    </>
  );
}
```

## When to Use

### Use SearchBar When ✅

- Simple search functionality
- Trigger for search modal/palette
- Real-time filtering
- Navigation search
- Documentation search

### Use SearchModal Instead When

- Full-screen search needed
- Advanced search with filters
- Keyboard-first experience
- Results need rich display

### Use CommandPalette Instead When

- Action-based interface
- Keyboard shortcuts important
- Command execution needed
- Developer tools

## Best Practices

### Do ✅

```tsx
// Use onChange for real-time search
<SearchBar onChange={handleRealTimeSearch} />

// Use onSearch for submit-based search
<SearchBar onSearch={handleSubmitSearch} />

// Show keyboard shortcut for discoverability
<SearchBar showShortcut={true} readOnly onClick={openModal} />

// Use compact variant in toolbars
<SearchBar variant="compact" />

// Debounce expensive searches
const debouncedSearch = debounce(search, 300);
```

### Don't ❌

```tsx
// Don't skip placeholder
<SearchBar /> // Unclear purpose

// Don't use without onChange or onClick
<SearchBar value={query} /> // No way to interact

// Don't use for complex filters
<SearchBar /> // Use dedicated filter UI instead

// Don't skip debouncing for API calls
<SearchBar onChange={callAPI} /> // Will hammer API
```

## Common Patterns

### Algolia/Elasticsearch Search

```tsx
import { SearchBar } from '@spexop/react';
import { debounce } from '@spexop/utils';

function AlgoliaSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const search = debounce(async (q: string) => {
    const response = await algoliaClient.search(q);
    setResults(response.hits);
  }, 300);
  
  return (
    <>
      <SearchBar
        value={query}
        onChange={(val) => {
          setQuery(val);
          if (val.length > 2) search(val);
        }}
        placeholder="Search..."
      />
      {/* Results display */}
    </>
  );
}
```

## Related Components

- **SearchModal** - Full search interface
- **SearchOverlay** - Overlay with search results
- **CommandPalette** - Command/action palette
- **TextInput** - Basic text input
- **TopBar** - Header with built-in search

## Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

## Performance

- Lightweight (~500 bytes JS)
- CSS-only styling
- No re-renders on focus
- Efficient event handlers

---

**Part of Form Components** - Essential form controls with validation and accessibility built-in.
