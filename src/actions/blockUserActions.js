
import {
    BLOCK_USER,
    UNBLOCK_USER,
    GET_BLOCKED_USERS,
    HTTP_REQUEST
} from '../constants';
import { toast } from 'react-toastify'
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
            callBack: () => {
                toast.success('İşleminiz başarılı.', {
                    position: 'bottom-right',
                    autoClose: 4000,
                });
                // successCallback();
            },
            errorHandler: (err) => {
                toast.error(err?.message || 'İşlem başarısız', {
                    position: 'bottom-right',
                    autoClose: 4000,
                });
            },
        },
    });
};
export const unblockUser = (id, successCallback) => async (
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
            callBack: () => {
                toast.success('İşleminiz başarılı.', {
                    position: 'bottom-right',
                    autoClose: 4000,
                });
                successCallback();
            },
            errorHandler: (err) => {
                toast.error(err?.message || 'İşlem başarısız', {
                    position: 'bottom-right',
                    autoClose: 4000,
                });
            },
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