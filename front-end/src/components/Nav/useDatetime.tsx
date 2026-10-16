import { useEffect, useState } from "react";

type DateTime = { date: string; time: string };

export function useDatetime(intervalMs = 1000) {
  const [datetime, setDatetime] = useState<DateTime | null>(null);

  useEffect(() => {
    const buscar = async () => {
      try {
        const req = await fetch("http://localhost:2306/datetime/info/");
        setDatetime(await req.json());
      } catch {
        setDatetime(null);
      }
    };

    buscar();

    const id = setInterval(buscar, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return datetime;
}
