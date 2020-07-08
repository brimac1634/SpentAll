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
		const { data } = yield axiosConfig('get', '/expenditures');
		yield put(fetchExpensesSuccess(data));
	} catch (err) {
		const error = err.response?.data || 'Unexpected Error';
		yield put(setExpensesFailure(error));
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
		const { data } = yield axiosConfig('post', '/expenditures/add', payload);
		if (data) {
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
		const error = err.response?.data || 'Unexpected Error';
		yield put(setExpensesFailure(error))
		yield put(setAlert('unable to update expenditures'))
	}
}

export function* deleteExpenseStart({payload}) {
	try {
		const { data } = yield axiosConfig('post', '/expenditures/delete', payload);
		if (data) {
			yield put(fetchExpensesSuccess(data));
			yield put(setAlert('deleted'));
		}
	} catch (err) {
		const error = err.response?.data || 'Unexpected Error';
		yield put(setExpensesFailure(error))
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