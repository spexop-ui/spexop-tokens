# DataTable Usage Guide

Complete guide for using the DataTable component from @spexop/react

## Table of Contents

- [Quick Start](#quick-start)
- [Column Definitions](#column-definitions)
- [Sorting](#sorting)
- [Filtering](#filtering)
- [Pagination](#pagination)
- [Row Selection](#row-selection)
- [Custom Cell Renderers](#custom-cell-renderers)
- [Performance Optimization](#performance-optimization)
- [Server-Side Integration](#server-side-integration)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)
- [Migration Guide](#migration-guide)
- [Best Practices](#best-practices)
- [Accessibility](#accessibility)

## Quick Start

### Installation

```bash
npm install @spexop/react @spexop/theme
```

### Basic Example

```tsx
import { DataTable } from '@spexop/react';
import type { Column } from '@spexop/react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: Column<User>[] = [
  { id: 'name', header: 'Name', accessor: 'name' },
  { id: 'email', header: 'Email', accessor: 'email' },
  { id: 'role', header: 'Role', accessor: 'role' },
];

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

function MyDataTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
      sortable
      filterable
      paginated
    />
  );
}
```

## Column Definitions

### Basic Column

```tsx
const column: Column<T> = {
  id: 'uniqueId',           // Unique identifier
  header: 'Column Name',    // Display name
  accessor: 'propertyName', // Data property or function
};
```

### Column with Accessor Function

Use accessor functions to compute values from multiple properties:

```tsx
const columns: Column<User>[] = [
  {
    id: 'fullName',
    header: 'Full Name',
    accessor: (row) => `${row.firstName} ${row.lastName}`,
  },
];
```

### Column with Custom Width

```tsx
const columns: Column<User>[] = [
  {
    id: 'id',
    header: 'ID',
    accessor: 'id',
    width: '80px', // Fixed width
  },
];
```

### Column with Alignment

```tsx
const columns: Column<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessor: 'name',
    align: 'left', // 'left' | 'center' | 'right'
  },
];
```

### Disable Sorting/Filtering Per Column

```tsx
const columns: Column<User>[] = [
  {
    id: 'actions',
    header: 'Actions',
    accessor: 'id',
    sortable: false,   // Disable sorting
    filterable: false, // Disable filtering
  },
];
```

## Sorting

### Uncontrolled Sorting

Let DataTable handle sorting internally:

```tsx
<DataTable
  columns={columns}
  data={data}
  sortable
  defaultSort={{ columnId: 'name', direction: 'asc' }}
/>
```

### Controlled Sorting

Manage sort state yourself:

```tsx
function ControlledSorting() {
  const [sort, setSort] = useState<SortState>({
    columnId: 'name',
    direction: 'asc',
  });

  return (
    <DataTable
      columns={columns}
      data={data}
      sort={sort}
      onSortChange={setSort}
    />
  );
}
```

### Custom Sort Function

Provide custom sorting logic for complex data:

```tsx
const columns: Column<Product>[] = [
  {
    id: 'price',
    header: 'Price',
    accessor: 'price',
    sortFn: (a, b) => a.price - b.price,
  },
  {
    id: 'priority',
    header: 'Priority',
    accessor: 'priority',
    sortFn: (a, b) => {
      const order = { high: 3, medium: 2, low: 1 };
      return order[a.priority] - order[b.priority];
    },
  },
];
```

### Multi-Click Sort Cycle

DataTable uses a three-state sort cycle:

1. First click: Ascending
2. Second click: Descending
3. Third click: Clear sort (original order)

## Filtering

### Global Search

Enable global search across all columns:

```tsx
<DataTable
  columns={columns}
  data={data}
  filterable
  showSearch
/>
```

### Column-Specific Filters

Show filter inputs for each column:

```tsx
<DataTable
  columns={columns}
  data={data}
  filterable
  showColumnFilters
/>
```

### Controlled Filtering

```tsx
function ControlledFiltering() {
  const [filter, setFilter] = useState<FilterState>({
    global: '',
    columns: {},
  });

  return (
    <DataTable
      columns={columns}
      data={data}
      filter={filter}
      onFilterChange={setFilter}
    />
  );
}
```

### Custom Filter Function

```tsx
const columns: Column<User>[] = [
  {
    id: 'age',
    header: 'Age',
    accessor: 'age',
    filterFn: (row, filterValue) => {
      const minAge = Number.parseInt(filterValue, 10);
      return row.age >= minAge;
    },
  },
  {
    id: 'tags',
    header: 'Tags',
    accessor: 'tags',
    filterFn: (row, filterValue) => {
      return row.tags.some((tag) =>
        tag.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  },
];
```

## Pagination

### Basic Pagination

```tsx
<DataTable
  columns={columns}
  data={data}
  paginated
  defaultPagination={{ page: 0, pageSize: 10 }}
  pageSizeOptions={[10, 25, 50, 100]}
/>
```

### Controlled Pagination

```tsx
function ControlledPagination() {
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    pageSize: 25,
  });

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
}
```

### Hide Pagination Info

```tsx
<DataTable
  columns={columns}
  data={data}
  paginated
  showPaginationInfo={false}
/>
```

### Custom Page Size Options

```tsx
<DataTable
  columns={columns}
  data={data}
  paginated
  pageSizeOptions={[5, 10, 20, 50]}
/>
```

## Row Selection

### Basic Selection

```tsx
function SelectableTable() {
  const [selection, setSelection] = useState({
    selectedIds: new Set(),
    allSelected: false,
  });

  return (
    <DataTable
      columns={columns}
      data={data}
      selectable
      onSelectionChange={setSelection}
    />
  );
}
```

### Access Selected Rows

```tsx
function SelectableTable() {
  const [selection, setSelection] = useState<SelectionState>({
    selectedIds: new Set(),
    allSelected: false,
  });

  const selectedCount = selection.selectedIds.size;
  const selectedArray = Array.from(selection.selectedIds);

  return (
    <div>
      <div>Selected: {selectedCount} rows</div>
      <DataTable
        columns={columns}
        data={data}
        selectable
        onSelectionChange={setSelection}
      />
    </div>
  );
}
```

## Custom Cell Renderers

### Basic Custom Cell

```tsx
const columns: Column<User>[] = [
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (value) => (
      <span style={{ color: value === 'active' ? 'green' : 'red' }}>
        {value}
      </span>
    ),
  },
];
```

### Access Full Row Data

```tsx
const columns: Column<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessor: 'name',
    cell: (value, row, rowIndex) => (
      <div>
        <strong>{row.name}</strong>
        <div>{row.email}</div>
      </div>
    ),
  },
];
```

### Action Buttons

```tsx
const columns: Column<User>[] = [
  {
    id: 'actions',
    header: 'Actions',
    accessor: 'id',
    sortable: false,
    filterable: false,
    cell: (value, row) => (
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => handleEdit(row)}>Edit</button>
        <button onClick={() => handleDelete(row.id)}>Delete</button>
      </div>
    ),
  },
];
```

### Conditional Rendering

```tsx
const columns: Column<Product>[] = [
  {
    id: 'stock',
    header: 'Stock',
    accessor: 'stock',
    cell: (value) => {
      const stock = Number(value);
      return (
        <span style={{
          color: stock > 50 ? 'green' : stock > 20 ? 'orange' : 'red',
          fontWeight: 600,
        }}>
          {stock}
        </span>
      );
    },
  },
];
```

## Performance Optimization

### Memoize Column Definitions

```tsx
function OptimizedTable() {
  const columns = useMemo<Column<User>[]>(() => [
    { id: 'name', header: 'Name', accessor: 'name' },
    { id: 'email', header: 'Email', accessor: 'email' },
  ], []);

  return <DataTable columns={columns} data={data} />;
}
```

### Memoize Data

```tsx
function OptimizedTable({ rawData }: Props) {
  const data = useMemo(() => processData(rawData), [rawData]);

  return <DataTable columns={columns} data={data} />;
}
```

### Virtual Scrolling

For very large datasets (>1000 rows), consider:

1. Using server-side pagination
2. Implementing virtual scrolling with a library like `react-virtual`
3. Limiting initial page size

### Debounce Filter Input

```tsx
function DebouncedFiltering() {
  const [filter, setFilter] = useState<FilterState>({
    global: '',
    columns: {},
  });

  const debouncedSetFilter = useMemo(
    () => debounce(setFilter, 300),
    []
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      filter={filter}
      onFilterChange={debouncedSetFilter}
    />
  );
}
```

## Server-Side Integration

### Server-Side Pagination

```tsx
function ServerPaginatedTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 25,
  });
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await api.getUsers({
        page: pagination.page,
        pageSize: pagination.pageSize,
      });
      setData(response.data);
      setTotalCount(response.total);
      setLoading(false);
    }
    fetchData();
  }, [pagination]);

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
}
```

### Server-Side Sorting

```tsx
function ServerSortedTable() {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState<SortState>({
    columnId: null,
    direction: null,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await api.getUsers({
        sortBy: sort.columnId,
        sortDirection: sort.direction,
      });
      setData(response.data);
    }
    fetchData();
  }, [sort]);

  return (
    <DataTable
      columns={columns}
      data={data}
      sort={sort}
      onSortChange={setSort}
    />
  );
}
```

### Server-Side Filtering

```tsx
function ServerFilteredTable() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState<FilterState>({
    global: '',
    columns: {},
  });

  useEffect(() => {
    async function fetchData() {
      const response = await api.getUsers({
        search: filter.global,
        filters: filter.columns,
      });
      setData(response.data);
    }
    fetchData();
  }, [filter]);

  return (
    <DataTable
      columns={columns}
      data={data}
      filter={filter}
      onFilterChange={setFilter}
    />
  );
}
```

## Common Patterns

### Complete CRUD Table

```tsx
function CRUDTable() {
  const [data, setData] = useState([]);
  const [selection, setSelection] = useState<SelectionState>({
    selectedIds: new Set(),
    allSelected: false,
  });

  const handleBulkDelete = () => {
    const idsToDelete = Array.from(selection.selectedIds);
    // API call to delete
    setData(prev => prev.filter(item => !idsToDelete.includes(item.id)));
  };

  const columns: Column<User>[] = [
    { id: 'name', header: 'Name', accessor: 'name' },
    { id: 'email', header: 'Email', accessor: 'email' },
    {
      id: 'actions',
      header: 'Actions',
      accessor: 'id',
      sortable: false,
      filterable: false,
      cell: (value, row) => (
        <div>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <button onClick={handleBulkDelete} disabled={selection.selectedIds.size === 0}>
          Delete Selected ({selection.selectedIds.size})
        </button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        selectable
        onSelectionChange={setSelection}
        sortable
        filterable
        paginated
      />
    </div>
  );
}
```

### Export to CSV

```tsx
function ExportableTable() {
  const handleExport = () => {
    const csv = [
      columns.map(col => col.header).join(','),
      ...data.map(row => columns.map(col => {
        const value = typeof col.accessor === 'function'
          ? col.accessor(row)
          : row[col.accessor];
        return `"${value}"`;
      }).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv';
    link.click();
  };

  return (
    <div>
      <button onClick={handleExport}>Export to CSV</button>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
```

## Troubleshooting

### Table Not Sorting

Check:

1. `sortable` prop is set to `true`
2. Column doesn't have `sortable: false`
3. Data array is not empty
4. Sort icons are rendering (check for CSS issues)

### Filter Not Working

Check:

1. `filterable` prop is set to `true`
2. `showSearch` or `showColumnFilters` is enabled
3. Filter state is updating (add console.log)
4. Custom `filterFn` is correct

### Pagination Not Displaying

Check:

1. `paginated` prop is set to `true`
2. Data has more items than `pageSize`
3. `loading` prop is not `true`

### Performance Issues

Solutions:

1. Memoize columns and data
2. Reduce page size
3. Implement virtual scrolling
4. Use server-side processing
5. Debounce filter input

## Migration Guide

### From React Table v7

```tsx
// React Table v7
const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
} = useTable({ columns, data });

// Spexop DataTable
<DataTable columns={columns} data={data} />
```

### From Material-UI DataGrid

```tsx
// Material-UI
<DataGrid
  rows={rows}
  columns={columns}
  pageSize={10}
  checkboxSelection
/>

// Spexop DataTable
<DataTable
  columns={columns}
  data={rows}
  paginated
  defaultPagination={{ page: 0, pageSize: 10 }}
  selectable
/>
```

## Best Practices

### 1. Use TypeScript

Define interfaces for your data:

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  // Type-safe column definitions
];
```

### 2. Memoize Expensive Computations

```tsx
const columns = useMemo(() => [...], []);
const processedData = useMemo(() => processData(raw Data), [rawData]);
```

### 3. Provide Meaningful Column IDs

```tsx
// Good
{ id: 'user-email', header: 'Email', accessor: 'email' }

// Bad
{ id: '1', header: 'Email', accessor: 'email' }
```

### 4. Use Custom Cell Renderers Wisely

Keep cell renderers simple and performant:

```tsx
// Good
cell: (value) => <StatusBadge status={value} />

// Bad - inline styles and complex logic
cell: (value, row) => (
  <div style={{ ...complexStyles }}>
    {/* Complex nested components */}
  </div>
)
```

### 5. Handle Loading States

```tsx
<DataTable
  columns={columns}
  data={data}
  loading={isLoading}
  loadingMessage="Loading users..."
/>
```

### 6. Provide Empty States

```tsx
<DataTable
  columns={columns}
  data={data}
  emptyMessage={
    <div>
      <h3>No users found</h3>
      <button onClick={handleAdd}>Add User</button>
    </div>
  }
/>
```

## Accessibility

### Keyboard Navigation

- Tab: Navigate between interactive elements
- Enter/Space: Activate sort, select rows
- Arrow keys: Navigate pagination buttons

### Screen Reader Support

DataTable includes:

- ARIA labels for search and pagination
- `aria-sort` attributes on sortable columns
- `aria-selected` on selected rows
- Semantic table markup

### High Contrast Mode

DataTable respects high contrast mode and provides:

- Clear focus indicators
- Strong borders (2px)
- WCAG AA+ compliant colors

### Best Practices of Accessibility

1. Always provide `aria-label`:

    ```tsx
    <DataTable aria-label="User management table" />
    ```

2. Use meaningful column headers
3. Ensure touch targets are at least 44px
4. Test with screen readers
5. Verify keyboard navigation works

## Additional Resources

- [DataTable README](./README.md)
- [Table Component README](../Table/README.md)
- [Component API Reference](./DataTable.types.ts)
- [Example Applications](../../../../examples/)

## Support

For issues or questions:

- GitHub Issues: [spexop-ui/issues](https://github.com/spexop-ui/spexop-public/issues)
- Documentation: [spexop-ui.dev](https://spexop-ui.dev)
