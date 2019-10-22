import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas } from '../../utils';

import { selectExpensesList } from '../../redux/expenses/expenses.selectors';

import ListItem from '../list-item/list-item.component';
import CustomButton from '../custom-button/custom-button.component';

import './expense-list.styles.scss';

const mapStateToProps = createStructuredSelector({
	expenseList: selectExpensesList
})

const ExpenseList = ({ expenseList }) => {
	const [timeFrame, setTimeFrame] = useState('this month');

	const filterExpenses = (frame, list) => {
		if (!list) return;
		const today = new Date();
		const date = timestamp => new Date(timestamp);
		switch (frame) {
			case 'this year':
				return list.filter(({ timestamp }) => {
					return date(timestamp).getFullYear() === today.getFullYear();
				})
			case 'this month':
				return list.filter(({ timestamp }) => {
					return date(timestamp).getMonth() === today.getMonth();
				})
			case 'this week':
				return list.filter(({ timestamp }) => {
					const dayOfWeek = today.getDay();
					return date(timestamp).getDate() >= today.getDate() - dayOfWeek;
				})
			case 'today':
				return list.filter(({ timestamp}) => {
					return date(timestamp).getDate() === today.getDate();
				})
			case 'last 30 days':
				return list.filter(({ timestamp}) => {
					return date(timestamp).getDate() >= today.getDate() - 30;
				})
			case 'last 7 days':
				return list.filter(({ timestamp}) => {
					return date(timestamp).getDate() >= today.getDate() - 7;
				})

			default:
				return list.filter(({ timestamp }) => {
					return date(timestamp).getMonth() === new Date().getMonth();
				})
		}
	}
	const filteredList = filterExpenses(timeFrame, expenseList);
	const timeFrames = ['today', 'this week', 'this month', 'this year']

	return (
		<div className='expense-list'>
			<div className='time-frames'>
				<h3>Time Frame</h3>
				<div className='buttons'>
					{
						timeFrames.map(time => (
							<CustomButton 
								onClick={()=>setTimeFrame(time)}
							> 
								{time} 
							</CustomButton>
						))
					}
				</div>
				<div className='calendar'>

				</div>
			</div>
			<div className='center'>
				<h3>Expenditure List</h3>
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
		</div>
	)
}

export default connect(mapStateToProps)(ExpenseList);