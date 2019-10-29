import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axiosConfig from '../../axios-config';

import { fetchExpensesSuccess, toggleAddExpense } from '../../redux/expenses/expenses.actions';
import { selectExpenseToEdit } from '../../redux/expenses/expenses.selectors';
import { selectUserSettings } from '../../redux/user/user.selectors';
import { setAlert } from '../../redux/alert/alert.actions'; 
import { startLoading, stopLoading } from '../../redux/loading/loading.actions'; 

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Category from '../category/category.component';

import './expense-input.styles.scss';

const mapStateToProps = createStructuredSelector({
	userSettings: selectUserSettings,
	expenseToEdit: selectExpenseToEdit
})

const mapDispatchToProps = dispatch => ({
	updateExpenses: expenses => dispatch(fetchExpensesSuccess(expenses)),
	setAlert: alert => dispatch(setAlert(alert)),
	toggleAddExpense: () => dispatch(toggleAddExpense()),
	startLoading: message => dispatch(startLoading(message)),
	stopLoading: () => dispatch(stopLoading()),
})

const ExpenseInput = ({ expenseToEdit, updateExpenses, setAlert, userSettings, toggleAddExpense, startLoading, stopLoading }) => {
	const [expense, setExpense] = useState({
		amount: '', 
		type: ''
	});
	const [incomplete, setIncomplete] = useState(false);
	let { amount, type } = expense;
	const { categories, currency } = userSettings;
	
	useEffect(()=>{
		if (expenseToEdit) setExpense({
			amount: expenseToEdit.amount, 
			type: expenseToEdit.type
		})
	}, [expenseToEdit])

	const handleSubmit = async event => {
		event.preventDefault();
		if (!amount || !type) return setIncomplete(true);
		startLoading()
		if (expenseToEdit) {

		} else {
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
			}).catch(() => {
				stopLoading();
				setAlert('unable to update expenditures')
			})
		}
	}

	const handleChange = event => {
		let { value, name } = event.target;
		setExpense({ ...expense, [name]: value });
	}

	const cancel = () => {
		toggleAddExpense();
		setExpense({amount: '', type: ''})
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
						label={currency}
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
					<span className={`error ${incomplete ? 'show' : 'hide'}`}>*You must add a valid amount and choose a spending category*</span>
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