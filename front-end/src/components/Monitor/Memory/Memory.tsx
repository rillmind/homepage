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
      headerValue={memoriaUsadaPorcento.toFixed(0)}
      bodyValue={mem.usadoGB.toFixed(1) + " Gb"}
      bodyDetails={"de " + mem.totalGB.toFixed(1)}
    />
  );
}
