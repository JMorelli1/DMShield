import {createStore} from "redux";
import reducer from "../reducers/appReducer";

const store = createStore(reducer);

export default store;