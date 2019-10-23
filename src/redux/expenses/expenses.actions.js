import ExpensesActionTypes from './expenses.types';

export const fetchExpensesStart = () => ({
	type: ExpensesActionTypes.FETCH_EXPENSES_START
})

export const fetchExpensesSuccess = expenses => ({
	type: ExpensesActionTypes.FETCH_EXPENSES_SUCCESS,
	payload: expenses
})

export const fetchExpensesFailure = errorMessage => ({
	type: ExpensesActionTypes.FETCH_EXPENSES_FAILURE,
	payload: errorMessage
})

export const setTimeFrame = timeFrameAndType => ({
	type: ExpensesActionTypes.SET_TIME_FRAME,
	payload: timeFrameAndType
})

export const setDateRange = dateRange => ({
	type: ExpensesActionTypes.SET_DATE_RANGE,
	payload: dateRange
})

export const setCycleDateRange = cycleDateRange => ({
	type: ExpensesActionTypes.SET_CYCLE_DATE_RANGE,
	payload: cycleDateRange
})