import { usePolling } from "../StatsCard/getStats";
import StatsCard from "../StatsCard/StatsCard";

type Mem = { usadoGB: number; totalGB: number };

export default function Memory() {
  const mem = usePolling<Mem>("http://localhost:2306/memory/info/");

  if (mem === null) {
    return <h2>Carregando memoria...</h2>;
  }

  const memoriaUsadaPorcento = (mem.usadoGB / mem.totalGB) * 100;

  return (
    <StatsCard
      icon={""}
      title={"Ram Memory"}
      percent={memoriaUsadaPorcento.toFixed(0)}
      value={mem.usadoGB.toFixed(0) + " Gb"}
      details={mem.totalGB.toFixed(1)}
    />
  );
}
