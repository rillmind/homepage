import { usePolling } from "../Monitor/StatsCard/getStats";
import "./Nav.css";
import { useDatetime } from "./useDatetime";

type Uptime = { uptime: number };

export default function Nav() {
  const datetime = useDatetime();
  const uptime = usePolling<Uptime>("http://localhost:2306/uptime/info/");

  if (datetime === null || uptime === null) {
    return (
      <div className="navbarContainer">
        <div className="logoName">
          <div className="logo"> </div>{" "}
          <div className="name">Server Homepage</div>
        </div>

        <div className="status">
          <div className="ping"> </div>
          <div className="ip">100.74.171.65</div>{" "}
          <div className="uptime">Uptime: null...</div>
        </div>

        <div className="datetime">
          <div className="clock"> </div>
          <div className="text">Datetime: null...</div>
        </div>

        <div className="quickSearch">
          <div className="lupa"> </div>
          <div className="search">Quick search</div>
        </div>

        <div className="configuration">
          <div className="icon"> </div>{" "}
          <div className="display">Configurações</div>
        </div>

        <div className="profile"> </div>
      </div>
    );
  }

  let UpTime = "";

  if (uptime.uptime < 60) {
    UpTime = uptime.uptime.toFixed(0).replace(".", ",") + "s";
  } else if (uptime.uptime >= 60 && uptime.uptime <= 3599) {
    UpTime = (uptime.uptime / 60).toFixed(0).replace(".", ",") + "min"; // minutos
  } else if (uptime.uptime >= 3600 && uptime.uptime <= 86399) {
    UpTime = (uptime.uptime / 3600).toFixed(0).replace(".", ",") + "h"; // horas
  } else if (uptime.uptime >= 86400 && uptime.uptime <= 2591999) {
    UpTime = (uptime.uptime / 86400).toFixed(0).replace(".", ",") + "d"; // dias
  } else if (uptime.uptime >= 2592000 && uptime.uptime <= 5183999) {
    UpTime = (uptime.uptime / 2592000).toFixed(0).replace(".", ",") + "mês"; // meses
  } else if (uptime.uptime >= 5184000) {
    UpTime = (uptime.uptime / 2592000).toFixed(0).replace(".", ",") + "meses"; // meses
  }

  return (
    <div className="navbarContainer">
      <div className="logoName">
        <div className="logo"> </div>{" "}
        <div className="name">Server Homepage</div>
      </div>

      <div className="status">
        <div className="ping">󰀃 </div>
        <div className="ip">100.74.171.65</div>{" "}
        <div className="uptime">Uptime: {UpTime}</div>
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

      <div className="configuration">
        <div className="icon"> </div>{" "}
        <div className="display">Configurações</div>
      </div>

      <div className="profile"> </div>
    </div>
  );
}
