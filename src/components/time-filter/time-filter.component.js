import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectTimeFrame } from '../../redux/expenses/expenses.selectors';
import { setTimeFrame } from '../../redux/expenses/expenses.actions';

import Calendar from '../calendar/calendar.component';
import CustomButton from '../custom-button/custom-button.component';

import './time-filter.styles.scss';

const mapStateToProps = createStructuredSelector({
	timeFrame: selectTimeFrame
})

const mapDispatchToProps = dispatch => ({
	setTimeFrame: timeFrame => dispatch(setTimeFrame(timeFrame))
})

const ExpenseList = ({ setTimeFrame, timeFrame }) => {
	const timeFrames = ['today', 'this week', 'this month', 'this year']

	useEffect(()=>{
		setTimeFrame('this month')
	}, [setTimeFrame])

	return (
		<div className='time-filter'>
			<div className='buttons'>
				{
					timeFrames.map(time => (
						<CustomButton
							key={time} 
							selected={time === timeFrame}
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
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);