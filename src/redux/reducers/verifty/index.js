// @ts-nocheck
import { TYPES } from "./action/type"
import { services } from "./services";

export const verifty_create = data => dispatch => {
    dispatch({
        type: TYPES.FETCH_PENDING_VERIFTY,
    });
    return dispatch({
        type: TYPES.FETCH_CREATE_VERIFTY,
        payload: data,
    });
}

export const verifty_response = data => async dispatch => {
    dispatch({
        type: TYPES.FETCH_PENDING_VERIFTY,
    });
    try {
        const payload = await services.POST(data);
        return dispatch({
            type: TYPES.FETCH_RESPONSE_VERIFTY,
            payload: payload.data.data
        });
    } catch(err) {
        return dispatch({
            type: TYPES.FETCH_ERROR_VERIFTY,
            payload: err.message
        });
    }
}

export const verifty_result = data => async dispatch => {
    dispatch({
        type: TYPES.FETCH_PENDING_VERIFTY,
    });
    try {
        const payload = await services.POST(data);
        return dispatch({
            type: TYPES.FETCH_RESULT_VERIFTY,
            payload: payload.data.data
        });
    } catch(err) {
        return dispatch({
            type: TYPES.FETCH_ERROR_VERIFTY,
            payload: err.message
        });
    }
}