// @ts-nocheck
import { combineReducers } from 'redux';

import counterReducers from './reducers/counter'; //this example
import jsonplaceholder from './reducers/json-placeholder/action/actions'; //this example redux

import loginReducers from './reducers/login/action/actions';
import registerStepOne from './reducers/register-step-1/action/actions';
import registerStepTwo from './reducers/register-step-2/action/actions';
import actionSearchButton from './reducers/search';
import actionLeftBar from './reducers/hamberger';
import verifty from './reducers/verifty/action/actions';
import quiz from './reducers/quiz/action/actions';
import auth from '../reducers/authReducer';

const reducers = combineReducers({
  auth,
  counterReducers,
  jsonplaceholder,
  loginReducers,
  registerStepOne,
  registerStepTwo,
  actionSearchButton,
  actionLeftBar,
  verifty,
  quiz,
});

export default reducers;
