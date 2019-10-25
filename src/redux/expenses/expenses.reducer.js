import ExpensesActionTypes from './expenses.types';

const INITIAL_STATE = {
	showAddExpense: false,
	timeFrame: 'this month',
	dateRange: {
		startDate: null,
		endDate: null
	},
	cycleDateRange: {
		startDate: null,
		endDate: null
	},
	expenses: null,
	isFetching: false,
	errorMessage: undefined
}

const expensesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ExpensesActionTypes.TOGGLE_ADD_EXPENSE:
			return {
				...state,
				showAddExpense: !state.showAddExpense
			}
		case ExpensesActionTypes.FETCH_EXPENSES_START:
			return {
				...state,
				isFetching: true
			}
		case ExpensesActionTypes.FETCH_EXPENSES_SUCCESS:
			return {
				...state,
				isFetching: false,
				expenses: action.payload
			}
		case ExpensesActionTypes.FETCH_EXPENSES_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload
			}
		case ExpensesActionTypes.SET_TIME_FRAME:
			return {
				...state,
				timeFrame: action.payload.timeFrame
			}
		case ExpensesActionTypes.SET_DATE_RANGE:
			return {
				...state,
				dateRange: action.payload
			}
		case ExpensesActionTypes.SET_CYCLE_DATE_RANGE:
			return {
				...state,
				cycleDateRange: action.payload
			}
		default:
			return state;
	}
}

export default expensesReducer;