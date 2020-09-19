import React from "react";
import "./HomePageDesign.css";
import CopyrightImg from "../images/copyright.png";

function MiddlePart() {
  return (
    <div className="container-fluid">
      <div className="row" id="middlediv"></div>
      <div className="row justify-content-center" id="quotediv">
        <h6 className="justify-content-center mt-3 ml-5">
          জ্ঞান যেখানে সীমাবদ্ধ, বুদ্ধি যেখানে আড়ষ্ট, মুক্তি সেখানে অসম্ভব--
          জাতীয় কবি কাজী নজরুল ইসলাম
        </h6>
        <p id="mywritting">
          Day by day copying tendency among students is growing so if it can't
          be stopped then young generation will loose their creativity
        </p>
        <div
          style={{ fontFamily: "Lobster", fontSize: "20px", color: "#267871" }}
        >
          Copyright
          <img src={CopyrightImg} alt="Copyright" width="20" />
          2020
        </div>
      </div>
    </div>
  );
}

export default MiddlePart;
