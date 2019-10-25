import React from 'react';

import './calendar.styles.scss'

const DayNames = () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return (
        <div className="calendar-row day-names">
            {dayNames.map(day => (
                <span className="day" key={day}><h3>{day}</h3></span>
            ))}
        </div>
    );
}

export default DayNames;