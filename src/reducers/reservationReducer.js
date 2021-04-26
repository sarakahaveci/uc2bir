import {
  SET_RESERVATION,
  DELETE_SLOT,
  ADD_SLOT,
  CLEAR_RESERVATION,
  DELETE_ALL_SLOT,
} from '../constants';

const initialState = {
  data: null,
  type: '',
  code: 0,
  message: '',
  isLoading: false,
  error: null,
  isSuccsess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RESERVATION:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        isLoading: true,
      };
    case CLEAR_RESERVATION:
      return {
        ...state,
        data: {},
        isLoading: true,
      };
    case DELETE_SLOT:
      var slot = state?.data?.slot;
      if (slot) {
        var newSlot = slot.filter(
          (item) =>
            item.date !== action.payload.date ||
            item.hour !== action.payload.hour
        );
        state.data.slot = newSlot;
      }
      return {
        ...state,
        data: { ...state.data },
        isLoading: true,
      };
    case DELETE_ALL_SLOT:
      state.data.slot = [];
      return {
        ...state,
        data: { ...state.data },
        isLoading: true,
      };
    case ADD_SLOT:
      var slot = state?.data?.slot;
      if (slot) {
        state.data.slot = [...state.data.slot, action.payload];
      } else {
        state.data.slot = [action.payload];
      }

      return {
        ...state,
        data: { ...state.data },
        isLoading: true,
      };
    default:
      return state;
  }
};
