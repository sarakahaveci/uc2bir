import {
  LOGIN_SUCCESS,
  SOCIAL_LOGIN_SUCCESS,
  REGISTER_STEP_TWO_SUCCESS,
  LOGOUT,
  RESET_PASSWORD,
} from '../constants';
import { localStorage } from 'utils';

const syncLocalStorage = ({ dispatch, getState }) => {
  return (next) => (action) => {
    const returnValue = next(action);

    if (
      action.type === LOGIN_SUCCESS ||
      action.type === SOCIAL_LOGIN_SUCCESS ||
      action.type === REGISTER_STEP_TWO_SUCCESS ||
      action.type === RESET_PASSWORD
    ) {
      const { user, accessToken, refreshToken } = getState().auth;

      localStorage.set('auth', {
        user,
        accessToken,
        refreshToken,
      });
    }

    if (action.type === LOGOUT) {
      localStorage.remove('auth');
    }

    return returnValue;
  };
};

export default syncLocalStorage;
