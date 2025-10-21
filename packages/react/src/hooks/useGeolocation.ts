/**
 * useGeolocation Hook
 *
 * Tracks user's geolocation coordinates.
 * Essential for location-based features and store finders.
 *
 * @example
 * ```tsx
 * function StoreLocator() {
 *   const { coords, error, loading } = useGeolocation();
 *
 *   if (loading) return <div>Getting your location...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       Latitude: {coords?.latitude}
 *       Longitude: {coords?.longitude}
 *     </div>
 *   );
 * }
 *
 * // Find nearby stores
 * function NearbyStores() {
 *   const { coords } = useGeolocation({ enableHighAccuracy: true });
 *
 *   if (!coords) return null;
 *
 *   return <StoreList location={coords} />;
 * }
 * ```
 *
 * Features:
 * - Real-time position tracking
 * - Watch position option
 * - Error handling
 * - Loading state
 * - Configurable accuracy
 * - SSR-safe
 *
 * @param options - Geolocation options
 * @returns Geolocation state
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useEffect, useState } from "react";

export interface GeolocationState {
  coords: GeolocationCoordinates | null;
  error: GeolocationPositionError | null;
  loading: boolean;
}

export interface UseGeolocationOptions extends PositionOptions {
  watch?: boolean;
}

export function useGeolocation(
  options: UseGeolocationOptions = {},
): GeolocationState {
  const { watch = false, enableHighAccuracy, timeout, maximumAge } = options;
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({
        coords: null,
        error: {
          code: 0,
          message: "Geolocation is not supported",
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        } as GeolocationPositionError,
        loading: false,
      });
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setState({
        coords: position.coords,
        error: null,
        loading: false,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      setState({
        coords: null,
        error,
        loading: false,
      });
    };

    const positionOptions: PositionOptions = {
      enableHighAccuracy,
      timeout,
      maximumAge,
    };

    if (watch) {
      const watchId = navigator.geolocation.watchPosition(
        onSuccess,
        onError,
        positionOptions,
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }

    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      positionOptions,
    );
  }, [watch, enableHighAccuracy, timeout, maximumAge]);

  return state;
}
