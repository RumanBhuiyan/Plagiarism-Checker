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
    Chart.defaults.global.elements.point.radius = 5;
    Chart.defaults.global.elements.point.hoverRadius = 8;

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
        title: {
          display: true,
          text: "All Files Graph",
          fontFamily: "Lobster",
          fontSize: 25,
          fontColor: "#c31432",
        },
        legend: {
          labels: {
            fontSize: 20,
            fontFamily: "Lobster",
          },
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

    //bar diargram
    let barGraphDataSets = [];
    for (let i = 0; i < filesNames.length; i++) {
      let mydata = [];
      mydata.push({ x: filesNames[i], y: averagePieData[i] });

      barGraphDataSets.push({
        label: filesNames[i],
        data: mydata,
        showLine: true,
        fill: true,
        backgroundColor: randomcolor(),
        borderColor: "rgba(0, 200, 0, 1)",
        maxBarThickness: 60,
      });
    }
    let barcontext = document.getElementById("barChart").getContext("2d");
    let barchart = new Chart(barcontext, {
      type: "bar",

      data: {
        datasets: barGraphDataSets,
      },
      options: {
        tooltips: {
          callbacks: {
            title: function (tooltipItems, data) {
              return "";
            },
          },
        },
        title: {
          display: true,
          text: "Percentage of Plagiarism in Bar Diagram",
          fontFamily: "Lobster",
          fontSize: 25,
          fontColor: "#c31432",
        },
        legend: {
          labels: {
            fontSize: 20,
            fontFamily: "Lobster",
          },
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
                max: 100,
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
      <canvas id="globalChart" style={{ backgroundColor: "#3345" }}></canvas>
      <canvas id="barChart" style={{ backgroundColor: "#3345" }}></canvas>
    </div>
  );
}

export default OfflineChart;
