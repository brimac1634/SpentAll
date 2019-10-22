import React from 'react';

import Day from './calendar.day.component';

import './calendar.styles.scss'

const Week = (props) => {
	let days = [];
    let { date } = props;
    const { month, dateRange, select } = props;

    for (var i = 0; i < 7; i++) {
        let day = {
            name: date.format("dd").substring(0, 1),
            number: date.date(),
            isCurrentMonth: date.month() === month.month(),
            isToday: date.isSame(new Date(), 'day'),
            date: date
        };
        days.push(
            <Day 
                key={i}
	            day={day}
	            dateRange={dateRange}
	            select={select}
            />
        );

        date = date.clone();
        date.add(1, "day");
    }

    return (
        <div className="calendar-row week" key={days[0]}>
            {days}
        </div>
    );
}

export default Week;