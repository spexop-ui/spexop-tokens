/**
 * useWindowSize Hook
 *
 * Tracks the current window dimensions with debounced resize handling.
 * Essential for responsive layouts and mobile/desktop switching.
 *
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const { width, height } = useWindowSize();
 *
 *   return (
 *     <div>
 *       <p>Window size: {width} x {height}</p>
 *       {width < 768 ? <MobileLayout /> : <DesktopLayout />}
 *     </div>
 *   );
 * }
 *
 * // With custom debounce delay
 * function PerformanceOptimized() {
 *   const { width, height } = useWindowSize(300);
 *
 *   return (
 *     <div>
 *       Dimensions: {width} x {height}
 *     </div>
 *   );
 * }
 *
 * // Responsive image sizing
 * function ResponsiveImage({ src }) {
 *   const { width } = useWindowSize();
 *   const imageSize = width < 640 ? 'small' : width < 1024 ? 'medium' : 'large';
 *
 *   return <img src={`${src}-${imageSize}.jpg`} />;
 * }
 * ```
 *
 * Features:
 * - Tracks window width and height
 * - Debounced resize handling (default 150ms)
 * - Configurable debounce delay
 * - Automatic cleanup
 * - SSR-safe (returns 0x0 on server)
 * - Performance optimized
 *
 * @param debounceDelay - Debounce delay in milliseconds (default: 150)
 * @returns Object with width and height properties
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useEffect, useState } from "react";

export interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(debounceDelay = 150): WindowSize {
  // SSR-safe initial state
  const getInitialSize = (): WindowSize => {
    if (typeof window === "undefined") {
      return { width: 0, height: 0 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [windowSize, setWindowSize] = useState<WindowSize>(getInitialSize);

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      // Clear existing timeout
      clearTimeout(timeoutId);

      // Debounce the resize update
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, debounceDelay);
    };

    // Set initial size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [debounceDelay]);

  return windowSize;
}
