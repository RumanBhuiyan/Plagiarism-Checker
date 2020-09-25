/* eslint-disable */
//removes warnings of defined but never used
import React, { useState, useEffect } from "react";
import "./OfflinePageDesign.css";
import CopyrightImg from "../images/copyright.png";
import FileIcon from "../images/fileIcon.png";
import { useHistory } from "react-router-dom";
import { MyContext } from "../index";
import axios from "axios";
import voca from "voca";
import stringSimilarity from "string-similarity";

let keepFiles = [];
let filesData = [];
function OfflinePageForm() {
  const [filesthings, setFilethings] = useState("");
  const history = useHistory();

  const {
    filesNames,
    encodedKeyValues,
    graphData,
    averagePieData,
    allFilesPieData,
  } = React.useContext(MyContext);

  // useEffect(() => {
  //   console.log(filesthings.length);
  //   console.log(voca.words(filesthings));
  // }, [filesthings]);

  // let keep = "b";
  // let assign = 2;
  //below procedures  works fine
  //Object.assign(encodedKeyValues, { [keep]: assign });
  // encodedKeyValues[keep] = assign;

  // graphData.push(100);
  // averagePieData.push(200);
  // allFilesPieData.push(300);

  // const keepWord = (wordList) => {
  //   console.log(wordList.length);
  //   console.log(wordList);
  // };

  const readMyFiles = (event) => {
    let myFiles = event.currentTarget.files;
    keepFiles = myFiles;
    //Assigning Different values for different words in encodedKeyValues
    //firstly read all words from all files and assign them to a variable
    //secondly extract all words from that variable and take all unique words
    // to keep in encodedKeyValues[]

    //Reading All Words from all files and storing them to filesthings
    for (let i = 0; i < myFiles.length; i++) {
      let file = myFiles[i];
      if (file.name.endsWith(".docx")) {
        //creating file data to send back-end
        let formdata = new FormData();
        formdata.append("file", file);

        axios
          .post("http://localhost:3001/docx", formdata)
          .then((res) => {
            setFilethings((filesthings) => filesthings + " " + res.data);
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
            setFilethings((filesthings) => filesthings + " " + res.data);
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
          setFilethings(
            (filesthings) => filesthings + " " + event.currentTarget.result
          );
        };
      }
    }
    //Extracting all words from filesthings using voca

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

  const AssignOtherValues = () => {
    //extracting all words and assigning only unique words to encodedKeyValues
    setFilethings(filesthings.toLocaleLowerCase());
    let allWords = voca.words(filesthings);
    for (let i = 0; i < allWords.length; i++) {
      if (encodedKeyValues.indexOf(allWords[i]) === -1) {
        encodedKeyValues.push(allWords[i]);
      }
    }
    // Read files and stores words value in graphData[]
    for (let i = 0; i < keepFiles.length; i++) {
      let file = keepFiles[i];
      if (file.name.endsWith(".docx")) {
        //creating file data to send back-end
        let formdata = new FormData();
        formdata.append("file", file);

        axios
          .post("http://localhost:3001/docx", formdata)
          .then((res) => {
            filesData.push({ name: file.name, content: res.data });

            let words = voca.words(res.data);
            let keepValues = [];
            for (let i = 0; i < words.length; i++) {
              keepValues.push(encodedKeyValues.indexOf(words[i]));
            }
            graphData.push(keepValues);
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
            filesData.push({ name: file.name, content: res.data });

            let words = voca.words(res.data);
            let keepValues = [];
            for (let i = 0; i < words.length; i++) {
              keepValues.push(encodedKeyValues.indexOf(words[i]));
            }
            graphData.push(keepValues);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        //the file might be .txt or code files
        let file = keepFiles[i];
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.fileName = file.name;
        reader.onload = (event) => {
          filesData.push({
            name: file.name,
            content: event.currentTarget.result,
          });

          let words = voca.words(event.currentTarget.result);
          let keepValues = [];
          for (let i = 0; i < words.length; i++) {
            keepValues.push(encodedKeyValues.indexOf(words[i]));
          }
          graphData.push(keepValues);
        };
      }
    }
    //All Files Pie Data insertion
    //immediately codes below dont work but in this way everything works fine
    let copied = "";
    setTimeout(() => {
      for (let i = 0; i < filesData.length; i++) {
        let keepSimilarity = 0;
        let eachFileData = [];
        for (let j = 0; j < filesData.length; j++) {
          if (filesData[i].name !== filesData[j].name) {
            keepSimilarity += stringSimilarity.compareTwoStrings(
              filesData[i].content,
              filesData[j].content
            );
            axios({
              method: "post",
              url: "http://localhost:3001/diffwords",
              data: {
                content1: filesData[i].content,
                content2: filesData[j].content,
              },
            })
              .then((res) => {
                //console.log(res.data);
                copied = res.data;
                //console.log("hey");
              })
              .catch((error) => {
                console.log(error);
              });
            setTimeout(() => {
              eachFileData.push({
                name: filesData[j].name,
                similarity:
                  stringSimilarity
                    .compareTwoStrings(
                      filesData[i].content,
                      filesData[j].content
                    )
                    .toFixed(4) * 100,
                copiedpart: copied,
              });
            }, 1000);
          }
        }
        allFilesPieData.push(eachFileData);
        averagePieData.push(
          (keepSimilarity / filesData.length).toFixed(4) * 100
        );
      }
    }, 1000);
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
              AssignOtherValues();
              setTimeout(() => {
                history.push("/offlinechart");
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

export default OfflinePageForm;
