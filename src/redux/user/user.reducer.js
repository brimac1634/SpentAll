import UserActionTypes from './user.types';

const initialState = {
	currentUser: null,
	userSettings: null,
	message: null,
	error: null,
	isFetching: true
} 

const userReducer = (state=initialState, action) => {
	switch(action.type) {
		case UserActionTypes.CHECK_USER_SESSION:
		case UserActionTypes.EMAIL_SIGN_IN_START:
		case UserActionTypes.EMAIL_SIGN_UP_START:
		case UserActionTypes.REGISTER_START:
			return {
				...state,
				isFetching: true
			}
		case UserActionTypes.SET_USER_SETTINGS:
			return {
				...state,
				userSettings: action.payload
			}
		case UserActionTypes.SIGN_UP_SUCCESS:
			return {
				...state,
				message: action.payload
			}
		case UserActionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				error: null,
				isFetching: false
			}
		case UserActionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				isFetching: false,
				error: 'signed out'
			}
		case UserActionTypes.USER_FAILURE:
			return {
				...state,
				error: action.payload,
				isFetching: false
			}
		default:
			return state;
	}
}

export default userReducer;