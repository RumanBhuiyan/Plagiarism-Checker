import React from "react";
import "./OnlinePageDesign.css";
import OnlineMidVector from "../images/plagiarism6.jpg";

function OnlinePageForm() {
  return (
    <div className="container-fluid overflow-hidden">
      <div className="row">
        <div className="col">
          <img src={OnlineMidVector} alt="mid" width="200" />
        </div>
        <div className="col">World</div>
      </div>
    </div>
  );
}

export default OnlinePageForm;
