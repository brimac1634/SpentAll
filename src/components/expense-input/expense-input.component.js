import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import { numberWithCommas } from '../../utils';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './expense-input.styles.scss';

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
})

const ExpenseInput = ({ currentUser }) => {
	const [expense, setExpense] = useState({amount: '', type: ''});
	let { amount, type } = expense;


	const handleSubmit = async event => {
		event.preventDefault();
		const { userID } = currentUser;
		axios.post('/add-expenditure', {
			user_id: userID, 
			type, 
			amount, 
			timestamp: new Date()
		}).then(({ data }) => {
			console.log(data)
		}).catch(err => console.log(err))
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
						label='$'
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

export default connect(mapStateToProps)(ExpenseInput);