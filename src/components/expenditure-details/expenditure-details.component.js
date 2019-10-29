import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas, dateAndTime } from '../../utils';
import axiosConfig from '../../axios-config';

import { selectSelectedExpense } from '../../redux/expenses/expenses.selectors';
import { setExpenseToEdit } from '../../redux/expenses/expenses.actions';

import CustomButton from '../../components/custom-button/custom-button.component';

import './expenditure-details.styles.scss';

const mapStateToProps = createStructuredSelector({
	selectedExpense: selectSelectedExpense
})

const mapDispatchToProps = dispatch => ({
	setExpenseToEdit: expense => dispatch(setExpenseToEdit(expense))
})

const ExpenditureDetails = ({ selectedExpense, setExpenseToEdit }) => {
	if (!selectedExpense) return <div className='expenditure-details'/>
	const { expenditure_id, amount, timestamp, type } = selectedExpense;

	const deleteExpense = async expenditure_id => {
		axiosConfig('post', '/delete-expense', { 
			expenditure_id 
		})
	}


	return (
		<div className='expenditure-details'>
			<span>{dateAndTime(timestamp)}</span>
			<h1>${numberWithCommas(amount)}</h1>
			<span>{type}</span>
			<div className='button-container'>
				<CustomButton onClick={()=>deleteExpense(expenditure_id)}> 
					delete 
				</CustomButton>
				<CustomButton 
					onClick={()=>setExpenseToEdit(selectedExpense)}
				> 
					edit 
				</CustomButton>
			</div>
		</div>
	)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpenditureDetails);