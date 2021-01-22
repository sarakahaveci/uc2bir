import { TYPES } from "./action/type"
import { jPService } from "./services";

export const get = () => async dispatch => {
    dispatch({
        type: TYPES.FETCH_PENDING_JP_PLACEHOLDER,
    });
    try {
        const payload = await jPService.GET();
        return dispatch({
            type: TYPES.FETCH_SUCCESS_JP_PLACEHOLDER,
            payload: payload.data
        });
    } catch(err) {
        return dispatch({
            type: TYPES.FETCH_ERROR_JP_PLACEHOLDER,
            payload: err.message
        });
    }
}

export const getAll = () => async dispatch => {
    dispatch({
        type: TYPES.FETCH_PENDING_JP_PLACEHOLDER,
    });
    try {
        const payload = await jPService.GETALL();
        return dispatch({
            type: TYPES.FETCH_LIST_SUCCESS_JP_PLACEHOLDER,
            payload: payload.data
        });
    } catch(err) {
        return dispatch({
            type: TYPES.FETCH_ERROR_JP_PLACEHOLDER,
            payload: err.message
        });
    }
}