import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Line } from 'react-chartjs-2';

import { formatDate } from '../../utils';

import { selectExpensesList, selectFixedDateRange } from '../../redux/expenses/expenses.selectors';

const mapStateToProps = createStructuredSelector({
	expenseList: selectExpensesList,
	dateRange: selectFixedDateRange
})

const LineChart = ({ expenseList, dateRange }) => {
	if (!expenseList || !dateRange) return <span>No Data</span>
	
	const { startDate, endDate } = dateRange;
	if (startDate === endDate) return <span>No chart for this date range</span>

	const currency = '$USD';

	const expenseMap = expenseList.reduce((accum, expense)=>{
		const { timestamp, amount } = expense;
		const date = formatDate(new Date(timestamp));
		accum[date] = accum[date] 
			? 	accum[date] + amount
			: 	amount
		return accum
	}, {})

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


	const data = {
		labels: getLabels(startDate, endDate),
		datasets: [
			{
			  label: 'Expenditures',
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

	const options = {
		responsive: true,
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
		<Line 
			data={data}
			height={200} 
			options={options}
		/>
	)
}

export default connect(mapStateToProps)(LineChart);