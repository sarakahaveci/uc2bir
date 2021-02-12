import { combineReducers } from 'redux';

import auth from '../reducers/authReducer';
import profile from '../reducers/profileReducer';
import stepOne from '../reducers/stepOneReducer';
import stepTwo from '../reducers/stepTwoReducer';
import stepThree from '../reducers/stepThreeReducer';
import stepFour from '../reducers/stepFourReducer';
import registerData from '../reducers/registerDataReducer';
import forgotPassword from '../reducers/forgotPaswword';
import resetPassword from '../reducers/resetPassword';

const reducers = combineReducers({
  auth,
  profile,
  stepOne,
  stepTwo,
  stepThree,
  stepFour,
  registerData,
  forgotPassword,
  resetPassword,
});

export default reducers;
