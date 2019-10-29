import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectExpensesList, selectSelectedExpense } from '../../redux/expenses/expenses.selectors';
import { setSelectedExpense } from '../../redux/expenses/expenses.actions';

import ListItem from '../list-item/list-item.component';

import './expense-list.styles.scss';

const mapStateToProps = createStructuredSelector({
	expenseList: selectExpensesList,
	selectedExpense: selectSelectedExpense
})

const mapDispatchToProps = dispatch => ({
	selectExpense: expense => dispatch(setSelectedExpense(expense))
})

const ExpenseList = ({ expenseList, selectExpense, selectedExpense }) => (
	<div className='expense-list'>
			{
				expenseList &&
				expenseList.map((expense, i) => (
					<ListItem 
						key={i} 
						selected={expense === selectedExpense}
						expense={expense}
						onClick={()=>selectExpense(expense.expenditure_id)}
					/>
				))
			}
	</div>
)

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);