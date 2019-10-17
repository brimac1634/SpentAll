import LoadingActionTypes from './loading.types';

export const startLoading = message => ({
	type: LoadingActionTypes.START_LOADING,
	payload: message
})

export const stopLoading = () => ({
	type: LoadingActionTypes.STOP_LOADING
})