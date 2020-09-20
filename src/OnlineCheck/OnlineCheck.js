import React, { useEffect } from "react";
import "./OnlinePageDesign.css";
import OnlinePageVector from "./OnlinePageVector";
import OnlinePageForm from "./OnlinePageForm";
import gsap from "gsap";

function OnlineCheck() {
  useEffect(() => {
    gsap.from(".online", { marginTop: -200, opacity: 0, duration: 1 });
  }, []);

  return (
    <div className="online">
      <OnlinePageVector />
      <OnlinePageForm />
    </div>
  );
}

export default OnlineCheck;
