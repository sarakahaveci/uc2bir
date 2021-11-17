import { toast } from 'react-toastify';
import { format } from 'date-fns';

import {
  HTTP_REQUEST,
  ADD_DATE_TO_TEMPLATE,
  DELETE_DATE_FROM_TEMPLATE,
  SET_SELECTED_DAY,
  GET_TEMPLATES,
  APPLY_TEMPLATE_TO_CALENDAR,
  SAVE_TEMPLATE,
  GET_TEMPLATE_DETAILS,
  PERSONAL_TRAINER,
  WORK_PLACE,
  USER_KEYS,
  GET_TEMPLATE_FROM_CALENDAR,
  DELETE_HOUR_OF_CALENDER,
  GET_DAY_OF_CALENDER,
  UPDATE_TEMPLATE_DEFAULT,
  ADD_HOUR_TO_CALENDER,
  GET_DAY_DETAIL_OF_CALENDER,
  DELETE_TEMPLATE,
  DIETITIAN,
  CLEAR_TEMPLATE,
} from '../../constants';

export const setSelectedDay = (dayIndex) => async (dispatch, getState) => {
  const { appliedDays } = getState().profileSettings2.reservationTemplate;

  const foundDate = appliedDays.find((item) => item.day === dayIndex) || {
    day: dayIndex,
    slice: [],
  };

  dispatch({
    type: SET_SELECTED_DAY,
    payload: foundDate,
  });
};
export const clearTemplate = () => async (dispatch) => {
  dispatch({
    type:CLEAR_TEMPLATE
  });
};

export const addHoursToTemplate = (dayIndex, addedDate) => async (
  dispatch,
  getState
) => {
  const {
    appliedDays,
    selectedDay,
  } = getState().profileSettings2.reservationTemplate;

  const editedSelectedDay = {
    ...selectedDay,
    slice: [...selectedDay.slice, addedDate],
  };

  const filteredAppliedTemplate = [
    ...appliedDays?.filter((day) => day.day !== dayIndex),
    editedSelectedDay,
  ];

  dispatch({
    type: ADD_DATE_TO_TEMPLATE,
    payload: {
      selectedDay: editedSelectedDay,
      appliedDays: filteredAppliedTemplate,
    },
  });
};

export const deleteTemplateItem = (dayIndex, hourIndex) => async (
  dispatch,
  getState
) => {
  const {
    appliedDays,
    selectedDay,
  } = getState().profileSettings2.reservationTemplate;

  const editedSelectedDay = {
    ...selectedDay,
    slice: selectedDay.slice.filter((item) => item.id !== hourIndex),
  };

  const filteredAppliedTemplate = [
    ...appliedDays?.filter((day) => day.day !== dayIndex),
    editedSelectedDay,
  ];

  dispatch({
    type: DELETE_DATE_FROM_TEMPLATE,
    payload: {
      selectedDay: editedSelectedDay,
      appliedDays: filteredAppliedTemplate,
    },
  });
};

export const getTemplates = () => async (dispatch, getState) => {
  const userType = getState().auth.user.type_id;
  const url = `/appointment/template/${USER_KEYS[userType]}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      transformData: (data) => data.data,
      url,
      label: GET_TEMPLATES,
    },
  });
};

export const getTemplateDetails = (id) => async (dispatch, getState) => {
  const userType = getState().auth.user.type_id;
  const url = `/appointment/template/${USER_KEYS[userType]}/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      transformData: (data) => data.data,
      url,
      label: GET_TEMPLATE_DETAILS,
    },
  });
};

export const applyTemplateToCalendar = (date, templateId, callBack) => async (
  dispatch, getState
) => {
  const userType = getState().auth.user.type_id;
  const url =  `/appointment/${USER_KEYS[userType]}/apply-template`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      body: {
        date: format(date, 'dd.MM.yyyy'),
        template_id: templateId,
      },
      transformData: (data) => data.data,
      url,
      label: APPLY_TEMPLATE_TO_CALENDAR,
      callBack,
      errorHandler: (err)=>{
        toast.error( err?.message, { position: 'bottom-right' })

      }

        
    },
  });
};

