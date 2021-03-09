import {
  HTTP_REQUEST,
  ADD_PROFICIENCY,
  GET_PROFICIENCY,
  PERSONAL_TRAINER,
} from '../../constants';
import { toast } from 'react-toastify';

export const getProficiency = () => async (dispatch, getState) => {
  const userType = getState().auth.user.type_id;

  const url = `/user/profile/${
    userType === PERSONAL_TRAINER ? 'pt-' : ''
  }speciality`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      transformData: (data) => data.data,
      url,
      label: GET_PROFICIENCY,
    },
  });
};

export const addProficiency = (branchId, speciality, successCallback) => async (
  dispatch,
  getState
) => {
  const userType = getState().auth.user.type_id;

  const url = `/user/profile/${
    userType === PERSONAL_TRAINER ? 'pt-' : ''
  }speciality`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: ADD_PROFICIENCY,
      body: {
        branch_id: branchId,
        specialities: speciality,
      },
      callBack: successCallback,
      errorHandler: (error) => toast.error(error.message),
    },
  });
};
