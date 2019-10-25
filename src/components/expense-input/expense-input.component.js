import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import { fetchExpensesSuccess, toggleAddExpense } from '../../redux/expenses/expenses.actions';
import { selectShowAddExpense } from '../../redux/expenses/expenses.selectors';
import { selectUserSettings } from '../../redux/user/user.selectors';
import { setAlert } from '../../redux/alert/alert.actions'; 

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './expense-input.styles.scss';

const mapStateToProps = createStructuredSelector({
	userSettings: selectUserSettings,
	showAddExpense: selectShowAddExpense
})

const mapDispatchToProps = dispatch => ({
	updateExpenses: expenses => dispatch(fetchExpensesSuccess(expenses)),
	setAlert: alert => dispatch(setAlert(alert)),
	toggleAddExpense: () => dispatch(toggleAddExpense())
})

const ExpenseInput = ({ showAddExpense, updateExpenses, setAlert, userSettings, toggleAddExpense }) => {
	const [expense, setExpense] = useState({amount: '', type: ''});
	let { amount, type } = expense;
	const { categories } = userSettings;


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

	const cancel = () => {
		setExpense({amount: '', type: ''})
		toggleAddExpense();
	}

	return (
		<div className={`expense-input ${showAddExpense ? 'show' : 'hide'}`}>
			<div className='box'>
				<h3>Add Expenditure</h3>
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
						<div className='categories-container'>
							{
								categories &&
								categories.map((category, i)=>(
									<div 
										key={i} 
										className='cat'
										onClick={()=>setExpense({
											...expense,
											type: category
										})}
									>
										<span>{category}</span>
									</div>
								))
							}
						</div>
					</div>
				</form>
				<div className='button-container'>
					<CustomButton onClick={cancel}> 
						cancel 
					</CustomButton>
					<CustomButton 
						selected
						type='submit'
					> 
						spent 
					</CustomButton>
				</div>
			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseInput);