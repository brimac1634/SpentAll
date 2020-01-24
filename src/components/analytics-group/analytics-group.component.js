import React, { useState } from 'react';

import Summary from '../../components/summary/summary.component';
import TimeFilter from '../../components/time-filter/time-filter.component';
import BarChart from '../../components/bar-chart/bar-chart.component';
import DoughnutChart from '../../components/doughnut-chart/doughnut-chart.component';
import ExpenseList from '../../components/expense-list/expense-list.component';
import HoverBox from '../../components/hover-box/hover-box.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import ExportExcel from '../../components/export-excel/export-excel.component';

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
				<ExportExcel />
			</div>
			<div className='chart bar'>
				<BarChart />
			</div>
			<div className='chart doughnut'>
				<DoughnutChart />
			</div>
			<div className='list-panel'>
				<ExpenseList />
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