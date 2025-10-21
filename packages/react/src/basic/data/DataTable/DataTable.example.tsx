/**
 * DataTable Component Examples
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useState } from "react";
import { DataTable } from "./DataTable.js";
import type {
  Column,
  FilterState,
  PaginationState,
  SortState,
} from "./DataTable.types.js";

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
  joinDate: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    department: "Engineering",
    joinDate: "2020-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    department: "Design",
    joinDate: "2019-06-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
    status: "Inactive",
    department: "Marketing",
    joinDate: "2021-03-10",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "User",
    status: "Active",
    department: "Sales",
    joinDate: "2020-08-05",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Editor",
    status: "Active",
    department: "Engineering",
    joinDate: "2022-01-20",
  },
];

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 999,
    stock: 50,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Desk Chair",
    category: "Furniture",
    price: 299,
    stock: 30,
    rating: 4.2,
  },
  {
    id: 3,
    name: "Monitor",
    category: "Electronics",
    price: 399,
    stock: 25,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Keyboard",
    category: "Electronics",
    price: 79,
    stock: 100,
    rating: 4.3,
  },
  {
    id: 5,
    name: "Mouse",
    category: "Electronics",
    price: 49,
    stock: 150,
    rating: 4.4,
  },
];

/**
 * Basic DataTable Example
 */
export function BasicDataTableExample() {
  const columns: Column<User>[] = [
    { id: "name", header: "Name", accessor: "name" },
    { id: "email", header: "Email", accessor: "email" },
    { id: "role", header: "Role", accessor: "role", align: "center" },
    { id: "status", header: "Status", accessor: "status", align: "center" },
  ];

  return (
    <DataTable
      columns={columns}
      data={sampleUsers}
      sortable
      filterable
      paginated
      aria-label="User list table"
    />
  );
}

/**
 * DataTable with Custom Cell Renderers
 */
