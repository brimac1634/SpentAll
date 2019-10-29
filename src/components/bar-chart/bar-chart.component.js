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
import { selectCurrency } from '../../redux/user/user.selectors';

import './bar-chart.styles.scss';

const mapStateToProps = createStructuredSelector({
	expenseMap: selectExpensesDateMap,
	dateRange: selectFixedDateRange,
	datesArray: selectDatesArray,
	currency: selectCurrency
})

const BarChart = ({ expenseMap, dateRange, datesArray, currency }) => {
	if (!expenseMap || !dateRange) return <span>No Data</span>
	const { startDate, endDate } = dateRange;
	
	const expenditures = datesArray.map(date => {
		return expenseMap[date] || 0;
	})

	const data = {
		labels: datesArray,
		datasets: [
			{
			  label: 'Expenditures',
			  fill: true,
			  backgroundColor: lightenDarkenColor('#ffb9f6', 30),
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
		<div className='bar-chart'>
    		<h4>total amount spent per day ({currency})</h4>
    		{
    			(startDate === endDate)
    			? 	<div className='none'>
    					<span>No bar chart for this date range</span>
    				</div>
    			: 	<Bar data={data} options={options} />
    		}
			
		</div>
	)
}

export default connect(mapStateToProps)(BarChart);