import React from "react";
import { MyContext } from "../index";

function OfflineChart() {
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
      <h1>Offline Chart </h1>
    </div>
  );
}

export default OfflineChart;
