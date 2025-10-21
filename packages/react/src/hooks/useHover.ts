/**
 * useHover Hook
 *
 * Tracks hover state of an element.
 * Essential for tooltips, previews, and interactive UI.
 *
 * @example
 * ```tsx
 * function Card() {
 *   const [hoverRef, isHovered] = useHover<HTMLDivElement>();
 *
 *   return (
 *     <div ref={hoverRef} style={{ opacity: isHovered ? 1 : 0.8 }}>
 *       {isHovered && <Tooltip />}
 *     </div>
 *   );
 * }
 *
 * // Image preview
 * function ImageGallery() {
 *   const [ref, isHovered] = useHover<HTMLImageElement>();
 *
 *   return (
 *     <img
 *       ref={ref}
 *       src={isHovered ? highResSrc : thumbnailSrc}
 *       alt="Gallery"
 *     />
 *   );
 * }
 * ```
 *
 * Features:
 * - Mouse and touch support
 * - Type-safe with generics
 * - Minimal re-renders
 * - Automatic cleanup
 * - Touch device compatible
 *
 * @returns Tuple of [ref, isHovered]
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { type RefObject, useEffect, useRef, useState } from "react";

export function useHover<T extends HTMLElement = HTMLElement>(): [
  RefObject<T | null>,
  boolean,
] {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return [ref, isHovered];
}
