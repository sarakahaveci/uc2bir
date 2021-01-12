import {combineReducers} from "redux";

import counterReducers from "./reducers/counter"; //this example
import jsonplaceholder from "./reducers/json-placeholder/action/actions"; //this example redux

import loginReducers from "./reducers/login/action/actions";

const reducers = combineReducers({
    counterReducers,
    jsonplaceholder,
    loginReducers
});
  
export default reducers;