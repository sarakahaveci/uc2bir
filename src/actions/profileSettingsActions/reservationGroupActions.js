import {
  GET_WORK_PLACE_CAPACITY,
  SET_SELECTION_DATA,
  HTTP_REQUEST,
  CREATE_GROUP_SLOT, GET_GROUP_IMAGES,
} from 'constants/index';
import { format } from 'date-fns';

export const getWorkPlaceCapacity = (branchId, locationId) => async (
  dispatch
) => {
  const url = '/appointment/pt/gym-capacity';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      transformData: (data) => data.data,
      url,
      body: {
        branch_id: branchId,
        location_id: locationId,
      },
      label: GET_WORK_PLACE_CAPACITY,
    },
  });
};

export const createGroupSlot = (slotObj, successCallback, errorCallback) => async (
  dispatch,
  getState
) => {
  const url = '/appointment/pt/group-slot';

  const { date, price, ...restSlot } = slotObj;

  const {
    selectedHour,
    branchSelection,
    sessionSelection,
    locationSelection,
    courseDetails,
    group_slot_image_id,
  } = getState().profileSettings2.reservationGroupSlot;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      transformData: (data) => data.data,
      url,
      body: {
        ...restSlot,
        price: +price,
        date: format(date, 'dd.MM.uuuu'),
        hour: selectedHour,
        branch_id: branchSelection.id,
        session: sessionSelection.type,
        location_id: locationSelection.id,
        detail: courseDetails,
        group_slot_image_id,
      },
      callBack: successCallback,
      errorHandler: () => errorCallback(),
      label: CREATE_GROUP_SLOT,
    },
  });
};

export const getGroupImages = () => async (dispatch) => {
  const url = `/appointment/pt/group-slot`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      transformData: (data) => data.data,
      url,
      label: GET_GROUP_IMAGES,
    },
  });
};

export const dtCreateSeance = (successCallback) => async (
  dispatch,
  getState
) => {
  const url = '/user/package-seance';

  const {
    courseDetails,
    seancePrice,
    title,
    seanceCount,
    dtSessionSelection,
  } = getState().profileSettings2.reservationGroupSlot;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      transformData: (data) => data.data,
      url,
      body: {
        price: +seancePrice,
        quantity: seanceCount,
        description: courseDetails,
        title: title,
        session_types: dtSessionSelection.map((item) => item.id),
        image_id: 1,
      },
      callBack: successCallback,
      label: CREATE_GROUP_SLOT,
    },
  });
};

export const setGroupSelectionData = (name, value) => ({
  type: SET_SELECTION_DATA,
  payload: {
    name,
    value,
  },
});
