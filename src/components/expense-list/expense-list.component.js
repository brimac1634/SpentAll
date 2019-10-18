import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas } from '../../utils';

import { selectExpensesList } from '../../redux/expenses/expenses.selectors';

import './expense-list.styles.scss';

const mapStateToProps = createStructuredSelector({
	expenseList: selectExpensesList
})

const ExpenseList = ({ expenseList }) => {

	return (
		<div className='expense-list'>
			{
				expenseList &&
				expenseList.map((expense, i) => (
					<span key={i}>{expense.type} ${numberWithCommas(expense.amount)}</span>
				))
			}
		</div>
	)
}

export default connect(mapStateToProps)(ExpenseList);