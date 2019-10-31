import UserActionTypes from './user.types';

export const emailSignUpStart = nameAndEmail => ({
	type: UserActionTypes.EMAIL_SIGN_UP_START,
	payload: nameAndEmail
});

export const signUpSuccess = message => ({
	type: UserActionTypes.SIGN_UP_SUCCESS,
	payload: message
})

export const registerStart = passwordAndTokenAndSettings => ({
	type: UserActionTypes.REGISTER_START,
	payload: passwordAndTokenAndSettings
});

export const emailSignInStart = emailAndPassword => ({
	type: UserActionTypes.EMAIL_SIGN_IN_START,
	payload: emailAndPassword
});

export const signInSuccess = user => ({
	type: UserActionTypes.SIGN_IN_SUCCESS,
	payload: user
})

export const userFailure = error => ({
	type: UserActionTypes.USER_FAILURE,
	payload: error
})

export const checkUserSession = () => ({
	type: UserActionTypes.CHECK_USER_SESSION
})

export const setUserSettings = settings => ({
	type: UserActionTypes.SET_USER_SETTINGS,
	payload: settings
})

export const signOutStart = () => ({
	type: UserActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
	type: UserActionTypes.SIGN_OUT_SUCCESS
})