import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { numberWithCommas, formatDate } from '../../utils';

import { selectCurrency } from '../../redux/user/user.selectors';

import './list-item.styles.scss';

const mapStateToProps = createStructuredSelector({
	currency: selectCurrency
})

const ListItem = ({ currency, expense, selected, onClick }) => {
	const { timestamp, type, amount } = expense;
	const formattedDate = formatDate(new Date(timestamp), true)
	return (
		<div className={`list-item ${selected ? 'selected' : null}`} onClick={onClick}>
			<span>{formattedDate}</span>
			<span>{type}</span>
			<span>{currency} {numberWithCommas(amount, true, true)}</span>
		</div>
	)
}

export default connect(mapStateToProps)(ListItem);