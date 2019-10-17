import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import loadingReducer from './loading/loading.reducer';
import alertReducer from './alert/alert.reducer';

const rootReducer = combineReducers({
	user: userReducer,
	loading: loadingReducer,
	alert: alertReducer
})

export default rootReducer;