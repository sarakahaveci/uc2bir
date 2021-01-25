// @ts-nocheck
import { initialState } from "../initial";
import { TYPES } from "./type";

export default(state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.FETCH_PENDING_VERIFTY:
            return {
                ...state,
                loading: true,
            }

        case TYPES.FETCH_SUCCESS_VERIFTY:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                entity: {
                    ...state.entity,
                    ...payload
                },
            }

        case TYPES.FETCH_RESULT_VERIFTY:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                result: true,
                entity: {
                    ...state.entity,
                    ...payload
                },
            }

        case TYPES.FETCH_RESPONSE_VERIFTY:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                response: true,
                entity: {
                    ...state.entity,
                    ...payload
                },
            }

        case TYPES.FETCH_LIST_SUCCESS_VERIFTY:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                entities: payload,
            }

        case TYPES.FETCH_CREATE_VERIFTY:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                entity: {
                    ...state.entity,
                    ...payload
                },
            }

        case TYPES.FETCH_ERROR_VERIFTY:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                error: payload,
            }
    
        default:
            return state;
    }
}