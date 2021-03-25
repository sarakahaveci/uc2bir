import { ADD_DATE_TO_TEMPLATE, SET_SELECTED_DAY } from '../../constants';

export const setSelectedDay = (dayIndex) => async (dispatch, getState) => {
  const { appliedTemplates } = getState().profileSettings2.reservationTemplate;

  const foundDate = appliedTemplates.find((item) => item.day === dayIndex) || {
    day: dayIndex,
    dates: [],
  };

  dispatch({
    type: SET_SELECTED_DAY,
    payload: foundDate,
  });
};

export const addDateToTemplate = (addedDate) => async (dispatch, getState) => {
  const {
    appliedTemplates,
    selectedDay,
  } = getState().profileSettings2.reservationTemplate;

  let editedAddedDate;

  if (addedDate.hours.length === 1) {
    editedAddedDate = [
      {
        ...addedDate,
        hours: addedDate.hours.flat(),
      },
    ];
  } else {
    editedAddedDate = addedDate.hours.map((item) => ({
      ...addedDate,
      hours: item,
    }));
  }

  const editedSelectedDay = {
    ...selectedDay,
    dates: [...selectedDay.dates, ...editedAddedDate],
  };

  dispatch({
    type: ADD_DATE_TO_TEMPLATE,
    payload: {
      appliedTemplates: [
        ...appliedTemplates.filter(
          (template) => template.day !== selectedDay.day
        ),
        editedSelectedDay,
      ],
      selectedDay: editedSelectedDay,
    },
  });
};

// export const addDateToTemplate = (dateId) => async (dispatch, getState) => {
//     const {
//       appliedTemplates,
//       selectedDay,
//     } = getState().profileSettings2.reservationTemplate;

//     const dayId = selectedDay.day

//     const editedSelectedDay = {
//         ...selectedDay,
//         dates: selectedDay.dates.filter(date => date.id !== dateId)
//     }

//     dispatch({
//         type: DELETE_DATE_FROM_TEMPLATE,
//         payload: {
//             appliedTemplates: editedSelectedDay,
//             selectedDay: editedSelectedDay
//         }
//     })
//   };
