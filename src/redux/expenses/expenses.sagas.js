import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment';

import {
	fetchExpensesSuccess,
	fetchExpensesFailure,
	setDateRange,
	setCycleDateRange
} from './expenses.actions';

import ExpensesActionTypes from './expenses.types';

export function* fetchExpensesAsync() {
	try {
		const { data } = yield axios.get('/get-expenditures');
		yield put(fetchExpensesSuccess(data));
	} catch (err) {
		yield put(fetchExpensesFailure(err.message))
	}
}

export function* transformTimeFrame({payload}) {
	const { timeFrame, isTarget } = payload;
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
			default:
				return { startDate: moment().date(1), endDate: moment().endOf('month')}
		}
	}
	const dateRange = yield getDateRange(timeFrame);
	isTarget
		? 	yield put(setCycleDateRange(dateRange))
		: 	yield put(setDateRange(dateRange))
	
}

export function* getCycleDates({payload}) {

}

export function* fetchExpensesStart() {
	yield takeLatest(
		ExpensesActionTypes.FETCH_EXPENSES_START, 
		fetchExpensesAsync
	)
}

export function* setTimeFrame() {
	yield takeLatest(
		ExpensesActionTypes.SET_TIME_FRAME, 
		transformTimeFrame
	)
}

export function* expensesSagas() {
	yield all([
		call(fetchExpensesStart),
		call(setTimeFrame)
	])
}