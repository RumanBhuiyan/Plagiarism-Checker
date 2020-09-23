import React from "react";
import "./OfflinePageDesign.css";
import CopyrightImg from "../images/copyright.png";
import FileIcon from "../images/fileIcon.png";
import { useHistory } from "react-router-dom";
import { MyContext } from "../index";
import axios from "axios";

function OfflinePageForm() {
  const history = useHistory();

  const {
    filesNames,
    encodedKeyValues,
    graphData,
    averagePieData,
    allFilesPieData,
  } = React.useContext(MyContext);

  // let keep = "b";
  // let assign = 2;
  //below procedures  works fine
  //Object.assign(encodedKeyValues, { [keep]: assign });
  // encodedKeyValues[keep] = assign;

  // graphData.push(100);
  // averagePieData.push(200);
  // allFilesPieData.push(300);

  const readMyFiles = (event) => {
    let myFiles = event.currentTarget.files;

    //Assigning Different values for different words in encodedKeyValues
    for (let i = 0; i < myFiles.length; i++) {
      let file = myFiles[i];
      let fileContent = "";
      if (file.name.endsWith(".docx")) {
        //creating file data to send back-end
        let formdata = new FormData();
        formdata.append("file", file);

        axios
          .post("http://localhost:3001/docx", formdata)
          .then((res) => {
            fileContent = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (file.name.endsWith(".pdf")) {
        let formdata = new FormData();
        formdata.append("file", file);

        axios
          .post("http://localhost:3001/pdf", formdata)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        //the file might be .txt or code files
        let file = myFiles[i];
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.fileName = file.name;
        reader.onload = (event) => {
          fileContent = event.currentTarget.result;
          console.log(fileContent);
        };
      }
    }
    //using encodedKeyValues object place all y values of graph in graphData[]

    //two nested for loop to assign values like [[{},{}],[{},{}]]
    //[[{filename:'',plagiarisedPercentage:'',copiedPortion:''}]]
    //after completing one file pus average copied portion in averagePieData[]

    //Collecting files names into an array
    for (let i = 0; i < myFiles.length; i++) {
      let file = myFiles[i];
      filesNames.push(file.name);
    }
    //combining filenames into one string
    let combineAllNames = "";
    for (let i = 0; i < filesNames.length; i++) {
      combineAllNames += i + 1 + ". " + filesNames[i] + "\n";
    }
    //Displaying all file names in text-area field
    let keep = document.getElementById("offlineTextArea");
    keep.placeholder = combineAllNames;
  };

  return (
    <div className="overflow-hidden">
      <div className="container-fluid overflow-hidden" id="offlineDiv">
        <div className="row justify-content-center" id="onlineForm">
          <textarea
            id="offlineTextArea"
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
              onChange={(event) => readMyFiles(event)}
              multiple
            />
          </button>
          <button
            className="myBtn"
            onClick={() => {
              history.push("/offlinechart");
            }}
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
