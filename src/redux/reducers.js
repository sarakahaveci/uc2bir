import { combineReducers } from 'redux';

import auth from '../reducers/authReducer';
import profile from '../reducers/profileReducer';
import stepOne from '../reducers/stepOneReducer';
import stepTwo from '../reducers/stepTwoReducer';
import stepThree from '../reducers/stepThreeReducer';
import stepFour from '../reducers/stepFourReducer';
import quiz from '../reducers/quizReducer';

const reducers = combineReducers({
  auth,
  profile,
  stepOne,
  stepTwo,
  stepThree,
  stepFour,
  quiz,
});

export default reducers;
