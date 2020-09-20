import React from "react";
import "./OfflinePageDesign.css";
import { NavLink } from "react-router-dom";

function OfflineVectorWithNav() {
  return (
    <div className="container-fluid" id="online">
      <div className="row justify-content-center" id="offlinevectordiv">
        <NavLink className="offlineLink" to="/">
          HomePage
        </NavLink>
        <NavLink className="offlineLink" to="/online">
          OnlineCheck
        </NavLink>
      </div>
    </div>
  );
}

export default OfflineVectorWithNav;
