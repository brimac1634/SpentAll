import React, { useState } from 'react';

import Summary from '../../components/summary/summary.component';
import TimeFilter from '../../components/time-filter/time-filter.component';
import BarChart from '../../components/bar-chart/bar-chart.component';
import DoughnutChart from '../../components/doughnut-chart/doughnut-chart.component';
import HoverBox from '../../components/hover-box/hover-box.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SectionBox from '../../components/section-box/section-box.component';

import './analytics-group.styles.scss';

const AnalyticsGroup = () => {
	const [showFilter, setShowFilter] = useState(false);

	return (
		<div className='analytics-group'>
			<div className='summary-panel'>
				<Summary />
				<CustomButton onClick={()=>setShowFilter(true)}>
					time filter
				</CustomButton>
			</div>
			<div className='chart bar'>
				<SectionBox>
					<BarChart />
				</SectionBox>
			</div>
			<div className='chart doughnut'>
				<SectionBox>
					<DoughnutChart />
				</SectionBox>
			</div>
			<HoverBox 
				show={showFilter} 
				backgroundClick={e=>{
					e.stopPropagation();
					setShowFilter(false);
				}}
			>
				<TimeFilter confirm={()=>setShowFilter(false)} />
			</HoverBox>
		</div>
	)
}

export default AnalyticsGroup;