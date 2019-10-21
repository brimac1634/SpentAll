import React from 'react';

import { numberWithCommas, formatDate } from '../../utils';

import './list-item.styles.scss';

const ListItem = ({ expense }) => {
	const { timestamp, type, amount } = expense;
	const formattedDate = formatDate(new Date(timestamp))
	return (
		<div className='list-item'>
			<span>{formattedDate}</span>
			<span>{type}</span>
			<span>{`$${numberWithCommas(expense.amount)}`}</span>
		</div>
	)
}

export default ListItem;