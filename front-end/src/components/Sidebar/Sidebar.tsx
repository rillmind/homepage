import "./Sidebar.css";

type Props = { selected: string; onSelect: (name: string) => void };

export default function Sidebar({ selected, onSelect }: Props) {
  return (
    <ul className="sidebarContainer">
      {["Overview", "Network", "Server Logs"].map((name) => (
        <li
          key={name}
          className={`item ${selected === name ? "active" : ""}`}
          onClick={() => onSelect(name)}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
