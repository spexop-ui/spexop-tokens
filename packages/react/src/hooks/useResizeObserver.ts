/**
 * useResizeObserver Hook
 *
 * Tracks element size changes using ResizeObserver.
 * Perfect for responsive components and container queries.
 *
 * @example
 * ```tsx
 * function ResponsiveCard() {
 *   const [ref, size] = useResizeObserver<HTMLDivElement>();
 *
 *   return (
 *     <div ref={ref}>
 *       {size.width < 400 ? <MobileLayout /> : <DesktopLayout />}
 *       <div>Width: {size.width}px</div>
 *     </div>
 *   );
 * }
 *
 * // Container queries
 * function ContainerQueryComponent() {
 *   const [ref, { width }] = useResizeObserver<HTMLDivElement>();
 *
 *   return (
 *     <div ref={ref} className={width < 600 ? 'small' : 'large'}>
 *       Responsive content
 *     </div>
 *   );
 * }
 * ```
 *
 * Features:
 * - Real-time size tracking
 * - Width and height
 * - Type-safe with generics
 * - Automatic cleanup
 * - Minimal re-renders
 *
 * @returns Tuple of [ref, size]
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { type RefObject, useEffect, useRef, useState } from "react";

export interface Size {
  width: number;
  height: number;
}

export function useResizeObserver<T extends HTMLElement = HTMLElement>(): [
  RefObject<T | null>,
  Size,
] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof ResizeObserver === "undefined") {
      // Fallback for older browsers
      const { width, height } = element.getBoundingClientRect();
      setSize({ width, height });
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, size];
}
