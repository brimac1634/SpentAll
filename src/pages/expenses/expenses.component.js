import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import { fetchExpensesStart } from '../../redux/expenses/expenses.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import ExpenseList from '../../components/expense-list/expense-list.component';

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
})

// const mapDispatchToProps = dispatch => ({
// 	fetchExpenses: userID => dispatch(fetchExpensesStart(userID))
// })

const Expenses = ({ currentUser }) => {
	// useEffect(()=>{
	// 	if (!currentUser) return;
	// 	fetchExpenses(currentUser.userID)
	// }, [fetchExpenses, currentUser])

	return (
		<ExpenseList />
	)
}

export default connect(mapStateToProps)(Expenses);