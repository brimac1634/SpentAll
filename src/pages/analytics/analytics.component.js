import React from 'react';

import Summary from '../../components/summary/summary.component';
import TimeFilter from '../../components/time-filter/time-filter.component';
import LineChart from '../../components/line-chart/line-chart.component';
import DoughnutChart from '../../components/doughnut-chart/doughnut-chart.component';

import './analytics.styles.scss';

const Analytics = () => (
	<div className='analytics'>
		<div className='panel'>
			<h3>Time Frame</h3>
			<TimeFilter />
		</div>
		<div className='panel summary-panel'>
			<Summary />
		</div>
		<div className='panel'>
			<h3>Charts</h3>
			<LineChart />
			<DoughnutChart />
		</div>
	</div>
)

export default Analytics;