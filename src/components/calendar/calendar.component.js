import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDateRange } from '../../redux/expenses/expenses.selectors';
import { setTimeFrame } from '../../redux/expenses/expenses.actions';

import Week from './calendar.week.component';
import DayNames from './calendar.day-names.component';

import './calendar.styles.scss'

const mapStateToProps = createStructuredSelector({
	dateRange: selectDateRange
})

const mapDispatchToProps = dispatch => ({
	setTimeFrame: timeFrame => dispatch(setTimeFrame(timeFrame))
})

const Calendar = ({ dateRange, setTimeFrame }) => {
	const [month, setMonth] = useState(moment());
	const [isStartDate, setIsStartDate] = useState(false);

    const renderWeeks = () => {
	    let weeks = [];
	    let done = false;
	    let date = month.clone().startOf('month').add('w' -1).day('Sunday');
	    let count = 0;
	    let monthIndex = date.month();

	    while (!done) {
			weeks.push(
				<Week 
					key={date} 
					date={date.clone()} 
					month={month}
					select={({ date })=>{
						setTimeFrame({
							timeFrame: 'custom', 
							isTarget: false,
							dateRange: isStartDate
								?	{ ...dateRange, startDate: date}
								: 	{ ...dateRange, endDate: date}
						});
						setMonth(date.clone())
						setIsStartDate(!isStartDate);
					}} 
					dateRange={dateRange} 
				/>
			);

			date.add(1, 'w');

			done = count++ > 2 && monthIndex !== date.month();
			monthIndex = date.month();
	    }
	    return weeks;
    };

    const canGoNext = () => {
		let date = new Date(), y = date.getFullYear(), m = date.getMonth();
	    const firstOfMonth = new Date(y, m, 1);
	    return firstOfMonth > month.toDate()
    }

    const isNotThisMonth = canGoNext()

	return (
      <section className="calendar">
        <header className="cal-header">
          <div className="month-display calendar-row">
            <div 
            	className="arrow" 
            	onClick={()=>setMonth(month.clone().subtract(1, 'month'))}
            >
        		<p>&#10094;</p>
			</div>
            <span className="month-label">
            	<h3>{month.format("MMMM YYYY")}</h3>
            </span>
        	<div 
        		className="arrow" 
        		onClick={isNotThisMonth 
        			? ()=>setMonth(month.clone().add(1,'month')) 
        			: null
        		}
        	>
        		{isNotThisMonth &&
		            <p>&#10095;</p>
				}
			</div>
          </div>
          <DayNames />
        </header>
        {renderWeeks()}
      </section>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);