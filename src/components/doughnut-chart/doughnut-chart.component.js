import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { lightenDarkenColor } from '../../utils';

import { selectCategoriesTotals } from '../../redux/expenses/expenses.selectors';

const mapStateToProps = createStructuredSelector({
	categoryTotals: selectCategoriesTotals
})

const DoughnutChart = ({ categoryTotals }) => {
	if (!categoryTotals) return <span>No data to show</span>

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
		return lightenDarkenColor(color, 40)
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
	    	cornerRadius: 3
	    }
	}

    return (
	    <Doughnut data={data} options={options} />
    );
};

export default connect(mapStateToProps)(DoughnutChart);