import { takeLatest, put, all, call } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import axiosConfig from '../../axios-config';

import UserActionTypes from './user.types';

import { 
	setSuccessMessage,
	userFailure,
	signInSuccess,
	signOutSuccess,
	updateSettingsSuccess
} from './user.actions';

import { setTimeFrame } from '../expenses/expenses.actions';
import { setAlert } from '../alert/alert.actions';

export function* handleError(error) {
	yield put(userFailure(error))
	yield put(setAlert(error.title))
}

export function* setSettings({ target, cycle, currency, categories }) {
	yield put(updateSettingsSuccess({ 
		target, 
		cycle, 
		currency,
		categories: categories ? categories.split(',') : []
	}));
	yield put(setTimeFrame({ timeFrame: cycle, isTarget: true }))
	yield put(setTimeFrame({ timeFrame: cycle, isTarget: false }))
}

export function* updateSettings({ payload }) {
	try {
		const { target, categories } = payload;
		const settings = {
			...payload,
			target: Number(target).toFixed(0),
			categories: categories.join(',')
		}
		const { data } =  yield axiosConfig('post', '/update-settings', settings)
		if (data.error) {
			yield handleError(data.error)
			yield put(setAlert('unable to update settings'))
		} else {
			yield call(setSettings, data)
			yield put(setAlert('settings updated!'))
		}
	} catch (err) {
		yield put(userFailure(err))
	}
}

export function* handleSignIn(user) {
	const { userName, userEmail } = user;
	yield call(setSettings, user)
	yield put(signInSuccess({ userName, userEmail }));
}

export function* parseLoginWithToken(data) {
	try {	
		if (data.error) {
			yield handleError(data.error)
		} else {
			const { user, token } = data;
			const cookies = new Cookies();
			cookies.set('authToken', token, { path: '/' });
			yield call(handleSignIn, user)
		}
	} catch (err) {
		yield put(userFailure(err))
	}
}


export function* signInWithEmail({ payload: { email, password }}) {
	try {
		const { data } = yield axiosConfig('post', '/login', {email, password})
		if (data) {
			yield call(parseLoginWithToken, data)
		} else {
			yield put(userFailure('unable to login'))
		}
	} catch (err) {
		yield put(userFailure(err))
	}
}

export function* signUpWithEmail({ payload: { name, email }}) {
	try {
		const { data } = yield axiosConfig('post', '/register', {name, email})
		if (data.error) {
			yield handleError(data.error)
		} else {
			yield put(setSuccessMessage('Please check your email for a verification link!'))
		}
	} catch (err) {
		yield put(userFailure(err))
	}
}

export function* resetAccount({ payload: { email }}) {
	try {
		const { data } = yield axiosConfig('post', '/reset', {email})
		if (data.error) {
			yield handleError(data.error)
		} else {
			yield put(setSuccessMessage('Please check your email for a reset link!'))
		}
	} catch (err) {
		yield put(userFailure(err))
	}
}

export function* register({ payload: { password, token }}) {
	try {
		const { data } = yield axiosConfig('post', '/complete-register', {password, token})
		if (data.error) {
			yield handleError(data.error)
		} else {
			yield call(parseLoginWithToken, data)
		}
	} catch (err) {
		yield put(userFailure(err))
	}
}

export function* signInWithFacebook({ payload: { accessToken, id, email, name } }) {
	try {
		const { data } = yield axiosConfig('post', '/api/v1/auth/facebook', {accessToken, id, email, name})
		if (data) {
			yield call(parseLoginWithToken, data)
		} else {
			yield put(userFailure('unable to login'))
		}
	} catch (err) {
		yield put(userFailure(err))
	}
}

export function* isUserAuthenticated() {
	const cookies = new Cookies();
    const token = cookies.get('authToken')
    if (token) {
    	try {
			const { data } = yield axiosConfig('get', '/check-user')
			if (data.error) {
				yield handleError(data.error)
			} else {
				yield call(handleSignIn, data)
			}
		} catch (err) {
		    yield put(userFailure('no user'))
		}
    } else {
    	yield put(userFailure('no user'))
    }
}

export function* signOut() {
	const cookies = new Cookies();
    cookies.remove('authToken', { path: '/' });
    yield put(signOutSuccess())
}

export function* deleteAccount() {
	try {
		const { data } = yield axiosConfig('get', '/delete-account')
		console.log(data)
		if (data === 'user deleted') {
			yield call(signOut)
		} else {
			yield put(userFailure('unable to delete account'))
		}
	} catch (err) {
		yield put(userFailure(err))
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,
		signInWithEmail
	)
}

export function* onSignInWithFacebookStart() {
	yield takeLatest(UserActionTypes.SIGN_IN_WITH_FACEBOOK_START,
		signInWithFacebook
	)
}

export function* onEmailSignUpStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_UP_START,
		signUpWithEmail
	)
}

export function* onReset() {
	yield takeLatest(UserActionTypes.RESET_START,
		resetAccount
	)
}

export function* onRegisterStart() {
	yield takeLatest(UserActionTypes.REGISTER_START,
		register
	)
}

export function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onUpdateSettings() {
	yield takeLatest(UserActionTypes.UPDATE_SETTINGS_START, 
		updateSettings)
}

export function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onDeleteAccountStart() {
	yield takeLatest(UserActionTypes.DELETE_ACCOUNT_START, deleteAccount)
}

export function* userSagas() {
	yield all([
		call(onEmailSignInStart),
		call(onSignInWithFacebookStart),
		call(onEmailSignUpStart),
		call(onReset),
		call(onRegisterStart),
		call(onCheckUserSession),
		call(onUpdateSettings),
		call(onSignOutStart),
		call(onDeleteAccountStart)
	])
}

