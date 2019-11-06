import ExpensesActionTypes from './expenses.types';

export const toggleAddExpense = () => ({
	type: ExpensesActionTypes.TOGGLE_ADD_EXPENSE
})

export const fetchExpensesStart = () => ({
	type: ExpensesActionTypes.FETCH_EXPENSES_START
})

export const fetchExpensesSuccess = expenses => ({
	type: ExpensesActionTypes.FETCH_EXPENSES_SUCCESS,
	payload: expenses
})

export const setExpensesFailure = errorMessage => ({
	type: ExpensesActionTypes.EXPENSES_FAILURE,
	payload: errorMessage
})

export const newExpenseStart = expense => ({
	type: ExpensesActionTypes.NEW_EXPENSE_START,
	payload: expense
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

export const setSelectedExpense = selectedExpense => ({
	type: ExpensesActionTypes.SET_SELECTED_EXPENSE,
	payload: selectedExpense
})

export const setExpenseToEdit = expenseToEdit => ({
	type: ExpensesActionTypes.SET_EXPENSE_TO_EDIT,
	payload: expenseToEdit
})

export const deleteExpenseStart = expenseID => ({
	type: ExpensesActionTypes.DELETE_EXPENSE_START,
	payload: expenseID
})