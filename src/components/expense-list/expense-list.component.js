import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectExpensesList } from '../../redux/expenses/expenses.selectors';

import ListItem from '../list-item/list-item.component';

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
						<ListItem 
							key={i} 
							expense={expense}
						/>
					))
				}
		</div>
	)
}

export default connect(mapStateToProps)(ExpenseList);