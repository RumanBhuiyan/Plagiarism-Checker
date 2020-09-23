import React from "react";
import "./spinner.css";
import MySpinner from "../images/spinner.gif";

function Spinner() {
  return (
    <div className="loaderdiv">
      <img className="loader" src={MySpinner} alt="MySpinner" />
    </div>
  );
}

export default Spinner;
