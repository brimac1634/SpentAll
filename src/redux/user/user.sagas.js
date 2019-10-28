import { takeLatest, put, all, call } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import axiosConfig from '../../axios-config';

import UserActionTypes from './user.types';

import { 
	signInSuccess, 
	signInFailure, 
	signOutSuccess,
	setUserSettings
} from './user.actions';

import { setTimeFrame } from '../expenses/expenses.actions';

export function* handleSignIn(user) {
	const { userName, userEmail, target, cycle, categories } = user;
	yield put(setUserSettings({ 
		target, 
		cycle, 
		categories: categories.split(',') 
	}));
	yield put(setTimeFrame({ timeFrame: cycle, isTarget: true }))
	yield put(signInSuccess({ userName, userEmail }));
}

export function* parseLoginWithToken(data) {
	try {	
		if (data.error) {
			yield put(signInFailure(data.error))
		} else {
			const { user, token } = data;
			const cookies = new Cookies();
			cookies.set('authToken', token, { path: '/' });
			yield call(handleSignIn, user)
		}
	} catch (err) {
		yield put(signInFailure(err))
	}
}


export function* signInWithEmail({ payload: { email, password }}) {
	try {
		const { data } = yield axiosConfig('post', '/login', {email, password})
		if (data) {
			yield call(parseLoginWithToken, data)
		} else {
			yield put(signInFailure('unable to login'))
		}
	} catch (err) {
		yield put(signInFailure(err))
	}
}

export function* isUserAuthenticated() {
	const cookies = new Cookies();
    const token = cookies.get('authToken')
    if (token) {
    	try {
			const { data } = yield axiosConfig('get', '/check-user')
			yield call(handleSignIn, data)
		} catch (err) {
		    yield put(signInFailure('no user'))
		}
    } else {
    	yield put(signInFailure('no user'))
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

