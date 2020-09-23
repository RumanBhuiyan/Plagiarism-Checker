import React from "react";
import "./OnlinePageDesign.css";
import { NavLink } from "react-router-dom";

function OnlinePageVector() {
  return (
    <div className="container-fluid" id="offline">
      <div className="row justify-content-center" id="vectordiv">
        <NavLink className="offlineLink" to="/">
          HomePage
        </NavLink>
        <NavLink className="offlineLink" to="/offline">
          OfflineCheck
        </NavLink>
      </div>
    </div>
  );
}

export default OnlinePageVector;
