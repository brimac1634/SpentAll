import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Bar } from 'react-chartjs-2';

import { formatDate } from '../../utils';

import { selectExpensesList, selectFixedDateRange } from '../../redux/expenses/expenses.selectors';

const mapStateToProps = createStructuredSelector({
	expenseList: selectExpensesList,
	dateRange: selectFixedDateRange
})

const BarChart = ({ expenseList, dateRange }) => {
	if (!expenseList || !dateRange) return <span>No Data</span>
	
	const { startDate, endDate } = dateRange;
	if (startDate === endDate) return <span>No chart for this date range</span>

	const currency = '$USD';

	const getLabels = (startDate, endDate) => {
		let currentDate = startDate.clone()
		let datesArray = [];
		while(currentDate <= endDate) {
			const formattedDate = formatDate(currentDate.toDate());
			datesArray.push(formattedDate);
			currentDate.add(1, 'd');
		}
		return datesArray;
	}

	const labels = getLabels(startDate, endDate);

	const expenseMap = expenseList.reduce((accum, expense)=>{
		const { timestamp, amount } = expense;
		const date = formatDate(new Date(timestamp));
		accum[date] = accum[date] 
			? 	accum[date] + amount
			: 	amount
		return accum
	}, {})

	const expenditures = labels.map(date => {
		return expenseMap[date] || 0;
	})

	const data = {
		labels,
		datasets: [
			{
			  label: 'Expenditures',
			  fill: true,
			  backgroundColor: 'rgba(255,185,246,.8)',
			  data: expenditures
			}
		]
	};

	const options = {
		responsive: true,
		maintainAspectRatio: true,
	    legend: {
	    	display: false
	    },
	    tooltips: {
	      mode: 'label',
	    },
	    hover: {
	      mode: 'nearest',
	      intersect: true
	    },
		scales: {
	      xAxes: [{
	        display: true,
	        ticks: {
                fontColor: '#f7f9fc'
            },
	        gridLines: {
	        	display: true,
				color: '#819efc'
	        }
	      }],
	      yAxes: [{
	        display: true,
	        ticks: {
                fontColor: '#f7f9fc'
            },
	        gridLines: {
	          display: true,
	          color: '#819efc'
	        },
	        scaleLabel: {
	          display: true,
	          labelString: currency,
	          fontColor: '#f7f9fc'
	        }
	      }]
	    }
	}

	return (
		<Bar data={data} options={options} />
	)
}

export default connect(mapStateToProps)(BarChart);