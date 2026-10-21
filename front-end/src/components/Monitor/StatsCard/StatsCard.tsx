import "./StatsCard.css";
import ProgressBar from "../ProgressBar/ProgressBar";

type StatsProps = {
  icon: string;
  title: string;
  headerValue: string;
  bodyValue: string;
  bodyDetails?: string;
};
export default function StatsCard({
  icon,
  title,
  headerValue,
  bodyValue,
  bodyDetails,
}: StatsProps) {
  return (
    <div className="statsCard">
      <div className="statsHeader">
        <div className="statsLogoName">
          <div className="statsLogo color">{icon}</div>
          <div className="statsName">{title}</div>
        </div>

        <div className="porcent">{parseFloat(headerValue).toFixed(0)}%</div>
      </div>

      <div className="statsBody">
        <h2>{bodyValue}</h2>
        <h6>{bodyDetails}</h6>
      </div>

      <div className="statsFooter">
        <ProgressBar value={parseFloat(headerValue)} max={100} />
      </div>
    </div>
  );
}
