import React from "react";
import "./HomePageDesign.css";
import PlagiarismImg from "../images/plagiarism1.PNG";
import { NavLink } from "react-router-dom";

function NavbarWithVector() {
  return (
    <div className="container-fluid" id="HomeVector">
      <div className="row justify-content-center">
        <img
          className="navbar-brand"
          width="200px"
          height="75px"
          src={PlagiarismImg}
          alt="App Logo"
        />
      </div>

      <div className="row justify-content-center">
        <NavLink className="myNavBar" to="/">
          Home
        </NavLink>
        <NavLink className="myNavBar" to="/offline">
          OfflineCheck
        </NavLink>
        <NavLink className="myNavBar" to="/online">
          OnlineCheck
        </NavLink>
      </div>
    </div>
  );
}

export default NavbarWithVector;
