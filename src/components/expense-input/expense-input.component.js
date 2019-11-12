import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { newExpenseStart, setExpenseToEdit } from '../../redux/expenses/expenses.actions';
import { selectExpenseToEdit, selectCurrencies } from '../../redux/expenses/expenses.selectors';
import { selectUserSettings } from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Category from '../category/category.component';
import HoverBox from '../hover-box/hover-box.component';
import FilterSelector from '../filter-selector/filter-selector.component';

import './expense-input.styles.scss';

const mapStateToProps = createStructuredSelector({
	userSettings: selectUserSettings,
	expenseToEdit: selectExpenseToEdit,
	currencies: selectCurrencies
})

const mapDispatchToProps = dispatch => ({
	newExpenseStart: expense => dispatch(newExpenseStart(expense)),
	setExpenseToEdit: () => dispatch(setExpenseToEdit(null))
})

const ExpenseInput = ({ expenseToEdit, userSettings, setExpenseToEdit, newExpenseStart, currencies }) => {
	const [expense, setExpense] = useState({
		currency: userSettings.currency,
		amount: '', 
		type: '',
		notes: ''
	});
	const [incomplete, setIncomplete] = useState(false);
	const [showCurrencies, setShowCurrencies] = useState(false);
	let { amount, type, notes, currency } = expense;
	const expenditure_id = expenseToEdit ? expenseToEdit.expenditure_id : null;
	const { categories } = userSettings;
	
	useEffect(()=>{
		if (expenseToEdit) setExpense({
			currency: expenseToEdit.currency,
			amount: expenseToEdit.amount, 
			type: expenseToEdit.type
		})
	}, [expenseToEdit])

	const handleSubmit = async event => {
		event.preventDefault();
		if (!amount || !type) return setIncomplete(true);
		newExpenseStart({
			expenditure_id,
			currency,
			type, 
			amount,
			notes, 
			timestamp: new Date()
		})
	}

	const handleChange = event => {
		let { value, name } = event.target;
		setExpense({ ...expense, [name]: value });
	}

	const cancel = () => {
		setExpenseToEdit();
		setExpense({amount: '', type: ''});
	}

	return (
		<div className='expense-input'>
			<div className='inner-input'>
				<h3>Add Expenditure</h3>
				<form onSubmit={handleSubmit}>
					<div className='form'>
						<div className='row'>
							<h3>1.</h3>
							<CustomButton 
								type='button'
								style={{minWidth: '60px', marginRight: '10px'}}
								onClick={()=>setShowCurrencies(true)}
							> 
								{currency} 
							</CustomButton>
							<FormInput 
								name='amount' 
								type='number' 
								min='0'
								value={amount} 
								placeholder='125.50'
								handleChange={handleChange}
								required 
							/>
						</div>
						<div className='row'>
							<h3>2.</h3>
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
						<div className='row'>
							<h3>3.</h3>
							<FormInput 
								name='notes' 
								type='text' 
								value={notes} 
								label='notes'
								placeholder='(Optional)'
								handleChange={handleChange} 
							/>
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
			<HoverBox 
				show={showCurrencies} 
				backgroundClick={e=>{
					e.stopPropagation();
					setShowCurrencies(false);
				}}
			>
				<h3 className='filter-title'>Currency Selector</h3>
				<FilterSelector 
					options={currencies} 
					select={currency=>{
						setExpense({ 
							...expense, currency
						})
						setShowCurrencies(false)
					}} 
				/>
			</HoverBox>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseInput);