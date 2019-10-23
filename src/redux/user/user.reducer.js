import UserActionTypes from './user.types';

const initialState = {
	currentUser: null,
	error: null,
	isFetching: true
} 

const userReducer = (state=initialState, action) => {
	switch(action.type) {
		case UserActionTypes.CHECK_USER_SESSION:
		case UserActionTypes.EMAIL_SIGN_IN_START:
			return {
				...state,
				isFetching: true
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
		case UserActionTypes.SIGN_IN_FAILURE:
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