import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas } from '../../utils';

import { selectExpensesList } from '../../redux/expenses/expenses.selectors';
import { setTimeFrame } from '../../redux/expenses/expenses.actions';

import ListItem from '../list-item/list-item.component';
import Calendar from '../calendar/calendar.component';
import LineChart from '../line-chart/line-chart.component';
import CustomButton from '../custom-button/custom-button.component';

import './expense-list.styles.scss';

const mapStateToProps = createStructuredSelector({
	expenseList: selectExpensesList
})

const mapDispatchToProps = dispatch => ({
	setTimeFrame: timeFrame => dispatch(setTimeFrame(timeFrame))
})

const ExpenseList = ({ setTimeFrame, expenseList }) => {
	const timeFrames = ['today', 'this week', 'this month', 'this year']

	useEffect(()=>{
		setTimeFrame('this month')
	}, [setTimeFrame])

	return (
		<div className='expense-list'>
			<div className='panel'>
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
			<div className='panel'>
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
			<div className='panel'>
				<h3>Charts</h3>
				<LineChart />
			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);