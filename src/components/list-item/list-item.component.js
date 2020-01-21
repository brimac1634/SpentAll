import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { numberWithCommas, formatDate } from '../../utils';

import Checkbox from '../../components/checkbox/checkbox.component';

import { selectCurrency } from '../../redux/user/user.selectors';

import './list-item.styles.scss';

const mapStateToProps = createStructuredSelector({
	currency: selectCurrency
})

const ListItem = ({ key, currency, expense, selected, onClick, checked, handleCheck }) => {
	const { timestamp, type, amount } = expense;
	const formattedDate = formatDate(new Date(timestamp), true)
	return (
		<div className={`list-item ${selected ? 'selected' : null}`} onClick={onClick}>
			<div className={`item-interior ${selected ? null : 'show-int'}`}>
				<span>{formattedDate}</span>
				<span>{type}</span>
				<span>{currency} {numberWithCommas(amount, true, true)}</span>
			</div>
			<div className='fixed-checkbox'>
				<Checkbox 
					selected={checked}
					onClick={handleCheck}
				/>
			</div>
			<div className={`arrow-container ${selected ? 'show-arr' : null}`}>
				<div className='arrow' />
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(ListItem);