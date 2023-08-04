import React from "react";
import "./Loader.css"

const Loader = ({ color }) => {
  return (
    <div className="lds-ellipsis">
      <div style={{ background: `${color}`}}></div>
      <div style={{ background: `${color}`}}></div>
      <div style={{ background: `${color}`}}></div>
      <div style={{ background: `${color}`}}></div>
    </div>
  );
};

export default Loader;
