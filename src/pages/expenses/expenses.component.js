import React from 'react';

import ExpenseList from '../../components/expense-list/expense-list.component';
import TimeFilter from '../../components/time-filter/time-filter.component';
import LineChart from '../../components/line-chart/line-chart.component';

import './expenses.styles.scss';

const Expenses = () => {
	return (
		<div className='expenses'>
			<div className='panel'>
				<h3>Time Frame</h3>
				<TimeFilter />
			</div>
			<div className='panel'>
				<h3>Expenditure List</h3>
				<ExpenseList />
			</div>
			<div className='panel'>
				<h3>Charts</h3>
				<LineChart />
			</div>
		</div>
	)
}

export default Expenses;