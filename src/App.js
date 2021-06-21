import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EncounterTracker from "./containers/EncounterTracker/EncounterTracker";
import Layout from "antd/lib/layout/layout";
import Home from "./containers/Home/Home";
import EncounterView from "./containers/EncounterView/EncounterView";
import "./App.css";
import EncounterGenerator from "./containers/EncounterTracker/EncounterGenerator/EncounterGenerator";

const App = () => {
  return (
    <Layout className="app">
      <div className="app-main-layout">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/generator" component={EncounterGenerator} />
            <Route exact path="/encounterView" component={EncounterView} />
            {/* <Route exact path="/login" component={Login}/> */}
            <Route exact path="/encounters" component={EncounterTracker} />
          </Switch>
        </BrowserRouter>
      </div>
    </Layout>
  );
};

export default App;
