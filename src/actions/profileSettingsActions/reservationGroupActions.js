import { GET_WORK_PLACE_CAPACITY, HTTP_REQUEST } from 'constants/index';

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
