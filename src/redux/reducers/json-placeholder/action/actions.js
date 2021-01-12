import { initialState } from "../initial";
import { TYPES } from "./type";

export default(state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.FETCH_PENDING:
            return {
                ...state,
                loading: true,
            }

        case TYPES.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                entity: payload,
            }

        case TYPES.FETCH_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                entities: payload,
            }

        case TYPES.FETCH_ERROR:
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