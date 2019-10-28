import React from 'react';

import Summary from '../../components/summary/summary.component';
import TimeFilter from '../../components/time-filter/time-filter.component';
import BarChart from '../../components/bar-chart/bar-chart.component';
import DoughnutChart from '../../components/doughnut-chart/doughnut-chart.component';

import './analytics.styles.scss';

const Analytics = () => (
	<div className='analytics'>
		<div className='time'>
			<h3>Time Filter</h3>
			<TimeFilter />
		</div>
		<div className='summary-panel'>
			<Summary />
		</div>
		<div className='bar'>
			<BarChart />
		</div>
		<div className='doughnut'>
			<DoughnutChart />
		</div>
	</div>
)

export default Analytics;