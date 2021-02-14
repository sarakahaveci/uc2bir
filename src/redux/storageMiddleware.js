import { LOGIN_SUCCESS } from '../constants';
import { localStorage } from 'utils';

const syncLocalStorage = ({ dispatch, getState }) => {
  return (next) => (action) => {
    const returnValue = next(action);

    if (action.type === LOGIN_SUCCESS) {
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
