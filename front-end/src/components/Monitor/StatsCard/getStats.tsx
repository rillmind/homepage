import { useEffect, useState } from "react";

export function usePolling<T>(url: string, intervalMs = 1000) {
  const [stat, setStat] = useState<T | null>(null);

  useEffect(() => {
    const buscar = async () => {
      try {
        const req = await fetch(url);
        setStat(await req.json());
      } catch {
        setStat(null); // servidor fora do ar
      }
    };
    buscar();
    const id = setInterval(buscar, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return stat;
}
