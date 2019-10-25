import React from 'react';
import {Doughnut} from 'react-chartjs-2';


const DoughnutChart = () => {

	const data = {
		labels: [
			'Red',
			'Green',
			'Yellow'
		],
		datasets: [{
			data: [300, 50, 100],
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

export default DoughnutChart;