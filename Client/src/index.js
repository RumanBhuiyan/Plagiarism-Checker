import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

export const MyContext = React.createContext();
const MyProvider = MyContext.Provider;
//const MyConsumer = MyContext.Consumer;

let filesNames = [];
let encodedKeyValues = { a: 1 };
let graphData = [1, 2];
let averagePieData = [3, 4];
let allFilesPieData = [5, 6];

ReactDOM.render(
  <MyProvider
    value={{
      filesNames,
      encodedKeyValues,
      graphData,
      averagePieData,
      allFilesPieData,
    }}
  >
    <App />
  </MyProvider>,
  document.getElementById("root")
);

// Online bangle type : https://avro.im/

//Reading Multiple Files in javascript stackoverflow link
//https://stackoverflow.com/questions/13975031/reading-multiple-files-with-javascript-filereader-api-one-at-a-time
