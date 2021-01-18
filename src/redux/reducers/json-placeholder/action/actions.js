import { initialState } from "../initial";
import { TYPES } from "./type";

export default(state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.FETCH_PENDING_JP_PLACEHOLDER:
            return {
                ...state,
                loading: true,
            }

        case TYPES.FETCH_SUCCESS_JP_PLACEHOLDER:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                entity: payload,
            }

        case TYPES.FETCH_LIST_SUCCESS_JP_PLACEHOLDER:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                entities: payload,
            }

        case TYPES.FETCH_ERROR_JP_PLACEHOLDER:
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