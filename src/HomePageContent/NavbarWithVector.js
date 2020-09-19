import React from "react";
import "./HomePageDesign.css";
import PlagiarismImg from "../images/plagiarism1.PNG";

function NavbarWithVector() {
  return (
    <div className="container-fluid" id="HomeVector">
      <div className="row">
        {/* vector under navbar  */}
        <div className="col-6 justify-content-center sticky-top">
          <img
            className="rounded-circle"
            width="200px"
            height="75px"
            src={PlagiarismImg}
            alt="Logo"
          />
        </div>
        <div className="col-6">
          {/* navbar of home page */}
          <ol id="mylist">
            <li className="float-left">Home</li>
            <li className="float-left">Home</li>
            <li className="float-left">Home</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default NavbarWithVector;
