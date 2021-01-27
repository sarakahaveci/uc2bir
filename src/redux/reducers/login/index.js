// @ts-nocheck
import env from "../../../env";
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
};

export const getProfile = () => async dispatch => {
    dispatch({
        type: TYPES.FETCH_PENDING,
    });
    try {
        const payload = await loginServices.GETPROFILE();
        
        const data = {
            token: env.token,
            refresh_token: env.refresh_token,
            user: {...payload.data.data},
        }

        return dispatch({
            type: TYPES.FETCH_SUCCESS,
            payload: data
        });
    } catch(err) {
        return dispatch({
            type: TYPES.FETCH_ERROR,
            payload: err.message
        });
    }
};