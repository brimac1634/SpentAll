import ExpensesActionTypes from './expenses.types';

export const fetchExpensesStart = userID => ({
	type: ExpensesActionTypes.FETCH_EXPENSES_START,
	payload: userID
})

export const fetchExpensesSuccess = expenses => ({
	type: ExpensesActionTypes.FETCH_EXPENSES_SUCCESS,
	payload: expenses
})

export const fetchExpensesFailure = errorMessage => ({
	type: ExpensesActionTypes.FETCH_EXPENSES_FAILURE,
	payload: errorMessage
})