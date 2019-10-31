import { takeLatest, put, all, call } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import axiosConfig from '../../axios-config';

import UserActionTypes from './user.types';

import { 
	signUpSuccess,
	userFailure,
	signInSuccess,
	signOutSuccess,
	setUserSettings
} from './user.actions';

import { setTimeFrame } from '../expenses/expenses.actions';
import { setAlert } from '../alert/alert.actions';

export function* handleSignIn(user) {
	const { userName, userEmail, target, cycle, currency, categories } = user;
	yield put(setUserSettings({ 
		target, 
		cycle, 
		currency,
		categories: categories ? categories.split(',') : []
	}));
	yield put(setTimeFrame({ timeFrame: cycle, isTarget: true }))
	yield put(signInSuccess({ userName, userEmail }));
}

export function* parseLoginWithToken(data) {
	try {	
		if (data.error) {
			const { error } = data;
			yield put(userFailure(error))
			yield put(setAlert(error.title))
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
			const { error } = data;
			yield put(userFailure(error))
			yield put(setAlert(error.title))
		} else {
			yield put(signUpSuccess('Please check your email for a verification line'))
		}
	} catch (err) {
		yield put(userFailure(err))
	}
}

export function* register({ payload: { password, token, settings }}) {
	try {
		const { data } = yield axiosConfig('post', '/complete-register', {password, token, settings})
		if (data.error) {
			const { error } = data;
			yield put(userFailure(error))
			yield put(setAlert(error.title))
		} else {
			yield call(parseLoginWithToken, data)
		}
	} catch (err) {
		yield put(userFailure(err))
	}
}

// export function* signInWithFacebook({ payload: { accessToken, id, email, name } }) {
// 	try {
// 		const data = yield apiRequest('POST', '/api/v1/auth/facebook', {accessToken, id, email, name})
// 		yield call(handleSignIn, data)
// 	} catch (err) {
// 		yield put(userFailure(err))
// 	}
// }

export function* isUserAuthenticated() {
	const cookies = new Cookies();
    const token = cookies.get('authToken')
    if (token) {
    	try {
			const { data } = yield axiosConfig('get', '/check-user')
			yield call(handleSignIn, data)
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

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,
		signInWithEmail
	)
}

export function* onEmailSignUpStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_UP_START,
		signUpWithEmail
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

export function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* userSagas() {
	yield all([
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onSignOutStart)
	])
}

