import AlertActionTypes from './alert.types';

export const setAlert = message => ({
	type: AlertActionTypes.SET_ALERT_MESSAGE,
	payload: message
})

export const toggleAlert = () => ({
	type: AlertActionTypes.TOGGLE_ALERT
})