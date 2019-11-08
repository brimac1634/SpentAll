import React, { useState } from 'react';
import { connect } from 'react-redux';

import { toggleAddExpense } from '../../redux/expenses/expenses.actions';

import TimeFilter from '../../components/time-filter/time-filter.component';
import Summary from '../../components/summary/summary.component';
import ExpenseList from '../../components/expense-list/expense-list.component';
import ExpenditureDetails from '../../components/expenditure-details/expenditure-details.component';
import HoverBox from '../../components/hover-box/hover-box.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './list-group.styles.scss';

const mapDispatchToProps = dispatch => ({
	toggleAddExpense: () => dispatch(toggleAddExpense())
})

const ListGroup = ({ toggleAddExpense }) => {
	const [showFilter, setShowFilter] = useState(false);

	return (
		<div className='list-group'>
			<div className='summary-panel'>
				<Summary />
				<div className='buttons'>
					<CustomButton onClick={()=>setShowFilter(true)}>
						time filter
					</CustomButton>
					<CustomButton 
						selected
						onClick={toggleAddExpense}
					> 
						add expenditure 
					</CustomButton>
				</div>
			</div>
			<div className='list'>
				<ExpenseList />
			</div>
			<div className='details'>
				<ExpenditureDetails />
			</div>
			<HoverBox show={showFilter}>
				<TimeFilter confirm={()=>setShowFilter(false)}/>
			</HoverBox>
		</div>
	)
}

export default connect(null, mapDispatchToProps)(ListGroup);