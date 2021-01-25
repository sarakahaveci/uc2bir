import { initialState } from "../initial";
import { TYPES } from "./type";

export default(state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.FETCH_PENDING_STEP_TWO:
            return {
                ...state,
                loading: true,
            }

        case TYPES.FETCH_SUCCESS_STEP_TWO:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                entity: payload,
            }

        case TYPES.FETCH_LIST_SUCCESS_STEP_TWO:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                entities: payload,
            }

        case TYPES.FETCH_ERROR_STEP_TWO:
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