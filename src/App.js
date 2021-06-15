import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ACTIONS} from './redux/ActionEnums';
import store from "./redux/store/store"
import {addUser} from "./redux/reducers/appReducer";
import EncounterTracker from './containers/EncounterTracker/EncounterTracker';
import About from './containers/About';
import Layout from "antd/lib/layout/layout";
import Home from "./containers/Home/Home";

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
    <Layout className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/encounters" component={EncounterTracker}/>
      </Switch>
    </BrowserRouter>
    </Layout>
    );
}

export default App;
