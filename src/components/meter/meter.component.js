import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas } from '../../utils';

import { selectTotalTargetExpenses } from '../../redux/expenses/expenses.selectors';
import { selectUserSettings } from '../../redux/user/user.selectors';

import './meter.styles.scss';

const mapStateToProps = createStructuredSelector({
	totalTargetExpense: selectTotalTargetExpenses,
	userSettings: selectUserSettings
})

const Meter = ({ totalTargetExpense, userSettings }) => {
	const { target, cycle } = userSettings;

	let percent = totalTargetExpense
		? 	totalTargetExpense * 100 / target
		: 	0
	percent = percent > 100 ? 100 : percent;
	percent = Math.ceil(percent);

	const diameter = 320;
	const strokeWidth = 22;
	const radius = diameter / 2 - strokeWidth * 2;
	const circumference = radius * 2 * Math.PI;
	const offset = circumference - percent / 100 * circumference;

	return (
		<div className='meter'>
			<div className='message-group'>
				<h1>{percent}% of your {cycle} limit</h1>
			</div>
			<div className='ring-group'>
				<svg
					className='meter-ring'
					height={diameter}
					width={diameter}
				>
					<circle
						className='circle'
						stroke='#c4f0ff'
						strokeWidth={strokeWidth}
						fill='transparent'
						r={radius}
						cx={diameter / 2}
						cy={diameter / 2}
						style={{
							strokeDasharray: `${circumference} ${circumference}`, 
							strokeDashoffset: offset
						}}
					/>
				</svg>
				<span className='percent'>{percent}%</span>
			</div>
			<div className='message-group'>
				<h1>
					${numberWithCommas(totalTargetExpense)} spent of your ${numberWithCommas(target)} limit
				</h1>
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(Meter);