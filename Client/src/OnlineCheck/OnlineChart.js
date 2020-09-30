/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import voca from "voca";
import axios from "axios";

function OnlineChart() {
  const [storeLinks, setStoreLinks] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/getlinks",
    })
      .then((res) => {
        setTimeout(() => {
          setStoreLinks(res.data);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const collapseButton = () => {
    var accordions = document.getElementsByClassName("accordion");
    for (let i = 0; i < accordions.length; i++) {
      accordions[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  };

  const handleCopyClick = (divname, querytext, link) => {
    axios({
      method: "get",
      url: "http://localhost:3001/searchonline",
      params: {
        searchingText: querytext,
        searchingLink: link,
      },
    })
      .then((res) => {
        setTimeout(() => {
          document.getElementById(divname).textContent = res.data;
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let history = useHistory();

  return (
    <div className="overflow-hidden">
      <div className="container-fluid bg-dark onlineNavDiv">
        <button onClick={() => history.push("/online")}>Go Back</button>
        <button onClick={() => history.push("/")}>Home</button>
        <button onClick={() => history.push("/offline")}>OfflineCheck</button>
      </div>

      {/* Accordions for all copied hyperlinks */}
      <div>
        {storeLinks.map((item, index) => {
          if (!item.includes("https")) {
            return;
          }
          return (
            <div
              key={index}
              className="row justify-content-center text-center overflow-hidden"
            >
              <button className="accordion" onClick={() => collapseButton()}>
                Plagiarised
                <span className="badge">{index + 1}</span>
              </button>
              <div className="panel">
                <a target={"_blank"} href={item}>
                  {item}
                </a>
                <div
                  id={`${index}+'copy'`}
                  style={{ color: "aliceblue", fontFamily: "Monaco" }}
                ></div>
                <div className="row justify-content-center text-center">
                  <button
                    onClick={() =>
                      handleCopyClick(
                        `${index}+'copy'`,
                        storeLinks[storeLinks.length - 1],
                        item
                      )
                    }
                  >
                    Copied Part
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OnlineChart;
