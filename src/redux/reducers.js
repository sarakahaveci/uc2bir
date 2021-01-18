// @ts-nocheck
import {combineReducers} from "redux";

import counterReducers from "./reducers/counter"; //this example
import jsonplaceholder from "./reducers/json-placeholder/action/actions"; //this example redux

import loginReducers from "./reducers/login/action/actions";
import registerStepOne from './reducers/register-step-1/action/actions';
import registerStepTwo from './reducers/register-step-2/action/actions';

const reducers = combineReducers({
    counterReducers,
    jsonplaceholder,
    loginReducers,
    registerStepOne,
    registerStepTwo,
});
  
export default reducers;