import { usePolling } from "../StatsCard/getStats";
import StatsCard from "../StatsCard/StatsCard";

type Cpu = { heartz: number; cores: number; usado: number };

export default function Cpu() {
  const cpu = usePolling<Cpu>("http://localhost:2306/cpu/info/");
  if (cpu === null) {
    return (
      <StatsCard
        icon={""}
        title={"CPU LOAD"}
        headerValue={"..."}
        bodyValue={"..."}
        bodyDetails={"..."}
      />
    );
  }

  return (
    <StatsCard
      icon={""}
      title={"CPU LOAD"}
      headerValue={cpu.usado.toFixed(0)}
      bodyValue={(cpu.heartz / 1024).toFixed(1) + " Ghz"}
      bodyDetails={cpu.cores.toString() + " Cores"}
    />
  );
}
