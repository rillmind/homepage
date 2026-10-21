import "./ProgressBar.css";

type props = { value: number; max: number };

export default function ProgressBar({ value, max = 100 }: props) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress__fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
