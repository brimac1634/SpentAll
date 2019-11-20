import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import axiosConfig from '../../axios-config';
import moment from 'moment';

import {
	fetchExpensesSuccess,
	setExpensesFailure,
	setDateRange,
	setCycleDateRange,
	editNewExpense,
	toggleAddExpense
} from './expenses.actions';

import { setAlert } from '../alert/alert.actions';

import ExpensesActionTypes from './expenses.types';

const newExpense = state => state.expenses.newExpense;

export function* fetchExpensesAsync() {
	try {
		const { data } = yield axiosConfig('get', '/get-expenditures');
		yield put(fetchExpensesSuccess(data));
	} catch (err) {
		yield put(setExpensesFailure(err.message))
	}
}

export function* transformTimeFrame({payload}) {
	const { timeFrame, isTarget, dateRange } = payload;
	const getDateRange = timeFrame => {
		switch (timeFrame) {
			case 'this year':
				return { startDate: moment().dayOfYear(1), endDate: moment().dayOfYear(366)}
			case 'this month':
			case 'monthly':
				return { startDate: moment().date(1), endDate: moment().endOf('month')}
			case 'this week':
			case 'weekly':
				return { startDate: moment().day(0), endDate: moment().day(6)}
			case 'today':
			case 'daily':
				const now = moment();
				return { startDate: now, endDate: now}
			case 'custom':
				return dateRange
			default:
				return { startDate: moment().date(1), endDate: moment().endOf('month')}
		}
	}
	const calculatedDates = yield getDateRange(timeFrame);
	isTarget
		? 	yield put(setCycleDateRange(calculatedDates))
		: 	yield put(setDateRange(calculatedDates))
}

export function* addExpenditureStart({payload}) {
	try {
		const { data } = yield axiosConfig('post', '/add-expenditure', payload);
		if (data.error) {
			const { message } = data.error;
			yield put(setExpensesFailure(message))
			yield put(setAlert('error'));
		} else {
			yield put(fetchExpensesSuccess(data));
			yield put(setAlert(payload.expenditure_id ? 'updated!' : 'spent!'));
			const expense = yield select(newExpense);
			if (payload.expenditure_id) {
				yield put(toggleAddExpense());
				yield put(editNewExpense({
					...expense,
					expenditure_id: null,
					timestamp: new Date(),
					amount: '',
					type: '',
					notes: ''
				}));
			} else {
				yield put(editNewExpense({
					...expense,
					amount: '',
					type: '',
					notes: ''
				}));
			}
		}
	} catch (err) {
		yield put(setExpensesFailure(err.message))
		yield put(setAlert('unable to update expenditures'))
	}
}

export function* deleteExpenseStart({payload}) {
	try {
		const { data } = yield axiosConfig('post', '/delete-expenditure', payload);
		if (data.error) {
			const { message } = data.error;
			yield put(setExpensesFailure(message))
			yield put(setAlert('error'));
		} else {
			yield put(fetchExpensesSuccess(data));
			yield put(setAlert('deleted'));
		}
	} catch (err) {
		yield put(setExpensesFailure(err.message))
		yield put(setAlert('failed to delete'))
	}
}

export function* fetchExpensesStart() {
	yield takeLatest(
		ExpensesActionTypes.FETCH_EXPENSES_START, 
		fetchExpensesAsync
	)
}

export function* onAddExpenditureStart() {
	yield takeLatest(
		ExpensesActionTypes.NEW_EXPENSE_START, 
		addExpenditureStart
	)
}

export function* setTimeFrame() {
	yield takeLatest(
		ExpensesActionTypes.SET_TIME_FRAME, 
		transformTimeFrame
	)
}

export function* onDeleteExpenseStart() {
	yield takeLatest(
		ExpensesActionTypes.DELETE_EXPENSE_START, 
		deleteExpenseStart
	)
}

export function* expensesSagas() {
	yield all([
		call(fetchExpensesStart),
		call(onAddExpenditureStart),
		call(setTimeFrame),
		call(onDeleteExpenseStart)
	])
}