export const saveTemplate = (templateName, callBack) => async (
  dispatch,
  getState
) => {
  const { type_id: userTypeId } = getState().auth.user;

  const url = `/appointment/template/${USER_KEYS[userTypeId]}`;

  const { appliedDays } = getState().profileSettings2.reservationTemplate;

  const formatedAppliedDays = appliedDays.map((day) => (
    {
    day: day.day + 1,
    accept_guest: day.slice?.[day.slice.length - 1]?.accept_guest,
    slice: day.slice.map((slice) => ({
      hour: slice.hour,
      ...(userTypeId === PERSONAL_TRAINER && {
        branch: slice.branch.map((branch) => branch.id),
      }),
      ...(userTypeId === PERSONAL_TRAINER && {
        session_type: slice.session_type.map((sessionType) => (
          {
          session: sessionType.session.type,
          ...(sessionType.location && {
            location: sessionType?.location?.map((item)=>item.id),
          }),
        })),
      }),
      ...(userTypeId === DIETITIAN && {
        session_type: slice.session_type.map((sessionType) => ({
          session: sessionType.session.type,
          ...(sessionType.location && {
            location: sessionType?.location?.map((item)=>item.id),
          }),
        })),
      }),
      ...(userTypeId === WORK_PLACE && {
        location: slice?.location?.map((location) => location.id),
      }),
    })),
  }));

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      transformData: (data) => data.data,
      label: SAVE_TEMPLATE,
      url,
      body: {
        name: templateName,
        slot: formatedAppliedDays,
      },
      callBack,
      errorHandler: ({ message }) =>
        toast.error(message, { position: 'bottom-right', autoClose: 2000 }),
    },
  });
};

export const updateDefaultTemplate = (
  templateId,
  successCallback,
  errorCallback

) => async (dispatch,getState) => {
  const { type_id: userTypeId } = getState().auth.user;

  const url = `/appointment/template/${USER_KEYS[userTypeId]}/${templateId}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PUT',
      url,
      label: UPDATE_TEMPLATE_DEFAULT,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
      transformData: (data) => data.data,
    },
  });
};

export const getTemplateFromCalender = () => async (dispatch,getState) => {
  const { type_id: userTypeId } = getState().auth.user;
  const url = `/appointment/${USER_KEYS[userTypeId]}/full-date`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      transformData: (data) => data.data,
      url,
      label: GET_TEMPLATE_FROM_CALENDAR,
    },
  });
};

export const getDayOfCalendar = (date) => async (dispatch,getState) => {
  const { type_id: userTypeId } = getState().auth.user;
  const url = `/appointment/${USER_KEYS[userTypeId]}?date=${date}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      transformData: (data) => data.data,
      url,
      label: GET_DAY_OF_CALENDER,
    },
  });
};

export const getDayDetailOfCalendar = (id) => async (dispatch,getState) => {
  const { type_id: userTypeId } = getState().auth.user;
  const url = `/appointment/${USER_KEYS[userTypeId]}/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      transformData: (data) => data.data,
      url,
      label: GET_DAY_DETAIL_OF_CALENDER,
    },
  });
};
export const updateGroupLesson = (
  id,
  data,
  successCallback,
  errorCallback

) => async (dispatch) => {

  const url = `/appointment/pt/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PUT',
      body:data,
      url,
      label: UPDATE_TEMPLATE_DEFAULT,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
      transformData: (data) => data.data,
    },
  });
};

export const deleteHourOfCalendar = (id, successCallback, errorCallback) => async (
  dispatch, getState
) => {
  const { type_id: userTypeId } = getState().auth.user;
  const url = `/appointment/${USER_KEYS[userTypeId]}/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'DELETE',
      url,
      label: DELETE_HOUR_OF_CALENDER,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error?.message),
      transformData: (data) => data.data,
    },
  });
};


export const deleteTemplate = (id, successCallback, errorCallback) => async (
  dispatch, getState
) => {
  const { type_id: userTypeId } = getState().auth.user;
  const url = `/appointment/template/${USER_KEYS[userTypeId]}/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'DELETE',
      url,
      label: DELETE_TEMPLATE,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error?.message),
      transformData: (data) => data.data,
    },
  });
};


export const applyHourOfCalendar = (date,sessionType,branch, hour, callBack) => async (
  dispatch, getState
) => {
  const { type_id: userTypeId } = getState().auth.user;
  const url = `/appointment/${USER_KEYS[userTypeId]}`;

  if(userTypeId===WORK_PLACE) {
    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        body: {
          date: format(date, 'dd.MM.yyyy'),
          hour: hour,
          accept_guest:false,
          location: sessionType.location.map((item)=> item.id),
        },
        transformData: (data) => data.data,
        url,
        label: ADD_HOUR_TO_CALENDER,
        callBack,
        errorHandler: (errorMsg) =>
          toast.error(errorMsg, { position: 'bottom-right' }),
      },
    });

  }else {
    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        body: {
          date: format(date, 'dd.MM.yyyy'),
          hour: hour,
          branch: branch.map((branch) => branch.id),
          accept_guest:false,
          session_type:sessionType.map((sessionType) => ({
            session: sessionType.session.type,
            ...(sessionType.location && {
              location: sessionType?.location?.map((location) => location.id),
            }),
          })),
        },
        transformData: (data) => data.data,
        url,
        label: ADD_HOUR_TO_CALENDER,
        callBack,
        errorHandler: (errorMsg) =>
          toast.error(errorMsg, { position: 'bottom-right' }),
      },
    });
  }

};

