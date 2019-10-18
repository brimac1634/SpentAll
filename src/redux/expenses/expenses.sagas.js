import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import {
	fetchExpensesSuccess,
	fetchExpensesFailure
} from './expenses.actions';

import ExpensesActionTypes from './expenses.types';

export function* fetchExpensesAsync({payload}) {
	try {
		const { data } = yield axios.post('/get-expenditures', { user_id: payload 
		});
		const expenses = data.map(expense => {
			return { ...expense, amount: expense.amount / 100}
		})
		yield put(fetchExpensesSuccess(expenses));
	} catch (err) {
		yield put(fetchExpensesFailure(err.message))
	}
}

export function* fetchExpensesStart() {
	yield takeLatest(
		ExpensesActionTypes.FETCH_EXPENSES_START, 
		fetchExpensesAsync
	)
}

export function* expensesSagas() {
	yield all([call(fetchExpensesStart)])
}