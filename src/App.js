import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ACTIONS} from './redux/ActionEnums';
import store from "./redux/store/store"
import {addUser} from "./redux/reducers/appReducer";

console.log(ACTIONS.ADD);

function App() {

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
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={}/> */}
      </Switch>
    </BrowserRouter>
    );
}

export default App;
