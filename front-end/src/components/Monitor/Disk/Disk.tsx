import { usePolling } from "../StatsCard/getStats";
import StatsCard from "../StatsCard/StatsCard";

type Disk = { total: number; used: number; free: number; usedPercent: number };

export default function Disk() {
  const disk = usePolling<Disk>("http://localhost:2306/disk/info/");
  if (disk === null) {
    return (
      <StatsCard
        icon={""}
        title={"..."}
        headerValue={"..."}
        bodyValue={"..."}
      />
    );
  }
  return (
    <>
      <StatsCard
        icon={""}
        title={"Armazenamento"}
        headerValue={disk.usedPercent.toFixed(0) + "%"}
        bodyValue={disk.used.toString() + " Gb"}
        bodyDetails={"Livre: " + disk.free.toString() + " Gb"}
      />
    </>
  );
}
