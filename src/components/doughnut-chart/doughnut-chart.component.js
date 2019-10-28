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
	const colorInterval = 100 / categoryKeys.length
	const categoryColors = categoryKeys.map((cat, i) => {
		return lightenDarkenColor('#ffb9f6', i * -colorInterval)
	})

	const data = {
		labels: categoryKeys,
		datasets: [{
			data: Object.values(categoryTotals),
			backgroundColor: categoryColors,
			hoverBackgroundColor: categoryColors,
			borderWidth: 0,
		}]
	};

	const options = {
		responsive: true,
		maintainAspectRatio: true,
	    legend: {
	    	display: true,
	    	fontColor: 'white',
	    	position: 'bottom',
	    	labels: {
	    		fontColor: '#f7f9fc'
	    	}
	    }
	}

    return (
	    <Doughnut data={data} options={options} />
    );
};

export default connect(mapStateToProps)(DoughnutChart);