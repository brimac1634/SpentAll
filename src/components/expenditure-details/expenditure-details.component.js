import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas, dateAndTime } from '../../utils';

import { selectSelectedExpense } from '../../redux/expenses/expenses.selectors';
import { editNewExpense, deleteExpenseStart, toggleAddExpense } from '../../redux/expenses/expenses.actions';

import CustomButton from '../../components/custom-button/custom-button.component';
import HoverBox from '../../components/hover-box/hover-box.component';
import MessageModal from '../../components/message-modal/message-modal.component';

import './expenditure-details.styles.scss';

const mapStateToProps = createStructuredSelector({
	selectedExpense: selectSelectedExpense
})

const mapDispatchToProps = dispatch => ({
	editNewExpense: expense => dispatch(editNewExpense(expense)),
	deleteExpenseStart: expenseID => dispatch(deleteExpenseStart(expenseID)),
	toggleAddExpense: () => dispatch(toggleAddExpense())
})

const ExpenditureDetails = ({ selectedExpense, editNewExpense, deleteExpenseStart, toggleAddExpense }) => {
	const [showModal, setShowModal] = useState(false);
	if (!selectedExpense) return <div className='expenditure-details'>No expense selected</div>
	const { expenditure_id, currency, amount, timestamp, notes, type } = selectedExpense;
	const deleteExpense = async expenditure_id => {
		setShowModal(false);
		deleteExpenseStart({ expenditure_id });
	}
	
	return (
		<div className='expenditure-details'>
			<span>{dateAndTime(timestamp)}</span>
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
				<CustomButton onClick={()=>setShowModal(true)}> 
					delete 
				</CustomButton>
				<CustomButton 
					onClick={()=>{
						editNewExpense(selectedExpense);
						toggleAddExpense();
					}}
				> 
					edit 
				</CustomButton>
			</div>
			{
				ReactDOM.createPortal(
					<HoverBox show={showModal}>
						<MessageModal
							title='Delete Expense'
							message='Are you sure?'
							confirm='delete' 
							cancel='cancel'
							confirmCallback={()=>deleteExpense(expenditure_id)} 
							cancelCallback={()=>setShowModal(false)}
						/>
					</HoverBox>
				, document.body)
			}
		</div>
	)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpenditureDetails);