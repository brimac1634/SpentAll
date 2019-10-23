import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchExpensesSuccess } from '../../redux/expenses/expenses.actions';
import { setAlert } from '../../redux/alert/alert.actions'; 

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './expense-input.styles.scss';

const mapDispatchToProps = dispatch => ({
	updateExpenses: expenses => dispatch(fetchExpensesSuccess(expenses)),
	setAlert: alert => dispatch(setAlert(alert))
})

const ExpenseInput = ({ updateExpenses, setAlert }) => {
	const [expense, setExpense] = useState({amount: '', type: ''});
	let { amount, type } = expense;


	const handleSubmit = async event => {
		event.preventDefault();
		axios.post('/add-expenditure', {
			type, 
			amount, 
			timestamp: new Date()
		}).then(({ data }) => {
			updateExpenses(data)
			setAlert('spent!')
			setExpense({amount: '', type: ''})
		}).catch(err => {
			setAlert('unable to update expenditures')
			console.log(err)
		})
	}

	const handleChange = event => {
		let { value, name } = event.target;
		setExpense({ ...expense, [name]: value });
	}

	return (
		<div className='expense-input'>
			<form onSubmit={handleSubmit}>
				<div className='form'>
					<FormInput 
						name='amount' 
						type='number' 
						min='0'
						value={amount} 
						label='$'
						placeholder='125.50'
						handleChange={handleChange}
						required 
					/>
					<FormInput 
						name='type' 
						type='text' 
						value={type} 
						label='type'
						placeholder='lunch'
						handleChange={handleChange}
						required 
					/>
					<CustomButton 
						selected
						type='submit'
					> 
						Spent 
					</CustomButton>
				</div>
			</form>
		</div>
	)
}

export default connect(null, mapDispatchToProps)(ExpenseInput);