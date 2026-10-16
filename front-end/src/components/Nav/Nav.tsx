import "./Nav.css";
import { useDatetime } from "./useDatetime";

export default function Nav() {
  const datetime = useDatetime();

  if (datetime === null) {
    return <>aí é foda bicho</>;
  }

  return (
    <main>
      <div id="logoName">
        <div id="logo"> </div> <div id="name">Server Homepage</div>
      </div>

      <div id="status">
        <div id="ping"> </div>
        <div id="ip">100.74.171.65</div> <div id="uptime">Uptime: 15d 7h</div>
      </div>

      <div id="datetime">
        {datetime.date} {datetime.time}
      </div>

      <div id="search">Quick search</div>

      <div id="configuration"> Configurações</div>

      <div id="profile"> </div>
    </main>
  );
}
