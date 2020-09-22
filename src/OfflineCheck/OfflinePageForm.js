import React from "react";
import "./OfflinePageDesign.css";
import CopyrightImg from "../images/copyright.png";
import FileIcon from "../images/fileIcon.png";
import { useHistory } from "react-router-dom";

function OfflinePageForm() {
  const history = useHistory();

  return (
    <div className="overflow-hidden">
      <div className="container-fluid overflow-hidden" id="offlineDiv">
        <div className="row justify-content-center" id="onlineForm">
          <textarea
            className="form-control  text-center"
            rows="5"
            cols="3"
            spellCheck={false}
            placeholder="Upload .txt , .docx,.pdf files"
          ></textarea>
          <button type="file" className="myBtn">
            <img src={FileIcon} alt="file" width="20" />
            <input
              title=" "
              type="file"
              placeholder="Upload File"
              name="myFiles"
              multiple
            />
          </button>
          <button
            className="myBtn"
            onClick={() => history.push("/offlinechart")}
          >
            Check Plagiarism
          </button>
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

export default OfflinePageForm;
