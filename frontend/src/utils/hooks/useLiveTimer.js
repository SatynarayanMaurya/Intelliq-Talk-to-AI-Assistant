import { useEffect, useState } from "react";

function useLiveTimer(timestamp) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!timestamp) return;

    const update = () =>
      setElapsed(Math.floor((Date.now() - timestamp) / 1000));

    update(); 
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return elapsed;
}

export default useLiveTimer;
