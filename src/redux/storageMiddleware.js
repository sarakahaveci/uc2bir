import {
  LOGIN_SUCCESS,
  SOCIAL_LOGIN_SUCCESS,
  REGISTER_STEP_TWO_SUCCESS,
  LOGOUT,
  USER_INFORMATION_SUCCESS,
  RESET_PASSWORD_SUCCESS,
} from '../constants';
import { localStorage } from 'utils';

const syncLocalStorage = ({ getState }) => {
  return (next) => (action) => {
    const returnValue = next(action);

    if (
      action.type === LOGIN_SUCCESS ||
      action.type === SOCIAL_LOGIN_SUCCESS ||
      action.type === REGISTER_STEP_TWO_SUCCESS ||
      action.type === RESET_PASSWORD_SUCCESS ||
      action.type === USER_INFORMATION_SUCCESS
    ) {
      const { user, accessToken, refreshToken } = getState().auth;

      localStorage.set(
        'auth',
        {
          user,
          accessToken,
          refreshToken,
        },
        60 * 8
      );
    } else if (action.type === LOGOUT) {
      localStorage.remove('auth');
    }

    return returnValue;
  };
};

export default syncLocalStorage;
