import * as actionTypes from './action/types';
import initialState from './initial';

export const counterReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return state = state + action.payload;

        case actionTypes.DECREMENT:
            return state = state + action.payload;

        case actionTypes.EMPTY:
            return state = initialState;

        default:
            return state;
    }
}