import {
    SEARCH_RESULTS_FAILURE,
    SEARCH_RESULTS_REQUEST,
    SEARCH_RESULTS_SUCCESS,
} from '../constants';

const initialState = {
    data: {},
    isLoading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_RESULTS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null,
                isSuccess: true,
            };

        case SEARCH_RESULTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.message,
            };

        default:
            return state;
    }
};

