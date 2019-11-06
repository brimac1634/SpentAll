import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import expensesReducer from './expenses/expenses.reducer';
import alertReducer from './alert/alert.reducer';

const rootReducer = combineReducers({
	user: userReducer,
	expenses: expensesReducer,
	alert: alertReducer
})

export default rootReducer;