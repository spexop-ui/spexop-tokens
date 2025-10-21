# Pagination

**Status**: ✅ Production Ready | **Version**: 0.2.0

An accessible pagination component for navigating through pages.

> For comprehensive documentation, examples, and advanced patterns, see the [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md#pagination-component)

## Features

- Keyboard accessible navigation
- Screen reader accessible with ARIA
- Multiple size variants
- Configurable number of visible pages
- First/Last page buttons
- Previous/Next page buttons
- Ellipsis for truncated pages
- Customizable labels
- Smart page range calculation
- WCAG AA+ compliant

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { useState } from "react";
import { Pagination, type PaginationProps } from "@spexop/react";

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10;

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    // Fetch data for the new page
  };

  return (
    <Pagination 
      currentPage={currentPage} 
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
```

## Sizes

```tsx
{/* Small */}
<Pagination currentPage={1} totalPages={10} onPageChange={handleChange} size="sm" />

{/* Medium (default) */}
<Pagination currentPage={1} totalPages={10} onPageChange={handleChange} size="md" />

{/* Large */}
<Pagination currentPage={1} totalPages={10} onPageChange={handleChange} size="lg" />
```

## Sibling Count

```tsx
{/* Show 1 sibling on each side (default) */}
<Pagination currentPage={5} totalPages={20} onPageChange={handleChange} siblingCount={1} />

{/* Show 2 siblings on each side */}
<Pagination currentPage={5} totalPages={20} onPageChange={handleChange} siblingCount={2} />
```

## Without First/Last Buttons

```tsx
<Pagination 
  currentPage={currentPage} 
  totalPages={10}
  onPageChange={handleChange}
  showFirstLast={false}
/>
```

## Without Previous/Next Buttons

```tsx
<Pagination 
  currentPage={currentPage} 
  totalPages={10}
  onPageChange={handleChange}
  showPrevNext={false}
/>
```

## Numbers Only

```tsx
<Pagination 
  currentPage={currentPage} 
  totalPages={10}
  onPageChange={handleChange}
  showFirstLast={false}
  showPrevNext={false}
/>
```

## Custom Labels

```tsx
<Pagination 
  currentPage={currentPage} 
  totalPages={10}
  onPageChange={handleChange}
  labels={{
    first: "Start",
    previous: "Prev",
    next: "Next",
    last: "End",
    page: (page) => `Go to page ${page}`,
  }}
/>
```

## With Data Fetching

```tsx
import { useState, useEffect } from "react";

function DataList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData(currentPage, itemsPerPage).then((response) => {
      setData(response.items);
      setTotalPages(Math.ceil(response.total / itemsPerPage));
    });
  }, [currentPage]);

  return (
    <div>
      <DataTable data={data} />
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | required | Current page (1-indexed) |
| `totalPages` | `number` | required | Total number of pages |
| `onPageChange` | `(page: number) => void` | required | Page change callback |
| `siblingCount` | `number` | `1` | Number of siblings shown |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `showFirstLast` | `boolean` | `true` | Show first/last buttons |
| `showPrevNext` | `boolean` | `true` | Show prev/next buttons |
| `showPageNumbers` | `boolean` | `true` | Show page numbers |
| `className` | `string` | - | Additional CSS class |
| `labels` | `object` | - | Custom labels |

### Labels Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `first` | `string` | `"First"` | First button label |
| `previous` | `string` | `"Previous"` | Previous button label |
| `next` | `string` | `"Next"` | Next button label |
| `last` | `string` | `"Last"` | Last button label |
| `page` | `(page: number) => string` | `"Page {n}"` | Page aria-label |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Strong borders for clear definition
- **Principle 3: Typography before decoration** - Bold font weight for active page
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with full keyboard support

## Accessibility

- Uses semantic `<nav>` element with `role="navigation"`
- Proper ARIA labels for all buttons
- `aria-current="page"` for current page
- Keyboard navigable buttons
- Focus visible indicators
- Disabled state for inactive buttons
- Screen reader friendly
- High contrast colors

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Tab** | Navigate through pagination buttons |
| **Shift + Tab** | Navigate backwards through buttons |
| **Enter** | Activate focused button |
| **Space** | Activate focused button |

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import { Pagination, type PaginationProps } from "@spexop/react";

interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

function DataPagination() {
  const [state, setState] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 20
  });

  const paginationProps: PaginationProps = {
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    onPageChange: (page) => setState(prev => ({ ...prev, currentPage: page })),
    siblingCount: 2,
    size: "md"
  };

  return <Pagination {...paginationProps} />;
}
```

## Advanced Patterns

### With URL Synchronization

```tsx
import { useSearchParams } from 'react-router-dom';
import { Pagination } from "@spexop/react";

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={20}
      onPageChange={handlePageChange}
    />
  );
}
```

### Server-Side Pagination

```tsx
import { useQuery } from '@tanstack/react-query';
import { Pagination } from "@spexop/react";

function ServerPaginatedList() {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['items', page, limit],
    queryFn: () => fetchItems({ page, limit })
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <ItemList items={data.items} />
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(data.total / limit)}
        onPageChange={setPage}
        siblingCount={2}
      />
    </>
  );
}
```

### With Analytics

```tsx
function TrackedPagination() {
  const handlePageChange = (page: number) => {
    // Track page navigation
    analytics.track('page_navigation', {
      from: currentPage,
      to: page,
      timestamp: Date.now()
    });
    
    setCurrentPage(page);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
```

## Performance

- Lightweight: ~3KB gzipped
- Smart page range calculation (O(1) complexity)
- No unnecessary re-renders
- Icon components from @spexop/icons are shared
- Optimized ellipsis rendering

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- [Breadcrumb](../Breadcrumb/README.md) - For navigation hierarchy
- [Tabs](../Tabs/README.md) - For content sections
- [NavLink](../NavLink/README.md) - For navigation links
- [Complete Navigation System](../USAGE-GUIDE.md#complete-navigation-system) - Full navigation setup

## Further Reading

- [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md) - Comprehensive guide with routing integration, migration guides, and advanced patterns
- [Accessibility Guidelines](../USAGE-GUIDE.md#accessibility) - WCAG compliance details
- [Best Practices](../USAGE-GUIDE.md#best-practices) - Mobile patterns and performance optimization
