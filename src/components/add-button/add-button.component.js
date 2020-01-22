import React from 'react';
import { connect } from 'react-redux';

import { toggleAddExpense } from '../../redux/expenses/expenses.actions';

import CustomButton from '../custom-button/custom-button.component';

import './add-button.styles.scss';

const mapDispatchToProps = dispatch => ({
	toggleAddExpense: () => dispatch(toggleAddExpense())
}) 

const AddButton = ({ toggleAddExpense }) => (
	<CustomButton 
		selected
		onClick={toggleAddExpense}
	> 	
		<div className='add-button'>
			<div className='add' />
		</div>
		expense 
	</CustomButton>
)
export default connect(null, mapDispatchToProps)(AddButton);