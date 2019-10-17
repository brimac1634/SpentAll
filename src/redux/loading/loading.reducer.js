import LoadingActionTypes from './loading.types';

const INITIAL_STATE = {
	isLoading: false,
	message: ''
}

const loadingReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LoadingActionTypes.START_LOADING:
			return {
				...state,
				isLoading: true,
				message: action.payload
			}
		case LoadingActionTypes.STOP_LOADING:
			return {
				...state,
				isLoading: false,
				message: ''
			}
		default:
			return state
	}
}

export default loadingReducer;