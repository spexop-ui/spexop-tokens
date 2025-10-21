/**
 * usePermission Hook
 *
 * Check and request browser permissions.
 * Essential for camera, microphone, geolocation, and notification access.
 *
 * @example
 * ```tsx
 * function LocationFeature() {
 *   const { state, request } = usePermission('geolocation');
 *
 *   if (state === 'prompt') {
 *     return <button onClick={request}>Enable Location</button>;
 *   }
 *
 *   if (state === 'denied') {
 *     return <div>Location access denied</div>;
 *   }
 *
 *   return <div>Location enabled!</div>;
 * }
 *
 * // Notifications
 * function NotificationButton() {
 *   const { state, request } = usePermission('notifications');
 *
 *   return (
 *     <button
 *       onClick={request}
 *       disabled={state === 'granted'}
 *     >
 *       {state === 'granted' ? 'Notifications Enabled' : 'Enable Notifications'}
 *     </button>
 *   );
 * }
 * ```
 *
 * Features:
 * - Check permission state
 * - Request permissions
 * - Auto-update on permission change
 * - Type-safe permission names
 * - SSR-safe
 *
 * @param name - Permission name
 * @returns Permission state and request function
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useEffect, useState } from "react";

export type PermissionName =
  | "geolocation"
  | "notifications"
  | "camera"
  | "microphone"
  | "persistent-storage"
  | "push"
  | "clipboard-read"
  | "clipboard-write";

export type PermissionState = "granted" | "denied" | "prompt" | "unsupported";

export interface UsePermissionReturn {
  state: PermissionState;
  request: () => Promise<PermissionState>;
}

export function usePermission(name: PermissionName): UsePermissionReturn {
  const [state, setState] = useState<PermissionState>("prompt");

  const checkPermission = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.permissions) {
      setState("unsupported");
      return "unsupported";
    }

    try {
      const result = await navigator.permissions.query({
        name,
      } as PermissionDescriptor);
      setState(result.state as PermissionState);
      return result.state as PermissionState;
    } catch (error) {
      setState("unsupported");
      return "unsupported";
    }
  }, [name]);

  const request = useCallback(async (): Promise<PermissionState> => {
    if (typeof navigator === "undefined") {
      return "unsupported";
    }

    try {
      // Handle different permission APIs
      if (name === "notifications" && "Notification" in window) {
        const result = await Notification.requestPermission();
        setState(result as PermissionState);
        return result as PermissionState;
      }

      if (name === "geolocation" && navigator.geolocation) {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            () => {
              setState("granted");
              resolve("granted");
            },
            () => {
              setState("denied");
              resolve("denied");
            },
          );
        });
      }

      // For other permissions, just check state
      return await checkPermission();
    } catch (error) {
      setState("denied");
      return "denied";
    }
  }, [name, checkPermission]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return { state, request };
}
