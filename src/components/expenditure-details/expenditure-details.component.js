import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas, formatDate } from '../../utils';

import { selectSelectedExpense } from '../../redux/expenses/expenses.selectors';

import './expenditure-details.styles.scss';

const mapStateToProps = createStructuredSelector({
	selectedExpense: selectSelectedExpense
})

const ExpenditureDetails = ({ selectedExpense }) => {
	if (!selectedExpense) return <div className='expenditure-details'/>
	const { amount, timestamp, type } = selectedExpense;
	const date = new Date(timestamp)
	return (
		<div className='expenditure-details'>
			<span>{formatDate(date)}</span>
			<h1>${numberWithCommas(amount)}</h1>
			<span>{type}</span>
		</div>
	)
}
export default connect(mapStateToProps)(ExpenditureDetails);