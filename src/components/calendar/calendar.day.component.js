import React from 'react';

import { checkDateRange } from '../../utils';

import './calendar.styles.scss'

const Day = ({ day, select, dateRange }) => {
    const { startDate, endDate } = dateRange;
	const { date, isCurrentMonth, isToday, number } = day;
    const selected = checkDateRange(date, startDate, endDate);
    
    return (
        <span 
            key={date.toString()} 
            className={'day' + (isToday ? ' today' : '') + (isCurrentMonth ? '' : ' different-month') + (selected ? ' selected' : '')} 
            onClick={()=>select(day)}
        >
            <div className='day-number'>{number}</div>
        </span>
    );
}

export default Day;