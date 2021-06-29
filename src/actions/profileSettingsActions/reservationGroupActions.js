import {
  GET_WORK_PLACE_CAPACITY,
  SET_SELECTION_DATA,
  HTTP_REQUEST,
  CREATE_GROUP_SLOT, GET_GROUP_IMAGES,
} from 'constants/index';
import { format } from 'date-fns';
import { resizeFile } from '../../utils'
export const getWorkPlaceCapacity = (branchId, locationId, selectedHour, date) => async (
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
        date: format(date, 'dd.MM.uuuu'),
        hour: selectedHour,
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
    group_slot_image,
    classSelection,
  } = getState().profileSettings2.reservationGroupSlot;
  const createData = new FormData();

  const resizedFile = await resizeFile(group_slot_image);

  var keys = Object.keys(restSlot)
  keys.forEach((key) => {
    createData.append(key, restSlot[key])
  })
  if (resizedFile) createData.append('group_slot_image[]', resizedFile);

  if (price) createData.append('price', +price);
  if (date) createData.append('date', format(date, 'dd.MM.uuuu'));
  if (selectedHour) createData.append('hour', selectedHour);
  if (branchSelection?.id) createData.append('branch_id', branchSelection.id);
  if (sessionSelection?.type) createData.append('session', sessionSelection.type);
  if (locationSelection?.id) createData.append('location_id', locationSelection.id);
  if (courseDetails) createData.append('detail', courseDetails);
  if (group_slot_image_id) createData.append('group_slot_image_id', group_slot_image_id);
  if (classSelection?.id) createData.append('class_id', classSelection.id);


  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      transformData: (data) => data.data,
      url,
      body: createData,
      callBack: successCallback,
      errorHandler: (error) => errorCallback(error.message),
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
