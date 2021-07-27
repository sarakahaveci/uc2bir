
import {
    BLOCK_USER,
    UNBLOCK_USER,
    GET_BLOCKED_USERS,
    HTTP_REQUEST
} from '../constants';
export const blockUser = (id) => async (
    dispatch
) => {
    const url = '/user/block/add';

    await dispatch({
        type: HTTP_REQUEST,
        payload: {
            method: 'POST',
            url,
            label: BLOCK_USER,
            body: { block_id: id },
            transformData: (data) => data.data,
            // callBack: (callBack) => console.log(callBack),
            // errorHandler: (error) =>console.log(error),
        },
    });
};
export const unblockUser = (id) => async (
    dispatch
) => {
    const url = '/user/block/remove';

    await dispatch({
        type: HTTP_REQUEST,
        payload: {
            method: 'POST',
            url,
            label: UNBLOCK_USER,
            body: { block_id: id },
            transformData: (data) => data.data,
            // callBack: (callBack) => console.log(callBack),
            // errorHandler: (error) =>console.log(error),
        },
    });
};
export const getBlockedUsers = () => async (dispatch) => {
    let url = "/user/block"

    await dispatch({
        type: HTTP_REQUEST,
        payload: {
            method: 'GET',
            url,
            label: GET_BLOCKED_USERS,
            transformData: (data) => data?.data,
        },
    });
};