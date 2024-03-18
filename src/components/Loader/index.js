import React from "react";
import "./loader.scss";

export default function Loader() {
  let loadOrbs = [];
  for (let i = 0; i < 20; i++)
    loadOrbs.push(<span style={{ "--i": i }} key={i}></span>);
  return (
    <aside id="loadScreen">
      <div className="loadRing">{loadOrbs}</div>
    </aside>
  );
}
