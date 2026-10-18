import "./Nav.css";
import { useDatetime } from "./useDatetime";

export default function Nav() {
  const datetime = useDatetime();

  if (datetime === null) {
    return <>aí é foda bicho</>;
  }

  return (
    <div className="navbarContainer">
      <div className="logoName">
        <div className="logo"> </div> <div className="name">Server Homepage</div>
      </div>

      <div className="status">
        <div className="ping"> </div>
        <div className="ip">100.74.171.65</div> <div className="uptime">Uptime: 15d 7h</div>
      </div>

      <div className="datetime">
        <div className="clock"> </div>
        <div className="text">
          {datetime.date} {datetime.time}
        </div>
      </div>

      <div className="quickSearch">
        <div className="lupa"> </div>
        <div className="search">Quick search</div>
      </div>

      <div className="configuration"> Configurações</div>

      <div className="profile"> </div>
    </div>
  );
}
