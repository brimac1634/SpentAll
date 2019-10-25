import React from 'react';

import { numberWithCommas, formatDate } from '../../utils';

import './list-item.styles.scss';

const ListItem = ({ expense, selected, ...otherProps }) => {
	const { timestamp, type, amount } = expense;
	const formattedDate = formatDate(new Date(timestamp))
	return (
		<div className={`list-item ${selected ? 'selected' : null}`} {...otherProps}>
			<span>{formattedDate}</span>
			<span>{type}</span>
			<span>{`$${numberWithCommas(amount)}`}</span>
		</div>
	)
}

export default ListItem;