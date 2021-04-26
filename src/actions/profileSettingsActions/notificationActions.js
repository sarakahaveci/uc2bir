import {
  HTTP_REQUEST,
  GET_NOTIFICATIONS,
  READ_NOTIFICATIONS,
  UPDATE_NOTIFICATION_SETTINGS,
  GET_NOTIFICATION_SETTINGS,
} from '../../constants';

export const getNotifications = (pageNumber, date, successCallback) => async (
  dispatch
) => {
  const url = `/user/notification/fetch?page=${pageNumber}&date=${date}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      transformData: (data) => data.data,
      url,
      label: GET_NOTIFICATIONS,
      callBack: (data) =>
        successCallback(data.data?.notifications?.currentPage),
    },
  });
};

export const readNotifications = () => async (dispatch) => {
  const url = '/user/notification/update';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      transformData: (data) => data.data,
      url,
      label: READ_NOTIFICATIONS,
    },
  });
};

export const getNotificationSettings = () => async (dispatch) => {
  const url = '/user/notification/get-type';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      transformData: (data) => data.data.types,
      url,
      label: GET_NOTIFICATION_SETTINGS,
    },
  });
};

export const updateNotificationSettings = ({ email, sms, push }) => async (
  dispatch
) => {
  const url = '/user/notification/update-type';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      body: {
        email,
        sms,
        push,
      },
      transformData: (data) => data.data,
      url,
      label: UPDATE_NOTIFICATION_SETTINGS,
    },
  });
};
