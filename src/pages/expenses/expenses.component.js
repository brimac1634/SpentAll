import React from 'react';

import ExpenseList from '../../components/expense-list/expense-list.component';

import './expenses.styles.scss';

const Expenses = () => {
	return (
		<div className='expenses'>
			<ExpenseList />
		</div>
	)
}

export default Expenses;