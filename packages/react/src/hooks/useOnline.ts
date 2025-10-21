/**
 * useOnline Hook
 *
 * Tracks the browser's online/offline status.
 * Essential for PWAs and offline-first applications.
 *
 * @example
 * ```tsx
 * function App() {
 *   const isOnline = useOnline();
 *
 *   return (
 *     <div>
 *       {!isOnline && (
 *         <Banner type="warning">
 *           You are offline. Some features may be unavailable.
 *         </Banner>
 *       )}
 *     </div>
 *   );
 * }
 *
 * // Conditional API calls
 * function DataFetcher() {
 *   const isOnline = useOnline();
 *
 *   useEffect(() => {
 *     if (isOnline) {
 *       syncData();
 *     } else {
 *       queueForLater();
 *     }
 *   }, [isOnline]);
 * }
 *
 * // Adjust media quality
 * function VideoPlayer() {
 *   const isOnline = useOnline();
 *
 *   return (
 *     <video
 *       src={isOnline ? highQualitySrc : cachedLowQualitySrc}
 *       autoPlay={isOnline}
 *     />
 *   );
 * }
 * ```
 *
 * Features:
 * - Real-time online/offline detection
 * - Automatically updates on network changes
 * - SSR-safe (returns true on server)
 * - Minimal re-renders
 * - Clean event listener management
 *
 * @returns Boolean indicating if browser is online
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useEffect, useState } from "react";

export function useOnline(): boolean {
  // SSR-safe initial state
  const getInitialState = (): boolean => {
    if (typeof navigator === "undefined") return true;
    return navigator.onLine;
  };

  const [isOnline, setIsOnline] = useState(getInitialState);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
