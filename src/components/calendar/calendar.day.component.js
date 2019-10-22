import React from 'react';

import './calendar.styles.scss'

const Day = ({ day, select, selected }) => {
	const { date, isCurrentMonth, isToday, number } = day;
    return (
        <span 
            key={date.toString()} 
            className={'day' + (isToday ? ' today' : '') + (isCurrentMonth ? '' : ' different-month') + (date.isSame(selected) ? ' selected' : '')} 
            onClick={()=>select(day)}
        >
            <div className='day-number'>{number}</div>
        </span>
    );
}

export default Day;