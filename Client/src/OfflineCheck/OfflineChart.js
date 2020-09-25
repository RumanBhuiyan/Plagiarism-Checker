/* eslint-disable */
import React, { useEffect } from "react";
import { MyContext } from "../index";
import { useHistory } from "react-router-dom";
import Chart from "chart.js";
import randomcolor from "randomcolor";

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

  useEffect(() => {
    let graphDatasets = [];
    for (let i = 0; i < filesNames.length; i++) {
      let mydata = [];
      for (let j = 0; j < graphData[i].length; j++) {
        mydata.push({ x: j + 1, y: graphData[i][j] });
      }
      graphDatasets.push({
        label: filesNames[i],
        data: mydata,
        showLine: true,
        fill: true,
        backgroundColor: randomcolor(),
        borderColor: "rgba(0, 200, 0, 1)",
      });
    }

    var ctx = document.getElementById("globalChart");
    var myChart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: graphDatasets,
      },
      options: {
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, []);

  return (
    <div>
      <div className="container-fluid bg-dark offlineNavDiv">
        <button onClick={() => history.push("/offline")}>Go Back</button>
        <button onClick={() => history.push("/")}>Home</button>
        <button onClick={() => history.push("/online")}>OnlineCheck</button>
      </div>
      <canvas id="globalChart"></canvas>
    </div>
  );
}

export default OfflineChart;
