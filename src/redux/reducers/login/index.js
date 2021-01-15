// @ts-nocheck
import { TYPES } from "./action/type"
import { loginServices } from "./services";

export const login = data => async dispatch => {
    dispatch({
        type: TYPES.FETCH_PENDING,
    });
    try {
        const payload = await loginServices.GETTOKEN(data);
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