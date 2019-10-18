import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { expensesSagas } from './expenses/expenses.sagas';

export default function* rootSaga() {
	yield all([
		call(userSagas),
		call(expensesSagas)
	])
}