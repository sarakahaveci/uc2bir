import { HTTP_REQUEST, GET_PROFESSIONAL_CALENDAR, USER_KEYS } from '../../constants';
import { format } from 'date-fns';

export const getProfessionalCalendar = (id,typeId, date) => async (dispatch) => {
  const url = `/appointment/${USER_KEYS[typeId]}-calendar/${id}?date=${format(date, 'dd.MM.yyyy')}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PROFESSIONAL_CALENDAR,
      transformData: (data) => data.data,
    },
  });
};
