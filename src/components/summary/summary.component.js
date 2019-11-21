import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas, formatDate, datesAreOnSameDay } from '../../utils';

import { selectTotalExpenses, selectFixedDateRange, selectTimeTitle,
selectCurrencySymbol } from '../../redux/expenses/expenses.selectors';

import './summary.styles.scss';

const mapStateToProps = createStructuredSelector({
	totalExpense: selectTotalExpenses,
	dateRange: selectFixedDateRange,
	currency: selectCurrencySymbol,
	timeTitle: selectTimeTitle
})

const Summary = ({ totalExpense, dateRange, currency, timeTitle }) => {
	if (!totalExpense || !dateRange) return <span>No Data</span>
	let { startDate, endDate } = dateRange;
	let dateLabel;
	if (datesAreOnSameDay(startDate, endDate)) {
		startDate = formatDate(startDate.toDate());
		dateLabel = startDate;
	} else {
		startDate = formatDate(startDate.toDate());
		endDate = formatDate(endDate.toDate());
		dateLabel = `${startDate} to ${endDate}`;
	}
	
	return (
		<div className='summary'>
			<h1>{currency}{numberWithCommas(totalExpense, true)}</h1>
			<span>{timeTitle ? `(${timeTitle})` : ''}</span>
			<span>{dateLabel}</span>
		</div>
	)
}

export default connect(mapStateToProps)(Summary);