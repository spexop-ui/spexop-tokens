# DataTable Component

Advanced table with built-in sorting, filtering, and pagination.

## Features

- Built-in sorting (single column, asc/desc)
- Global and column-specific filtering
- Pagination with customizable page sizes
- Row selection (single and multi-select)
- Custom cell renderers
- Custom sort and filter functions
- Loading and empty states
- Controlled and uncontrolled modes
- Responsive design
- Sticky header support
- Full keyboard navigation
- WCAG AA+ compliant
- TypeScript types included
- Design tokens throughout

## Installation

```bash
npm install @spexop/react
```

## Basic Usage

```tsx
import { DataTable } from "@spexop/react";

const columns = [
  { id: "name", header: "Name", accessor: "name" },
  { id: "email", header: "Email", accessor: "email" },
  { id: "role", header: "Role", accessor: "role", align: "center" },
];

const data = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
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

## Column Definition

### Basic Column

```tsx
const columns = [
  {
    id: "name",
    header: "Name",
    accessor: "name",
  },
];
```

### Column with Custom Cell Renderer

```tsx
const columns = [
  {
    id: "status",
    header: "Status",
    accessor: "status",
    cell: (value) => (
      <span style={{ color: value === "active" ? "green" : "red" }}>
        {value}
      </span>
    ),
  },
];
```

### Column with Accessor Function

```tsx
const columns = [
  {
    id: "fullName",
    header: "Full Name",
    accessor: (row) => `${row.firstName} ${row.lastName}`,
  },
];
```

### Column with Custom Sort

```tsx
const columns = [
  {
    id: "priority",
    header: "Priority",
    accessor: "priority",
    sortFn: (a, b) => {
      const order = { high: 3, medium: 2, low: 1 };
      return order[a.priority] - order[b.priority];
    },
  },
];
```

### Column with Custom Filter

```tsx
const columns = [
  {
    id: "tags",
    header: "Tags",
    accessor: "tags",
    filterFn: (row, filterValue) => {
      return row.tags.some((tag) =>
        tag.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  },
];
```

### Disable Sorting or Filtering per Column

```tsx
const columns = [
  {
    id: "actions",
    header: "Actions",
    accessor: "id",
    sortable: false,
    filterable: false,
    cell: (value) => <button>Edit {value}</button>,
  },
];
```

## Usage Examples

### Sorting

Enable sorting with the `sortable` prop. Click column headers to sort.

```tsx
<DataTable
  columns={columns}
  data={data}
  sortable
  defaultSort={{ columnId: "name", direction: "asc" }}
/>
```

### Controlled Sorting

```tsx
function ControlledTable() {
  const [sort, setSort] = useState({ columnId: "name", direction: "asc" });

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

### Filtering

Enable global search and column filters.

```tsx
<DataTable
  columns={columns}
  data={data}
  filterable
  showSearch
  showColumnFilters
/>
```

### Controlled Filtering

```tsx
function ControlledTable() {
  const [filter, setFilter] = useState({
    global: "",
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

### Pagination

Enable pagination with customizable page sizes.

```tsx
<DataTable
  columns={columns}
  data={data}
  paginated
  defaultPagination={{ page: 0, pageSize: 25 }}
  pageSizeOptions={[10, 25, 50, 100]}
/>
```

### Controlled Pagination

```tsx
function ControlledTable() {
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
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

### Row Selection

Enable row selection with checkboxes.

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

### Loading State

Show loading spinner while data is being fetched.

```tsx
<DataTable
  columns={columns}
  data={data}
  loading={isLoading}
  loadingMessage="Loading data..."
/>
```

### Empty State

Show custom message when no data is available.

```tsx
<DataTable
  columns={columns}
  data={[]}
  emptyMessage="No results found"
/>
```

### Custom Empty State

```tsx
<DataTable
  columns={columns}
  data={[]}
  emptyMessage={
    <div>
      <h3>No data available</h3>
      <button>Add new item</button>
    </div>
  }
/>
```

## Complete Example

```tsx
import { DataTable, Button } from "@spexop/react";
import { useState } from "react";

function CompleteExample() {
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      id: "id",
      header: "ID",
      accessor: "id",
      width: "80px",
      align: "center",
    },
    {
      id: "name",
      header: "Name",
      accessor: "name",
    },
    {
      id: "email",
      header: "Email",
      accessor: "email",
    },
    {
      id: "role",
      header: "Role",
      accessor: "role",
      align: "center",
      cell: (value) => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            background: value === "Admin" ? "#e3f2fd" : "#f5f5f5",
          }}
        >
          {value}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessor: "status",
      align: "center",
      cell: (value) => (
        <span style={{ color: value === "Active" ? "green" : "red" }}>
          {value}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      accessor: "id",
      align: "right",
      sortable: false,
      filterable: false,
      cell: (value) => (
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <Button size="sm" variant="outline">Edit</Button>
          <Button size="sm" variant="danger">Delete</Button>
        </div>
      ),
    },
  ];

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive" },
    { id: 4, name: "Alice Williams", email: "alice@example.com", role: "User", status: "Active" },
    { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "Editor", status: "Active" },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      sortable
      filterable
      paginated
      selectable
      showSearch
      showColumnFilters={false}
      variant="bordered"
      size="md"
      responsive
      stickyHeader
      loading={isLoading}
      defaultSort={{ columnId: "name", direction: "asc" }}
      defaultPagination={{ page: 0, pageSize: 10 }}
      pageSizeOptions={[5, 10, 25, 50]}
      emptyMessage="No users found"
      loadingMessage="Loading users..."
      aria-label="User management table"
    />
  );
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on composable Table primitive
2. **Borders before shadows** - Strong 2px borders for separation
3. **Typography before decoration** - Font weight for hierarchy
4. **Tokens before magic numbers** - Design tokens throughout
5. **Composition before complexity** - Composable features (sorting, filtering, pagination)
6. **Standards before frameworks** - Semantic HTML and web standards
7. **Accessibility before aesthetics** - Full ARIA support and keyboard navigation

## Accessibility

- Semantic HTML table structure
- ARIA attributes for sorting, selection, and pagination
- Keyboard navigation (Tab, Enter, Space)
- Screen reader support
- High contrast colors (WCAG AA+ compliant)
- Focus indicators on all interactive elements
- Accessible form controls

## Performance Tips

1. Use `useMemo` for column definitions to prevent re-renders
2. Use `rowIdKey` to ensure efficient row updates
3. Implement virtual scrolling for very large datasets (>1000 rows)
4. Use custom `sortFn` and `filterFn` for optimized operations
5. Consider server-side sorting/filtering/pagination for large datasets

## API Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `Column[]` | - | Column definitions |
| `data` | `T[]` | - | Table data |
| `rowIdKey` | `keyof T` | `"id"` | Row unique identifier key |
| `sortable` | `boolean` | `true` | Enable sorting |
| `filterable` | `boolean` | `true` | Enable filtering |
| `paginated` | `boolean` | `true` | Enable pagination |
| `selectable` | `boolean` | `false` | Enable row selection |
| `defaultSort` | `SortState` | - | Initial sort state |
| `sort` | `SortState` | - | Controlled sort state |
| `onSortChange` | `(sort: SortState) => void` | - | Sort change handler |
| `defaultPagination` | `PaginationState` | `{ page: 0, pageSize: 10 }` | Initial pagination |
| `pagination` | `PaginationState` | - | Controlled pagination |
| `onPaginationChange` | `(pagination: PaginationState) => void` | - | Pagination change handler |
| `defaultFilter` | `FilterState` | `{ global: "", columns: {} }` | Initial filter |
| `filter` | `FilterState` | - | Controlled filter |
| `onFilterChange` | `(filter: FilterState) => void` | - | Filter change handler |
| `onSelectionChange` | `(selection: SelectionState) => void` | - | Selection change handler |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Page size options |
| `showSearch` | `boolean` | `true` | Show global search |
| `showColumnFilters` | `boolean` | `false` | Show column filters |
| `showPaginationInfo` | `boolean` | `true` | Show pagination info |
| `emptyMessage` | `string \| ReactNode` | `"No data available"` | Empty state message |
| `loading` | `boolean` | `false` | Loading state |
| `loadingMessage` | `string \| ReactNode` | `"Loading..."` | Loading message |
| `variant` | `TableVariant` | `"bordered"` | Table variant |
| `size` | `TableSize` | `"md"` | Table size |
| `responsive` | `boolean` | `true` | Enable responsive scrolling |
| `stickyHeader` | `boolean` | `true` | Enable sticky header |
| `className` | `string` | `""` | Additional CSS class |
| `aria-label` | `string` | - | ARIA label |

### Column Type

```typescript
interface Column<T> {
  id: string;
  header: string | ReactNode;
  accessor: keyof T | ((row: T) => unknown);
  cell?: (value: unknown, row: T, rowIndex: number) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  sortFn?: (a: T, b: T) => number;
  filterFn?: (row: T, filterValue: string) => boolean;
  width?: string;
  align?: "left" | "center" | "right";
  sticky?: boolean;
}
```

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT License - Part of the Spexop Design System
