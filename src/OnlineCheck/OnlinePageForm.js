import React from "react";
import "./OnlinePageDesign.css";
import CopyrightImg from "../images/copyright.png";
import FileIcon from "../images/fileIcon.png";

function OnlinePageForm() {
  return (
    <div className="overflow-hidden">
      <div className="container-fluid overflow-hidden" id="onlinediv">
        <div className="row justify-content-center" id="onlineForm">
          <textarea
            className="form-control  text-center"
            rows="5"
            cols="3"
            spellCheck={false}
            placeholder="Enter Text or upload a Single .txt , .docx,.pdf file"
          ></textarea>
          <button type="file" className="myBtn">
            <img src={FileIcon} alt="file" width="20" />
            <input
              title=" "
              type="file"
              placeholder="Upload File"
              name="myFiles"
            />
          </button>
          <button className="myBtn">Check Plagiarism</button>
        </div>
      </div>
      <div
        style={{
          fontFamily: "Lobster",
          fontSize: "20px",
          color: "#267871",
          backgroundColor: "#222831",
          overflow: "hidden",
        }}
        className="row justify-content-center"
      >
        Copyright
        <img src={CopyrightImg} alt="Copyright" width="20" />
        2020
      </div>
    </div>
  );
}

export default OnlinePageForm;
