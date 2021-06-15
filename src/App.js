import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ACTIONS} from './redux/ActionEnums';
import store from "./redux/store/Store"
import {addUser} from "./redux/reducers/appReducer";
import EncounterTracker from './containers/EncounterTracker/EncounterTracker';
import Layout from "antd/lib/layout/layout";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import "./App.css"

const App = () => {

  store.dispatch({
    type: ACTIONS.ADD,
    payload:{
      userData: {
        property: "Hello"
      }
    }
  })

  console.log(store.getState());

  store.dispatch(addUser())
  console.log(store.getState());

  return (
    <Layout className="app">
      <div className="app-main-layout">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/encounters" component={EncounterTracker}/>
          </Switch>
        </BrowserRouter>
      </div>
    </Layout>
    );
}

export default App;
