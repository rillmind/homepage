import { useEffect, useState } from "react";

type Mem = { totalGB: number; usadoGB: number };

export function useRam(intervalMs = 1000) {
  const [mem, setMem] = useState<Mem | null>(null);

  useEffect(() => {
    const buscar = async () => {
      try {
        const req = await fetch("http://localhost:2306/memory/info/");
        setMem(await req.json());
      } catch {
        setMem(null); // servidor fora do ar
      }
    };
    buscar();
    const id = setInterval(buscar, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return mem;
}
