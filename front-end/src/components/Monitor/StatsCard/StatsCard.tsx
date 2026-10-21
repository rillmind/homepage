import "./StatsCard.css";
import ProgressBar from "../ProgressBar/ProgressBar";

type StatsProps = {
  icon: string;
  title: string;
  percent: string;
  value: string;
  details?: string;
};
export default function StatsCard({
  icon,
  title,
  percent,
  value,
  details,
}: StatsProps) {
  return (
    <div className="statsCard">
      <div className="statsHeader">
        <div className="statsLogoName">
          <div className="statsLogo color">{icon}</div>
          <div className="statsName">{title}</div>
        </div>

        <div className="porcent">{parseFloat(percent).toFixed(0)}%</div>
      </div>

      <div className="statsBody">
        <h2>{value}</h2>
        <h6>{details}</h6>
      </div>

      <div className="statsFooter">
        <ProgressBar value={parseFloat(percent)} max={100} />
      </div>
    </div>
  );
}
