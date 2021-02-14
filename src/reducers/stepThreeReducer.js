import { REGISTER_STEP_THREE_REQUEST, REGISTER_STEP_THREE_SUCCESS, REGISTER_STEP_THREE_FAILURE } from '../constants';

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
		case REGISTER_STEP_THREE_REQUEST:
			return {
				...state,
				isLoading: true,
			};

		case REGISTER_STEP_THREE_SUCCESS:
			return {
				...state,
				data: action.payload.data,
				isLoading: false,
				isSuccess: true,
				error: null,
			};

		case REGISTER_STEP_THREE_FAILURE:
			return {
				...state,
				isLoading: false,
				isSuccess: true,
				error: action.payload.message,
			};

		default:
			return state;
	}
};
