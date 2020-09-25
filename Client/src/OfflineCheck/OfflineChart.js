import React from "react";
import { MyContext } from "../index";
import { useHistory } from "react-router-dom";

function OfflineChart() {
  let history = useHistory();
  const {
    filesNames,
    encodedKeyValues,
    graphData,
    averagePieData,
    allFilesPieData,
  } = React.useContext(MyContext);

  console.log(filesNames);
  console.log(encodedKeyValues);
  console.log(graphData);
  console.log(averagePieData);
  console.log(allFilesPieData);

  return (
    <div>
      <div className="container-fluid bg-dark offlineNavDiv">
        <button onClick={() => history.push("/offline")}>Go Back</button>
        <button onClick={() => history.push("/")}>Home</button>
        <button onClick={() => history.push("/online")}>OnlineCheck</button>
      </div>
    </div>
  );
}

export default OfflineChart;
