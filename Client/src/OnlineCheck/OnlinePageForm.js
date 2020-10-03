/* eslint-disable */
import React from "react";
import "./OnlinePageDesign.css";
import CopyrightImg from "../images/copyright.png";
import FileIcon from "../images/fileIcon.png";
import { useHistory } from "react-router-dom";
import { MyContext } from "../index";
import axios from "axios";

function OnlinePageForm() {
  const history = useHistory();

  let { onlineLinks } = React.useContext(MyContext);

  const readFile = (event) => {
    let keepFile = event.currentTarget.files[0];
    let searchingText = "";
    if (keepFile.name.endsWith(".docx")) {
      let formdata = new FormData();
      formdata.append("file", keepFile);

      axios
        .post("http://localhost:3001/docx", formdata)
        .then((res) => {
          searchingText += res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (keepFile.name.endsWith(".pdf")) {
      let formdata = new FormData();
      formdata.append("file", keepFile);

      axios
        .post("http://localhost:3001/pdf", formdata)
        .then((res) => {
          searchingText += res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (keepFile.name.endsWith(".txt")) {
      let formdata = new FormData();
      formdata.append("file", keepFile);

      axios
        .post("http://localhost:3001/txt", formdata)
        .then((res) => {
          searchingText += res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let file = keepFile;
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.fileName = file.name;
      reader.onload = (event) => {
        searchingText += event.currentTarget.result;
      };
    }
    setTimeout(() => {
      let textarea = document.getElementById("onlineText");
      textarea.value = searchingText;
    }, 1000);
  };

  const sendQuery = () => {
    axios({
      method: "get",
      url: "http://localhost:3001/googleresponse",
      params: {
        text: document.getElementById("onlineText").value,
      },
    })
      .then((res) => {
        setTimeout(() => {
          onlineLinks = [...res.data];
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="overflow-hidden">
      <div className="container-fluid overflow-hidden" id="onlinediv">
        <div className="row justify-content-center" id="onlineForm">
          <textarea
            id="onlineText"
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
              name="myFile"
              onChange={(event) => readFile(event)}
            />
          </button>
          <button
            className="myBtn"
            onClick={() => {
              sendQuery();
              setTimeout(() => {
                history.push("/onlinechart");
              }, 2000);
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

export default OnlinePageForm;
