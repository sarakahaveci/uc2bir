// @ts-nocheck
import { TYPES } from "./action/type"
import { services } from "./services";

export const verifty_create = data => dispatch => {
    dispatch({
        type: TYPES.FETCH_PENDING_VERIFTY,
    });
    return dispatch({
        type: FETCH_CREATE_VERIFTY,
        payload: data,
    });
}

export const verifty_data = data => async dispatch => {
    dispatch({
        type: TYPES.FETCH_PENDING_VERIFTY,
    });
    try {
        const payload = await services.POST(data);
        return dispatch({
            type: TYPES.FETCH_SUCCESS,
            payload: payload.data.data
        });
    } catch(err) {
        return dispatch({
            type: TYPES.FETCH_ERROR,
            payload: err.message
        });
    }
}