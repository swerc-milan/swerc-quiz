import { useEffect, useState } from "react";

interface WakeLockAPI {
  request(type: string): Promise<WakeLockSentinel>;
}

interface WakeLockSentinel {
  addEventListener(kind: string, listener: (event: Event) => void): void;
  release(): Promise<void>;
}

export function useWakeLock() {
  const [active, setActive] = useState<boolean>(false);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  useEffect(() => {
    // The wakeLock API is not available in all browsers.
    if (!("wakeLock" in navigator)) return;

    // Disable wake lock when it's no longer needed.
    if (wakeLock && !active) {
      console.log("Releasing wake lock");
      wakeLock.release();
      setWakeLock(null);
      return;
    }

    // Re-enable the wake lock when it's requested again.
    if (!wakeLock && active) {
      console.log("Taking wake lock");
      const requestWakeLock = async () => {
        try {
          const wakeLockAPI = (navigator as any).wakeLock as WakeLockAPI;
          const wakeLock = await wakeLockAPI.request("screen");
          setWakeLock(wakeLock);
        } catch (err) {
          console.error("Failed to obtain wakeLock", err);
        }
      };

      requestWakeLock();
    }
  }, [active, wakeLock]);

  return [active, setActive] as const;
}
