import AlertActionTypes from './alert.types';

const INITIAL_STATE = {
	alertIsShowing: false,
	message: ''
}

const alertReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AlertActionTypes.SET_ALERT_MESSAGE:
			return {
				...state,
				alertIsShowing: true,
				message: action.payload
			}
		case AlertActionTypes.TOGGLE_ALERT:
			return {
				...state,
				alertIsShowing: !state.alertIsShowing
			}
		default:
			return state
	}
}

export default alertReducer;