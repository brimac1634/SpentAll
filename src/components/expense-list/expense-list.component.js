import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas } from '../../utils';

import { selectExpensesList } from '../../redux/expenses/expenses.selectors';

import ListItem from '../list-item/list-item.component';

import './expense-list.styles.scss';

const mapStateToProps = createStructuredSelector({
	expenseList: selectExpensesList
})

const ExpenseList = ({ expenseList }) => {
	const [timeFrame, setTimeFrame] = useState('today');

	const filterExpenses = (frame, list) => {
		if (!list) return;
		const date = timestamp => new Date(timestamp);
		switch (frame) {
			case 'month':
				return list.filter(({ timestamp }) => {
					return date(timestamp).getMonth() === new Date().getMonth();
				})
			case 'today':
				return list.filter(({ timestamp}) => {
					return date(timestamp).getDate() === new Date().getDate();
				})
			default:
				return 'hey'
		}
	}
	const filteredList = filterExpenses(timeFrame, expenseList);

	return (
		<div className='expense-list'>
			<div className='time-frames'>

			</div>
			<div className='list'>
				{
					filteredList &&
					filteredList.map((expense, i) => (
						<ListItem 
							key={i} 
							expense={expense}
						/>
					))
				}
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(ExpenseList);