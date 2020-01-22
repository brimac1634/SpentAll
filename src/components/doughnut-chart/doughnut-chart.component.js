import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { lightenDarkenColor } from '../../utils';

import { selectCategoriesTotals } from '../../redux/expenses/expenses.selectors';

import './doughnut-chart.styles.scss';

const mapStateToProps = createStructuredSelector({
	categoryTotals: selectCategoriesTotals
})

const DoughnutChart = ({ categoryTotals }) => {
	if (!categoryTotals) return <span>No data</span>

	const categoryKeys = Object.keys(categoryTotals)
	const colors = ['#819efc', '#ffb9f6'];
	let colorIndex = 0;
	let categoryColors = [];
	for (let i = 0; i < categoryKeys.length; i++) {
		let currentColor = colors[colorIndex];
		categoryColors.push(currentColor)
		colorIndex = colorIndex < colors.length - 1 ? colorIndex + 1 : 0;
	}

	const fadedColors = categoryColors.map(color => {
		return lightenDarkenColor(color, 30)
	})

	const data = {
		labels: categoryKeys,
		datasets: [{
			data: Object.values(categoryTotals),
			backgroundColor: fadedColors,
			hoverBackgroundColor: categoryColors,
			borderWidth: 1,
		}]
	};

	const options = {
		responsive: true,
		maintainAspectRatio: true,
		cutoutPercentage: 35,
	    legend: {
	    	display: false,
	    	position: 'bottom',
	    	labels: {
	    		fontColor: '#f7f9fc'
	    	}
	    },
	    tooltips: {
	    	cornerRadius: 3,
	    	callbacks: {
		        label: (tooltipItem, data) => {
		        	const index = tooltipItem['index']
		        	const dataItem = data.datasets[0].data[index]
		        	const percent = dataItem >= 1 ? ' ' + Math.floor(dataItem) + '%' : ' <1%';
		            return ' ' + data['labels'][index] + percent
		        }
			}
	    }
	}

    return (
    	<div className='doughnut-chart'>
    		<div className='chart-bar'>
	    		<span>Amount spent per category (% of total)</span>
    		</div>
		    <Doughnut data={data} options={options} />
	    </div>
    );
};

export default connect(mapStateToProps)(DoughnutChart);