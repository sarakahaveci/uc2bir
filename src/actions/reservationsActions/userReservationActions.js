import {
  HTTP_REQUEST,
  GET_USER_RESERVATION_STATE_DATA,
  USER_RESERVATION_FUNC,
} from '../../constants';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const getUserAwaitings = (date) => async (dispatch) => {
  let url = '/appointment/calendar/pending';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'awaitings'), data.data),
    },
  });
};
export const UserAwaitingApprove =
  (id, successCallback = () => {}) =>
  async (dispatch) => {
    let url = `/appointment/calendar/update/${id}`;

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'PATCH',
        body: { type: 'approve' },
        url,
        label: USER_RESERVATION_FUNC,
        callBack: () => {
          successCallback();
        },
        transformData: (data) => data.data,
      },
    });
  };
export const UserAwaitingReject =
  (id, status, successCallback = () => {}) =>
  async (dispatch) => {
    let url = `/appointment/calendar/update/${id}`;

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'PATCH',
        body: { type: 'reject', reject_status_id: status },
        url,
        label: USER_RESERVATION_FUNC,
        callBack: () => {
          successCallback();
        },
        transformData: (data) => data.data,
      },
    });
  };
export const UserApproveCancelStepOne =
  (id, status, successCallback = () => {}) =>
  async (dispatch) => {
    let url = `/appointment/calendar/update/${id}`;

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'PATCH',
        body: { type: 'cancel' },
        url,
        label: USER_RESERVATION_FUNC,
        callBack: () => {
          successCallback();
        },
        transformData: (data) => data.data,
      },
    });
  };
export const UserApproveCancelStepTwo =
  (id, successCallback = () => {}) =>
  async (dispatch) => {
    let url = `/appointment/calendar/update/${id}`;

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'PATCH',
        body: { type: 'cancel', accept_cancellation: true },
        url,
        label: USER_RESERVATION_FUNC,
        callBack: () => {
          successCallback();
        },
        transformData: (data) => data.data,
      },
    });
  };
export const getUserRejects = (date) => async (dispatch) => {
  let url = '/appointment/calendar/rejected';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;

  await dispatch({
    type: HTTP_REQUEST,
    status: 'rejects',
    payload: {
      method: 'GET',
      url,
      label: GET_USER_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'rejecteds'), data.data),
    },
  });
};
export const getUserApproved = (date) => async (dispatch) => {
  let url = '/appointment/calendar/approved';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    status: 'approved',
    payload: {
      method: 'GET',
      url,
      label: GET_USER_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'approved'), data.data),
    },
  });
};

export const getUserReservationDetail = (id) => async (dispatch) => {
  let url = `/appointment/calendar/detail/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'res_detail'), data.data),
    },
  });
};

export const getUserSessionHistorys = (date) => async (dispatch) => {
  let url = '/appointment/calendar/completed';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_RESERVATION_STATE_DATA,
      transformData: (data) => (
        (data.data.status = 'session_historys'), data.data
      ),
    },
  });
};

export const rateAndComment =
  (
    { appointment_id, commented_id, comment, rating },
    successCallback = () => {},
    errorCallBack = () => {}
  ) =>
  async (dispatch, getState) => {
    const { t } = useTranslation();

    let url;
    const userType = getState().auth.user.type_id;
    if (userType == 1) url = `/appointment/calendar/comment`; // user
    if (userType == 2) url = `/appointment/pt-calendar/comment`; // pt
    if (userType == 3) url = `/appointment/bs-calendar/comment`; // gym
    if (userType == 4) url = `/appointment/dt-calendar/comment`; // dietitian

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        body: {
          appointment_id: appointment_id,
          commented_id: commented_id,
          comment: comment,
          rating: rating,
        },
        url,
        label: USER_RESERVATION_FUNC,
        callBack: () => {
          successCallback();
          toast.success(
            t('Your rating and comment has been successfully submitted'),
            {
              position: 'bottom-right',
              autoClose: 7000,
            }
          );
        },
        errorHandler: (res) => {
          errorCallBack();
          toast.error(
            res?.message || t('Error Encountered While Commenting and Rating'),
            {
              position: 'bottom-right',
              autoClose: 4000,
            }
          );
        },

        transformData: (data) => data.data,
      },
    });
  };
export const rateAndCommentSession =
  (
    { appointment_id, session_file, comment, rating, session_status },
    successCallback = () => {},
    errorCallBack = () => {}
  ) =>
  async (dispatch, getState) => {
    const { t } = useTranslation();

    let url;
    url = `/appointment/sess-calendar/comment`; // pt
    var myId = getState().auth?.user?.id;
    const urls = Object.keys(session_file).map(function (key) {
      return `${session_file[key]?.fileUrl}`;
    });
    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        body: {
          appointment_id: appointment_id,
          session_id: appointment_id,
          commented_id: myId,
          commenter_id: myId,
          comment: comment,
          rating: rating,
          session_file: urls,
          session_status: session_status,
        },
        url,
        label: USER_RESERVATION_FUNC,
        callBack: () => {
          successCallback();
          toast.success(
            t('Your rating and comment has been successfully submitted'),
            {
              position: 'bottom-right',
              autoClose: 7000,
            }
          );
        },
        errorHandler: (res) => {
          errorCallBack();
          toast.error(
            res?.message || t('Error Encountered While Commenting and Rating'),
            {
              position: 'bottom-right',
              autoClose: 4000,
            }
          );
        },

        transformData: (data) => data.data,
      },
    });
  };

export const SessionStatusResponse =
  (
    { appointment_id, sessionStatus },
    successCallback = () => {},
    errorCallBack = () => {}
  ) =>
  async (dispatch, getState) => {
    const { t } = useTranslation();

    let url;
    var myId = getState().auth?.user?.id;

    url = `/appointment/sess-calendar/comment`; // pt
    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        body: {
          appointment_id: appointment_id,
          session_id: appointment_id,
          session_status: sessionStatus,
          commented_id: myId,
          commenter_id: myId,
          session_file: [],
          comment: '',
        },
        url,
        label: USER_RESERVATION_FUNC,
        callBack: () => {
          successCallback();
          toast.success(
            t('Your rating and comment has been successfully submitted'),
            {
              position: 'bottom-right',
              autoClose: 7000,
            }
          );
        },
        errorHandler: (res) => {
          errorCallBack();
          toast.error(
            res?.message || t('Error Encountered While Commenting and Rating'),
            {
              position: 'bottom-right',
              autoClose: 4000,
            }
          );
        },

        transformData: (data) => data.data,
      },
    });
  };
