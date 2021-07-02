import {createStore} from "redux";
import reducer from "../reducers/AuthReducer";

const store = createStore(reducer);

export default store;