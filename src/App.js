import React, { useState, useEffect } from "react";
import "./App.css";
import AllHomePageContent from "./HomePageContent/AllHomePageContent";
import Spinner from "./AppSpinner/Spinner";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import OfflineMainPage from "./OfflineCheck/OfflineMain";
import OnlineMainPage from "./OnlineCheck/OnlineCheck";

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
    <BrowserRouter>
      <Switch>
        <Route path="/offline">
          <OfflineMainPage />
        </Route>
        <Route path="/online">
          <OnlineMainPage />
        </Route>
        <Route path="/*">
          <AllHomePageContent />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
