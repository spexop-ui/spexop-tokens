# Pagination Component - Usage Guide

## Common Patterns

### Basic Pagination

```tsx
import { Pagination } from '@spexop/react';
import { useState } from 'react';

function DataList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div>
      {/* Your paginated content */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

### With Data Fetching

```tsx
import { Pagination } from '@spexop/react';
import { useState, useEffect } from 'react';

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

### With URL Synchronization

```tsx
import { Pagination } from '@spexop/react';
import { useSearchParams } from 'react-router-dom';

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

### Custom Sibling Count

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

### Different Configurations

```tsx
// Minimal - numbers only
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={handleChange}
  showFirstLast={false}
  showPrevNext={false}
/>

// Without first/last buttons
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={handleChange}
  showFirstLast={false}
/>

// Without prev/next buttons
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={handleChange}
  showPrevNext={false}
/>
```

### Custom Labels

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

### Different Sizes

```tsx
// Small - for compact layouts
<Pagination 
  currentPage={1} 
  totalPages={10} 
  onPageChange={handleChange} 
  size="sm" 
/>

// Medium - default
<Pagination 
  currentPage={1} 
  totalPages={10} 
  onPageChange={handleChange} 
  size="md" 
/>

// Large - for emphasis
<Pagination 
  currentPage={1} 
  totalPages={10} 
  onPageChange={handleChange} 
  size="lg" 
/>
```

### With Loading State

```tsx
import { Pagination, Spinner } from '@spexop/react';
import { useState } from 'react';

function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (page) => {
    setLoading(true);
    await fetchData(page);
    setCurrentPage(page);
    setLoading(false);
  };

  return (
    <div>
      {loading ? <Spinner /> : <DataContent />}
      
      <Pagination
        currentPage={currentPage}
        totalPages={20}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
```

## Design Tokens Used

```css
/* Spacing */
gap: var(--theme-spacing-2)
padding: var(--theme-spacing-2) var(--theme-spacing-3)

/* Colors */
background: var(--theme-surface)
border: var(--theme-border-width) solid var(--theme-border)
color: var(--theme-text)

/* Active/Current */
background: var(--theme-primary)
color: var(--theme-surface)
```

## Accessibility

### ARIA Navigation

```html
<nav aria-label="Pagination">
  <button aria-label="Go to first page">First</button>
  <button aria-label="Go to previous page">Previous</button>
  <button aria-label="Go to page 1">1</button>
  <button aria-label="Go to page 2" aria-current="page">2</button>
  <button aria-label="Go to page 3">3</button>
  <button aria-label="Go to next page">Next</button>
  <button aria-label="Go to last page">Last</button>
</nav>
```

### Keyboard Navigation

- Tab to navigate through page buttons
- Enter/Space to activate button
- All buttons are keyboard accessible
- Disabled buttons skip focus

### Screen Reader Announcements

Current page is announced with `aria-current="page"`:

```tsx
// Screen reader announces: "Page 2, button, current page"
```

## Best Practices

### Do's

- Always use 1-indexed page numbers (not 0-indexed)
- Show appropriate sibling count for your use case
- Add aria-label for navigation
- Handle page change asynchronously
- Show loading state during fetch
- Update URL with page number

### Don'ts

- Don't use 0-indexed pages (users expect 1-based)
- Don't show pagination for single page
- Don't forget to handle edge cases (page 1, last page)
- Don't allow invalid page numbers

## Common Calculations

### Total Pages from Item Count

```tsx
const itemsPerPage = 20;
const totalItems = 247;
const totalPages = Math.ceil(totalItems / itemsPerPage); // 13
```

### Item Range for Current Page

```tsx
const currentPage = 3;
const itemsPerPage = 20;
const startIndex = (currentPage - 1) * itemsPerPage; // 40
const endIndex = startIndex + itemsPerPage; // 60

// Items 41-60 (in 1-indexed display)
```

### Calculate Current Items

```tsx
function PaginatedList({ items }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  
  return (
    <>
      <div>
        {currentItems.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
```

## Performance

### Client-Side Pagination

```tsx
// Good for small datasets (<1000 items)
const allItems = [...]; // All items
const currentItems = allItems.slice(startIndex, endIndex);
```

### Server-Side Pagination

```tsx
// Good for large datasets (>1000 items)
useEffect(() => {
  fetch(`/api/items?page=${currentPage}&limit=20`)
    .then(res => res.json())
    .then(data => setItems(data.items));
}, [currentPage]);
```

## Related

- Table - For data tables with pagination
- DataTable - Advanced table with built-in pagination
- Spinner - Loading indicators
