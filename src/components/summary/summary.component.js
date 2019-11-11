import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas, formatDate } from '../../utils';

import { selectTotalExpenses, selectFixedDateRange, selectTimeTitle } from '../../redux/expenses/expenses.selectors';
import { selectCurrency } from '../../redux/user/user.selectors';

import './summary.styles.scss';

const mapStateToProps = createStructuredSelector({
	totalExpense: selectTotalExpenses,
	dateRange: selectFixedDateRange,
	currency: selectCurrency,
	timeTitle: selectTimeTitle
})

const Summary = ({ totalExpense, dateRange, currency, timeTitle }) => {
	if (!totalExpense || !dateRange) return <span>No Data</span>
	let { startDate, endDate } = dateRange;
	startDate = formatDate(startDate.toDate());
	endDate = formatDate(endDate.toDate());
	return (
		<div className='summary'>
			<h1>{currency}{numberWithCommas(totalExpense, true)}</h1>
			<span>{timeTitle ? `(${timeTitle})` : ''}</span>
			<span>{startDate} to {endDate}</span>
		</div>
	)
}

export default connect(mapStateToProps)(Summary);