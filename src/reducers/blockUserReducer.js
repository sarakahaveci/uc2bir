import {
    GET_BLOCKED_USERS_REQUEST,
    GET_BLOCKED_USERS_SUCCESS,
    GET_BLOCKED_USERS_FAILURE,

    BLOCK_USER_REQUEST,
    BLOCK_USER_SUCCESS,
    BLOCK_USER_FAILURE,

    UNBLOCK_USER_REQUEST,
    UNBLOCK_USER_SUCCESS,
    UNBLOCK_USER_FAILURE,
} from 'constants/index';

const initialState = {
    blockeds: {},
    isLoading: false,
    error: null,

};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_BLOCKED_USERS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case GET_BLOCKED_USERS_SUCCESS:
            return {
                ...state,
                blockeds: action.payload.data,
                isSuccsess: true,
                isLoading: false,
                error: null,
            };

        case GET_BLOCKED_USERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isSuccsess: false,
                error: action.payload.message,
            };





        case BLOCK_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case BLOCK_USER_SUCCESS:
            return {
                ...state,
                request: action.payload.data,
                isSuccsess: true,
                isLoading: false,
                error: null,
            };

        case BLOCK_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isSuccsess: false,
                error: action.payload.message,
            };


        case UNBLOCK_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case UNBLOCK_USER_SUCCESS:
            return {
                ...state,
                request: action.payload.data,
                isSuccsess: true,
                isLoading: false,
                error: null,
            };

        case UNBLOCK_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isSuccsess: false,
                error: action.payload.message,
            };





        default:
            return state;
    }
};
