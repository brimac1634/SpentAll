import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas, formatDate } from '../../utils';

import { selectSelectedExpense } from '../../redux/expenses/expenses.selectors';
import { editNewExpense, toggleAddExpense } from '../../redux/expenses/expenses.actions';

import CustomButton from '../../components/custom-button/custom-button.component';

import './expenditure-details.styles.scss';

const mapStateToProps = createStructuredSelector({
	selectedExpense: selectSelectedExpense
})

const mapDispatchToProps = dispatch => ({
	editNewExpense: expense => dispatch(editNewExpense(expense)),
	toggleAddExpense: () => dispatch(toggleAddExpense())
})

const ExpenditureDetails = ({ selectedExpense, editNewExpense, toggleAddExpense }) => {
	if (!selectedExpense) return <div className='expenditure-details'>No expense selected</div>
	const { currency, amount, timestamp, notes, type } = selectedExpense;
	
	return (
		<div className='expenditure-details'>
			<span>{formatDate(timestamp)}</span>
			<h1>{currency} {numberWithCommas(amount, true, true)}</h1>
			<div className='sub-group'>
				<span className='label'>category: </span>
				<span>{type}</span>
			</div>
			{
				notes &&
				<div className='sub-group'>
					<span className='label'>notes: </span>
					<span>{notes}</span>
				</div>
			}
			<div className='button-container'>
				<CustomButton 
					onClick={()=>{
						editNewExpense(selectedExpense);
						toggleAddExpense();
					}}
				> 
					edit 
				</CustomButton>
			</div>
		</div>
	)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpenditureDetails);