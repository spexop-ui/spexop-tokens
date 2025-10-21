/**
 * useDebounce Hook
 *
 * Returns a debounced value that only updates after a delay.
 * Essential for performance optimization in search inputs, filters, and expensive operations.
 *
 * @example
 * ```tsx
 * function SearchComponent() {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 *   useEffect(() => {
 *     // Only runs when debounced value changes
 *     if (debouncedSearchTerm) {
 *       performSearch(debouncedSearchTerm);
 *     }
 *   }, [debouncedSearchTerm]);
 *
 *   return (
 *     <input
 *       value={searchTerm}
 *       onChange={(e) => setSearchTerm(e.target.value)}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 *
 * // With API call
 * function AutocompleteInput() {
 *   const [query, setQuery] = useState('');
 *   const debouncedQuery = useDebounce(query, 300);
 *   const { data } = useSWR(
 *     debouncedQuery ? `/api/search?q=${debouncedQuery}` : null
 *   );
 *
 *   return <input onChange={(e) => setQuery(e.target.value)} />;
 * }
 * ```
 *
 * Features:
 * - Delays value updates until user stops typing
 * - Prevents excessive API calls or expensive computations
 * - Automatic cleanup on unmount
 * - Type-safe with generics
 * - Configurable delay
 *
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds (default: 500)
 * @returns Debounced value
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up timeout to update debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout on value or delay change
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
