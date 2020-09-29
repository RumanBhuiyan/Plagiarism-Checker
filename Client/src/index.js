import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

export const MyContext = React.createContext();
const MyProvider = MyContext.Provider;
//const MyConsumer = MyContext.Consumer;

let filesNames = [];
let encodedKeyValues = [];
let graphData = [];
let averagePieData = []; //array of objects
let allFilesPieData = []; //array of objects
let onlineLinks = [];

ReactDOM.render(
  <MyProvider
    value={{
      filesNames,
      encodedKeyValues,
      graphData,
      averagePieData,
      allFilesPieData,
      onlineLinks,
    }}
  >
    <App />
  </MyProvider>,
  document.getElementById("root")
);

// Online bangle type : https://avro.im/

//Reading Multiple Files in javascript stackoverflow link
//https://stackoverflow.com/questions/13975031/reading-multiple-files-with-javascript-filereader-api-one-at-a-time
