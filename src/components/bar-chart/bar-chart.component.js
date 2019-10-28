import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Bar } from 'react-chartjs-2';
import { lightenDarkenColor } from '../../utils';

import { 
	selectExpensesDateMap, 
	selectFixedDateRange,
	selectDatesArray 
} from '../../redux/expenses/expenses.selectors';

const mapStateToProps = createStructuredSelector({
	expenseMap: selectExpensesDateMap,
	dateRange: selectFixedDateRange,
	datesArray: selectDatesArray
})

const BarChart = ({ expenseMap, dateRange, datesArray }) => {
	if (!expenseMap || !dateRange) return <span>No Data</span>
	
	const { startDate, endDate } = dateRange;
	if (startDate === endDate) return <span>No chart for this date range</span>

	const currency = '$USD';
	
	const expenditures = datesArray.map(date => {
		return expenseMap[date] || 0;
	})

	const data = {
		labels: datesArray,
		datasets: [
			{
			  label: 'Expenditures',
			  fill: true,
			  backgroundColor: lightenDarkenColor('#ffb9f6', 40),
			  hoverBackgroundColor: '#ffb9f6',
			  borderWidth: 1,
			  borderColor: '#f7f9fc',
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
	      mode: 'nearest',
	      cornerRadius: 3
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