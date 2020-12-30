import {combineReducers} from "redux";

import {counterReducers} from "./reducers/counter"; //this example

const reducers = combineReducers({
    counterReducers,
});
  
export default reducers;