import React from 'react';

import Summary from '../../components/summary/summary.component';
import ExpenseList from '../../components/expense-list/expense-list.component';
import TimeFilter from '../../components/time-filter/time-filter.component';
import ExpenditureDetails from '../../components/expenditure-details/expenditure-details.component';

import './expenses.styles.scss';

const Expenses = () => (
	<div className='expenses'>
		<div className='panel'>
			<h3>Time Frame</h3>
			<TimeFilter />
		</div>
		<div className='panel summary-panel'>
			<Summary />
			<ExpenditureDetails />
		</div>
		<div className='panel'>
			<h3>Expenditure List</h3>
			<div className='list-container'>
				<ExpenseList />
			</div>
		</div>
	</div>
)

export default Expenses;