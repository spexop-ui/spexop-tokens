/**
 * useIntersectionObserver Hook
 *
 * Generic intersection observer for lazy loading, infinite scroll, and visibility tracking.
 * More flexible than useScrollSpy.
 *
 * @example
 * ```tsx
 * // Lazy load images
 * function LazyImage({ src, alt }: { src: string; alt: string }) {
 *   const [ref, isVisible] = useIntersectionObserver<HTMLImageElement>({
 *     threshold: 0.1,
 *     triggerOnce: true,
 *   });
 *
 *   return (
 *     <img
 *       ref={ref}
 *       src={isVisible ? src : placeholder}
 *       alt={alt}
 *     />
 *   );
 * }
 *
 * // Infinite scroll
 * function InfiniteList() {
 *   const [ref, isVisible] = useIntersectionObserver({
 *     rootMargin: '100px',
 *   });
 *
 *   useEffect(() => {
 *     if (isVisible) loadMore();
 *   }, [isVisible]);
 *
 *   return <div ref={ref}>Loading...</div>;
 * }
 * ```
 *
 * Features:
 * - Fully configurable IntersectionObserver
 * - Trigger once option
 * - Type-safe with generics
 * - Returns entry data
 * - Automatic cleanup
 *
 * @param options - IntersectionObserver options
 * @returns Tuple of [ref, isIntersecting, entry]
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { type RefObject, useEffect, useRef, useState } from "react";

export interface UseIntersectionObserverOptions
  extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {},
): [RefObject<T | null>, boolean, IntersectionObserverEntry | null] {
  const { triggerOnce = false, threshold, root, rootMargin } = options;
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);

        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      { threshold, root, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [triggerOnce, threshold, root, rootMargin]);

  return [ref, isIntersecting, entry];
}
