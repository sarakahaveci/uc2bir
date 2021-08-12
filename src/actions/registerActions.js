import { unMaskPhone } from 'utils';
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
  GET_ADRESS_IDS,
  OFF_NEW_BRANCH,
  QUIZ_GET,
  SUBMIT_BENEFIT,
  GET_USER_KEYS,
  AUTH_FILES,
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

  const editedPhone = unMaskPhone(phone);

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
      callBack: (res) => successCallback(res),
      errorHandler: (error) => errorCallback(error.message),
    },
  });
};
export const setStepOneSocial = (
  { type,
    accessToken,
    uid,
    //
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
  const url = '/social-register';

  const editedPhone = unMaskPhone(phone);

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: REGISTER_STEP_ONE,
      body: {
        type,
        accessToken,
        uid,
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
      callBack: (res) => successCallback(res),
      errorHandler: (error) => errorCallback(error.message),
    },
  });
};
export const setStepTwo = (
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
    code,
  },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/register';

  const editedPhone = unMaskPhone(phone);

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: REGISTER_STEP_TWO,
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
        code,
      },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error.message),
    },
  });
};
export const stepOneNoOTP = (
  data,

) => async (dispatch) => {


  await dispatch({
    type: 'STEP_ONE_NO_OTP',
    payload: {
      data
    },
  });
};


export const setStepThree = (data, successCallback, errorCallback) => async (
  dispatch
) => {
  const url = '/user/profile/information';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: REGISTER_STEP_THREE,
      body: { ...data },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};

export const setStepFour = (
  { ...data },
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
        ...data,
      },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};

export const getRegisterData = (errorCallback = () => { }) => async (
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
  { phone, code },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/verify-code';

  const editedPhone = unMaskPhone(phone);

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: VERIFY_CODE,
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
      body: {
        phone: editedPhone,
        code,
      },
    },
  });
};

export const submitUserBranch = (
  branch,

  errorCallback
) => async (dispatch) => {
  const url = '/user/profile/branch';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: SUBMIT_BRANCH,
      errorHandler: () => errorCallback(),
      body: {
        branches: branch,
      },
    },
  });
};

export const getQuiz = (successCallback, errorCallback) => async (dispatch) => {
  const url = '/user/profile/quiz';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: QUIZ_GET,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
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

export const getAdressIds = (body, successCallback, errorCallback) => async (
  dispatch
) => {
  const url = '/regions-map';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: GET_ADRESS_IDS,
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
      body,
    },
  });
};

export const offerBranch = ({ branch }) => async (dispatch) => {
  const url = '/user/profile/offer-branch';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: OFF_NEW_BRANCH,
      body: { branch },
    },
  });
};

export const submitBenefits = (
  { facilities },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/user/profile/facility';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: SUBMIT_BENEFIT,
      body: { facilities },
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};

export const getUserKeys = () => async (dispatch) => {
  const url = '/user/registration-data';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_KEYS,
      transformData: (data) => data['user-type'],
    },
  });
};

export const getAuthFiles = (userTypeId) => async (dispatch) => {
  const url = '/information-text';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: AUTH_FILES,
      transformData: (data) => data.data,
      body: {
        type_id: userTypeId,
      },
    },
  });
};
