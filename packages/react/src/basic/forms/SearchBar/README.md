# SearchBar Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A specialized search input component with keyboard shortcut hint, clear button, and loading state. Optimized for search interfaces with debouncing and autocomplete support.

## Features

- ✅ Search icon indicator
- ✅ Keyboard shortcut hint (⌘K)
- ✅ Clear button
- ✅ Loading state
- ✅ Debounced search
- ✅ Auto-focus support
- ✅ WCAG AA+ accessible
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { SearchBar } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  
  return (
    <SearchBar
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onSearch={(value) => console.log('Search:', value)}
      placeholder="Search..."
    />
  );
}
```

## Basic Usage

### Simple Search

```tsx
<SearchBar
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onSearch={handleSearch}
  placeholder="Search products..."
/>
```

### With Keyboard Shortcut

```tsx
<SearchBar
  value={query}
  onChange={handleChange}
  onSearch={handleSearch}
  placeholder="Search..."
  showShortcut={true}
  shortcutKeys={["cmd", "k"]}
/>
```

### With Loading State

```tsx
<SearchBar
  value={query}
  onChange={handleChange}
  onSearch={handleSearch}
  loading={isSearching}
  placeholder="Search..."
/>
```

### With Clear Button

```tsx
<SearchBar
  value={query}
  onChange={handleChange}
  onSearch={handleSearch}
  onClear={() => setQuery('')}
  showClear={true}
/>
```

## Common Patterns

### Debounced Search

```tsx
import { SearchBar } from '@spexop/react';
import { useState, useEffect } from 'react';

function SearchWithDebounce() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <SearchBar
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onSearch={performSearch}
      placeholder="Search..."
      showShortcut={true}
    />
  );
}
```

### With Autocomplete

```tsx
function SearchWithAutocomplete() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 2) {
      const results = await fetchSuggestions(value);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-container">
      <SearchBar
        value={query}
        onChange={handleChange}
        onSearch={handleSearch}
        placeholder="Search..."
      />
      
      {showSuggestions && (
        <div className="suggestions">
          {suggestions.map(item => (
            <div
              key={item.id}
              onClick={() => {
                setQuery(item.title);
                setShowSuggestions(false);
                handleSearch(item.title);
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Header Search

```tsx
function HeaderSearch() {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="header-actions">
      {isExpanded ? (
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
          onClear={() => {
            setQuery('');
            setIsExpanded(false);
          }}
          autoFocus={true}
          showClear={true}
        />
      ) : (
        <IconButton
          icon={Search}
          label="Search"
          onClick={() => setIsExpanded(true)}
        />
      )}
    </div>
  );
}
```

### Global Search

```tsx
function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    try {
      const data = await searchAPI(searchQuery);
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" padding={8}>
      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={handleSearch}
        loading={loading}
        placeholder="Search everything..."
        showShortcut={true}
      />
      
      {results.length > 0 && (
        <div className="results">
          {results.map(result => (
            <Card key={result.id}>
              <h3>{result.title}</h3>
              <p>{result.excerpt}</p>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
```

### Filter Search

```tsx
function ProductSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  return (
    <Stack direction="horizontal" gap={4}>
      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={handleSearch}
        placeholder="Search products..."
        style={{ flex: 1 }}
      />
      
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </Select>
    </Stack>
  );
}
```

## Props

```typescript
interface SearchBarProps {
  /** Current search value */
  value: string;
  /** Change handler */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Search submit handler */
  onSearch: (value: string) => void;
  /** Clear handler */
  onClear?: () => void;
  /** Placeholder text */
  placeholder?: string;
  /** Loading state */
  loading?: boolean;
  /** Show clear button */
  showClear?: boolean;
  /** Show keyboard shortcut */
  showShortcut?: boolean;
  /** Custom shortcut keys */
  shortcutKeys?: string[];
  /** Auto-focus on mount */
  autoFocus?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Element ID */
  id?: string;
  /** ARIA label */
  "aria-label"?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean 2px border design
2. **Typography before decoration** - Clear placeholder text
3. **Tokens before magic numbers** - Uses design tokens
4. **Accessibility before aesthetics** - Full keyboard support

## Accessibility

- ✅ Semantic HTML with search role
- ✅ Proper label/placeholder
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus indicators
- ✅ Loading state announced
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `⌘K` (Mac) / `Ctrl+K` (Windows) - Focus search (global)
- `Enter` - Submit search
- `Escape` - Clear and unfocus
- `Tab` - Move to next element

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `TextInput` - Generic text input
- `CommandPalette` - Quick actions search
- `SearchModal` - Full-screen search
- `Select` - Dropdown filters

## Best Practices

1. **Debounce input** - Prevent excessive API calls
2. **Show loading state** - Provide feedback during search
3. **Include clear button** - Easy way to reset
4. **Use placeholder wisely** - Guide users on what to search
5. **Handle empty states** - Show message when no results

## License

MIT
