/* eslint-disable */
import React, { useEffect } from "react";
import { MyContext } from "../index";
import { useHistory } from "react-router-dom";
import Chart from "chart.js";
import randomcolor from "randomcolor";

let individualCanvases = [];
function OfflineChart() {
  let history = useHistory();
  const {
    filesNames,
    encodedKeyValues,
    graphData,
    averagePieData,
    allFilesPieData,
  } = React.useContext(MyContext);

  // console.log(filesNames);
  // console.log(encodedKeyValues);
  // console.log(graphData);
  // console.log(averagePieData);
  //console.log(allFilesPieData);

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
          text:
            "Average Percentage of Plagiarism among all files in Bar Diagram",
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
    // Individuals pie charts
    // setTimeout(() => {
    //   for (let i = 0; i < allFilesPieData.length; i++) {
    //     let xLabels = [];
    //     let yLabels = [];
    //     let copiedPart = "";
    //     for (let j = 0; j < allFilesPieData[i].length; j++) {
    //       xLabels.push(allFilesPieData[i][j].name);
    //       yLabels.push(allFilesPieData[i][j].similarity);
    //       copiedPart += ` ${allFilesPieData[i][j].name} : ${allFilesPieData[i][j].copiedpart} \n `;
    //     }
    //     individualCanvases.push(
    //       <div className="container-fluid justify-content-center">
    //         <canvas id={filesNames[i]}></canvas>
    //         <button onClick={() => handleClick(`${filesNames[i]}+copy`)}>
    //           Show CopiedPart
    //         </button>
    //         <div id={`${filesNames[i]}+copy`}>{copiedPart}</div>
    //       </div>
    //     );

    //     let myInterval = setInterval(() => {
    //       if (document.getElementById(filesNames[i]) !== null) {
    //         let eachContext = document
    //           .getElementById(filesNames[i])
    //           .getContext("2d");
    //         let eachpiechart = new Chart(eachContext, {
    //           type: "pie",
    //           data: {
    //             labels: xLabels,
    //             datasets: [
    //               {
    //                 data: yLabels,
    //                 backgroundColor: ["red", "blue", "orange", "green", "pink"],
    //               },
    //             ],
    //           },
    //           options: {
    //             title: {
    //               display: true,
    //               text: filesNames[i],
    //               fontFamily: "Lobster",
    //               fontSize: 25,
    //               fontColor: "#c31432",
    //             },
    //           },
    //         });
    //         clearInterval(myInterval);
    //       }
    //     }, 500);
    //   }
    // }, 2000);
  }, []);

  const handleClick = (id) => {
    let mydiv = document.getElementById(id);
    if (mydiv.style.display === "none") {
      mydiv.style.display = "block";
    } else {
      mydiv.style.display = "none";
    }
  };

  return (
    <div>
      <div className="container-fluid bg-dark offlineNavDiv">
        <button onClick={() => history.push("/offline")}>Go Back</button>
        <button onClick={() => history.push("/")}>Home</button>
        <button onClick={() => history.push("/online")}>OnlineCheck</button>
      </div>
      <canvas id="globalChart" style={{ backgroundColor: "#3345" }}></canvas>
      <canvas id="barChart" style={{ backgroundColor: "#3345" }}></canvas>
      {/* individuals pie charts  */}
      {filesNames.map((item) => {
        return (
          <div className="container-fluid justify-content-center individualDiv">
            <canvas id={item}></canvas>
            <div className="row justify-content-center text-center">
              <button onClick={() => handleClick(`${item}+copytext`)}>
                Show CopiedPart
              </button>
            </div>
            <div className="copydiv" id={`${item}+copytext`}>
              hello
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OfflineChart;
