import ExpensesActionTypes from './expenses.types';

const INITIAL_STATE = {
	expenses: null,
	isFetching: false,
	errorMessage: undefined
}

const expensesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
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
		default:
			return state;
	}
}

export default expensesReducer;