/* eslint-disable */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MyContext } from "../index";
import voca from "voca";

function OnlineChart() {
  useEffect(() => {
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
  }, []);

  let history = useHistory();

  const { onlineLinks } = React.useContext(MyContext);
  console.log(onlineLinks);

  return (
    <div className="overflow-hidden">
      <div className="container-fluid bg-dark onlineNavDiv">
        <button onClick={() => history.push("/online")}>Go Back</button>
        <button onClick={() => history.push("/")}>Home</button>
        <button onClick={() => history.push("/offline")}>OfflineCheck</button>
      </div>

      {/* Accordions for all copied hyperlinks */}
      <div>
        {onlineLinks.map((item, index) => {
          return (
            <div
              key={index}
              className="row justify-content-center text-center overflow-hidden"
            >
              <button className="accordion">
                Plagiarised
                <span className="badge">
                  {(voca.words(copied).length / voca.words(content).length) *
                    100 +
                    "%"}
                </span>
              </button>
              <div className="panel">
                <a target={"_blank"} href={item.link}>
                  {item.link}
                </a>
                <div style={{ color: "aliceblue", fontFamily: "Monaco" }}>
                  Copied Content: {item.copied}
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
