import { useCallback, useEffect, useState } from 'react';

/** Counts down once per second from `start`; `restart()` resets it. */
export default function useCountdown(start) {
  const [remaining, setRemaining] = useState(start);

  useEffect(() => {
    if (remaining <= 0) return undefined;
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining]);

  const restart = useCallback(() => setRemaining(start), [start]);
  return { remaining, restart };
}
