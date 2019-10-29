import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas, dateAndTime } from '../../utils';
import axiosConfig from '../../axios-config';

import { selectSelectedExpense } from '../../redux/expenses/expenses.selectors';
import { setExpenseToEdit } from '../../redux/expenses/expenses.actions';

import CustomButton from '../../components/custom-button/custom-button.component';
import HoverBox from '../../components/hover-box/hover-box.component';
import MessageModal from '../../components/message-modal/message-modal.component';

import './expenditure-details.styles.scss';

const mapStateToProps = createStructuredSelector({
	selectedExpense: selectSelectedExpense
})

const mapDispatchToProps = dispatch => ({
	setExpenseToEdit: expense => dispatch(setExpenseToEdit(expense))
})

const ExpenditureDetails = ({ selectedExpense, setExpenseToEdit }) => {
	const [showModal, setShowModal] = useState(false);
	if (!selectedExpense) return <div className='expenditure-details'/>
	const { expenditure_id, amount, timestamp, type } = selectedExpense;

	const deleteExpense = async expenditure_id => {
		axiosConfig('post', '/delete-expense', { 
			expenditure_id 
		})
	}
	
	return (
		<div className='expenditure-details'>
			<span>{dateAndTime(timestamp)}</span>
			<h1>${numberWithCommas(amount)}</h1>
			<span>{type}</span>
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
					message='are you sure?'
					confirm='delete' 
					cancel='cancel'
					confirmCallback={()=>deleteExpense(expenditure_id)} 
					cancelCallback={()=>setShowModal(false)}
				/>
			</HoverBox>
		</div>
	)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpenditureDetails);