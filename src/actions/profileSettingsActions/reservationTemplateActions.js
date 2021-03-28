import {
  HTTP_REQUEST,
  ADD_DATE_TO_TEMPLATE,
  DELETE_DATE_FROM_TEMPLATE,
  SET_SELECTED_DAY,
  GET_TEMPLATES,
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
    ...appliedDays.filter((day) => day.day !== dayIndex),
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
    ...appliedDays.filter((day) => day.day !== dayIndex),
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

export const getTemplates = () => async (dispatch) => {
  const url = `/appointment/template/pt`;

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
