import {
  LOGIN_SUCCESS,
  SOCIAL_LOGIN_SUCCESS,
  REGISTER_STEP_TWO_SUCCESS,
} from '../constants';
import { localStorage } from 'utils';

const syncLocalStorage = ({ dispatch, getState }) => {
  return (next) => (action) => {
    const returnValue = next(action);

    if (
      action.type === LOGIN_SUCCESS ||
      action.type === SOCIAL_LOGIN_SUCCESS ||
      action.type === REGISTER_STEP_TWO_SUCCESS
    ) {
      const { user, accessToken, refreshToken } = getState().auth;

      localStorage.set('auth', {
        user,
        accessToken,
        refreshToken,
      });
    }

    return returnValue;
  };
};

export default syncLocalStorage;
