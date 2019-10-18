import { takeLatest, put, all, call } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import axios from 'axios';

import UserActionTypes from './user.types';

import { 
	signInSuccess, 
	signInFailure, 
	signOutSuccess
} from './user.actions';

export function* handleSignIn(data) {
	try {	
		if (data.error) {
			yield put(signInFailure(data.error))
		} else {
			const { user: { name, user_id, email }, token } = data;
			yield put(signInSuccess({
				userID: user_id,
				userName: name,
				userEmail: email
			}));
			const cookies = new Cookies();
			cookies.set('authToken', token, { path: '/' });
		}
	} catch (err) {
		yield put(signInFailure(err))
	}
}


export function* signInWithEmail({ payload: { email, password }}) {
	try {
		const { data } = yield axios.post('/login', {email, password})
		if (data) {
			yield call(handleSignIn, data)
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
			const { data } = yield axios.get('/check-user')
			yield put(signInSuccess(data));
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

