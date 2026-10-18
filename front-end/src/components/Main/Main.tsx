import "./Main.css";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Monitor from "../Monitor/Monitor";

export default function Main() {
  const [selected, setSelected] = useState("Overview");

  return (
    <div className="mainContainer">
      <Sidebar selected={selected} onSelect={setSelected} />

      <main>
        <Monitor />

        <div className="serviceContainer">
          <div className="toolbar"></div>

          <div className="services"></div>
        </div>
      </main>
    </div>
  );
}
