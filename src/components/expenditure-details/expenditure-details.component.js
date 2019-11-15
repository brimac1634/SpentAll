import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas, dateAndTime } from '../../utils';

import { selectSelectedExpense } from '../../redux/expenses/expenses.selectors';
import { setExpenseToEdit, deleteExpenseStart } from '../../redux/expenses/expenses.actions';

import CustomButton from '../../components/custom-button/custom-button.component';
import HoverBox from '../../components/hover-box/hover-box.component';
import MessageModal from '../../components/message-modal/message-modal.component';
import SectionBox from '../../components/section-box/section-box.component';

import './expenditure-details.styles.scss';

const mapStateToProps = createStructuredSelector({
	selectedExpense: selectSelectedExpense
})

const mapDispatchToProps = dispatch => ({
	setExpenseToEdit: expense => dispatch(setExpenseToEdit(expense)),
	deleteExpenseStart: expenseID => dispatch(deleteExpenseStart(expenseID)),
})

const ExpenditureDetails = ({ selectedExpense, setExpenseToEdit, deleteExpenseStart }) => {
	const [showModal, setShowModal] = useState(false);
	if (!selectedExpense) return <div className='expenditure-details'>No expense selected</div>
	const { expenditure_id, currency, amount, timestamp, notes, type } = selectedExpense;
	const deleteExpense = async expenditure_id => {
		setShowModal(false);
		deleteExpenseStart({ expenditure_id });
	}
	
	return (
		<div className='expenditure-details'>
			<SectionBox>
				<span>{dateAndTime(timestamp)}</span>
				<h1>{currency} {numberWithCommas(amount)}</h1>
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
						onClick={()=>setExpenseToEdit(selectedExpense)}
					> 
						edit 
					</CustomButton>
				</div>
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
			</SectionBox>
		</div>
	)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpenditureDetails);