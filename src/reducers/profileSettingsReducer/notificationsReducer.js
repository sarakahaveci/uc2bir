import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATION_SETTINGS_REQUEST,
  GET_NOTIFICATION_SETTINGS_SUCCESS,
  GET_NOTIFICATION_SETTINGS_FAILURE,
  GET_NOTIFICATIONS_COUNT_REQUEST,
  GET_NOTIFICATIONS_COUNT_SUCCESS,
  GET_NOTIFICATIONS_COUNT_FAILURE,
} from '../../constants';

const initialState = {
  notification_count: 0,
  message_count: 0,
  notifications: {
    isLoading: true,
    data: [],
    error: null,
    types: []
  },
  notificationSettings: {
    isLoading: true,
    data: [],
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          isLoading: true,
        },
      };

    case GET_NOTIFICATION_SETTINGS_REQUEST:
      return {
        ...state,
        notificationSettings: {
          ...state.notificationSettings,
          isLoading: true,
        },
      };

    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: {
          data: action.payload.notifications,
          types: action.payload.types,
          isLoading: false,
          error: null,
        },
      };

    case GET_NOTIFICATION_SETTINGS_SUCCESS:
      return {
        ...state,
        notificationSettings: {
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          error: action.payload,
          isLoading: false,
        },
      };

    case GET_NOTIFICATION_SETTINGS_FAILURE:
      return {
        ...state,
        notifications: {
          ...state.notificationSettings,
          error: action.payload,
          isLoading: false,
        },
      };

    // 

    case GET_NOTIFICATIONS_COUNT_SUCCESS:
      return {
        ...state,
        notification_count: action.payload?.notification_count,
        message_count: action.payload?.message_count,

      };
    case GET_NOTIFICATIONS_COUNT_FAILURE:
      return {
        ...state,
        notification_count: 0,
        message_count: 0,

      };
    default:
      return state;
  }
};
