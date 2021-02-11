import { REGISTER_STEP_TWO_REQUEST, REGISTER_STEP_TWO_SUCCESS, REGISTER_STEP_TWO_FAILURE } from '../constants';

const initialState = {
	data: null,
	type: "",
  code: 0,
  message: "",
	isLoading: false,
	error: null,
	isSuccess: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_STEP_TWO_REQUEST:
			return {
				...state,
				isLoading: true,
			};

		case REGISTER_STEP_TWO_SUCCESS:
			return {
				...state,
				data: action.payload.data,
				isLoading: false,
				error: null,
				isSuccess: true,
			};

		case REGISTER_STEP_TWO_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload.response.data,
			};

		default:
			return state;
	}
};
