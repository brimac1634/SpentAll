import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Line } from 'react-chartjs-2';

import { formatDate } from '../../utils';

import { selectExpensesList } from '../../redux/expenses/expenses.selectors';

const mapStateToProps = createStructuredSelector({
	expenseList: selectExpensesList
})

const LineChart = ({ expenseList }) => {
	if (!expenseList) return <span>No Data</span>
	const expenseMap = expenseList.reduce((accum, expense)=>{
		const { timestamp, amount } = expense;
		const date = formatDate(new Date(timestamp));
		accum[date] = accum[date] 
			? 	accum[date] + amount
			: 	amount
		return accum
	}, {})
	console.log(expenseMap)
	const data = {
		labels: Object.keys(expenseMap).reverse(),
		datasets: [
			{
			  label: 'My First dataset',
			  fill: true,
			  lineTension: 0.3,
			  backgroundColor: 'rgba(255,185,246,.4)',
			  borderColor: '#ffb9f6',
			  borderCapStyle: 'butt',
			  borderDash: [],
			  borderDashOffset: 0.0,
			  borderJoinStyle: 'miter',
			  pointBorderColor: '#f7f9fc',
			  pointBackgroundColor: '#f7f9fc',
			  pointBorderWidth: 1,
			  pointHoverRadius: 5,
			  pointHoverBackgroundColor: '#819efc',
			  pointHoverBorderColor: 'rgba(220,220,220,1)',
			  pointHoverBorderWidth: 2,
			  pointRadius: 1,
			  pointHitRadius: 10,
			  data: Object.values(expenseMap).reverse()
			}
		]
	};

	return (
		<Line 
			data={data}
			height={200} 
		/>
	)
}

export default connect(mapStateToProps)(LineChart);