import React, { useEffect } from "react";
import "./OfflinePageDesign.css";
import OfflinePageVector from "./OfflineVectorWithNav";
import OfflinePageForm from "./OfflinePageForm";
import gsap from "gsap";

function OfflineMain() {
  useEffect(() => {
    setTimeout(async () => {
      await gsap.from(".offline", { marginTop: -200, opacity: 0, duration: 1 });
      window.scrollTo({
        top: 1200,
        behavior: "smooth",
      });
    });
  }, []);

  return (
    <div className="offline">
      <OfflinePageVector />
      <OfflinePageForm />
    </div>
  );
}

export default OfflineMain;
