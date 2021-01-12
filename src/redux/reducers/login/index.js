// @ts-nocheck
import { TYPES } from "./action/type"
import { loginServices } from "./services";

export const login = data => async dispatch => {
    dispatch({
        type: TYPES.FETCH_PENDING,
    });
    try {
        const payload = await loginServices.GETTOKEN(data);

        const { response } = payload;
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("refresh_token", response.refresh_token);
        sessionStorage.setItem("user_id", response.user.id);

        return dispatch({
            type: TYPES.FETCH_SUCCESS,
            payload: payload.data
        });
    } catch(err) {
        return dispatch({
            type: TYPES.FETCH_ERROR,
            payload: err.message
        });
    }
}