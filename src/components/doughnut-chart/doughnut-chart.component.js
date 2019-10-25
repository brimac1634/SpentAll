import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCategoriesTotals } from '../../redux/expenses/expenses.selectors';

const mapStateToProps = createStructuredSelector({
	categoryTotals: selectCategoriesTotals
})

const DoughnutChart = ({ categoryTotals }) => {
	if (!categoryTotals) return <span>No data to show</span>

	//make a function to count the number of keys and make colors incrementally darker to use as the colors

	const data = {
		labels: Object.keys(categoryTotals),
		datasets: [{
			data: Object.values(categoryTotals),
			backgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
			],
			hoverBackgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
			]
		}]
	};

    return (
	    <Doughnut data={data} />
    );
};

export default connect(mapStateToProps)(DoughnutChart);