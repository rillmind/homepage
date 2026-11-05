import Cpu from "./Cpu/Cpu";
import Disk from "./Disk/Disk";
import Memory from "./Memory/Memory";
import "./Monitor.css";

export default function Monitor() {
  return (
    <div className="monitorContainer">
      <div className="monitorItem">
        <Cpu />
      </div>
      <div className="monitorItem">
        <Memory />
      </div>
      <div className="monitorItem">
        <Disk />
      </div>
      {/*<div className="monitorItem">j</div>
      <div className="monitorItem">j</div>
      <div className="monitorItem">j</div>
      <div className="monitorItem">j</div>*/}
    </div>
  );
}