export function CustomCellDataTableExample() {
  const columns: Column<User>[] = [
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
      cell: (value: unknown) => (
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "16px",
            background:
              value === "Admin"
                ? "#e3f2fd"
                : value === "Editor"
                  ? "#fff3e0"
                  : "#f5f5f5",
            fontWeight: 600,
            fontSize: "13px",
          }}
        >
          {String(value)}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessor: "status",
      align: "center",
      cell: (value: unknown) => (
        <span
          style={{
            color: value === "Active" ? "#2e7d32" : "#d32f2f",
            fontWeight: 600,
          }}
        >
          {value === "Active" ? "● Active" : "○ Inactive"}
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
      cell: (_value: unknown) => (
        <div
          style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
        >
          <button
            type="button"
            style={{
              padding: "4px 12px",
              fontSize: "13px",
              border: "2px solid #1976d2",
              borderRadius: "6px",
              background: "white",
              color: "#1976d2",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
          <button
            type="button"
            style={{
              padding: "4px 12px",
              fontSize: "13px",
              border: "2px solid #d32f2f",
              borderRadius: "6px",
              background: "white",
              color: "#d32f2f",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={sampleUsers}
      sortable
      filterable
      paginated
      variant="bordered"
      size="md"
      aria-label="User management table"
    />
  );
}

/**
 * DataTable with Selectable Rows
 */
export function SelectableDataTableExample() {
  const [selection, setSelection] = useState({
    selectedIds: new Set<string | number>(),
    allSelected: false,
  });

  const columns: Column<User>[] = [
    { id: "id", header: "ID", accessor: "id", width: "80px", align: "center" },
    { id: "name", header: "Name", accessor: "name" },
    { id: "email", header: "Email", accessor: "email" },
    { id: "department", header: "Department", accessor: "department" },
  ];

  return (
    <div>
      <div
        style={{
          marginBottom: "16px",
          padding: "12px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <strong>Selected: </strong>
        {selection.selectedIds.size === 0
          ? "None"
          : Array.from(selection.selectedIds).join(", ")}
      </div>
      <DataTable
        columns={columns}
        data={sampleUsers}
        selectable
        sortable
        filterable
        paginated
        onSelectionChange={setSelection}
        aria-label="Selectable user table"
      />
    </div>
  );
}

/**
 * Controlled DataTable Example
 */
export function ControlledDataTableExample() {
  const [sort, setSort] = useState<SortState>({
    columnId: "name",
    direction: "asc",
  });
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    pageSize: 5,
  });
  const [filter, setFilter] = useState<FilterState>({
    global: "",
    columns: {},
  });

  const columns: Column<User>[] = [
    { id: "name", header: "Name", accessor: "name" },
    { id: "email", header: "Email", accessor: "email" },
    { id: "role", header: "Role", accessor: "role" },
    { id: "status", header: "Status", accessor: "status" },
  ];

  return (
    <div>
      <div
        style={{
          marginBottom: "16px",
          padding: "12px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <div>
          <strong>Sort:</strong> {sort.columnId || "None"} (
          {sort.direction || "None"})
        </div>
        <div>
          <strong>Page:</strong> {pagination.page + 1}
        </div>
        <div>
          <strong>Filter:</strong> {filter.global || "None"}
        </div>
      </div>
      <DataTable
        columns={columns}
        data={sampleUsers}
        sort={sort}
        onSortChange={setSort}
        pagination={pagination}
        onPaginationChange={setPagination}
        filter={filter}
        onFilterChange={setFilter}
        pageSizeOptions={[5, 10, 25]}
        aria-label="Controlled data table"
      />
    </div>
  );
}

/**
 * DataTable with Custom Sort and Filter
 */
export function CustomSortFilterDataTableExample() {
  const columns: Column<Product>[] = [
    {
      id: "name",
      header: "Product Name",
      accessor: "name",
    },
    {
      id: "category",
      header: "Category",
      accessor: "category",
      align: "center",
    },
    {
      id: "price",
      header: "Price",
      accessor: "price",
      align: "right",
      cell: (value) => `$${Number(value).toFixed(2)}`,
      sortFn: (a, b) => a.price - b.price,
    },
    {
      id: "stock",
      header: "Stock",
      accessor: "stock",
      align: "center",
      sortFn: (a, b) => a.stock - b.stock,
      cell: (value) => {
        const stock = Number(value);
        return (
          <span
            style={{
              color:
                stock > 50 ? "#2e7d32" : stock > 20 ? "#f57c00" : "#d32f2f",
              fontWeight: 600,
            }}
          >
            {stock}
          </span>
        );
      },
    },
    {
      id: "rating",
      header: "Rating",
      accessor: "rating",
      align: "center",
      cell: (value) => `★ ${value}`,
      sortFn: (a, b) => a.rating - b.rating,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={sampleProducts}
      sortable
      filterable
      paginated
      defaultSort={{ columnId: "rating", direction: "desc" }}
      variant="striped"
      aria-label="Product catalog table"
    />
  );
}

/**
 * DataTable with Loading State
 */
export function LoadingDataTableExample() {
  const [isLoading, setIsLoading] = useState(true);

  const columns: Column<User>[] = [
    { id: "name", header: "Name", accessor: "name" },
    { id: "email", header: "Email", accessor: "email" },
    { id: "role", header: "Role", accessor: "role" },
  ];

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  });

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsLoading(!isLoading)}
        style={{
          marginBottom: "16px",
          padding: "8px 16px",
          border: "2px solid #1976d2",
          borderRadius: "8px",
          background: "white",
          color: "#1976d2",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Toggle Loading
      </button>
      <DataTable
        columns={columns}
        data={sampleUsers}
        loading={isLoading}
        loadingMessage="Fetching user data..."
        sortable
        filterable
        paginated
        aria-label="User data table with loading state"
      />
    </div>
  );
}

/**
 * DataTable with Empty State
 */
export function EmptyDataTableExample() {
  const columns: Column<User>[] = [
    { id: "name", header: "Name", accessor: "name" },
    { id: "email", header: "Email", accessor: "email" },
    { id: "role", header: "Role", accessor: "role" },
  ];

  return (
    <DataTable
      columns={columns}
      data={[]}
      emptyMessage={
        <div style={{ padding: "32px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
          <h3 style={{ marginBottom: "8px" }}>No Users Found</h3>
          <p style={{ color: "#666", marginBottom: "16px" }}>
            Get started by adding your first user.
          </p>
          <button
            type="button"
            style={{
              padding: "8px 24px",
              border: "2px solid #1976d2",
              borderRadius: "8px",
              background: "#1976d2",
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Add User
          </button>
        </div>
      }
      sortable
      filterable
      paginated
      aria-label="Empty user table"
    />
  );
}

/**
 * Compact DataTable Example
 */
export function CompactDataTableExample() {
  const columns: Column<Product>[] = [
    { id: "id", header: "ID", accessor: "id", width: "60px" },
    { id: "name", header: "Name", accessor: "name" },
    {
      id: "price",
      header: "Price",
      accessor: "price",
      align: "right",
      cell: (v) => `$${v}`,
    },
    { id: "stock", header: "Stock", accessor: "stock", align: "center" },
  ];

  return (
    <DataTable
      columns={columns}
      data={sampleProducts}
      variant="compact"
      size="sm"
      sortable
      filterable={false}
      paginated
      defaultPagination={{ page: 0, pageSize: 5 }}
      aria-label="Compact product table"
    />
  );
}
