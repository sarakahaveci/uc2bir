import * as actionTypes from './types';

export const increaseCounter = () => ({
   type: actionTypes.INCREMENT,
   payload: 1
});

export const decreaseCounter = () => ({
    type: actionTypes.DECREMENT,
    payload: -1
});

export const emptyCounter = () => ({
    type: actionTypes.EMPTY
});