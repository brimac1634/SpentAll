import UserActionTypes from './user.types';

export const emailSignUpStart = nameAndEmail => ({
	type: UserActionTypes.EMAIL_SIGN_UP_START,
	payload: nameAndEmail
});

export const setSuccessMessage = message => ({
	type: UserActionTypes.SET_SUCCESS_MESSAGE,
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

export const signInWithFacebookStart = response => ({
	type: UserActionTypes.SIGN_IN_WITH_FACEBOOK_START,
	payload: response
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

export const updateSettingsSuccess = settings => ({
	type: UserActionTypes.UPDATE_SETTINGS_SUCCESS,
	payload: settings
})

export const updateSettingsStart = settings => ({
	type: UserActionTypes.UPDATE_SETTINGS_START,
	payload: settings
})

export const signOutStart = () => ({
	type: UserActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
	type: UserActionTypes.SIGN_OUT_SUCCESS
})

export const resetStart = email => ({
	type: UserActionTypes.RESET_START,
	payload: email
})