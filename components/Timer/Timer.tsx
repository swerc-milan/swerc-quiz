import { ref } from "firebase/database";
import { database } from "lib/firebase";
import { useEffect, useState } from "react";
import { useObjectVal } from "react-firebase-hooks/database";

export function getRemainingTime(
  startTimestamp: number,
  duration: number,
  offset: number
) {
  const now = new Date().getTime() + offset;
  const elapsed = now - startTimestamp;
  const remaining = Math.max(0, duration - elapsed) / 1000;
  return remaining;
}

export function Timer({
  startTimestamp,
  duration,
}: {
  startTimestamp: number;
  duration: number;
}) {
  const [offset] = useObjectVal<number>(
    ref(database, ".info/serverTimeOffset")
  );
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (offset === undefined) {
        setRemaining(null);
        return;
      }
      setRemaining(getRemainingTime(startTimestamp, duration, offset));
    }, 100);
    return () => clearInterval(interval);
  }, [offset, startTimestamp, duration]);

  if (remaining === null) {
    return null;
  }

  return (
    <div>{remaining > 3 ? remaining | 0 : remaining.toFixed(1)} seconds</div>
  );
}
