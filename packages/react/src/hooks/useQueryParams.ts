/**
 * useQueryParams Hook
 *
 * Parse and update URL query parameters.
 * Essential for filters, search, and shareable URLs.
 *
 * @example
 * ```tsx
 * function ProductFilters() {
 *   const [params, setParams] = useQueryParams();
 *
 *   const category = params.get('category') || 'all';
 *   const sort = params.get('sort') || 'newest';
 *
 *   return (
 *     <div>
 *       <select
 *         value={category}
 *         onChange={(e) => setParams({ category: e.target.value })}
 *       >
 *         <option value="all">All</option>
 *         <option value="electronics">Electronics</option>
 *       </select>
 *     </div>
 *   );
 * }
 *
 * // Search with URL sync
 * function SearchPage() {
 *   const [params, setParams] = useQueryParams();
 *   const query = params.get('q') || '';
 *
 *   return (
 *     <input
 *       value={query}
 *       onChange={(e) => setParams({ q: e.target.value })}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 * ```
 *
 * Features:
 * - Read and update query params
 * - Preserves existing params
 * - Type-safe URLSearchParams
 * - SSR-safe
 * - Automatic URL updates
 *
 * @returns Tuple of [params, setParams]
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useState } from "react";

export function useQueryParams(): [
  URLSearchParams,
  (updates: Record<string, string | null>) => void,
] {
  const getParams = (): URLSearchParams => {
    if (typeof window === "undefined") return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  };

  const [params, setParamsState] = useState(getParams);

  const setParams = useCallback((updates: Record<string, string | null>) => {
    if (typeof window === "undefined") return;

    const newParams = new URLSearchParams(window.location.search);

    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    }

    const newSearch = newParams.toString();
    const newUrl = newSearch
      ? `${window.location.pathname}?${newSearch}`
      : window.location.pathname;

    window.history.pushState({}, "", newUrl);
    setParamsState(newParams);
  }, []);

  return [params, setParams];
}
