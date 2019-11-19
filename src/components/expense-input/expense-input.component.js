import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { formatDate } from '../../utils';

import { newExpenseStart, setExpenseToEdit } from '../../redux/expenses/expenses.actions';
import { selectExpenseToEdit, selectCurrencies, selectShowAddExpense } from '../../redux/expenses/expenses.selectors';
import { selectUserSettings } from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Category from '../category/category.component';
import HoverBox from '../hover-box/hover-box.component';
import FilterSelector from '../filter-selector/filter-selector.component';
import Calendar from '../calendar/calendar.component';

import './expense-input.styles.scss';

const mapStateToProps = createStructuredSelector({
	userSettings: selectUserSettings,
	expenseToEdit: selectExpenseToEdit,
	currencies: selectCurrencies,
	showAddExpense: selectShowAddExpense
})

const mapDispatchToProps = dispatch => ({
	newExpenseStart: expense => dispatch(newExpenseStart(expense)),
	closeExpense: () => dispatch(setExpenseToEdit(null))
})

const ExpenseInput = ({ showAddExpense, expenseToEdit, userSettings, closeExpense, newExpenseStart, currencies }) => {
	const [expense, setExpense] = useState({
		timestamp: new Date(),
		currency: userSettings.currency,
		amount: '', 
		type: '',
		notes: ''
	});
	const [incomplete, setIncomplete] = useState(false);
	const [showCurrencies, setShowCurrencies] = useState(false);
	const [showCalendar, setShowCalendar] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	let { timestamp, amount, type, notes, currency } = expense;
	const expenditure_id = expenseToEdit ? expenseToEdit.expenditure_id : null;
	const { categories } = userSettings;

	useEffect(()=>{
		if (amount || type || notes) {
			setIsAdding(true);
		} else { setIsAdding(false); }
	}, [amount, type, notes, setIsAdding])
	
	useEffect(()=>{
		if (expenseToEdit) setExpense({
			timestamp: expenseToEdit.timestamp,
			currency: expenseToEdit.currency,
			amount: expenseToEdit.amount, 
			type: expenseToEdit.type,
			notes: expenseToEdit.notes
		})
	}, [expenseToEdit])

	useEffect(()=>{
		if (!showAddExpense) {
			setExpense({  
				timestamp: new Date(),
				currency: userSettings.currency,
				amount: '',
				type: '', 
				notes: ''
			});
			setIncomplete(false);
		}
	}, [showAddExpense, setExpense, userSettings, setIncomplete])

	const handleSubmit = async event => {
		event.preventDefault();
		if (!amount || !type || amount <= 0) return setIncomplete(true);
		newExpenseStart({
			expenditure_id,
			currency,
			type, 
			amount,
			notes, 
			timestamp: new Date(timestamp)
		})
	}

	const handleChange = event => {
		let { value, id } = event.target;
		setExpense({ ...expense, [id]: value });
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
								onClick={()=>setShowCalendar(true)}
							> 
								{formatDate(timestamp)}
							</CustomButton>
						</div>
						<div className='row'>
							<h3>2.</h3>
							<CustomButton 
								type='button'
								style={{minWidth: '60px', marginRight: '10px'}}
								onClick={()=>setShowCurrencies(true)}
							> 
								{currency} 
							</CustomButton>
							<FormInput 
								id='amount' 
								type='number' 
								min='0'
								value={amount} 
								placeholder='125.50'
								handleChange={handleChange}
								required 
							/>
						</div>
						<div className='row'>
							<h3>3.</h3>
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
							<h3>4.</h3>
							<FormInput 
								id='notes' 
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
					<CustomButton 
						selected={isAdding}
						onClick={handleSubmit}
					> 
						{isAdding ? 'spent': 'done'} 
					</CustomButton>
					{
						isAdding &&
						<CustomButton onClick={closeExpense}> 
							cancel 
						</CustomButton>
					}
				</div>
			</div>
			<HoverBox 
				show={showCalendar} 
				backgroundClick={e=>{
					e.stopPropagation();
					setShowCalendar(false);
				}}
			>
				<Calendar 
					dateRange={{
						startDate: timestamp,
						endDate: timestamp
					}}
					setDates={({ date }) => {
						setExpense({
							...expense,
							timestamp: date
						})
						setShowCalendar(false);
					}}
				/>
			</HoverBox>
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