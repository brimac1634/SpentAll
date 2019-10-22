import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas } from '../../utils';

import { selectExpensesList, selectTimeFrame } from '../../redux/expenses/expenses.selectors';
import { setTimeFrame } from '../../redux/expenses/expenses.actions';

import ListItem from '../list-item/list-item.component';
import Calendar from '../calendar/calendar.component';
import CustomButton from '../custom-button/custom-button.component';

import './expense-list.styles.scss';

const mapStateToProps = createStructuredSelector({
	timeFrame: selectTimeFrame,
	expenseList: selectExpensesList
})

const mapDispatchToProps = dispatch => ({
	setTimeFrame: timeFrame => dispatch(setTimeFrame(timeFrame))
})

const ExpenseList = ({ setTimeFrame, timeFrame, expenseList }) => {
	const timeFrames = ['today', 'this week', 'this month', 'this year']

	return (
		<div className='expense-list'>
			<div className='time-frames'>
				<h3>Time Frame</h3>
				<div className='buttons'>
					{
						timeFrames.map(time => (
							<CustomButton
								key={time} 
								onClick={()=>setTimeFrame(time)}
							> 
								{time} 
							</CustomButton>
						))
					}
				</div>
				<div className='calendar-box'>
					<Calendar />
				</div>
			</div>
			<div className='center'>
				<h3>Expenditure List</h3>
				<div className='list'>
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
			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);