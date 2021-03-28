import {
  HTTP_REQUEST,
  GET_MY_PROFILE_FILES,
  UPDATE_FILE,
  filesForProfileType,
} from '../../constants';

export const getMyProfileFiles = () => async (dispatch, getState) => {
  const userType = getState().auth.user.type_id;

  const url = `/user/profile/my-files`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_MY_PROFILE_FILES,
      transformData: (data) =>
        data?.data?.filter((item) =>
          filesForProfileType[userType].includes(item.id)
        ),
    },
  });
};

export const updateFile = (fileId, fileName, successCallback) => async (
  dispatch
) => {
  const url = `/user/profile/file-update`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      body: {
        id: fileId,
        name: fileName,
      },
      url,
      label: UPDATE_FILE,
      transformData: (data) => data.data,
      callBack: successCallback,
    },
  });
};
