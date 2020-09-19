import React from "react";
import "./HomePageDesign.css";
import PlagiarismImg from "../images/plagiarism1.PNG";

function NavbarWithVector() {
  return (
    <div className="container-fluid" id="HomeVector">
      <div className="row justify-content-center">
        {/* <div className="col-5"> */}
        <img
          className="navbar-brand"
          width="200px"
          height="75px"
          src={PlagiarismImg}
          alt="App Logo"
        />
      </div>
      {/* </div> */}
      <div className="row justify-content-center">
        <a className="myNavBar" href="/">
          Home
        </a>
        <a className="myNavBar" href="/offline">
          OfflineCheck
        </a>
        <a className="myNavBar" href="/online">
          OnlineCheck
        </a>
      </div>
    </div>
  );
}

export default NavbarWithVector;
