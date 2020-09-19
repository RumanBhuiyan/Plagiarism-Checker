import React, { useEffect } from "react";
import NavbarWithVector from "./NavbarWithVector";
import gsap from "gsap";

function AllHomePageContent() {
  useEffect(() => {
    gsap.from(".vectordiv", { marginTop: -200, opacity: 0, duration: 1 });
  }, []);

  return (
    <div className="vectordiv">
      <NavbarWithVector />
    </div>
  );
}

export default AllHomePageContent;
