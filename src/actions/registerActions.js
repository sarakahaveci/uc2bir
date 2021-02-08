import {
  HTTP_REQUEST,
  REGISTER_STEP_ONE,
  REGISTER_STEP_TWO,
  REGISTER_STEP_THREE,
  REGISTER_STEP_FOUR,
  REGISTER_DATA,
} from '../constants';

export const setStepOne = (
  { name, email, phone, password, type_id, kvkk, agreement, health_status },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/register';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: REGISTER_STEP_ONE,
      body: {
        name,
        email,
        phone,
        password,
        type_id,
        kvkk,
        agreement,
        health_status,
      },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};

export const setStepTwo = (
  { phone, code },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/verify-code';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: REGISTER_STEP_TWO,
      body: {
        phone,
        code,
      },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};

export const setStepThree = (
  { birthday, genre, about, city, town, district, address_detail },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/user/profile/information';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: REGISTER_STEP_THREE,
      body: {
        birthday,
        genre,
        about,
        city,
        town,
        district,
        address_detail,
      },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};

export const setStepFour = (
  { survey_id, question_id, answer },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/user/profile/quiz';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: REGISTER_STEP_FOUR,
      body: {
        survey_id,
        question_id,
        answer,
      },
      transformData: (data) => data.data,
      errorHandler: () => errorCallback(),
    },
  });
};

export const getRegisterData = (successCallback, errorCallback) => async (
  dispatch
) => {
  const url = '/user/registration-data';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: REGISTER_DATA,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};
