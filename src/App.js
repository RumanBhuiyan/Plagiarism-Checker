import React, { useState, useEffect } from "react";
import "./App.css";
import AllHomePageContent from "./HomePageContent/AllHomePageContent";
import Spinner from "./AppSpinner/Spinner";

function App() {
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 2000);
  }, []);

  return spinner ? (
    <Spinner />
  ) : (
    <div>
      <AllHomePageContent />
    </div>
  );
}

export default App;
