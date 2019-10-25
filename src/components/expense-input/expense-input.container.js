import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsUserSettingsLoaded } from '../../redux/user/user.selectors';

import WithLoader from '../../components/with-loader/with-loader.component';
import ExpenseInput from './expense-input.component';

const mapStateToProps = createStructuredSelector({
	isLoading: state => !selectIsUserSettingsLoaded(state)
})

const ExpenseInputContainer = compose(
	connect(mapStateToProps),
	WithLoader
)(ExpenseInput);

export default ExpenseInputContainer;
 
