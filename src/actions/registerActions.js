import {
  HTTP_REQUEST,
  REGISTER_STEP_ONE,
  REGISTER_STEP_TWO,
  REGISTER_STEP_THREE,
  REGISTER_STEP_FOUR,
  REGISTER_DATA,
  GET_REGIONS,
  GET_DISTICK,
  VERIFY_CODE,
  DELETE_FILE,
  SUBMIT_BRANCH,
  GET_TOWN,
} from '../constants';

export const setStepOne = (
  {
    name,
    email,
    phone,
    password,
    type_id,
    kvkk,
    agreement,
    health_status,
    permission,
  },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/register';

  const editedPhone = phone
    .replace('(', '')
    .replace(')', '')
    .replaceAll(' ', '');

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: REGISTER_STEP_ONE,
      body: {
        name,
        email,
        phone: editedPhone,
        password,
        type_id,
        kvkk,
        agreement,
        health_status,
        permission,
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
  {
    birthday,
    genre,
    about,
    city,
    town,
    district,
    address_detail,
    build_no,
    apt_no,
  },
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
        build_no,
        apt_no,
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

export const getRegisterData = (errorCallback = () => {}) => async (
  dispatch
) => {
  const url = '/user/registration-data';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: REGISTER_DATA,

      errorHandler: () => errorCallback(),
    },
  });
};

export const getCitiesAndDistict = ({ district, city }) => async (dispatch) => {
  const url = '/regions';
  let body;
  let label = GET_REGIONS;

  if (!!city) {
    body = {
      city_id: city,
    };
    label = GET_DISTICK;
  } else if (district) {
    body = {
      district_id: district,
    };
    label = GET_TOWN;
  }
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label,
      body,
    },
  });
};

export const verifyCode = (
  code,
  successCallback,
  verifyErrorCallback
) => async (dispatch, getState) => {
  const phone = getState().auth.user.phone;

  const url = '/verify-code';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: VERIFY_CODE,
      callBack: () => successCallback(),
      errorHandler: (error) => verifyErrorCallback(error.message),
      body: {
        phone,
        code,
      },
    },
  });
};

export const submitUserBranch = (
  branch,
  successCallback,
  errorCallback
) => async (dispatch, getState) => {
  const url = '/user/profile/branch';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: SUBMIT_BRANCH,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
      body: {
        branches: branch,
      },
    },
  });
};

export const deleteFile = (fileId, successCallback) => async (dispatch) => {
  const url = `/user/profile/file/${fileId}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'DELETE',
      url,
      label: DELETE_FILE,
      callBack: () => successCallback(),
    },
  });
};
