import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './expense-input.styles.scss';

const ExpenseInput = () => {
	const [expense, setExpense] = useState({amount: '', type: ''});
	const { amount, type } = expense;

	const handleSubmit = async event => {
		event.preventDefault();

		//send expense to database
		// timestamp, amount, type
	}

	const handleChange = event => {
		const { value, name } = event.target;
		setExpense({ ...expense, [name]: value });
	}

	return (
		<div className='expense-input'>
			<form onSubmit={handleSubmit}>
				<div className='form'>
					<FormInput 
						name='amount' 
						type='amount' 
						value={amount} 
						label='amount'
						handleChange={handleChange}
						required 
					/>
					<FormInput 
						name='type' 
						type='type' 
						value={type} 
						label='type'
						handleChange={handleChange}
						required 
					/>
					<CustomButton 
						type='submit'
					> 
						Spent 
					</CustomButton>
				</div>
			</form>
		</div>
	)
}

export default ExpenseInput;