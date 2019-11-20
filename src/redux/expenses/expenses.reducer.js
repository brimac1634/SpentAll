import ExpensesActionTypes from './expenses.types';
import currencies from './expenses.data';
import { correctTimezone } from '../../utils';

const INITIAL_STATE = {
	currencies,
	showAddExpense: false,
	newExpense: {
		timestamp: new Date(),
		currency: '',
		amount: '', 
		type: '',
		notes: ''
	},
	timeFrame: 'this month',
	dateRange: {
		startDate: null,
		endDate: null
	},
	cycleDateRange: {
		startDate: null,
		endDate: null
	},
	selectedExpense: null,
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
		case ExpensesActionTypes.NEW_EXPENSE_START:
		case ExpensesActionTypes.DELETE_EXPENSE_START:
			return {
				...state,
				isFetching: true
			}
		case ExpensesActionTypes.EDIT_NEW_EXPENSE:
			const expense = action.payload
			return {
				...state,
				newExpense: expense
			}
		case ExpensesActionTypes.FETCH_EXPENSES_SUCCESS:
			return {
				...state,
				isFetching: false,
				expenses: action.payload.map(item => {
					return {
						...item,
						timestamp: correctTimezone(new Date(item.timestamp))
					}
				})
			}
		case ExpensesActionTypes.EXPENSES_FAILURE:
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
		case ExpensesActionTypes.SET_SELECTED_EXPENSE:
			return {
				...state,
				selectedExpense: action.payload
			}
		default:
			return state;
	}
}

export default expensesReducer;