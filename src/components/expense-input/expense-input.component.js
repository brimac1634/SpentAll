import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axiosConfig from '../../axios-config';

import { fetchExpensesSuccess, toggleAddExpense } from '../../redux/expenses/expenses.actions';
import { selectUserSettings } from '../../redux/user/user.selectors';
import { setAlert } from '../../redux/alert/alert.actions'; 
import { startLoading, stopLoading } from '../../redux/loading/loading.actions'; 

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Category from '../category/category.component';

import './expense-input.styles.scss';

const mapStateToProps = createStructuredSelector({
	userSettings: selectUserSettings
})

const mapDispatchToProps = dispatch => ({
	updateExpenses: expenses => dispatch(fetchExpensesSuccess(expenses)),
	setAlert: alert => dispatch(setAlert(alert)),
	toggleAddExpense: () => dispatch(toggleAddExpense()),
	startLoading: message => dispatch(startLoading(message)),
	stopLoading: () => dispatch(stopLoading()),
})

const ExpenseInput = ({ updateExpenses, setAlert, userSettings, toggleAddExpense, startLoading, stopLoading }) => {
	const [expense, setExpense] = useState({amount: '', type: ''});
	const [incomplete, setIncomplete] = useState(false);
	let { amount, type } = expense;
	const { categories } = userSettings;


	const handleSubmit = async event => {
		event.preventDefault();
		startLoading()
		axiosConfig('post', '/add-expenditure', {
			type, 
			amount, 
			timestamp: new Date()
		}).then(({ data }) => {
			updateExpenses(data)
			stopLoading();
			setAlert('spent!')
			setExpense({amount: '', type: ''})
			toggleAddExpense();
		}).catch(err => {
			stopLoading();
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
		<div className='expense-input'>
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
								<Category 
									key={i}
									selected={type === category}
									category={category}
									onClick={()=>setExpense({
										...expense,
										type: category
									})}
								/>
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
					onClick={handleSubmit}
				> 
					spent 
				</CustomButton>
			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseInput);