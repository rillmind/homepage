import ProgressBar from "../ProgressBar/ProgressBar";
import "./Memory.css";
import { useRam } from "./useRam";

export default function Memory() {
  const mem = useRam();

  if (mem === null) {
    return <h2>Carregando memoria...</h2>;
  }

  const memoriaUsadaPorcento = (mem.usadoGB / mem.totalGB) * 100;
  const memoriaTotalArredondada = mem.totalGB + 1;

  return (
    <div className="memoryContainer">
      <div className="memoryHeader">
        <div className="memoryLogoName">
          <div className="memoryLogo"></div>
          <div className="memoryName">Memory</div>
        </div>

        <div className="porcent">{memoriaUsadaPorcento.toFixed(0)}%</div>
      </div>

      <div className="memoryBody">
        <h2>{mem.usadoGB.toFixed(1)}Gb</h2>
        <h6>de {memoriaTotalArredondada.toFixed(0)}</h6>
      </div>

      <div className="memoryFooter">
        <ProgressBar value={memoriaUsadaPorcento} max={100} />
      </div>
    </div>
  );
}
