import React, { useState } from 'react';
import moment from 'moment';

import Week from './calendar.week.component';
import DayNames from './calendar.day-names.component';

import './calendar.styles.scss'

const Calendar = () => {
	const [month, setMonth] = useState(moment());

	// select(day, entry) {
	// 	const { selectEntry } = this.props;
	//     this.setState({
	//       selected: day.date,
	//       month: day.date.clone(),
	//     });
	//     selectEntry(entry)
 //    }

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
				// select={(day, entry)=>this.select(day, entry)} 
				// selected={selected} 
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
    console.log(month)

	return (
      <section className="calendar">
        <header className="cal-header">
          <div className="month-display calendar-row">
            <div 
            	className="arrow" 
            	onClick={()=>setMonth(month.subtract(1, 'month'))}
            >
        		<p>&#10094;</p>
			</div>
            <span className="month-label">
            	<h3>{month.format("MMMM YYYY")}</h3>
            </span>;
        	<div 
        		className="arrow" 
        		onClick={isNotThisMonth 
        			? ()=>setMonth(month.add(1,'month')) 
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

export default Calendar;